"use client";

type Props = {
  medicineCount: number;
  reportCount: number;
  reminderCount: number;
};

const cards = (medicineCount: number, reportCount: number, reminderCount: number) => [
  {
    icon: "💊",
    value: medicineCount,
    label: "Medicines Tracked",
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    text: "text-blue-600",
    tip: medicineCount === 0 ? "Add your first medicine below" : `${medicineCount} active`,
  },
  {
    icon: "⏰",
    value: reminderCount,
    label: "Active Reminders",
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    text: "text-purple-600",
    tip: "Daily schedule",
  },
  {
    icon: "🤖",
    value: reportCount,
    label: "AI Reports",
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    tip: reportCount === 0 ? "Run your first analysis" : `${reportCount} saved`,
  },
  {
    icon: "❤️",
    value: "92%",
    label: "Health Score",
    color: "from-rose-500 to-rose-600",
    bg: "bg-rose-50",
    text: "text-rose-600",
    tip: "Great condition",
  },
];

export default function Dashboard({ medicineCount, reportCount, reminderCount }: Props) {
  const data = cards(medicineCount, reportCount, reminderCount);

  return (
    <section id="dashboard" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">
            Health Dashboard
          </h2>
          <p className="text-gray-500">Your personal health overview at a glance</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((card) => (
            <div
              key={card.label}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top gradient accent */}
              <div className={`h-1 w-full bg-gradient-to-r ${card.color}`} />

              <div className="p-6">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <p className={`text-3xl font-extrabold ${card.text}`}>{card.value}</p>
                <p className="text-gray-700 font-semibold mt-1">{card.label}</p>
                <p className="text-xs text-gray-400 mt-1">{card.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick action strip */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <p className="font-bold text-lg">Ready to check your symptoms?</p>
            <p className="text-blue-100 text-sm">Get an AI-powered health report in seconds</p>
          </div>
          <a
            href="#symptom-checker"
            className="flex-shrink-0 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-md"
          >
            🩺 Start Analysis
          </a>
        </div>
      </div>
    </section>
  );
}
