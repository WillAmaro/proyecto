'use client';
import { useState } from 'react';
import { Grid, Typography, TextField, InputAdornment, Stack, Chip, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedIcon from '@mui/icons-material/Verified';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { AppLayout, Card } from '../components';
import { colors } from '../theme';
import { hsExamples } from '../data';

export default function Aranceles() {
  const [q, setQ] = useState('');
  const list = hsExamples.filter((h) => (h.name + h.hs).toLowerCase().includes(q.toLowerCase()));
  return (
    <AppLayout title="Aranceles y clasificación" subtitle="Busca el código HS de tu producto y conoce la subpartida nacional y los tributos aplicables.">
      <Card sx={{ mb: 3 }}>
        <TextField placeholder="Ej. 8471.30.00.00 · Computadoras portátiles" value={q} onChange={(e) => setQ(e.target.value)} slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> } }} />
      </Card>
      <Grid container spacing={3}>
        {list.map((h) => (
          <Grid key={h.hs} size={{ xs: 12, md: 6, lg: 4 }}>
            <Card sx={{ height: '100%' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center"><Typography fontWeight={700}>{h.name}</Typography><Chip size="small" icon={<VerifiedIcon />} color="success" variant="outlined" label="SUNAT" /></Stack>
              <Typography fontSize={13} color="text.secondary" sx={{ my: 1.5 }}>{h.desc}</Typography>
              <Box sx={{ bgcolor: colors.tint, borderRadius: 2, p: 1.5 }}><Typography fontSize={12}>Subpartida nacional</Typography><Typography fontWeight={700} fontSize={17}>{h.hs}</Typography></Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mt: 1.5 }}><Typography fontSize={13}>Unidad: {h.unit}</Typography><Typography fontSize={13}>Ad Valorem: <b>{h.duty}</b> · IGV: <b>18%</b></Typography></Stack>
              <Button size="small" endIcon={<OpenInNewIcon />} sx={{ mt: 1 }}>Ver en SUNAT</Button>
            </Card>
          </Grid>
        ))}
        {!list.length && <Grid size={12}><Typography color="text.secondary">No encontramos resultados. Prueba con otra descripción o código.</Typography></Grid>}
      </Grid>
    </AppLayout>
  );
}
