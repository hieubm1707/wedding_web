import "../styles/fonts.css";
import { useState } from "react";
import { AppProvider } from "./contexts/AppContext";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { OurStory } from "./components/OurStory";
import { EventDetails } from "./components/EventDetails";
import { PhotoGallery } from "./components/PhotoGallery";
import { RSVPSection } from "./components/RSVPSection";
import { WishesSlider } from "./components/WishesSlider";
import { LocationSection } from "./components/LocationSection";
import { WeddingFooter } from "./components/WeddingFooter";
import { SettingsPanel } from "./components/SettingsPanel";

interface Wish {
  id: string;
  name: string;
  message: string;
  attending: string;
  timestamp: string;
}

function WeddingApp() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  const handleScrollDown = () => {
    const el = document.getElementById("our-story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddWish = (wish: Wish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <NavBar />
      <HeroSection onScrollDown={handleScrollDown} />
      <OurStory />
      <EventDetails />
      <PhotoGallery />
      <RSVPSection wishes={wishes} onAddWish={handleAddWish} />
      <WishesSlider wishes={wishes} />
      <LocationSection />
      <WeddingFooter />
      <SettingsPanel />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <WeddingApp />
    </AppProvider>
  );
}
