import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { IBM_Plex_Serif } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = GeistSans;
const fontMono = GeistMono;
const fontPixelSquare = GeistPixelSquare;

const fontSerif = IBM_Plex_Serif({
  weight: ["400"],
  display: "swap",
  fallback: ["serif"],
  variable: "--font-serif",
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontSerif.variable,
  fontPixelSquare.variable,
);
