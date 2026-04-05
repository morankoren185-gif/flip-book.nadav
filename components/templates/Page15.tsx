import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page15Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="48% 46%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#fffef9]/25 via-transparent to-transparent"
          aria-hidden
        />
      }
    >
      <div className="absolute bottom-[5%] end-[4%] z-10 max-w-[min(16.5rem,46%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
