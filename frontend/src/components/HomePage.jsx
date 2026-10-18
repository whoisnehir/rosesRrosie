import { useNavigate } from 'react-router-dom';
import { User, Heart, Warehouse, ShoppingCart, LogIn, Settings } from 'lucide-react';

const HomePage = ({ isLoggedIn, userRole }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-page font-serif">
            <nav className="bg-card/90 backdrop-blur-md border-b border-line sticky top-0 z-50 px-8 py-4 shadow-sm text-ink">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div onClick={() => navigate('/')} className="text-2xl font-bold tracking-tighter cursor-pointer">
                        roses<span className="text-accent">R</span>rosie
                    </div>

                    <div className="flex items-center gap-6">
                        <NavIcon
                            icon={<Warehouse size={20} />}
                            label="Warehouses"
                            onClick={() => navigate('/warehouses')}
                        />
                        <NavIcon icon={<ShoppingCart size={20} />} label="Cart" onClick={() => navigate('/cart')} />

                        {isLoggedIn ? (
                            <>
                                {userRole === 'USER' ? (
                                    <>
                                        <NavIcon
                                            icon={<Heart size={20} />}
                                            label="Wishlist"
                                            onClick={() => navigate('/wishlist')}
                                        />
                                        <div className="h-8 w-[1px] bg-line/30 mx-2"></div>
                                        <NavIcon
                                            icon={<User size={20} />}
                                            label="My Profile"
                                            onClick={() => navigate('/profile')}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <div className="h-8 w-[1px] bg-line/30 mx-2"></div>
                                        <button
                                            onClick={() => navigate('/admin')}
                                            className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary-hover"
                                        >
                                            <Settings size={16} /> Admin Panel
                                        </button>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="flex gap-4 ml-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="flex items-center gap-2 text-muted text-[10px] font-bold uppercase tracking-widest hover:text-accent"
                                >
                                    <LogIn size={16} /> Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-accent text-on-accent px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent-hover"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="py-20 text-center">
                <h1 className="text-6xl text-ink font-light">
                    The Bloom <span className="italic">Collection</span>
                </h1>
            </div>
        </div>
    );
};

const NavIcon = ({ icon, label, onClick }) => (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer hover:text-accent transition-all group">
        <div className="group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[8px] uppercase font-bold mt-1 tracking-tighter">{label}</span>
    </div>
);

export default HomePage;
