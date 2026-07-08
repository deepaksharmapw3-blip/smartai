type Props = {
  icon: string;
  title: string;
  description: string;
  color?: string;
};

export default function FeatureCard({ icon, title, description, color = "blue" }: Props) {
  const colorMap: Record<string, { bg: string; iconBg: string; title: string; border: string }> = {
    blue:   { bg: "hover:bg-blue-50",   iconBg: "bg-blue-100",   title: "text-blue-700",   border: "hover:border-blue-200" },
    green:  { bg: "hover:bg-green-50",  iconBg: "bg-green-100",  title: "text-green-700",  border: "hover:border-green-200" },
    purple: { bg: "hover:bg-purple-50", iconBg: "bg-purple-100", title: "text-purple-700", border: "hover:border-purple-200" },
    red:    { bg: "hover:bg-red-50",    iconBg: "bg-red-100",    title: "text-red-700",    border: "hover:border-red-200" },
  };
  const c = colorMap[color] ?? colorMap["blue"];

  return (
    <div className={`group bg-white rounded-2xl border border-gray-100 ${c.border} p-6 shadow-sm hover:shadow-xl ${c.bg} transition-all duration-300 hover:-translate-y-1 cursor-default`}>
      <div className={`w-14 h-14 ${c.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className={`text-lg font-bold ${c.title} mb-2`}>{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
