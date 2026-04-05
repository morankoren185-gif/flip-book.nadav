import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page20Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage page={page} objectPosition="46% 44%">
      <div className="absolute bottom-[6%] end-[5%] z-10 max-w-[min(16rem,47%)]">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
