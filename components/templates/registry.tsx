"use client";

import type { ReactNode } from "react";
import type {
  BookPage,
  BookPageBackCover,
  BookPageCover,
  BookPageSingle,
  BookPageSpread
} from "@/types/book";
import { PageBackCover } from "@/components/PageBackCover";
import { PageCover } from "@/components/PageCover";
import { PageSingle } from "@/components/PageSingle";
import { PageSpread } from "@/components/PageSpread";
import { BackCoverTemplate } from "@/components/templates/BackCover";
import { CoverTemplate } from "@/components/templates/Cover";
import { SinglePageTemplate } from "@/components/templates/SinglePageTemplate";
import { Spread0203Template } from "@/components/templates/Spread0203";
import { Spread0607Template } from "@/components/templates/Spread0607";
import { Spread0910Template } from "@/components/templates/Spread0910";
import { Spread1314Template } from "@/components/templates/Spread1314";
import { Spread1718Template } from "@/components/templates/Spread1718";

/**
 * Art-directed page: use template from book data when registered.
 * Unknown template id falls back to generic page components.
 */
export function renderBookPage(page: BookPage): ReactNode {
  switch (page.template) {
    case "cover":
      return <CoverTemplate page={page as BookPageCover} />;
    case "back-cover":
      return <BackCoverTemplate page={page as BookPageBackCover} />;
    case "page-01":
    case "page-04":
    case "page-05":
    case "page-08":
    case "page-11":
    case "page-12":
    case "page-15":
    case "page-16":
    case "page-19":
    case "page-20":
    case "page-21":
    case "page-22":
    case "page-23":
    case "page-24":
      return <SinglePageTemplate page={page as BookPageSingle} />;
    case "spread-02-03":
      return <Spread0203Template page={page as BookPageSpread} />;
    case "spread-06-07":
      return <Spread0607Template page={page as BookPageSpread} />;
    case "spread-09-10":
      return <Spread0910Template page={page as BookPageSpread} />;
    case "spread-13-14":
      return <Spread1314Template page={page as BookPageSpread} />;
    case "spread-17-18":
      return <Spread1718Template page={page as BookPageSpread} />;
    default:
      switch (page.type) {
        case "cover":
          return <PageCover page={page} />;
        case "single":
          return <PageSingle page={page} />;
        case "spread":
          return <PageSpread page={page} />;
        case "back-cover":
          return <PageBackCover page={page} />;
        default:
          return null;
      }
  }
}
