'use client';
import { Grid, Typography, Stack, Button, Table, TableHead, TableBody, TableRow, TableCell, Box, Divider, Tabs, Tab, LinearProgress, useMediaQuery, useTheme } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from 'react';
import { AppLayout, Card, SectionTitle, TotalBar } from '../components';
import { colors } from '../theme';
import { chapter70Catalog, lcl, usd } from '../data';
import { useShipmentStore } from '../store/shipmentStore';

const th = { fontWeight: 600, color: colors.muted, bgcolor: colors.tint };
const swatch = ['#1565F0', '#7C4DFF', '#4CC9A0'];
export default function Desglose() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedProduct } = useShipmentStore();
  const hs = chapter70Catalog.find((item) => item.hs === selectedProduct.hs) ?? selectedProduct ?? chapter70Catalog[0];
  const logistics = lcl.logistics.reduce((s, r) => s + r[2], 0);
  const tributos = lcl.taxes.reduce((s, r) => s + r[2], 0);
  const costItems = [['Costo logístico (flete + gestión)', logistics], ['Tributos de importación', tributos], ['Gastos adicionales (opcional)', lcl.extras]];
  const breakdownTotal = costItems.reduce((sum, [, value]) => sum + value, 0);
  const [tab, setTab] = useState(0);
  return (
    <AppLayout back={['Volver a la simulación', '/simulador/lcl']} title="Desglose de costos" subtitle="Aquí puedes ver el detalle de todos los costos de tu importación, incluyendo flete, gastos logísticos y tributos aplicables en Perú.">
      <Stack spacing={3}>
        <Card>
          <Grid container spacing={2}>
            {[['Tipo de carga', 'LCL (Carga suelta)'], ['Origen', 'Shanghái (CN)'], ['Destino', 'Callao (PE)'], ['Mercancía', `${hs.name} (HS: ${hs.hs})`]].map(([a, b]) => (
              <Grid key={a} size={{ xs: 6, md: 3 }}><Typography fontSize={12} color="text.secondary">{a}</Typography><Typography fontWeight={600}>{b}</Typography></Grid>))}
          </Grid>
        </Card>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={3}>
              <Card>
                <SectionTitle icon={LocalShippingOutlinedIcon} title="1. Costo de flete y logística" sub="Incluye el transporte marítimo, manejo en puerto, consolidación y otros servicios logísticos." />
                {mobile ? (
                  <Stack spacing={1.5}>
                    {lcl.logistics.map(([c, d, m]) => (
                      <Box key={c} sx={{ border: `1px solid ${colors.line}`, borderRadius: 2, p: 1.5, bgcolor: '#fff' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                          <Typography fontWeight={700} sx={{ wordBreak: 'break-word' }}>{c}</Typography>
                          <Typography fontWeight={700} color="primary.main">{m.toFixed(2)}</Typography>
                        </Stack>
                        <Typography fontSize={12} color="text.secondary" sx={{ mt: .75, wordBreak: 'break-word' }}>{d}</Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}><TableHead><TableRow><TableCell sx={th}>Concepto</TableCell><TableCell sx={th}>Descripción</TableCell><TableCell sx={th} align="right">Monto (USD)</TableCell></TableRow></TableHead>
                    <TableBody>{lcl.logistics.map(([c, d, m]) => <TableRow key={c}><TableCell sx={{ wordBreak: 'break-word' }}>{c}</TableCell><TableCell sx={{ color: 'primary.main', wordBreak: 'break-word' }}>{d}</TableCell><TableCell align="right">{m.toFixed(2)}</TableCell></TableRow>)}</TableBody></Table>
                )}
                <Box sx={{ mt: 1.5 }}><TotalBar label="Total costo logístico" value={usd(logistics)} /></Box>
              </Card>
              <Card>
                <SectionTitle icon={ReceiptLongOutlinedIcon} title="2. Tributos de importación (Perú)" sub="Calculados según la clasificación arancelaria y normativa vigente de SUNAT." />
                {mobile ? (
                  <Stack spacing={1.5}>
                    {lcl.taxes.map(([c, t, m]) => (
                      <Box key={c} sx={{ border: `1px solid ${colors.line}`, borderRadius: 2, p: 1.5, bgcolor: '#fff' }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                          <Typography fontWeight={700} sx={{ wordBreak: 'break-word' }}>{c}</Typography>
                          <Typography fontWeight={700} color="primary.main">{m.toFixed(2)}</Typography>
                        </Stack>
                        <Stack spacing={0.4} sx={{ mt: .75 }}>
                          <Typography fontSize={12} color="text.secondary">Base imponible: {t === '-' ? '-' : lcl.base.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Typography>
                          <Typography fontSize={12} color="text.secondary">Tasa: {t}</Typography>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Table size="small" sx={{ tableLayout: 'fixed', width: '100%' }}><TableHead><TableRow><TableCell sx={th}>Concepto</TableCell><TableCell sx={th} align="right">Base imponible (USD)</TableCell><TableCell sx={th}>Tasa</TableCell><TableCell sx={th} align="right">Monto (USD)</TableCell></TableRow></TableHead>
                    <TableBody>{lcl.taxes.map(([c, t, m]) => <TableRow key={c}><TableCell sx={{ wordBreak: 'break-word' }}>{c}</TableCell><TableCell align="right">{t === '-' ? '-' : lcl.base.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell><TableCell>{t}</TableCell><TableCell align="right">{m.toFixed(2)}</TableCell></TableRow>)}</TableBody></Table>
                )}
                <Box sx={{ mt: 1.5 }}><TotalBar label="Total tributos" value={usd(tributos)} /></Box>
              </Card>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3}>
              <Card sx={{ bgcolor: colors.navy, color: '#fff' }}>
                <Typography fontWeight={600}>Costo total estimado</Typography>
                <Typography variant="h4">{usd(lcl.total)}</Typography>
                <Typography fontSize={12} sx={{ opacity: .8 }}>Monto referencial de la simulación, sujeto a variación.</Typography>
              </Card>
              <Card>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                  <Typography variant="h6" fontSize={17}>Resumen de costos</Typography>
                  <Button size="small" variant="outlined" startIcon={<PictureAsPdfIcon />}>Descargar PDF</Button>
                </Stack>
                <Typography fontSize={12} color="text.secondary">Distribución proporcional de los rubros del desglose.</Typography>
                <Tabs value={tab} onChange={(_, value) => setTab(value)} sx={{ mb: 2 }}>
                  <Tab label="Vista por rubro" />
                  <Tab label="Vista porcentual" />
                </Tabs>
                <Stack spacing={1.5}>
                  {costItems.map(([label, value], index) => {
                    const percentage = breakdownTotal ? (value / breakdownTotal) * 100 : 0;
                    return (
                      <Box key={label}>
                        <Stack direction="row" justifyContent="space-between" spacing={1} sx={{ mb: .5 }}>
                          <Typography fontSize={13}>{label}</Typography>
                          <Typography fontSize={13} fontWeight={600} sx={{ whiteSpace: 'nowrap' }}>
                            {tab ? `${percentage.toFixed(1)}%` : usd(value)}
                          </Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={percentage} sx={{ height: 8, borderRadius: 4, bgcolor: colors.tint, '& .MuiLinearProgress-bar': { bgcolor: swatch[index] } }} />
                      </Box>
                    );
                  })}
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between" sx={{ py: .8 }}><Typography fontSize={13} fontWeight={600}>Subtotal logístico + tributos</Typography><b>{usd(logistics + tributos)}</b></Stack>
                <TotalBar big label="Total estimado" value={usd(lcl.total)} />
              </Card>
              <Card>
                <Typography variant="h6" fontSize={17} sx={{ mb: 1 }}>Información de la mercancía</Typography>
                <Typography fontWeight={600}>Celulares inteligentes</Typography>
                {[`HS: ${hs.hs}`, `Unidad de medida: ${hs.unit}`, 'Valor FOB: USD 8,000.00', 'Peso bruto: 420 kg', 'Volumen: 2.8 m³'].map((t) => <Typography key={t} fontSize={13} color="text.secondary">{t}</Typography>)}
              </Card>
            </Stack>
          </Grid>
        </Grid>
        <Card>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}><InfoOutlinedIcon color="primary" /><Typography fontWeight={600}>Notas importantes</Typography></Stack>
          <Grid container spacing={3}>
            {[['El monto final puede variar', 'Según la clasificación arancelaria, impuestos, flete y otros costos logísticos.'], ['Tiempo estimado de llegada', '25 - 30 días (sujeto a disponibilidad y ruta).'], ['Condiciones de la cotización', 'FOB (Free On Board). Incoterm aplicable en esta simulación.'], ['Fuente de información arancelaria', 'SUNAT - Tabla de aranceles. Datos actualizados según normativa vigente.']].map(([a, b]) => (
              <Grid key={a} size={{ xs: 12, md: 3 }}><Typography fontSize={13} fontWeight={600}>{a}</Typography><Typography fontSize={12} color="text.secondary">{b}</Typography></Grid>))}
          </Grid>
        </Card>
      </Stack>
    </AppLayout>
  );
}
