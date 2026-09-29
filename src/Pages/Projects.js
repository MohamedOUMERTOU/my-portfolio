import React from "react";
import Project from "../Components/Project";
import { projectDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

function Projects() {
  const { t } = useLanguage();
  return (
    <main className="container mx-auto max-width pt-10 mb-20">
      <section>
        <h1 className="section-title">
          {t("projects.title")}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {React.Children.toArray(
            projectDetails.map(
              ({ title, image, description, techstack, previewLink, githubLink }) => (
                <Project
                  title={title}
                  image={image}
                  description={description}
                  techstack={techstack}
                  previewLink={previewLink}
                  githubLink={githubLink}
                />
              )
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Projects;
