import type { JSX } from "react";

export type SponsorTier = "silver" | "gold" | "platinum";

export type IndividualSponsor = {
  name: string;
  url: string;
  avatar: string;
  tagline: string;
  tier?: SponsorTier;
};

export type OrganizationalSponsor = {
  name: string;
  url: string;
  logo: (props: React.ComponentProps<"svg">) => JSX.Element;
  tier?: SponsorTier;
};
