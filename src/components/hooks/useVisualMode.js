import React, { useState } from "react";

// --------------- useVisualMode --------------- //

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

// --------------- Transition function --------------- //

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    //when replace is true then set the history to reflect that we are replacing the current mode
    replace ? setHistory(prev => [...prev.slice(0, history.length - 1), newMode]) : setHistory(prev => [...prev, newMode]);
  };
// --------------- Back function --------------- //

  const back = () => {
    if (history.length <= 1) {
      return;
    }

    //storing newHistory with a copy of history array
    const newHistory = [...history];
    //using pop method to remove the last element from the array, changing the length to transition back
    newHistory.pop();

    //setting the mode to the updated history, last element in the history array
    const prevMode = newHistory[newHistory.length - 1];
    setMode(prevMode);

    setHistory(newHistory); //setting the history to the array that doesn't have the last element
  }
  return { mode, transition, back };
};