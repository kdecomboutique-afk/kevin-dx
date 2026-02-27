"use client";

import dynamic from "next/dynamic";

const SiteTracker = dynamic(() => import("./SiteTracker"), {
  ssr: false,
});

export default function SiteTrackerLoader() {
  return <SiteTracker />;
}
