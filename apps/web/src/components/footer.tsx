import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

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

      <a href="https://vercel.com/oss" target="_blank" rel="noopener">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Vercel OSS Program"
          src="https://vercel.com/oss/program-badge.svg"
        />
      </a>
    </footer>
  );
}
