import React from "react";
import { useTajwid } from "./TajwidContext";
import applyTajwidColors from "../utils/tajwidHelper";

/**
 * TajwidText Component
 * Menampilkan teks Arab dengan pewarnaan tajwid
 */
const TajwidText = ({ text, className, style }) => {
  const { tajwidEnabled } = useTajwid();

  if (!text) return null;

  // Jika tajwid tidak diaktifkan, tampilkan teks biasa
  if (!tajwidEnabled) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  // Apply tajwid colors
  const segments = applyTajwidColors(text);

  return (
    <span className={className} style={style}>
      {segments.map((segment, index) => (
        <span
          key={index}
          style={segment.color ? { color: segment.color, fontWeight: 500 } : undefined}
        >
          {segment.text}
        </span>
      ))}
    </span>
  );
};

export default TajwidText;
