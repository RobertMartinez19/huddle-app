import React from "react";

const VARIANTS = {
  primary: {
    bg: "linear-gradient(155deg, var(--amber-bright), var(--amber))",
    fg: "#12200E", border: "1px solid rgba(255,255,255,0.18)",
    shadow: "0 1px 0 rgba(255,255,255,0.25) inset, 0 6px 16px -4px rgba(242,169,59,0.45)",
  },
  ghost: {
    bg: "var(--surface-2)", fg: "var(--text)", border: "1px solid var(--border-bright)",
    shadow: "var(--shadow-sm)",
  },
  danger: {
    bg: "linear-gradient(155deg, #ea7a67, var(--red))", fg: "#fff", border: "1px solid rgba(255,255,255,0.15)",
    shadow: "0 6px 16px -4px rgba(224,96,78,0.4)",
  },
  dim: {
    bg: "var(--surface-2)", fg: "var(--text-dim)", border: "1px solid var(--border)",
    shadow: "none",
  },
};

export default function Button({ children, onClick, variant = "primary", disabled, style, small }) {
  const v = VARIANTS[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: v.bg, color: v.fg, border: v.border,
        padding: small ? "8px 13px" : "11px 18px",
        borderRadius: 12, fontFamily: "Inter, sans-serif",
        fontWeight: 600, fontSize: small ? 13 : 14, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1, display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: 6,
        boxShadow: disabled ? "none" : v.shadow,
        transition: "transform 0.12s cubic-bezier(0.2,0.8,0.2,1), filter 0.15s ease, box-shadow 0.15s ease",
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = "brightness(1.08)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "scale(1)"; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.96)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
}
