"use client";
import { useState } from "react";

// Supported languages config
export const LANGUAGES = [
  { code: "English",  label: "English",  flag: "🇬🇧" },
  { code: "Hindi",    label: "हिन्दी",    flag: "🇮🇳" },
  { code: "Bengali",  label: "বাংলা",    flag: "🇧🇩" },
];

// UI text translations for the Navbar itself
const NAV_LABELS: Record<string, { home: string; features: string; dashboard: string; contact: string; cta: string }> = {
  English: { home: "Home", features: "Features", dashboard: "Dashboard", contact: "Contact", cta: "Get Started" },
  Hindi:   { home: "होम", features: "सुविधाएँ", dashboard: "डैशबोर्ड", contact: "संपर्क", cta: "शुरू करें" },
  Bengali: { home: "হোম", features: "বৈশিষ্ট্য", dashboard: "ড্যাশবোর্ড", contact: "যোগাযোগ", cta: "শুরু করুন" },
};

interface Props {
  language: string;
  setLanguage: (lang: string) => void;
}

export default function Navbar({ language, setLanguage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const labels = NAV_LABELS[language] ?? NAV_LABELS["English"];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🩺</span>
          <h1 className="text-2xl font-bold text-blue-600">Smart Health AI</h1>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-semibold">
          <li><a href="#home"      className="hover:text-blue-600 transition">{labels.home}</a></li>
          <li><a href="#features"  className="hover:text-blue-600 transition">{labels.features}</a></li>
          <li><a href="#dashboard" className="hover:text-blue-600 transition">{labels.dashboard}</a></li>
          <li><a href="#contact"   className="hover:text-blue-600 transition">{labels.contact}</a></li>
        </ul>

        {/* Language selector */}
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-blue-300 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            aria-label="Select language"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.label}
              </option>
            ))}
          </select>

          <a
            href="#features"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {labels.cta}
          </a>
        </div>

      </div>
    </nav>
  );
}