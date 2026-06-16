import {
  currentYear,
  developedBy,
  developedByLink,
} from "../../../../context/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-6 bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Navigation Links */}
          <nav className="flex justify-center md:justify-start">
            <ul className="flex flex-wrap items-center gap-4 md:gap-6">
              <li>
                <Link 
                  href="/profile/about" 
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  target="_blank" 
                  href={developedByLink}
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-terms" 
                  className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  Privacy & terms
                </Link>
              </li>
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear}{" "}
              <Link
                target="_blank"
                href={developedByLink}
                className="font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                {developedBy}
              </Link>
              {" "}All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;