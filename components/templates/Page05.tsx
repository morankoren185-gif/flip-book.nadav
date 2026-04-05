import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page05Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="46% 54%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#fffdf8]/28 to-transparent"
          aria-hidden
        />
      }
    >
      <div className="absolute top-[6%] end-[5%] z-10 max-w-[min(14rem,40%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
