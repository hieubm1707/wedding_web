import "../styles/fonts.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { AppProvider } from "./contexts/AppContext";
import { HeroSection } from "./components/HeroSection";
import { getWishes, type Wish } from "./services/apiWrapper";

function WeddingApp() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishesLoading, setWishesLoading] = useState(true);

  useEffect(() => {
    setWishesLoading(true);
    getWishes()
      .then((data) => setWishes(data))
      .catch((err) => console.error("Failed to load wishes:", err))
      .finally(() => setWishesLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <HeroSection wishes={wishes} loading={wishesLoading} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<WeddingApp />} />
      </Routes>
    </AppProvider>
  );
}
