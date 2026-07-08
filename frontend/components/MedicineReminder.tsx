"use client";

import { useState, useEffect } from "react";

interface Medicine {
  id: number;
  name: string;
  time: string;
}

interface Props {
  list: Medicine[];
  setList: React.Dispatch<React.SetStateAction<Medicine[]>>;
}

export default function MedicineReminder({ list, setList }: Props) {
  const [medicine, setMedicine] = useState("");
  const [time, setTime]         = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("medicineList");
      if (saved) setList(JSON.parse(saved));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("medicineList", JSON.stringify(list));
    }
  }, [list]);

  function addMedicine() {
    if (!medicine.trim() || !time) {
      alert("Please enter both a medicine name and a time.");
      return;
    }
    setList([...list, { id: Date.now(), name: medicine.trim(), time }]);
    setMedicine("");
    setTime("");
  }

  function deleteMedicine(id: number) {
    setList(list.filter((item) => item.id !== id));
  }

  return (
    <section id="medicine-reminder" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">💊</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800 mb-2">
            Medicine Reminder
          </h2>
          <p className="text-gray-500">Never miss a dose — set up your daily medicine schedule</p>
        </div>

        {/* Add form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-6">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Add New Reminder</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">💊</span>
              <input
                type="text"
                placeholder="Medicine name (e.g. Paracetamol)"
                value={medicine}
                onChange={(e) => setMedicine(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMedicine()}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
            <div className="relative sm:w-40">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">⏰</span>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
            <button
              onClick={addMedicine}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Medicine list */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="font-bold text-gray-700">
              Your Medicines
              {list.length > 0 && (
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {list.length}
                </span>
              )}
            </p>
            {list.length > 0 && (
              <p className="text-xs text-gray-400">{list.length} reminder{list.length > 1 ? "s" : ""} active</p>
            )}
          </div>

          {list.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-5xl mb-3">💊</p>
              <p className="text-gray-500 font-medium">No medicines added yet</p>
              <p className="text-gray-400 text-sm mt-1">Add your first medicine reminder above</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {list.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-lg font-bold text-blue-600 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">⏰ {item.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMedicine(item.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                    aria-label={`Delete ${item.name}`}
                  >
                    🗑 Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
