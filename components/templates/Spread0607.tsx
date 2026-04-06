import type { BookPageSpread } from "@/types/book";
import { SpreadSplitFrame, textStyle } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread0607Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadSplitFrame
      right={{
        src: page.rightImage!,
        objectPosition: "46% 50%",
        children: (
          <div style={textStyle(page.rightLayout)}>
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        )
      }}
      left={{
        src: page.leftImage!,
        objectPosition: "54% 52%",
        children: (
          <div style={textStyle(page.leftLayout)}>
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        )
      }}
    />
  );
}
