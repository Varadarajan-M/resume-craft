'use client';

import { createDuplicateResume } from '@/shared/lib/resume';
import { del, get as idbGet, set as idbSet } from 'idb-keyval';
import { useEffect, useMemo } from 'react';
import { create } from 'zustand';

import { type Resume } from '@/shared/types/resume';

const localResumeDbName = 'resume-craft:local-resumes';

interface LocalResumeStore {
  resumes: Resume[];
  loading: boolean;
  error: Error | null;

  setResumes: (fn: (prev: Resume[]) => Resume[]) => void;
  loadResumes: () => Promise<void>;

  createResume: (resume: Resume) => Promise<void>;
  upsertResume: (resume: Resume) => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  duplicateResume: (id: string, fn: (r: Resume) => Resume) => Promise<void>;

  deleteAllResumes: () => Promise<void>;
}

export const useLocalResumeStore = create<LocalResumeStore>((set, get) => ({
  resumes: [],
  loading: false,
  error: null,

  setResumes: (fn) =>
    set((state) => ({
      resumes: fn(state.resumes),
    })),

  loadResumes: async () => {
    try {
      set({ loading: true });
      const list = await idbGet(localResumeDbName);
      set({ resumes: list || [], loading: false });
    } catch (err) {
      set({ error: err as Error, loading: false });
    }
  },

  createResume: async (resume) => {
    const newResume = {
      ...resume,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updated = [newResume, ...get().resumes];
    set({ resumes: updated });
    await idbSet(localResumeDbName, updated);
  },

  upsertResume: async (resume) => {
    const copy = { ...resume, updatedAt: new Date() };
    const prev = get().resumes;
    const index = prev.findIndex((r) => r.id === resume.id);

    if (index === -1) {
      copy.createdAt = new Date();
    }

    const updated =
      index === -1
        ? [copy, ...prev]
        : Object.assign([...prev], { [index]: copy });

    set({ resumes: updated });
    await idbSet(localResumeDbName, updated);
  },

  deleteResume: async (id) => {
    const updated = get().resumes.filter((r) => r.id !== id);
    set({ resumes: updated });
    await idbSet(localResumeDbName, updated);
  },

  duplicateResume: async (id, duplicateFn) => {
    const original = get().resumes.find((r) => r.id === id);
    if (!original) return;

    const duplicated = duplicateFn(original);
    const updated = [duplicated, ...get().resumes];

    set({ resumes: updated });
    await idbSet(localResumeDbName, updated);
  },

  deleteAllResumes: async () => {
    set({ resumes: [] });
    await del(localResumeDbName);
  },
}));

const useIdbResume = (params?: { enabled?: boolean }) => {
  const {
    resumes,
    loading,
    error,
    loadResumes,
    createResume,
    upsertResume,
    deleteResume,
    duplicateResume,
    deleteAllResumes,
  } = useLocalResumeStore();

  useEffect(() => {
    if (params?.enabled) loadResumes();
  }, [params?.enabled, loadResumes]);

  const sortByDate = (a: Resume, b: Resume) => {
    const da = new Date(a.updatedAt || a.createdAt).getTime();
    const db = new Date(b.updatedAt || b.createdAt).getTime();
    return db - da;
  };

  const sortedResumes = useMemo(() => {
    return [...resumes].sort(sortByDate);
  }, [resumes]);

  const top3LocalResumes = useMemo(() => {
    return sortedResumes.slice(0, 3);
  }, [sortedResumes]);

  return {
    localResumes: sortedResumes,
    top3LocalResumes,
    createLocalResume: createResume,
    upsertLocalResume: upsertResume,
    deleteLocalResume: deleteResume,
    duplicateLocalResume: (id: string) =>
      duplicateResume(id, createDuplicateResume),
    clearAllLocalResumes: deleteAllResumes,
    loading,
    error,
  } as const;
};

export default useIdbResume;
