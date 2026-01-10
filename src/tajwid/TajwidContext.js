import React, { createContext, useContext, useState, useEffect } from "react";

const TajwidContext = createContext();

export const TajwidProvider = ({ children }) => {
  const [tajwidEnabled, setTajwidEnabled] = useState(() => {
    const saved = localStorage.getItem("tajwid_enabled");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("tajwid_enabled", JSON.stringify(tajwidEnabled));
  }, [tajwidEnabled]);

  const toggleTajwid = () => {
    setTajwidEnabled((prev) => !prev);
  };

  return (
    <TajwidContext.Provider value={{ tajwidEnabled, toggleTajwid, setTajwidEnabled }}>
      {children}
    </TajwidContext.Provider>
  );
};

export const useTajwid = () => {
  const context = useContext(TajwidContext);
  if (!context) {
    throw new Error("useTajwid must be used within a TajwidProvider");
  }
  return context;
};

export default TajwidContext;
