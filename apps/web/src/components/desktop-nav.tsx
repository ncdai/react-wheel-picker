"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/config/site";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 max-sm:hidden">
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.title}
          className={cn(
            "px-2 text-muted-foreground",
            item.href === pathname && "text-foreground",
          )}
          variant="ghost"
          size="sm"
          asChild
        >
          <Link href={item.href}>{item.title}</Link>
        </Button>
      ))}
    </div>
  );
}
