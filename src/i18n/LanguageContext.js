import React, { createContext, useState, useContext, useEffect } from "react";
import translations from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get saved language from localStorage, default to 'id' (Indonesia)
    const savedLang = localStorage.getItem("language");
    return savedLang || "id";
  });

  useEffect(() => {
    // Save language to localStorage whenever it changes
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  const changeLanguage = (lang) => {
    if (lang === "id" || lang === "en") {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        t,
        toggleLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
