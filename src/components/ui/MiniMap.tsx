"use client";

interface MiniMapProps {
  latitude: number;
  longitude: number;
}

// Simple SVG world map outline (simplified continents)
// Map projection: Equirectangular
function toSVG(lat: number, lon: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * 800,
    y: ((90 - lat) / 180) * 400,
  };
}

export default function MiniMap({ latitude, longitude }: MiniMapProps) {
  const issPos = toSVG(latitude, longitude);

  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full aspect-[2/1] rounded-lg"
      style={{
        background: "linear-gradient(180deg, #0D0A1A, #141024)",
      }}
      role="img"
      aria-label={`World map showing ISS position at latitude ${latitude.toFixed(1)}, longitude ${longitude.toFixed(1)}`}
    >
      {/* Grid lines */}
      {[...Array(7)].map((_, i) => (
        <line
          key={`h${i}`}
          x1={0}
          y1={(i + 1) * 50}
          x2={800}
          y2={(i + 1) * 50}
          stroke="#2A2248"
          strokeWidth={0.5}
        />
      ))}
      {[...Array(15)].map((_, i) => (
        <line
          key={`v${i}`}
          x1={(i + 1) * 50}
          y1={0}
          x2={(i + 1) * 50}
          y2={400}
          stroke="#2A2248"
          strokeWidth={0.5}
        />
      ))}

      {/* Simplified continent outlines */}
      {/* North America */}
      <path
        d="M120,80 L180,70 L220,90 L230,120 L220,160 L200,180 L170,190 L140,180 L130,160 L110,140 L100,110 Z"
        fill="#1C1635"
        stroke="#2A2248"
        strokeWidth={1}
      />
      {/* South America */}
      <path
        d="M200,210 L230,200 L250,220 L260,260 L250,300 L230,330 L210,340 L195,320 L185,280 L190,240 Z"
        fill="#1C1635"
        stroke="#2A2248"
        strokeWidth={1}
      />
      {/* Europe */}
      <path
        d="M370,80 L410,70 L430,80 L440,100 L430,120 L410,130 L380,125 L370,110 Z"
        fill="#1C1635"
        stroke="#2A2248"
        strokeWidth={1}
      />
      {/* Africa */}
      <path
        d="M380,150 L420,140 L450,160 L460,200 L450,250 L430,280 L400,290 L380,270 L370,230 L375,190 Z"
        fill="#1C1635"
        stroke="#2A2248"
        strokeWidth={1}
      />
      {/* Asia */}
      <path
        d="M440,60 L520,50 L600,60 L650,80 L670,100 L660,130 L630,150 L580,160 L530,150 L480,140 L450,120 L440,90 Z"
        fill="#1C1635"
        stroke="#2A2248"
        strokeWidth={1}
      />
      {/* Australia */}
      <path
        d="M620,250 L670,240 L700,250 L710,280 L690,300 L660,305 L630,290 L620,270 Z"
        fill="#1C1635"
        stroke="#2A2248"
        strokeWidth={1}
      />

      {/* ISS orbit trail (fading) */}
      <circle
        cx={issPos.x}
        cy={issPos.y}
        r={30}
        fill="none"
        stroke="rgba(245, 166, 35, 0.1)"
        strokeWidth={1}
      />
      <circle
        cx={issPos.x}
        cy={issPos.y}
        r={18}
        fill="none"
        stroke="rgba(245, 166, 35, 0.15)"
        strokeWidth={1}
      />

      {/* ISS position dot */}
      <circle
        cx={issPos.x}
        cy={issPos.y}
        r={5}
        fill="#F5A623"
        style={{
          filter: "drop-shadow(0 0 8px rgba(245, 166, 35, 0.6))",
        }}
      >
        <animate
          attributeName="r"
          values="4;6;4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* ISS label */}
      <text
        x={issPos.x + 12}
        y={issPos.y - 10}
        fill="#F5A623"
        fontSize={11}
        fontFamily="Inter, system-ui, sans-serif"
      >
        ISS
      </text>
    </svg>
  );
}
