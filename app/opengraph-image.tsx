import { ImageResponse } from "next/og";
import { CLINIC } from "@/lib/constants";

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
          background: "#F3EFE4",
          color: "#102422",
        }}
      >
        <span
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#B8922F",
            fontFamily: "sans-serif",
          }}
        >
          CIDCO N-2, Chhatrapati Sambhajinagar
        </span>
        <span
          style={{
            fontSize: 64,
            fontFamily: "serif",
            marginTop: 24,
            lineHeight: 1.1,
          }}
        >
          {CLINIC.name}
        </span>
        <span
          style={{
            fontSize: 28,
            marginTop: 28,
            color: "#0E3B39",
            fontFamily: "sans-serif",
          }}
        >
          General Dentistry &amp; Dental Implants
        </span>
      </div>
    ),
    { ...size }
  );
}
