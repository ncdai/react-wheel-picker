"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INSTALLATION_COMMAND = `npx shadcn add @ncdai/wheel-picker`;

export function InstallationCommand({ className }: { className?: string }) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALLATION_COMMAND);
    setHasCopied(true);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 text-sm",
        className,
      )}
    >
      <pre
        className="hide no-scrollbar cursor-copy overflow-x-auto py-4 text-cyan-600 dark:text-cyan-400"
        onClick={handleCopy}
      >
        <code className="font-pixel-square">
          <span className="select-none">$ </span>
          {INSTALLATION_COMMAND}
        </code>
      </pre>

      <Button
        size="icon"
        variant="ghost"
        className="size-6 rounded-sm shadow-none" // absolute top-3.5 right-3.5 z-10
        onClick={handleCopy}
      >
        {hasCopied ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <CopyIcon className="size-3.5" />
        )}
        <span className="sr-only">Copy</span>
      </Button>
    </div>
  );
}
