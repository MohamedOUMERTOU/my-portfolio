import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { personalDetails, projectDetails, techStackDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Types each role, pauses, erases it, then moves on to the next one
function useTypewriter(words) {
  const [text, setText] = useState(reducedMotion() ? words[0] : "");

  useEffect(() => {
    if (reducedMotion()) {
      setText(words[0]);
      return undefined;
    }
    let word = 0;
    let len = 0;
    let deleting = false;
    let timer;
    const step = () => {
      const current = words[word];
      len += deleting ? -1 : 1;
      setText(current.slice(0, len));
      let delay = deleting ? 35 : 75;
      if (!deleting && len === current.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && len === 0) {
        deleting = false;
        word = (word + 1) % words.length;
        delay = 350;
      }
      timer = setTimeout(step, delay);
    };
    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

// Floating code tags orbiting the portrait
const chips = [
  { label: "<React />", className: "-left-10 md:-left-16 top-6", delay: "0s" },
  { label: "@SpringBoot", className: "-right-8 md:-right-20 top-1/3", delay: "1.2s" },
  { label: "{ AI · LLM }", className: "-left-4 md:-left-10 bottom-4", delay: "2.4s" },
  { label: "docker compose up", className: "-right-2 md:-right-8 -bottom-6", delay: "0.6s" },
];

function Home() {
  const { name, tagline, roles, yearsOfExperience, img, cv } = personalDetails;
  const { t, tr } = useLanguage();
  const role = useTypewriter(tr(roles));
  const pageRef = useRef();

  const techCount = techStackDetails.reduce((sum, { items }) => sum + items.length, 0);
  const stats = [
    { value: yearsOfExperience, suffix: "+", label: t("home.years") },
    { value: projectDetails.length, suffix: "", label: t("home.projects") },
    { value: techCount, suffix: "+", label: t("home.technologies") },
  ];

  useEffect(() => {
    if (reducedMotion()) return undefined;
    const q = gsap.utils.selector(pageRef);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(q(".hero-reveal"), { y: 40, opacity: 0, duration: 1, stagger: 0.12, delay: 0.3 })
      .from(q(".hero-portrait"), { scale: 0.6, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.2)
      .from(q(".hero-chip"), { scale: 0, opacity: 0, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, 0.9);

    // Count the stats up from zero
    q(".stat-value").forEach((el) => {
      const counter = { v: 0 };
      tl.to(counter, {
        v: Number(el.dataset.value),
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => (el.textContent = Math.round(counter.v)),
      }, 0.8);
    });

    return () => {
      tl.kill();
      gsap.set(q(".hero-reveal, .hero-portrait, .hero-chip"), { clearProps: "all" });
      q(".stat-value").forEach((el) => (el.textContent = el.dataset.value));
    };
  }, []);

  return (
    <main
      ref={pageRef}
      className="container mx-auto max-width min-h-[calc(100vh-5rem)] flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-16 pt-16 md:pt-0 pb-28"
    >
      <div className="max-w-2xl">
        <span className="hero-reveal glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-dark-heading dark:text-light-heading">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {t("home.available")}
        </span>

        <p className="hero-reveal pt-6 font-heading text-lg md:text-2xl font-medium text-dark-content dark:text-light-content">
          {t("home.greeting")}
        </p>
        <h1 className="hero-reveal font-heading text-5xl md:text-6xl xl:text-7xl leading-[1.05] font-extrabold tracking-tight text-gradient py-2">
          {name}
        </h1>

        <p className="hero-reveal mt-2 font-mono text-base md:text-xl text-dark-heading dark:text-light-heading" aria-label={tr(tagline)}>
          <span className="text-sky-500" aria-hidden="true">&gt; </span>
          <span className="caret" aria-hidden="true">{role}</span>
        </p>

        <p className="hero-reveal text-content pt-5 text-base md:text-lg max-w-xl">{t("home.intro")}</p>

        <div className="hero-reveal flex flex-wrap items-center gap-4 pt-8">
          <a
            href={cv}
            download="CV-OUMERTOU-MOHAMED.pdf"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient px-7 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:shadow-purple-500/50"
          >
            <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 3h2v9.17l3.59-3.58L18 10l-6 6-6-6 1.41-1.41L11 12.17V3ZM5 18h14v2H5v-2Z" />
            </svg>
            {t("home.downloadCv")}
          </a>
          <Link
            to="/projects"
            className="glass group inline-flex items-center gap-2 rounded-xl px-7 py-3 font-semibold text-dark-heading dark:text-light-heading transition hover:-translate-y-0.5"
          >
            {t("home.viewProjects")}
            <span className="transition group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        </div>

        <dl className="hero-reveal grid grid-cols-3 gap-3 md:gap-4 pt-10 max-w-lg">
          {stats.map(({ value, suffix, label }) => (
            <div key={label} className="glass rounded-2xl px-3 py-4 md:px-4 text-center">
              <dt className="sr-only">{label}</dt>
              <dd className="font-heading text-2xl md:text-3xl font-bold text-gradient">
                <span className="stat-value" data-value={value}>{value}</span>
                {suffix}
              </dd>
              <dd className="pt-1 text-[11px] md:text-xs leading-tight text-content" aria-hidden="true">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero-portrait relative md:min-w-fit md:mr-10 lg:mr-16">
        <div className="float-y relative h-52 w-52 md:h-64 md:w-64 xl:h-72 xl:w-72">
          <div
            className="ring-spin absolute -inset-1.5 rounded-full"
            style={{ background: "conic-gradient(from 0deg, #0ea5e9, #a855f7, #db2777, transparent 70%, #0ea5e9)" }}
            aria-hidden="true"
          />
          <div className="absolute -inset-6 rounded-full bg-gradient opacity-30 blur-2xl" aria-hidden="true" />
          <img
            className="relative h-full w-full rounded-full object-cover border-4 border-slate-50 dark:border-dark-mode"
            src={img}
            alt={name}
          />
          {chips.map(({ label, className, delay }) => (
            <span key={label} className={`hero-chip absolute ${className}`}>
              <span
                className="float-y glass block whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-[11px] md:text-xs font-medium text-dark-heading dark:text-light-heading shadow-lg shadow-purple-500/10"
                style={{ animationDelay: delay }}
              >
                {label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
