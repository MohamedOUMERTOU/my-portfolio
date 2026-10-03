import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import TechSphere from "../Components/TechSphere";
import { techStackDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

const allTech = techStackDetails.flatMap(({ items }) => items);

function Technologies() {
  const { t, tr } = useLanguage();
  const pageRef = useRef();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scope selectors to this page (gsap 3.10 has no gsap.context)
    const q = gsap.utils.selector(pageRef);
    const tl = gsap.timeline({ defaults: { ease: "Power3.easeOut" } });

    tl.from(q(".tech-title"), { x: "-100%", opacity: 0, duration: 1.5, delay: 0.3 })
      .from(q(".tech-subtitle"), { x: "-100%", opacity: 0, duration: 1.5 }, "<0.2")
      .from(q(".tech-sphere"), { scale: 0.4, opacity: 0, rotate: -20, duration: 1.6, ease: "expo.out" }, 0.2);

    q(".tech-category").forEach((section, i) => {
      const start = 0.8 + i * 0.2;
      tl.from(section, { y: 50, rotateX: -25, opacity: 0, duration: 1, transformPerspective: 800 }, start).from(
        section.querySelectorAll(".tech-item"),
        { y: 30, scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.06, ease: "back.out(1.7)" },
        start + 0.2
      );
    });

    return () => {
      tl.kill();
      gsap.set(q(".tech-title, .tech-subtitle, .tech-sphere, .tech-category, .tech-item"), {
        clearProps: "all",
      });
    };
  }, []);

  return (
    <main ref={pageRef} className="container mx-auto max-width pt-10 pb-24 overflow-hidden">
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
        <div>
          <h1 className="section-title tech-title">{t("tech.title")}</h1>
          <p className="text-content py-3 lg:max-w-xl tech-subtitle">{t("tech.subtitle")}</p>
          <p className="tech-subtitle hidden lg:inline-flex items-center gap-2 pt-2 text-sm font-medium text-sky-600 dark:text-sky-400">
            <span aria-hidden="true">⟲</span> {t("tech.sphereHint")}
          </p>
        </div>
        <div className="tech-sphere">
          <TechSphere items={allTech} label={t("tech.sphereLabel")} />
          <p className="lg:hidden text-center text-sm font-medium text-sky-600 dark:text-sky-400">
            ⟲ {t("tech.sphereHint")}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-12">
        {techStackDetails.map(({ category, items }) => (
          <section key={tr(category)} className="tech-category glass rounded-2xl p-6">
            <h2 className="font-heading text-lg md:text-xl font-bold text-dark-heading dark:text-light-heading">
              <span className="text-gradient">#</span> {tr(category)}
            </h2>
            <div className="grid grid-cols-3 items-start gap-3 pt-5">
              {items.map(({ name, img }) => (
                <div key={name} className="tech-item">
                  <div className="group flex flex-col items-center text-center rounded-xl p-2 transition duration-300 hover:-translate-y-1.5 hover:bg-white/80 dark:hover:bg-white/5">
                    <img
                      className="h-10 w-10 md:h-12 md:w-12 transition duration-300 group-hover:scale-110 group-hover:rotate-6"
                      src={img}
                      title={name}
                      alt={name}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                    />
                    <span className="text-content text-xs pt-2 transition group-hover:text-sky-500">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Technologies;
