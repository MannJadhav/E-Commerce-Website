import React from "react";
import Hero from "../components/Hero"; // Check path and export
import LatestCollection from "../components/LatestCollection"; // Check path and export
import BestSeller from "../components/BestSeller"; // Check path and export
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
