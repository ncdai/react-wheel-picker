// Thanks @fumadocs

"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  CircleXIcon,
  CopyIcon,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Icons } from "../icons";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const cache = new Map<string, string>();

type CopyState = "idle" | "done" | "error";

export function LLMCopyButton({ markdownUrl }: { markdownUrl: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const [isCopying, setIsCopying] = useState(false);
  const operationRef = useRef(false);

  const handleCopy = async () => {
    if (operationRef.current) return;

    operationRef.current = true;

    const loadingTimer = setTimeout(() => {
      setIsCopying(true);
    }, 150);

    try {
      const cached = cache.get(markdownUrl);
      if (cached) {
        await navigator.clipboard.writeText(cached);
      } else {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": fetch(markdownUrl)
              .then((res) => res.text())
              .then((content) => {
                cache.set(markdownUrl, content);
                return content;
              }),
          }),
        ]);
      }
      setState("done");
    } catch {
      setState("error");
    } finally {
      clearTimeout(loadingTimer);
      setIsCopying(false);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      operationRef.current = false;
      setState("idle");
    }
  };

  return (
    <button
      className="flex h-8 items-center gap-2 rounded-l-full pr-2 pl-2.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50"
      aria-busy={isCopying}
      disabled={isCopying}
      onClick={handleCopy}
    >
      {state === "idle" ? (
        <CopyIcon />
      ) : state === "done" ? (
        <CheckIcon />
      ) : (
        <CircleXIcon />
      )}
      Copy Page
    </button>
  );
}

function getPrompt(url: string) {
  return `I'm looking at this component documentation: ${url}
I want to use it in a React (TypeScript) project.
Help me understand how to use it step-by-step, including explaining key concepts, showing practical examples with TypeScript code, and pointing out common pitfalls.
Be ready to answer follow-up questions and help debug issues based on the documentation.`;
}

export function ViewOptions({ markdownUrl }: { markdownUrl: string }) {
  const items = useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined"
        ? new URL(markdownUrl, window.location.origin).toString()
        : markdownUrl;

    const q = getPrompt(fullMarkdownUrl);

    const _items = [
      {
        title: "View as Markdown",
        href: fullMarkdownUrl,
        icon: Icons.markdown,
      },
      {
        title: "Open in v0",
        href: `https://v0.app/?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.v0,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: Icons.openai,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.claude,
      },
      {
        title: "Open in Cursor",
        href: `https://cursor.com/link/prompt?${new URLSearchParams({
          text: q,
        })}`,
        icon: Icons.cursor,
      },
      {
        title: "Open in Scira AI",
        href: `https://scira.ai/?${new URLSearchParams({
          q,
        })}`,
        icon: Icons.scira,
      },
    ];

    return _items;
  }, [markdownUrl]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex size-8 items-center justify-center gap-2 rounded-r-full text-sm">
          <ChevronDownIcon className="mt-0.5 mr-1 size-4" />
          <span className="sr-only">View Options</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-fit"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {items.map(({ title, href, icon: Icon }) => (
          <DropdownMenuItem key={href} asChild>
            <a href={href} rel="noreferrer noopener" target="_blank">
              <Icon />
              {title}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function LLMCopyButtonWithViewOptions({
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  return (
    <div
      className={cn(
        buttonVariants({
          size: "sm",
          variant: "secondary",
          className: "gap-0 divide-x px-0 font-sans dark:divide-white/10",
        }),
      )}
    >
      <LLMCopyButton markdownUrl={markdownUrl} />
      <ViewOptions markdownUrl={markdownUrl} />
    </div>
  );
}
