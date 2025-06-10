"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INSTALLATION_COMMAND = `npx shadcn@latest add https://chanhdai.com/r/wheel-picker.json`;

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
    <div className={cn("relative text-center font-mono text-sm", className)}>
      <pre
        className="hide no-scrollbar cursor-copy overflow-x-auto p-4 text-cyan-600 dark:text-cyan-400"
        onClick={handleCopy}
      >
        <code>{INSTALLATION_COMMAND}</code>
      </pre>

      <Button
        size="icon"
        variant="secondary"
        className="absolute top-3.5 right-3.5 z-10 size-6 shadow-none"
        onClick={handleCopy}
      >
        {hasCopied ? (
          <CheckIcon className="size-3" />
        ) : (
          <CopyIcon className="size-3" />
        )}
        <span className="sr-only">Copy</span>
      </Button>
    </div>
  );
}
