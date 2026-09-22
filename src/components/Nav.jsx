import React from "react";
import { Trophy, Users, Swords, Wallet } from "lucide-react";

const TABS = [
  { id: "dashboard", label: "Home", icon: Trophy },
  { id: "pools", label: "Pools", icon: Users },
  { id: "fades", label: "Fade Board", icon: Swords },
  { id: "ledger", label: "Ledger", icon: Wallet },
];

export default function Nav({ tab, setTab, poolBadge, fadeBadge }) {
  const badges = { pools: poolBadge, fades: fadeBadge };

  return (
    <div style={{
      position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: "100%", maxWidth: 480, background: "var(--surface)",
      borderTop: "1px solid var(--border)", display: "flex", padding: "8px 4px 12px",
    }}>
      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setTab(id)}
          style={{
            flex: 1, background: "transparent", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: tab === id ? "var(--amber)" : "var(--text-dim)", position: "relative", padding: 4,
          }}
        >
          <Icon size={20} strokeWidth={tab === id ? 2.4 : 1.8} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>{label}</span>
          {!!badges[id] && (
            <span style={{
              position: "absolute", top: -2, right: "28%", background: "var(--red)",
              color: "#fff", fontSize: 9, fontWeight: 700, borderRadius: 999,
              minWidth: 14, height: 14, display: "flex", alignItems: "center", justifyContent: "center",
            }}>{badges[id]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
