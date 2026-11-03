import type { Metadata } from "next";
import { Card, PageHeader, SampleBadge, UnavailableButton } from "@/components/ui/primitives";
import { sampleGames } from "@/lib/mock/sample-data";

export const metadata: Metadata = { title: "Games" };

export default function GamesPage() {
  return (
    <>
      <PageHeader title="Games" intro="Play mini-games to earn coins for food, clothes and furniture." />
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {sampleGames.map((game) => (
          <Card key={game.id} title={game.name} badge={<SampleBadge />}>
            <p className="mb-4 text-sm leading-relaxed text-muted">{game.description}</p>
            <UnavailableButton>Play</UnavailableButton>
          </Card>
        ))}
      </div>
    </>
  );
}
