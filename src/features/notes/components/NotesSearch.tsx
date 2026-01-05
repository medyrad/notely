import { useState, useTransition, useDeferredValue } from "react";
import { searchNotes } from "../search/useSearchEngine";
import { NotesList } from "./ NoteList";

export function NotesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const deferredResults = useDeferredValue(results);

  const onChange = (value: string) => {
    setQuery(value);

    startTransition(() => {
      const ids = Array.from(searchNotes(query));
      setResults(ids);
    });
  };

  return (
    <>
      <input value={query} onChange={(e) => onChange(e.target.value)} />
      {isPending && <span>Searching…</span>}
      <NotesList noteIds={deferredResults} />
    </>
  );
}
