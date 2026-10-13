'use client';
import { useMemo, useState } from 'react';
import { useNavigate } from '../nav';
import { Grid, Typography, Stack, Button, TextField, MenuItem, Divider, Chip } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AppLayout, Card, SectionTitle } from '../components';
import { colors } from '../theme';
import { usd } from '../data';

export default function CargaLCL() {
  const nav = useNavigate();
  const [price, setPrice] = useState(120);
  const vol = 2.8, kg = 420;
  const total = useMemo(() => (price * vol) + 912.5, [price]); // base referencial
  return (
    <AppLayout back={['Volver al simulador', '/simulador']} title="Tipo de carga: LCL (Carga suelta)" subtitle="Consolida tu mercancía en un solo contenedor y optimiza tus costos.">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <Typography variant="h6">Información de la carga LCL</Typography>
            <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>Indica los datos de recolección, almacenamiento y destino de tu mercancía.</Typography>
            <Stack spacing={2}>
              <Card><SectionTitle icon={LocalShippingOutlinedIcon} title="1. Dirección de recojo de la carga" sub="Lugar donde se recogerá la mercancía en el país de origen." />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}><TextField select label="País" defaultValue="CN"><MenuItem value="CN">China (CN)</MenuItem></TextField></Grid>
                  <Grid size={{ xs: 12, md: 6 }}><TextField label="Dirección completa" defaultValue="No. 88, Jiangnan Road, Pudong, Shanghái" /></Grid>
                  <Grid size={{ xs: 12, md: 3 }}><TextField label="Ciudad" defaultValue="Shanghái" /></Grid>
                </Grid></Card>
              <Card><SectionTitle icon={WarehouseOutlinedIcon} title="2. Almacén de consolidación" sub="La carga será llevada a un almacén para su consolidación con otras mercancías." />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}><TextField select label="País" defaultValue="CN"><MenuItem value="CN">China (CN)</MenuItem></TextField></Grid>
                  <Grid size={{ xs: 12, md: 4 }}><TextField select label="Almacén" defaultValue="a"><MenuItem value="a">Shanghai Consolidation Warehouse</MenuItem></TextField></Grid>
                  <Grid size={{ xs: 12, md: 5 }}><TextField label="Dirección del almacén" defaultValue="No. 168, Logistics Park, Pudong, Shanghái" /></Grid>
                </Grid></Card>
              <Card><SectionTitle icon={PlaceOutlinedIcon} title="3. Destino final" sub="Puerto de llegada y dirección de entrega en Perú." />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}><TextField select label="Puerto de destino" defaultValue="c"><MenuItem value="c">Callao (PE)</MenuItem></TextField></Grid>
                  <Grid size={{ xs: 12, md: 6 }}><TextField label="Dirección de entrega en Perú" defaultValue="Av. Argentina 1234, Callao - Lima" /></Grid>
                  <Grid size={{ xs: 12, md: 3 }}><TextField label="Ciudad" defaultValue="Callao" /></Grid>
                </Grid></Card>
              <Card><SectionTitle icon={ViewInArOutlinedIcon} title="4. Precio por metro cúbico" sub="Este valor se aplicará al volumen real que ocupe tu mercancía." />
                <TextField type="number" label="Precio por m³ (USD)" value={price} onChange={(e) => setPrice(+e.target.value || 0)} sx={{ maxWidth: 280 }} />
              </Card>
            </Stack>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ position: { lg: 'sticky' }, top: 16 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center"><Typography variant="h6" fontSize={16}>Resumen de la simulación</Typography><Chip size="small" label="LCL" color="primary" variant="outlined" /></Stack>
            </Stack>
            {[['Origen', 'Shanghái (CN)'], ['Destino', 'Callao (PE)'], ['Tipo de carga', 'LCL (Carga suelta)'], ['Mercancía', 'Celulares inteligentes'], ['Incoterm', 'FOB']].map(([a, b]) => (
              <Stack key={a} direction="row" justifyContent="space-between" sx={{ py: .6 }}><Typography fontSize={13} color="text.secondary">{a}</Typography><Typography fontSize={13} fontWeight={500}>{b}</Typography></Stack>))}
            <Divider sx={{ my: 1.5 }} />
            <Stack direction="row" justifyContent="space-between" sx={{ bgcolor: colors.tint, borderRadius: 2, p: 1.5, mb: 1.5 }}><Typography fontWeight={600}>Precio por m³</Typography><Typography fontWeight={700}>{usd(price)}</Typography></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography fontSize={13}>Volumen total</Typography><b>{vol} m³</b></Stack>
            <Stack direction="row" justifyContent="space-between"><Typography fontSize={13}>Peso bruto</Typography><b>{kg} kg</b></Stack>
            <Card sx={{ mt: 2, bgcolor: colors.tint }}>
              <Typography fontWeight={600} fontSize={14}>Costo estimado de la importación</Typography>
              <Typography variant="h4" color="primary">{usd(total)}</Typography>
              <Typography fontSize={12} color="text.secondary">(referencial, sujeto a variación)</Typography>
            </Card>
            <Button fullWidth variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ mt: 2 }} onClick={() => nav('/desglose')}>Ver desglose de costos</Button>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
