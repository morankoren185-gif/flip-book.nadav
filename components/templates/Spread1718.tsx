import type { BookPageSpread } from "@/types/book";
import { SpreadContinuousFrame, textStyle } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread1718Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadContinuousFrame image={page.image!} objectPosition="48% 48%">
      <div style={{ position: "absolute", inset: 0 }} dir="rtl">
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50%"
          }}
        >
          <div style={textStyle(page.rightLayout)}>
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50%"
          }}
        >
          <div style={textStyle(page.leftLayout)}>
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        </div>
      </div>
    </SpreadContinuousFrame>
  );
}
