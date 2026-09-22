import React from "react";
import { Users, Swords, Clock, ChevronRight, ShieldCheck, Trophy } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { GAMES } from "../data/games.js";
import Card from "./ui/Card.jsx";
import Pill from "./ui/Pill.jsx";
import PointsTicker from "./ui/PointsTicker.jsx";

export default function Dashboard({ onGoPools, onGoFades }) {
  const { actingAs, pools, fades, houseTake } = useApp();

  const openPools = pools.filter((p) => p.status === "open");
  const myFades = fades.filter((f) => f.creator === actingAs || f.opponent === actingAs);
  const totalPotsLive = openPools.reduce((s, p) => s + p.picks.length * p.entryFee, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{
        background: "linear-gradient(145deg, #17281F, #0F1D17)",
        border: "1px solid var(--border)", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, background: "radial-gradient(circle at 80% 0%, var(--amber), transparent 60%)" }} />
        <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600 }}>
          Live pot value across the squad
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 6 }}>
          <PointsTicker value={totalPotsLive} size={38} />
          <span style={{ color: "var(--text-dim)", fontSize: 13 }}>pts in play</span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: "var(--text-dim)" }}>OPEN POOLS</div>
            <div style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 600 }}>{openPools.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--text-dim)" }}>YOUR FADES</div>
            <div style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 600 }}>{myFades.length}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--text-dim)" }}>HOUSE TAKE</div>
            <div style={{ fontFamily: "Oswald", fontSize: 18, fontWeight: 600, color: "var(--amber)" }}>{houseTake}</div>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 10 }}>
        <Card style={{ flex: 1, cursor: "pointer" }} onClick={onGoPools}>
          <Users size={18} color="var(--amber)" />
          <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 14, marginTop: 6 }}>Group Pools</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>Everyone chips in, correct picks split the pot.</div>
        </Card>
        <Card style={{ flex: 1, cursor: "pointer" }} onClick={onGoFades}>
          <Swords size={18} color="var(--red)" />
          <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 14, marginTop: 6 }}>Fade a Friend</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>Bet directly against one friend's pick, 1-for-1.</div>
        </Card>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 8, letterSpacing: 0.5 }}>
          This week's board
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {GAMES.map((g) => (
            <Card key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Pill>{g.sport}</Pill>
                <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 15, marginTop: 5 }}>{g.a} vs {g.b}</div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} /> {g.time} · locks in {g.locksInMin}m
                </div>
              </div>
              <ChevronRight size={18} color="var(--text-dim)" />
            </Card>
          ))}
        </div>
      </div>

      <Card style={{ background: "rgba(242,169,59,0.06)", border: "1px dashed rgba(242,169,59,0.35)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <ShieldCheck size={16} color="var(--amber)" style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
            This prototype runs on <b style={{ color: "var(--text)" }}>Club Points</b> — a virtual, non-redeemable currency, by design. See README.md for the path from this to a compliant real-stakes product.
          </div>
        </div>
      </Card>
    </div>
  );
}
