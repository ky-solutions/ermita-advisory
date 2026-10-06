import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt =
  "Ermita Advisory — Ingénierie financière & conseil en management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const font = await readFile(
    join(process.cwd(), "public/fonts/SpaceGrotesk-OG.ttf"),
  );
  const logo = await readFile(
    join(process.cwd(), "public/logo/ermita-advisory-logo-transparent.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F7F6F2",
        color: "#24242B",
        padding: "70px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Space Grotesk",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        width={380}
        height={138}
        alt=""
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 48,
          lineHeight: 1.2,
        }}
      >
        <span>Ingénierie financière &</span>
        <span style={{ color: "#385CDB" }}>conseil en management.</span>
      </div>
      <div style={{ width: "100%", height: 5, background: "#385CDB" }} />
    </div>,
    {
      ...size,
      fonts: [
        { name: "Space Grotesk", data: font, weight: 400, style: "normal" },
      ],
    },
  );
}
