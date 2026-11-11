import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { warehouseService } from '../services/warehouseService';

// The rosesRrosie locations as a simple list: a pin, the city and the address of each one.
const WarehousePage = () => {
    const [warehouses, setWarehouses] = useState([]);
    // 'loading' while waiting for the service, then 'ready' or 'error'.
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // Stops a late answer from updating the page after the visitor has left it.
        let isCurrent = true;

        warehouseService
            .getAll()
            .then((data) => {
                if (isCurrent) {
                    setWarehouses(data);
                    setStatus('ready');
                }
            })
            .catch((error) => {
                console.error('Could not load the locations:', error);
                if (isCurrent) {
                    setStatus('error');
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    return (
        <section className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-12">
            <h1 className="text-5xl text-ink font-light text-center">Our Warehouses</h1>
            <p className="mt-4 text-center text-secondary italic">Where every rosesRrosie order is gathered and sent.</p>

            {status === 'loading' && (
                <p role="status" className="mt-10 text-center text-secondary italic">
                    Loading the locations...
                </p>
            )}

            {status === 'error' && (
                <p role="alert" className="mt-10 text-center text-secondary italic">
                    We could not load the locations. Please try again later.
                </p>
            )}

            {status === 'ready' && warehouses.length === 0 && (
                <p className="mt-10 text-center text-secondary italic">There are no locations yet.</p>
            )}

            {status === 'ready' && warehouses.length > 0 && (
                <ul className="mt-12 max-w-2xl mx-auto divide-y divide-line/60 border-y border-line/60">
                    {warehouses.map(({ id, city, address }) => (
                        <li key={id} className="py-6 flex items-start gap-4">
                            <MapPin size={22} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-ink">{city}</h2>
                                <p className="mt-1 text-secondary">{address}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default WarehousePage;