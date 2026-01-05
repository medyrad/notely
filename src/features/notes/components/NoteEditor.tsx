import { useNotesStore } from "../store";

export default function NoteEditor() {
  const draft = useNotesStore((s) => s.draft);
  const updateDraft = useNotesStore((s) => s.updateDraft);
  const createNote = useNotesStore((s) => s.createNote);

  if (!draft) return null;

  return (
    <div>
      <input
        value={draft.title}
        onChange={(e) => updateDraft({ title: e.target.value })}
        placeholder="Title"
      />

      <textarea
        value={draft.content}
        onChange={(e) => updateDraft({ content: e.target.value })}
        placeholder="Write your note..."
      />

      <button onClick={() => createNote(draft)}>Save</button>
    </div>
  );
}
