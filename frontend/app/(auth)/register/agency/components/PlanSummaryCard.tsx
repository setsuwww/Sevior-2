import React from "react";
import { Button } from "@/_components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useAgencyOnboarding } from "../steps/logic/useAgencyOnboarding";
import { plans } from "@/_constants/template/plans";
import { getPlanId } from "../types";

export function PlanSummaryCard() {
    const { form, changePlan } = useAgencyOnboarding();

    const selectedPlanData = plans.find(p => getPlanId(p.name) === form.subscription_plan);

    return (
        <div className="bg-gradient-to-tr from-slate-800 to-teal-800 rounded-2xl p-8 text-white shadow-xl shadow-teal-900/20 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-8 w-32 h-32 bg-teal-400 rounded-full blur-3xl opacity-20"></div>

            <div className="flex items-start justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-sm font-bold text-teal-100 mb-1">Selected Plan</h3>
                    <h4 className="text-3xl font-extrabold">{selectedPlanData?.name || "None"}</h4>
                </div>
                <Button onClick={changePlan} variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 h-9">
                    Change Plan
                </Button>
            </div>

            <div className="mb-8 relative z-10">
                <div className="flex items-baseline text-4xl font-extrabold mb-2">
                    {selectedPlanData?.price}
                    <span className="text-lg font-medium text-teal-200 ml-1">{selectedPlanData?.period}</span>
                </div>
            </div>

            <div className="space-y-3 relative z-10 border-t border-white/20 pt-6">
                {selectedPlanData?.features.filter(f => f.included).map((f, i) => (
                    <div key={i} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 mr-2 shrink-0" />
                        <span className="text-teal-50">{f.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
