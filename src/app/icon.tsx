import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon — gradient + AFFIRM tall-I mark */
export default function Icon() {
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
          borderRadius: 6,
          color: "#1a1a1a",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.04em" }}>AFF</span>
          <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1, margin: "0 1px" }}>I</span>
          <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.04em" }}>RM</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
