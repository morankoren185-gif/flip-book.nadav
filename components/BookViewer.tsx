"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bookData } from "@/data/bookData";
import type { BookPage } from "@/types/book";
import { Navigation } from "@/components/Navigation";
import {
  BookFlipBook,
  type BookFlipBookHandle
} from "@/components/BookFlipBook";

export function BookViewer() {
  const total = bookData.length;
  const lastIndex = total - 1;
  const bookRef = useRef<BookFlipBookHandle>(null);
  const [flipIndex, setFlipIndex] = useState(0);

  const api = useCallback(() => bookRef.current?.pageFlip(), []);

  const goPrev = useCallback(() => {
    api()?.flipPrev();
  }, [api]);

  const goNext = useCallback(() => {
    api()?.flipNext();
  }, [api]);

  const goStart = useCallback(() => {
    api()?.flip(0);
  }, [api]);

  const goEnd = useCallback(() => {
    api()?.flip(lastIndex);
  }, [api, lastIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goNext();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const current = bookData[flipIndex] as BookPage;

  const currentLabel = useMemo(() => {
    const n = flipIndex + 1;
    if (current.type === "cover") return `שער · ${n} מתוך ${total}`;
    if (current.type === "back-cover")
      return `אחרי הסיפור — עטיפה אחורית · ${n} מתוך ${total}`;
    if (current.type === "single" && current.id === 24)
      return `סיום הסיפור · עמוד ${n} מתוך ${total}`;
    return `עמוד ${n} מתוך ${total}`;
  }, [current, flipIndex, total]);

  return (
    <div className="book-stage flex w-full flex-col items-center pb-12 pt-2 md:pt-4">
      <BookFlipBook
        ref={bookRef}
        onFlipIndex={setFlipIndex}
        onEdgeStoryNext={goNext}
        onEdgeStoryPrev={goPrev}
      />
      <Navigation
        onPrev={goPrev}
        onNext={goNext}
        onStart={goStart}
        onEnd={goEnd}
        canPrev={flipIndex > 0}
        canNext={flipIndex < lastIndex}
        currentLabel={currentLabel}
      />
    </div>
  );
}
