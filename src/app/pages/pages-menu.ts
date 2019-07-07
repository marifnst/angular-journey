import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Reports',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Report',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Table Report',
        link: '/pages/tables/smart-table',
      },
    ],
  },
];
