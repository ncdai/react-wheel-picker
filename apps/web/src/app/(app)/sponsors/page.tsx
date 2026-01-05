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
          <SponsorCard href="https://vercel.com/oss?utm_source=react-wheel-picker&utm_medium=web">
            <VercelOSSProgramBadge className="h-6" />
          </SponsorCard>

          <SponsorCard
            className="relative"
            href="https://shadcnstudio.com?utm_source=chanhdai&utm_medium=banner&utm_campaign=github"
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

          <SponsorCard className="pt-4 pb-3" href="https://termius.com">
            <div className="flex flex-col items-center">
              <svg
                className="mb-2 h-6 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 136 36"
              >
                <mask
                  id="a"
                  width="136"
                  height="36"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                  style={{ maskType: "luminance" }}
                >
                  <path fill="#fff" d="M135.812 0H.188v36h135.624V0Z" />
                </mask>
                <g mask="url(#a)">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M55.762 9.74h-3.281v1.54c0 1.108-.603 1.951-1.858 1.951h-.603v3.203h2.123v5.13c0 2.384 1.52 3.853 4.005 3.853 1.158 0 1.761-.265 1.906-.337v-3.035a4.53 4.53 0 0 1-.965.12c-.796 0-1.327-.264-1.327-1.252v-4.479h2.34v-3.203h-2.34V9.74Zm7.6 8.043h4.802c-.049-.915-.676-2.023-2.413-2.023-1.544 0-2.317 1.132-2.389 2.023Zm5.067 3.106 3.064.867c-.579 2.072-2.485 3.805-5.525 3.805-3.306 0-6.25-2.36-6.25-6.381 0-3.854 2.872-6.31 5.984-6.31 3.716 0 6.008 2.288 6.008 6.14 0 .507-.048 1.06-.072 1.133H63.29c.072 1.348 1.303 2.312 2.726 2.312 1.327 0 2.075-.626 2.413-1.566Zm13.27-7.658a3.625 3.625 0 0 0-.965-.12c-.965 0-2.485.385-3.113 1.734V13.23h-3.546v11.97h3.667v-5.227c0-2.384 1.327-3.25 2.799-3.25.362 0 .748.023 1.158.12V13.23Zm5.766 11.97v-6.889c0-1.083.7-2.07 1.978-2.07 1.327 0 1.93.89 1.93 2.022V25.2h3.62v-6.912c0-1.06.7-2.047 2.002-2.047 1.303 0 1.906.892 1.906 2.023V25.2h3.547v-7.755c0-3.25-2.171-4.575-4.44-4.575-1.616 0-2.774.53-3.715 1.878-.603-1.18-1.834-1.878-3.547-1.878-1.302 0-2.847.674-3.45 1.734V13.23h-3.498v11.97h3.667Zm21.739 0V13.23h-3.667v11.97h3.667Zm-3.981-15.63c0 1.18.965 2.143 2.123 2.143a2.155 2.155 0 0 0 2.171-2.144c0-1.18-.965-2.143-2.171-2.143-1.158 0-2.123.963-2.123 2.143Zm14.934 15.63h3.523a18.732 18.732 0 0 1-.121-2.144V13.23h-3.667v6.816c0 1.204-.772 2.046-2.002 2.046-1.303 0-1.931-.915-1.931-2.07V13.23h-3.667v7.562c0 2.553 1.641 4.672 4.56 4.672 1.206 0 2.582-.433 3.209-1.469 0 .313.048.988.096 1.204Zm5.646-3.396c.097 1.324 1.303 3.756 5.067 3.756 3.209 0 4.777-1.998 4.777-4.046 0-1.758-1.206-3.25-3.691-3.756l-1.593-.314c-.531-.096-.941-.385-.941-.89 0-.627.604-1.036 1.303-1.036 1.11 0 1.617.674 1.713 1.469l3.04-.554c-.121-1.397-1.327-3.564-4.801-3.564-2.678 0-4.609 1.782-4.609 3.973 0 1.686 1.014 3.131 3.571 3.685l1.376.313c.892.193 1.182.554 1.182.988 0 .53-.459 1.035-1.399 1.035-1.255 0-1.834-.795-1.883-1.613l-3.112.553Z"
                    clipRule="evenodd"
                  />
                  <path
                    fill="currentColor"
                    d="M31.237 30.694a10.7 10.7 0 0 1-.43-.009 11.018 11.018 0 0 1-9.21 4.951V32.83a8.207 8.207 0 0 0 7.22-4.285l.46-.844.954.122c.334.043.672.065 1.006.065 4.325 0 7.845-3.514 7.845-7.83a7.923 7.923 0 0 0-2.874-6.058l-.555-.456.044-.715c.01-.148.014-.3.014-.448 0-4.143-3.379-7.515-7.53-7.515a7.499 7.499 0 0 0-4.176 1.263l-1.047.697-.81-.961a7.506 7.506 0 0 0-5.765-2.682c-4.15 0-7.529 3.373-7.529 7.515 0 .116.003.233.008.349l.045.953-.872.392a7.89 7.89 0 0 0-4.66 7.192c0 4.346 3.545 7.883 7.898 7.883.463 0 .927-.04 1.38-.12l1.056-.185.459.967a8.253 8.253 0 0 0 7.43 4.701v2.807a11.07 11.07 0 0 1-9.486-5.395c-.279.022-.559.032-.839.032-5.906 0-10.71-4.794-10.71-10.69 0-3.896 2.122-7.458 5.488-9.335.237-5.485 4.78-9.873 10.332-9.873 2.662 0 5.185 1.011 7.095 2.812a10.313 10.313 0 0 1 4.704-1.13c5.675 0 10.295 4.584 10.34 10.238 2.128 1.999 3.373 4.84 3.373 7.761 0 5.867-4.78 10.638-10.658 10.638Zm-4.297-9.095c-.955.364-1.896.549-2.8.549a6.744 6.744 0 0 1-2.659-.551l-.069-.03c-.315-.134-.45-.298-.45-.655v-.478c0-.42.242-.691.638-.691l.088.012.024.009a6.599 6.599 0 0 0 2.426.464c.831 0 1.701-.157 2.586-.468l.08-.017h.022c.395 0 .637.27.637.69v.479c0 .38-.13.518-.496.675l-.027.012Zm-11.726-4.582c-.268.056-.469.268-.469.653v.802c0 .302.187.51.476.51a.752.752 0 0 0 .216-.034l4.623-1.493c.351-.117.544-.398.544-.783v-.666c0-.384-.193-.665-.543-.782l-4.614-1.49a.692.692 0 0 0-.243-.048c-.245 0-.459.153-.459.509v.813c0 .37.194.582.463.652l2.591.68-2.585.677Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth=".5"
                    d="M21.598 35.636c3.734 0 7.177-1.873 9.208-4.95.144.005.288.008.431.008 5.878 0 10.658-4.77 10.658-10.638 0-2.92-1.245-5.762-3.372-7.761-.046-5.654-4.666-10.238-10.341-10.238-1.648 0-3.253.388-4.704 1.13A10.318 10.318 0 0 0 16.383.375C10.83.375 6.288 4.763 6.05 10.248a10.695 10.695 0 0 0-5.488 9.335c0 5.896 4.804 10.69 10.71 10.69.28 0 .56-.01.839-.032a11.07 11.07 0 0 0 9.486 5.395Zm0 0V32.83m0 0a8.207 8.207 0 0 0 7.219-4.285l.46-.844.954.122c.334.043.672.065 1.006.065 4.325 0 7.845-3.514 7.845-7.83a7.923 7.923 0 0 0-2.874-6.058l-.555-.456.044-.715c.01-.148.014-.3.014-.448 0-4.143-3.379-7.515-7.53-7.515a7.499 7.499 0 0 0-4.176 1.263l-1.047.697-.81-.961a7.506 7.506 0 0 0-5.765-2.682c-4.15 0-7.529 3.373-7.529 7.515 0 .116.003.233.008.349l.045.953-.872.392a7.89 7.89 0 0 0-4.66 7.192c0 4.346 3.545 7.883 7.898 7.883.463 0 .927-.04 1.38-.12l1.056-.185.459.967a8.253 8.253 0 0 0 7.43 4.701Zm5.342-11.23c-.955.364-1.896.549-2.8.549a6.744 6.744 0 0 1-2.659-.551l-.069-.03c-.315-.134-.45-.298-.45-.655v-.478c0-.42.242-.691.638-.691l.088.012.024.009a6.599 6.599 0 0 0 2.426.464c.831 0 1.701-.157 2.586-.468l.08-.017h.022c.395 0 .637.27.637.69v.479c0 .38-.13.518-.496.675l-.027.012Zm-11.726-4.582c-.268.056-.469.268-.469.653v.802c0 .302.187.51.476.51a.752.752 0 0 0 .216-.034l4.623-1.493c.351-.117.544-.398.544-.783v-.666c0-.384-.193-.665-.543-.782l-4.614-1.49a.692.692 0 0 0-.243-.048c-.245 0-.459.153-.459.509v.813c0 .37.194.582.463.652l2.591.68-2.585.677Z"
                  />
                </g>
              </svg>
              <p className="text-center text-xs text-balance text-muted-foreground">
                Termius provides a secure, reliable, and collaborative SSH
                client.
              </p>
            </div>
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
