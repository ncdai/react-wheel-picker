import React from "react";

export async function StarsCount() {
  const data = await fetch(
    `https://api.github.com/repos/ncdai/react-wheel-picker`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    },
  );
  const json = await data.json();

  const count = json?.stargazers_count ?? -1;

  return (
    <span className="translate-y-px font-mono text-xs text-muted-foreground tabular-nums">
      {count.toLocaleString()}
    </span>
  );
}
