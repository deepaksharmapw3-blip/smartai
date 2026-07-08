const HERO_TEXT: Record<string, { title: string; highlight: string; subtitle: string; cta: string; secondary: string }> = {
  English: {
    title: "Your Personal",
    highlight: "AI Healthcare Assistant",
    subtitle: "Get instant AI-powered health guidance, medicine reminders, and emergency support — all in one place, available 24/7.",
    cta: "Check Your Symptoms",
    secondary: "View Dashboard",
  },
  Hindi: {
    title: "आपका व्यक्तिगत",
    highlight: "AI स्वास्थ्य सहायक",
    subtitle: "तत्काल AI-संचालित स्वास्थ्य मार्गदर्शन, दवा अनुस्मारक और आपातकालीन सहायता — सब एक जगह पाएं।",
    cta: "लक्षण जांचें",
    secondary: "डैशबोर्ड देखें",
  },
  Bengali: {
    title: "আপনার ব্যক্তিগত",
    highlight: "AI স্বাস্থ্যসেবা সহকারী",
    subtitle: "তাৎক্ষণিক AI-চালিত স্বাস্থ্য নির্দেশিকা, ওষুধের রিমাইন্ডার এবং জরুরি সহায়তা — সব এক জায়গায় পান।",
    cta: "উপসর্গ পরীক্ষা করুন",
    secondary: "ড্যাশবোর্ড দেখুন",
  },
};

const STATS = [
  { value: "10K+", label: "Patients Helped" },
  { value: "99%",  label: "Accuracy Rate"   },
  { value: "24/7", label: "Available"        },
  { value: "3",    label: "Languages"        },
];

interface Props { language: string }

export default function Hero({ language }: Props) {
  const text = HERO_TEXT[language] ?? HERO_TEXT["English"];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <div>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI-Powered • Trusted • Free
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-4">
              {text.title}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                {text.highlight}
              </span>
            </h1>

            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-lg">
              {text.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#symptom-checker"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 hover:scale-105 transition-all duration-200 shadow-xl text-lg"
              >
                🩺 {text.cta}
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm border border-white/40 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 text-lg"
              >
                📊 {text.secondary}
              </a>
            </div>
          </div>

          {/* Right — floating cards */}
          <div className="hidden lg:flex flex-col gap-4 items-end">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 w-72 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">🩺</div>
                <div>
                  <p className="font-semibold text-sm">AI Diagnosis Ready</p>
                  <p className="text-xs text-blue-200">Describe your symptoms</p>
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div className="h-2 bg-green-400 rounded-full w-4/5" />
              </div>
              <p className="text-xs mt-1 text-blue-200">80% complete — enter symptoms</p>
            </div>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 w-64 shadow-xl">
              <p className="text-xs text-blue-200 mb-1">💊 Next Medicine</p>
              <p className="font-bold text-lg">Paracetamol</p>
              <p className="text-sm text-blue-200">Today at 8:00 PM</p>
              <div className="mt-2 inline-block bg-green-400/30 text-green-200 text-xs px-2 py-0.5 rounded-full">On Schedule</div>
            </div>

            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 w-56 shadow-xl">
              <p className="text-xs text-blue-200 mb-2">❤️ Health Score</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">92</span>
                <span className="text-blue-200 mb-1">/ 100</span>
              </div>
              <p className="text-xs text-green-300 mt-1">↑ Great condition</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center bg-white/15 backdrop-blur-sm rounded-2xl py-4 px-2 border border-white/20">
              <p className="text-3xl font-extrabold">{stat.value}</p>
              <p className="text-sm text-blue-200 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
