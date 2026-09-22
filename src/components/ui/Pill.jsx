import React from "react";

const TONES = {
  neutral: { bg: "rgba(147,169,156,0.14)", fg: "#A9BEB2", ring: "rgba(147,169,156,0.22)" },
  amber: { bg: "rgba(242,169,59,0.14)", fg: "#F7C070", ring: "rgba(242,169,59,0.3)" },
  green: { bg: "rgba(79,190,130,0.14)", fg: "#6FD69B", ring: "rgba(79,190,130,0.3)" },
  red: { bg: "rgba(224,96,78,0.16)", fg: "#F08D7C", ring: "rgba(224,96,78,0.3)" },
};

export default function Pill({ children, tone = "neutral" }) {
  const t = TONES[tone];
  return (
    <span style={{
      background: t.bg, color: t.fg, fontSize: 10.5, fontWeight: 700,
      padding: "4px 9px", borderRadius: 999, letterSpacing: 0.5,
      textTransform: "uppercase", fontFamily: "Inter, sans-serif",
      display: "inline-flex", alignItems: "center", gap: 4,
      boxShadow: `0 0 0 1px ${t.ring} inset`,
    }}>
      {children}
    </span>
  );
}
