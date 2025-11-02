import { type ClassValue, clsx } from 'clsx';
import pdfToText from 'react-pdftotext';
import { twMerge } from 'tailwind-merge';
import { v7 as uuid } from 'uuid';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUniqId = () => uuid();

export const kebabToPascalCase = (slug: string): string => {
  return slug
    ?.split('-')
    ?.map((part) => part?.charAt(0)?.toUpperCase() + part?.slice(1))
    ?.join('');
};

export const downloadFile = (url: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const safeJsonParse = <T>(jsonString: string | null): T | null => {
  try {
    return jsonString ? (JSON.parse(jsonString) as T) : null;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
};

export const extractTextFromPdf = async (file: File) => {
  try {
    const text = await pdfToText(file);
    return text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    return null;
  }
};
