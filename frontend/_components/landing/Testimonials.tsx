import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO at Nexus Digital",
    content: "Sevior completely transformed how we manage our client projects. The multi-tenant architecture means we never cross-contaminate data, and clients love their dedicated portal.",
    rating: 5,
    avatar: "S",
    color: "bg-blue-100 text-blue-700"
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    content: "Finally, a platform that doesn't get in the way of writing code. The automated billing alone saved us 20 hours a week of administrative headache.",
    rating: 5,
    avatar: "D",
    color: "bg-teal-100 text-teal-700"
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Manager",
    content: "The role-based access control is perfect. I can give our junior devs exactly the permissions they need without exposing sensitive financial data.",
    rating: 5,
    avatar: "E",
    color: "bg-purple-100 text-purple-700"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-teal-50 dark:bg-teal-900/10 rounded-full blur-3xl opacity-60"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Trusted by modern agencies.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Don't just take our word for it. Here's what agency leaders and developers are saying about Sevior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-sm p-8 shadow-md shadow-slate-200/40 border border-slate-300 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
              <div>
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-orange-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-8 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-xl`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
