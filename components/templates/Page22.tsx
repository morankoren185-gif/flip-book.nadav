import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page22Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage page={page} objectPosition="50% 46%">
      <div className="absolute bottom-[8%] start-[8%] end-[8%] z-10 flex justify-end">
        <div className="max-w-[min(18.5rem,92%)] text-right">
          <TemplateText>{page.text}</TemplateText>
        </div>
      </div>
    </SingleArtPage>
  );
}
