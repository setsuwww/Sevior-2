import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/_components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for freelancers and small teams just getting started.",
    features: [
      { name: "Up to 6 Projects", included: true },
      { name: "5 Team Members", included: true },
      { name: "Basic Analytics", included: true },
      { name: "Email Support", included: true },
      { name: "White-label Client Portal", included: false },
    ],
    buttonText: "Start for Free",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Ideal for growing agencies that need more power and flexibility.",
    features: [
      { name: "Up to 18 Projects", included: true },
      { name: "15 Team Members", included: true },
      { name: "Basic Analytics", included: true },
      { name: "Email & Phone Support", included: true },
      { name: "White-label Client Portal", included: false },
    ],
    buttonText: "Get Pro",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Executive",
    price: "$199",
    period: "/month",
    description: "For large agencies requiring enterprise-grade features and scaling.",
    features: [
      { name: "Unlimited Projects", included: true },
      { name: "Unlimited Team Members", included: true },
      { name: "Real-time Advance Analytics", included: true },
      { name: "Custom Reporting", included: true },
      { name: "24/7 Dedicated Support", included: true },
      { name: "White-label Client Portal", included: true },
    ],
    buttonText: "Get Executive",
    buttonVariant: "outline",
    popular: false,
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Pricing Plans</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Create your own agencies.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Scale without limits.</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose the perfect plan for your agency. Whether you are a solo developer or an enterprise, we have got you covered.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-8 md:gap-0 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isFree = index === 0;
            const isPro = index === 1;
            const isExec = index === 2;

            return (
              <div
                key={index}
                className={`
                  relative flex flex-col w-full md:w-1/3 transition-all duration-300
                  ${isFree ? 'bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-3xl md:rounded-r-none md:border-r-0 z-10 hover:-translate-y-1' : ''}
                  ${isPro ? 'bg-gradient-to-tr from-slate-800 to-teal-800 text-white shadow-2xl shadow-slate-900/40 dark:shadow-teal-900/20 border-0 rounded-3xl md:rounded-xl z-20 md:scale-[1.06] md:min-h-[600px] hover:-translate-y-2 hover:shadow-slate-900/60' : ''}
                  ${isExec ? 'bg-white dark:bg-zinc-900 border border-yellow-500/60 dark:border-amber-400/70 shadow-sm rounded-3xl md:rounded-l-none md:border-l-0 z-10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]' : ''}
                  p-8
                `}
              >
                {isPro && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-teal-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-5 rounded-full shadow-lg shadow-teal-500/30">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h4 className={`text-2xl font-bold mb-2 ${isPro ? "text-white" : "text-gray-900 dark:text-white"}`}>
                    {plan.name}
                  </h4>
                  <p className={`text-sm h-10 ${isPro ? "text-teal-100" : "text-gray-500 dark:text-gray-400"}`}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 flex items-baseline text-5xl font-extrabold">
                  <span className={isPro ? "text-white" : "text-gray-900 dark:text-white"}>{plan.price}</span>
                  <span className={`text-lg font-medium ml-2 ${isPro ? "text-teal-200" : "text-gray-500"}`}>{plan.period}</span>
                </div>

                <div className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      {feature.included ? (
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${isPro ? "text-teal-400" : (isExec ? "text-yellow-600 dark:text-amber-500" : "text-teal-600")}`} />
                      ) : (
                        <XCircle className={`w-5 h-5 shrink-0 ${isPro ? "text-slate-500" : "text-gray-300 dark:text-gray-700"}`} />
                      )}
                      <span className={`text-sm font-medium ${feature.included
                        ? (isPro ? "text-white" : "text-gray-700 dark:text-gray-300")
                        : (isPro ? "text-slate-400" : "text-gray-400 dark:text-gray-500")
                        }`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full h-12 rounded-xl text-md font-bold transition-all duration-300 mt-auto ${isPro
                    ? "bg-white text-slate-900 hover:bg-gray-100 shadow-md hover:shadow-lg"
                    : (isExec
                      ? "bg-gray-900 text-white hover:bg-gray-800 dark:bg-yellow-600 dark:hover:bg-yellow-700"
                      : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                    )
                    }`}
                  variant={plan.buttonVariant as any}
                >
                  {plan.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
