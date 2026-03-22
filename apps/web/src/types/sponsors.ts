import type { JSX } from "react";

export const SPONSOR_TIERS = [
  {
    title: "Open Source Program",
    name: "osp",
  },
  {
    title: "Platinum Sponsors",
    name: "platinum",
  },
  {
    title: "Gold Sponsors",
    name: "gold",
  },
  {
    title: "Silver Sponsors",
    name: "silver",
  },
  {
    title: "Spark Supporters",
    name: "spark_supporter",
  },
] as const;

export type SponsorTier = (typeof SPONSOR_TIERS)[number]["name"];

export type Sponsor = {
  name: string;
  url: string;
  logo: (props: React.ComponentProps<"svg">) => JSX.Element;
  tier: SponsorTier;
};
