"use server";

import { safeJsonParse } from "@/shared/lib/utils";
import { AIContentSuggestion } from "@/shared/types/ai";
import { Groq } from "groq-sdk";
import { AI_CONTENT_ENHANCEMENT_PROMPT } from "../config/prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
  maxRetries: 2,
});

/**
 * Action to get AI-enhanced content suggestions for a given resume content.
 * @param content The resume content to be enhanced
 * @returns  Promise<{ success: boolean; data?: AIContentSuggestion[]; error?: string }> - The result of the action.
 */
export const getAIEnhancedContentAction = async (content: string) => {
  try {
    const systemPrompt = JSON.stringify(AI_CONTENT_ENHANCEMENT_PROMPT);

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: false,
      reasoning_effort: "medium",
      stop: null,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
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
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
