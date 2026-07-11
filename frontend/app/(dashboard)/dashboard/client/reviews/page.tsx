import React from "react";
import { MARKETPLACE_AGENCIES } from "@/_constants/client-marketplace.mock";
import { Star } from "lucide-react";

export default function Reviews() {
    // For the client dashboard reviews, we'll just show the reviews they allegedly wrote (from mock data)
    const myReviews = MARKETPLACE_AGENCIES.flatMap(agency => 
        agency.reviews.map(review => ({ ...review, agencyName: agency.name }))
    );

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1000px] mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Reviews</h1>
                    <p className="text-slate-500">Reviews you have left for agencies and developers.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {myReviews.map((review, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="font-bold text-slate-900 text-lg">{review.agencyName}</div>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed italic">"{review.text}"</p>
                            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                                Reviewed on {review.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
