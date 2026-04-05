import type { BookPageSpread } from "@/types/book";
import { SpreadDualFrame } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread0607Template({ page }: { page: BookPageSpread }) {
  const halfWash = (
    <div
      className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#fffef8]/18 to-transparent"
      aria-hidden
    />
  );
  return (
    <SpreadDualFrame
      right={{
        src: page.rightImage!,
        position: "46% 50%",
        overlay: halfWash,
        content: (
          <div className="absolute bottom-[5%] end-[4%] z-10 max-w-[min(14rem,43%)]">
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        )
      }}
      left={{
        src: page.leftImage!,
        position: "54% 52%",
        overlay: halfWash,
        content: (
          <div className="absolute bottom-[5%] start-[4%] z-10 max-w-[min(14rem,43%)]">
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        )
      }}
    />
  );
}
