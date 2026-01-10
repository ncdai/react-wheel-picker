import { HeartIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { INDIVIDUAL_SPONSORS, ORGANIZATIONAL_SPONSORS } from "@/data/sponsors";

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

      <div className="border-t border-dashed px-4 py-12">
        <h2 className="mb-4 font-mono text-xs">Organization Sponsors</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ORGANIZATIONAL_SPONSORS.map((sponsor) => {
            const SponsorLogo = sponsor.logo;

            return (
              <a
                key={sponsor.name}
                className="flex items-center justify-center rounded-md border shadow-xs transition-colors hover:bg-accent/30"
                href={sponsor.url}
                target="_blank"
                rel="noopener sponsored"
              >
                <SponsorLogo
                  className="w-full max-w-80"
                  aria-label={`${sponsor.name} logo`}
                />
              </a>
            );
          })}
        </div>

        {INDIVIDUAL_SPONSORS.length > 0 && (
          <>
            <h2 className="mt-12 mb-4 font-mono text-xs">
              Individual Sponsors
            </h2>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
              {INDIVIDUAL_SPONSORS.map((sponsor) => (
                <a
                  key={sponsor.name}
                  className="flex items-center justify-start rounded-md border p-4 shadow-xs transition-colors hover:bg-accent/30"
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener sponsored"
                >
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
                    <div className="relative row-span-2 size-10 shrink-0">
                      <Image
                        className="size-10 rounded-full select-none"
                        src={sponsor.avatar}
                        alt={sponsor.name}
                        width={40}
                        height={40}
                        unoptimized
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/15" />
                    </div>

                    <div className="truncate text-sm leading-5 font-semibold text-foreground">
                      {sponsor.name}
                    </div>

                    <div className="truncate text-xs leading-5 text-muted-foreground">
                      {sponsor.tagline}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
