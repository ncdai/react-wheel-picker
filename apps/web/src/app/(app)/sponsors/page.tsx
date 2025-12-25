import { HeartIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { VercelOSSProgramBadge } from "@/components/vercel-oss-badge";
import { cn } from "@/lib/utils";

import { INDIVIDUAL_SPONSORS } from "./data";

export default function SponsorsPage() {
  return (
    <div className="relative min-h-dvh max-w-screen overflow-x-hidden">
      <h1 className="mt-12 mb-2 text-center text-3xl font-semibold tracking-tight">
        Support <span className="block sm:hidden" />
        React Wheel Picker
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
            Sponsor
          </a>
        </Button>
      </div>

      <div className="border-t border-dashed px-4 py-12">
        <h2 className="mb-4 font-mono text-xs">Organization Sponsors</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <SponsorCard href="https://vercel.com/oss?utm_source=react-wheel-picker&utm_medium=web">
            <VercelOSSProgramBadge className="h-6" />
          </SponsorCard>

          <SponsorCard
            className="relative"
            href="https://shadcnstudio.com?utm_source=chandai&utm_medium=banner&utm_campaign=github"
          >
            <div className="flex items-center gap-2.5">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 328 329"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-7 shrink-0"
              >
                <rect
                  y="0.5"
                  width="328"
                  height="328"
                  rx="164"
                  fill="black"
                  className="dark:fill-white"
                />
                <path
                  d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <path
                  d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="238.136"
                  y1="98.8184"
                  x2="196.76"
                  y2="139.707"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="135.688"
                  y1="200.957"
                  x2="94.3128"
                  y2="241.845"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="133.689"
                  y1="137.524"
                  x2="92.5566"
                  y2="96.3914"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
                <line
                  x1="237.679"
                  y1="241.803"
                  x2="196.547"
                  y2="200.671"
                  stroke="white"
                  strokeWidth="20"
                  className="dark:stroke-black"
                />
              </svg>

              <div className="flex flex-col gap-1">
                <span className="text-sm leading-none font-semibold text-foreground">
                  shadcnstudio.com
                </span>
                <span className="text-xs leading-none text-muted-foreground">
                  shadcn blocks & templates
                </span>
              </div>
            </div>

            <span className="absolute right-2 bottom-1 text-xs font-medium text-muted-foreground">
              Silver Sponsor
            </span>
          </SponsorCard>
        </div>

        <h2 className="mt-12 mb-4 font-mono text-xs">Individual Sponsors</h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {INDIVIDUAL_SPONSORS.map((item) => (
            <SponsorCard
              key={item.name}
              href={item.website}
              className="justify-start p-4"
            >
              <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
                <div className="relative row-span-2 size-8 shrink-0">
                  <Image
                    className="size-8 rounded-full select-none"
                    src={item.avatar}
                    alt={item.name}
                    width={32}
                    height={32}
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-black/10 ring-inset dark:ring-white/15" />
                </div>
                <div className="truncate text-sm leading-5 font-semibold text-foreground">
                  {item.name}
                </div>
                <div className="truncate text-xs leading-4 text-muted-foreground">
                  {item.tagline}
                </div>
              </div>
            </SponsorCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function SponsorCard({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "flex items-center justify-center rounded-md border p-8 shadow-xs transition-colors hover:bg-accent/30",
        className,
      )}
      target="_blank"
      rel="noopener"
      {...props}
    />
  );
}
