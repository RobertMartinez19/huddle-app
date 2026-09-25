import React from "react";
import { Users, Swords, Clock, ChevronRight, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";
import { GAMES } from "../data/games.js";
import Card from "./ui/Card.jsx";
import Pill from "./ui/Pill.jsx";
import PointsTicker from "./ui/PointsTicker.jsx";
import TiltCard from "./ui/TiltCard.jsx";

export default function Dashboard({ onGoPools, onGoFades }) {
  const { actingAs, pools, fades, houseTake } = useApp();

  const openPools = pools.filter((p) => p.status === "open");
  const myFades = fades.filter((f) => f.creator === actingAs || f.opponent === actingAs);
  const totalPotsLive = openPools.reduce((s, p) => s + p.picks.length * p.entryFee, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <TiltCard maxTilt={5}>
      <Card style={{
        background: "linear-gradient(150deg, #18291F 0%, #0F1D17 55%, #0D1913 100%)",
        border: "1px solid var(--border-bright)", position: "relative", overflow: "hidden",
        boxShadow: "var(--shadow-md)", padding: 18,
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.14, background: "radial-gradient(circle at 82% -10%, var(--amber), transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.7, background: "radial-gradient(circle at -10% 120%, rgba(79,190,130,0.16), transparent 50%)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: 0.7, fontWeight: 700 }}>
            Live pot value across the squad
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
            <PointsTicker value={totalPotsLive} size={40} glow />
            <span style={{ color: "var(--text-dim)", fontSize: 13, fontWeight: 500 }}>pts in play</span>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--text-faint)", letterSpacing: 0.4, fontWeight: 700 }}>OPEN POOLS</div>
              <div style={{ fontFamily: "Oswald", fontSize: 19, fontWeight: 600, marginTop: 2 }}>{openPools.length}</div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--text-faint)", letterSpacing: 0.4, fontWeight: 700 }}>YOUR FADES</div>
              <div style={{ fontFamily: "Oswald", fontSize: 19, fontWeight: 600, marginTop: 2 }}>{myFades.length}</div>
            </div>
            <div>
              <div style={{ fontSize: 9.5, color: "var(--text-faint)", letterSpacing: 0.4, fontWeight: 700 }}>HOUSE TAKE</div>
              <div style={{ fontFamily: "Oswald", fontSize: 19, fontWeight: 600, marginTop: 2, color: "var(--amber-bright)" }}>{houseTake}</div>
            </div>
          </div>
        </div>
      </Card>
      </TiltCard>

      <div style={{ display: "flex", gap: 10 }}>
        <Card accent="var(--amber)" style={{ flex: 1 }} onClick={onGoPools}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, background: "rgba(242,169,59,0.14)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Users size={16} color="var(--amber)" />
          </div>
          <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 14, marginTop: 9 }}>Group Pools</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 3, lineHeight: 1.4 }}>Everyone chips in, correct picks split the pot.</div>
        </Card>
        <Card accent="var(--red)" style={{ flex: 1 }} onClick={onGoFades}>
          <div style={{
            width: 32, height: 32, borderRadius: 9, background: "rgba(224,96,78,0.14)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Swords size={16} color="var(--red)" />
          </div>
          <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 14, marginTop: 9 }}>Fade a Friend</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 3, lineHeight: 1.4 }}>Bet directly against one friend's pick, 1-for-1.</div>
        </Card>
      </div>

      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase", marginBottom: 9, letterSpacing: 0.6 }}>
          This week's board
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {GAMES.map((g, i) => (
            <Card key={g.id} interactive enter delay={i * 40} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Pill>{g.sport}</Pill>
                <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 15, marginTop: 6 }}>{g.a} vs {g.b}</div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={11} /> {g.time} · locks in {g.locksInMin}m
                </div>
              </div>
              <ChevronRight size={18} color="var(--text-faint)" />
            </Card>
          ))}
        </div>
      </div>

      <Card style={{ background: "rgba(242,169,59,0.06)", border: "1px dashed rgba(242,169,59,0.35)", boxShadow: "none" }}>
        <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
          <ShieldCheck size={16} color="var(--amber)" style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
            This prototype runs on <b style={{ color: "var(--text)" }}>Club Points</b> — a virtual, non-redeemable currency, by design. See README.md for the path from this to a compliant real-stakes product.
          </div>
        </div>
      </Card>
    </div>
  );
}
