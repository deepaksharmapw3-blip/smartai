const HERO_TEXT: Record<string, { title: string; subtitle: string; cta: string }> = {
  English: {
    title: "Your Personal AI Healthcare Assistant",
    subtitle: "Get instant AI-powered health guidance, medicine reminders, and emergency support—all in one place.",
    cta: "Get Started",
  },
  Hindi: {
    title: "आपका व्यक्तिगत AI स्वास्थ्य सहायक",
    subtitle: "तत्काल AI-संचालित स्वास्थ्य मार्गदर्शन, दवा अनुस्मारक और आपातकालीन सहायता—सब एक जगह पाएं।",
    cta: "शुरू करें",
  },
  Bengali: {
    title: "আপনার ব্যক্তিগত AI স্বাস্থ্যসেবা সহকারী",
    subtitle: "তাৎক্ষণিক AI-চালিত স্বাস্থ্য নির্দেশিকা, ওষুধের রিমাইন্ডার এবং জরুরি সহায়তা—সব এক জায়গায় পান।",
    cta: "শুরু করুন",
  },
};

interface Props {
  language: string;
}

export default function Hero({ language }: Props) {
  const text = HERO_TEXT[language] ?? HERO_TEXT["English"];

  return (
    <section
      id="home"
      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          {text.title}
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          {text.subtitle}
        </p>
        <a
          href="#symptom-checker"
          className="inline-block bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
        >
          {text.cta}
        </a>
      </div>
    </section>
  );
}