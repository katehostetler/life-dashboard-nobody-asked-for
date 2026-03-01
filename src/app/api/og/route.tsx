import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const yearProgress = searchParams.get("year") ?? "16.4";
  const astronauts = searchParams.get("astronauts") ?? "7";
  const topArticle = searchParams.get("article") ?? "Something fascinating";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0D0A1A 0%, #141024 40%, #1C1635 100%)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 300,
              color: "#F0EBF4",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            Life Dashboard
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#A89BBE",
              textAlign: "center",
            }}
          >
            Nobody Asked For
          </div>

          <div
            style={{
              display: "flex",
              gap: "40px",
              marginTop: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ fontSize: "36px", color: "#FFD166", fontWeight: 600 }}>
                {astronauts}
              </div>
              <div style={{ fontSize: "14px", color: "#6B5E80" }}>
                humans in space
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ fontSize: "36px", color: "#FFD166", fontWeight: 600 }}>
                {yearProgress}%
              </div>
              <div style={{ fontSize: "14px", color: "#6B5E80" }}>
                of 2026 complete
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "16px",
              color: "#A89BBE",
              marginTop: "20px",
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            Reading: {topArticle}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
