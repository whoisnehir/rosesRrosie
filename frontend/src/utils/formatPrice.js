// The shop's base currency. Prices in the data are plain numbers in this currency.
// A currency picker can later change these two values in one place.
const LOCALE = 'ro-RO';
const CURRENCY = 'RON';

const priceFormatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY });

// 79.9 → "79,90 RON"
export function formatPrice(amount) {
    return priceFormatter.format(amount);
}
