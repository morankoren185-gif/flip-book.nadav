"use client";

import type { CSSProperties, ReactNode } from "react";
import type { PageLayout } from "@/types/book";
import { BookImage } from "@/components/BookImage";

// ─────────────────────────────────────────────────────────
// Layout position map
// All text containers: position:absolute, zIndex:10
// ─────────────────────────────────────────────────────────
export type TextLayout = PageLayout | "center-right" | "center-left";

export function textStyle(layout: TextLayout): CSSProperties {
  const base: CSSProperties = { position: "absolute", zIndex: 10 };
  switch (layout) {
    case "top-right":
      return { ...base, top: "4%", right: "3%", maxWidth: "min(13rem,40%)" };
    case "top-left":
      return { ...base, top: "4%", left: "3%", maxWidth: "min(13rem,40%)" };
    case "bottom-right":
      return { ...base, bottom: "5%", right: "3%", maxWidth: "min(13rem,40%)" };
    case "bottom-left":
      return { ...base, bottom: "5%", left: "3%", maxWidth: "min(13rem,40%)" };
    case "center":
      return {
        ...base,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        maxWidth: "min(16rem,50%)",
        textAlign: "center"
      };
    case "center-right":
      return {
        ...base,
        top: "50%",
        right: "3%",
        transform: "translateY(-50%)",
        maxWidth: "min(13rem,40%)"
      };
    case "center-left":
      return {
        ...base,
        top: "50%",
        left: "3%",
        transform: "translateY(-50%)",
        maxWidth: "min(13rem,40%)"
      };
  }
}

// ─────────────────────────────────────────────────────────
// CoverFrame — 500 × 700, closed book appearance
// ─────────────────────────────────────────────────────────
export function CoverFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 800,
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// BackCoverFrame — 500 × 700, closed book appearance
// ─────────────────────────────────────────────────────────
export function BackCoverFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 800,
        overflow: "hidden"
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SinglePageFrame — 1000 × 700, full-bleed landscape illustration
//
// The landscape image spans the full 1000×700 area (same as
// SpreadContinuousFrame).  Text floats over the illustration in
// dead zones via textStyle() absolute positioning.
// ─────────────────────────────────────────────────────────
export function SinglePageFrame({
  src,
  objectPosition = "50% 50%",
  children
}: {
  src: string;
  objectPosition?: string;
  children?: ReactNode;
}) {
  return (
    <div style={{ position: "relative", width: 1200, height: 800, overflow: "hidden" }}>
      <BookImage
        src={src}
        alt=""
        fill
        style={{ objectFit: "cover", objectPosition }}
        sizes="1200px"
      />
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SpreadContinuousFrame — 1000 × 700, one landscape image
// ─────────────────────────────────────────────────────────
type SpreadContinuousFrameProps = {
  image: string;
  objectPosition?: string;
  children?: ReactNode;
};

export function SpreadContinuousFrame({
  image,
  objectPosition = "50% 50%",
  children
}: SpreadContinuousFrameProps) {
  return (
    <div
      style={{
        position: "relative",
        width: 1200,
        height: 800,
        overflow: "hidden"
      }}
      dir="rtl"
      lang="he"
    >
      <BookImage
        src={image}
        alt=""
        fill
        className="object-cover"
        style={{ objectPosition, borderRadius: 0 }}
        sizes="1200px"
      />
      <div className="book-spread-crease" aria-hidden />
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SpreadSplitFrame — 1000 × 700, two portrait images
// Container is flex row-reverse: first child = right page (screen RIGHT)
// ─────────────────────────────────────────────────────────
type SpreadHalf = {
  src: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  background?: string;
  children?: ReactNode;
};

type SpreadSplitFrameProps = {
  right: SpreadHalf;
  left: SpreadHalf;
};

export function SpreadSplitFrame({ right, left }: SpreadSplitFrameProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row-reverse",
        width: 1200,
        height: 800
      }}
      dir="rtl"
      lang="he"
    >
      {/* Right page — visually on the right in row-reverse */}
      <div
        style={{
          position: "relative",
          flex: "none",
          width: 600,
          height: 800,
          overflow: "hidden",
          backgroundColor: right.background
        }}
      >
        <BookImage
          src={right.src}
          alt=""
          fill
          style={{
            objectFit: right.objectFit ?? "cover",
            objectPosition: right.objectPosition ?? "50% 50%"
          }}
          sizes="600px"
        />
        {right.children}
      </div>

      {/* Left page — spine crease via borderRight */}
      <div
        style={{
          position: "relative",
          flex: "none",
          width: 600,
          height: 800,
          overflow: "hidden",
          borderRight: "1px solid rgba(0,0,0,0.07)",
          backgroundColor: left.background
        }}
      >
        <BookImage
          src={left.src}
          alt=""
          fill
          style={{
            objectFit: left.objectFit ?? "cover",
            objectPosition: left.objectPosition ?? "50% 50%"
          }}
          sizes="600px"
        />
        {left.children}
      </div>
    </div>
  );
}
