import { LayoutDashboard, Users, ShieldCheck, Zap, BarChart3, CreditCard } from "lucide-react";

const services = [
  {
    title: "Multi-Tenant Architecture",
    description: "Safely isolate client data while managing hundreds of projects from a single unified dashboard.",
    icon: <Users className="w-6 h-6 text-teal-600" />,
    color: "bg-teal-50 dark:bg-teal-900/30",
  },
  {
    title: "Role-Based Access Control",
    description: "Assign Super Admin, Admin, Developer, and Client roles with granular permission levels.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 dark:bg-blue-900/30",
  },
  {
    title: "Real-Time Analytics",
    description: "Visualize agency performance, project budgets, and task completion rates instantly.",
    icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 dark:bg-purple-900/30",
  },
  {
    title: "Automated Billing",
    description: "Track subscriptions, generate invoices, and handle recurring payments effortlessly.",
    icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
    color: "bg-emerald-50 dark:bg-emerald-900/30",
  },
  {
    title: "Client Portals",
    description: "Provide clients with white-labeled access to view project progress and leave feedback.",
    icon: <LayoutDashboard className="w-6 h-6 text-rose-600" />,
    color: "bg-rose-50 dark:bg-rose-900/30",
  },
  {
    title: "Lightning Fast API",
    description: "Powered by Golang and Next.js, experience sub-millisecond response times.",
    icon: <Zap className="w-6 h-6 text-yellow-600" />,
    color: "bg-yellow-50 dark:bg-yellow-900/30",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Everything you need to run your agency.
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Powerful features designed to automate the boring stuff so you can focus on writing great code and delivering value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {service.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
