import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page21Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="50% 46%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#fffdf9]/22 to-transparent"
          aria-hidden
        />
      }
    >
      <div className="absolute top-[7%] end-[5%] z-10 max-w-[min(15rem,42%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
