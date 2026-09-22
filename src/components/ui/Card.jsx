import React from "react";

export default function Card({ children, style, onClick, accent, interactive }) {
  const isInteractive = interactive ?? !!onClick;
  return (
    <div
      onClick={onClick}
      className={isInteractive ? "huddle-card-hover" : ""}
      style={{
        background: "linear-gradient(165deg, var(--surface), var(--surface) 60%, var(--surface-2))",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 16,
        boxShadow: "var(--shadow-sm)",
        position: "relative",
        cursor: isInteractive ? "pointer" : "default",
        ...style,
      }}
    >
      {accent && (
        <div style={{
          position: "absolute", top: 0, left: 16, right: 16, height: 2, borderRadius: "0 0 2px 2px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }} />
      )}
      {children}
    </div>
  );
}
