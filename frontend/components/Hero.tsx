export default function Hero() {
  return (
    <section id="home"
    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-8 text-center">

        <h1 className="text-5xl font-extrabold mb-6">
          Your Personal AI Healthcare Assistant
        </h1>

        <p className="text-xl mb-8">
          Get instant AI-powered health guidance, medicine reminders,
          and emergency support—all in one place.
        </p>

        <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
          Get Started
        </button>

      </div>
    </section>
  );
}