'use client';
import { useEffect, useState } from 'react';
import { useNavigate } from '../nav';
import { Box, Typography, Button, Grid, Stack, TextField, MenuItem, InputAdornment, Container, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import SailingOutlinedIcon from '@mui/icons-material/SailingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TuneIcon from '@mui/icons-material/Tune';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { PublicLayout, Card, heroBg } from '../components';
import { colors } from '../theme';
import { ports, containers, chapter70Catalog, findArancelMatch } from '../data';
import { useShipmentStore } from '../store/shipmentStore';

const WHATSAPP_URL = 'https://wa.me/51938598840?text=Hola%2C%20necesito%20ayuda%20con%20mi%20simulaci%C3%B3n.';

const features = [
  [Inventory2OutlinedIcon, 'Alquiler de contenedores', 'Conoce el costo según el tipo y la ruta de tu carga.', '/simulador'],
  [DescriptionOutlinedIcon, 'Clasificación arancelaria', 'Consulta el código HS y la subpartida nacional.', '/aranceles'],
  [PercentIcon, 'Aranceles e impuestos', 'Calcula los tributos aplicables en Perú (AD / IGV / IPM).', '/aranceles'],
  [CalculateOutlinedIcon, 'Simulación de costos', 'Obtén un estimado completo: flete, aranceles, impuestos y más.', '/resultado'],
  [PlaceOutlinedIcon, 'Puertos y rutas', 'Principales puertos del mundo y del Perú, con sus rutas.', '/puertos'],
];
const steps = [
  [TuneIcon, 'Define tu ruta', 'Elige puerto de origen, destino, tipo de carga y fecha de embarque.'],
  [DescriptionOutlinedIcon, 'Clasifica tu mercancía', 'Busca por descripción o código HS y confirma la subpartida.'],
  [RequestQuoteOutlinedIcon, 'Revisa tu costo total', 'Flete, gastos portuarios, aranceles e impuestos en un solo detalle.'],
];
const included = ['Costo de flete marítimo según ruta y tipo de contenedor', 'Gastos portuarios y locales: carga, descarga, manejo y THC', 'Seguro de carga con cobertura internacional', 'Aranceles e impuestos en Perú según subpartida nacional', 'Valor en aduana estimado con base en tus datos'];
const stack = ['#E4572E', '#1565F0', '#F2A93B', '#2B9E8C', '#7C4DFF', '#D94F70'];

export default function Home() {
  const go = useNavigate();
  const { selectedProduct, setSelectedHs, clearSelectedHs } = useShipmentStore();
  const [f, setF] = useState({ origin: 'CNSHA', dest: 'PECLL', cont: containers[0], hs: '', date: null });
  const [hsQuery, setHsQuery] = useState(selectedProduct ? `${selectedProduct.hs} - ${selectedProduct.name}` : '');
  const [matchOptions, setMatchOptions] = useState(() => findArancelMatch(hsQuery));
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const icon = (I) => ({ input: { startAdornment: <InputAdornment position="start"><I fontSize="small" color="primary" /></InputAdornment> } });
  const defaultHsValue = selectedProduct ? chapter70Catalog.find((item) => item.hs === selectedProduct.hs) ?? null : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMatchOptions(findArancelMatch(hsQuery));
    }, 250);

    return () => clearTimeout(timer);
  }, [hsQuery]);

  return (
    <PublicLayout>
      {/* Hero */}
      <Box sx={{ background: heroBg, color: '#fff', pt: { xs: 5, md: 9 }, pb: { xs: 14, md: 18 }, overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h3" sx={{ fontSize: { xs: 32, sm: 40, lg: 52 }, lineHeight: 1.08 }}>Calcula el costo de traer tu mercancía al Perú</Typography>
              <Typography sx={{ maxWidth: 520, mt: 2.5, opacity: .9, fontSize: { xs: 15, md: 17 } }}>Simula tu importación, consulta la clasificación arancelaria y los impuestos, y obtén una estimación completa de costos en minutos. Sin crear cuenta.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1.5, sm: 4 }} sx={{ mt: 4 }}>
                {[[VerifiedUserOutlinedIcon, 'Información oficial de SUNAT'], [TimerOutlinedIcon, 'Resultados en minutos'], [DescriptionOutlinedIcon, 'Guías y requisitos para importar']].map(([I, t]) => (
                  <Stack key={t} direction="row" spacing={1.25} alignItems="center"><I sx={{ fontSize: 28, color: '#7DB3FF' }} /><Typography fontSize={13} fontWeight={600} sx={{ maxWidth: 150 }}>{t}</Typography></Stack>))}
              </Stack>
            </Grid>
            <Grid size={{ md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, transform: 'perspective(900px) rotateY(-14deg) rotateX(6deg)', opacity: .95 }}>
                {Array.from({ length: 20 }).map((_, i) => <Box key={i} sx={{ aspectRatio: '2.4 / 1', borderRadius: '3px', bgcolor: stack[(i * 7 + (i >> 2)) % stack.length], opacity: .55 + ((i * 13) % 5) * .1, boxShadow: 'inset 0 -3px 0 rgba(0,0,0,.2)' }} />)}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Buscador */}
      <Container maxWidth="lg" sx={{ mt: { xs: -10, md: -12 }, px: { xs: 2, md: 3 } }}>
        <Card sx={{ boxShadow: '0 18px 44px rgba(10,31,68,.16)', p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Simula tu importación</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}><TextField select label="Puerto de origen" value={f.origin} onChange={set('origin')} slotProps={icon(SailingOutlinedIcon)}>{ports.filter((p) => !p.peru).map((p) => <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}><TextField select label="Puerto de destino (Perú)" value={f.dest} onChange={set('dest')} slotProps={icon(PlaceOutlinedIcon)}>{ports.filter((p) => p.peru).map((p) => <MenuItem key={p.code} value={p.code}>{p.name}</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}><TextField select label="Tipo de contenedor" value={f.cont} onChange={set('cont')} slotProps={icon(Inventory2OutlinedIcon)}>{containers.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}</TextField></Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}><DatePicker label="Fecha estimada de embarque" disablePast value={f.date} onChange={(v) => setF({ ...f, date: v })} slotProps={{ textField: { size: 'small', fullWidth: true } }} /></Grid>
            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
              <Autocomplete
                freeSolo
                options={matchOptions}
                value={defaultHsValue}
                inputValue={hsQuery}
                onInputChange={(_, v, reason) => {
                  if (reason === 'clear') {
                    clearSelectedHs();
                    setHsQuery('');
                    return;
                  }
                  if (reason === 'input') {
                    setHsQuery(v);
                  }
                }}
                onChange={(_, newValue) => {
                  if (newValue && typeof newValue === 'object') {
                    setSelectedHs(newValue);
                    setHsQuery(`${newValue.hs} - ${newValue.name}`);
                    return;
                  }
                  clearSelectedHs();
                  setHsQuery('');
                }}
                getOptionLabel={(option) => typeof option === 'string' ? option : `${option.hs} - ${option.name}`}
                isOptionEqualToValue={(option, value) => option.hs === value.hs}
                renderOption={(props, option) => {
                  const { key: _key, ...optionProps } = props;
                  const optionKey = `${option.hs ?? 'item'}-${option.name ?? 'name'}`;
                  return (
                    <Box component="li" {...optionProps}  key={optionKey} sx={{ display: 'block' }}>
                      <Typography  key={optionKey} fontWeight={700}>{option.hs}</Typography>
                      <Typography  key={`name-${optionKey}`} fontSize={12} color="text.secondary">{option.name}</Typography>
                    </Box>
                  );
                }}
                renderInput={(params) => <TextField {...params} label="Mercancía (HS)" placeholder="Busca por código o descripción" />}
              
                noOptionsText="No encontramos coincidencias"
                clearOnEscape
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4, lg: 3 }}><Button fullWidth variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={() => go('/resultado')} sx={{ height: 40 }}>Calcular costo</Button></Grid>
          </Grid>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1} sx={{ mt: 2, bgcolor: colors.tint, borderRadius: 2, px: 2, py: 1 }}>
            <Typography fontSize={13}><b>¿No conoces el código HS?</b> Busca por descripción y te ayudamos a encontrar la clasificación correcta.</Typography>
            <Button size="small" onClick={() => go('/aranceles')} sx={{ flexShrink: 0 }}>Consultar clasificación</Button>
          </Stack>
        </Card>

        {/* Funcionalidades */}
        <Grid container spacing={2.5} sx={{ mt: 5 }}>
          {features.map(([I, t, d, to]) => (
            <Grid key={t} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Card onClick={() => go(to)} sx={{ height: '100%', cursor: 'pointer', transition: 'border-color .15s', '&:hover': { borderColor: 'primary.main' } }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: colors.tint, color: 'primary.main', display: 'grid', placeItems: 'center', mb: 1.5 }}><I /></Box>
                <Typography fontWeight={600}>{t}</Typography>
                <Typography fontSize={13} color="text.secondary" sx={{ mt: .5 }}>{d}</Typography>
              </Card>
            </Grid>))}
        </Grid>

        {/* Cómo funciona */}
        <Typography variant="h5" sx={{ mt: 8, mb: 3 }}>Cómo funciona</Typography>
        <Grid container spacing={3}>
          {steps.map(([I, t, d], i) => (
            <Grid key={t} size={{ xs: 12, md: 4 }}>
              <Stack direction="row" spacing={2}>
                <Box sx={{ width: 52, height: 52, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', display: 'grid', placeItems: 'center', flexShrink: 0 }}><I /></Box>
                <Box><Typography fontWeight={600}>{i + 1}. {t}</Typography><Typography fontSize={14} color="text.secondary">{d}</Typography></Box>
              </Stack>
            </Grid>))}
        </Grid>

        {/* Qué incluye + CTA */}
        <Grid container spacing={3} sx={{ mt: 6, mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>¿Qué incluye la simulación?</Typography>
              <Stack spacing={1.5}>{included.map((t) => <Stack key={t} direction="row" spacing={1.5}><CheckCircleIcon sx={{ color: 'success.main', fontSize: 20, mt: .2 }} /><Typography fontSize={14}>{t}</Typography></Stack>)}</Stack>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ height: '100%', bgcolor: colors.navy, color: '#fff', borderRadius: 3, p: { xs: 3, md: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ mb: 1 }}>Importa más, con menos dudas</Typography>
              <Typography sx={{ opacity: .85, mb: 3 }}>Te damos la información que necesitas para tomar mejores decisiones y hacer crecer tu negocio.</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained" onClick={() => go('/simulador')}>Ir al simulador</Button>
                <Button
                  component="a"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,.5)',
                    bgcolor: 'rgba(255,255,255,.04)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,.08)', borderColor: '#fff' },
                  }}
                >
                  Contactar asesor
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}
