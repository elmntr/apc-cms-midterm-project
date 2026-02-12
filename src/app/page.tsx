import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ChildhoodGallery from "@/components/ChildhoodGallery";
import GapSection from "@/components/GapSection";
import CollegeSection from "@/components/CollegeSection";
import Footer from "@/components/Footer";
import { getSiteSettings, getPhotoCategories, getHobbies } from "@/lib/strapi";

export default async function Home() {
  const [settings, childhoodPhotos, collegePhotos, hobbies] = await Promise.all([
    getSiteSettings(),
    getPhotoCategories('childhood'),
    getPhotoCategories('college'),
    getHobbies(),
  ]);

  return (
    <main className="bg-cream">
      <Navigation settings={settings} />
      <HeroSection settings={settings} />
      <ChildhoodGallery photos={childhoodPhotos} settings={settings} />
      <GapSection settings={settings} hobbies={hobbies} />
      <CollegeSection photos={collegePhotos} settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
