"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="content" className="mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Something went wrong</h1>
      <p className="text-muted">This page could not load. Your data has not changed.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-xl bg-berry px-5 py-2.5 font-semibold text-white hover:bg-berry-dark"
      >
        Try again
      </button>
    </main>
  );
}
