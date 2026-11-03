import { LinkButton } from "@/components/ui/link-button";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex min-h-screen max-w-lg flex-col items-start justify-center gap-4 px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Page not found</h1>
      <p className="text-muted">That page does not exist or has moved.</p>
      <LinkButton href="/">Back to the start</LinkButton>
    </main>
  );
}
