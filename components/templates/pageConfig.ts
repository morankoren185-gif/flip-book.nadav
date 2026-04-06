import type { TextLayout } from "@/components/templates/shells";

export type SinglePageConfig = {
  objectPosition: string;
  textLayout: TextLayout;
  textSize: "sm" | "md" | "lg";
  textColor: string;
};

export const pageConfig: Record<number, SinglePageConfig> = {
  1:  { objectPosition: "65% 50%", textLayout: "top-left",    textSize: "lg", textColor: "#1a1410" },
  4:  { objectPosition: "50% 55%", textLayout: "top-right",   textSize: "lg", textColor: "#1a1410" },
  5:  { objectPosition: "55% 50%", textLayout: "top-right",   textSize: "lg", textColor: "#1a1410" },
  8:  { objectPosition: "58% 48%", textLayout: "top-left",    textSize: "lg", textColor: "#1a1410" },
  11: { objectPosition: "50% 48%", textLayout: "center-left", textSize: "lg", textColor: "#1a1410" },
  12: { objectPosition: "50% 50%", textLayout: "top-right",   textSize: "lg", textColor: "#1a1410" },
  15: { objectPosition: "50% 50%", textLayout: "bottom-left", textSize: "lg", textColor: "#1a1410" },
  16: { objectPosition: "50% 46%", textLayout: "top-left",    textSize: "lg", textColor: "#1a1410" },
  19: { objectPosition: "50% 48%", textLayout: "top-left",    textSize: "lg", textColor: "#1a1410" },
  20: { objectPosition: "50% 50%", textLayout: "bottom-left", textSize: "lg", textColor: "#1a1410" },
  21: { objectPosition: "55% 50%", textLayout: "top-right",   textSize: "lg", textColor: "#1a1410" },
  22: { objectPosition: "50% 50%", textLayout: "top-left",    textSize: "lg", textColor: "#1a1410" },
  23: { objectPosition: "50% 55%", textLayout: "bottom-left", textSize: "lg", textColor: "#1a1410" },
  24: { objectPosition: "50% 60%", textLayout: "bottom-left", textSize: "lg", textColor: "#1a1410" },
};
