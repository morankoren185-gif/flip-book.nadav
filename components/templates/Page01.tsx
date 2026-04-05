import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page01Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="48% 50%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-bl from-[#fffef8]/35 via-transparent to-transparent"
          aria-hidden
        />
      }
    >
      <div className="absolute top-[4%] end-[3%] z-10 max-w-[min(16rem,44%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
