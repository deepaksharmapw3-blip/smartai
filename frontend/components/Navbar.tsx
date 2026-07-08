"use client";
import { useState, useEffect } from "react";

export const LANGUAGES = [
  { code: "English", label: "English", flag: "🇬🇧" },
  { code: "Hindi",   label: "हिन्दी",   flag: "🇮🇳" },
  { code: "Bengali", label: "বাংলা",   flag: "🇧🇩" },
];

const NAV_LABELS: Record<string, { home: string; features: string; dashboard: string; contact: string; cta: string }> = {
  English: { home: "Home", features: "Features", dashboard: "Dashboard", contact: "Contact", cta: "Check Symptoms" },
  Hindi:   { home: "होम", features: "सुविधाएँ", dashboard: "डैशबोर्ड", contact: "संपर्क", cta: "लक्षण जांचें" },
  Bengali: { home: "হোম", features: "বৈশিষ্ট্য", dashboard: "ড্যাশবোর্ড", contact: "যোগাযোগ", cta: "উপসর্গ পরীক্ষা" },
};

interface Props {
  language: string;
  setLanguage: (lang: string) => void;
}

export default function Navbar({ language, setLanguage }: Props) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const labels = NAV_LABELS[language] ?? NAV_LABELS["English"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#home",             label: labels.home },
    { href: "#features",         label: labels.features },
    { href: "#dashboard",        label: labels.dashboard },
    { href: "#symptom-checker",  label: "AI Checker" },
    { href: "#contact",          label: labels.contact },
  ];

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <span className="text-lg">🩺</span>
          </div>
          <div>
            <span className="text-xl font-bold text-blue-600">Smart</span>
            <span className="text-xl font-bold text-cyan-500">Health</span>
            <span className="text-xl font-bold text-gray-700"> AI</span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden lg:flex gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm text-gray-700 bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer transition"
              aria-label="Select language"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▾</span>
          </div>

          {/* CTA button */}
          <a
            href="#symptom-checker"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl hover:opacity-90 transition font-semibold text-sm shadow-md hover:shadow-lg"
          >
            <span>✦</span> {labels.cta}
          </a>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-gray-700 transition-all mb-1 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all mb-1 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#symptom-checker"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-xl font-semibold"
          >
            {labels.cta}
          </a>
        </div>
      )}
    </nav>
  );
}
