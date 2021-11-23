import React, { useState } from "react";

// --------------- useVisualMode --------------- //

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  
  function transition(mode) {
    setMode(mode);
  }

  return { mode, transition };

}
