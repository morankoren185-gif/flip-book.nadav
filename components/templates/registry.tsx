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
import { Page01Template } from "@/components/templates/Page01";
import { Page04Template } from "@/components/templates/Page04";
import { Page05Template } from "@/components/templates/Page05";
import { Page08Template } from "@/components/templates/Page08";
import { Page11Template } from "@/components/templates/Page11";
import { Page12Template } from "@/components/templates/Page12";
import { Page15Template } from "@/components/templates/Page15";
import { Page16Template } from "@/components/templates/Page16";
import { Page19Template } from "@/components/templates/Page19";
import { Page20Template } from "@/components/templates/Page20";
import { Page21Template } from "@/components/templates/Page21";
import { Page22Template } from "@/components/templates/Page22";
import { Page23Template } from "@/components/templates/Page23";
import { Page24Template } from "@/components/templates/Page24";
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
      return <Page01Template page={page as BookPageSingle} />;
    case "page-04":
      return <Page04Template page={page as BookPageSingle} />;
    case "page-05":
      return <Page05Template page={page as BookPageSingle} />;
    case "page-08":
      return <Page08Template page={page as BookPageSingle} />;
    case "page-11":
      return <Page11Template page={page as BookPageSingle} />;
    case "page-12":
      return <Page12Template page={page as BookPageSingle} />;
    case "page-15":
      return <Page15Template page={page as BookPageSingle} />;
    case "page-16":
      return <Page16Template page={page as BookPageSingle} />;
    case "page-19":
      return <Page19Template page={page as BookPageSingle} />;
    case "page-20":
      return <Page20Template page={page as BookPageSingle} />;
    case "page-21":
      return <Page21Template page={page as BookPageSingle} />;
    case "page-22":
      return <Page22Template page={page as BookPageSingle} />;
    case "page-23":
      return <Page23Template page={page as BookPageSingle} />;
    case "page-24":
      return <Page24Template page={page as BookPageSingle} />;
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
