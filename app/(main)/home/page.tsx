import type { Metadata } from "next";
import { LinkButton } from "@/components/ui/link-button";
import { Card, SampleBadge, UnavailableButton } from "@/components/ui/primitives";
import { sampleNeeds } from "@/lib/mock/sample-data";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <div className="grid gap-5 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <section
        aria-labelledby="room-title"
        className="relative flex min-h-[26rem] flex-col items-center justify-center overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-sky to-peach p-6 text-center lg:min-h-[34rem]"
      >
        <div aria-hidden="true" className="absolute top-8 left-8 hidden h-28 w-24 rounded-t-full border-8 border-white/80 bg-white/40 sm:block" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/4 bg-sand" />
        <div className="relative max-w-sm rounded-2xl bg-white/90 p-6 shadow-sm">
          <h1 id="room-title" className="text-2xl font-extrabold tracking-tight">
            No character yet
          </h1>
          <p className="mt-2 mb-4 text-sm leading-relaxed text-muted">
            His 3D character will appear here after it is generated from your
            photographs.
          </p>
          <LinkButton href="/onboarding">See how creation works</LinkButton>
        </div>
      </section>

      <div className="space-y-5">
        <Card title="His needs" badge={<SampleBadge />}>
          <ul className="space-y-3">
            {sampleNeeds.map((need) => (
              <li key={need.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{need.label}</span>
                  <span className="text-muted">{need.value}</span>
                </div>
                <div className="h-2 rounded-full bg-sand">
                  <div className="h-2 rounded-full bg-berry" style={{ width: `${need.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Interact">
          <p className="mb-3 text-sm text-muted">Available once he exists.</p>
          <div className="flex flex-wrap gap-2">
            {["Feed", "Play", "Sleep", "Pet"].map((action) => (
              <UnavailableButton key={action}>{action}</UnavailableButton>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
