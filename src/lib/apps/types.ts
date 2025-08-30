export type AppKind = "web_tv" | "web_drm" | "native" | "player";

export type AppEntry = {
  id: string;
  label: string;
  kind: AppKind;
  url?: string;          // for web_* or player default
  cmd?: string;          // for native or player executable (e.g., "mpv")
  args?: string[];       // extra args
  fullscreen?: boolean;  // use kiosk/app flags
  zoom?: number;         // 1.0..1.5 for couch legibility
  ext?: boolean;         // load content-injector extension
  profile?: string;      // chrome profile dir name, e.g. "Default"
  icon?: string;
  order?: number;
  enabled?: boolean;
};
