'use server';

import { Resume as ResumeType } from '@/shared/types/resume';

import { revalidateTag } from 'next/cache';
import { cacheLife } from 'next/dist/server/use-cache/cache-life';
import { cacheTag } from 'next/dist/server/use-cache/cache-tag';
import connectDb from '../config/connection';
import Resume from '../models/resume';
import { verifyAuth } from './utils';

/**
 * Action to create a new resume.
 * @param {ResumeType} resume - The resume data to be created.
 * @returns {Promise<{ success: boolean; message: string; data?: ResumeType; error?: any }>} - The result of the action.
 */
export const createResumeAction = async (resume: ResumeType) => {
  try {
    const [, userId] = await Promise.all([connectDb(), verifyAuth()]);

    // Create a new resume document
    const newResume = await Resume.create({
      ...resume,
      userId, // Associate the resume with the authenticated user
    });

    revalidateTag(`resumes-${userId}`);

    return {
      success: true,
      message: 'Resume created successfully',
      data: JSON.parse(JSON.stringify(newResume)), // Convert Mongoose document to plain object
    };
  } catch (error: unknown) {
    console.error('Error creating resume:', error);
    return {
      success: false,
      message: 'Failed to create resume',
      error: (error as Error)?.message,
    };
  }
};

const _getAllResumesAction = async (userId: string, limit?: number) => {
  'use cache';
  try {
    cacheTag(`resumes-${userId}`);
    cacheLife('hours');

    // Fetch all resumes for the user
    let resumes;
    if (limit) {
      resumes = await Resume.find({ userId })
        .limit(limit)
        .sort({ updatedAt: -1 })
        .lean();
    } else {
      resumes = await Resume.find({ userId }).sort({ updatedAt: -1 }).lean();
    }

    return {
      success: true,
      message: 'Resumes fetched successfully',
      data: JSON.parse(JSON.stringify(resumes)), // Convert Mongoose documents to plain objects
    };
  } catch (error: unknown) {
    console.error('Error fetching resumes:', error);
    return {
      success: false,
      message: 'Failed to fetch resumes',
      error: (error as Error).message,
    };
  }
};

/**
 * Action to get all resumes for a user.
 * @returns {Promise<{ success: boolean; message: string; data?: ResumeType[]; error?: any }>} - The result of the action.
 */
export const getAllResumesAction = async (limit?: number) => {
  try {
    const [, userId] = await Promise.all([connectDb(), verifyAuth()]);
    return await _getAllResumesAction(userId!, limit);
  } catch (error: unknown) {
    console.log('Error fetching resumes:', (error as Error).message);
    return {
      success: false,
      message: 'Failed to fetch resumes',
      error: (error as Error).message,
    };
  }
};

/**
 * Action to update a resume, creates a new one if it doesn't exist.
 * @param {string} resumeId - The ID of the resume to be updated.
 * @param {Partial<ResumeType>} updates - The updates to be applied to the resume.
 * @returns {Promise<{ success: boolean; message: string; data?: ResumeType; error?: any }>} - The result of the action.
 */
export const updateResumeAction = async (
  resumeId: string,
  updates: Partial<ResumeType>
) => {
  try {
    const [, userId] = await Promise.all([connectDb(), verifyAuth()]);

    // Find and update the resume
    const updatedResume = await Resume.findOneAndUpdate(
      { id: resumeId, userId },
      updates,
      {
        new: true, // Return the updated document
        upsert: true, // create a new document if it doesn't exist
      }
    ).lean();

    if (!updatedResume) {
      return { success: false, message: 'Resume not found' };
    }

    revalidateTag(`resumes-${userId}`);

    return {
      success: true,
      message: 'Resume updated successfully',
      data: JSON.parse(JSON.stringify(updatedResume)), // Convert Mongoose document to plain object
    };
  } catch (error: unknown) {
    console.error('Error updating resume:', error);
    return {
      success: false,
      message: 'Failed to update resume',
      error: (error as Error).message,
    };
  }
};

/**
 * Action to delete a resume.
 * @param {string} resumeId - The ID of the resume to be deleted.
 * @returns {Promise<{ success: boolean; message: string; error?: any }>} - The result of the action.
 */
export const deleteResumeAction = async (resumeId: string) => {
  try {
    // Ensure the database connection is established
    const [, userId] = await Promise.all([connectDb(), verifyAuth()]);

    // Find and delete the resume
    const result = await Resume.deleteOne({ id: resumeId, userId });
    if (!result) {
      return { success: false, message: 'Resume not found' };
    }
    return {
      success: true,
      message: 'Resume deleted successfully',
    };
  } catch (error: unknown) {
    console.error('Error deleting resume:', error);
    return {
      success: false,
      message: 'Failed to delete resume',
      error: (error as Error).message,
    };
  }
};
