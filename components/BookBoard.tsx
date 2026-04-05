import type { ReactNode } from "react";

type BookBoardProps = {
  children: ReactNode;
  /** Hebrew hardcover: binding edge on inline-end (right). */
  showSpine?: boolean;
  className?: string;
};

/**
 * Outer board + inner "paper" like a physical volume (margins, contact shadow, spine hint).
 */
export function BookBoard({
  children,
  showSpine = true,
  className = ""
}: BookBoardProps) {
  return (
    <div className={`book-board relative ${className}`.trim()}>
      {showSpine ? (
        <div
          className="book-spine pointer-events-none absolute end-0 top-[3%] bottom-[3%] z-20 w-[max(5px,0.5rem)] rounded-ee-[3px] bg-gradient-to-b from-[#3d362c]/22 via-[#2c2418]/14 to-[#3d362c]/20 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.28)]"
          aria-hidden
        />
      ) : null}
      <div className="book-page-paper relative h-full min-h-0 w-full overflow-hidden">{children}</div>
    </div>
  );
}
