import React from "react";
import Work from "../Components/Work";
import TiltCard from "../Components/TiltCard";
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
          <div className="rounded-2xl bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-6 md:p-8">
            <p className="text-content text-base md:text-lg">{tr(personalDetails.about)}</p>
          </div>
        </div>
      </section>
      <section>
        <h1 className="section-title pt-14">
          {t("about.work")}
        </h1>
        {/* Timeline: a glowing rail with a node per position */}
        <ol className="relative mt-8 space-y-8 pl-8 md:pl-12">
          <span
            className="absolute left-2 md:left-4 top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-sky-500 via-purple-500 to-pink-600 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
            aria-hidden="true"
          />
          {React.Children.toArray(
            workDetails.map(({ Position, Company, Location, Type, Duration, Description }) => (
              <li className="relative">
                <span
                  className="absolute -left-[30px] md:-left-[38px] top-7 h-4 w-4 rounded-full bg-gradient ring-4 ring-slate-50 dark:ring-dark-mode shadow-[0_0_16px_rgba(14,165,233,0.8)]"
                  aria-hidden="true"
                />
                <TiltCard max={4}>
                  <Work
                    position={Position}
                    company={Company}
                    location={Location}
                    type={Type}
                    duration={Duration}
                    description={Description}
                  />
                </TiltCard>
              </li>
            ))
          )}
        </ol>
      </section>
      <section>
        <h1 className="section-title pt-14">
          {t("about.education")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {React.Children.toArray(
          eduDetails.map(({ Position, Company, Location, Type, Duration }) => (
            <TiltCard max={8}>
              <Work
                position={Position}
                company={Company}
                location={Location}
                type={Type}
                duration={Duration}
              />
            </TiltCard>
          ))
        )}
        </div>
      </section>
    </main>
  );
}

export default About;
