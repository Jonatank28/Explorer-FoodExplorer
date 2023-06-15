/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                roboto: 'var(--font-roboto)',
                poppins: 'var(--font-poppins)',
            },
            width: {
                default: 'min(1300px, 96%)'
            },
            colors: {
                dark: {
                    100: '#000405',
                    200: '#00070A',
                    300: '#000204',
                    400: '#000A0F',
                    500: '#000C12',
                    600: '#00111A',
                    700: '#001119',
                    800: '#0D161B',
                    800: '#0D161B',
                    900: '#0D1D25',
                    1000: '#192227'
                },
                light: {
                    100: '#FFFFFF',
                    200: '#FFFAF1',
                    300: '#E1E1E6',
                    400: '#C4C4CC',
                    500: '#7C7C8A',
                    600: '#76797B',
                    700: '#4D585E',
                },
                tints: {
                    Tomato100: '#750310',
                    Tomato200: '#92000E',
                    Tomato300: '#AB222E',
                    Tomato400: '#AB4D55',
                    Carrot: '#FBA94C',
                    Mint: '#04D361',
                    Cake100: '#065E7C',
                    Cake200: '#82F3FF'
                }
            }
        }
    },
    plugins: [],
}
