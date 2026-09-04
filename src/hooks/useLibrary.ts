"use client";

import { useCallback, useEffect, useState } from "react";

export type SavedRecording = {
  id: string;
  text: string;
  /** object URL or empty if only metadata */
  createdAt: string;
};

export type LibraryState = {
  favorites: string[]; // affirmation ids
  customLines: { id: string; content: string; createdAt: string }[];
  recordings: SavedRecording[];
};

const KEY = "iaffirm_library_v1";

const empty = (): LibraryState => ({
  favorites: [],
  customLines: [],
  recordings: [],
});

export function useLibrary() {
  const [lib, setLib] = useState<LibraryState>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLib({ ...empty(), ...JSON.parse(raw) });
    } catch { /* */ }
    setReady(true);
  }, []);

  const persist = useCallback((next: LibraryState) => {
    setLib(next);
    localStorage.setItem(KEY, JSON.stringify({
      favorites: next.favorites,
      customLines: next.customLines,
      // don't persist blob URLs long-term; store text metadata
      recordings: next.recordings.map(({ id, text, createdAt }) => ({ id, text, createdAt })),
    }));
  }, []);

  const toggleFavorite = useCallback((affirmationId: string) => {
    setLib((prev) => {
      const has = prev.favorites.includes(affirmationId);
      const favorites = has
        ? prev.favorites.filter((id) => id !== affirmationId)
        : [...prev.favorites, affirmationId];
      const next = { ...prev, favorites };
      localStorage.setItem(KEY, JSON.stringify({
        ...next,
        recordings: next.recordings.map(({ id, text, createdAt }) => ({ id, text, createdAt })),
      }));
      return next;
    });
  }, []);

  const addRecording = useCallback((text: string) => {
    setLib((prev) => {
      const rec: SavedRecording = {
        id: `rec_${Date.now()}`,
        text,
        createdAt: new Date().toISOString(),
      };
      const next = { ...prev, recordings: [rec, ...prev.recordings].slice(0, 50) };
      localStorage.setItem(KEY, JSON.stringify({
        ...next,
        recordings: next.recordings.map(({ id, text, createdAt }) => ({ id, text, createdAt })),
      }));
      return next;
    });
  }, []);

  const addCustomLine = useCallback((content: string) => {
    setLib((prev) => {
      const line = {
        id: `custom_${Date.now()}`,
        content,
        createdAt: new Date().toISOString(),
      };
      const next = { ...prev, customLines: [line, ...prev.customLines].slice(0, 100) };
      localStorage.setItem(KEY, JSON.stringify({
        ...next,
        recordings: next.recordings.map(({ id, text, createdAt }) => ({ id, text, createdAt })),
      }));
      return next;
    });
  }, []);

  const removeRecording = useCallback((id: string) => {
    setLib((prev) => {
      const next = { ...prev, recordings: prev.recordings.filter((r) => r.id !== id) };
      localStorage.setItem(KEY, JSON.stringify({
        ...next,
        recordings: next.recordings.map(({ id, text, createdAt }) => ({ id, text, createdAt })),
      }));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => lib.favorites.includes(id),
    [lib.favorites]
  );

  return {
    ready,
    lib,
    toggleFavorite,
    addRecording,
    addCustomLine,
    removeRecording,
    isFavorite,
  };
}
