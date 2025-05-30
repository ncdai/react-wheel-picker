"use client";

import React from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { next: { revalidate: 86400 } }).then((r) => r.json()); // Cache for 1 day (86400 seconds)

type StarsCountResponse = {
  stargazers_count: number;
};

export function StarsCount() {
  const { data } = useSWR<StarsCountResponse>(
    `https://api.github.com/repos/ncdai/react-wheel-picker`,
    fetcher,
  );

  if (!data) {
    return <span className="h-3 w-6 rounded-full bg-muted" />;
  }

  return (
    <span className="mt-px w-6 text-center font-mono text-xs/none font-medium text-muted-foreground tabular-nums">
      {data.stargazers_count.toLocaleString()}
    </span>
  );
}
