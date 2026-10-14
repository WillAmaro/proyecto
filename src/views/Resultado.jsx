'use client';
import { useNavigate } from '../nav';
import { Grid, Typography, Stack, Button, Box, Alert, Table, TableBody, TableRow, TableCell, TableHead, Tabs, Tab, LinearProgress } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import SailingOutlinedIcon from '@mui/icons-material/SailingOutlined';
import { useState } from 'react';
import { AppLayout, Card, TotalBar } from '../components';
import { colors } from '../theme';
import { chapter70Catalog, fcl, usd } from '../data';
import { useShipmentStore } from '../store/shipmentStore';

const swatch = ['#1565F0', '#7C4DFF', '#4CC9A0', '#FF9F43', '#FF6B6B'];
export default function Resultado() {
  const nav = useNavigate();
  const [tab, setTab] = useState(0);
  const { selectedProduct } = useShipmentStore();
  const hs = chapter70Catalog.find((item) => item.hs === selectedProduct.hs) ?? selectedProduct ?? chapter70Catalog[0];
  return (
    <AppLayout title="Resultado de tu simulación" subtitle="Aquí encontrarás el detalle de costos, clasificación arancelaria, impuestos y más."
      back={['Volver al simulador', '/simulador']}
      heroExtra={<Alert icon={<CheckCircleIcon />} severity="success" sx={{ bgcolor: '#fff', display: { xs: 'none', lg: 'flex' } }}><b>Simulación completada</b><br />Los valores son estimados y pueden variar según la operación real.</Alert>}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8.5 }}>
          <Stack spacing={3}>
            <Card>
              <Grid container spacing={2}>
                {[['Origen', 'Shanghái (CN)'], ['Destino', 'Callao (PE)'], ['Tipo de contenedor', "20 pies (20'DC)"], ['Mercancía', hs.name], ['Incoterm', 'FOB']].map(([a, b]) => (
                  <Grid key={a} size={{ xs: 6, md: 2.4 }}><Typography fontSize={12} color="text.secondary">{a}</Typography><Typography fontWeight={600} fontSize={14}>{b}</Typography></Grid>))}
              </Grid>
            </Card>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100%' }}>
                  <Stack direction="row" justifyContent="space-between"><Typography variant="h6" fontSize={17}>Clasificación arancelaria (SUNAT)</Typography><Stack direction="row" spacing={.5} alignItems="center" sx={{ color: 'success.main' }}><VerifiedIcon fontSize="small" /><Typography fontSize={11}>Información oficial</Typography></Stack></Stack>
                  <Typography fontWeight={600} sx={{ mt: 2 }}>{hs.name}</Typography>
                  <Typography fontSize={13} color="text.secondary" sx={{ mb: 2 }}>{hs.desc}</Typography>
                  <Box sx={{ bgcolor: colors.tint, borderRadius: 2, p: 1.5 }}><Typography fontSize={12}>Subpartida nacional (10 dígitos)</Typography><Typography fontWeight={700} fontSize={18}>{hs.hs}</Typography></Box>
                  <Stack direction="row" spacing={4} sx={{ mt: 2 }}><Box><Typography fontSize={12} color="text.secondary">Unidad de medida</Typography><Typography fontSize={13} fontWeight={600}>{hs.unit}</Typography></Box><Box><Typography fontSize={12} color="text.secondary">Arancel</Typography><Typography fontSize={13} fontWeight={600}>{hs.duty}</Typography></Box></Stack>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: '100%' }}>
                  <Typography variant="h6" fontSize={17} sx={{ mb: 1 }}>Impuestos aplicables (Perú)</Typography>
                  <Table size="small"><TableHead><TableRow><TableCell>Concepto</TableCell><TableCell align="right">Tasa</TableCell></TableRow></TableHead>
                    <TableBody>{fcl.taxes.map(([c, t]) => <TableRow key={c}><TableCell>{c}</TableCell><TableCell align="right" sx={{ fontWeight: 600 }}>{t}</TableCell></TableRow>)}</TableBody></Table>
                  <Alert severity="info" sx={{ mt: 2, fontSize: 12 }}>Las tasas pueden variar según la subpartida nacional, origen y acuerdos comerciales vigentes.</Alert>
                </Card>
              </Grid>
            </Grid>
            <Card>
              <Typography variant="h6" fontSize={17}>Desglose de costos</Typography>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}><Tab label="Vista por rubro" /><Tab label="Vista porcentual" /></Tabs>
              <Stack spacing={1.5}>
                {fcl.lines.map(([l, v], i) => (
                  <Box key={l}>
                    <Stack direction="row" justifyContent="space-between"><Typography fontSize={13}>{l}</Typography><Typography fontSize={13} fontWeight={600}>{tab ? `${((v / fcl.customs) * 100).toFixed(1)}%` : usd(v)}</Typography></Stack>
                    <LinearProgress variant="determinate" value={(v / fcl.customs) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: colors.tint, '& .MuiLinearProgress-bar': { bgcolor: swatch[i] } }} />
                  </Box>))}
              </Stack>
            </Card>
            <Card>
              <Typography variant="h6" fontSize={17} sx={{ mb: 2 }}>Ruta y tiempos estimados</Typography>
              <Stack direction="row" alignItems="center" justifyContent="space-around"><Typography fontWeight={600}>Shanghái (CN)</Typography><Stack alignItems="center"><SailingOutlinedIcon color="primary" /><Typography fontSize={13}>Tránsito marítimo · {fcl.days}</Typography></Stack><Typography fontWeight={600}>Callao (PE)</Typography></Stack>
              <Typography fontSize={13} sx={{ mt: 2, bgcolor: colors.tint, p: 1.5, borderRadius: 2 }}><b>Tiempo total estimado: 30 - 35 días.</b> Puede variar según la naviera, congestión portuaria y condiciones del servicio.</Typography>
            </Card>
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, lg: 3.5 }}>
          <Card sx={{ bgcolor: colors.navy, color: '#fff', mb: 2 }}>
            <Typography fontWeight={600}>Costo total estimado</Typography>
            <Typography variant="h4">{usd(fcl.total)}</Typography>
            <Typography fontSize={12} sx={{ opacity: .8 }}>Por contenedor (20'DC)</Typography>
          </Card>
          <Card>
            {[...fcl.lines, ['Subtotal (valor en aduana)', fcl.customs], ['Arancel (0%)', 0], ['IGV (18%)', 1751.4], ['IPM / ISC (0%)', 0]].map(([l, v]) => (
              <Stack key={l} direction="row" justifyContent="space-between" sx={{ py: .7 }}><Typography fontSize={13}>{l}</Typography><Typography fontSize={13} fontWeight={500}>{usd(v)}</Typography></Stack>))}
            <Box sx={{ mt: 1 }}><TotalBar label="Total estimado" value={usd(fcl.total)} /></Box>
            <Button fullWidth variant="contained" startIcon={<PictureAsPdfIcon />} sx={{ mt: 2 }}>Descargar detalle en PDF</Button>
            <Button fullWidth variant="outlined" startIcon={<BookmarkBorderIcon />} sx={{ mt: 1 }}>Guardar simulación</Button>
            <Button fullWidth sx={{ mt: 1 }} onClick={() => nav('/desglose')}>Ver ejemplo LCL</Button>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
