import { NextRequest, NextResponse } from "next/server";
import { loadApps } from "@/lib/apps/registry";
import { launchApp } from "@/lib/apps/launcher";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const id = String((body as any)?.id || "");
    const url = (body as any)?.url as string | undefined;

    const app = loadApps().find(a => a.id === id);
    if (!app) return NextResponse.json({ ok: false, error: "unknown app" }, { status: 404 });

    const result = launchApp(app, { url });
    return NextResponse.json(result);
  } catch (e: any) {
    console.error("/api/apps/launch POST fail:", e);
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
