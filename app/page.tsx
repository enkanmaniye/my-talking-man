import { LinkButton } from "@/components/ui/link-button";

const features = [
  {
    title: "Made from your photos",
    text: "Upload photographs, with permission, to create a realistic 3D character.",
    color: "bg-peach",
  },
  {
    title: "A personality you shape",
    text: "Set how he talks, what he loves and what he can't stand.",
    color: "bg-lilac",
  },
  {
    title: "Talk about anything",
    text: "Free-form conversation with memory that you can view, edit and delete.",
    color: "bg-sky",
  },
  {
    title: "Care, play, decorate",
    text: "Look after his needs, play games and build his room.",
    color: "bg-mint",
  },
];

export default function LandingPage() {
  return (
    <main id="content" className="mx-auto max-w-5xl px-5 py-12 md:py-20">
      <p className="text-sm font-bold tracking-wide text-berry uppercase">
        In development · 18+
      </p>
      <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
        Your virtual boyfriend, with a personality of his own.
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        My Talking Man is a browser-based AI companion game. There is nothing to
        install. He is a fictional AI character, never the real person.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href="/register">Create an account</LinkButton>
        <LinkButton href="/login" variant="secondary">Log in</LinkButton>
        <LinkButton href="/home" variant="secondary">Preview the app</LinkButton>
      </div>

      <ul className="mt-14 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature.title} className={`rounded-2xl p-6 ${feature.color}`}>
            <h2 className="text-xl font-bold">{feature.title}</h2>
            <p className="mt-2 leading-relaxed">{feature.text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm leading-relaxed text-muted">
        These features are being built. Accounts, photo generation and chat are
        not available yet.
      </p>
    </main>
  );
}
