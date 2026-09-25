import React from "react";
import { Users, Plus, Check, Trophy } from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";
import { RAKE } from "../../data/games.js";
import { fmt } from "../../utils/format.js";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Pill from "../ui/Pill.jsx";
import PointsTicker from "../ui/PointsTicker.jsx";
import Avatar from "../ui/Avatar.jsx";

export default function PoolsTab({ onCreate }) {
  const { pools, gameById, actingAs, joinPool, settlePool } = useApp();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 19 }}>Group Pools</div>
        <Button onClick={onCreate} small><Plus size={14} /> New Pool</Button>
      </div>

      {pools.length === 0 && (
        <Card style={{ textAlign: "center", color: "var(--text-dim)", padding: 30 }}>
          <Users size={24} style={{ opacity: 0.5, marginBottom: 8 }} />
          <div style={{ fontSize: 13 }}>No pools yet. Start one on a game and get the squad to lock in picks.</div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {pools.map((pool) => {
          const game = gameById(pool.gameId);
          const potTotal = pool.picks.length * pool.entryFee;
          const rake = Math.round(potTotal * RAKE);
          const myPick = pool.picks.find((p) => p.friend === actingAs);
          return (
            <Card key={pool.id} enter accent={pool.status === "settled" ? "var(--green)" : "var(--amber)"}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Pill tone={pool.status === "settled" ? "green" : "amber"}>
                    {pool.status === "settled" ? "Settled" : pool.splitRule === "winner-take-all" ? "Winner takes all" : "Split among correct"}
                  </Pill>
                  <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 16, marginTop: 7 }}>{pool.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 1 }}>{game.a} vs {game.b} · entry {fmt(pool.entryFee)} pts</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 9.5, color: "var(--text-faint)", fontWeight: 700, letterSpacing: 0.3 }}>POT</div>
                  <PointsTicker value={potTotal} size={19} />
                  <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 1 }}>rake {fmt(rake)}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, marginTop: 13, flexWrap: "wrap" }}>
                {pool.picks.map((pk) => (
                  <div key={pk.friend} style={{
                    display: "flex", alignItems: "center", gap: 5, background: "var(--surface-2)",
                    borderRadius: 999, padding: "3px 9px 3px 3px",
                    border: pool.status === "settled" && pk.side === pool.resultSide ? "1px solid var(--green)" : "1px solid var(--border)",
                    boxShadow: pool.status === "settled" && pk.side === pool.resultSide ? "0 0 0 1px rgba(79,190,130,0.2)" : "none",
                  }}>
                    <Avatar name={pk.friend} size={18} />
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{pk.side}</span>
                  </div>
                ))}
              </div>

              {pool.status === "open" && !myPick && (
                <div style={{ display: "flex", gap: 8, marginTop: 13 }}>
                  <Button variant="ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => joinPool(pool.id, actingAs, game.a)}>
                    Pick {game.a}
                  </Button>
                  <Button variant="ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => joinPool(pool.id, actingAs, game.b)}>
                    Pick {game.b}
                  </Button>
                </div>
              )}
              {pool.status === "open" && myPick && (
                <div className="huddle-state-in" style={{ marginTop: 11, fontSize: 12, color: "var(--green)", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>
                  <Check size={14} /> You're in on {myPick.side}
                </div>
              )}
              {pool.status === "open" && pool.picks.length >= 2 && (
                <div style={{ display: "flex", gap: 8, marginTop: 11, borderTop: "1px solid var(--border)", paddingTop: 11 }}>
                  <span style={{ fontSize: 11, color: "var(--text-dim)", alignSelf: "center" }}>Simulate final:</span>
                  <Button small variant="dim" onClick={() => settlePool(pool.id, game.a)}>{game.a} wins</Button>
                  <Button small variant="dim" onClick={() => settlePool(pool.id, game.b)}>{game.b} wins</Button>
                </div>
              )}
              {pool.status === "settled" && (
                <div className="huddle-state-in" style={{ marginTop: 11, fontSize: 12, color: "var(--amber-bright)", display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>
                  <Trophy size={14} /> {pool.resultSide} covered — payouts distributed
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
