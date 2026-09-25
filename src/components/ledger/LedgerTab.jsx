import React from "react";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";
import { FRIENDS } from "../../data/friends.js";
import { fmt } from "../../utils/format.js";
import Card from "../ui/Card.jsx";
import Avatar from "../ui/Avatar.jsx";
import PointsTicker from "../ui/PointsTicker.jsx";

export default function LedgerTab() {
  const { ledger, houseTake, balances } = useApp();

  return (
    <div>
      <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 19, marginBottom: 14 }}>Ledger</div>

      <Card accent="var(--blue)" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10.5, color: "var(--text-faint)", textTransform: "uppercase", marginBottom: 10, fontWeight: 700, letterSpacing: 0.5 }}>Squad balances</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {FRIENDS.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar name={f} size={23} />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{f}</span>
              </div>
              <PointsTicker value={balances[f]} size={15} color="var(--text)" />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px dashed var(--border-bright)", paddingTop: 10, marginTop: 3 }}>
            <span style={{ fontSize: 13, color: "var(--amber)", fontWeight: 600 }}>House (revenue)</span>
            <PointsTicker value={houseTake} size={15} glow />
          </div>
        </div>
      </Card>

      {ledger.length === 0 && (
        <Card style={{ textAlign: "center", color: "var(--text-dim)", padding: 26 }}>
          <Wallet size={22} style={{ opacity: 0.5, marginBottom: 8 }} />
          <div style={{ fontSize: 13 }}>No activity yet.</div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ledger.map((entry) => (
          <Card key={entry.id} enter style={{ padding: 13 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>{entry.desc}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 7, flexWrap: "wrap" }}>
              {entry.entries.map((e, i) => (
                <span key={i} style={{
                  fontSize: 11, display: "flex", alignItems: "center", gap: 3, fontWeight: 600,
                  color: e.delta >= 0 ? "var(--green)" : "var(--red)",
                }}>
                  {e.delta >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {e.friend} {e.delta >= 0 ? "+" : ""}{fmt(e.delta)}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
