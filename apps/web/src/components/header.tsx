import dynamic from "next/dynamic";

import { NAV_ITEMS, SOURCE_CODE_GITHUB_URL } from "@/config/site";

import { DesktopNav } from "./desktop-nav";
import { MobileNavV2 } from "./mobile-nav-v2";
import { StarsCount } from "./stars-count";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "./ui/button";

const BrandContextMenu = dynamic(() =>
  import("@/components/brand-context-menu").then((mod) => mod.BrandContextMenu),
);

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background pt-2 before:absolute before:-inset-x-px before:top-0 before:h-2 before:bg-background">
      <div className="flex h-16 items-center border-t border-b pr-1 pl-4">
        <BrandContextMenu />

        <DesktopNav />

        <div className="flex-1" />

        <div className="mr-4 flex items-center">
          <a
            className="flex items-center"
            href="https://www.nixtla.io?utm_source=react-wheel-picker&utm_medium=sponsor&utm_campaign=website"
            target="_blank"
            rel="noopener sponsored"
            aria-label="Nixtla"
          >
            <svg
              className="h-5 md:hidden"
              fill="currentColor"
              viewBox="48 32 55 32"
            >
              <path d="M52.265 63.33l22.737-22.738a.54.54 0 0 1 .768 0L86.665 51.58a.54.54 0 0 0 .768 0l15.139-15.139a.54.54 0 0 0 0-.767l-3.297-3.298a.54.54 0 0 0-.768 0L87.522 43.361a.54.54 0 0 1-.768 0L75.77 32.38a.54.54 0 0 0-.768 0L64.017 43.368a.54.54 0 0 1-.767 0L52.265 32.382a.54.54 0 0 0-.768 0L48.16 35.72a.54.54 0 0 0 0 .767l10.984 10.985a.54.54 0 0 1 0 .767L48.16 59.225a.54.54 0 0 0 0 .768l3.337 3.338a.54.54 0 0 0 .768 0" />
              <path d="m84.992 54.024.084-.083-3.68-3.68a.54.54 0 0 0-.768 0L75.77 55.12a.54.54 0 0 1-.768 0l-4.858-4.859a.54.54 0 0 0-.768 0L66.038 53.6a.54.54 0 0 0 0 .767l8.964 8.964a.54.54 0 0 0 .768 0l9.266-9.265-.04-.04zM92.791 50.17l-3.335 3.336a.543.543 0 0 0 0 .768l9.052 9.052a.543.543 0 0 0 .768 0l3.336-3.336a.544.544 0 0 0 0-.768L93.56 50.17a.543.543 0 0 0-.769 0" />
            </svg>
            <svg
              className="hidden h-4 md:block"
              fill="currentColor"
              viewBox="48 32 225 32"
            >
              <path d="M52.265 63.33l22.737-22.738a.54.54 0 0 1 .768 0L86.665 51.58a.54.54 0 0 0 .768 0l15.139-15.139a.54.54 0 0 0 0-.767l-3.297-3.298a.54.54 0 0 0-.768 0L87.522 43.361a.54.54 0 0 1-.768 0L75.77 32.38a.54.54 0 0 0-.768 0L64.017 43.368a.54.54 0 0 1-.767 0L52.265 32.382a.54.54 0 0 0-.768 0L48.16 35.72a.54.54 0 0 0 0 .767l10.984 10.985a.54.54 0 0 1 0 .767L48.16 59.225a.54.54 0 0 0 0 .768l3.337 3.338a.54.54 0 0 0 .768 0" />
              <path d="m84.992 54.024.084-.083-3.68-3.68a.54.54 0 0 0-.768 0L75.77 55.12a.54.54 0 0 1-.768 0l-4.858-4.859a.54.54 0 0 0-.768 0L66.038 53.6a.54.54 0 0 0 0 .767l8.964 8.964a.54.54 0 0 0 .768 0l9.266-9.265-.04-.04zM92.791 50.17l-3.335 3.336a.543.543 0 0 0 0 .768l9.052 9.052a.543.543 0 0 0 .768 0l3.336-3.336a.544.544 0 0 0 0-.768L93.56 50.17a.543.543 0 0 0-.769 0" />
              <path d="M144.102 32v31.997h-7.572l-13.176-24.2h-1.075v24.2h-5.109V32h7.573l13.175 24.2h1.075V32zM155.342 32v31.997h-5.379V32zM174.342 50.149h-1.524l-7.529 13.848h-5.827l9.188-16.85L160.764 32h5.646l6.454 12.235h1.524L180.974 32h5.603l-8.021 14.97L187.744 64h-6.048l-7.348-13.848zM214.361 36.75h-10.218v27.247h-5.378V36.75h-10.264V32h25.857v4.75zM240.041 58.935V64h-22.809V32h5.379v26.935h17.433zM264.15 54.81h-13.129l-2.913 9.187h-5.378L253.349 32h8.605l10.665 31.997h-5.511zm-11.606-4.796h10.039l-4.079-12.773h-1.926z" />
            </svg>
          </a>
        </div>

        <div className="flex items-center">
          <Button
            className="gap-1.5 has-[>svg]:px-2"
            variant="ghost"
            size="sm"
            asChild
          >
            <a href={SOURCE_CODE_GITHUB_URL} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.372 0 11.997 0 17.3 3.438 21.795 8.205 23.38c.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.609-4.042-1.609C4.422 17.77 3.633 17.4 3.633 17.4c-1.087-.744.084-.73.084-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.417-1.304.76-1.604-2.665-.3-5.466-1.332-5.466-5.929 0-1.31.465-2.38 1.235-3.219-.135-.303-.54-1.523.105-3.175 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.006 2.04.138 3 .404 2.28-1.551 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.608-2.805 5.623-5.475 5.918.42.36.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.284 0 .315.21.69.825.57C20.565 21.79 24 17.291 24 11.997 24 5.372 18.627 0 12 0"
                  fill="currentColor"
                />
              </svg>
              <StarsCount />
            </a>
          </Button>

          <ToggleTheme />

          <MobileNavV2 items={NAV_ITEMS} />
        </div>

        <div className="absolute right-[-4.5px] bottom-[-3.5px] flex size-2 rounded-[2px] border border-zinc-300 bg-popover dark:border-border" />
        <div className="absolute bottom-[-3.5px] left-[-4.5px] flex size-2 rounded-[2px] border border-zinc-300 bg-popover dark:border-border" />
      </div>
    </header>
  );
}
