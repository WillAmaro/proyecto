'use client';
import { useState } from 'react';
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
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from './nav';
import { colors } from './theme';

export const heroBg = `linear-gradient(100deg, ${colors.navyDeep} 20%, rgba(10,31,68,.75) 60%, rgba(244,140,80,.55) 100%)`;

const nav = [['Inicio', '/', HomeOutlinedIcon], ['Simulador', '/simulador', CalculateOutlinedIcon], ['Aranceles y Clasificación', '/aranceles', GavelOutlinedIcon], ['Puertos y Rutas', '/puertos', RouteOutlinedIcon]];
const W_OPEN = 252, W_MINI = 72, W_RAIL = 64;

function SidebarContent({ open, onToggle }) {
  const path = usePathname();
  return (
    <Stack sx={{ height: '100%', p: 1.5, justifyContent: 'space-between', color: '#fff' }}>
      <Box>
        <Stack direction={open ? 'row' : 'column'} alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 3, mt: .5 }}>
          <Stack direction="row" spacing={1} alignItems="center" component={Link} href="/" sx={{ textDecoration: 'none', color: 'inherit', pl: open ? 1 : 0 }}>
            <DirectionsBoatFilledIcon sx={{ fontSize: 32 }} />
            {open && <Box><Typography fontWeight={700} fontSize={20} lineHeight={1}>CargoSim</Typography><Typography fontSize={11} sx={{ opacity: .75 }}>Importa con confianza</Typography></Box>}
          </Stack>
          <Tooltip title={open ? 'Contraer menú' : 'Expandir menú'} placement="right">
            <IconButton onClick={onToggle} size="small" sx={{ color: '#fff' }} aria-label="Alternar menú">{open ? <MenuOpenIcon /> : <MenuIcon />}</IconButton>
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
          <HeadsetMicOutlinedIcon sx={{ mb: 1 }} />
          <Typography fontWeight={600} fontSize={15}>¿Necesitas ayuda?</Typography>
          <Typography fontSize={12} sx={{ opacity: .8, mb: 1.5 }}>Nuestro equipo de asesores está listo para ayudarte en todo el proceso.</Typography>
          <Button fullWidth variant="outlined" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,.5)' }}>Contactar asesor</Button>
        </Box>
      ) : (
        <Tooltip title="Contactar asesor" placement="right"><IconButton sx={{ color: '#fff', alignSelf: 'center' }}><HeadsetMicOutlinedIcon /></IconButton></Tooltip>
      )}
    </Stack>
  );
}

export function Shell({ children }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(true);
  const [mOpen, setMOpen] = useState(false);
  const w = mobile ? W_RAIL : open ? W_OPEN : W_MINI;
  const paper = { bgcolor: colors.navy, border: 0, overflowX: 'hidden' };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Drawer variant="permanent" sx={{ width: w, flexShrink: 0, transition: 'width .2s', '& .MuiDrawer-paper': { ...paper, width: w, transition: 'width .2s' } }}>
        <SidebarContent open={!mobile && open} onToggle={() => (mobile ? setMOpen(true) : setOpen(!open))} />
      </Drawer>
      {mobile && (
        <Drawer open={mOpen} onClose={() => setMOpen(false)} sx={{ '& .MuiDrawer-paper': { ...paper, width: W_OPEN } }}>
          <SidebarContent open onToggle={() => setMOpen(false)} />
        </Drawer>
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
      <Box sx={{ background: heroBg, color: '#fff', px: { xs: 2, md: 4 }, py: { xs: 3, md: 4.5 }, minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 }}>
        <Box sx={{ maxWidth: 680 }}>
          {back && <Button startIcon={<ArrowBackIcon />} size="small" onClick={() => go(back[1])} sx={{ color: '#fff', mb: 1, p: 0 }}>{back[0]}</Button>}
          <Typography variant="h4" sx={{ fontSize: { xs: 24, md: 32 } }}>{title}</Typography>
          <Typography sx={{ opacity: .85, mt: .5 }}>{subtitle}</Typography>
        </Box>
        {heroExtra}
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
