// Enter all your detials in this file
// Logo images
import logogradient from "./assets/logo.svg";
import logo from "./assets/logo2.svg";
// Profile Image
import profile from "./assets/profile.jpg";
// Project Images
import erpImage from "./assets/projects/erp.svg";
import ocrImage from "./assets/projects/ocr.svg";
import chatbotImage from "./assets/projects/chatbot.svg";
import gedImage from "./assets/projects/ged.svg";

// Devicon CDN for tech stack icons
const icon = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;

// Logos
export const logos = {
  logogradient: logogradient,
  logo: logo,
};

// Enter your Personal Details here
// Texts written as { en, fr } are translated automatically by the language switch
export const personalDetails = {
  name: "OUMERTOU Mohamed",
  tagline: {
    en: "Full Stack Developer & AI Engineer",
    fr: "Développeur Full Stack & Ingénieur IA",
  },
  img: profile,
  // CV file placed in the public folder
  cv: `${process.env.PUBLIC_URL}/CV-OUMERTOU-MOHAMED.pdf`,
  about: {
    en: `Full Stack Developer with more than 4 years of experience in JavaScript (React.js, Node.js),
Java (Spring Boot) and Python (Django). Hands-on experience with Docker, Nginx and MinIO, relational
databases (PostgreSQL, Oracle PL/SQL) and automated testing (Playwright). Interested in applied AI:
AI agents, local LLMs (Ollama) and automation with n8n.`,
    fr: `Développeur Full Stack avec plus de 4 ans d'expérience en JavaScript (React.js, Node.js),
Java (Spring Boot) et Python (Django). Pratique concrète de Docker, Nginx et MinIO, de bases de données
relationnelles (PostgreSQL, Oracle PL/SQL) et de tests automatisés (Playwright). Intéressé par l'IA
appliquée : agents IA, LLM locaux (Ollama), automatisation avec n8n.`,
  },
};

// Enter your Social Media URLs here
export const socialMediaUrl = {
  linkdein: "https://www.linkedin.com/in/oumertou-mohamed/",
  github: "https://github.com/MohamedOUMERTOU",
};

// Enter your Work Experience here
export const workDetails = [
  {
    Position: { en: "Development & AI Engineer", fr: "Ingénieur Développement & IA" },
    Company: "ORSYS",
    Location: "Rabat",
    Type: { en: "Full Time", fr: "Temps plein" },
    Duration: { en: "2023 - Present", fr: "2023 - Aujourd'hui" },
    Description: {
      en: [
        "Built modern, responsive web interfaces with React.js, TypeScript and Angular, using reusable components (Ant Design, Radix UI, Tailwind CSS).",
        "Managed global state with Context API and implemented internationalization (i18n) for 2 languages.",
        "Developed backend services and REST APIs with Java / Spring Boot for an insurance management ERP, and with Python / Django for business applications.",
        "Designed and administered Oracle, PostgreSQL and MySQL databases; wrote PL/SQL stored procedures, functions, triggers and packages.",
        "Automated tests with Cucumber and Playwright; code quality analysis with SonarQube.",
        "Built a local OCR pipeline with AI vision models (Ollama — Qwen2.5-VL, Llama 3.2 Vision).",
      ],
      fr: [
        "Conception d'interfaces web modernes et responsives avec React.js, TypeScript et Angular, à base de composants réutilisables (Ant Design, Radix UI, Tailwind CSS).",
        "Gestion de l'état global avec Context API et mise en place de l'internationalisation (i18n) pour 2 langues.",
        "Développement de services backend et d'API REST avec Java / Spring Boot pour un ERP de gestion des assurances, et avec Python / Django pour des applications métier.",
        "Conception et administration de bases Oracle, PostgreSQL et MySQL ; procédures stockées, fonctions, triggers et packages PL/SQL.",
        "Tests automatisés avec Cucumber et Playwright ; analyse de qualité du code avec SonarQube.",
        "Pipeline OCR local avec des modèles vision IA (Ollama — Qwen2.5-VL, Llama 3.2 Vision).",
      ],
    },
  },
  {
    Position: { en: "Development Engineer", fr: "Ingénieur Développement" },
    Company: "Monark IT",
    Location: "Marrakech",
    Type: { en: "Full Time", fr: "Temps plein" },
    Duration: "2022 - 2023",
    Description: {
      en: [
        "Developed a Python/Django application integrating intelligent chatbots with Rasa (NLU/NLP) for intent detection and entity extraction.",
        "Designed dynamic conversational flows with advanced dialogue management and custom actions.",
      ],
      fr: [
        "Développement d'une application Python/Django intégrant des chatbots intelligents avec Rasa (NLU/NLP) pour la détection des intentions et l'extraction d'entités.",
        "Conception de flux conversationnels dynamiques avec gestion avancée des dialogues et intégration d'actions personnalisées.",
      ],
    },
  },
];

