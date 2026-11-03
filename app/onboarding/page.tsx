import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/link-button";
import { Notice, UnavailableButton } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Create your character" };

const steps = [
  { title: "Give permission", text: "Confirm you are 18+, the person shown is an adult, and that person gave informed consent." },
  { title: "Upload photographs", text: "Add the angles the generator asks for. You can preview, remove and replace each one." },
  { title: "Generate his 3D character", text: "This can take a while. You can leave and come back." },
  { title: "Review", text: "Preview him in 3D, then save, regenerate or delete the result." },
  { title: "Tell us about him", text: "A conversational interview covers his background, tastes and personality." },
  { title: "Fine-tune", text: "Adjust his personality, communication style and topics." },
];

export default function OnboardingPage() {
  return (
    <main id="content" className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Create your character</h1>
      <p className="mt-2 mb-6 leading-relaxed text-muted">
        This is how creating him will work. He is a private, fictional AI
        character and never the real person.
      </p>
      <Notice>Character creation is not available yet. No photographs can be uploaded or processed.</Notice>
      <ol className="mt-6 space-y-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
            <span aria-hidden="true" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-peach font-bold text-berry-dark">
              {index + 1}
            </span>
            <div>
              <h2 className="font-bold">{step.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <UnavailableButton>Start</UnavailableButton>
        <LinkButton href="/home" variant="secondary">Back to preview</LinkButton>
      </div>
    </main>
  );
}
