import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page19Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="50% 50%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_65%,rgba(255,251,246,0.26)_0%,transparent_65%)]"
          aria-hidden
        />
      }
    >
      <div className="absolute bottom-[5%] start-[6%] end-[6%] z-10 flex justify-center">
        <div className="max-w-[min(19rem,90%)] text-center">
          <TemplateText>{page.text}</TemplateText>
        </div>
      </div>
    </SingleArtPage>
  );
}
