import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — gradient + AFFIRM tall-I mark */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg, #9fd4d0 0%, #c5dfb0 50%, #e4eb9a 100%)",
          color: "#1a1a1a",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "0.06em", paddingBottom: 8 }}>
            AFF
          </span>
          <span style={{ fontSize: 72, fontWeight: 600, lineHeight: 1 }}>I</span>
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: "0.06em", paddingBottom: 8 }}>
            RM
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
