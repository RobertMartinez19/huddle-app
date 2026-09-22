import React from "react";
import { FRIENDS, AVATAR_COLORS } from "../data/friends.js";
import { useApp } from "../context/AppContext.jsx";
import Avatar from "./ui/Avatar.jsx";
import PointsTicker from "./ui/PointsTicker.jsx";

export default function Header() {
  const { actingAs, setActingAs, balances } = useApp();

  return (
    <div style={{
      padding: "18px 18px 14px", borderBottom: "1px solid var(--border)",
      background: "linear-gradient(180deg, rgba(242,169,59,0.06), transparent)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{
            fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 24,
            letterSpacing: 1, textTransform: "uppercase", lineHeight: 1,
          }}>
            Huddle
          </div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 3, letterSpacing: 0.3 }}>
            GROUP POOLS · FRIEND FADES
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.5 }}>Balance</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end" }}>
            <PointsTicker value={balances[actingAs]} size={22} />
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>pts</span>
          </div>
        </div>
      </div>

      {/* Acting-as switcher — lets you demo the whole social loop solo */}
      <div style={{ display: "flex", gap: 6, marginTop: 14, overflowX: "auto" }} className="huddle-scroll">
        {FRIENDS.map((f) => (
          <button
            key={f}
            onClick={() => setActingAs(f)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: actingAs === f ? "var(--surface-2)" : "transparent",
              border: actingAs === f ? `1px solid ${AVATAR_COLORS[f]}` : "1px solid var(--border)",
              borderRadius: 999, padding: "5px 10px 5px 5px", cursor: "pointer", flexShrink: 0,
            }}
          >
            <Avatar name={f} size={20} />
            <span style={{ fontSize: 12, fontWeight: 600, color: actingAs === f ? "var(--text)" : "var(--text-dim)" }}>{f}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
