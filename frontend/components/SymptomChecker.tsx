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
  language: string;
}

const UI_TEXT: Record<string, {
  title: string; subtitle: string; placeholder: string;
  button: string; analyzing: string; reportTitle: string;
  errorMsg: string; emptyAlert: string;
}> = {
  English: {
    title: "AI Symptom Checker",
    subtitle: "Describe your symptoms in detail for a more accurate AI analysis",
    placeholder: "e.g. I have had a fever of 38°C since yesterday, along with a persistent headache and mild sore throat...",
    button: "Analyze My Symptoms",
    analyzing: "Analyzing your symptoms...",
    reportTitle: "Your AI Health Report",
    errorMsg: "Unable to connect to the AI service. Please check your connection and try again.",
    emptyAlert: "Please describe your symptoms before analyzing.",
  },
  Hindi: {
    title: "AI लक्षण परीक्षक",
    subtitle: "अधिक सटीक विश्लेषण के लिए अपने लक्षणों का विस्तार से वर्णन करें",
    placeholder: "उदाहरण: मुझे कल से 38°C बुखार है, साथ में लगातार सिरदर्द और हल्का गले में दर्द है...",
    button: "लक्षण विश्लेषण करें",
    analyzing: "विश्लेषण हो रहा है...",
    reportTitle: "आपकी AI स्वास्थ्य रिपोर्ट",
    errorMsg: "AI सेवा से कनेक्ट नहीं हो सका। कृपया पुनः प्रयास करें।",
    emptyAlert: "कृपया विश्लेषण से पहले अपने लक्षण दर्ज करें।",
  },
  Bengali: {
    title: "AI উপসর্গ পরীক্ষক",
    subtitle: "আরও সঠিক বিশ্লেষণের জন্য আপনার উপসর্গ বিস্তারিতভাবে বর্ণনা করুন",
    placeholder: "যেমন: গতকাল থেকে ৩৮°C জ্বর, সাথে ক্রমাগত মাথাব্যথা এবং হালকা গলা ব্যথা আছে...",
    button: "উপসর্গ বিশ্লেষণ করুন",
    analyzing: "বিশ্লেষণ করা হচ্ছে...",
    reportTitle: "আপনার AI স্বাস্থ্য প্রতিবেদন",
    errorMsg: "AI পরিষেবার সাথে সংযোগ করা যায়নি। আবার চেষ্টা করুন।",
    emptyAlert: "বিশ্লেষণের আগে আপনার উপসর্গ লিখুন।",
  },
};

const LANG_BADGE: Record<string, string> = {
  English: "🇬🇧 Responding in English",
  Hindi:   "🇮🇳 हिन्दी में उत्तर मिलेगा",
  Bengali: "🇧🇩 বাংলায় উত্তর পাবেন",
};

const QUICK_SYMPTOMS = [
  "Fever & Headache", "Cold & Cough", "Stomach Pain",
  "Back Pain", "Chest Pain", "Fatigue & Weakness",
];

export default function SymptomChecker({ reports, setReports, language }: Props) {
  const [symptoms, setSymptoms]   = useState("");
  const [response, setResponse]   = useState("");
  const [loading, setLoading]     = useState(false);

  const ui = UI_TEXT[language] ?? UI_TEXT["English"];

  async function analyzeSymptoms() {
    if (!symptoms.trim()) {
      alert(ui.emptyAlert);
      return;
    }
    setLoading(true);
    setResponse("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
      const res = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms, language }),
      });
      const data = await res.json();
      setResponse(data.response);
      setReports((prev) => [{
        id: Date.now(),
        symptoms,
        result: data.response,
        date: new Date().toLocaleString(),
      }, ...prev]);
    } catch {
      setResponse(ui.errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="symptom-checker" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">🩺</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">
            {ui.title}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">{ui.subtitle}</p>
          <span className="inline-block mt-3 text-xs bg-blue-100 text-blue-600 font-medium px-3 py-1 rounded-full">
            {LANG_BADGE[language]}
          </span>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Quick symptom chips */}
          <div className="px-6 pt-6 pb-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Quick select</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SYMPTOMS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSymptoms((prev) => prev ? `${prev}, ${s.toLowerCase()}` : s.toLowerCase())}
                  className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-all"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="px-6 pb-2">
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={ui.placeholder}
              rows={5}
              className="w-full border border-gray-200 rounded-2xl p-4 text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none placeholder-gray-400 transition"
            />
            <p className="text-xs text-gray-400 text-right mt-1">{symptoms.length} characters</p>
          </div>

          {/* Submit button */}
          <div className="px-6 pb-6">
            <button
              onClick={analyzeSymptoms}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg text-base flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-white rounded-full dot-1" />
                    <span className="w-2 h-2 bg-white rounded-full dot-2" />
                    <span className="w-2 h-2 bg-white rounded-full dot-3" />
                  </span>
                  {ui.analyzing}
                </>
              ) : (
                <>🔍 {ui.button}</>
              )}
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mx-6 mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex gap-3">
            <span className="text-lg flex-shrink-0">⚠️</span>
            <p className="text-xs text-amber-700 leading-relaxed">
              This AI tool provides general health information only. It is <strong>not a substitute</strong> for professional medical advice. Always consult a qualified doctor for serious conditions.
            </p>
          </div>
        </div>

        {/* Result card */}
        {response && (
          <div className="mt-6 bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">🤖</div>
              <h3 className="text-white font-bold text-lg">{ui.reportTitle}</h3>
              <span className="ml-auto text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="px-6 py-5">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed text-sm">
                {response}
              </pre>
            </div>
            <div className="px-6 pb-5">
              <a
                href="#report-history"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
              >
                📋 View in Report History →
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
