"use client";

import React, { useMemo } from "react";

import { Index } from "@/__registry__/index";
import { cn } from "@/lib/cn";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Code as CodeInline } from "./ui/typography";

export function ComponentPreview({
  className,
  name,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  name: string;
}) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component <CodeInline>{name}</CodeInline> not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div className={cn("my-6", className)} {...props}>
      <Tabs defaultValue="preview" className="gap-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="rounded-lg border bg-zinc-950/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center p-4 [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5">
            <div className="not-prose flex min-h-80 items-center justify-center">
              <React.Suspense
                fallback={
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="[&>figure]:m-0">
          {Code}
        </TabsContent>
      </Tabs>
    </div>
  );
}
