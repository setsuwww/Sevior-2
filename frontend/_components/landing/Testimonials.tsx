import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO at Nexus Digital",
    content: "Sevior completely transformed how we manage our client projects. The multi-tenant architecture means we never cross-contaminate data.",
    rating: 5,
    avatar: "S",
    color: "bg-rose-100 text-rose-700"
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    content: "Finally, a platform that doesn't get in the way of writing code. The automated billing alone saved us 20 hours a week of administrative headache.",
    rating: 5,
    avatar: "D",
    color: "bg-green-100 text-green-700"
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Manager",
    content: "The role-based access control is perfect. I can give our junior devs exactly the permissions they need without exposing sensitive financial data.",
    rating: 5,
    avatar: "E",
    color: "bg-sky-100 text-sky-700"
  },
  {
    name: "Marcus Thorne",
    role: "Founder, Thorne Creative",
    content: "The analytics dashboard gave us insights into our project profitability that we were completely blind to before using Sevior. It's indispensable.",
    rating: 5,
    avatar: "M",
    color: "bg-purple-100 text-purple-700"
  },
  {
    name: "Aisha Patel",
    role: "Client Success Lead",
    content: "Onboarding new agencies used to take days. Now it takes minutes. The unified interface is so intuitive that our training time dropped by 80%.",
    rating: 5,
    avatar: "A",
    color: "bg-orange-100 text-orange-700"
  },
  {
    name: "James Wilson",
    role: "CTO, Elevate Tech",
    content: "Scaling our agency meant dealing with disjointed tools. Sevior brought everything under one roof. It is the gold standard for agency management software.",
    rating: 5,
    avatar: "J",
    color: "bg-slate-100 text-slate-700"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, idx) => {
            const isFeatured = idx === testimonials.length - 1;

            if (isFeatured) {
              return (
                <div
                  key={idx}
                  className="relative bg-gradient-to-tr from-slate-800 to-teal-800 rounded-sm p-6 border border-transparent shadow-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-2.5 shadow-2xl shadow-teal-800/40 hover:scale-[1.02] overflow-hidden group"
                >
                  <Quote className="absolute -top-4 -right-2 w-32 h-32 text-white/5 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-200 mb-8 italic leading-relaxed text-md font-medium">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 relative z-10 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xl shadow-inner">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-teal-100">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-sm p-6 border border-slate-400 ring ring-offset-4 ring-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div>
                  <div className="flex space-x-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-8 italic leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center space-x-4 mt-auto">
                  <div className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-xl`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
