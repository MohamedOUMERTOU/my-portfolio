import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { techStackDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

function Technologies() {
  const { t, tr } = useLanguage();
  const pageRef = useRef();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scope selectors to this page (gsap 3.10 has no gsap.context)
    const q = gsap.utils.selector(pageRef);
    const tl = gsap.timeline({ defaults: { ease: "Power3.easeOut" } });

    tl.from(q(".tech-title"), { x: "-100%", opacity: 0, duration: 1.5, delay: 0.3 }).from(
      q(".tech-subtitle"),
      { x: "-100%", opacity: 0, duration: 1.5 },
      "<0.2"
    );

    q(".tech-category").forEach((section, i) => {
      const start = 0.6 + i * 0.25;
      tl.from(
        section.querySelector(".tech-category-title"),
        { x: "-50%", opacity: 0, duration: 1.2 },
        start
      ).from(
        section.querySelectorAll(".tech-item"),
        { y: 40, scale: 0.6, opacity: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.7)" },
        start + 0.2
      );
    });

    return () => {
      tl.kill();
      gsap.set(q(".tech-title, .tech-subtitle, .tech-category-title, .tech-item"), {
        clearProps: "all",
      });
    };
  }, []);

  return (
    <main ref={pageRef} className="container mx-auto max-width pt-10 pb-20 overflow-hidden">
      <section>
        <h1 className="section-title tech-title">{t("tech.title")}</h1>
        <p className="text-content py-2 lg:max-w-3xl tech-subtitle">{t("tech.subtitle")}</p>
      </section>
      {React.Children.toArray(
        techStackDetails.map(({ category, items }) => (
          <section className="tech-category">
            <h2 className="tech-category-title text-xl pt-10 text-dark-heading dark:text-light-heading md:text-2xl font-bold">
              {tr(category)}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 items-start gap-6 pt-6">
              {React.Children.toArray(
                items.map(({ name, img }) => (
                  <div className="tech-item">
                    <div className="group flex flex-col items-center text-center rounded-2xl p-3 transition duration-300 hover:-translate-y-2 hover:bg-white hover:shadow-lg hover:shadow-slate-200 dark:hover:bg-dark-card dark:hover:shadow-black/40">
                      <img
                        className="h-12 w-12 md:h-16 md:w-16 transition duration-300 group-hover:scale-110 group-hover:rotate-6"
                        src={img}
                        title={name}
                        alt={name}
                        loading="lazy"
                        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                      />
                      <span className="text-content text-xs md:text-sm pt-2 transition group-hover:text-sky-500">
                        {name}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        ))
      )}
    </main>
  );
}

export default Technologies;
