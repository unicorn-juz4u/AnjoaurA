/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind sees your Navbar and App files
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                'charcoal': '#1A1A1A',
                'anjo-gold': '#D4AF37',
            },
        },
    },
    plugins: [],
}