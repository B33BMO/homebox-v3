"use client";
import { useState } from "react";

type Props = { id: string; label: string; icon?: string };

export default function AppTile({ id, label, icon }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await fetch("/api/apps/launch", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={[
        "relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36",
        "tile-glass outline-none",
        "transition-[transform,box-shadow,filter] duration-200 ease-out",
        "focus-visible:ring-2 focus-visible:ring-white/70"
      ].join(" ")}
      aria-label={label}
      title={label}
    >
      {/* icon */}
      {icon && (
        <img
          src={icon}
          alt=""
          className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 opacity-95"
        />
      )}

      {/* loading overlay */}
      {loading && (
        <span className="absolute inset-0 grid place-items-center text-black/80 text-sm font-medium">
          Launching…
        </span>
      )}
    </button>
  );
}
