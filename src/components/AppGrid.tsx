"use client";
import { useEffect, useState } from "react";
import AppTile from "./AppTile";

type App = { id: string; label: string; tint?: string; icon?: string };

export default function AppGrid() {
  const [apps, setApps] = useState<App[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/apps", { cache: "no-store" });
        if (!r.ok) {
          const text = await r.text();           // <-- don’t json() immediately
          throw new Error(`HTTP ${r.status}: ${text.slice(0, 180)}`);
        }
        const data = await r.json();
        if (!data.ok) throw new Error(data.error || "Unknown error");
        setApps(data.apps || []);
      } catch (e: any) {
        console.error("load apps failed:", e);
        setErr(String(e.message || e));
      }
    })();
  }, []);

  if (err) {
    return (
      <div className="mt-10 rounded-lg bg-black/40 p-4 text-white/95">
        <div className="font-medium">Failed to load apps</div>
        <div className="opacity-80 text-sm">{err}</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8 pb-12 pt-6 sm:grid-cols-4 lg:grid-cols-5">
      {apps.map(app => (
        <div key={app.id} className="flex flex-col items-center">
          <AppTile id={app.id} label={app.label} icon={app.icon} />

          <span className="mt-3 label-pill text-sm text-glow-strong">{app.label}</span>
        </div>
      ))}
    </div>
  );
}
