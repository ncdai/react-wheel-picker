import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

import { VercelOSSProgramBadge } from "./vercel-oss-badge";

export function Footer() {
  return (
    <footer className="flex flex-col-reverse items-center justify-between gap-6 border-t border-dashed p-6 md:flex-row">
      <p className="text-center text-sm text-balance">
        Built by{" "}
        <a
          className="font-medium underline underline-offset-4"
          href="https://chanhdai.com/?utm_source=react-wheel-picker"
          target="_blank"
          rel="noopener"
        >
          ncdai
        </a>
        . Hosted on{" "}
        <a
          className="font-medium underline underline-offset-4"
          href="https://vercel.com/new?utm_source=react-wheel-picker&utm_medium=web&utm_campaign=cta_deploy_now_callout"
          target="_blank"
          rel="noopener"
        >
          Vercel
        </a>
        . The source code is available on{" "}
        <a
          className="font-medium underline underline-offset-4"
          href={SOURCE_CODE_GITHUB_URL}
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        .
      </p>

      <a
        href="https://vercel.com/oss?utm_source=react-wheel-picker&utm_medium=web"
        target="_blank"
        rel="noopener"
      >
        <VercelOSSProgramBadge className="h-6" />
      </a>
    </footer>
  );
}
