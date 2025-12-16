"use client";

import { ClientSideOptionsProvider } from "@c15t/nextjs/client";

export function ConsentManagerClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientSideOptionsProvider
      callbacks={{
        onConsentSet(response) {
          console.log("onConsentSet", response);
        },
      }}
    >
      {children}
    </ClientSideOptionsProvider>
  );
}
