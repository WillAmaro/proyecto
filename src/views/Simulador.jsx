'use client';
import { useState } from 'react';
import { useNavigate } from '../nav';
import { Grid, Typography, Stack, Button, ToggleButton, ToggleButtonGroup, Box, TextField, MenuItem } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppLayout, Card } from '../components';
import { colors } from '../theme';
import { ports, containers } from '../data';

const types = {
  FCL: { icon: Inventory2OutlinedIcon, title: 'FCL (Contenedor completo)', desc: 'Usa un contenedor exclusivo para tu carga.', perks: ['Ideal para grandes volúmenes', 'Mayor seguridad', 'Tarifa fija por contenedor'], to: '/resultado' },
  LCL: { icon: ViewInArOutlinedIcon, title: 'LCL (Carga suelta)', desc: 'Consolida tu mercancía y paga solo por el espacio que usas.', perks: ['Menor costo por volumen', 'Ideal para cargas pequeñas', 'Gestión completa de la consolidación'], to: '/simulador/lcl' },
};

export default function Simulador() {
  const nav = useNavigate();
  const [t, setT] = useState('LCL');
  return (
    <AppLayout title="Simulador de importación" subtitle="Elige el tipo de carga y define la ruta para calcular tu costo.">
      <Grid container spacing={3}>
        {Object.entries(types).map(([k, v]) => {
          const on = t === k;
          return (
            <Grid key={k} size={{ xs: 12, md: 6 }}>
              <Card onClick={() => setT(k)} sx={{ cursor: 'pointer', borderColor: on ? 'primary.main' : colors.line, borderWidth: on ? 2 : 1, bgcolor: on ? colors.tint : '#fff' }}>
                <Stack direction="row" spacing={2}>
                  <v.icon sx={{ fontSize: 44, color: 'primary.main' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{v.title}</Typography>
                    <Typography fontSize={14} color="text.secondary" sx={{ mb: 1 }}>{v.desc}</Typography>
                    {v.perks.map((p) => <Stack key={p} direction="row" spacing={1} alignItems="center"><CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} /><Typography fontSize={13}>{p}</Typography></Stack>)}
                  </Box>
                </Stack>
              </Card>
            </Grid>
          );
        })}
        <Grid size={12}>
          <Card>
            <Typography variant="h6" sx={{ mb: 2 }}>Ruta y mercancía</Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 3 }}><TextField select label="Origen" defaultValue="CNSHA">{ports.filter((p) => !p.peru).map((p) => <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 12, md: 3 }}><TextField select label="Destino" defaultValue="PECLL">{ports.filter((p) => p.peru).map((p) => <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 12, md: 3 }}><TextField label="Mercancía (HS)" defaultValue="Celulares inteligentes (8517.12.00.00)" /></Grid>
              <Grid size={{ xs: 12, md: 3 }}><TextField select label="Incoterm" defaultValue="FOB">{['EXW', 'FOB', 'CIF'].map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}</TextField></Grid>
              <Grid size={{ xs: 12, md: 3 }}><DatePicker label="Fecha estimada de embarque" disablePast slotProps={{ textField: { size: "small", fullWidth: true } }} /></Grid>
              {t === 'FCL' && <Grid size={{ xs: 12, md: 3 }}><TextField select label="Contenedor" defaultValue={containers[0]}>{containers.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></Grid>}
            </Grid>
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => nav(types[t].to)}>Continuar</Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
