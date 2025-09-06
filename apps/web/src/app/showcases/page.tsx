import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SHOWCASES } from "@/data/showcases";

export default function ShowcasesPage() {
  return (
    <div className="relative min-h-dvh max-w-screen overflow-x-hidden">
      <h1 className="mt-12 mb-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Showcases
      </h1>

      <p className="mb-6 text-center text-lg text-balance text-muted-foreground sm:text-xl">
        A collection of projects built with React Wheel Picker.
      </p>

      <div className="mb-12 flex justify-center">
        <Button variant="outline" asChild>
          <a
            href="https://github.com/ncdai/react-wheel-picker/discussions/77"
            target="_blank"
            rel="noopener"
          >
            <PlusIcon />
            Suggest Yours
          </a>
        </Button>
      </div>

      <div className="grid gap-4 border-t border-dashed p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SHOWCASES.map((showcase) => (
          <a
            key={showcase.href}
            className="flex rounded-md border p-8 text-sm font-semibold text-balance shadow-xs transition-colors hover:bg-accent/30"
            href={showcase.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {showcase.name}
          </a>
        ))}
      </div>
    </div>
  );
}
