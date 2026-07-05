"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/_components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg leading-none">S</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Sevior<span className="text-teal-600">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-600 hover:text-teal-600 dark:text-gray-300 dark:hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Log in
              </Button>
            </Link>
            <Link href="/login?tab=register">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6 font-semibold shadow-md hover:shadow-lg transition-all">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-xl py-4 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-gray-900 dark:text-white block py-2 border-b border-gray-100 dark:border-gray-900"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col space-y-3 pt-4">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">Log in</Button>
            </Link>
            <Link href="/login?tab=register" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center bg-teal-600 hover:bg-teal-700">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
