import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page04Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="52% 46%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-transparent via-transparent to-[#2a2318]/12"
          aria-hidden
        />
      }
    >
      <div className="absolute bottom-[5%] start-[4%] z-10 max-w-[min(15.5rem,46%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
