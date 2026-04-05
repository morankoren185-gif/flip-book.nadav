import type { BookPageSingle } from "@/types/book";
import { SingleArtPage } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page12Template({ page }: { page: BookPageSingle }) {
  return (
    <SingleArtPage page={page} objectPosition="50% 48%">
      <div className="absolute bottom-[7%] end-[6%] z-10 max-w-[min(17rem,48%)] text-right">
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SingleArtPage>
  );
}
