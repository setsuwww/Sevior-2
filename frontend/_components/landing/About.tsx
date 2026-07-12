import { Building2, CheckCircle2, HeartHandshake, Users2 } from "lucide-react";

export const aboutCards = [
  {
    title: "Agency Control",
    description: "Manage multiple client projects under one roof.",
    icon: Building2,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    title: "Team-Up",
    description: "Assign tasks and track developer progress in real-time.",
    icon: Users2,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
  }
];

interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

export function AboutCard({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}: AboutCardProps) {
  return (
    <div className="bg-white p-6 rounded-sm border border-gray-300 shadow-xs hover:scale-105 transition-all duration-200 cursor-pointer">
      <div
        className={`w-12 h-12 rounded-sm mb-4 flex items-center justify-center ${iconBg}`}
      >
        <Icon className={iconColor} />
      </div>

      <h3 className="font-bold mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Visual Side */}
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
            {/* Background blob */}
            <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/20 rounded-full blur-3xl opacity-50 transform -translate-x-12 translate-y-12"></div>

            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                {aboutCards.map((card) => (
                  <AboutCard
                    key={card.title}
                    {...card}
                  />
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-sm border border-gray-300 shadow-xs hover:scale-105 transition-all duration-200 cursor-pointer">
                  <div className="w-12 h-12 bg-green-100 rounded-sm mb-4 flex items-center justify-center">
                    <HeartHandshake className="text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Collaboration</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Give clients transparent access to their project's status.</p>
                </div>
                <div className="bg-gradient-to-r from-slate-800 to-teal-800 p-6 rounded-sm shadow-xl flex flex-col justify-center text-white">
                  <h3 className="text-3xl font-extrabold mb-2">10x</h3>
                  <p className="text-sm font-medium text-teal-100">Faster project delivery times across the board.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 lg:pl-10">
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">About Sevior</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Built specifically for modern development agencies.
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              We understood that generic project management tools were not enough for development agencies. Sevior bridges the gap between your developers, your management team, and your clients.
            </p>

            <ul className="space-y-5">
              {[
                "Centralized multi-tenant architecture.",
                "Granular role-based access control.",
                "Automated billing and subscription management.",
                "Real-time audit logs and security."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-teal-500 mr-3 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
