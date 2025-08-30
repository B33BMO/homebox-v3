import { NextResponse } from "next/server";
import { loadApps } from "@/lib/apps/registry";

export const runtime = "nodejs";          // we use fs -> force Node
export const dynamic = "force-dynamic";   // avoid stale cache in dev

export async function GET() {
  try {
    const apps = loadApps();
    return NextResponse.json({ ok: true, apps });
  } catch (e: any) {
    console.error("/api/apps GET fail:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
