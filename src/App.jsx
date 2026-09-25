import React, { useEffect, useRef, useState } from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Ambient from "./components/Ambient.jsx";
import Header from "./components/Header.jsx";
import Nav from "./components/Nav.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PoolsTab from "./components/pools/PoolsTab.jsx";
import CreatePoolModal from "./components/pools/CreatePoolModal.jsx";
import FadesTab from "./components/fades/FadesTab.jsx";
import CreateFadeModal from "./components/fades/CreateFadeModal.jsx";
import LedgerTab from "./components/ledger/LedgerTab.jsx";

// Toasts fire on nearly every action (join, settle, insufficient balance),
// so this has to survive being re-triggered mid-animation — hence a CSS
// transition (retargets smoothly) rather than a keyframe (restarts from
// zero). It also stays mounted a beat after the message clears so it can
// slide back out instead of popping off instantly.
function Toast({ message }) {
  const [display, setDisplay] = useState(null);
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);

  useEffect(() => {
    if (message) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setDisplay(message);
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
      hideTimer.current = setTimeout(() => setDisplay(null), 200);
    }
    return () => clearTimeout(hideTimer.current);
  }, [message]);

  if (!display) return null;
  return (
    <div className={`huddle-toast${visible ? " huddle-toast-visible" : ""}`}>
      {display}
    </div>
  );
}

function Shell() {
  const [tab, setTab] = useState("dashboard");
  const [showCreatePool, setShowCreatePool] = useState(false);
  const [showCreateFade, setShowCreateFade] = useState(false);
  const { pools, fades, toast } = useApp();

  const activePoolCount = pools.filter((p) => p.status === "open").length;
  const activeFadeCount = fades.filter((f) => f.status !== "settled").length;

  return (
    <div style={{
      // Transparent on purpose — the fixed .huddle-ambient layer (behind
      // this, z-index 0) needs to show through. The dark base tone still
      // comes from <body>, so nothing looks unstyled if the ambient layer
      // is ever absent.
      background: "transparent", color: "var(--text)", minHeight: "100dvh",
      maxWidth: 480, margin: "0 auto", position: "relative", zIndex: 1, paddingBottom: 90,
    }}>
      <Header />

      <div style={{ padding: 16 }}>
        {tab === "dashboard" && (
          <Dashboard onGoPools={() => setTab("pools")} onGoFades={() => setTab("fades")} />
        )}
        {tab === "pools" && <PoolsTab onCreate={() => setShowCreatePool(true)} />}
        {tab === "fades" && <FadesTab onCreate={() => setShowCreateFade(true)} />}
        {tab === "ledger" && <LedgerTab />}
      </div>

      <Nav tab={tab} setTab={setTab} poolBadge={activePoolCount} fadeBadge={activeFadeCount} />

      {showCreatePool && <CreatePoolModal onClose={() => setShowCreatePool(false)} />}
      {showCreateFade && <CreateFadeModal onClose={() => setShowCreateFade(false)} />}

      <Toast message={toast} />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Ambient />
      <AppProvider>
        <Shell />
      </AppProvider>
    </>
  );
}
