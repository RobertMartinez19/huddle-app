import React from "react";

export default function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: 14, padding: 16, ...style,
      }}
    >
      {children}
    </div>
  );
}
