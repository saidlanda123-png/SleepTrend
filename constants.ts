import type { Challenge, Rank } from './types';
import { 
  BellSlashIcon,
  EyeIcon,
  GlassWaterIcon,
  PencilSquareIcon,
  PowerIcon,
  SparklesIcon,
  PhoneXMarkIcon,
  ScreenIcon,
  BookIcon,
  CalendarDaysIcon,
  BedIcon,
  RelaxIcon,
  PhoneSlashIcon,
  ScreenSlashIcon,
} from './components/icons/Icons';

export const CHALLENGES: Challenge[] = [
  // Fáciles
  {
    id: 'disconnect-notifications',
    title: 'Desconecta Notificaciones',
    description: 'Apaga notificaciones de redes sociales 1 hora antes de dormir. Ayuda a evitar distracciones mentales.',
    icon: BellSlashIcon,
    badgeTitle: 'Mente Serena',
    badgeColor: '#22d3ee', // cyan-400
    badgeAchievement: 'Por silenciar el ruido digital.',
    difficulty: 'Fácil',
  },
  {
    id: 'night-mode',
    title: 'Modo Noche Activado',
    description: 'Activa el modo nocturno o luz cálida en tus dispositivos. Reduce el impacto de la luz azul.',
    icon: EyeIcon,
    badgeTitle: 'Guardián Ocular',
    badgeColor: '#f59e0b', // amber-500
    badgeAchievement: 'Por proteger tu ritmo circadiano.',
    difficulty: 'Fácil',
  },
  {
    id: 'water-before-bed',
    title: 'Reto del Vaso de Agua',
    description: 'Toma un vaso de agua 30 minutos antes de dormir para una hidratación ligera.',
    icon: GlassWaterIcon,
    badgeTitle: 'Hidronauta Nocturno',
    badgeColor: '#38bdf8', // lightBlue-400
    badgeAchievement: 'Por hidratar tus sueños.',
    difficulty: 'Fácil',
  },
  {
    id: 'night-sanctuary',
    title: 'Crea Santuario Nocturno',
    description: 'Prepara tu cuarto para el descanso: oscuro, silencioso y fresco.',
    icon: BedIcon,
    badgeTitle: 'Guardián del Santuario',
    badgeColor: '#818cf8', // indigo-400
    badgeAchievement: 'Por crear tu espacio de descanso ideal.',
    difficulty: 'Fácil',
  },
  // Intermedios
  {
    id: 'plan-morning',
    title: 'Planifica tu Mañana',
    description: 'Escribe en una nota lo que harás al despertar para evitar pensamientos circulares nocturnos.',
    icon: PencilSquareIcon,
    badgeTitle: 'Arquitecto del Alba',
    badgeColor: '#a78bfa', // violet-400
    badgeAchievement: 'Por diseñar un mañana tranquilo.',
    difficulty: 'Intermedio',
  },
  {
    id: 'disconnect-hour',
    title: 'Apaga Todo a la Misma Hora',
    description: 'Establece una “hora de desconexión” diaria para dejar todos los dispositivos.',
    icon: PowerIcon,
    badgeTitle: 'Maestro del Apagado',
    badgeColor: '#f472b6', // pink-400
    badgeAchievement: 'Por establecer la hora de desconexión.',
    difficulty: 'Intermedio',
  },
  {
    id: 'sensory-challenge',
    title: 'Reto Sensorial',
    description: 'Prueba dormir con una fragancia relajante (lavanda, vainilla, etc.) para estimular la relajación.',
    icon: SparklesIcon,
    badgeTitle: 'Alquimista Sensorial',
    badgeColor: '#2dd4bf', // teal-400
    badgeAchievement: 'Por usar fragancias para relajarte.',
    difficulty: 'Intermedio',
  },
  {
    id: 'relaxing-activity',
    title: 'Actividad Relajante',
    description: 'Dedica 20 minutos a una actividad que te relaje: meditar, música suave, dibujar.',
    icon: RelaxIcon,
    badgeTitle: 'Maestro de la Calma',
    badgeColor: '#34d399', // emerald-400
    badgeAchievement: 'Por encontrar tu momento de paz.',
    difficulty: 'Intermedio',
  },
  {
    id: 'phone-off-bed',
    title: 'Celular Fuera de la Cama',
    description: 'Mantén tu celular lejos de tu cama, idealmente en otro mueble, para evitar la tentación.',
    icon: PhoneSlashIcon,
    badgeTitle: 'Libertador de Almohadas',
    badgeColor: '#fb923c', // orange-400
    badgeAchievement: 'Por mantener tu cama libre de distracciones.',
    difficulty: 'Intermedio',
  },
  {
    id: 'read-15-minutes',
    title: 'Lee 15 Minutos',
    description: 'Lee un libro físico (no en pantalla) por 15 minutos antes de dormir.',
    icon: BookIcon,
    badgeTitle: 'Lector Nocturno',
    badgeColor: '#f87171', // red-400
    badgeAchievement: 'Por viajar a otros mundos antes de dormir.',
    difficulty: 'Intermedio',
  },
  // Difíciles
  {
    id: 'no-phone-morning',
    title: 'Sin Celular en la Mañana',
    description: 'No revises el celular durante los primeros 30 minutos al despertar para mejorar la claridad mental.',
    icon: PhoneXMarkIcon,
    badgeTitle: 'Enfoque Matutino',
    badgeColor: '#facc15', // yellow-400
    badgeAchievement: 'Por empezar el día sin distracciones.',
    difficulty: 'Difícil',
  },
  {
    id: 'digital-detox-night',
    title: 'Digital Detox Nocturno',
    description: 'Pasa una noche entera sin usar pantallas después de las 8 p.m. para restaurar tu ritmo circadiano.',
    icon: ScreenIcon,
    badgeTitle: 'Purificador Digital',
    badgeColor: '#60a5fa', // blue-400
    badgeAchievement: 'Por una noche libre de pantallas.',
    difficulty: 'Difícil',
  },
  {
    id: 'no-screens-one-hour',
    title: 'Cero Pantallas (1h antes)',
    description: 'Evita todas las pantallas (TV, celular, tablet) durante la última hora antes de dormir.',
    icon: ScreenSlashIcon,
    badgeTitle: 'Desconectado Zen',
    badgeColor: '#0ea5e9', // sky-500
    badgeAchievement: 'Por darle un descanso a tus ojos y mente.',
    difficulty: 'Difícil',
  },
  {
    id: 'sleep-journal',
    title: 'Escribe tu Diario de Sueño',
    description: 'Anota cómo dormiste y cómo te sientes durante 3 días seguidos para identificar patrones.',
    icon: BookIcon,
    badgeTitle: 'Cronista de Morfeo',
    badgeColor: '#7dd3fc', // sky-300
    badgeAchievement: 'Por analizar tus patrones de sueño.',
    difficulty: 'Difícil',
  },
  {
    id: 'weekend-no-snooze',
    title: 'Reto del Fin de Semana sin Desvelo',
    description: 'Dormir y despertar a la misma hora el sábado y domingo para evitar el “jet lag social”.',
    icon: CalendarDaysIcon,
    badgeTitle: 'Regulador del Fin de Semana',
    badgeColor: '#e879f9', // fuchsia-400
    badgeAchievement: 'Por mantener tu ritmo el fin de semana.',
    difficulty: 'Difícil',
  },
];

export const RANKS: Rank[] = [
  {
    name: 'Iniciado del Descanso',
    color: '#cd7f32', // Bronce
    threshold: 1,
  },
  {
    name: 'Guardián del Sueño',
    color: '#ffd700', // Oro
    threshold: 5,
  },
  {
    name: 'Maestro Zen',
    color: '#e5e4e2', // Platino
    threshold: 10,
  },
  {
    name: 'Sleep Master',
    color: '#c026d3', // Fucsia para el rango final
    threshold: 15,
  },
];