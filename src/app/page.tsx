"use client";

import useLenis from "@/hooks/useLenis";
import Hero from "@/components/Hero/Hero";
import Introduction from "@/components/Introduction/Introduction";
import BentoGallery from "@/components/BentoGallery/BentoGallery";
import PartyLeadership from "@/components/PartyLeadership/PartyLeadership";
import VideoShowcase from "@/components/VideoShowcase/VideoShowcase";
import GovernmentStructure from "@/components/GovernmentStructure/GovernmentStructure";
import PowerDivision from "@/components/PowerDivision/PowerDivision";
import Accountability from "@/components/Accountability/Accountability";
import Quiz from "@/components/Quiz/Quiz";
import Kahoot from "@/components/Kahoot/Kahoot";

export default function Page() {
  useLenis();

  return (
    <main>
      <Hero />
      <Introduction />
      <BentoGallery />
      <PartyLeadership />
      <VideoShowcase />
      <PowerDivision />
      <Accountability />
      <Quiz />
      {/* <Kahoot /> */}
    </main>
  );
}
