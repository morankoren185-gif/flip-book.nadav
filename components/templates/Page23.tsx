import type { BookPageSingle } from "@/types/book";
import {
  SinglePageFrame,
  textStyle,
  type TextLayout
} from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page23Template({ page }: { page: BookPageSingle }) {
  return (
    <SinglePageFrame src={page.image} objectPosition="50% 55%">
      <div style={textStyle(page.layout as TextLayout)}>
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SinglePageFrame>
  );
}
