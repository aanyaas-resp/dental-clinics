import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — merges class names (clsx) and resolves conflicting Tailwind
 * utility classes (tailwind-merge). Used by every component, including
 * the shadcn-style primitives in components/ui/.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
