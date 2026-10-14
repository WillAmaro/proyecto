'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, IconButton, Button, Paper, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from './nav';
import { colors } from './theme';

export const heroBg = `linear-gradient(100deg, ${colors.navyDeep} 20%, rgba(10,31,68,.75) 60%, rgba(244,140,80,.55) 100%)`;

const nav = [['Inicio', '/', HomeOutlinedIcon], ['Simulador', '/simulador', CalculateOutlinedIcon], ['Aranceles y Clasificación', '/aranceles', GavelOutlinedIcon], ['Puertos y Rutas', '/puertos', RouteOutlinedIcon]];
const W_OPEN = 252, W_MINI = 72, W_RAIL = 64;
const WHATSAPP_URL = 'https://wa.me/51938598840?text=Hola%2C%20necesito%20ayuda%20con%20mi%20cotizaci%C3%B3n.';

function SidebarContent({ open, onToggle }) {
  const path = usePathname();
  return (
    <Stack sx={{ height: '100%', p: 1.5, justifyContent: 'space-between', color: '#fff' }}>
      <Box>
        <Stack direction={open ? 'row' : 'column'} alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 3, mt: .5 }}>
          <Stack direction="row" spacing={1} alignItems="center" component={Link} href="/" sx={{ textDecoration: 'none', color: 'inherit', pl: open ? 1 : 0, borderRadius: 2, px: open ? 1 : 0, py: .5, bgcolor: open ? 'rgba(255,255,255,.06)' : 'transparent', border: '1px solid rgba(255,255,255,.08)' }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,.09)', border: '1px solid rgba(255,255,255,.15)' }}><DirectionsBoatFilledIcon sx={{ fontSize: 22 }} /></Box>
            {open && <Box><Typography fontWeight={700} fontSize={20} lineHeight={1}>HW LOGISTIC</Typography><Typography fontSize={11} sx={{ opacity: .75 }}>Importa con confianza</Typography></Box>}
          </Stack>
          <Tooltip title={open ? 'Contraer menú' : 'Expandir menú'} placement="right">
            <IconButton onClick={onToggle} size="small" sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }} aria-label="Alternar menú">{open ? <MenuOpenIcon /> : <MenuIcon />}</IconButton>
          </Tooltip>
        </Stack>
        <List disablePadding>
          {nav.map(([label, to, Icon]) => {
            const active = to === '/' ? path === '/' : path.startsWith(to);
            return (
              <Tooltip key={to} title={open ? '' : label} placement="right">
                <ListItemButton component={Link} href={to} selected={active}
                  sx={{ borderRadius: 2, mb: .5, minHeight: 46, justifyContent: open ? 'initial' : 'center', px: open ? 1.5 : 1, color: 'rgba(255,255,255,.85)',
                    '&.Mui-selected, &.Mui-selected:hover': { bgcolor: colors.primary, color: '#fff' }, '&:hover': { bgcolor: 'rgba(255,255,255,.08)' } }}>
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 0, mr: open ? 1.5 : 0, justifyContent: 'center' }}><Icon fontSize="small" /></ListItemIcon>
                  {open && <ListItemText primary={label} slotProps={{ primary: { fontSize: 14, fontWeight: 500, noWrap: true } }} />}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>
      {open ? (
        <Box sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)' }}>
          <WhatsAppIcon sx={{ mb: 1, fontSize: 26 }} />
          <Typography fontWeight={600} fontSize={15}>¿Necesitas ayuda?</Typography>
          <Typography fontSize={12} sx={{ opacity: .8, mb: 1.5 }}>Nuestro equipo de asesores está listo para ayudarte en todo el proceso.</Typography>
          <Button
            component="a"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            fullWidth
            variant="outlined"
            startIcon={<WhatsAppIcon />}
            sx={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,.5)',
              bgcolor: 'rgba(255,255,255,.04)',
              textDecoration: 'none',
              '&:hover': { bgcolor: 'rgba(255,255,255,.08)', borderColor: '#fff' },
            }}
          >
            Contactar asesor
          </Button>
        </Box>
      ) : (
        <Tooltip title="Contactar asesor" placement="right">
          <IconButton component="a" href={WHATSAPP_URL} target="_blank" rel="noreferrer" sx={{ color: '#fff', alignSelf: 'center', bgcolor: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }}><WhatsAppIcon /></IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}

