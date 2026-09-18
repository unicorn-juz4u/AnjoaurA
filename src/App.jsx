import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatYouGet from './components/WhatYouGet';
import ValueInOneScreen from './components/ValueInOneScreen';
import UseCasesSection from './components/UseCasesSection';
import ContrastSection from './components/ContrastSection';
import OfferSection from './components/OfferSection';
import FinalSection from './components/FinalSection';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';
import LegalModal from './components/LegalModal';
import { trackEvent, ANALYTICS_EVENTS, initMetaPixel } from './utils/analytics';

export default function App() {
  const [modalState, setModalState] = useState({ isOpen: false, type: 'privacy' });

  useEffect(() => {
    initMetaPixel();
    trackEvent(ANALYTICS_EVENTS.LANDING_PAGE_VIEW);
  }, []);

  const handleOpenModal = (type) => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: 'privacy' });
  };

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col selection:bg-yellow-400 selection:text-slate-950 font-sans antialiased">
      {/* Top minimal navigation bar */}
      <Navbar />

      {/* High-Conversion 6-Section Storefront */}
      <main className="flex-1 pb-12 sm:pb-0">
        {/* Section 1: Hero / Above the Fold (Immediate 5-10s clarity, Visual, ₹299, CTA) */}
        <Hero />

        {/* Section 2: What You Get (One Purchase. All 3 Resources.) */}
        <WhatYouGet />

        {/* Section 3: Value in One Screen (FROM IDEA -> TO SOMETHING YOU CAN SHOW) */}
        <ValueInOneScreen />

        {/* Section 4: What Can You Actually Use It For? (6 Compact Use Cases) */}
        <UseCasesSection />

        {/* Section 5: The "Without / With" Contrast (WHY START FROM ZERO?) */}
        <ContrastSection />

        {/* Section 5: The Offer & Direct Razorpay Checkout */}
        <OfferSection onOpenModal={handleOpenModal} />

        {/* Section 6: Final Friction Removal & Final CTA */}
        <FinalSection />
      </main>

      {/* Minimal Footer with legal links & support */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Sticky Mobile Bottom CTA: GET ALL 3 — ₹299 */}
      <StickyMobileCTA />

      {/* Legal & Policy Modals */}
      <LegalModal
        isOpen={modalState.isOpen}
        modalType={modalState.type}
        onClose={handleCloseModal}
      />
    </div>
  );
}
