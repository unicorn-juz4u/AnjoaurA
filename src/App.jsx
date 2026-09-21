import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatYouGet from './components/WhatYouGet';
import OfferSection from './components/OfferSection';
import TrustPolicyBlock from './components/TrustPolicyBlock';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';
import LegalModal from './components/LegalModal';
import SuccessPage from './pages/SuccessPage';
import { trackEvent, ANALYTICS_EVENTS, initMetaPixel } from './utils/analytics';

function StorefrontPage({ onOpenModal }) {
  return (
    <main className="flex-1 pb-12 sm:pb-0">
      {/* 1. Hero: answers 4 questions above fold + live scarcity counter + CTA */}
      <Hero />

      {/* 2. Curriculum: 5 modules, single crisp explanation of each */}
      <WhatYouGet />

      {/* 3. Offer / Checkout: 4-line without/with comparison + pull-quote + progress + specific deliverables + Razorpay checkout */}
      <OfferSection onOpenModal={onOpenModal} />

      {/* 4. Trust & Policy Block: Calm, scannable security, delivery, refund, and support details */}
      <TrustPolicyBlock onOpenModal={onOpenModal} />
    </main>
  );
}

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
    <BrowserRouter>
      <div className="min-h-screen bg-[#EDE3CE] text-[#15120F] flex flex-col selection:bg-[#B8933E] selection:text-[#15120F] font-sans antialiased">
        {/* Sticky top navigation with brand logo, price badge, and dynamic route CTA */}
        <Navbar />

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<StorefrontPage onOpenModal={handleOpenModal} />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<StorefrontPage onOpenModal={handleOpenModal} />} />
        </Routes>

        {/* Footer with Compliance Disclaimer, Support, and Legal Triggers */}
        <Footer onOpenModal={handleOpenModal} />

        {/* Sticky Mobile Bottom CTA Bar (Active on Home page only) */}
        <StickyMobileCTA />

        {/* Legal & Policy Modal */}
        <LegalModal
          isOpen={modalState.isOpen}
          modalType={modalState.type}
          onClose={handleCloseModal}
        />
      </div>
    </BrowserRouter>
  );
}
