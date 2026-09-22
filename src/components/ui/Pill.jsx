import React from "react";

const TONES = {
  neutral: { bg: "rgba(143,166,154,0.15)", fg: "#8FA69A" },
  amber: { bg: "rgba(242,169,59,0.15)", fg: "#F2A93B" },
  green: { bg: "rgba(79,190,130,0.15)", fg: "#4FBE82" },
  red: { bg: "rgba(214,90,74,0.18)", fg: "#E27A6C" },
};

export default function Pill({ children, tone = "neutral" }) {
  const t = TONES[tone];
  return (
    <span style={{
      background: t.bg, color: t.fg, fontSize: 11, fontWeight: 700,
      padding: "3px 8px", borderRadius: 999, letterSpacing: 0.4,
      textTransform: "uppercase", fontFamily: "Inter, sans-serif",
      display: "inline-flex", alignItems: "center", gap: 4,
    }}>
      {children}
    </span>
  );
}
