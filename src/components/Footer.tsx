"use client";

import { SiteSettings } from "@/lib/strapi";

interface Props {
  settings: SiteSettings | null;
}

const Footer = ({ settings }: Props) => {
  const tagline = settings?.footerTagline || "Every journey has a story. This is mine.";
  const copyrightYear = settings?.copyrightYear || "2026";
  const siteName = settings?.siteName || "The Unseen Journey";

  return (
    <footer className="bg-brown text-cream">
      {/* Spacer Section */}
      <div className="h-16 bg-cream"></div>
      
      {/* Main Footer */}
      <div className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-2xl sm:text-3xl lg:text-4xl italic text-cream/90 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            {tagline}
          </p>
          
          <p className="text-sm tracking-[0.2em] text-cream/50 uppercase">
            © {copyrightYear} {siteName}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
