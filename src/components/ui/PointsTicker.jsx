import React from "react";
import { fmt } from "../../utils/format.js";

export default function PointsTicker({ value, size = 28, color = "var(--amber)" }) {
  return (
    <span style={{
      fontFamily: "'Roboto Mono', monospace", fontWeight: 700,
      fontSize: size, color, letterSpacing: 0.5,
      fontVariantNumeric: "tabular-nums",
    }}>
      {fmt(value)}
    </span>
  );
}
