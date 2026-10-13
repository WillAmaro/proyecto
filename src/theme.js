import { createTheme } from '@mui/material/styles';

export const colors = {
  navy: '#0A1F44',      // sidebar / fondos oscuros
  navyDeep: '#071633',
  primary: '#1565F0',   // botones y acentos
  ink: '#0F2A5F',       // títulos
  tint: '#EAF2FD',      // filas y totales
  bg: '#F4F8FE',
  line: '#E1E9F5',
  muted: '#5B6B8C',
};

export default createTheme({
  palette: {
    primary: { main: colors.primary },
    text: { primary: colors.ink, secondary: colors.muted },
    background: { default: colors.bg, paper: '#fff' },
    success: { main: '#1FA971' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
  },
});
