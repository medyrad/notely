import { lazy, Suspense } from "react";
import { useNotesStore } from "../store";
import { NotesSearch } from "./NotesSearch";

const NoteEditor = lazy(() => import("./NoteEditor"));

export function NotesPage() {
  const startDraft = useNotesStore((s) => s.startDraft);

  return (
    <main>
      <button onClick={() => startDraft()}>New Note</button>

      <NotesSearch />

      <Suspense fallback={<div>Loading editor…</div>}>
        <NoteEditor />
      </Suspense>
    </main>
  );
}
