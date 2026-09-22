import React from "react";
import { Swords, UserCircle2, Flame } from "lucide-react";
import { useApp } from "../../context/AppContext.jsx";
import { fmt } from "../../utils/format.js";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Pill from "../ui/Pill.jsx";
import PointsTicker from "../ui/PointsTicker.jsx";
import Avatar from "../ui/Avatar.jsx";

export default function FadesTab({ onCreate }) {
  const { fades, gameById, actingAs, acceptFade, settleFade } = useApp();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 18 }}>Fade Board</div>
        <Button onClick={onCreate} small><Swords size={14} /> Open a Fade</Button>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 12 }}>
        Think a friend's pick is wrong? Take the other side, stake matched 1-for-1.
      </div>

      {fades.length === 0 && (
        <Card style={{ textAlign: "center", color: "var(--text-dim)", padding: 28 }}>
          <Swords size={24} style={{ opacity: 0.5, marginBottom: 8 }} />
          <div style={{ fontSize: 13 }}>No fades open. Call out a friend's take.</div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {fades.map((fade) => {
          const game = gameById(fade.gameId);
          const otherSide = fade.side === game.a ? game.b : game.a;
          return (
            <Card key={fade.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Pill tone={fade.status === "settled" ? "green" : fade.status === "matched" ? "amber" : "red"}>
                  {fade.status === "open" ? "Open challenge" : fade.status === "matched" ? "Matched — awaiting result" : "Settled"}
                </Pill>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "var(--text-dim)" }}>STAKE EACH</div>
                  <PointsTicker value={fade.stake} size={16} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <Avatar name={fade.creator} size={30} />
                  <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>{fade.creator}</div>
                  <div style={{ fontSize: 11, color: "var(--amber)" }}>{fade.side}</div>
                </div>
                <div style={{ fontFamily: "Oswald", color: "var(--text-dim)", fontSize: 13 }}>VS</div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  {fade.opponent ? (
                    <>
                      <Avatar name={fade.opponent} size={30} />
                      <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>{fade.opponent}</div>
                      <div style={{ fontSize: 11, color: "var(--red)" }}>{otherSide}</div>
                    </>
                  ) : (
                    <>
                      <div style={{
                        width: 30, height: 30, borderRadius: "50%", border: "2px dashed var(--border)",
                        margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <UserCircle2 size={16} color="var(--text-dim)" />
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>open</div>
                      <div style={{ fontSize: 11, color: "var(--text-dim)" }}>takes {otherSide}</div>
                    </>
                  )}
                </div>
              </div>

              <div style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "center", marginTop: 8 }}>
                {game.a} vs {game.b} · {game.time}
              </div>

              {fade.status === "open" && fade.creator !== actingAs && (
                <Button style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
                  onClick={() => acceptFade(fade.id, actingAs)}>
                  Take {otherSide} for {fmt(fade.stake)} pts
                </Button>
              )}
              {fade.status === "matched" && (
                <div style={{ display: "flex", gap: 8, marginTop: 12, borderTop: "1px solid var(--border)", paddingTop: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--text-dim)", alignSelf: "center" }}>Simulate final:</span>
                  <Button small variant="dim" onClick={() => settleFade(fade.id, game.a)}>{game.a} wins</Button>
                  <Button small variant="dim" onClick={() => settleFade(fade.id, game.b)}>{game.b} wins</Button>
                </div>
              )}
              {fade.status === "settled" && (
                <div style={{ marginTop: 10, fontSize: 12, color: "var(--amber)", display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
                  <Flame size={14} /> {fade.resultSide} hit — winner paid out
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
