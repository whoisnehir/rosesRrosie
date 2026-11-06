// Google Analytics 4, loaded only after the visitor accepts. The ID comes from the VITE_GA_ID variable;
// without it (for example on a fork of the repo) nothing is loaded and no banner is shown.
const GA_ID = import.meta.env.VITE_GA_ID;

export const isAnalyticsConfigured = Boolean(GA_ID);

let isLoaded = false;

export function loadAnalytics() {
    if (!GA_ID) {
        return;
    }
    // Lets Analytics send data again if the visitor had declined earlier in this visit.
    window[`ga-disable-${GA_ID}`] = false;
    if (isLoaded) {
        return;
    }
    isLoaded = true;

    // The standard Google tag setup: a queue of commands that the script reads once it has loaded.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
        // Google's script expects the original arguments object, not an array.
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    // Page views, including the page changes inside the app, come from Enhanced measurement in GA4.
    window.gtag('config', GA_ID);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
}

export function stopAnalytics() {
    if (!GA_ID) {
        return;
    }
    // Google's documented switch that stops the tag from sending anything more.
    window[`ga-disable-${GA_ID}`] = true;
    // Removes the Analytics cookies (_ga and _ga_<id>) from this site.
    const cookieNames = document.cookie
        .split(';')
        .map((cookie) => cookie.split('=')[0].trim())
        .filter((name) => name === '_ga' || name.startsWith('_ga_'));
    for (const name of cookieNames) {
        document.cookie = `${name}=; Max-Age=0; path=/`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
    }
}
