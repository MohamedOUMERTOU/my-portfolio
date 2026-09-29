import React, { createContext, useContext, useEffect, useState } from "react";
import translations from "./translations";

const LANGUAGES = ["en", "fr"];
const STORAGE_KEY = "portfolio-lang";

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    // localStorage unavailable: fall back to the browser language
  }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLang = () => setLang(lang === "en" ? "fr" : "en");

  // t("contact.send") -> UI text for the current language
  const t = (key) =>
    key.split(".").reduce((obj, part) => obj?.[part], translations[lang]) ?? key;

  // tr({ en, fr }) -> content value for the current language (plain values pass through)
  const tr = (value) =>
    value && typeof value === "object" && !Array.isArray(value) && "en" in value
      ? value[lang] ?? value.en
      : value;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, tr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
