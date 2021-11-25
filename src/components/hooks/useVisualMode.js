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

    //storing newHistory with a copy of history array
    const newHistory = [...history];
    //using pop method to remove the last element from the array, changing the length and transition back
    newHistory.pop();

    //accessing the last index of newHistory and storing in prevMode
    const prevMode = newHistory[newHistory.length-1];
    setMode(prevMode);

    setHistory(newHistory);
}
  return { mode, transition, back };
};