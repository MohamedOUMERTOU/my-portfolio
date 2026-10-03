import React from "react";
import TiltCard from "./TiltCard";
import { useLanguage } from "../i18n/LanguageContext";

const linkClass =
  "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-dark-heading dark:text-light-heading border border-slate-200 dark:border-slate-700 transition hover:border-transparent hover:bg-gradient hover:text-white";

function Project({ index, title, image, description, techstack, previewLink, githubLink }) {
  const { t, tr } = useLanguage();
  const number = String(index + 1).padStart(2, "0");
  return (
    <TiltCard className="rounded-2xl shadow-xl shadow-slate-200/60 dark:shadow-black/40">
      {/* glass lives on its own layer: backdrop-filter would flatten the 3D children */}
      <span className="glass absolute inset-0 rounded-2xl" aria-hidden="true" />
      <article className="relative flex h-full flex-col p-4" style={{ transformStyle: "preserve-3d" }}>
        <div className="depth-1 relative overflow-hidden rounded-xl bg-slate-100 dark:bg-dark-mode">
          {image && <img className="w-full" src={image} alt={tr(title)} loading="lazy" />}
          <span className="absolute right-3 top-2 font-heading text-4xl font-extrabold text-white/80 drop-shadow-lg">
            {number}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-1 pt-5" style={{ transformStyle: "preserve-3d" }}>
          <h2 className="depth-2 font-heading text-lg md:text-xl font-semibold text-dark-heading dark:text-light-heading">
            {tr(title)}
          </h2>
          <p className="depth-1 text-content pt-3 text-sm md:text-base">{tr(description)}</p>
          <ul className="depth-2 flex flex-wrap gap-2 pt-5 mt-auto" aria-label={t("projects.techStack")}>
            {techstack.split(",").map((tech) => (
              <li
                key={tech}
                className="rounded-full bg-sky-50 dark:bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300"
              >
                {tech.trim()}
              </li>
            ))}
          </ul>
          {(previewLink || githubLink) && (
            <div className="depth-2 flex gap-3 pt-5">
              {previewLink && (
                <a href={previewLink} target="_blank" rel="noreferrer noopener" className={linkClass}>
                  ↗ {t("projects.livePreview")}
                </a>
              )}
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noreferrer noopener" className={linkClass}>
                  {"</>"} {t("projects.viewCode")}
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </TiltCard>
  );
}

export default Project;
