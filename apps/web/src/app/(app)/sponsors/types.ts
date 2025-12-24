type SponsorBase = {
  name: string;
  website: string;
};

export type IndividualSponsor = SponsorBase & {
  type: "individual";
  avatar: string;
  tagline: string;
};

export type Sponsor = IndividualSponsor;
