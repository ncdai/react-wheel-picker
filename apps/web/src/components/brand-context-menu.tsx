"use client";

import { CircleDashedIcon, DownloadIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { getIconSVG, getMarkSVG, Mark } from "./mark";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff");
            navigator.clipboard.writeText(svg);
            toast.success("Copied Mark as SVG");
          }}
        >
          <Mark />
          Copy Mark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            const svg = getIconSVG();
            navigator.clipboard.writeText(svg);
            toast.success("Copied Icon as SVG");
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
