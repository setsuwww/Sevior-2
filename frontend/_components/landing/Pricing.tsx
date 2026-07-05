import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/_components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for freelancers and small teams just getting started.",
    features: [
      { name: "Up to 3 Projects", included: true },
      { name: "5 Team Members", included: true },
      { name: "Basic Analytics", included: true },
      { name: "Community Support", included: true },
      { name: "Custom Domain", included: false },
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
      { name: "Unlimited Projects", included: true },
      { name: "20 Team Members", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "Priority Email Support", included: true },
      { name: "Custom Domain", included: true },
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
      { name: "Custom Reporting & API", included: true },
      { name: "24/7 Dedicated Support", included: true },
      { name: "Custom Domain", included: true },
      { name: "White-label Client Portal", included: true },
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-3">Pricing Plans</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            Create your own agencies.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Scale without limits.</span>
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Choose the perfect plan for your agency. Whether you are a solo developer or an enterprise, we have got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-3xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? "bg-teal-900 text-white shadow-2xl shadow-teal-900/20 border-0" 
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-400 to-blue-400 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h4 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
                  {plan.name}
                </h4>
                <p className={`text-sm ${plan.popular ? "text-teal-100" : "text-gray-500 dark:text-gray-400"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline text-5xl font-extrabold">
                <span className={plan.popular ? "text-white" : "text-gray-900 dark:text-white"}>{plan.price}</span>
                <span className={`text-lg font-medium ml-2 ${plan.popular ? "text-teal-200" : "text-gray-500"}`}>{plan.period}</span>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    {feature.included ? (
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.popular ? "text-teal-400" : "text-teal-600"}`} />
                    ) : (
                      <XCircle className={`w-5 h-5 shrink-0 ${plan.popular ? "text-teal-800" : "text-gray-300 dark:text-gray-700"}`} />
                    )}
                    <span className={`text-sm font-medium ${
                      feature.included 
                        ? (plan.popular ? "text-white" : "text-gray-700 dark:text-gray-300") 
                        : (plan.popular ? "text-teal-800" : "text-gray-400 dark:text-gray-500")
                    }`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full h-12 rounded-xl text-md font-bold shadow-md ${
                  plan.popular 
                    ? "bg-white text-teal-900 hover:bg-gray-100" 
                    : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-teal-600 dark:hover:bg-teal-700"
                }`}
                variant={plan.buttonVariant as any}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
