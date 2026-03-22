import type { Sponsor } from "@/types/sponsors";

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <a
      key={sponsor.name}
      className="flex items-center justify-center rounded-md border shadow-xs transition-colors hover:bg-accent/30"
      href={sponsor.url}
      target="_blank"
      rel="noopener sponsored"
    >
      <sponsor.logo
        className="w-full max-w-80"
        aria-label={`${sponsor.name} logo`}
      />
    </a>
  );
}
