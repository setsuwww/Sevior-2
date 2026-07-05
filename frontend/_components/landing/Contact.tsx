"use client";

import { Button } from "@/_components/ui/button";
import { Input } from "@/_components/ui/input";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy submit handler
    alert("Thanks for your interest! Our team will contact you shortly.");
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-teal-600 dark:bg-teal-900 rounded-3xl overflow-hidden shadow-2xl relative">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 dark:bg-teal-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="flex-1 p-10 md:p-16 text-white">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                Ready to scale your agency operations?
              </h2>
              <p className="text-teal-100 text-lg mb-10 max-w-md leading-relaxed">
                Join hundreds of development agencies that rely on Sevior to manage projects, teams, and billing seamlessly.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-700 dark:bg-teal-800 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-teal-100" />
                  </div>
                  <span className="text-teal-50 font-medium">Chat with our sales team</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-700 dark:bg-teal-800 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-teal-100" />
                  </div>
                  <span className="text-teal-50 font-medium">support@sevior.app</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 w-full p-10 md:p-16 lg:bg-white/10 lg:backdrop-blur-sm lg:border-l lg:border-white/20">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Request a Demo</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <Input id="name" placeholder="John Doe" required className="rounded-xl border-gray-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email</label>
                    <Input id="email" type="email" placeholder="john@agency.com" required className="rounded-xl border-gray-200 dark:border-gray-700" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                    <Input id="company" placeholder="Acme Digital" required className="rounded-xl border-gray-200 dark:border-gray-700" />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-gray-900 hover:bg-gray-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white rounded-xl font-bold text-md mt-2 shadow-md flex items-center justify-center">
                    Get in Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-6">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
