import React from "react";

const VARIANTS = {
  primary: { bg: "var(--amber)", fg: "#0B1712", border: "none" },
  ghost: { bg: "transparent", fg: "var(--text)", border: "1px solid var(--border)" },
  danger: { bg: "var(--red)", fg: "#fff", border: "none" },
  dim: { bg: "var(--surface-2)", fg: "var(--text-dim)", border: "1px solid var(--border)" },
};

export default function Button({ children, onClick, variant = "primary", disabled, style, small }) {
  const v = VARIANTS[variant];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: v.bg, color: v.fg, border: v.border,
        padding: small ? "7px 12px" : "10px 16px",
        borderRadius: 10, fontFamily: "Inter, sans-serif",
        fontWeight: 600, fontSize: small ? 13 : 14, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1, display: "inline-flex", alignItems: "center",
        gap: 6, transition: "transform 0.1s, opacity 0.15s", ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {children}
    </button>
  );
}
