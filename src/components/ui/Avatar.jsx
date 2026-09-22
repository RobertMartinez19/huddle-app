import React from "react";
import { AVATAR_COLORS } from "../../data/friends.js";

export default function Avatar({ name, size = 32, ring }) {
  const color = AVATAR_COLORS[name] || "#8FA69A";
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%",
        background: `linear-gradient(155deg, ${color}, ${color}99)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "Oswald, sans-serif", fontWeight: 600,
        fontSize: size * 0.4, color: "#0B1712", flexShrink: 0,
        border: "2px solid rgba(255,255,255,0.18)",
        boxShadow: ring
          ? `0 0 0 2px var(--bg), 0 0 0 3.5px ${color}, 0 4px 10px -2px ${color}66`
          : "0 2px 6px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.15s ease",
      }}
    >
      {name[0]}
    </div>
  );
}
