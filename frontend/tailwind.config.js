/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'flower-pink': '#E8B4B8',
                'flower-cream': '#FFF5F6',
                'flower-gold': '#A67C52',
                'flower-brown': '#5C4033',
            },
        },
    },
    plugins: [],
}