import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const alt = "MITTAL® DIGITAL — Websites That Make Businesses Look Expensive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(900px 600px at 80% -10%, rgba(255,255,255,0.12), transparent), #0A0A0B",
          color: "#EDEDED",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, letterSpacing: 4 }}>
          <span style={{ fontWeight: 700 }}>MITTAL</span>
          <span style={{ color: "#9A9AA0", fontWeight: 700 }}>.WEBSITE</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 950,
          }}
        >
          Websites That Make Businesses Look Expensive
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "rgba(237,237,237,0.65)" }}>
          Premium websites, landing pages &amp; custom web apps · Starting ₹5,555
        </div>
        <div style={{ marginTop: 40, fontSize: 22, letterSpacing: 2, color: "#9A9AA0" }}>
          Powered by mittal.website
        </div>
      </div>
    ),
    { ...size }
  );
}
