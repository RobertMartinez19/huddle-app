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

  const adjustBalance = useCallback((name, delta) => {
    setBalances((b) => ({ ...b, [name]: b[name] + delta }));
  }, []);

  // ---- POOL LOGIC ----
  const createPool = useCallback((gameId, title, entryFee, splitRule) => {
    setPools((P) => [
      { id: nextId(), gameId, title, entryFee, splitRule, status: "open", picks: [], resultSide: null },
      ...P,
    ]);
    flash("Pool created — invite the squad to pick a side.");
  }, [flash]);

  const joinPool = useCallback((poolId, friend, side) => {
    setPools((P) => {
      const pool = P.find((p) => p.id === poolId);
      if (!pool || pool.picks.some((pk) => pk.friend === friend)) return P;
      let ok = true;
      setBalances((b) => {
        if (b[friend] < pool.entryFee) { ok = false; return b; }
        return { ...b, [friend]: b[friend] - pool.entryFee };
      });
      if (!ok) { flash(`${friend} doesn't have enough points.`); return P; }
      log(`${friend} joined "${pool.title}" on ${side}`, [{ friend, delta: -pool.entryFee }]);
      return P.map((p) => p.id === poolId ? { ...p, picks: [...p.picks, { friend, side }] } : p);
    });
  }, [flash, log]);

  const settlePool = useCallback((poolId, winningSide) => {
    setPools((P) => {
      const pool = P.find((p) => p.id === poolId);
      if (!pool) return P;
      const potTotal = pool.picks.length * pool.entryFee;
      const rake = Math.round(potTotal * RAKE);
      const payout = potTotal - rake;
      const winners = pool.picks.filter((pk) => pk.side === winningSide);
      const entries = [];

      if (winners.length === 0) {
        pool.picks.forEach((pk) => {
          adjustBalance(pk.friend, pool.entryFee);
          entries.push({ friend: pk.friend, delta: pool.entryFee });
        });
        log(`"${pool.title}" settled — nobody hit it, entries refunded`, entries);
      } else {
        const share = Math.floor(payout / winners.length);
        winners.forEach((pk) => {
          adjustBalance(pk.friend, share);
          entries.push({ friend: pk.friend, delta: share });
        });
        setHouseTake((h) => h + rake);
        log(
          `"${pool.title}" settled — ${winningSide} covered, ${winners.length} winner(s) split ${fmt(payout)} (house rake ${fmt(rake)})`,
          entries
        );
      }
      return P.map((p) => p.id === poolId ? { ...p, status: "settled", resultSide: winningSide } : p);
    });
  }, [adjustBalance, log]);

  // ---- FADE LOGIC ----
  const createFade = useCallback((gameId, side, stake, creator) => {
    let ok = true;
    setBalances((b) => {
      if (b[creator] < stake) { ok = false; return b; }
      return { ...b, [creator]: b[creator] - stake };
    });
    if (!ok) { flash(`${creator} doesn't have enough points to stake that.`); return; }
    setFades((F) => [
      { id: nextId(), gameId, side, stake, creator, opponent: null, status: "open", resultSide: null },
      ...F,
    ]);
    log(`${creator} opened a fade: ${side} for ${fmt(stake)}`, [{ friend: creator, delta: -stake }]);
  }, [flash, log]);

  const acceptFade = useCallback((fadeId, opponent) => {
    setFades((F) => {
      const fade = F.find((f) => f.id === fadeId);
      if (!fade || fade.creator === opponent) return F;
      let ok = true;
      setBalances((b) => {
        if (b[opponent] < fade.stake) { ok = false; return b; }
        return { ...b, [opponent]: b[opponent] - fade.stake };
      });
      if (!ok) { flash(`${opponent} doesn't have enough points.`); return F; }
      log(`${opponent} took the other side of ${fade.creator}'s fade`, [{ friend: opponent, delta: -fade.stake }]);
      return F.map((f) => f.id === fadeId ? { ...f, opponent, status: "matched" } : f);
    });
  }, [flash, log]);

  const settleFade = useCallback((fadeId, winningSide) => {
    setFades((F) => {
      const fade = F.find((f) => f.id === fadeId);
      if (!fade || fade.status !== "matched") return F;
      const pot = fade.stake * 2;
      const rake = Math.round(pot * RAKE);
      const payout = pot - rake;
      const winner = winningSide === fade.side ? fade.creator : fade.opponent;
      adjustBalance(winner, payout);
      setHouseTake((h) => h + rake);
      log(`Fade settled — ${winner} wins ${fmt(payout)} (house rake ${fmt(rake)})`, [{ friend: winner, delta: payout }]);
      return F.map((f) => f.id === fadeId ? { ...f, status: "settled", resultSide: winningSide } : f);
    });
  }, [adjustBalance, log]);

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
