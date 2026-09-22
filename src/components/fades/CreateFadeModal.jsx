import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GAMES, RAKE } from "../../data/games.js";
import ModalShell, { Field, selectStyle } from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";

export default function CreateFadeModal({ onClose }) {
  const { createFade, actingAs } = useApp();
  const [gameId, setGameId] = useState(GAMES[0].id);
  const [side, setSide] = useState(GAMES[0].a);
  const [stake, setStake] = useState(50);
  const game = GAMES.find((g) => g.id === gameId);

  const submit = () => {
    createFade(gameId, side, stake, actingAs);
    onClose();
  };

  return (
    <ModalShell onClose={onClose} title="Open a Fade">
      <Field label="Game">
        <select
          value={gameId}
          onChange={(e) => { setGameId(e.target.value); setSide(GAMES.find((g) => g.id === e.target.value).a); }}
          style={selectStyle}
        >
          {GAMES.map((g) => <option key={g.id} value={g.id}>{g.a} vs {g.b} · {g.time}</option>)}
        </select>
      </Field>
      <Field label="Your side">
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant={side === game.a ? "primary" : "ghost"} style={{ flex: 1, justifyContent: "center" }} onClick={() => setSide(game.a)}>{game.a}</Button>
          <Button variant={side === game.b ? "primary" : "ghost"} style={{ flex: 1, justifyContent: "center" }} onClick={() => setSide(game.b)}>{game.b}</Button>
        </div>
      </Field>
      <Field label={`Stake (pts) — ${stake} each side`}>
        <input type="range" min={10} max={300} step={10} value={stake}
          onChange={(e) => setStake(Number(e.target.value))} style={{ width: "100%" }} />
      </Field>
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 10 }}>
        Whoever takes the other side matches your {stake} pts. Winner takes the pot minus a {Math.round(RAKE * 100)}% house rake.
      </div>
      <Button style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
        Post challenge as {actingAs}
      </Button>
    </ModalShell>
  );
}
