import React, { useState } from 'react';

const useHistory = () => {
  const [history, setHistory] = useState([]);

  const push = (component) => {
    setHistory((prevHistory) => [...prevHistory, component]);
  };

  const pop = () => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory.pop();
      return newHistory;
    });
  };

  const goBack = () => {
    pop();
  };

  const getCurrentComponent = () => {
    return history.length > 0 ? history[history.length - 1] : null;
  };

  return {
    push,
    pop,
    goBack,
    getCurrentComponent,
  };
};

export default useHistory;
