import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

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
          background: "#0E3B39",
          borderRadius: 16,
        }}
      >
        <span
          style={{
            color: "#FBFAF5",
            fontSize: 34,
            fontFamily: "serif",
          }}
        >
          S
        </span>
      </div>
    ),
    { ...size }
  );
}
