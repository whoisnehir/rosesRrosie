import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// React Router changes the page without reloading, so the browser keeps the old scroll position.
// When the visitor opens a new page (a link, not Back/Forward), start it from the top.
const ScrollToTop = () => {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        if (navigationType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [pathname, navigationType]);

    return null;
};

export default ScrollToTop;
