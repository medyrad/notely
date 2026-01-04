import type { Note } from "../types";

export type SortStrategy = (a: Note, b: Note) => number;

export const sortByDate: SortStrategy = (a, b) => b.updatedAt - a.updatedAt;

export const sortByTitle: SortStrategy = (a, b) => a.title.localeCompare(b.title);

export const sortByContentLength: SortStrategy = (a, b) => b.content.length - a.content.length;

export const SORTERS = {
  date: sortByDate,
  title: sortByTitle,
  length: sortByContentLength,
} as const;

export type SortKey = keyof typeof SORTERS;
