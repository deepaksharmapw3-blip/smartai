"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import SymptomChecker from "../components/SymptomChecker";
import Footer from "../components/Footer";
import Dashboard from "../components/DashBoard";
import MedicineReminder from "../components/MedicineReminder";
import { useState, useEffect } from "react";
import ReportHistory from "../components/ReportHistory";
import HealthStats from "../components/HealthStats";

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

export default function Home() {
  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  // 🌐 Single source of truth for selected language
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const savedReports = localStorage.getItem("reports");
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  return (
    <>
      {/* Pass language state to Navbar so the selector works app-wide */}
      <Navbar language={language} setLanguage={setLanguage} />
      <Hero language={language} />

      <section id="features" className="max-w-7xl mx-auto px-8 py-16">
        <FeatureCard
          icon="🩺"
          title="AI Diagnosis"
          description="Testing Feature Card"
        />
      </section>

      {/* Pass language down so SymptomChecker sends it to the backend */}
      <SymptomChecker
        reports={reports}
        setReports={setReports}
        language={language}
      />
      <Dashboard medicineCount={medicineList.length} />
      <MedicineReminder
        list={medicineList}
        setList={setMedicineList}
      />
      <HealthStats
        reports={reports.length}
        medicines={medicineList.length}
      />
      <ReportHistory reports={reports} setReports={setReports} />
      <Footer />
      
    </>
  );
}