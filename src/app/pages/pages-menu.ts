import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/charts/chartjs-dynamic',
    home: true,
  },
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Security',
    icon: 'unlock-outline',
    children: [
      {
        title: 'Role Management',
        link: '/pages/tables/smart-table/admin/role_management',
      },
      {
        title: 'User Management',
        link: '/pages/tables/smart-table/admin/user_management',
      },
      {
        title: 'Menu Management',
        link: '/pages/tables/tree-grid-dynamic',
      },
    ],
  },
  {
    title: 'Reports',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Input',
        link: '/pages/forms/dynamic',
      },
      {
        title: 'Table Report',
        link: '/pages/tables/smart-table/user/sample_report',
      },
    ],
  },
];
