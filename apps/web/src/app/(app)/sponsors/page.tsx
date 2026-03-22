import { HeartIcon } from "lucide-react";

import { SponsorCard } from "@/components/sponsor-card";
import { Button } from "@/components/ui/button";
import { SPONSORS } from "@/data/sponsors";
import type { SponsorTier } from "@/types/sponsors";
import { type Sponsor, SPONSOR_TIERS } from "@/types/sponsors";

const sponsorsByTier = SPONSORS.reduce(
  (acc, sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  },
  {} as Record<SponsorTier, Sponsor[]>,
);

export default function SponsorsPage() {
  return (
    <div className="relative min-h-dvh max-w-screen overflow-x-hidden">
      <h1 className="mt-12 mb-2 text-center text-3xl font-semibold tracking-tight">
        Sponsors
      </h1>

      <p className="mx-4 mb-6 text-center text-balance text-muted-foreground">
        Your sponsorship means a lot to open-source projects, including React
        Wheel Picker.
      </p>

      <div className="mb-12 flex justify-center">
        <Button variant="outline" asChild>
          <a
            href="https://github.com/sponsors/ncdai"
            target="_blank"
            rel="noopener"
          >
            <HeartIcon />
            Sponsor My Work
          </a>
        </Button>
      </div>

      <div className="flex flex-col gap-12 border-t border-dashed px-4 py-12">
        {SPONSOR_TIERS.map((tier) => (
          <SponsorsGroup
            key={tier.name}
            title={tier.title}
            sponsors={sponsorsByTier[tier.name] || []}
          />
        ))}
      </div>
    </div>
  );
}

function SponsorsGroup({
  title,
  sponsors,
}: {
  title: string;
  sponsors: Sponsor[];
}) {
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4 font-mono text-xs">{title}</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
