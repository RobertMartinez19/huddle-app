import React from "react";
import { X } from "lucide-react";

export const selectStyle = {
  width: "100%", background: "var(--surface-2)", color: "var(--text)",
  border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", fontSize: 13,
  outline: "none", transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  appearance: "none", WebkitAppearance: "none",
  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2393A99C' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center",
};
export const inputStyle = { ...selectStyle, backgroundImage: "none" };

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 7, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 700 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default function ModalShell({ title, onClose, children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(6,10,8,0.72)", zIndex: 100,
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      animation: "fadeIn 0.15s ease-out",
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(175deg, var(--surface-2), var(--surface))",
          borderTop: "1px solid var(--border-bright)",
          borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)",
          borderRadius: "20px 20px 0 0", padding: "22px 20px 24px", width: "100%", maxWidth: 480,
          animation: "floatUp 0.22s cubic-bezier(0.2,0.8,0.2,1)",
          boxShadow: "0 -20px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{
          width: 36, height: 4, borderRadius: 999, background: "var(--border-bright)",
          margin: "-8px auto 16px",
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: "Oswald", fontWeight: 600, fontSize: 18, letterSpacing: 0.2 }}>{title}</div>
          <button onClick={onClose} style={{
            background: "var(--surface-3)", border: "1px solid var(--border-bright)", borderRadius: 999,
            padding: 7, cursor: "pointer", display: "flex", lineHeight: 0,
          }}>
            <X size={15} color="var(--text-dim)" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
