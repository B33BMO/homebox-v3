import { exec } from "node:child_process";
import { AppEntry } from "./types";

const ALLOW_SHELL = process.env.ALLOW_SHELL === "1";

// tailor per OS if you want; here we assume Linux box
function openWeb(url: string, fullscreen?: boolean) {
  const base = `chromium-browser`;
  const flags = fullscreen
    ? `--kiosk --app="${url}" --start-fullscreen --new-window`
    : `--app="${url}" --new-window`;
  return `${base} ${flags}`;
}

function openPlayer(cmd = "mpv", url: string, args: string[] = []) {
  const quoted = `"${url}"`;
  return [cmd, ...args, quoted].join(" ");
}

export function launchApp(app: AppEntry, extra?: { url?: string }) {
  if (!ALLOW_SHELL) {
    console.log("[launch] DRY RUN:", app.id, extra ?? "");
    return { ok: true, dryRun: true };
  }

  let command = "";
  switch (app.kind) {
    case "web":
      if (!app.url) return { ok: false, error: "missing url" };
      command = openWeb(app.url, app.fullscreen);
      break;

    case "deeplink":
      if (!app.url) return { ok: false, error: "missing url" };
      // xdg-open can handle many schemes if registered, but kiosk is better when web URL
      command = `xdg-open "${app.url}"`;
      break;

    case "player":
      // accept runtime url from remote (cast)
      {
        const media = extra?.url || app.url;
        if (!media) return { ok: false, error: "missing media url" };
        command = openPlayer(app.cmd, media, app.args);
      }
      break;

    case "command":
      if (!app.cmd) return { ok: false, error: "missing cmd" };
      command = [app.cmd, ...(app.args || [])].join(" ");
      break;
  }

  exec(command, (err) => {
    if (err) console.error("[launch] error", err);
  });
  return { ok: true };
}

export function closeAll() {
  if (!ALLOW_SHELL) return { ok: true, dryRun: true };
  // kill any kiosk windows/mpv (tune as you like)
  exec(`pkill -f "chromium-browser --kiosk" || true`);
  exec(`pkill -f "mpv" || true`);
  return { ok: true };
}
