"use client";

import { Nav } from "@/components/site/nav";
import { StickyCTA } from "@/components/site/sticky-cta";
import { Footer } from "@/components/site/footer";
import { ColdOpenHero } from "@/components/sections/cold-open-hero";
import { RealProblem } from "@/components/sections/real-problem";
import { AscendMethod } from "@/components/sections/ascend-method";
import { ChooseNextScene } from "@/components/sections/choose-next-scene";
import { AscendCommunity } from "@/components/sections/ascend-community";
import { RajaStory } from "@/components/sections/raja-story";
import { TransformationStories } from "@/components/sections/transformation-stories";
import { TheRajaCut } from "@/components/sections/the-raja-cut";
import { RajaKit } from "@/components/sections/raja-kit";
import { OneToOneConsultation } from "@/components/sections/one-to-one-consultation";
import { BrandPartnerships } from "@/components/sections/brand-partnerships";
import { Contact } from "@/components/sections/contact";
import { FinalAscent } from "@/components/sections/final-ascent";

export default function Home() {
  return (
    <div className="site-shell bg-obsidian">
      <Nav />
      <StickyCTA />
      <main className="site-main">
        {/* 1 — THE COLD OPEN */}
        <ColdOpenHero />
        {/* 2 — THE REAL PROBLEM */}
        <RealProblem />
        {/* 3 — THE ASCEND METHOD */}
        <AscendMethod />
        {/* 4 — CHOOSE YOUR NEXT SCENE */}
        <ChooseNextScene />
        {/* 5 — ASCEND COMMUNITY */}
        <AscendCommunity />
        {/* 6 — RAJA'S STORY */}
        <RajaStory />
        {/* 7 — TRANSFORMATION STORIES */}
        <TransformationStories />
        {/* 8 — THE RAJA CUT */}
        <TheRajaCut />
        {/* 9 — RAJA'S KIT */}
        <RajaKit />
        {/* 10 — ONE-TO-ONE CONSULTATION */}
        <OneToOneConsultation />
        {/* 11 — BRAND PARTNERSHIPS */}
        <BrandPartnerships />
        {/* 12 — CONTACT */}
        <Contact />
        {/* 13 — FINAL ASCENT */}
        <FinalAscent />
      </main>
      <Footer />
    </div>
  );
}
