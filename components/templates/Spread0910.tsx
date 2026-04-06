import type { BookPageSpread } from "@/types/book";
import { SpreadSplitFrame, textStyle } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread0910Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadSplitFrame
      right={{
        src: page.rightImage!,
        objectPosition: "50% 40%",
        objectFit: "contain",
        background: "#f5ede0",
        children: (
          <div style={textStyle(page.rightLayout)}>
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        )
      }}
      left={{
        src: page.leftImage!,
        objectPosition: "50% 40%",
        objectFit: "contain",
        background: "#e8f0ea",
        children: (
          <div style={textStyle(page.leftLayout)}>
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        )
      }}
    />
  );
}
