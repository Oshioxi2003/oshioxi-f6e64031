import { useState } from "react";

const LanguageToggle = () => {
  const [lang, setLang] = useState<"EN" | "VI">("EN");

  return (
    <div className="fixed top-4 right-4 flex rounded-md overflow-hidden border border-border text-xs z-50">
      <button
        onClick={() => setLang("EN")}
        className={`px-3 py-1.5 font-medium transition-colors duration-150 ${
          lang === "EN"
            ? "bg-primary text-primary-foreground"
            : "bg-card text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("VI")}
        className={`px-3 py-1.5 font-medium transition-colors duration-150 ${
          lang === "VI"
            ? "bg-primary text-primary-foreground"
            : "bg-card text-muted-foreground hover:text-foreground"
        }`}
      >
        VI
      </button>
    </div>
  );
};

export default LanguageToggle;
