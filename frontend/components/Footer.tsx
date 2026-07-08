export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-2xl font-bold text-cyan-400">
          🩺 Smart Health AI
        </h2>

        <p className="mt-3 text-gray-300">
          AI-powered healthcare assistant for everyone.
        </p>

        <div className="flex justify-center gap-8 mt-6">
          <a href="#" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Features
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Dashboard
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Contact
          </a>
        </div>

        <hr className="my-6 border-gray-700" />

        <p className="text-sm text-gray-400">
          © 2026 Smart Health AI. Built for Hackathon.
        </p>

      </div>
    </footer>
  );
}