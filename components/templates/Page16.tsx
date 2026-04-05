import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page16Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage page={page} objectPosition="46% 48%">
      <div className="absolute bottom-[4%] end-[3%] z-10 max-w-[min(17.5rem,50%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
