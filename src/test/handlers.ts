import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/notes", () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Mock Note",
        content: "From MSW",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]);
  }),
];
