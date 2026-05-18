import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "High-Up Labs — Performance Marketing pe Comision";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#CCFF00",
            textTransform: "uppercase",
            letterSpacing: "-0.05em",
            marginBottom: "20px",
          }}
        >
          HIGH-UP LABS
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "#FFFFFF",
            textAlign: "center",
            fontFamily: "monospace",
          }}
        >
          Performance Marketing pe Comision
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#A3A3A3",
            marginTop: "30px",
            fontFamily: "monospace",
          }}
        >
          5-10% din vanzarile aduse de reclame · Zero retainer · 90 zile garantie
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
