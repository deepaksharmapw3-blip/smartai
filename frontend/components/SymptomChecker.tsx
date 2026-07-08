"use client";

import { useState } from "react";

interface Report {
  id: number;
  symptoms: string;
  result: string;
  date?: string;
}

interface Props {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
  language: string; // received from page.tsx — no local state needed
}

// UI text translations for this component
const UI_TEXT: Record<string, {
  title: string;
  placeholder: string;
  button: string;
  analyzing: string;
  reportTitle: string;
  errorMsg: string;
  emptyAlert: string;
}> = {
  English: {
    title: "🩺 AI Symptom Checker",
    placeholder: "Example: Fever, headache, cough...",
    button: "Analyze Symptoms",
    analyzing: "Analyzing...",
    reportTitle: "AI Health Report",
    errorMsg: "Something went wrong. Please try again.",
    emptyAlert: "Please enter your symptoms.",
  },
  Hindi: {
    title: "🩺 AI लक्षण परीक्षक",
    placeholder: "उदाहरण: बुखार, सिरदर्द, खांसी...",
    button: "लक्षण विश्लेषण करें",
    analyzing: "विश्लेषण हो रहा है...",
    reportTitle: "AI स्वास्थ्य रिपोर्ट",
    errorMsg: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।",
    emptyAlert: "कृपया अपने लक्षण दर्ज करें।",
  },
  Bengali: {
    title: "🩺 AI উপসর্গ পরীক্ষক",
    placeholder: "উদাহরণ: জ্বর, মাথাব্যথা, কাশি...",
    button: "উপসর্গ বিশ্লেষণ করুন",
    analyzing: "বিশ্লেষণ করা হচ্ছে...",
    reportTitle: "AI স্বাস্থ্য প্রতিবেদন",
    errorMsg: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
    emptyAlert: "অনুগ্রহ করে আপনার উপসর্গ লিখুন।",
  },
};

export default function SymptomChecker({ reports, setReports, language }: Props) {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const ui = UI_TEXT[language] ?? UI_TEXT["English"];

  async function analyzeSymptoms() {
    if (!symptoms.trim()) {
      alert(ui.emptyAlert);
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, language }),
      });

      const data = await res.json();
      setResponse(data.response);

      const newReport: Report = {
        id: Date.now(),
        symptoms,
        result: data.response,
        date: new Date().toLocaleString(), // fixed: was `new date()`
      };

      setReports((prev) => [newReport, ...prev]);
    } catch {
      setResponse(ui.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="symptom-checker" className="py-16 px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-blue-700 mb-2 text-center">
          {ui.title}
        </h2>

        {/* Language badge */}
        <p className="text-center text-sm text-gray-400 mb-6">
          {language === "English" && "Responding in English"}
          {language === "Hindi"   && "हिन्दी में उत्तर मिलेगा"}
          {language === "Bengali" && "বাংলায় উত্তর পাবেন"}
        </p>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={ui.placeholder}
          className="w-full h-40 border border-gray-300 rounded-xl p-4 text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          onClick={analyzeSymptoms}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-lg font-semibold py-4 rounded-xl transition"
        >
          {loading ? ui.analyzing : ui.button}
        </button>

        {response && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              {ui.reportTitle}
            </h3>
            <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
              {response}
            </pre>
          </div>
        )}

      </div>
    </section>
  );
}