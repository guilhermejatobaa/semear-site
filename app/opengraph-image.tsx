import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoSvg = readFileSync(
    join(process.cwd(), "public/logo/semear-branco.svg")
  ).toString("base64");
  const logoDataUri = `data:image/svg+xml;base64,${logoSvg}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0B3D24",
        }}
      >
        <img src={logoDataUri} width={520} height={143} alt="" />
        <div style={{ display: "flex", width: 90, height: 6, background: "#F9A70D", marginTop: 40 }} />
        <div style={{ fontSize: 36, marginTop: 24, color: "#F3F8EC", display: "flex" }}>
          Nove unidades em sete estados do Nordeste
        </div>
      </div>
    ),
    { ...size }
  );
}
