import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page11Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage
      page={page}
      objectPosition="50% 44%"
      underVignette={
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_72%,rgba(255,252,247,0.22)_0%,transparent_62%)]"
          aria-hidden
        />
      }
    >
      <div className="absolute bottom-[6%] start-[7%] end-[7%] z-10 flex justify-center">
        <div className="max-w-[min(20rem,88%)]">
          <TemplateText className="text-center">{page.text}</TemplateText>
        </div>
      </div>
    </SingleArtPage>
  );
}
