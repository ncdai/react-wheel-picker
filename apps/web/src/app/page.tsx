/* eslint-disable @next/next/no-img-element */

import "@ncdai/react-wheel-picker/style.css";

import {
  InfinityIcon,
  MousePointerClickIcon,
  PointerIcon,
  TriangleDashedIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MultiPickerDemo } from "@/components/examples/multi-picker-demo";
import { SimplePickerDemo } from "@/components/examples/simple-picker-demo";
import { Icons } from "@/components/icons";
import { InstallationCommand } from "@/components/installation-command";
import { Mark } from "@/components/mark";
import { Spotlight } from "@/components/spotlight";
import { Button } from "@/components/ui/button";

const featuredItems = [
  {
    icon: PointerIcon,
    title: "Natural touch scrolling",
  },
  {
    icon: MousePointerClickIcon,
    title: "Mouse drag and scroll support for desktop",
  },
  {
    icon: InfinityIcon,
    title: "Infinite loop scrolling",
  },
  {
    icon: TriangleDashedIcon,
    title: "Unstyled components for complete style customization",
  },
  {
    icon: Icons.shadcn,
    title: "Easy installation via shadcn CLI",
  },
];

type Praise = {
  id: string;
  avatar: string;
  name: string;
  description: string;
  content: string;
  refLink: string;
};

const praise: Praise[] = [
  {
    id: "kapehe_ok",
    avatar: "/images/avatars/kapehe_ok.webp",
    name: "Kap",
    description: "Head of Developer Community at Vercel",
    content: "one of my favorite projects that submitted! you are crushing it!",
    refLink: "https://x.com/kapehe_ok/status/1948104774358106612",
  },
  {
    id: "initjean",
    avatar: "/images/avatars/initjean.webp",
    name: "Jean P.D. Meijer",
    description: "Creator of analog.now",
    content:
      "congrats you deserve it! react wheel picker is so smooth, its insane 🐐",
    refLink: "https://x.com/initjean/status/1948159885960438151",
  },
  {
    id: "jordwalke",
    avatar: "/images/avatars/jordwalke.webp",
    name: "jordwalke",
    description: "Creator of React",
    content: "Also, cool wheel picker!",
    refLink: "https://x.com/jordwalke/status/1937166049868439854",
  },
  {
    id: "steventey",
    avatar: "/images/avatars/steventey.webp",
    name: "Steven Tey",
    description: "Founder of dub.co",
    content: "whoa, this is really dope – needs to get added to @shadcn UI 👀",
    refLink: "https://x.com/steventey/status/1936934909370830924",
  },
  {
    id: "theorcdev",
    name: "OrcDev",
    description: "Creator of 8bitcn/ui",
    avatar: "/images/avatars/theorcdev.webp",
    content: "Looks nice!",
    refLink: "https://x.com/theorcdev/status/1934586473040543885",
  },
  {
    id: "serhii_be",
    avatar: "/images/avatars/serhii_be.webp",
    name: "Serhii Bedrytskyi",
    description: "Creator of uipub.com",
    content: "Nice component",
    refLink: "https://x.com/serhii_be/status/1933583827600904485",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Spotlight />

      <Mark className="mx-auto mt-12 mb-6 size-14" />

      <h1 className="mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        iOS-like Wheel Picker <span className="block sm:inline" />
        for React
      </h1>

      <p className="mb-6 text-center text-lg text-balance sm:text-xl">
        Smooth inertia scrolling and infinite loop support.
      </p>

      <div className="mx-auto mb-6 grid grid-cols-2 gap-4 px-4 sm:w-sm">
        <Button asChild>
          <Link href="/docs/getting-started">Get Started</Link>
        </Button>

        <Button
          className="border-zinc-300 dark:border-zinc-700"
          variant="outline"
          asChild
        >
          <a
            href="https://chanhdai.com/components/react-wheel-picker#examples"
            target="_blank"
            rel="noopener"
          >
            Examples
          </a>
        </Button>
      </div>

      <div className="mb-12 flex justify-center">
        <a
          className="flex h-8 items-center gap-2 rounded-full bg-zinc-50 px-4 text-sm font-medium dark:bg-white/5"
          href="https://vercel.com/blog/summer-2025-oss-program?utm_source=react-wheel-picker&utm_medium=web#react-wheel-picker"
          target="_blank"
          rel="noopener"
        >
          <span className="text-muted-foreground">Backed by</span>
          <span>▲ Vercel OSS Program</span>
        </a>
      </div>

      <div className="mb-12 border-y">
        <div className="mx-auto grid max-w-4xl grid-cols-1 border-dashed sm:grid-cols-2 lg:border-x">
          <InstallationCommand className="order-1 border-b border-dashed sm:col-span-2" />

          <div className="order-2 border-dashed p-6 sm:order-1 sm:border-r">
            <div className="grid gap-4">
              {featuredItems.map((item) => (
                <FeaturedItem key={item.title} {...item} />
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://www.npmjs.com/package/@ncdai/react-wheel-picker"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="https://img.shields.io/npm/v/%40ncdai%2Freact-wheel-picker"
                  alt="NPM Version"
                />
              </a>

              <a
                href="https://www.npmjs.com/package/@ncdai/react-wheel-picker"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="https://img.shields.io/npm/dy/%40ncdai%2Freact-wheel-picker"
                  alt="NPM Downloads"
                />
              </a>
            </div>
          </div>

          <div className="relative z-40 order-1 space-y-6 py-6 max-sm:border-b sm:order-2 sm:dark:bg-black/10">
            <SimplePickerDemo />
            <MultiPickerDemo />
          </div>
        </div>
      </div>

      <div className="mb-12 grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {praise.map((item) => (
          <PraiseCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

function FeaturedItem({
  icon: Icon,
  title,
  learnMore,
}: {
  icon: React.ComponentType;
  title: string;
  learnMore?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-black/1 shadow-xs dark:bg-white/5 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:text-muted-foreground"
        aria-hidden="true"
      >
        <Icon />
      </span>

      <p className="text-balance">
        {title}
        {learnMore && (
          <>
            .{" "}
            <a
              className="font-medium underline underline-offset-4"
              href={learnMore}
              target="_blank"
              rel="noopener"
            >
              Learn more
            </a>
          </>
        )}
      </p>
    </div>
  );
}

function PraiseCard({ avatar, name, description, content, refLink }: Praise) {
  return (
    <a
      className="block"
      href={refLink}
      target="_blank"
      rel="noopener"
      title={`See post by ${name}`}
    >
      <div className="flex h-full flex-col gap-4 rounded-md border p-4 shadow-xs transition-colors hover:bg-accent/30">
        <div className="grow">
          <p>{content}</p>
        </div>

        <div className="flex items-center gap-2">
          <Image
            className="shrink-0 rounded-full"
            src={avatar}
            alt={name}
            width={32}
            height={32}
            aria-hidden
          />

          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 text-sm leading-none font-semibold">
              {name}
              <VerifiedIcon className="size-[1em] text-[#1d9bf0]" aria-hidden />
            </span>
            <span className="text-xs leading-none text-balance text-muted-foreground">
              {description}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function VerifiedIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
      />
    </svg>
  );
}
