"use client";

import { CircleDashedIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { getIconSVG, getMarkSVG, Mark } from "./mark";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function BrandContextMenu() {
  const { resolvedTheme } = useTheme();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          className="mr-2 flex items-center gap-1 text-base leading-none font-semibold tracking-tight lg:mr-8"
          href="/"
        >
          <Mark className="size-8 md:size-7" />
          <span className="max-lg:hidden">React Wheel Picker</span>
        </Link>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff");
            navigator.clipboard.writeText(svg);
            toast.success("Mark as SVG copied");
          }}
        >
          <Mark />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            const svg = getIconSVG();
            navigator.clipboard.writeText(svg);
            toast.success("Icon as SVG copied");
          }}
        >
          <CircleDashedIcon />
          Copy Icon as SVG
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <a href="/rwp-brand-assets.zip" download>
            <DownloadIcon />
            Download Brand Assets
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
