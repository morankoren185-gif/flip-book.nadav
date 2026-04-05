import type { BookPageSpread } from "@/types/book";
import { SpreadDualFrame } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread0910Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadDualFrame
      right={{
        src: page.rightImage!,
        position: "48% 52%",
        overlay: (
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-transparent to-[#fffdf8]/14"
            aria-hidden
          />
        ),
        content: (
          <div className="absolute bottom-[6%] end-[4%] z-10 max-w-[min(13.5rem,42%)]">
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        )
      }}
      left={{
        src: page.leftImage!,
        position: "52% 44%",
        overlay: (
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-bl from-[#fffefb]/16 to-transparent"
            aria-hidden
          />
        ),
        content: (
          <div className="absolute top-[6%] start-[4%] z-10 max-w-[min(13.5rem,42%)]">
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        )
      }}
    />
  );
}
