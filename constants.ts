
import type { Challenge } from './types';
import { MoonIcon, ScreenIcon, BookIcon, SunIcon, RelaxIcon, PhoneIcon, ClockIcon } from './components/icons/Icons';

export const CHALLENGES: Challenge[] = [
  {
    id: 'no-screens-before-bed',
    title: 'Cero Pantallas 1 Hora Antes de Dormir',
    description: 'Evita celulares, tablets y TV para ayudar a tu cerebro a producir melatonina, la hormona del sueño.',
    icon: ScreenIcon,
  },
  {
    id: 'dark-room',
    title: 'Crea un Santuario Oscuro',
    description: 'Duerme en una habitación lo más oscura posible. La oscuridad total mejora la calidad del sueño.',
    icon: MoonIcon,
  },
  {
    id: 'consistent-wakeup',
    title: 'Despierta a la Misma Hora',
    description: 'Incluso los fines de semana. Esto regula tu reloj biológico y facilita el despertar.',
    icon: SunIcon,
  },
  {
    id: 'relaxing-activity',
    title: 'Actividad Relajante',
    description: 'Lee un libro, medita o escucha música tranquila. Prepara tu mente y cuerpo para descansar.',
    icon: RelaxIcon,
  },
  {
    id: 'no-phone-in-bed',
    title: 'El Celular Fuera de la Cama',
    description: 'Tu cama es para dormir. Usa una alarma tradicional y deja el celular cargando lejos de ti.',
    icon: PhoneIcon,
  },
  {
    id: 'read-book',
    title: 'Lee 15 Minutos',
    description: 'Leer en papel reduce el estrés y es una excelente transición hacia el sueño.',
    icon: BookIcon,
  },
  {
    id: 'set-bedtime',
    title: 'Establece una Hora de Dormir',
    description: 'Acostarte a la misma hora cada noche refuerza el ciclo de sueño-vigilia de tu cuerpo.',
    icon: ClockIcon,
  },
];
