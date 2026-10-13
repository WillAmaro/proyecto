'use client';
import { useRouter } from 'next/navigation';
// Pequeño adaptador sobre el router de Next
export const useNavigate = () => { const r = useRouter(); return (to) => r.push(to); };
