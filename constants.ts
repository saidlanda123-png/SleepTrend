import type { Challenge } from './types';
import { MoonIcon, ScreenIcon, BookIcon, SunIcon, RelaxIcon, PhoneIcon, ClockIcon } from './components/icons/Icons';

export const CHALLENGES: Challenge[] = [
  {
    id: 'no-screens-before-bed',
    title: 'Cero Pantallas 1 Hora Antes de Dormir',
    description: 'Evita celulares, tablets y TV para ayudar a tu cerebro a producir melatonina, la hormona del sueño.',
    icon: ScreenIcon,
    badgeTitle: 'Guardián del Anochecer',
    badgeColor: '#22d3ee', // cyan-400
  },
  {
    id: 'dark-room',
    title: 'Crea un Santuario Oscuro',
    description: 'Duerme en una habitación lo más oscura posible. La oscuridad total mejora la calidad del sueño.',
    icon: MoonIcon,
    badgeTitle: 'Maestro de la Oscuridad',
    badgeColor: '#a78bfa', // violet-400
  },
  {
    id: 'consistent-wakeup',
    title: 'Despierta a la Misma Hora',
    description: 'Incluso los fines de semana. Esto regula tu reloj biológico y facilita el despertar.',
    icon: SunIcon,
    badgeTitle: 'Comandante del Alba',
    badgeColor: '#facc15', // yellow-400
  },
  {
    id: 'relaxing-activity',
    title: 'Actividad Relajante',
    description: 'Lee un libro, medita o escucha música tranquila. Prepara tu mente y cuerpo para descansar.',
    icon: RelaxIcon,
    badgeTitle: 'Oráculo de la Calma',
    badgeColor: '#2dd4bf', // teal-400
  },
  {
    id: 'no-phone-in-bed',
    title: 'El Celular Fuera de la Cama',
    description: 'Tu cama es para dormir. Usa una alarma tradicional y deja el celular cargando lejos de ti.',
    icon: PhoneIcon,
    badgeTitle: 'Centinela del Santuario',
    badgeColor: '#f472b6', // pink-400
  },
  {
    id: 'read-book',
    title: 'Lee 15 Minutos',
    description: 'Leer en papel reduce el estrés y es una excelente transición hacia el sueño.',
    icon: BookIcon,
    badgeTitle: 'Archivista de Sueños',
    badgeColor: '#7dd3fc', // sky-300
  },
  {
    id: 'set-bedtime',
    title: 'Establece una Hora de Dormir',
    description: 'Acostarte a la misma hora cada noche refuerza el ciclo de sueño-vigilia de tu cuerpo.',
    icon: ClockIcon,
    badgeTitle: 'Cronometrador Cósmico',
    badgeColor: '#e879f9', // fuchsia-400
  },
];