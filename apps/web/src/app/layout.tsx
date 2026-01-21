import "./globals.css";

import { OpenPanelComponent } from "@openpanel/nextjs";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { ConsentManager } from "@/components/consent-manager";
import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    template: `%s | ${SITE_INFO.name}`,
    default: SITE_INFO.name,
  },
  description:
    "iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.",
  keywords: ["react wheel picker", "react", "wheel picker", "wheel", "picker"],
  authors: [
    {
      name: "ncdai",
      url: "https://chanhdai.com",
    },
  ],
  creator: "ncdai",
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    images: [
      {
        url: SITE_INFO.metaImage,
        width: 1200,
        height: 630,
        alt: "React Wheel Picker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@iamncdai", // Twitter username
    images: [SITE_INFO.metaImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
      </head>

      <body>
        <div className="container mx-auto">
          <div className="sm:border-x">
            <Providers>
              <OpenPanelComponent
                clientId={process.env.OPENPANEL_CLIENT_ID!}
                trackScreenViews={true}
              />
              <ConsentManager>{children}</ConsentManager>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
