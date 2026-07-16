"use client";

import { useState } from "react";

interface Hospital {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance: number; // km
  address?: string;
}

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function NearestHospital() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findNearbyHospitals = () => {
    setError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setError("তোমার ব্রাউজার লোকেশন সাপোর্ট করে না।");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const query =
          "[out:json];node['amenity'='hospital'](around:5000," +
          latitude +
          "," +
          longitude +
          ");out body;";

        try {
          const res = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: query,
          });
          const data = await res.json();

          const results: Hospital[] = data.elements.map((el: any) => ({
            id: el.id,
            name: el.tags?.name || "Unnamed Hospital",
            lat: el.lat,
            lon: el.lon,
            distance: getDistanceKm(latitude, longitude, el.lat, el.lon),
            address: el.tags?.["addr:full"] || el.tags?.["addr:street"],
          }));

          results.sort((a, b) => a.distance - b.distance);
          setHospitals(results.slice(0, 10));
        } catch (err) {
          setError("হাসপাতাল খুঁজতে সমস্যা হয়েছে, আবার চেষ্টা করো।");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("লোকেশন পারমিশন দাও, তাহলে খুঁজে দিতে পারবো।");
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-6 rounded-2xl bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">🏥 Nearest Hospitals</h2>

      <button
        onClick={findNearbyHospitals}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "searching..." : "Nearest Hospitals are ..."}
      </button>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <div className="mt-4 space-y-3">
        {hospitals.map((h) => {
          const mapUrl =
            "https://www.google.com/maps/dir/?api=1&destination=" +
            h.lat +
            "," +
            h.lon;

          return (
            <div
              key={h.id}
              className="border rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{h.name}</p>
                {h.address && (
                  <p className="text-sm text-gray-500">{h.address}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-gray-600">
                  {h.distance.toFixed(1)} km
                </span>
                
                 <a href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm underline"
                >
                  Directions
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}