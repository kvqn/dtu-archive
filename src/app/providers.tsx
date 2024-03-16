"use client";

import { env } from "@/env.mjs";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { Suspense, useEffect } from "react";

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  });
}

function PostHogPageview(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return <></>;
}

export default function ContextProvider({ children, session }: any) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PostHogProvider client={posthog}>{children}</PostHogProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
