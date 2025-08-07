"use server";

import { DocumentTemplate } from "@/shared/types/document";
import connectDb from "../config/connection";
import ResumeTemplate from "../models/template";

/**
 * Action to get all templates.
 * @returns {Promise<{ success: boolean; message: string; data?: DocumentTemplate[]; error?: any }>} - The result of the action.
 */
export const getAllTemplatesAction = async (limit?: number) => {
  try {
    await connectDb();

    // Fetch all resumes for the user
    let templates;
    if (limit) {
      templates = await ResumeTemplate.find()
        .limit(limit)
        .sort({ updatedAt: -1 });
    } else {
      templates = await ResumeTemplate.find().sort({ updatedAt: -1 });
    }

    return {
      success: true,
      message: "Templates fetched successfully",
      data: JSON.parse(JSON.stringify(templates)), // Convert Mongoose documents to plain objects
    };
  } catch (error) {
    console.error("Error fetching Templates:", error);
    return { success: false, message: "Failed to fetch templates", error };
  }
};

/**
 * Action to create a new template.
 * @param {DocumentTemplate} template - The template data to be created.
 * @returns {Promise<{ success: boolean; message: string; data?: DocumentTemplate; error?: any }>} - The result of the action.
 */
export const createTemplateAction = async (template: DocumentTemplate) => {
  try {
    await connectDb();

    // Create a new template document
    const newTemplate = await ResumeTemplate.create(template);

    return {
      success: true,
      message: "Template created successfully",
      data: JSON.parse(JSON.stringify(newTemplate)), // Convert Mongoose document to plain object
    };
  } catch (error) {
    console.error("Error creating template:", error);
    return { success: false, message: "Failed to create template", error };
  }
};
