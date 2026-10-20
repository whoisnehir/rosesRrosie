import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Shared frame of every public page: the fixed header, the current page and the footer.
const RootLayout = () => (
    <div className="min-h-screen flex flex-col bg-page font-serif">
        <Navbar />
        <main className="flex-1 flex flex-col">
            <Outlet />
        </main>
        <footer className="border-t border-line/40 py-6 text-center text-xs text-muted">
            © {new Date().getFullYear()} rosesRrosie
        </footer>
    </div>
);

export default RootLayout;
