import { useSyncExternalStore } from 'react';

// True while the screen matches the media query, e.g. '(min-width: 768px)'; updates when the screen changes.
export function useMediaQuery(query) {
    return useSyncExternalStore(
        (onChange) => {
            const mediaList = window.matchMedia(query);
            mediaList.addEventListener('change', onChange);
            return () => mediaList.removeEventListener('change', onChange);
        },
        () => window.matchMedia(query).matches,
    );
}
