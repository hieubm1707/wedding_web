import "../styles/fonts.css";
import { useState, useEffect } from "react";
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
import { fetchWishes, createWish, type Wish, type WishInput } from "./services/wishApi";

function WeddingApp() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    fetchWishes()
      .then((data) => setWishes(data))
      .catch((err) => console.error("Failed to load wishes:", err));
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById("event-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddWish = async (data: WishInput): Promise<void> => {
    const created = await createWish(data);
    setWishes((prev) => [created, ...prev]);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* <NavBar /> */}
      <HeroSection onScrollDown={handleScrollDown} />
      {/* <OurStory /> */}
      <EventDetails />
      <PhotoGallery />
      <RSVPSection wishes={wishes} onAddWish={handleAddWish} />
      <WishesSlider wishes={wishes} />
      {/* <LocationSection /> */}
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
