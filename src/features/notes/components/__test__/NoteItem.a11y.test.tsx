import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { NoteItem } from "../NoteItem";

const note = {
  id: "1",
  title: "A11y Note",
  content: "Screen reader friendly",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe("NoteItem accessibility", () => {
  it("has no a11y violations", async () => {
    const { container } = render(<NoteItem note={note} />);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
