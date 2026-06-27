"use client";

import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/use-meta-color";

import { Button } from "./ui/button";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const switchTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark,
    );
  }, [resolvedTheme, setTheme, setMetaColor]);

  useHotkeys("d", () => switchTheme());

  return (
    <Button
      className="size-8"
      variant="ghost"
      size="icon"
      onClick={switchTheme}
    >
      <MoonIcon className="hidden [html.dark_&]:block" />
      <SunMediumIcon className="hidden [html.light_&]:block" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
