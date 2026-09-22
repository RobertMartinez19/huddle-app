import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import Header from "./components/Header.jsx";
import Nav from "./components/Nav.jsx";
import Dashboard from "./components/Dashboard.jsx";
import PoolsTab from "./components/pools/PoolsTab.jsx";
import CreatePoolModal from "./components/pools/CreatePoolModal.jsx";
import FadesTab from "./components/fades/FadesTab.jsx";
import CreateFadeModal from "./components/fades/CreateFadeModal.jsx";
import LedgerTab from "./components/ledger/LedgerTab.jsx";

function Shell() {
  const [tab, setTab] = useState("dashboard");
  const [showCreatePool, setShowCreatePool] = useState(false);
  const [showCreateFade, setShowCreateFade] = useState(false);
  const { pools, fades, toast } = useApp();

  const activePoolCount = pools.filter((p) => p.status === "open").length;
  const activeFadeCount = fades.filter((f) => f.status !== "settled").length;

  return (
    <div style={{
      background: "var(--bg)", color: "var(--text)", minHeight: "100vh",
      maxWidth: 480, margin: "0 auto", position: "relative", paddingBottom: 90,
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

      {toast && (
        <div style={{
          position: "fixed", bottom: 84, left: "50%", transform: "translateX(-50%)",
          background: "var(--surface-2)", border: "1px solid var(--border)",
          padding: "10px 16px", borderRadius: 10, fontSize: 13, maxWidth: 380,
          textAlign: "center", animation: "floatUp 0.2s ease-out", zIndex: 50,
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
