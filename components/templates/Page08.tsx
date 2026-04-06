import type { BookPageSingle } from "@/types/book";
import {
  SinglePageFrame,
  textStyle,
  type TextLayout
} from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Page08Template({ page }: { page: BookPageSingle }) {
  return (
    <SinglePageFrame src={page.image} objectPosition="55% 50%">
      <div style={textStyle(page.layout as TextLayout)}>
        <TemplateText>{page.text}</TemplateText>
      </div>
    </SinglePageFrame>
  );
}
