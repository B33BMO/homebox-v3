import { NextResponse } from "next/server";
import { loadApps } from "@/lib/apps/registry";

export async function GET() {
  return NextResponse.json({ ok: true, apps: loadApps() });
}
