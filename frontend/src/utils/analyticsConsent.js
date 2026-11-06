// The visitor's answer to the analytics question, kept in this browser: 'granted', 'denied' or null (not asked yet).
const STORAGE_KEY = 'analytics-consent';

export function readConsent() {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        return value === 'granted' || value === 'denied' ? value : null;
    } catch {
        // Some browsers block storage (for example in private mode); then the visitor is simply asked again.
        return null;
    }
}

export function saveConsent(choice) {
    try {
        localStorage.setItem(STORAGE_KEY, choice);
    } catch {
        // The choice still applies for this visit, even if it cannot be remembered.
    }
}
