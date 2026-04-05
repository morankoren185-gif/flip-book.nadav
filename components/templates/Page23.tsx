import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page23Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="48% 48%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#f8f6f0]/3 via-transparent to-[#fffef9]/18"
          aria-hidden
        />
      }
    >
      <div className="absolute bottom-[5%] end-[4%] z-10 max-w-[min(15.5rem,44%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
