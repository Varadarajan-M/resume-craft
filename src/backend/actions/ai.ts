'use server';

import { safeJsonParse } from '@/shared/lib/utils';
import { AIContentSuggestion } from '@/shared/types/ai';
import { Resume } from '@/shared/types/resume';
import { Groq } from 'groq-sdk';

import { createResumeAction } from './resume';

import connectDb from '../config/connection';
import AppConfig from '../models/config';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
  maxRetries: 2,
});

const promptCache = new Map<string, string>();

const _fetchSystemPrompt = async (promptType: string) => {
  try {
    if (promptCache.has(promptType)) {
      console.log(
        '[CACHE - HIT] Fetching system prompt from cache for type:',
        promptType
      );
      return promptCache.get(promptType)!;
    }

    await connectDb();

    console.log(
      '[CACHE - MISS] Fetching system prompt from DB for type:',
      promptType
    );
    const config = await AppConfig.findOne({ type: promptType }).lean();

    if (config) {
      promptCache.set(promptType, JSON.stringify(config.config));
    }
    return JSON.stringify(config?.config) || null;
  } catch (error) {
    console.error('Error fetching system prompt from DB:', error);
    return null;
  }
};

/**
 * Action to get AI-enhanced content suggestions for a given resume content.
 * @param content The resume content to be enhanced
 * @returns  Promise<{ success: boolean; data?: AIContentSuggestion[]; error?: string }> - The result of the action.
 */
export const getAIEnhancedContentAction = async (content: string) => {
  try {
    const systemPrompt = await _fetchSystemPrompt(
      'AI_CONTENT_ENHANCEMENT_PROMPT'
    );

    if (!systemPrompt) {
      throw new Error('Prompt error');
    }

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: 'medium',
      stop: null,
      response_format: {
        type: 'json_object',
      },
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `Enhance the following resume content:\n\n"""${content}"""\n\nProvide the output strictly in the specified JSON format without any additional text or explanation.`,
        },
      ],
    });

    const message = response.choices[0]?.message?.content;

    const parsed = safeJsonParse(message) as Record<string, unknown>;

    return {
      success: true,
      data: parsed?.suggestions as AIContentSuggestion[],
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const getResumeFromTextContentAction = async (textContent: string) => {
  try {
    const systemPrompt = await _fetchSystemPrompt(
      'AI_RESUME_EXTRACTION_PROMPT'
    );

    if (!systemPrompt) {
      throw new Error('Prompt error');
    }

    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: 'medium',
      stop: null,
      response_format: {
        type: 'json_object',
      },
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: textContent,
        },
      ],
    });

    const message = response.choices[0]?.message?.content;

    const resume = safeJsonParse(message) as Resume;

    return resume;
  } catch (error: unknown) {
    throw new Error((error as Error)?.message || 'Failed to extract resume');
  }
};

/** Action to create a resume from extracted text content using AI.
 * @param textContent The extracted text content from a PDF or other source
 * @returns Promise<{ success: boolean; data?: Resume; message?: string; error?: string }> - The result of the action.
 */
export const createResumeWithTextContentAction = async (
  textContent: string
) => {
  try {
    const resume = await getResumeFromTextContentAction(textContent);
    return createResumeAction(resume);
  } catch (error: unknown) {
    return {
      success: false,
      message: 'Failed to create resume',
      error: (error as Error)?.message,
    };
  }
};
