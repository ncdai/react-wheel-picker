"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "@/config/site";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export function Nav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 items-center gap-2">
      {NAV_ITEMS.map((item) => (
        <Button
          key={item.name}
          className={cn(
            "px-2 text-muted-foreground",
            item.href === pathname && "text-foreground",
          )}
          variant="ghost"
          size="sm"
          asChild
        >
          <Link href={item.href}>{item.name}</Link>
        </Button>
      ))}
    </div>
  );
}
