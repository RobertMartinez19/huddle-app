import React from "react";
import { AVATAR_COLORS } from "../../data/friends.js";

export default function Avatar({ name, size = 32 }) {
  const color = AVATAR_COLORS[name] || "#8FA69A";
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(160deg, ${color}, ${color}99)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Oswald, sans-serif", fontWeight: 600,
        fontSize: size * 0.4, color: "#0B1712", flexShrink: 0,
        border: "2px solid rgba(255,255,255,0.15)",
      }}
    >
      {name[0]}
    </div>
  );
}
