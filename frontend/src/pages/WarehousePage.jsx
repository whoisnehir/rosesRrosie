import { MapPin, Warehouse } from 'lucide-react';

const WarehousePage = () => (
    <div className="min-h-screen bg-page p-12 font-serif text-ink">
        <h1 className="text-4xl text-center mb-12 italic text-secondary">Our Magical Warehouses</h1>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <WarehouseCard city="Bucharest" address="Central Rose Garden, Sector 1" stock="High" />
            <WarehouseCard city="Cluj-Napoca" address="Transylvanian Bloom St. 45" stock="Medium" />
        </div>
    </div>
);

const WarehouseCard = ({ city, address, stock }) => (
    <div className="bg-card p-8 rounded-4xl border-2 border-line shadow-lg">
        <div className="flex items-center gap-4 mb-4 text-accent">
            <Warehouse size={32} />
            <h2 className="text-2xl font-bold uppercase tracking-widest">{city}</h2>
        </div>
        <p className="text-secondary flex items-center gap-2">
            <MapPin size={16} /> {address}
        </p>
        <div className="mt-6 text-[10px] font-bold uppercase tracking-widest text-ink">
            Availability: <span className="text-green-400">{stock} Stock</span>
        </div>
    </div>
);

export default WarehousePage;
