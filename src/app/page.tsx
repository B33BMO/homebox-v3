"use client";

import TopBar from "@/components/TopBar";
import AppGrid from "@/components/AppGrid";

export default function Page() {
  return (
    <main className="relative h-dvh w-dvw overflow-hidden">
      {/* Full-screen gradient background */}
      <div className="homebox-bg homebox-vignette" />

      {/* Pinned top bar */}
      <TopBar />

      {/* Content area under the bar */}
      <section className="relative h-full w-full">
        {/* provide space under the top bar (same height as TopBar) */}
        <div className="h-[72px]" />
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <AppGrid />
        </div>
      </section>
    </main>
  );
}
