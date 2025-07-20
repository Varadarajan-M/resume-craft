import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v7 as uuid } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUniqId = () => uuid();

export const kebabToPascalCase = (slug: string): string => {
  return slug
    ?.split("-")
    ?.map((part) => part?.charAt(0)?.toUpperCase() + part?.slice(1))
    ?.join("");
};

export const downloadFile = (url: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
