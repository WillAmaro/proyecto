'use client';
import { Table, TableHead, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import { AppLayout, Card } from '../components';
import { ports } from '../data';

export default function Puertos() {
  return (
    <AppLayout title="Puertos y rutas" subtitle="Principales puertos de origen y destino disponibles en el simulador.">
      <Card>
        <Table>
          <TableHead><TableRow><TableCell>Puerto</TableCell><TableCell>Código UN/LOCODE</TableCell><TableCell>Región</TableCell><TableCell>Tipo</TableCell></TableRow></TableHead>
          <TableBody>{ports.map((p) => (
            <TableRow key={p.code} hover><TableCell sx={{ fontWeight: 600 }}>{p.name}</TableCell><TableCell>{p.code}</TableCell><TableCell>{p.region}</TableCell>
              <TableCell><Chip size="small" label={p.peru ? 'Destino' : 'Origen'} color={p.peru ? 'primary' : 'default'} /></TableCell></TableRow>))}</TableBody>
        </Table>
      </Card>
    </AppLayout>
  );
}
