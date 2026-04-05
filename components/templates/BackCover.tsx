import type { BookPageBackCover } from "@/types/book";
import { BookBoard } from "@/components/BookBoard";
import { BookImage } from "@/components/BookImage";

export function BackCoverTemplate({ page }: { page: BookPageBackCover }) {
  return (
    <BookBoard
      showSpine={false}
      className="book-board-rear mx-auto w-full max-w-[min(460px,94vw)] md:max-w-[min(540px,46vw)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--book-radius-inner)] bg-[#ddd9d2]">
        <BookImage
          src={page.image}
          alt="עטיפה אחורית"
          fill
          className="object-contain object-center saturate-[0.9] contrast-[0.98]"
          style={{ objectPosition: "50% 48%" }}
          sizes="94vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[#ebe9e4]/48"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-[#d8d6d1]/32"
          aria-hidden
        />
      </div>
    </BookBoard>
  );
}
