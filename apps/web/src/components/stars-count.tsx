import { unstable_cache } from "next/cache";
import React from "react";

const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/ncdai/react-wheel-picker",
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );

      if (!response.ok) {
        return 0;
      }

      const json = (await response.json()) as { stargazers_count?: number };
      return Number(json?.stargazers_count) || 0;
    } catch {
      return 0;
    }
  },
  ["github-stargazer-count"],
  { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
);

export async function StarsCount() {
  const stargazersCount = await getStargazerCount();

  return (
    <span className="translate-y-px font-mono text-[13px] leading-none text-muted-foreground tabular-nums">
      {stargazersCount.toLocaleString()}
    </span>
  );
}
