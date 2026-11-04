import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import ScrollButtons from '../components/ScrollButtons';
import HelpButton from '../components/HelpButton';

// Shared frame of every public page: the fixed header, the current page and the footer.
const RootLayout = () => (
    <div className="min-h-screen flex flex-col bg-page font-serif">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 flex flex-col">
            <Outlet />
        </main>
        <Footer />
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
            <ScrollButtons />
            <HelpButton />
        </div>
    </div>
);

export default RootLayout;
