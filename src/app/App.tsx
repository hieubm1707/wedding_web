import "../styles/fonts.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { AppProvider } from "./contexts/AppContext";
import { WishesSlideSection } from "./components/WishesSlideSection";
import { getWishes, type Wish } from "./services/apiWrapper";

function WeddingApp() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishesLoading, setWishesLoading] = useState(true);

  const loadWishes = useCallback(() => {
    setWishesLoading(true);
    getWishes()
      .then((data) => setWishes(data))
      .catch((err) => console.error("Failed to load wishes:", err))
      .finally(() => setWishesLoading(false));
  }, []);

  useEffect(() => {
    loadWishes();
  }, [loadWishes]);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <WishesSlideSection wishes={wishes} loading={wishesLoading} onRefetch={loadWishes} />
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
