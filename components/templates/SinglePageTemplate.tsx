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

  // Split text at double newline when a second layout is configured
  const parts = cfg.text2Layout ? page.text.split(/\n\n/) : null;
  const text1 = parts ? parts[0] : page.text;
  const text2 = parts && parts.length > 1 ? parts.slice(1).join("\n\n") : null;

  return (
    <SinglePageFrame src={page.image} objectPosition={cfg.objectPosition}>
      <div style={textStyle(cfg.textLayout)}>
        <TemplateText size={cfg.textSize} color={cfg.textColor}>
          {text1}
        </TemplateText>
      </div>
      {cfg.text2Layout && text2 && (
        <div style={textStyle(cfg.text2Layout)}>
          <TemplateText size={cfg.textSize} color={cfg.textColor}>
            {text2}
          </TemplateText>
        </div>
      )}
    </SinglePageFrame>
  );
}
