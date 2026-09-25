import React from "react";
import { FRIENDS, AVATAR_COLORS } from "../data/friends.js";
import { useApp } from "../context/AppContext.jsx";
import Avatar from "./ui/Avatar.jsx";
import PointsTicker from "./ui/PointsTicker.jsx";
import TiltCard from "./ui/TiltCard.jsx";

export default function Header() {
  const { actingAs, setActingAs, balances } = useApp();

  return (
    <div style={{
      padding: "20px 18px 16px", borderBottom: "1px solid var(--border)",
      background: "linear-gradient(180deg, rgba(242,169,59,0.08), transparent 70%)",
      position: "relative",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{
            fontFamily: "Oswald, sans-serif", fontWeight: 700, fontSize: 25,
            letterSpacing: 1.2, textTransform: "uppercase", lineHeight: 1,
            background: "linear-gradient(155deg, var(--text), var(--text-dim))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Huddle
          </div>
          <div style={{ fontSize: 10.5, color: "var(--text-faint)", marginTop: 4, letterSpacing: 0.6, fontWeight: 600 }}>
            GROUP POOLS · FRIEND FADES
          </div>
        </div>
        <TiltCard maxTilt={6}>
          <div style={{
            textAlign: "right", background: "var(--surface-2)", border: "1px solid var(--border)",
            borderRadius: 12, padding: "8px 12px", boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{ fontSize: 9.5, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 700 }}>Balance</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end", marginTop: 2 }}>
              <PointsTicker value={balances[actingAs]} size={21} glow />
              <span style={{ fontSize: 11, color: "var(--text-dim)" }}>pts</span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Acting-as switcher — lets you demo the whole social loop solo */}
      <div style={{ display: "flex", gap: 7, marginTop: 16, overflowX: "auto" }} className="huddle-scroll">
        {FRIENDS.map((f) => {
          const active = actingAs === f;
          return (
            <button
              key={f}
              onClick={() => setActingAs(f)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                background: active ? "var(--surface-3)" : "var(--surface-2)",
                border: active ? "1px solid var(--border-bright)" : "1px solid var(--border)",
                borderRadius: 999, padding: "5px 12px 5px 5px", cursor: "pointer", flexShrink: 0,
                transition: "background 0.15s ease, border-color 0.15s ease",
              }}
            >
              <Avatar name={f} size={22} ring={active} />
              <span style={{ fontSize: 12, fontWeight: 700, color: active ? "var(--text)" : "var(--text-dim)" }}>{f}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
