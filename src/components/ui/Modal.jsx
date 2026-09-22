import React from "react";
import { X } from "lucide-react";

export const selectStyle = {
  width: "100%", background: "var(--surface-2)", color: "var(--text)",
  border: "1px solid var(--border)", borderRadius: 8, padding: "9px 10px", fontSize: 13,
};
export const inputStyle = { ...selectStyle };

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default function ModalShell({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 100,
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)", borderTop: "1px solid var(--border)",
          borderRadius: "18px 18px 0 0", padding: 20, width: "100%", maxWidth: 480,
          animation: "floatUp 0.2s ease-out",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 17 }}>{title}</div>
          <button onClick={onClose} style={{ background: "var(--surface-2)", border: "none", borderRadius: 999, padding: 6, cursor: "pointer" }}>
            <X size={16} color="var(--text-dim)" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
