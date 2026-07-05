import { CheckCircle2 } from "lucide-react";

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
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Agency Control</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage multiple client projects under one roof.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-2xl">👩‍💻</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dev Teams</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assign tasks and track developer progress in real-time.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Client Portal</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Give clients transparent access to their project's status.</p>
                </div>
                <div className="bg-teal-600 p-6 rounded-2xl shadow-xl flex flex-col justify-center text-white">
                  <h3 className="text-3xl font-extrabold mb-2">10x</h3>
                  <p className="text-sm font-medium text-teal-100">Faster project delivery times across the board.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
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
