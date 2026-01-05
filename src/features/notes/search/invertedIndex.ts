import type { Note, NoteId } from "../types";
export class InvertedIndex {
  private index = new Map<string, Set<NoteId>>();

  add(note: Note) {
    const tokens = this.tokenize(note.title + " " + note.content);
    tokens.forEach((token) => {
      const set = this.index.get(token) ?? new Set<NoteId>();
      set.add(note.id);
      this.index.set(token, set);
    });
  }

  remove(note: Note) {
    const tokens = this.tokenize(note.title + " " + note.content);
    tokens.forEach((token) => {
      const set = this.index.get(token);
      if (!set) return;
      set.delete(note.id);
      if (set.size === 0) this.index.delete(token);
    });
  }

  search(query: string): Set<NoteId> {
    const tokens = this.tokenize(query);
    if (tokens.length === 0) return new Set();

    return (
      tokens.reduce<Set<NoteId> | null>((acc, token) => {
        const ids = this.index.get(token);
        if (!ids) return new Set();
        if (!acc) return new Set(ids);
        return new Set([...acc].filter((id) => ids.has(id)));
      }, null) ?? new Set()
    );
  }

  private tokenize(text: string): string[] {
    return text.toLowerCase().split(/\W+/).filter(Boolean);
  }
}
