"use client";

import Navbar         from "../components/Navbar";
import Hero           from "../components/Hero";
import FeatureCard    from "../components/FeatureCard";
import SymptomChecker from "../components/SymptomChecker";
import Dashboard      from "../components/DashBoard";
import MedicineReminder from "../components/MedicineReminder";
import HealthStats    from "../components/HealthStats";
import ReportHistory  from "../components/ReportHistory";
import Footer         from "../components/Footer";
import { useState, useEffect } from "react";
import NearestHospital from "../components/NearestHospital";

interface Report {
  id: number;
  symptoms: string;
  result: string;
  date?: string;
}

interface Medicine {
  id: number;
  name: string;
  time: string;
}

const FEATURES = [
  {
    icon: "🩺",
    title: "AI Symptom Analysis",
    description: "Describe your symptoms and get an instant AI-powered diagnosis with treatment suggestions and emergency level assessment.",
    color: "blue",
  },
  {
    icon: "💊",
    title: "Medicine Reminders",
    description: "Set up daily medicine reminders and never miss a dose. Your schedule is saved locally and persists across sessions.",
    color: "purple",
  },
  {
    icon: "📋",
    title: "Health Report History",
    description: "Every AI analysis is stored in your personal history. Search, review, and download reports as PDF at any time.",
    color: "green",
  },
  {
    icon: "🌐",
    title: "Multilingual Support",
    description: "Get health guidance in English, Hindi, or Bengali. Switch languages anytime — the AI responds in your chosen language.",
    color: "red",
  },
];

export default function Home() {
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [reports, setReports]           = useState<Report[]>([]);
  const [language, setLanguage]         = useState("English");

  useEffect(() => {
    const savedReports = localStorage.getItem("reports");
    if (savedReports) setReports(JSON.parse(savedReports));
  }, []);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  return (
    <>
      <Navbar language={language} setLanguage={setLanguage} />
      <Hero language={language} />

      {/* Features section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">
              Everything You Need
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A complete AI-powered health toolkit designed to help you make informed decisions about your wellbeing.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} color={f.color} />
            ))}
          </div>
        </div>
      </section>

      <SymptomChecker reports={reports} setReports={setReports} language={language} />

      <Dashboard
        medicineCount={medicineList.length}
        reportCount={reports.length}
        reminderCount={medicineList.length}
      />

      <MedicineReminder list={medicineList} setList={setMedicineList} />

      <HealthStats reports={reports.length} medicines={medicineList.length} />

      <ReportHistory reports={reports} setReports={setReports} />

      <NearestHospital />

      <Footer />
    </>
  );
}
