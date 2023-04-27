import { useState } from "react";


export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    setHistory(prev => {
      if (replace) {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      } else {
        return [...prev, newMode];
      }
    });
  };

  const back = () => {
    if (history.length > 1) {

      setMode(history[history.length - 2]);
      setHistory(prev => prev.slice(0, -1));

    }
  };

  return {
    mode,
    transition,
    back
  };

};