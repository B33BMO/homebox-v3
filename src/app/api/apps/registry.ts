import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AppEntry } from "./types";
import { DEFAULT_APPS } from "./defaults";

const REG_DIR = path.join(os.homedir(), ".homebox");
const REG_FILE = path.join(REG_DIR, "apps.json");

export function loadApps(): AppEntry[] {
  try {
    if (!fs.existsSync(REG_DIR)) fs.mkdirSync(REG_DIR, { recursive: true });
    if (!fs.existsSync(REG_FILE)) {
      fs.writeFileSync(REG_FILE, JSON.stringify(DEFAULT_APPS, null, 2));
      return DEFAULT_APPS;
    }
    const raw = fs.readFileSync(REG_FILE, "utf-8");
    const data = JSON.parse(raw) as AppEntry[];
    return data.filter(a => a.enabled !== false).sort((a,b) => (a.order ?? 999) - (b.order ?? 999));
  } catch (e) {
    console.error("[apps] load error -> using defaults:", e);
    return DEFAULT_APPS;
  }
}

export function saveApps(apps: AppEntry[]) {
  if (!fs.existsSync(REG_DIR)) fs.mkdirSync(REG_DIR, { recursive: true });
  fs.writeFileSync(REG_FILE, JSON.stringify(apps, null, 2));
}
