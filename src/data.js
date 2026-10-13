export const ports = [
  { code: 'CNSHA', name: 'Shanghái (CN)', region: 'Asia' },
  { code: 'CNNGB', name: 'Ningbó (CN)', region: 'Asia' },
  { code: 'KRPUS', name: 'Busan (KR)', region: 'Asia' },
  { code: 'USLAX', name: 'Los Ángeles (US)', region: 'Norteamérica' },
  { code: 'PECLL', name: 'Callao (PE)', region: 'Perú', peru: true },
  { code: 'PEPAI', name: 'Paita (PE)', region: 'Perú', peru: true },
  { code: 'PEMRI', name: 'Matarani (PE)', region: 'Perú', peru: true },
];
export const containers = ["Contenedor de 20 pies (20'DC)", "Contenedor de 40 pies (40'DC)", "Contenedor de 40 pies HC (40'HC)", 'Refrigerado (Reefer)'];
export const usd = (n) => `US$ ${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const fcl = {
  total: 2458.32, fob: 8000,
  lines: [['Valor de la mercancía (FOB)', 8000], ['Flete marítimo', 1200], ['Seguro de carga', 50], ['Gastos portuarios (origen + destino)', 320], ['Otros costos (THC, documentación, etc.)', 160]],
  customs: 9730,
  taxes: [['Ad Valorem (Arancel)', '0%', 0], ['IGV', '18%', 1751.4], ['ISC', '0% (no aplica)', 0], ['IPM', '0% (no aplica)', 0]],
  days: '25 - 30 días',
};
export const lcl = {
  total: 2458.32, extras: 105.6,
  logistics: [['Flete marítimo', 'Transporte de Shanghái a Callao (carga consolidada)', 620], ['Consolidación y desconsolidación', 'Manejo de carga en almacén de origen y destino', 180], ['THC (Terminal Handling Charge)', 'Cargos por manipulación en terminal portuario', 95], ['Gastos locales en origen', 'Transporte interno, documentación, inspección, etc.', 75], ['Transporte terrestre en destino', 'Del puerto de Callao al almacén del cliente', 120]],
  taxes: [['Arancel de importación', '0%', 0], ['IGV (18%)', '18%', 224.73], ['IPM / ISC (0%)', '0%', 0], ['Otros tributos', '-', 0]],
  base: 1248.5,
};
export const hsExamples = [
  { hs: '8517.12.00.00', name: 'Celulares inteligentes', desc: 'Teléfonos móviles (smartphones) con pantalla táctil, sistema operativo y conectividad a internet.', unit: 'Unidad (UND)', duty: '0%' },
  { hs: '8471.30.00.00', name: 'Computadoras portátiles', desc: 'Máquinas automáticas para tratamiento de datos, portátiles, de peso ≤ 10 kg.', unit: 'Unidad (UND)', duty: '0%' },
  { hs: '6403.99.00.00', name: 'Calzado deportivo', desc: 'Calzado con suela de caucho o plástico y parte superior de cuero natural.', unit: 'Par (PAR)', duty: '11%' },
];
