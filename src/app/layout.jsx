import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import Providers from './providers';

export const metadata = { title: 'CargoSim · Importa con confianza', description: 'Simulador de costos de importación a Perú' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AppRouterCacheProvider><Providers>{children}</Providers></AppRouterCacheProvider>
      </body>
    </html>
  );
}
