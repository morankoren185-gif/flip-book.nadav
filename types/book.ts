export type PageLayout =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "center";

/** Art-directed composition id; maps to `components/templates/*`. */
export type BookTemplate = string;

export type BookPageCover = {
  id: string;
  type: "cover";
  image: string;
  title: string;
  subtitle: string;
  author: string;
  template: BookTemplate;
};

export type BookPageSingle = {
  id: string | number;
  type: "single";
  image: string;
  text: string;
  layout: PageLayout;
  template: BookTemplate;
};

export type BookPageSpread = {
  id: string | number;
  type: "spread";
  image?: string;
  rightImage?: string;
  leftImage?: string;
  rightText: string;
  leftText: string;
  rightLayout: PageLayout;
  leftLayout: PageLayout;
  template: BookTemplate;
};

export type BookPageBackCover = {
  id: string;
  type: "back-cover";
  image: string;
  template: BookTemplate;
};

export type BookPage =
  | BookPageCover
  | BookPageSingle
  | BookPageSpread
  | BookPageBackCover;
