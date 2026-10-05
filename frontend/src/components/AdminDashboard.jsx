import React, { useState } from 'react';
import { Package, Warehouse, BarChart3, Plus, Trash2, Edit, Save } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');

    return (
        <div className="min-h-screen bg-[#FDF0F2] flex font-serif">
            {/* Sidebar Admin */}
            <div className="w-64 bg-[#5C4033] text-white p-8 flex flex-col gap-8 shadow-2xl">
                <div className="text-xl font-bold tracking-tighter border-b border-white/20 pb-4">ADMIN PANEL</div>
                <nav className="flex flex-col gap-4">
                    <TabButton active={activeTab === 'products'} icon={<Package size={20}/>} label="Products" onClick={() => setActiveTab('products')} />
                    <TabButton active={activeTab === 'warehouses'} icon={<Warehouse size={20}/>} label="Warehouses" onClick={() => setActiveTab('warehouses')} />
                    <TabButton active={activeTab === 'stocks'} icon={<BarChart3 size={20}/>} label="Stock Management" onClick={() => setActiveTab('stocks')} />
                </nav>
            </div>

            {/* Zona de conținut */}
            <div className="flex-1 p-12 overflow-y-auto">
                <div className="bg-white rounded-[2rem] p-10 shadow-xl border-2 border-[#E8B4B8]/20 min-h-full">
                    {activeTab === 'products' && <ManageSection title="Product Management" itemLabel="Product" />}
                    {activeTab === 'warehouses' && <ManageSection title="Warehouse Management" itemLabel="Warehouse" />}
                    {activeTab === 'stocks' && <StockSection />}
                </div>
            </div>
        </div>
    );
};

// Componentă generică pentru Adăugare/Ștergere (Produse/Depozite)
const ManageSection = ({ title, itemLabel }) => (
    <div className="animate-in fade-in duration-500">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-[#5C4033] italic">{title}</h2>
            <button className="bg-[#E8B4B8] text-white px-6 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-[#d99fa3]">
                <Plus size={18} /> Add New {itemLabel}
            </button>
        </div>
        <table className="w-full text-left">
            <thead>
            <tr className="text-[#A67C52] border-b border-[#E8B4B8]/30 uppercase text-[10px] tracking-widest">
                <th className="py-4 px-2">ID</th>
                <th className="py-4 px-2">Name / Details</th>
                <th className="py-4 px-2 text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b border-pink-50 hover:bg-pink-50/30 transition-colors">
                <td className="py-4 px-2 font-mono text-xs">#001</td>
                <td className="py-4 px-2 font-medium text-[#5C4033]">Sample {itemLabel} Name</td>
                <td className="py-4 px-2 text-right">
                    <button className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                    <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg ml-2"><Trash2 size={16}/></button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
);

const StockSection = () => (
    <div className="animate-in fade-in duration-500">
        <h2 className="text-3xl text-[#5C4033] italic mb-8">Update Inventory Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#FDF0F2] rounded-2xl flex justify-between items-center border border-[#E8B4B8]/20">
                <div>
                    <p className="text-[10px] font-bold text-[#E8B4B8] uppercase">Lipstick Rose Petal</p>
                    <p className="text-[#5C4033]">Warehouse: Bucharest</p>
                </div>
                <div className="flex items-center gap-4">
                    <input type="number" defaultValue="45" className="w-20 p-2 rounded-xl text-center border-2 border-[#E8B4B8] text-[#5C4033] outline-none" />
                    <button className="p-3 bg-[#5C4033] text-white rounded-xl shadow-lg hover:scale-105 transition-transform"><Save size={16}/></button>
                </div>
            </div>
        </div>
    </div>
);

const TabButton = ({ active, icon, label, onClick }) => (
    <button onClick={onClick} className={`flex items-center gap-3 p-4 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest ${active ? 'bg-[#E8B4B8] text-white shadow-lg' : 'hover:bg-white/10'}`}>
        {icon} {label}
    </button>
);

export default AdminDashboard;