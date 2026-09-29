import React from "react";
import { techStackDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

function Technologies() {
  const { t, tr } = useLanguage();
  return (
    <main className="container mx-auto max-width pt-10 pb-20 ">
      <section>
        <h1 className="section-title">
          {t("tech.title")}
        </h1>
        <p className="text-content py-2 lg:max-w-3xl">
          {t("tech.subtitle")}
        </p>
      </section>
      {React.Children.toArray(
        techStackDetails.map(({ category, items }) => (
          <section>
            <h2 className="text-xl pt-10 text-dark-heading dark:text-light-heading md:text-2xl font-bold">
              {tr(category)}
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 items-start gap-8 pt-6">
              {React.Children.toArray(
                items.map(({ name, img }) => (
                  <div className="flex flex-col items-center text-center">
                    <img
                      className="h-12 w-12 md:h-16 md:w-16"
                      src={img}
                      title={name}
                      alt={name}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                    />
                    <span className="text-content text-xs md:text-sm pt-2">{name}</span>
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
