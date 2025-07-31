"use client";

import { toast } from "sonner";
import useAutoSaveAndLoadResume from "../hooks/useAutoSaveAndLoadResume";

/**
 * This handles auto-saving the resume and loading it from local storage.
 * It also sets up the initial state for the resume builder.
 *
 * Doing this here as this is the main entry point for the resume builder page.
 * If we do it in children components, it may cause unexpected behavior as some of the components are conditional
 * and may not render on initial load in mobile.
 */
const AutoSaveAndLoadResume = () => {
  const handleSaveSuccess = () => {
    toast.success("Resume saved successfully", {
      duration: 2000,
    });
  };
  const handleSaveError = (error: Error) => {
    toast.error(`Failed to save resume: ${error.message}`, {
      duration: 2000,
    });
  };
  useAutoSaveAndLoadResume({
    onSave: handleSaveSuccess,
    onSaveError: handleSaveError,
  });
  return null;
};

export default AutoSaveAndLoadResume;