export function Shell({ children }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(mobile ? false : true);
  const [mOpen, setMOpen] = useState(false);

  useEffect(() => {
    if (mobile) {
      setOpen(false);
      setMOpen(false);
    } else {
      setOpen(true);
    }
  }, [mobile]);

  const w = mobile ? W_RAIL : open ? W_OPEN : W_MINI;
  const paper = { bgcolor: colors.navy, border: 0, overflowX: 'hidden' };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: mobile ? 'column' : 'row' }}>
      {!mobile && (
        <Drawer variant="permanent" sx={{ width: w, flexShrink: 0, transition: 'width .2s', '& .MuiDrawer-paper': { ...paper, width: w, transition: 'width .2s' } }}>
          <SidebarContent open={open} onToggle={() => setOpen(!open)} />
        </Drawer>
      )}
      {mobile && (
        <>
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, px: 2, py: 1.25, bgcolor: colors.navy, color: '#fff', borderBottom: '1px solid rgba(255,255,255,.12)' }}>
            <Stack direction="row" spacing={1} alignItems="center" component={Link} href="/" sx={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
              <Box sx={{ width: 34, height: 34, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)' }}><DirectionsBoatFilledIcon sx={{ fontSize: 20 }} /></Box>
              <Box>
                <Typography fontWeight={700} fontSize={15} lineHeight={1.1}>HW LOGISTIC</Typography>
                <Typography fontSize={10} sx={{ opacity: .7 }}>Importa con confianza</Typography>
              </Box>
            </Stack>
            <IconButton onClick={() => setMOpen(true)} sx={{ color: '#fff', bgcolor: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)' }} aria-label="Abrir menú"><MenuIcon /></IconButton>
          </Box>
          <Drawer open={mOpen} onClose={() => setMOpen(false)} sx={{ '& .MuiDrawer-paper': { ...paper, width: W_OPEN } }}>
            <SidebarContent open onToggle={() => setMOpen(false)} />
          </Drawer>
        </>
      )}
      <Box component="main" sx={{ flex: 1, minWidth: 0, bgcolor: 'background.default' }}>{children}</Box>
    </Box>
  );
}
export const PublicLayout = Shell;

export function AppLayout({ title, subtitle, back, children, heroExtra }) {
  const go = useNavigate();
  return (
    <Shell>
      <Box sx={{ position: 'relative', overflow: 'hidden', background: heroBg, color: '#fff', px: { xs: 2, md: 4 }, py: { xs: 3, md: 4.5 }, minHeight: 172 }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top right, rgba(255,255,255,.18), transparent 24%), radial-gradient(circle at bottom left, rgba(255,177,77,.22), transparent 30%)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, minHeight: 112 }}>
          <Box sx={{ maxWidth: 720 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: .75, borderRadius: 999, bgcolor: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.18)', mb: 1.5 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#7CE2A7' }} />
              <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', opacity: .9 }}>Plataforma de carga</Typography>
            </Box>
            {back && <Button startIcon={<ArrowBackIcon />} size="small" onClick={() => go(back[1])} sx={{ color: '#fff', mb: 1, p: 0, opacity: .9 }}>{back[0]}</Button>}
            <Typography variant="h4" sx={{ fontSize: { xs: 24, md: 32 }, lineHeight: 1.15 }}>{title}</Typography>
            <Typography sx={{ opacity: .82, mt: .8, maxWidth: 600, fontSize: { xs: 14, md: 15 } }}>{subtitle}</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>{heroExtra}</Box>
        </Box>
      </Box>
      <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
    </Shell>
  );
}

export const Card = ({ children, sx, ...p }) => <Paper variant="outlined" sx={{ p: 2.5, borderColor: colors.line, borderRadius: 3, ...sx }} {...p}>{children}</Paper>;
export const SectionTitle = ({ icon: Icon, title, sub }) => (
  <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
    <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: colors.tint, color: 'primary.main', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon /></Box>
    <Box><Typography variant="h6" fontSize={17}>{title}</Typography>{sub && <Typography fontSize={13} color="text.secondary">{sub}</Typography>}</Box>
  </Stack>
);
export const TotalBar = ({ label, value, big }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ bgcolor: colors.tint, borderRadius: 2, px: 2, py: 1.25 }}>
    <Typography fontWeight={600}>{label}</Typography>
    <Typography fontWeight={700} fontSize={big ? 22 : 16} color={big ? 'primary.main' : 'text.primary'}>{value}</Typography>
  </Stack>
);
