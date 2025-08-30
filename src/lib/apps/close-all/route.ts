import { NextResponse } from "next/server";
import { closeAll } from "@/lib/apps/launcher";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const res = closeAll();
    return NextResponse.json(res);
  } catch (e: any) {
    console.error("/api/apps/close-all POST fail:", e);
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
