import type { BookPageBackCover } from "@/types/book";
import { BackCoverFrame } from "@/components/templates/shells";
import { BookImage } from "@/components/BookImage";

export function BackCoverTemplate({ page }: { page: BookPageBackCover }) {
  return (
    <BackCoverFrame>
      <BookImage
        src={page.image}
        alt="עטיפה אחורית"
        fill
        className="object-cover"
        style={{ objectPosition: "50% 48%" }}
        sizes="500px"
      />
    </BackCoverFrame>
  );
}
