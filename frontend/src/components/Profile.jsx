import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import {
    User,
    Mail,
    Settings,
    ShoppingBag,
    ArrowLeft,
    Save,
    MapPin,
    Phone,
    CreditCard,
    Fingerprint,
} from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();

    const [view, setView] = useState('dashboard'); // dashboard | settings | orders
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await userService.getUserProfile(1);
                setUser(data);
                setFormData(data);
                setLoading(false);
            } catch (err) {
                console.error('Error loading user', err);
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updated = await userService.updateProfile(formData);
            setUser(updated);
            setView('dashboard');
            alert('✨ Settings updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Error updating profile.');
        }
    };

    if (loading)
        return (
            <div className="min-h-screen bg-page flex items-center justify-center font-serif italic text-secondary">
                Opening the sanctuary...
            </div>
        );

    return (
        <div className="min-h-screen bg-page flex items-center justify-center p-8 font-serif">
            <div className="max-w-4xl w-full bg-card shadow-2xl rounded-[3rem] border-[6px] border-line relative overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                {/* Buton Back general */}
                <button
                    onClick={() => (view === 'dashboard' ? navigate('/') : setView('dashboard'))}
                    className="absolute top-8 left-8 flex items-center gap-2 text-secondary hover:text-accent font-bold uppercase text-[10px] tracking-widest z-30 transition-all"
                >
                    <ArrowLeft size={16} /> {view === 'dashboard' ? 'Back to Shop' : 'Back to Profile'}
                </button>

                {/* SIDEBAR: Info */}
                <div className="md:w-1/3 bg-surface p-10 pt-24 flex flex-col items-center border-r-2 border-line/30">
                    <div className="w-32 h-32 rounded-full border-4 border-card shadow-lg bg-card flex items-center justify-center text-accent mb-6">
                        <User size={60} />
                    </div>
                    <h2 className="text-xl text-ink tracking-widest font-bold text-center uppercase mb-2">
                        {user?.name}
                    </h2>
                    <p className="text-secondary italic text-sm mb-6">{user?.email}</p>

                    <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-full border border-line/20">
                        <Fingerprint size={14} className="text-accent" />
                        <span className="text-[10px] uppercase font-bold text-secondary">ID: {user?.id}</span>
                    </div>
                </div>

                {/* MAIN CONTENT Area */}
                <div className="md:w-2/3 p-14 pt-24 relative">
                    {/* View 1: DASHBOARD */}
                    {view === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <h3 className="text-2xl text-secondary italic mb-10 border-b border-line/40 pb-4 tracking-tight">
                                Welcome to your Sanctuary
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <MenuButton
                                    icon={<Settings size={24} />}
                                    title="Account Settings"
                                    desc="Update your personal information, address and phone"
                                    onClick={() => setView('settings')}
                                />
                                <MenuButton
                                    icon={<ShoppingBag size={24} />}
                                    title="My Orders"
                                    desc="Track, view or return your previous floral purchases"
                                    onClick={() => setView('orders')}
                                />
                            </div>
                        </div>
                    )}

                    {/* View 2: ACCOUNT SETTINGS */}
                    {view === 'settings' && (
                        <div className="animate-in slide-in-from-right duration-500">
                            <h3 className="text-2xl text-secondary italic mb-8 flex items-center gap-3">
                                <Settings size={22} /> Account Settings
                            </h3>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <EditField
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        icon={<User />}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <EditField
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        icon={<Mail />}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <EditField
                                        label="Phone"
                                        name="phone"
                                        value={formData.phone}
                                        icon={<Phone />}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                    <EditField
                                        label="Payment"
                                        name="defaultPaymentMethod"
                                        value={formData.defaultPaymentMethod}
                                        icon={<CreditCard />}
                                        onChange={(e) =>
                                            setFormData({ ...formData, defaultPaymentMethod: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="pt-2">
                                    <EditField
                                        label="Shipping Address"
                                        name="defaultAddress"
                                        value={formData.defaultAddress}
                                        icon={<MapPin />}
                                        onChange={(e) => setFormData({ ...formData, defaultAddress: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-8 w-full bg-primary text-on-primary py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary-hover transition-all flex items-center justify-center gap-3 shadow-xl"
                                >
                                    <Save size={18} /> Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {/* View 3: MY ORDERS (Placeholder) */}
                    {view === 'orders' && (
                        <div className="animate-in slide-in-from-right duration-500 text-center py-20">
                            <ShoppingBag size={48} className="mx-auto text-accent opacity-30 mb-4" />
                            <h3 className="text-xl text-ink">No orders yet.</h3>
                            <p className="text-secondary italic mt-2">Your floral journey is just beginning.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MenuButton = ({ icon, title, desc, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-6 p-6 rounded-3xl bg-page border-2 border-transparent hover:border-line hover:bg-card transition-all text-left group"
    >
        <div className="p-4 bg-card rounded-2xl text-accent group-hover:text-ink shadow-sm transition-colors">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-ink uppercase text-xs tracking-widest mb-1">{title}</h4>
            <p className="text-secondary text-[11px] italic leading-tight">{desc}</p>
        </div>
    </button>
);

const EditField = ({ label, icon, value, onChange, name }) => (
    <div className="space-y-1">
        <label className="text-[9px] uppercase font-bold text-accent tracking-[0.2em] ml-2">{label}</label>
        <div className="flex items-center gap-3 px-4 py-3 bg-surface rounded-2xl border border-transparent focus-within:border-line focus-within:bg-card transition-all">
            <span className="text-accent">{React.cloneElement(icon, { size: 16 })}</span>
            <input
                name={name}
                value={value || ''}
                onChange={onChange}
                className="w-full bg-transparent outline-none text-xs text-ink"
            />
        </div>
    </div>
);

export default Profile;
