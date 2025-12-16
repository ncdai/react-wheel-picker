import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SponsorsPage() {
  return (
    <div className="relative min-h-dvh max-w-screen overflow-x-hidden">
      <h1 className="mt-12 mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Support <span className="block sm:hidden" />
        React Wheel Picker
      </h1>

      <p className="mx-4 mb-6 text-center text-lg text-balance text-muted-foreground sm:text-xl">
        Your sponsorship means a lot to open-source projects, including React
        Wheel Picker.
      </p>

      <div className="mb-12 flex justify-center">
        <Button variant="outline" asChild>
          <a
            href="https://github.com/sponsors/ncdai"
            target="_blank"
            rel="noopener"
          >
            <HeartIcon />
            Sponsor
          </a>
        </Button>
      </div>

      <div className="grid gap-4 border-t border-dashed p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></div>
    </div>
  );
}
