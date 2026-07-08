"use client";
import { useState } from "react";
export default function Navbar() {
  const [language, setLanguage] = useState("English");
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        <div className="flex items-center gap-2">
          <span className="text-3xl">🩺</span>
          <h1 className="text-2xl font-bold text-blue-600">
            Smart Health AI
          </h1>
        </div>

        <ul className="hidden md:flex gap-8 text-gray-700 font-semibold">
         <li>
          <a href="#home" className="hover:text-blue-600">
           Home
          </a>
         </li>

         <li>
          <a href="#features" className="hover:text-blue-600">
           Features
          </a>
         </li>

         <li>
          <a href="#dashboard" className="hover:text-blue-600">
          Dashboard
          </a>
         </li>

         <li>
          <a href="#contact" className="hover:text-blue-600">
          Contact
          </a>
         </li>
        </ul>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-black bg-white mr-4"
>
          <option value="English"> English</option>
          <option value="বাংলা"> বাংলা</option>
          <option value="हिन्दी"> हिन्दी</option>
        </select>
        <a
         href="#features"
         className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
         Get Started
        </a>

      </div>
    </nav>
  );
}