"use client";

import { useState } from "react";
interface Report {
  id: number;
  symptoms: string;
  result: string;
}

interface Props {
  reports: Report[];
  setReports: React.Dispatch<React.SetStateAction<Report[]>>;
}

export default function SymptomChecker({
  reports,
  setReports,
}: Props) {
  const [symptoms, setSymptoms] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("English");

  async function analyzeSymptoms() {
    if (!symptoms.trim()) {
      alert("Please enter your symptoms.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms,
          language,
        }),
      });

      const data = await res.json();

      setResponse(data.response);
      const newReport: Report = {
         id: Date.now(),
         symptoms: symptoms,
         result: data.response,
         date: new date().toLocaleString(), // Add the current date and time
      };
      console.log("Saving report:",newReport);

     setReports([newReport, ...reports]);
     } catch (error) {
      setResponse("Something went wrong.");
    }

    
    setLoading(false);
  }

  return (
    <section className="py-16 px-8">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          AI Symptom Checker
        </h2>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Example: Fever, headache, cough..."
          className="w-full h-40 border rounded-xl p-4 text-lg text-black"
        />

        <button
          onClick={analyzeSymptoms}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 rounded-xl"
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

        {response && (
          <div className="mt-8 bg-gray-100 rounded-xl p-6">

            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              AI Health Report
            </h3>

            <pre className="whitespace-pre-wrap text-black">
              {response}
            </pre>

          </div>
        )}

      </div>

    </section>
  );
}