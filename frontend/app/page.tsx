"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import SymptomChecker from "../components/SymptomChecker";
import Footer from "../components/Footer";
import Dashboard from "../components/DashBoard";
import MedicineReminder from "../components/MedicineReminder";
import { useState , useEffect } from "react";
import ReportHistory from "../components/ReportHistory";
import HealthStats from "../components/HealthStats";
interface Report {
  id: number;
  symptoms: string;
  result: string;
}

export default function Home() {
  interface Medicine {
    id: number;
    name: string;
    time: string;
}

  const [medicineList, setMedicineList] = useState<Medicine[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    console.log("Reports updated:", reports);
  }, [reports]);
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
      <Navbar />
      <Hero />

      <section id="features"
       className="max-w-7xl mx-auto px-8 py-16">
        <FeatureCard
          icon="🩺"
          title="AI Diagnosis"
          description="Testing Feature Card"
        />
      </section>

      <SymptomChecker reports={reports} setReports={setReports} />
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