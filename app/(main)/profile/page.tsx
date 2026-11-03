import type { Metadata } from "next";
import { Card, EmptyState, PageHeader, SampleBadge, UnavailableButton } from "@/components/ui/primitives";
import { samplePersonality, sampleTopics } from "@/lib/mock/sample-data";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <>
      <PageHeader title="Profile" intro="Shape his personality, and control his memories and your data." />
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        <Card title="Personality" badge={<SampleBadge />}>
          <ul className="space-y-4">
            {samplePersonality.map((trait) => {
              const label = `${trait.left} to ${trait.right}`;
              return (
                <li key={trait.left}>
                  <div className="mb-1 flex justify-between text-sm font-medium" aria-hidden="true">
                    <span>{trait.left}</span>
                    <span>{trait.right}</span>
                  </div>
                  <input type="range" disabled defaultValue={trait.value} aria-label={label} className="w-full cursor-not-allowed" />
                </li>
              );
            })}
          </ul>
        </Card>
        <Card title="Topics" badge={<SampleBadge />}>
          <ul className="divide-y divide-line">
            {sampleTopics.map((topic) => (
              <li key={topic.name} className="flex justify-between gap-3 py-2 text-sm">
                <span>{topic.name}</span>
                <span className="font-semibold">{topic.preference}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Memories">
          <EmptyState title="No memories yet">
            You will be able to view, edit, add and delete everything he remembers.
          </EmptyState>
        </Card>
        <Card title="Privacy and data">
          <p className="mb-3 text-sm leading-relaxed text-muted">
            Delete photographs, his 3D model, memories, conversations or your
            whole account. These controls need accounts first.
          </p>
          <div className="flex flex-wrap gap-2">
            <UnavailableButton>Delete photographs</UnavailableButton>
            <UnavailableButton>Delete account</UnavailableButton>
          </div>
        </Card>
      </div>
    </>
  );
}
