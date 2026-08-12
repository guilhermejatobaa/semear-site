import { ImageResponse } from "next/og";

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
          padding: 80,
          background: "#2C2620",
          color: "#F4F1E8",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {["#7A9A3B", "#B4521E", "#7A9A3B", "#B4521E"].map((cor, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: cor,
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 24, display: "flex" }}>
          SEMEAR
        </div>
        <div style={{ fontSize: 36, marginTop: 8, color: "#F4F1E8CC", display: "flex" }}>
          Nove unidades em seis estados do Nordeste
        </div>
      </div>
    ),
    { ...size }
  );
}
