import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page24Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="50% 40%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_25%,transparent_0%,rgba(255,253,248,0.12)_55%,rgba(255,251,246,0.2)_100%)]"
          aria-hidden
        />
      }
    >
      <div className="absolute bottom-[8%] end-[6%] z-10 max-w-[min(17rem,48%)]">
        <TemplateText finale>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
