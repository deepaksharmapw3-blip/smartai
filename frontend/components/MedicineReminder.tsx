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
    const [time, setTime] = useState("");
    useEffect(() => {
      if (typeof window !== "undefined") {
      const saved = localStorage.getItem("medicineList");

      if (saved) {
      setList(JSON.parse(saved));
      }
      }
    }, []);

    useEffect(() => {
      if (typeof window !== "undefined") {
      localStorage.setItem("medicineList", JSON.stringify(list));
      }
    }, [list]);
      
  

  function addMedicine() {
    if (!medicine || !time) {
      alert("Please enter medicine name and time");
      return;
    }

    const newMedicine: Medicine = {
      id: Date.now(),
      name: medicine,
      time: time,
    };

    setList([...list, newMedicine]);

    setMedicine("");
    setTime("");
  }

  function deleteMedicine(id: number) {
    setList(list.filter((item) => item.id !== id));
  }

  return (
    <section className="py-16 bg-slate-100">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
          💊 Medicine Reminder
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Medicine Name"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            className="border rounded-xl p-3 text-black"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border rounded-xl p-3 text-black"
          />

          <button
            onClick={addMedicine}
            className="bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Add Reminder
          </button>

        </div>

        <div className="mt-10 space-y-4">

          {list.length === 0 ? (
            <p className="text-gray-500 text-center">
              No Medicine Added
            </p>
          ) : (
            list.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-100 rounded-xl p-4"
              >
                <div>
                  <h3 className="font-bold text-lg text-black">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    ⏰ {item.time}
                  </p>
                </div>

                <button
                  onClick={() => deleteMedicine(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </section>
  );
}