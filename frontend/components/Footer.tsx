export default function Footer() {
  const links = {
    Product:  ["AI Checker", "Dashboard", "Medicine Reminder", "Report History"],
    Support:  ["How it Works", "FAQ", "Privacy Policy", "Terms of Use"],
    Contact:  ["support@smarthealthai.com", "Available 24/7", "3 Languages Supported"],
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-lg">🩺</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-blue-400">Smart</span>
              <span className="text-cyan-400">Health</span>
              <span className="text-white"> AI</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            AI-powered healthcare assistant that helps you understand your symptoms, manage medicines, and track your health — all in one place.
          </p>
          <div className="flex gap-3 mt-5">
            {["🌐", "📱", "💬"].map((icon, i) => (
              <button
                key={i}
                className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label={`Social link ${i + 1}`}
              >
                <span className="text-sm">{icon}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">{title}</h3>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 Smart Health AI. Built with ❤️ for better healthcare.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
