import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { logos, socialMediaUrl, personalDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

const navItems = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/technologies", key: "technologies" },
  { to: "/projects", key: "projects" },
  { to: "/contact", key: "contact" },
];

const linkClass = ({ isActive }) =>
  `block rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-gradient text-white shadow-md shadow-purple-500/30"
      : "text-dark-content dark:text-light-content hover:text-dark-heading dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-card"
  }`;

const iconButton =
  "flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-dark-heading dark:text-light-heading transition hover:-translate-y-0.5 hover:border-transparent hover:bg-gradient hover:text-white";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { linkdein, github } = socialMediaUrl;
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const langSwitch = (
    <button
      type="button"
      onClick={toggleLang}
      title={t("switchTo")}
      aria-label={t("switchTo")}
      className="flex items-center rounded-full border border-slate-200 dark:border-slate-700 p-1 text-xs font-semibold"
    >
      {["fr", "en"].map((code) => (
        <span
          key={code}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            lang === code ? "bg-gradient text-white" : "text-dark-content dark:text-light-content"
          }`}
        >
          {code}
        </span>
      ))}
    </button>
  );

  const socials = (
    <>
      <a href={linkdein} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className={iconButton}>
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>
      </a>
      <a href={github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className={iconButton}>
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22l-.02 3.29c0 .32.22.7.83.57A12 12 0 0 0 12 .3" />
        </svg>
      </a>
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-slate-50/80 dark:bg-dark-mode/80 backdrop-blur-md shadow-sm shadow-slate-200/60 dark:shadow-black/40 border-b border-slate-200/70 dark:border-slate-800"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto max-width flex items-center justify-between py-3 md:py-4">
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-3">
          <img className="w-10 md:w-11" src={logos.logogradient} alt="logo" />
          <span className="font-heading font-bold tracking-tight text-gradient text-lg hidden sm:inline">
            {personalDetails.name}
          </span>
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full bg-white/60 dark:bg-dark-card/60 p-1 border border-slate-200/70 dark:border-slate-700/70">
            {navItems.map(({ to, key }) => (
              <li key={key}>
                <NavLink to={to} end={to === "/"} className={linkClass}>
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {socials}
          {langSwitch}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
          aria-expanded={isOpen}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
        >
          <div className="relative h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-dark-heading dark:bg-white transition-all duration-300 ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-dark-heading dark:bg-white transition-all duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-dark-heading dark:bg-white transition-all duration-300 ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
          </div>
        </button>
      </div>

      {/* Mobile navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container mx-auto max-width pb-5">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ to, key }) => (
              <li key={key}>
                <NavLink to={to} end={to === "/"} onClick={closeMenu} className={linkClass}>
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-200 dark:border-slate-700">
            <div className="flex gap-3">{socials}</div>
            {langSwitch}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
