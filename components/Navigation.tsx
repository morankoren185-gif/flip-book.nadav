type NavigationProps = {
  onPrev: () => void;
  onNext: () => void;
  onStart: () => void;
  onEnd: () => void;
  canPrev: boolean;
  canNext: boolean;
  currentLabel: string;
};

export function Navigation({
  onPrev,
  onNext,
  onStart,
  onEnd,
  canPrev,
  canNext,
  currentLabel
}: NavigationProps) {
  return (
    <nav
      className="book-nav mt-7 flex flex-col items-center gap-4 px-4"
      aria-label="ניווט בספר"
      dir="rtl"
    >
      {/* Page label — quiet, literary */}
      <p className="book-nav-label">{currentLabel}</p>

      {/*
        RTL layout: right group = go back in story (→ prev),
        left group = advance in story (← next).
        Matches how a Hebrew reader physically turns pages.
      */}
      <div className="flex w-full max-w-[420px] items-center justify-between gap-3">
        {/* Right side: start + prev */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="book-nav-btn book-nav-btn--corner"
            onClick={onStart}
            disabled={!canPrev}
            aria-label="לתחילת הספר"
            title="תחילת הספר"
          >
            <span aria-hidden>⟪</span>
          </button>
          <button
            type="button"
            className="book-nav-btn book-nav-btn--arrow"
            onClick={onPrev}
            disabled={!canPrev}
            aria-label="עמוד קודם"
            title="עמוד קודם"
          >
            <span aria-hidden>→</span>
          </button>
        </div>

        {/* Left side: next + end */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="book-nav-btn book-nav-btn--arrow"
            onClick={onNext}
            disabled={!canNext}
            aria-label="עמוד הבא"
            title="עמוד הבא"
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            className="book-nav-btn book-nav-btn--corner"
            onClick={onEnd}
            disabled={!canNext}
            aria-label="לסוף הספר"
            title="סוף הספר"
          >
            <span aria-hidden>⟫</span>
          </button>
        </div>
      </div>

      {/* Keyboard hint — very quiet, almost invisible */}
      <p className="book-nav-hint">
        ← עמוד הבא · → עמוד קודם · לחיצה בשולי העמוד
      </p>
    </nav>
  );
}
