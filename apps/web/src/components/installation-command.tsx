"use client";

import { CheckIcon, CopyIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

import { IconSwap, IconSwapItem } from "./icon-swap";

const INSTALLATION_COMMAND = `npx shadcn@latest add @ncdai/wheel-picker`;

export function InstallationCommand({ className }: { className?: string }) {
  const { state, copy } = useCopyToClipboard();

  const handleCopy = () => {
    copy(INSTALLATION_COMMAND);
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
          {INSTALLATION_COMMAND.replace("@latest", "")}
        </code>
      </pre>

      <Button
        size="icon"
        variant="ghost"
        className="size-6 rounded-sm shadow-none"
        onClick={handleCopy}
      >
        <IconSwap>
          <IconSwapItem key={state}>
            {state === "idle" ? (
              <CopyIcon className="size-3.5" />
            ) : state === "done" ? (
              <CheckIcon className="size-3.5" />
            ) : (
              <XIcon className="size-3.5" />
            )}
          </IconSwapItem>
        </IconSwap>
        <span className="sr-only">Copy</span>
      </Button>
    </div>
  );
}
