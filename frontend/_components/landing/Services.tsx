import { ShieldCheck, Zap, BarChart3, CreditCard, BrickWallShield, Eye } from "lucide-react";

const services = [
  {
    title: "Multi-Tenant Architecture",
    description: "Safely isolate client data while managing hundreds of projects.",
    icon: <BrickWallShield className="w-6 h-6 text-rose-600" />,
    color: "bg-rose-50 group-hover:bg-rose-100",
    colorHover: "hover:bg-gradient-to-tr from-rose-50 via-white to-white",
  },
  {
    title: "Role-Based Access Control",
    description: "Assign Super Admin, Admin, Developer, and Client roles with granular permission levels.",
    icon: <ShieldCheck className="w-6 h-6 text-green-600" />,
    color: "bg-green-50 group-hover:bg-green-100",
    colorHover: "hover:bg-gradient-to-tr from-green-50 via-white to-white",
  },
  {
    title: "Real-Time Analytics",
    description: "Visualize agency performance, project budgets, and task completion rates instantly.",
    icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
    color: "bg-purple-50 group-hover:bg-purple-100",
    colorHover: "hover:bg-gradient-to-tr from-purple-50 via-white to-white",
  },
  {
    title: "Automated Billing",
    description: "Track subscriptions, generate invoices, and handle recurring payments effortlessly.",
    icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    color: "bg-blue-50 group-hover:bg-blue-100",
    colorHover: "hover:bg-gradient-to-tr from-blue-50 via-white to-white",
  },
  {
    title: "Visibility Access",
    description: "Offering clients a way to view the project progress made by developers.",
    icon: <Eye className="w-6 h-6 text-orange-600" />,
    color: "bg-orange-50 group-hover:bg-orange-100",
    colorHover: "hover:bg-gradient-to-tr from-orange-50 via-white to-white",
  },
  {
    title: "High Performance",
    description: "Powered by Golang and Next.js, experience sub-millisecond response times.",
    icon: <Zap className="w-6 h-6 text-yellow-600" />,
    color: "bg-yellow-50 group-hover:bg-yellow-100",
    colorHover: "hover:bg-gradient-to-tr from-yellow-50 via-white to-white",
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
              className={`${service.colorHover} bg-white rounded-2xl p-8 border border-gray-400 ring ring-offset-4 ring-gray-200 dark:border-gray-800 shadow-xs hover:shadow-sm hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 transform group-hover:scale-120 transition-transform duration-300`}>
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
