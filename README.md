# CargoSim (Next.js 15 + React 19 + Material UI)

    npm install
    npm run dev

Rutas (App Router, `src/app`): `/` · `/simulador` · `/simulador/lcl` · `/resultado` · `/desglose` · `/aranceles` · `/puertos`

- Pantallas en `src/views`, layout con barra lateral colapsable en `src/components.jsx`
- DatePickers: `@mui/x-date-pickers` (dayjs, locale `es`) configurado en `src/app/providers.jsx`
- Colores y tipografía (Inter): `src/theme.js` · Datos de ejemplo: `src/data.js`
- Sin login: las simulaciones son públicas.
