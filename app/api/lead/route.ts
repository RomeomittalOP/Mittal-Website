import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Serverless filesystems are read-only except the OS temp dir, so we persist
// best-effort there and always log the lead so it is captured in platform logs.
const LEADS_FILE = path.join(os.tmpdir(), "mittal-leads.json");

type Lead = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  budget?: string;
  requirements?: string;
  receivedAt: string;
};

async function persist(lead: Lead) {
  try {
    let leads: Lead[] = [];
    try {
      const existing = await fs.readFile(LEADS_FILE, "utf-8");
      const parsed = JSON.parse(existing);
      if (Array.isArray(parsed)) leads = parsed;
    } catch {
      leads = [];
    }
    leads.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch {
    // Read-only FS (e.g. serverless) — ignore; lead is still logged below.
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.email || !body?.requirements) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const lead: Lead = {
      name: String(body.name).slice(0, 200),
      business: body.business ? String(body.business).slice(0, 200) : "",
      email: String(body.email).slice(0, 200),
      phone: body.phone ? String(body.phone).slice(0, 50) : "",
      budget: body.budget ? String(body.budget).slice(0, 100) : "",
      requirements: String(body.requirements).slice(0, 4000),
      receivedAt: new Date().toISOString(),
    };

    // Always log so the lead is captured in platform/function logs.
    console.log("[LEAD]", JSON.stringify(lead));
    await persist(lead);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
