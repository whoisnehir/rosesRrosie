import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Warehouse, BarChart3, Plus, Trash2, Edit, Save, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// The sections of the panel: the tab id, its label and its icon.
const TABS = [
    { id: 'products', label: 'Products', Icon: Package },
    { id: 'warehouses', label: 'Warehouses', Icon: Warehouse },
    { id: 'stocks', label: 'Stock', Icon: BarChart3 },
];

// The admin panel. Below 768px the navigation is a bar at the top with the sections side by side;
// from 768px it is a sidebar on the left. The content always uses the rest of the width.
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const navigate = useNavigate();
    const { signOut } = useAuth();

    function handleSignOut() {
        signOut();
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-surface flex flex-col md:flex-row font-serif">
            <div className="bg-sidebar text-on-sidebar p-4 md:p-8 md:w-64 md:shrink-0 flex flex-col gap-4 md:gap-8">
                <div className="flex items-center justify-between md:block border-b border-on-sidebar/20 pb-4">
                    <h1 className="text-xl font-bold tracking-tighter">ADMIN PANEL</h1>
                    {/* On phones Sign out sits next to the title; on wider screens it moves to the bottom of the sidebar. */}
                    <SignOutButton onClick={handleSignOut} className="md:hidden" />
                </div>
                <nav aria-label="Admin sections" className="grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-4">
                    {TABS.map(({ id, label, Icon }) => (
                        <TabButton
                            key={id}
                            active={activeTab === id}
                            icon={<Icon size={20} aria-hidden="true" />}
                            label={label}
                            onClick={() => setActiveTab(id)}
                        />
                    ))}
                </nav>
                {/* mt-auto pushes the button to the bottom of the sidebar. */}
                <SignOutButton onClick={handleSignOut} className="hidden md:flex mt-auto" />
            </div>

            <div className="flex-1 min-w-0 p-4 md:p-12">
                <div className="bg-card rounded-3xl md:rounded-4xl p-5 md:p-10 border border-line/30 min-h-full">
                    {activeTab === 'products' && <ManageSection title="Product Management" itemLabel="Product" />}
                    {activeTab === 'warehouses' && <ManageSection title="Warehouse Management" itemLabel="Warehouse" />}
                    {activeTab === 'stocks' && <StockSection />}
                </div>
            </div>
        </div>
    );
};

const SignOutButton = ({ onClick, className }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-2 min-h-11 px-3 md:p-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-on-sidebar/10 ${className}`}
    >
        <LogOut size={20} aria-hidden="true" /> Sign out
    </button>
);

// Generic add/delete section, reused for products and warehouses
const ManageSection = ({ title, itemLabel }) => (
    <div>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center mb-8">
            <h2 className="text-2xl md:text-3xl text-ink italic">{title}</h2>
            <button
                type="button"
                className="self-start min-h-11 bg-accent text-on-accent px-6 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-accent-hover"
            >
                <Plus size={18} aria-hidden="true" /> Add New {itemLabel}
            </button>
        </div>
        <table className="w-full text-left">
            <thead>
                <tr className="text-secondary border-b border-line/30 uppercase text-xs tracking-widest">
                    <th className="py-4 px-2">ID</th>
                    <th className="py-4 px-2">Name / Details</th>
                    <th className="py-4 px-2 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-line/30 hover:bg-surface transition-colors">
                    <td className="py-4 px-2 font-mono text-xs">#001</td>
                    <td className="py-4 px-2 font-medium text-ink">Sample {itemLabel} Name</td>
                    <td className="py-4 px-2 text-right whitespace-nowrap">
                        <button
                            type="button"
                            aria-label={`Edit sample ${itemLabel.toLowerCase()}`}
                            className="inline-flex items-center justify-center size-11 text-ink hover:text-accent hover:bg-surface rounded-lg"
                        >
                            <Edit size={16} aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            aria-label={`Delete sample ${itemLabel.toLowerCase()}`}
                            className="inline-flex items-center justify-center size-11 text-accent hover:bg-surface rounded-lg"
                        >
                            <Trash2 size={16} aria-hidden="true" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

const StockSection = () => (
    <div>
        <h2 className="text-2xl md:text-3xl text-ink italic mb-8">Update Inventory Levels</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-surface rounded-2xl flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center border border-line/30">
                <div>
                    <p className="text-xs font-bold text-accent uppercase">Lipstick Rose Petal</p>
                    <p className="text-ink">Warehouse: Bucharest</p>
                </div>
                <div className="flex items-center gap-4">
                    <label htmlFor="stock-1" className="sr-only">
                        Stock of Lipstick Rose Petal in Bucharest
                    </label>
                    <input
                        id="stock-1"
                        type="number"
                        defaultValue="45"
                        className="w-20 min-h-11 p-2 rounded-xl text-center text-base md:text-sm bg-card border-2 border-line text-ink"
                    />
                    <button
                        type="button"
                        aria-label="Save the stock"
                        className="inline-flex items-center justify-center size-11 bg-primary text-on-primary rounded-xl hover:bg-primary-hover"
                    >
                        <Save size={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// One section button; aria-pressed tells screen readers which section is open.
const TabButton = ({ active, icon, label, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 min-h-11 p-2 md:p-4 rounded-2xl transition-colors font-bold text-xs uppercase tracking-widest ${active ? 'bg-accent text-on-accent' : 'hover:bg-on-sidebar/10'}`}
    >
        {icon} {label}
    </button>
);

export default AdminDashboard;
