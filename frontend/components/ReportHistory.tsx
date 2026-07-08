"use client";
import { jsPDF } from "jspdf";
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
}

export default function ReportHistory({ reports, setReports }: Props) {
  const [search, setSearch]         = useState("");
  const [expanded, setExpanded]     = useState<number | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  function deleteReport(id: number) {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    localStorage.setItem("reports", JSON.stringify(updated));
    if (expanded === id) setExpanded(null);
  }

  function clearAllReports() {
    setReports([]);
    localStorage.removeItem("reports");
    setConfirmClear(false);
    setExpanded(null);
  }

  function downloadPDF(report: Report) {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text("Smart Health AI — Report", 20, 22);

    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    if (report.date) doc.text(`Generated: ${report.date}`, 20, 32);

    doc.setFontSize(13);
    doc.setTextColor(30, 30, 30);
    doc.text("Symptoms Reported:", 20, 46);
    doc.setFontSize(11);
    const symLines = doc.splitTextToSize(report.symptoms, 170);
    doc.text(symLines, 20, 55);

    const y2 = 55 + symLines.length * 6 + 10;
    doc.setFontSize(13);
    doc.text("AI Health Analysis:", 20, y2);
    doc.setFontSize(11);
    const rptLines = doc.splitTextToSize(report.result, 170);
    doc.text(rptLines, 20, y2 + 9);

    doc.save(`SmartHealth_Report_${report.id}.pdf`);
  }

  const filtered = reports.filter((r) =>
    r.symptoms.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="report-history" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">AI Report History</h2>
          <p className="text-gray-500">All your past health analyses, searchable and downloadable</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by symptoms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition bg-white"
            />
          </div>
          {reports.length > 0 && (
            confirmClear ? (
              <div className="flex gap-2">
                <button
                  onClick={clearAllReports}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold transition whitespace-nowrap text-sm"
                >
                  ✓ Confirm Delete All
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-medium transition text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-5 py-3 rounded-xl font-medium transition whitespace-nowrap text-sm"
              >
                🗑️ Clear All
              </button>
            )
          )}
        </div>

        {/* Report count badge */}
        {reports.length > 0 && (
          <p className="text-sm text-gray-500 mb-4">
            Showing <span className="font-semibold text-blue-600">{filtered.length}</span> of {reports.length} report{reports.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-16 text-center">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-600 font-semibold text-lg">
              {reports.length === 0 ? "No reports yet" : "No results found"}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {reports.length === 0
                ? "Run an AI symptom analysis to generate your first report"
                : `No reports match "${search}"`}
            </p>
            {reports.length === 0 && (
              <a
                href="#symptom-checker"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                🩺 Check Symptoms Now
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((report, index) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Report header — always visible */}
                <div
                  className="flex items-center justify-between px-6 py-4 cursor-pointer"
                  onClick={() => setExpanded(expanded === report.id ? null : report.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">
                      #{reports.length - index}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {report.symptoms.length > 60 ? report.symptoms.slice(0, 60) + "…" : report.symptoms}
                      </p>
                      {report.date && (
                        <p className="text-xs text-gray-400 mt-0.5">📅 {report.date}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-400 text-xl ml-4 flex-shrink-0">
                    {expanded === report.id ? "⌃" : "⌄"}
                  </span>
                </div>

                {/* Expanded content */}
                {expanded === report.id && (
                  <div className="border-t border-gray-100 px-6 py-5 fade-in-up">
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Symptoms</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{report.symptoms}</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 mb-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">🤖 AI Analysis</p>
                      <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm leading-relaxed">
                        {report.result}
                      </pre>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => downloadPDF(report)}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm hover:shadow"
                      >
                        ⬇ Download PDF
                      </button>
                      <button
                        onClick={() => deleteReport(report.id)}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-4 py-2.5 rounded-xl text-sm font-medium transition"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
