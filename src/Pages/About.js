import React from "react";
import Work from "../Components/Work";
import { personalDetails, workDetails, eduDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

function About() {
  const { t, tr } = useLanguage();
  return (
    <main className="container mx-auto max-width pt-10 pb-20 ">
      <section>
        <h1 className="section-title">
          {t("about.title")}
        </h1>
        <div className="mt-8 rounded-2xl bg-gradient p-[1px] shadow-lg shadow-purple-500/10">
          <div className="rounded-2xl bg-white dark:bg-dark-card p-6 md:p-8">
            <p className="text-content text-base md:text-lg">{tr(personalDetails.about)}</p>
          </div>
        </div>
      </section>
      <section>
        <h1 className="section-title pt-14">
          {t("about.work")}
        </h1>
        <div className="grid grid-cols-1 gap-6 pt-8">
        {React.Children.toArray(
          workDetails.map(({ Position, Company, Location, Type, Duration, Description }) => (
            <Work
              position={Position}
              company={Company}
              location={Location}
              type={Type}
              duration={Duration}
              description={Description}
            />
          ))
        )}
        </div>
      </section>
      <section>
        <h1 className="section-title pt-14">
          {t("about.education")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {React.Children.toArray(
          eduDetails.map(({ Position, Company, Location, Type, Duration }) => (
            <Work
              position={Position}
              company={Company}
              location={Location}
              type={Type}
              duration={Duration}
            />
          ))
        )}
        </div>
      </section>
    </main>
  );
}

export default About;
