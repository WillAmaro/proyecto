import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chapter70Catalog } from '../data';

const defaultHs = chapter70Catalog[0] ?? {
  hs: '7001.00.00.00',
  name: 'Vidrio plano de vidrio flotado',
  desc: 'Vidrio plano para construcción y fachadas.',
  unit: 'kg',
  duty: '0%',
};

export const useShipmentStore = create(
  persist(
    (set) => ({
      selectedHs: defaultHs.hs,
      selectedProduct: defaultHs,
      setSelectedHs: (item) => set({
        selectedHs: item?.hs ?? '',
        selectedProduct: item ?? null,
      }),
      clearSelectedHs: () => set({ selectedHs: '', selectedProduct: null }),
      resetSelectedHs: () => set({ selectedHs: defaultHs.hs, selectedProduct: defaultHs }),
    }),
    { name: 'shipment-store' }
  )
);
