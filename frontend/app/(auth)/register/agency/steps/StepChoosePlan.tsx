import { CheckCircle2 } from "lucide-react";
import { useAgencyOnboarding } from "./logic/useAgencyOnboarding";
import { plans } from "@/_constants/template/plans";

export function StepChoosePlan() {
    const { form, updateForm } = useAgencyOnboarding();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                    const isSelected = form.subscription_plan === plan.id;

                    return (
                        <div
                            key={plan.id}
                            onClick={() =>
                                updateForm({
                                    subscription_plan: plan.id,
                                })
                            }
                            className={`h-full md:h-auto cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col border-2 ${isSelected
                                ? "bg-teal-50/50 dark:bg-teal-900/20 border-teal-500 shadow-lg shadow-teal-500/10 scale-[1.02]"
                                : "bg-white dark:bg-zinc-900 border-olive-200 dark:border-olive-800 hover:border-teal-300"
                                }`}
                        >
                            <div className="mb-4">
                                <h4 className="text-xl font-bold text-olive-900 dark:text-white mb-1">
                                    {plan.name}
                                </h4>

                                <div className="flex items-baseline text-3xl font-extrabold text-olive-900 dark:text-white">
                                    {plan.price}

                                    <span className="text-sm font-medium text-olive-500 ml-1">
                                        {plan.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-3 flex-1">
                                {plan.features
                                    .filter((feature) => feature.included)
                                    .map((feature) => (
                                        <li
                                            key={feature.name}
                                            className="flex items-start text-sm text-olive-600 dark:text-olive-300"
                                        >
                                            <CheckCircle2
                                                className={`w-4 h-4 mr-2 shrink-0 mt-0.5 ${isSelected
                                                    ? "text-teal-500"
                                                    : "text-olive-400"
                                                    }`}
                                            />

                                            {feature.name}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
