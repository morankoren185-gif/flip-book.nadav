import { BookViewerClient } from "@/components/BookViewerClient";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-[min(1200px,100%)] flex-col items-center justify-center px-3 py-8 md:px-8 md:py-10">
      <BookViewerClient />
    </main>
  );
}
