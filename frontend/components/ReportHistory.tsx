"use client";
import { jsPDF } from "jspdf";
import { report } from "process";
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

export default function ReportHistory({ reports, setReports }: Props) {
    const [search,setSearch] = useState("");
    function deleteReport(id: number) {
     const updated = reports.filter((report) => report.id !== id);

     setReports(updated);

     localStorage.setItem("reports", JSON.stringify(updated));

    }
    const filteredReports = reports.filter((report) =>
  report.symptoms.toLowerCase().includes(search.toLowerCase())
);
function downloadPDF(report: Report) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AI Health Report", 20, 20);

  doc.setFontSize(14);
  doc.text("Symptoms:", 20, 40);
  doc.text(report.symptoms, 20, 50);

  doc.text("AI Report:", 20, 70);

  const lines = doc.splitTextToSize(report.result, 170);
  doc.text(lines, 20, 80);

  doc.save(`Health_Report_${report.id}.pdf`);
}
function clearAllReports() {
  setReports([]);
  localStorage.removeItem("reports");
}
  return (
    <section className="py-16 bg-slate-100">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
          📋 AI Report History
        </h2>
        <input
         type="text"
         placeholder="Search by symptoms..."
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         className="w-full border rounded-xl p-3 mb-6 text-black"
        />

        {filteredReports.length === 0 ? (
          <p className="text-center text-gray-500">
            No AI Reports Yet
          </p>
        ) : (
          <div className="space-y-6">

            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="border rounded-2xl p-6 bg-gray-50 shadow"
              >
            <p className="text-sm text-gray-500 mb-3">
              📅 {report.date}
            </p>

                <h3 className="text-xl font-bold text-blue-700 mb-2">
                  Symptoms
                </h3>

                <p className="text-black mb-4">
                  {report.symptoms}
                </p>

                <h3 className="text-xl font-bold text-green-700 mb-2">
                  AI Report
                </h3>

                <pre className="whitespace-pre-wrap text-black">
                  {report.result}
                </pre>
                <button
                 onClick={() => downloadPDF(report)}
                 className="mt-3 ml-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                Download PDF
                </button>
                <button
                 onClick={() => deleteReport(report.id)}
                 className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete Report
                </button>
                <button
                 onClick={clearAllReports}
                 className="mb-6 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
             >
                    🗑️ Clear All Reports
                </button>

              </div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}