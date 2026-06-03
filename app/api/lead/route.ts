import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

type Lead = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  budget?: string;
  requirements?: string;
  receivedAt: string;
};

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

    await fs.mkdir(DATA_DIR, { recursive: true });

    let leads: Lead[] = [];
    try {
      const existing = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(existing);
      if (!Array.isArray(leads)) leads = [];
    } catch {
      leads = [];
    }

    leads.push(lead);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");

    // In production, also forward to email/CRM/webhook here.
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Server error." }, { status: 500 });
  }
}
