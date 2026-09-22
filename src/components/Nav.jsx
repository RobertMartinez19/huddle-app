import React from "react";
import { Trophy, Users, Swords, Wallet } from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Home", icon: Trophy, color: "var(--amber)" },
  { id: "pools", label: "Pools", icon: Users, color: "var(--amber)" },
  { id: "fades", label: "Fade Board", icon: Swords, color: "var(--red)" },
  { id: "ledger", label: "Ledger", icon: Wallet, color: "var(--blue)" },
];

export default function Nav({ tab, setTab, poolBadge, fadeBadge }) {
  const badges = { pools: poolBadge, fades: fadeBadge };

  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 480, padding: "0 10px 16px", pointerEvents: "none",
    }}>
      <div style={{
        display: "flex", padding: "6px", gap: 2,
        background: "rgba(18,31,25,0.82)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
        border: "1px solid var(--border-bright)", borderRadius: 18,
        boxShadow: "var(--shadow-lg)", pointerEvents: "auto",
      }}>
        {TABS.map(({ id, label, icon: Icon, color }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="huddle-tab-btn"
              style={{
                flex: 1, background: active ? "var(--surface-3)" : "transparent",
                border: "none", cursor: "pointer", borderRadius: 13,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                color: active ? "var(--text)" : "var(--text-faint)", position: "relative",
                padding: "9px 4px 7px",
                boxShadow: active ? `0 0 0 1px ${color}33 inset, 0 2px 10px -3px ${color}55` : "none",
              }}
            >
              <Icon size={19} strokeWidth={active ? 2.3 : 1.8} color={active ? color : "currentColor"} />
              <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.2 }}>{label}</span>
              {!!badges[id] && (
                <span style={{
                  position: "absolute", top: 2, right: "24%", background: "var(--red)",
                  color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 999,
                  minWidth: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 0 0 2px var(--surface-2)",
                  animation: "pillPop 0.25s cubic-bezier(0.2,0.8,0.2,1)",
                }}>{badges[id]}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
