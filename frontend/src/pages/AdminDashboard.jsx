import { useState } from 'react';
import { Package, Warehouse, BarChart3, Plus, Trash2, Edit, Save } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="min-h-screen bg-surface flex font-serif">
            {/* Sidebar Admin */}
            <div className="w-64 bg-primary text-on-primary p-8 flex flex-col gap-8 shadow-2xl">
                <div className="text-xl font-bold tracking-tighter border-b border-on-primary/20 pb-4">ADMIN PANEL</div>
                <nav className="flex flex-col gap-4">
                    <TabButton
                        active={activeTab === 'products'}
                        icon={<Package size={20} />}
                        label="Products"
                        onClick={() => setActiveTab('products')}
                    />
                    <TabButton
                        active={activeTab === 'warehouses'}
                        icon={<Warehouse size={20} />}
                        label="Warehouses"
                        onClick={() => setActiveTab('warehouses')}
                    />
                    <TabButton
                        active={activeTab === 'stocks'}
                        icon={<BarChart3 size={20} />}
                        label="Stock Management"
                        onClick={() => setActiveTab('stocks')}
                    />
                </nav>
            </div>

            {/* Content zone */}
            <div className="flex-1 p-12 overflow-y-auto">
                <div className="bg-card rounded-4xl p-10 shadow-xl border-2 border-line/20 min-h-full">
                    {activeTab === 'products' && <ManageSection title="Product Management" itemLabel="Product" />}
                    {activeTab === 'warehouses' && <ManageSection title="Warehouse Management" itemLabel="Warehouse" />}
                    {activeTab === 'stocks' && <StockSection />}
                </div>
            </div>
        </div>
    );
};

// Generic add/delete section, reused for products and warehouses
const ManageSection = ({ title, itemLabel }) => (
    <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-ink italic">{title}</h2>
            <button className="bg-accent text-on-accent px-6 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-accent-hover">
                <Plus size={18} /> Add New {itemLabel}
            </button>
        </div>
        <table className="w-full text-left">
            <thead>
                <tr className="text-secondary border-b border-line/30 uppercase text-[10px] tracking-widest">
                    <th className="py-4 px-2">ID</th>
                    <th className="py-4 px-2">Name / Details</th>
                    <th className="py-4 px-2 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b border-pink-50 hover:bg-pink-50/30 transition-colors">
                    <td className="py-4 px-2 font-mono text-xs">#001</td>
                    <td className="py-4 px-2 font-medium text-ink">Sample {itemLabel} Name</td>
                    <td className="py-4 px-2 text-right">
                        <button className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg">
                            <Edit size={16} />
                        </button>
                        <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg ml-2">
                            <Trash2 size={16} />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

const StockSection = () => (
    <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl text-ink italic mb-8">Update Inventory Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface rounded-2xl flex justify-between items-center border border-line/20">
                <div>
                    <p className="text-[10px] font-bold text-accent uppercase">Lipstick Rose Petal</p>
                    <p className="text-ink">Warehouse: Bucharest</p>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="number"
                        defaultValue="45"
                        className="w-20 p-2 rounded-xl text-center border-2 border-line text-ink outline-none"
                    />
                    <button className="p-3 bg-primary text-on-primary rounded-xl shadow-lg hover:scale-105 transition-transform">
                        <Save size={16} />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const TabButton = ({ active, icon, label, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${active ? 'bg-accent text-on-accent shadow-lg' : 'hover:bg-on-primary/10'}`}
    >
        {icon} {label}
    </button>
);

export default AdminDashboard;
