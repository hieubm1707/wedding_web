import "../styles/fonts.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { AppProvider } from "./contexts/AppContext";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { OurStory } from "./components/OurStory";
import { EventDetails } from "./components/EventDetails";
import { PhotoGallery } from "./components/PhotoGallery";
import { RSVPSection } from "./components/RSVPSection";
import { WishesSlider } from "./components/WishesSlider";
import { OurStoryVideo } from "./components/OurStoryVideo";
import { LocationSection } from "./components/LocationSection";
import { WeddingFooter } from "./components/WeddingFooter";
import { SettingsPanel } from "./components/SettingsPanel";
import { MusicButton } from "./components/MusicButton";
import { getWishes, addWish, type Wish, type WishInput } from "./services/apiWrapper";
import { InvitePage } from "./pages/InvitePage";

function WeddingApp() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishesLoading, setWishesLoading] = useState(true);

  useEffect(() => {
    getWishes()
      .then((data) => setWishes(data))
      .catch((err) => console.error("Failed to load wishes:", err))
      .finally(() => setWishesLoading(false));
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById("event-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddWish = async (data: WishInput): Promise<void> => {
    const created = await addWish(data);
    setWishes((prev) => [created, ...prev]);
  };

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* <NavBar /> */}
      <HeroSection onScrollDown={handleScrollDown} />
      {/* <OurStory /> */}
      <EventDetails />
      <PhotoGallery />
      <OurStoryVideo />
      <RSVPSection wishes={wishes} onAddWish={handleAddWish} />
      <WishesSlider wishes={wishes} loading={wishesLoading} />
      {/* <LocationSection /> */}
      <WeddingFooter />
      <MusicButton /> {/* OR <SettingsPanel /> */}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/" element={<WeddingApp />} />
      </Routes>
    </AppProvider>
  );
}
