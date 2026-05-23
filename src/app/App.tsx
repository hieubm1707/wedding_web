import "../styles/fonts.css";
import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { AppProvider } from "./contexts/AppContext";
import { WishesSlideSection } from "./components/WishesSlideSection";
import { getWishes, type Wish } from "./services/apiWrapper";
import { RSVPSection } from "./components/RSVPSection";

function WeddingApp() {
  const [wishes, setWishes] = useState<Wish[]>([]);

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <RSVPSection wishes={wishes} />
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
