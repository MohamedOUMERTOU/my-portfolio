import React from "react";
import Project from "../Components/Project";
import { projectDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

function Projects() {
  const { t } = useLanguage();
  return (
    <main className="container mx-auto max-width pt-10 pb-24">
      <section>
        <h1 className="section-title">{t("projects.title")}</h1>
        <p className="text-content pt-3 lg:max-w-2xl">{t("projects.subtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          {projectDetails.map(({ title, image, description, techstack, previewLink, githubLink }, i) => (
            <Project
              key={title.en ?? title}
              index={i}
              title={title}
              image={image}
              description={description}
              techstack={techstack}
              previewLink={previewLink}
              githubLink={githubLink}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;
