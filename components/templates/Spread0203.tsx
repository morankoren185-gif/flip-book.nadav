import type { BookPageSpread } from "@/types/book";
import { SpreadContinuousFrame } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";

export function Spread0203Template({ page }: { page: BookPageSpread }) {
  return (
    <SpreadContinuousFrame
      page={page}
      objectPosition="50% 44%"
      atmosphere={
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#fffef8]/2 via-transparent to-[#fffdf9]/14"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] book-spread-continuous-wash"
            aria-hidden
          />
        </>
      }
      cells={[
        <div key="r" className="relative h-full min-h-0">
          <div className="absolute bottom-[5%] end-[3%] z-10 max-w-[min(13.5rem,40%)]">
            <TemplateText>{page.rightText}</TemplateText>
          </div>
        </div>,
        <div key="l" className="relative h-full min-h-0">
          <div className="absolute bottom-[5%] start-[3%] z-10 max-w-[min(13.5rem,40%)]">
            <TemplateText>{page.leftText}</TemplateText>
          </div>
        </div>
      ]}
    />
  );
}
