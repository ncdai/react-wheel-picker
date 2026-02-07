"use client";

import { useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { PackageManager } from "@/hooks/use-config";
import { useConfig } from "@/hooks/use-config";
import type { NpmCommands } from "@/types/unist";

import { CopyButton } from "./copy-button";
import { getIconForPackageManager } from "./icons";

export function CodeBlockCommand({
  __pnpmCommand__,
  __yarnCommand__,
  __npmCommand__,
  __bunCommand__,
}: NpmCommands) {
  const [config, setConfig] = useConfig();

  const packageManager = config.packageManager || "pnpm";

  const tabs = useMemo(() => {
    return {
      pnpm: __pnpmCommand__,
      yarn: __yarnCommand__,
      npm: __npmCommand__,
      bun: __bunCommand__,
    };
  }, [__pnpmCommand__, __yarnCommand__, __npmCommand__, __bunCommand__]);

  return (
    <div className="relative overflow-hidden rounded-lg bg-code">
      <Tabs
        className="gap-0"
        value={packageManager}
        onValueChange={(value) => {
          setConfig((prev) => ({
            ...prev,
            packageManager: value as PackageManager,
          }));
        }}
      >
        <div className="border-b px-4">
          <TabsList className="h-auto translate-y-px gap-3 rounded-none bg-transparent p-0 dark:bg-transparent [&_svg]:size-4 [&_svg]:text-muted-foreground">
            {getIconForPackageManager(packageManager)}

            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  className="h-10 rounded-none border-b border-transparent p-0 font-mono data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:bg-transparent"
                  value={key}
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {Object.entries(tabs).map(([key, value]) => {
          return (
            <TabsContent key={key} value={key}>
              <pre>
                <code
                  data-slot="code-block"
                  data-language="bash"
                  className="font-pixel-square text-sm leading-none text-cyan-600 dark:text-cyan-400"
                >
                  <span className="select-none">$ </span>
                  {value}
                </code>
              </pre>
            </TabsContent>
          );
        })}
      </Tabs>

      <CopyButton
        className="absolute top-2 right-2"
        value={tabs[packageManager] || ""}
      />
    </div>
  );
}
