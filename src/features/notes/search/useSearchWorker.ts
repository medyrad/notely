import { useEffect, useRef } from "react";
import type { Note } from "../types";

export function useSearchWorker(notes: Note[]) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("./search.worker.ts", import.meta.url), {
      type: "module",
    });

    workerRef.current.postMessage({
      type: "BUILD_INDEX",
      payload: notes,
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, [notes]);

  const search = (term: string): Promise<string[]> => {
    return new Promise((resolve) => {
      const worker = workerRef.current;
      if (!worker) return resolve([]);

      worker.onmessage = (e) => resolve(e.data);

      worker.postMessage({
        type: "SEARCH",
        payload: term,
      });
    });
  };

  return { search };
}
