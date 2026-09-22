import React, { useState } from "react";
import { useApp } from "../../context/AppContext.jsx";
import { GAMES } from "../../data/games.js";
import ModalShell, { Field, selectStyle, inputStyle } from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";

export default function CreatePoolModal({ onClose }) {
  const { createPool } = useApp();
  const [gameId, setGameId] = useState(GAMES[0].id);
  const [title, setTitle] = useState("");
  const [entryFee, setEntryFee] = useState(50);
  const [splitRule, setSplitRule] = useState("split-correct");
  const game = GAMES.find((g) => g.id === gameId);
  const feePct = ((entryFee - 10) / (200 - 10)) * 100;

  const submit = () => {
    createPool(gameId, title || `${game.a} vs ${game.b} squad pool`, entryFee, splitRule);
    onClose();
  };

  return (
    <ModalShell onClose={onClose} title="New Group Pool">
      <Field label="Game">
        <select value={gameId} onChange={(e) => setGameId(e.target.value)} style={selectStyle}>
          {GAMES.map((g) => <option key={g.id} value={g.id}>{g.a} vs {g.b} · {g.time}</option>)}
        </select>
      </Field>
      <Field label="Pool name">
        <input
          value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder={`${game.a} vs ${game.b} squad pool`}
          style={inputStyle}
        />
      </Field>
      <Field label={`Entry fee (pts) — ${entryFee}`}>
        <input type="range" min={10} max={200} step={10} value={entryFee}
          onChange={(e) => setEntryFee(Number(e.target.value))}
          className="huddle-range" style={{ "--fill": `${feePct}%` }} />
      </Field>
      <Field label="How the pot splits">
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant={splitRule === "split-correct" ? "primary" : "ghost"} style={{ flex: 1, justifyContent: "center" }}
            onClick={() => setSplitRule("split-correct")}>Split among correct</Button>
          <Button variant={splitRule === "winner-take-all" ? "primary" : "ghost"} style={{ flex: 1, justifyContent: "center" }}
            onClick={() => setSplitRule("winner-take-all")}>Winner take all</Button>
        </div>
      </Field>
      <Button style={{ width: "100%", justifyContent: "center", marginTop: 6 }} onClick={submit}>
        Create pool
      </Button>
    </ModalShell>
  );
}
