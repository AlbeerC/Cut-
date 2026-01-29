import FeaturesSection from "@/features/landing/components/FeaturesSection";
import HeroSection from "@/features/landing/components/HeroSection";
import CommunitySection from "@/features/landing/components/CommunitySection";
import { fetchTopWeeklyPlayers } from "../api/fetchTopWeeklyPlayers";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetchTopWeeklyPlayers().then(({ data }) => {
      setRanking(data ?? []);
    });
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CommunitySection ranking={ranking} />
    </>
  );
}
