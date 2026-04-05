import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page08Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage page={page} objectPosition="54% 50%">
      <div className="absolute top-[5%] start-[4%] z-10 max-w-[min(15.5rem,45%)]">
        <div
          className="pointer-events-none absolute -inset-[14%] rounded-[50%] bg-[radial-gradient(ellipse_at_60%_45%,rgba(255,253,248,0.28)_0%,transparent_68%)]"
          aria-hidden
        />
        <div className="relative">
          <TemplateText>{page.text}</TemplateText>
        </div>
      </div>
    </SingleArtPage>
  );
}
