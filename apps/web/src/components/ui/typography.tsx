import { LinkIcon } from "lucide-react";
import { Slot as SlotPrimitive } from "radix-ui";
import React from "react";

import { cn } from "@/lib/utils";

const Slot = SlotPrimitive.Slot;

function Prose({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="prose"
      className={cn(
        "prose max-w-none prose-zinc dark:prose-invert",
        "prose-headings:font-heading prose-headings:text-balance",
        "prose-h2:border-b prose-h2:pb-2",
        "prose-a:font-medium prose-a:wrap-break-word prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
        "prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-strong:font-medium",
        "prose-hr:border-border",
        className,
      )}
      {...props}
    />
  );
}

function Code({ className, ...props }: React.ComponentProps<"code">) {
  const isCodeBlock = "data-language" in props;

  return (
    <code
      data-slot={isCodeBlock ? "code-block" : "code-inline"}
      className={cn(
        !isCodeBlock &&
          "not-prose rounded-sm border bg-muted/50 px-1.5 py-0.5 font-mono text-xs",
        className,
      )}
      {...props}
    />
  );
}

type HeadingTypes = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends HeadingTypes> = React.ComponentProps<T> & {
  as?: T;
};

function Heading<T extends HeadingTypes = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const Comp = as ?? "h1";

  if (!props.id) {
    return <Comp className={className} {...props} />;
  }

  return (
    <Comp
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    >
      <a href={`#${props.id}`} className="peer not-prose">
        {props.children}
      </a>

      <LinkIcon
        className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100"
        aria-label="Link to section"
      />
    </Comp>
  );
}

export { Code, Heading, Prose };
