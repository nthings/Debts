import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Deudas',
    icon: 'credit-card-outline',
    link: '/pages/debts',
  },
  {
    title: 'Personas',
    icon: 'nb-person',
    link: '/pages/people',
  },
  {
    title: 'Periodos',
    icon: 'nb-compose',
    link: '/pages/period',
  },
];
