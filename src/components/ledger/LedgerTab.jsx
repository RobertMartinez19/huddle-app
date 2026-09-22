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
      <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Ledger</div>

      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 8 }}>Squad balances</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FRIENDS.map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Avatar name={f} size={22} />
                <span style={{ fontSize: 13 }}>{f}</span>
              </div>
              <PointsTicker value={balances[f]} size={15} color="var(--text)" />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px dashed var(--border)", paddingTop: 8, marginTop: 2 }}>
            <span style={{ fontSize: 13, color: "var(--amber)" }}>House (revenue)</span>
            <PointsTicker value={houseTake} size={15} />
          </div>
        </div>
      </Card>

      {ledger.length === 0 && (
        <Card style={{ textAlign: "center", color: "var(--text-dim)", padding: 24 }}>
          <Wallet size={22} style={{ opacity: 0.5, marginBottom: 8 }} />
          <div style={{ fontSize: 13 }}>No activity yet.</div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ledger.map((entry) => (
          <Card key={entry.id} style={{ padding: 12 }}>
            <div style={{ fontSize: 12.5 }}>{entry.desc}</div>
            <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
              {entry.entries.map((e, i) => (
                <span key={i} style={{
                  fontSize: 11, display: "flex", alignItems: "center", gap: 3,
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
