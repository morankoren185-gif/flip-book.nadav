import type { BookPageSpread } from "@/types/book";
import { SpreadContinuousFrame } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread1314Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadContinuousFrame
      page={page}
      objectPosition="50% 52%"
      atmosphere={
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#fffdf9]/18 via-transparent to-[#faf8f3]/1"
          aria-hidden
        />
      }
      cells={[
        <div key="r" className="relative h-full min-h-0">
          <div className="absolute top-[5%] end-[4%] z-10 max-w-[min(13rem,38%)]">
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        </div>,
        <div key="l" className="relative h-full min-h-0">
          <div className="absolute top-[5%] start-[4%] z-10 max-w-[min(13rem,38%)]">
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        </div>
      ]}
    />
  );
}
