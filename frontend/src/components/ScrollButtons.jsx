import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

// How close to the top or the bottom of the page (in pixels) counts as already being there.
const EDGE_DISTANCE_PX = 200;

// The two scroll buttons: one scrolls to the top of the page, the other to the bottom.
// Each one hides when it has nothing left to do, so on a page too short to scroll both stay hidden.
const ScrollButtons = () => {
    const [isNearTop, setIsNearTop] = useState(true);
    const [isNearBottom, setIsNearBottom] = useState(true);
    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

    useEffect(() => {
        function updatePosition() {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            setIsNearTop(window.scrollY < EDGE_DISTANCE_PX);
            setIsNearBottom(window.scrollY > maxScroll - EDGE_DISTANCE_PX);
        }

        updatePosition();
        window.addEventListener('scroll', updatePosition, { passive: true });
        window.addEventListener('resize', updatePosition);
        // The page also grows without any scrolling, for example when the products finish loading.
        const resizeObserver = new ResizeObserver(updatePosition);
        resizeObserver.observe(document.body);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
            resizeObserver.disconnect();
        };
    }, []);

    function scrollToPosition(top) {
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }

    const buttonClasses =
        'h-11 w-11 grid place-items-center rounded-full bg-card text-ink border border-line shadow-lg transition-[opacity,visibility] duration-300 hover:text-accent';
    const hiddenClasses = 'invisible opacity-0';

    return (
          <div className="flex flex-col gap-2">
            <button
                type="button"
                onClick={() => scrollToPosition(0)}
                aria-label="Back to top"
                className={`${buttonClasses} ${isNearTop ? hiddenClasses : ''}`}
            >
                <ChevronUp size={20} />
            </button>
            <button
                type="button"
                onClick={() => scrollToPosition(document.documentElement.scrollHeight)}
                aria-label="Go to bottom"
                className={`${buttonClasses} ${isNearBottom ? hiddenClasses : ''}`}
            >
                <ChevronDown size={20} />
            </button>
        </div>
    );
};

export default ScrollButtons;
