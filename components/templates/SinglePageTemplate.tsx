import type { BookPageSingle } from "@/types/book";
import { SinglePageFrame, textStyle } from "@/components/templates/shells";
import { TemplateText } from "@/components/templates/TemplateText";
import { pageConfig } from "@/components/templates/pageConfig";

export function SinglePageTemplate({ page }: { page: BookPageSingle }) {
  const id = typeof page.id === "string" ? parseInt(page.id, 10) : page.id;
  const cfg = pageConfig[id];

  if (!cfg) {
    return (
      <SinglePageFrame src={page.image}>
        <div style={textStyle("top-right")}>
          <TemplateText>{page.text}</TemplateText>
        </div>
      </SinglePageFrame>
    );
  }

  return (
    <SinglePageFrame src={page.image} objectPosition={cfg.objectPosition}>
      <div style={textStyle(cfg.textLayout)}>
        <TemplateText size={cfg.textSize} color={cfg.textColor}>
          {page.text}
        </TemplateText>
      </div>
    </SinglePageFrame>
  );
}
