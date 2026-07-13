import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, LayoutDashboard } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center group mb-4">
              <div className="relative w-14 h-14 rotate-[2deg] rounded-lg flex items-center justify-center overflow-hidden">
                <Image src="/1.png" alt="Sevior Logo" fill className="object-cover" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Sevior<span className="text-teal-600">.</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              The premium management platform for modern development agencies. Build faster, manage better.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Group 1 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Pricing</a></li>
              <li><a href="#changelog" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Changelog</a></li>
              <li><a href="#docs" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Links Group 2 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">About Us</a></li>
              <li><a href="#careers" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Careers</a></li>
              <li><a href="#blog" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Group 3 */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#terms" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#privacy" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#cookies" className="text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-500 text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-200 dark:border-gray-900 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Sevior. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Built with</span>
            <span className="text-red-500">❤️</span>
            <span>for development agencies.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
