/** @type {import('tailwindcss').Config} */

/*
 * Paleta de colores corporativa – Grupo Energía Bogotá (GEB)
 * Fuente: Manual de marca corporativa GEB
 *
 * Colores primarios de identidad:
 *   Verde Lima    #99CF16  (Pantone 367C)
 *   Azul Cielo    #4FA0CA  (Pantone 298C)
 *   Negro         #000000  (Pantone Black)
 *   Azul Corp.    #3058A6  (Pantone 660C)
 *   Verde Inst.   #278A2A  (Pantone 7739C)
 *
 * Colores complementarios:
 *   Dorado        #DEA919  (Pantone P 10-15C)
 *   Turquesa      #1F9AA5  (Pantone P 118-15C)
 *   Magenta       #D71658  (Pantone P 68-15C)
 *   Gris          #808080  (Pantone P 176-4C)
 *   Naranja       #DB7113  (Pantone P 24-15C)
 */

module.exports = {
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        fontFamily: {
            sans: ['"Fira Sans"', 'Fira', 'system-ui', '-apple-system', 'sans-serif'],
            mono: ['"Fira Code"', '"Fira Mono"', 'ui-monospace', 'monospace'],
        },
        extend: {
            colors: {
                /* ─── Colores primarios de identidad GEB ─────────── */
                'geb-green': {
                    50: '#f5fce6',
                    100: '#e9f8c2',
                    200: '#d5f28a',
                    300: '#bee84d',
                    400: '#aadb25',
                    DEFAULT: '#99CF16',
                    500: '#99CF16',
                    600: '#7ba812',
                    700: '#5d800e',
                    800: '#41590f',
                    900: '#2d3d0f',
                    950: '#162204',
                },
                'geb-blue': {
                    50: '#eef7fb',
                    100: '#d5ecf6',
                    200: '#afd9ee',
                    300: '#7ec0e2',
                    400: '#4FA0CA',
                    DEFAULT: '#4FA0CA',
                    500: '#3688b5',
                    600: '#2b6d98',
                    700: '#27597c',
                    800: '#254b67',
                    900: '#234057',
                    950: '#17293a',
                },
                'geb-navy': {
                    50: '#eef3fb',
                    100: '#d9e4f5',
                    200: '#b9ceee',
                    300: '#8ab1e2',
                    400: '#5489d1',
                    DEFAULT: '#3058A6',
                    500: '#3058A6',
                    600: '#2a4e94',
                    700: '#253f78',
                    800: '#233764',
                    900: '#213054',
                    950: '#161f37',
                },
                'geb-emerald': {
                    50: '#effbef',
                    100: '#d7f5d8',
                    200: '#b1ebb4',
                    300: '#7ddb81',
                    400: '#47c44c',
                    DEFAULT: '#278A2A',
                    500: '#278A2A',
                    600: '#207a23',
                    700: '#1d6120',
                    800: '#1c4d1e',
                    900: '#19401b',
                    950: '#08230b',
                },

                /* ─── Colores complementarios GEB ────────────────── */
                'geb-gold': {
                    50: '#fdf8e8',
                    100: '#fbeec4',
                    200: '#f7da8b',
                    300: '#f2c148',
                    400: '#ecab1f',
                    DEFAULT: '#DEA919',
                    500: '#DEA919',
                    600: '#c08311',
                    700: '#9f5f11',
                    800: '#834b16',
                    900: '#6f3e17',
                    950: '#411f09',
                },
                'geb-teal': {
                    50: '#effafb',
                    100: '#d6f2f4',
                    200: '#b2e5ea',
                    300: '#7dd2db',
                    400: '#41b7c4',
                    DEFAULT: '#1F9AA5',
                    500: '#1F9AA5',
                    600: '#1d7d8c',
                    700: '#1e6573',
                    800: '#215360',
                    900: '#204652',
                    950: '#102d37',
                },
                'geb-magenta': {
                    50: '#fef1f4',
                    100: '#fde6eb',
                    200: '#fbc0d0',
                    300: '#f892ab',
                    400: '#f2597e',
                    DEFAULT: '#D71658',
                    500: '#D71658',
                    600: '#c20e4b',
                    700: '#a30c3e',
                    800: '#870d38',
                    900: '#740f34',
                    950: '#410319',
                },
                'geb-gray': {
                    50: '#f6f6f6',
                    100: '#e7e7e7',
                    200: '#d1d1d1',
                    300: '#b0b0b0',
                    400: '#808080',
                    DEFAULT: '#808080',
                    500: '#6d6d6d',
                    600: '#5d5d5d',
                    700: '#4f4f4f',
                    800: '#454545',
                    900: '#3d3d3d',
                    950: '#262626',
                },
                'geb-orange': {
                    50: '#fdf5ee',
                    100: '#fae7d4',
                    200: '#f4cca7',
                    300: '#edaa70',
                    400: '#e58540',
                    DEFAULT: '#DB7113',
                    500: '#DB7113',
                    600: '#c45810',
                    700: '#a34110',
                    800: '#853515',
                    900: '#6d2d15',
                    950: '#3b1508',
                },

                /* ─── Alias semánticos ───────────────────────────── */
                primary: {
                    light: '#5489d1',
                    DEFAULT: '#3058A6',
                    dark: '#213054',
                },
                secondary: {
                    light: '#7ec0e2',
                    DEFAULT: '#4FA0CA',
                    dark: '#234057',
                },
                accent: {
                    light: '#bee84d',
                    DEFAULT: '#99CF16',
                    dark: '#41590f',
                },
                success: {
                    light: '#47c44c',
                    DEFAULT: '#278A2A',
                    dark: '#19401b',
                },
                warning: {
                    light: '#f2c148',
                    DEFAULT: '#DEA919',
                    dark: '#6f3e17',
                },
                danger: {
                    light: '#f2597e',
                    DEFAULT: '#D71658',
                    dark: '#740f34',
                },
                info: {
                    light: '#41b7c4',
                    DEFAULT: '#1F9AA5',
                    dark: '#204652',
                },
            },
            borderRadius: {
                'geb': '0.5rem',
            },
            boxShadow: {
                'geb': '0 2px 8px 0 rgba(48, 88, 166, 0.10)',
                'geb-md': '0 4px 16px 0 rgba(48, 88, 166, 0.12)',
                'geb-lg': '0 8px 32px 0 rgba(48, 88, 166, 0.16)',
            },
        },
    },
    plugins: [],
};
