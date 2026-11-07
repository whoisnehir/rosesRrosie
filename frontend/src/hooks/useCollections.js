import { useEffect, useState } from 'react';
import { collectionService } from '../services/collectionService';

// The list of collections for any component that needs it (menus, Home, Collections page).
// status is 'loading' while waiting for the service, then 'ready' or 'error'.
export function useCollections() {
    const [collections, setCollections] = useState([]);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        // Stops a late answer from updating a component that is no longer on the page.
        let isCurrent = true;

        collectionService
            .getAll()
            .then((data) => {
                if (isCurrent) {
                    setCollections(data);
                    setStatus('ready');
                }
            })
            .catch((error) => {
                console.error('Could not load the collections:', error);
                if (isCurrent) {
                    setStatus('error');
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    return { collections, status };
}
