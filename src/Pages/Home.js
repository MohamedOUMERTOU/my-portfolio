import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { personalDetails } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

function Home() {
  const { name, tagline, img, cv } = personalDetails;
  const { t, tr } = useLanguage();
  const h11 = useRef();
  const h12 = useRef();
  const h13 = useRef();
  const myimageref = useRef();
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(
      h11.current,
      {
        x: "-100%",
        delay: 0.8,
        opacity: 0,
        duration: 2,
        ease: "Power3.easeOut",
      },
      "<"
    )
      .from(
        h12.current,
        {
          x: "-100%",
          delay: 0.5,
          opacity: 0,
          duration: 2,
          ease: "Power3.easeOut",
        },
        "<"
      )
      .from(
        h13.current,
        {
          x: "-100%",
          delay: 0.1,
          opacity: 0,
          duration: 2,
          ease: "Power3.easeOut",
        },
        "<"
      )
      .from(
        myimageref.current,
        {
          x: "200%",
          delay: 0.5,
          opacity: 0,
          duration: 2,
          ease: "Power3.easeOut",
        },
        "<"
      );
  }, []);

  return (
    <main className="container mx-auto max-width section md:flex justify-between items-center">
      <div>
        <h1
          ref={h11}
          className="font-heading text-xl md:text-2xl xl:text-3xl font-semibold text-dark-heading dark:text-light-heading"
        >
          {t("home.greeting")}<br></br>{t("home.myNameIs")}<br></br>
        </h1>
        <h1
          ref={h12}
          className="font-heading text-4xl md:text-6xl xl:text-7xl leading-tight md:leading-tight xl:leading-tight font-extrabold tracking-tight bg-clip-text bg-gradient text-transparent py-1"
        >
          {name}
        </h1>
        <h2
          ref={h13}
          className="font-heading text-lg md:text-2xl xl:text-3xl font-medium text-dark-content dark:text-light-content"
        >
          {tr(tagline)}
        </h2>
      </div>
      <div
        ref={myimageref}
        className="mt-10 md:mt-0 flex flex-col items-center gap-6 md:min-w-fit md:pl-10"
      >
        <img
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-sky-400 shadow-lg"
          src={img}
          alt="Oumertou Mohamed"
        />
        <a
          href={cv}
          download="CV-OUMERTOU-MOHAMED.pdf"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-purple-500/50"
        >
          <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 3h2v9.17l3.59-3.58L18 10l-6 6-6-6 1.41-1.41L11 12.17V3ZM5 18h14v2H5v-2Z" />
          </svg>
          {t("home.downloadCv")}
        </a>
      </div>

      {/* <div className="mt-5 md:mt-0">
        <img ref={myimageref} className="w-1/2 md:ml-auto" src={img} alt="Pavan MG" />
      </div> */}
    </main>
  );
}

export default Home;
