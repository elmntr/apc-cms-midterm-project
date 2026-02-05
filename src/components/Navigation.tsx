"use client";

import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link href="/" className="font-playfair text-lg text-gray-900">
            The Unseen Journey
          </Link>

          <div className="hidden md:flex gap-8">
            <Link
              href="#home"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#childhood"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              The Early Years
            </Link>
            <Link
              href="#gap"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              The Gap
            </Link>
            <Link
              href="#college"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              The Present
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#home" className="block py-2 text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="#childhood" className="block py-2 text-gray-600 hover:text-gray-900">
              The Early Years
            </Link>
            <Link href="#gap" className="block py-2 text-gray-600 hover:text-gray-900">
              The Gap
            </Link>
            <Link href="#college" className="block py-2 text-gray-600 hover:text-gray-900">
              The Present
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
