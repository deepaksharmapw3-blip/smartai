"use client";

type Props = {
  reports: number;
  medicines: number;
};

export default function HealthStats({ reports, medicines }: Props) {
  const stats = [
    { icon: "📋", value: reports,    label: "Total Reports",  sub: "AI analyses run",         color: "text-blue-600",   bg: "bg-blue-50",   bar: "bg-blue-400",   pct: Math.min(reports * 10, 100) },
    { icon: "💊", value: medicines,  label: "Medicines",      sub: "Currently tracked",        color: "text-purple-600", bg: "bg-purple-50", bar: "bg-purple-400", pct: Math.min(medicines * 20, 100) },
    { icon: "🩺", value: reports,    label: "AI Diagnoses",   sub: "Conditions analyzed",      color: "text-cyan-600",   bg: "bg-cyan-50",   bar: "bg-cyan-400",   pct: Math.min(reports * 10, 100) },
    { icon: "❤️", value: "95%",      label: "Health Score",   sub: "Based on your activity",  color: "text-rose-600",   bg: "bg-rose-50",   bar: "bg-rose-400",   pct: 95 },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">
            Health Overview
          </h2>
          <p className="text-gray-500">Track your wellness journey with real-time stats</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {stat.icon}
              </div>
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
              <p className="font-semibold text-gray-700 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stat.bar} rounded-full transition-all duration-700`}
                  style={{ width: `${stat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
