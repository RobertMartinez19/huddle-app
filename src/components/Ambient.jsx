import React from "react";

// Replaces the old three static radial gradients with something that
// actually reads as "designed": three soft aurora blobs drifting on
// independent, very slow loops (46-64s — nowhere near the ~5s/0.2Hz range
// that reads as pulsing), plus a fine grain layer that keeps the flat
// gradients from banding under compression. Purely decorative and behind
// everything (z-index 0, pointer-events none), frozen under
// prefers-reduced-motion.
export default function Ambient() {
  return (
    <div className="huddle-ambient" aria-hidden="true">
      <div className="huddle-blob huddle-blob-1" />
      <div className="huddle-blob huddle-blob-2" />
      <div className="huddle-blob huddle-blob-3" />
      <div className="huddle-grain" />
    </div>
  );
}
