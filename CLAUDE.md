\# flipbook.nadav — ספר ילדים דיגיטלי עברי RTL



\## קבצים קריטיים — אסור לגעת

\- components/BookFlipBook.tsx

\- components/PageFrame.tsx  

\- components/BookViewerClient.tsx

\- styles/globals.css (keyframes בלבד — אסור לשנות)



\## ארכיטקטורה

\- Next.js 14, TypeScript, Tailwind, RTL Hebrew

\- כל הדפים חוץ מכריכה/גב = 1000×700px (ספר פתוח)

\- כריכה וגב = 500×700px (ספר סגור)

\- FLIP\_PAGE\_HEIGHT\_PX = 700

\- SPREAD\_PAGE\_WIDTH\_PX = 1000



\## בעיות פתורות — לא לשבור

\- רעד spread: availW=0 + measured state ב-BookFlipBook

\- perspective: 1800 ב-BookFlipBook

\- SinglePageFrame = 1000px full-bleed landscape



\## משימות פתוחות

1\. pageConfig.ts — קובץ config מרכזי לכל דף בודד

2\. SinglePageTemplate.tsx — תבנית גנרית אחת במקום 14

3\. טקסטים — Frank Ruhl Libre, גודל lg, מיקום על שטחים מתים

4\. spread-09-10 — objectFit contain עם רקע מתאים

5\. כריכה — כותרת למעלה, Secular One font

