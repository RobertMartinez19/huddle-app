import React, { createContext, useContext, useCallback, useState } from "react";
import { FRIENDS, START_BALANCE } from "../data/friends.js";
import { RAKE, gameById } from "../data/games.js";
import { fmt, nextId } from "../utils/format.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [actingAs, setActingAs] = useState("You");
  const [balances, setBalances] = useState(() =>
    Object.fromEntries(FRIENDS.map((f) => [f, START_BALANCE]))
  );
  const [houseTake, setHouseTake] = useState(0);
  const [pools, setPools] = useState([]);
  const [fades, setFades] = useState([]);
  const [ledger, setLedger] = useState([]);
  const [toast, setToast] = useState(null);

  const flash = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }, []);

  const log = useCallback((desc, entries) => {
    setLedger((L) => [{ id: nextId(), desc, entries, ts: new Date() }, ...L]);
  }, []);

  // Every state-updating function below reads the state it needs from the
  // closure (fresh on every render) and does its affordability checks
  // *before* calling any setState. None of them call setState from inside
  // another updater — nesting side effects (flash/log/adjustBalance) inside
  // a setPools/setFades updater is what was causing double-charges and
  // duplicate toasts/ledger entries under React.StrictMode's dev
  // double-invoke of updater functions.

  // ---- POOL LOGIC ----
  const createPool = useCallback((gameId, title, entryFee, splitRule) => {
    setPools((P) => [
      { id: nextId(), gameId, title, entryFee, splitRule, status: "open", picks: [], resultSide: null },
      ...P,
    ]);
    flash("Pool created — invite the squad to pick a side.");
  }, [flash]);

  const joinPool = useCallback((poolId, friend, side) => {
    const pool = pools.find((p) => p.id === poolId);
    if (!pool || pool.picks.some((pk) => pk.friend === friend)) return;
    if (balances[friend] < pool.entryFee) {
      flash(`${friend} doesn't have enough points.`);
      return;
    }

    setBalances((b) => ({ ...b, [friend]: b[friend] - pool.entryFee }));
    setPools((P) => P.map((p) =>
      p.id === poolId ? { ...p, picks: [...p.picks, { friend, side }] } : p
    ));
    log(`${friend} joined "${pool.title}" on ${side}`, [{ friend, delta: -pool.entryFee }]);
  }, [pools, balances, flash, log]);

  const settlePool = useCallback((poolId, winningSide) => {
    const pool = pools.find((p) => p.id === poolId);
    if (!pool || pool.status !== "open") return;

    const potTotal = pool.picks.length * pool.entryFee;
    const rake = Math.round(potTotal * RAKE);
    const payout = potTotal - rake;
    const winners = pool.picks.filter((pk) => pk.side === winningSide);
    const entries = [];
    const deltas = {};

    if (winners.length === 0) {
      pool.picks.forEach((pk) => {
        deltas[pk.friend] = (deltas[pk.friend] || 0) + pool.entryFee;
        entries.push({ friend: pk.friend, delta: pool.entryFee });
      });
    } else {
      const share = Math.floor(payout / winners.length);
      winners.forEach((pk) => {
        deltas[pk.friend] = (deltas[pk.friend] || 0) + share;
        entries.push({ friend: pk.friend, delta: share });
      });
      setHouseTake((h) => h + rake);
    }

    setBalances((b) => {
      const next = { ...b };
      Object.entries(deltas).forEach(([friend, delta]) => { next[friend] += delta; });
      return next;
    });
    setPools((P) => P.map((p) =>
      p.id === poolId ? { ...p, status: "settled", resultSide: winningSide } : p
    ));

    if (winners.length === 0) {
      log(`"${pool.title}" settled — nobody hit it, entries refunded`, entries);
    } else {
      log(
        `"${pool.title}" settled — ${winningSide} covered, ${winners.length} winner(s) split ${fmt(payout)} (house rake ${fmt(rake)})`,
        entries
      );
    }
  }, [pools, log]);

  // ---- FADE LOGIC ----
  const createFade = useCallback((gameId, side, stake, creator) => {
    if (balances[creator] < stake) {
      flash(`${creator} doesn't have enough points to stake that.`);
      return;
    }

    setBalances((b) => ({ ...b, [creator]: b[creator] - stake }));
    setFades((F) => [
      { id: nextId(), gameId, side, stake, creator, opponent: null, status: "open", resultSide: null },
      ...F,
    ]);
    log(`${creator} opened a fade: ${side} for ${fmt(stake)}`, [{ friend: creator, delta: -stake }]);
  }, [balances, flash, log]);

  const acceptFade = useCallback((fadeId, opponent) => {
    const fade = fades.find((f) => f.id === fadeId);
    if (!fade || fade.status !== "open" || fade.creator === opponent) return;
    if (balances[opponent] < fade.stake) {
      flash(`${opponent} doesn't have enough points.`);
      return;
    }

    setBalances((b) => ({ ...b, [opponent]: b[opponent] - fade.stake }));
    setFades((F) => F.map((f) =>
      f.id === fadeId ? { ...f, opponent, status: "matched" } : f
    ));
    log(`${opponent} took the other side of ${fade.creator}'s fade`, [{ friend: opponent, delta: -fade.stake }]);
  }, [fades, balances, flash, log]);

  const settleFade = useCallback((fadeId, winningSide) => {
    const fade = fades.find((f) => f.id === fadeId);
    if (!fade || fade.status !== "matched") return;

    const pot = fade.stake * 2;
    const rake = Math.round(pot * RAKE);
    const payout = pot - rake;
    const winner = winningSide === fade.side ? fade.creator : fade.opponent;

    setBalances((b) => ({ ...b, [winner]: b[winner] + payout }));
    setHouseTake((h) => h + rake);
    setFades((F) => F.map((f) =>
      f.id === fadeId ? { ...f, status: "settled", resultSide: winningSide } : f
    ));
    log(`Fade settled — ${winner} wins ${fmt(payout)} (house rake ${fmt(rake)})`, [{ friend: winner, delta: payout }]);
  }, [fades, log]);

  const value = {
    actingAs, setActingAs,
    balances, houseTake,
    pools, fades, ledger, toast,
    gameById,
    createPool, joinPool, settlePool,
    createFade, acceptFade, settleFade,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
