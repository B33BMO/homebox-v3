import { exec } from "node:child_process";
import path from "node:path";
import os from "node:os";
import { AppEntry } from "./types";

const ALLOW = process.env.ALLOW_SHELL === "1";
const CHROME = process.env.HB_CHROME || "chromium-browser"; // or "google-chrome"
const EXT_DIR = process.env.HB_EXTDIR || "/opt/homebox/hb-ext"; // our extension root
const PROFILE_ROOT = process.env.HB_PROFILE_ROOT || path.join(os.homedir(), ".config", "chromium");

function chromeCmd(url: string, opt: { fullscreen?: boolean; zoom?: number; ext?: boolean; profile?: string } = {}) {
  const parts = [CHROME];
  if (opt.fullscreen) parts.push("--kiosk", `--app="${url}"`, "--start-fullscreen", "--new-window");
  else parts.push(`--app="${url}"`, "--new-window");

  // Per-app zoom (works best when we reuse a profile)
  const prof = path.join(PROFILE_ROOT, opt.profile || "Default");
  parts.push(`--user-data-dir="${PROFILE_ROOT}"`, `--profile-directory="${opt.profile || "Default"}"`);

  if (opt.zoom && opt.zoom !== 1.0) parts.push(`--force-device-scale-factor=${opt.zoom}`);

  // Load our injector extension if requested
  if (opt.ext) parts.push(`--load-extension=${EXT_DIR}`);

  // QoL flags
  parts.push("--disable-translate", "--noerrdialogs", "--overscroll-history-navigation=0", "--autoplay-policy=no-user-gesture-required");
  return parts.join(" ");
}

function mpvCmd(cmd: string | undefined, url: string, args: string[] = []) {
  const bin = cmd || "mpv";
  const a = args.join(" ");
  return `${bin} ${a} "${url}"`;
}

export function launchApp(app: AppEntry, extra?: { url?: string }) {
  if (!ALLOW) { console.log("[launch] DRY", app.id, extra || ""); return { ok: true, dryRun: true }; }

  let command = "";
  switch (app.kind) {
    case "web_tv":
    case "web_drm": {
      if (!app.url) return { ok:false, error:"missing url" };
      command = chromeCmd(app.url, { fullscreen: app.fullscreen !== false, zoom: app.zoom ?? 1.0, ext: !!app.ext, profile: app.profile });
      break;
    }
    case "native": {
      if (!app.cmd) return { ok:false, error:"missing cmd" };
      command = [app.cmd, ...(app.args||[])].join(" ");
      break;
    }
    case "player": {
      const media = extra?.url || app.url;
      if (!media) return { ok:false, error:"missing media url" };
      command = mpvCmd(app.cmd, media, app.args);
      break;
    }
  }

  exec(command, (err) => { if (err) console.error("[launch] error", err); });
  return { ok:true };
}

export function closeAll() {
  if (!ALLOW) return { ok:true, dryRun:true };
  exec(`pkill -f "${CHROME} .*--kiosk" || true`);
  exec(`pkill -f "mpv" || true`);
  return { ok:true };
}
