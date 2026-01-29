import Link from "next/link";

import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

import { BrandContextMenu } from "./brand-context-menu";
import { DesktopNav } from "./desktop-nav";
import { Mark } from "./mark";
import { MobileNav } from "./mobile-nav";
import { StarsCount } from "./stars-count";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background pt-2 before:absolute before:-inset-x-px before:top-0 before:h-2 before:bg-background">
      <div className="flex h-16 items-center border-t border-b pr-2 pl-4">
        <BrandContextMenu>
          <Link
            className="mr-2 flex items-center gap-1 text-base leading-none font-semibold tracking-tight lg:mr-8"
            href="/"
          >
            <Mark className="size-6" />
            <span className="max-lg:hidden">React Wheel Picker</span>
          </Link>
        </BrandContextMenu>

        <DesktopNav />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <a
            href="https://shadcnstudio.com?utm_source=chanhdai.com&utm_medium=banner&utm_campaign=github"
            target="_blank"
            rel="noopener sponsored"
            className="flex items-center gap-2.5 rounded-md bg-zinc-50 px-2.5 py-2 transition-colors duration-300 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
          >
            <svg viewBox="0 0 36 36" className="size-4 shrink-0 sm:size-7">
              <path
                fill="var(--foreground)"
                d="M36 18c0-9.94-8.06-18-18-18S0 8.06 0 18s8.06 18 18 18 18-8.06 18-18"
              />
              <path
                fill="var(--background)"
                d="M17.19 22.422a5.05 5.05 0 0 1 5.049-5.049h6.453v2.194h-6.453a2.854 2.854 0 0 0-2.853 2.855v6.634H17.19zm-2.298-.42.771.78-4.54 4.488-.77-.782-.772-.78 4.539-4.484.772.776zm11.97 3.708-1.552 1.551-4.514-4.514.776-.775.777-.78 4.511 4.518zm-9.847-11.19V7.88h2.194v6.637a5.05 5.05 0 0 1-5.047 5.049H7.708v-2.194h6.452a2.856 2.856 0 0 0 2.853-2.855zm9.894-2.949-4.544 4.488-1.542-1.56 4.542-4.488zm-11.46 2.693-1.553 1.55-4.514-4.513 1.553-1.551z"
              />
            </svg>

            <div className="flex flex-col gap-1 max-sm:hidden">
              <span className="text-sm leading-none font-medium text-foreground">
                shadcnstudio.com
              </span>
              <span className="text-xs leading-none text-muted-foreground">
                shadcn blocks & templates
              </span>
            </div>
          </a>

          <Button className="gap-2 px-2" variant="ghost" size="sm" asChild>
            <a href={SOURCE_CODE_GITHUB_URL} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              <StarsCount />
            </a>
          </Button>

          <Separator
            className="data-[orientation=vertical]:h-4.5"
            orientation="vertical"
          />

          <ToggleTheme />

          <MobileNav />
        </div>

        <div className="absolute right-[-4.5px] bottom-[-4.5px] flex size-2 rounded-[2px] border border-zinc-300 bg-popover dark:border-border" />
        <div className="absolute bottom-[-4.5px] left-[-4.5px] flex size-2 rounded-[2px] border border-zinc-300 bg-popover dark:border-border" />
      </div>
    </header>
  );
}
