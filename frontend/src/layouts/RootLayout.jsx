import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import ScrollButtons from '../components/ScrollButtons';

// Shared frame of every public page: the fixed header, the current page and the footer.
const RootLayout = () => (
    <div className="min-h-screen flex flex-col bg-page font-serif">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1 flex flex-col">
            <Outlet />
        </main>
        <Footer />
        <ScrollButtons />
    </div>
);

export default RootLayout;
