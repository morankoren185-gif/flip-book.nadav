import type { BookPageSingle } from "@/types/book";
import { SinglePageFrame, textStyle } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page04Template({ page }: { page: BookPageSingle }) {
  return (
    <SinglePageFrame src={page.image} objectPosition="50% 55%">
      <div style={textStyle("top-right")}>
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SinglePageFrame>
  );
}
