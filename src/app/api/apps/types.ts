export type AppKind = "web" | "deeplink" | "command" | "player";

export type AppEntry = {
  id: string;              // "youtube"
  label: string;           // "YouTube"
  kind: AppKind;
  icon?: string;           // "/icons/youtube.svg" (in /public)
  url?: string;            // for web/deeplink/player
  args?: string[];         // extra args for command/player
  cmd?: string;            // for command (e.g., "mpv")
  tint?: string;           // tailwind gradient like "from-rose-300 to-rose-400"
  fullscreen?: boolean;    // open --kiosk/--app as needed
  order?: number;
  enabled?: boolean;
};
