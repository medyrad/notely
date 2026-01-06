import { useState, useTransition, useDeferredValue, type ChangeEvent } from "react";

import { useSearchWorker } from "../search/useSearchWorker";
import { useNotesStore } from "../store";
import { NotesList } from "./ NoteList";

export function NotesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const allNotes = useNotesStore((state) => state.noteIds.map((id) => state.notesById[id]));

  const { search } = useSearchWorker(allNotes);

  const deferredResults = useDeferredValue(results);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(async () => {
      if (!value.trim()) {
        setResults([]);
        return;
      }

      const ids = await search(value);
      setResults(ids);
    });
  };

  return (
    <section aria-label="Notes search">
      <input
        type="search"
        value={query}
        onChange={onChange}
        placeholder="Search notes…"
        aria-label="Search notes"
      />

      {isPending && (
        <span role="status" aria-live="polite">
          Searching…
        </span>
      )}

      <NotesList noteIds={deferredResults} />
    </section>
  );
}
