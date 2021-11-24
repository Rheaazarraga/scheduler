import React, { useState } from "react";

// --------------- useVisualMode --------------- //

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(history => [...history, newMode])

  };

  const back = () => {
    if (history.length <= 1) {
      return;
    }

    const newHistory = [...history];
    newHistory.pop()
    const prevMode = newHistory[newHistory.length-1];
    setMode(prevMode);

    setHistory(newHistory);
}
  return { mode, transition, back };
}