// Enter your Education Details here
export const eduDetails = [
  {
    Position: {
      en: "Master in Big Data Analytics & Smart Systems",
      fr: "Master Big Data Analytics & Smart Systems",
    },
    Company: "USMBA",
    Location: "Fès",
    Type: { en: "Master's Degree", fr: "Master" },
    Duration: "2022",
  },
  {
    Position: {
      en: "Bachelor in Mathematical Sciences, Computer Science & Applications",
      fr: "Licence Sciences Mathématiques, Informatique et Applications",
    },
    Company: { en: "Ibn Zohr University", fr: "Université Ibn Zohr" },
    Location: "Ouarzazate",
    Type: { en: "Bachelor's Degree", fr: "Licence" },
    Duration: "2019",
  },
];

// Tech Stack and Tools, grouped by category
export const techStackDetails = [
  {
    category: "Backend",
    items: [
      { name: "Java", img: icon("java") },
      { name: "Spring Boot", img: icon("spring") },
      { name: "Python", img: icon("python") },
      { name: "Django", img: icon("django", "plain") },
      { name: "FastAPI", img: icon("fastapi") },
      { name: "Node.js", img: icon("nodejs") },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", img: icon("react") },
      { name: "TypeScript", img: icon("typescript") },
      { name: "Angular", img: icon("angular") },
      { name: "Tailwind CSS", img: icon("tailwindcss") },
      { name: "Ant Design", img: icon("antdesign") },
      { name: "Material UI", img: icon("materialui") },
    ],
  },
  {
    category: { en: "Databases", fr: "Bases de données" },
    items: [
      { name: "Oracle", img: icon("oracle") },
      { name: "PostgreSQL", img: icon("postgresql") },
      { name: "MySQL", img: icon("mysql") },
    ],
  },
  {
    category: { en: "Testing & Quality", fr: "Tests & Qualité" },
    items: [
      { name: "Playwright", img: icon("playwright") },
      { name: "Cucumber", img: icon("cucumber", "plain") },
      { name: "SonarQube", img: icon("sonarqube") },
    ],
  },
  {
    category: { en: "DevOps & Tools", fr: "DevOps & Outils" },
    items: [
      { name: "Docker", img: icon("docker") },
      { name: "Nginx", img: icon("nginx") },
      { name: "Git", img: icon("git") },
      { name: "GitHub", img: icon("github") },
      { name: "GitLab", img: icon("gitlab") },
      { name: "Jira", img: icon("jira") },
    ],
  },
];

// Enter your Project Details here (image, previewLink and githubLink are optional)
export const projectDetails = [
  {
    title: {
      en: "Electronic Document Management (EDM)",
      fr: "Gestion Électronique des Documents (GED)",
    },
    image: gedImage,
    description: {
      en: `Web platform to digitize, store, organize and search business documents: folder tree,
document versioning, metadata and full-text search, validation workflow, and user roles and
access rights, with files kept in object storage.`,
      fr: `Plateforme web pour numériser, stocker, classer et rechercher les documents métier :
arborescence de dossiers, versionnage des documents, métadonnées et recherche plein texte,
circuit de validation, gestion des rôles et droits d'accès, avec stockage objet des fichiers.`,
    },
    techstack: "React, Spring Boot, PostgreSQL, MinIO, Docker, Nginx",
  },
  {
    title: { en: "Insurance Management ERP", fr: "ERP de gestion des assurances" },
    image: erpImage,
    description: {
      en: `Backend services and REST APIs for an insurance ERP: modular architecture, data access
with Spring Data JPA / Hibernate, validation, exception handling and standardized HTTP responses,
backed by Oracle PL/SQL.`,
      fr: `Services backend et API REST pour un ERP d'assurances : architecture modulaire, accès aux
données via Spring Data JPA / Hibernate, validation, gestion des exceptions et réponses HTTP
standardisées, avec Oracle PL/SQL.`,
    },
    techstack: "Java, Spring Boot, Oracle, PL/SQL, React, Angular",
  },
  {
    title: { en: "Local AI OCR Pipeline", fr: "Pipeline OCR IA local" },
    image: ocrImage,
    description: {
      en: `Document extraction pipeline running fully locally with vision models. Flow: file → base64
→ prompt → API → structured JSON output.`,
      fr: `Pipeline d'extraction de documents exécuté entièrement en local avec des modèles vision.
Flux : fichier → base64 → prompt → API → sortie JSON structurée.`,
    },
    techstack: "Python, Ollama, Qwen2.5-VL, Llama 3.2 Vision",
  },
  {
    title: { en: "Intelligent Chatbot Platform", fr: "Plateforme de chatbots intelligents" },
    image: chatbotImage,
    description: {
      en: `Django application integrating Rasa chatbots for intent detection and entity extraction,
with dynamic conversational flows and custom actions.`,
      fr: `Application Django intégrant des chatbots Rasa pour la détection des intentions et
l'extraction d'entités, avec des flux conversationnels dynamiques et des actions personnalisées.`,
    },
    techstack: "Python, Django, Rasa, NLU/NLP",
  },
];

// Enter your Contact Details here
export const contactDetails = {
  email: "med.oumertou@gmail.com",
  phone: "+212 6 38 54 85 81",
  // Optional: create a free form at https://formspree.io and paste its endpoint here
  // (e.g. "https://formspree.io/f/xxxxxxx") to receive messages directly.
  // When empty, the form opens the visitor's email client instead.
  formEndpoint: "",
};
