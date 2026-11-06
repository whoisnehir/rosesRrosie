import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import ScrollButtons from '../components/ScrollButtons';
import HelpButton from '../components/HelpButton';
import { useEffect, useState } from 'react';
import ConsentBanner from '../components/ConsentBanner';
import { isAnalyticsConfigured, loadAnalytics, stopAnalytics } from '../services/analytics';
import { readConsent, saveConsent } from '../utils/analyticsConsent';

// Shared frame of every public page: the fixed header, the current page and the footer and the analytics consent banner.
const RootLayout = () => {
    // 'granted', 'denied' or null when the visitor has not answered yet.
    const [consent, setConsent] = useState(readConsent);
    // True while the visitor reviews the choice again, opened from Cookie settings in the footer.
    const [isReviewingConsent, setIsReviewingConsent] = useState(false);

    useEffect(() => {
        if (consent === 'granted') {
            loadAnalytics();
        }
    }, [consent]);

    function chooseConsent(choice) {
        saveConsent(choice);
        if (choice === 'denied') {
            stopAnalytics();
        }
        setConsent(choice);
        setIsReviewingConsent(false);
    }

    const showBanner = isAnalyticsConfigured && (consent === null || isReviewingConsent);

    return (
        <div className="min-h-screen flex flex-col bg-page font-serif">
            <ScrollToTop />
            <Navbar />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer onOpenCookieSettings={isAnalyticsConfigured ? () => setIsReviewingConsent(true) : undefined} />
            {/* The floating buttons, stacked in the bottom-right corner, below the navbar (z-50). */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
                <ScrollButtons />
                <HelpButton />
            </div>
            {showBanner && (
                <ConsentBanner
                    onAccept={() => chooseConsent('granted')}
                    onDecline={() => chooseConsent('denied')}
                    focusOnOpen={isReviewingConsent}
                />
            )}
        </div>
    );
};

export default RootLayout;
