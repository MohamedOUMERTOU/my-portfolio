import React from "react";

function Footer() {
  return (
    <footer className="container mx-auto py-2 fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900">
      <p className="text-xs text-center text-slate-700 dark:text-slate-200 w-full">
        Designed and Coded by{" "}
        <span className="font-medium">Oumertou Mohamed</span> with
        <span className="text-sky-400 font-medium">play</span> &{" "}
        <span className="text-sky-400 font-medium">Coffee</span>
      </p>
    </footer>
  );
}

export default Footer;
