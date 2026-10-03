import React, { useState } from "react";
import { contactDetails, socialMediaUrl } from "../Details";
import { useLanguage } from "../i18n/LanguageContext";

const initialForm = { name: "", email: "", subject: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-dark-mode/70 px-4 py-3 text-dark-heading dark:text-light-heading placeholder-slate-400 dark:placeholder-slate-500 transition focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500";

const labelClass = "block text-sm font-medium text-dark-heading dark:text-light-heading mb-2";

const icons = {
  email: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.4V17h16V7.4l-8 5.6-8-5.6ZM5.4 7l6.6 4.6L18.6 7H5.4Z" />
  ),
  phone: (
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.22 2.23Z" />
  ),
  location: (
    <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
  ),
};

function InfoCard({ icon, title, children }) {
  return (
    <div className="flex items-center gap-4 glass rounded-2xl p-5 shadow-lg shadow-slate-200/60 dark:shadow-black/40 transition hover:-translate-y-1">
      <div className="flex h-12 w-12 min-w-[3rem] items-center justify-center rounded-full bg-gradient">
        <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24" aria-hidden="true">
          {icons[icon]}
        </svg>
      </div>
      <div className="min-w-0">
        <h2 className="text-sm text-content">{title}</h2>
        <div className="font-medium text-dark-heading dark:text-light-heading break-all">{children}</div>
      </div>
    </div>
  );
}

function Contact() {
  const { email, phone, formEndpoint } = contactDetails;
  const { linkdein, github } = socialMediaUrl;
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formEndpoint) {
      const subject = encodeURIComponent(form.subject || `${t("contact.messageFrom")} ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(res.statusText);
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="container mx-auto max-width pt-10 pb-24">
      <section className="text-center">
        <span className="inline-block rounded-full bg-sky-100 dark:bg-dark-card px-4 py-1 text-xs font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400">
          {t("contact.badge")}
        </span>
        <h1 className="pt-4 text-3xl md:text-5xl xl:leading-tight font-bold text-dark-heading dark:text-light-heading">
          {t("contact.titleStart")} <span className="text-gradient">{t("contact.titleEnd")}</span>
        </h1>
        <p className="text-content pt-4 mx-auto max-w-2xl">
          {t("contact.intro")}
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-12">
        <aside className="lg:col-span-2 flex flex-col gap-5">
          <InfoCard icon="email" title={t("contact.email")}>
            <a className="hover:text-sky-500" href={`mailto:${email}`}>
              {email}
            </a>
          </InfoCard>
          <InfoCard icon="phone" title={t("contact.phone")}>
            <a className="hover:text-sky-500" href={`tel:${phone.replace(/\s/g, "")}`}>
              {phone}
            </a>
          </InfoCard>
          <InfoCard icon="location" title={t("contact.location")}>
            {t("contact.locationValue")}
          </InfoCard>

          <div className="rounded-2xl bg-gradient p-[1px]">
            <div className="rounded-2xl bg-white/90 dark:bg-dark-card/90 backdrop-blur-md p-5">
              <h2 className="font-semibold text-dark-heading dark:text-light-heading">{t("contact.findMe")}</h2>
              <div className="flex gap-3 pt-3">
                <a
                  href={linkdein}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm font-medium text-white transition"
                >
                  LinkedIn
                </a>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-lg bg-dark-heading hover:bg-black dark:bg-slate-600 dark:hover:bg-slate-500 px-4 py-2 text-sm font-medium text-white transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/60 dark:shadow-black/40 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className={labelClass}>
                {t("contact.name")}
              </label>
              <input
                id="name"
                className={inputClass}
                type="text"
                name="name"
                placeholder={t("contact.namePlaceholder")}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                {t("contact.email")}
              </label>
              <input
                id="email"
                className={inputClass}
                type="email"
                name="email"
                placeholder={t("contact.emailPlaceholder")}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className={labelClass}>
              {t("contact.subject")}
            </label>
            <input
              id="subject"
              className={inputClass}
              type="text"
              name="subject"
              placeholder={t("contact.subjectPlaceholder")}
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message" className={labelClass}>
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              className={`${inputClass} resize-y`}
              name="message"
              rows="6"
              placeholder={t("contact.messagePlaceholder")}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full md:w-auto rounded-xl bg-gradient px-10 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:opacity-90 hover:shadow-purple-500/50 disabled:opacity-60"
          >
            {status === "sending" ? t("contact.sending") : t("contact.send")}
          </button>
          {status === "success" && (
            <p className="rounded-lg bg-greenbg px-4 py-3 text-green-text">
              {t("contact.success")}
            </p>
          )}
          {status === "error" && (
            <p className="rounded-lg bg-red-100 px-4 py-3 text-red-600">
              {t("contact.error")}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Contact;
