"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState, type SyntheticEvent } from "react";

type BookImageProps = ImageProps & {
  alt: string;
};

/**
 * Same as next/image but with a clear RTL fallback if a file is missing from /public.
 */
export function BookImage({
  alt,
  className = "",
  onError,
  ...rest
}: BookImageProps) {
  const [broken, setBroken] = useState(false);

  const handleError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setBroken(true);
      onError?.(e);
      if (typeof rest.src === "string") {
        console.warn("[BookImage] failed to load:", rest.src);
      }
    },
    [onError, rest.src]
  );

  if (broken) {
    const src =
      typeof rest.src === "string" ? rest.src : String((rest.src as { src?: string })?.src ?? "");
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#faf4e6] px-4 text-center ${className}`.trim()}
        role="img"
        aria-label={alt}
      >
        <span dir="rtl" className="text-sm font-semibold text-[var(--book-ink)]">
          התמונה לא נטענה
        </span>
        <code dir="ltr" className="break-all text-xs text-[var(--book-muted)]">
          {src || "—"}
        </code>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      {...rest}
      onError={handleError}
    />
  );
}
