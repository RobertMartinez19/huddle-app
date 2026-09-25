import React from "react";

// `enter` opts a card into the mount-in animation (used for list items that
// actually get added/removed — pool cards, fade cards, ledger entries).
// `delay` staggers a group's entrance (30-80ms/item) without needing a
// second wrapper element.
export default function Card({ children, style, onClick, accent, interactive, enter, delay = 0 }) {
  const isInteractive = interactive ?? !!onClick;
  return (
    <div
      onClick={onClick}
      className={[isInteractive && "huddle-card-hover", enter && "huddle-card-in"].filter(Boolean).join(" ")}
      style={{
        background: "linear-gradient(165deg, var(--surface), var(--surface) 60%, var(--surface-2))",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 16,
        boxShadow: "var(--shadow-sm)",
        position: "relative",
        cursor: isInteractive ? "pointer" : "default",
        ...(enter && delay ? { animationDelay: `${delay}ms` } : null),
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
