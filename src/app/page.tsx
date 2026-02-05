"use client";

import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChildhoodGallery from "@/components/ChildhoodGallery";
import GapSection from "@/components/GapSection";
import CollegeSection from "@/components/CollegeSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#1a1f3c] animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <Navigation />
      <HeroSection settings={settings} />
      <ChildhoodGallery />
      <GapSection settings={settings} />
      <CollegeSection />
      <Footer />
    </main>
  );
}
