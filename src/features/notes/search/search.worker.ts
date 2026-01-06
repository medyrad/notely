import type { Note } from "../types";

const index: Map<string, Set<string>> = new Map();

function buildIndex(notes: Note[]) {
  index.clear();

  for (const note of notes) {
    const tokens = note.content.toLowerCase().split(/\W+/);
    for (const token of tokens) {
      if (!index.has(token)) {
        index.set(token, new Set());
      }
      index.get(token)!.add(note.id);
    }
  }
}

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case "BUILD_INDEX":
      buildIndex(payload);
      break;

    case "SEARCH":
      const term = payload.toLowerCase();
      const result = index.get(term) ?? new Set();
      postMessage([...result]);
      break;
  }
};
