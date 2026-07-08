"use client";
type Props = {
  reports: number;
  medicines: number;
};

export default function HealthStats({
  reports,
  medicines,
}: Props) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          ❤️ Health Overview
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl">📋</div>

            <h3 className="text-4xl font-bold text-blue-700 mt-4">
              {reports}
            </h3>

            <p className="text-gray-600 mt-2">
              Total Reports
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl">💊</div>

            <h3 className="text-4xl font-bold text-blue-700 mt-4">
              {medicines}
            </h3>

            <p className="text-gray-600 mt-2">
              Medicines
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl">🩺</div>

            <h3 className="text-4xl font-bold text-blue-700 mt-4">
              {reports}
            </h3>

            <p className="text-gray-600 mt-2">
              AI Diagnosis
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl">❤️</div>

            <h3 className="text-4xl font-bold text-blue-700 mt-4">
              95%
            </h3>

            <p className="text-gray-600 mt-2">
              Health Score
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}