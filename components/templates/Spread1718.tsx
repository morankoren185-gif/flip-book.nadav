import type { BookPageSpread } from "@/types/book";
import { SpreadContinuousFrame } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread1718Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadContinuousFrame
      page={page}
      objectPosition="48% 48%"
      atmosphere={
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(255,251,246,0.2)_0%,transparent_58%)]"
          aria-hidden
        />
      }
      cells={[
        <div key="r" className="relative h-full min-h-0">
          <div className="absolute bottom-[5%] end-[3%] z-10 max-w-[min(13rem,39%)]">
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        </div>,
        <div key="l" className="relative h-full min-h-0">
          <div className="absolute bottom-[5%] start-[3%] z-10 max-w-[min(14.5rem,41%)]">
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        </div>
      ]}
    />
  );
}
