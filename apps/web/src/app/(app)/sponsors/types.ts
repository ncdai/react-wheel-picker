export type SponsorTier = "silver" | "gold" | "platinum";

type SponsorBase = {
  name: string;
  website: string;
  tier?: SponsorTier;
};

export type IndividualSponsor = SponsorBase & {
  type: "individual";
  avatar: string;
  tagline: string;
};

export type Sponsor = IndividualSponsor;
