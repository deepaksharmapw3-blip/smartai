"use client";

type Props = {
  medicineCount: number;
};

export default function Dashboard({ medicineCount }: Props) {
  return (
    <section id="dashboard" className="py-20 bg-slate-100">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          ❤️ Health Dashboard
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <div className="text-5xl">
              💊
            </div>

            <h3 className="text-3xl font-bold mt-4">
              {medicineCount}
            </h3>

            <p className="text-gray-500">
              Medicines
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <div className="text-5xl">
              ⏰
            </div>

            <h3 className="text-3xl font-bold mt-4">
              5
            </h3>

            <p className="text-gray-500">
              Today's Reminder
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <div className="text-5xl">
              🤖
            </div>

            <h3 className="text-3xl font-bold mt-4">
              12
            </h3>

            <p className="text-gray-500">
              AI Reports
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

            <div className="text-5xl">
              ❤️
            </div>

            <h3 className="text-3xl font-bold mt-4">
              92%
            </h3>

            <p className="text-gray-500">
              Health Score
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}