import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="container mx-auto py-2 fixed bottom-0 left-0 right-0 bg-slate-50/80 dark:bg-dark-mode/80 backdrop-blur border-t border-slate-200 dark:border-slate-800">
      <p className="text-xs text-center text-slate-700 dark:text-slate-200 w-full">
        {t("footer.designed")} <span className="font-medium">Oumertou Mohamed</span>{" "}
        {t("footer.with")} <span className="text-sky-400 font-medium">{t("footer.play")}</span>{" "}
        {t("footer.and")} <span className="text-sky-400 font-medium">{t("footer.coffee")}</span>
      </p>
    </footer>
  );
}

export default Footer;
