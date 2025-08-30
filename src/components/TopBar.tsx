"use client";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  return (
    <header className="fixed top-0 left-0 right-0 z-20 h-[72px]">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-end px-6 sm:px-10">
        <div className="topbar-chip px-4 py-2 text-sm shadow-inner text-black/95">
          <span className="tabular-nums text-glow-strong">69°</span>
          <span className="px-2 text-black/80">|</span>
          <span className="text-glow-strong">{time}</span>
        </div>
      </div>
    </header>
  );
}
