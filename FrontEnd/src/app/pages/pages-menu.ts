import { NbMenuItem } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { MENU_ITENS_ORIGINAL } from './pages-menu.original';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'GECDI',
    group: true,
  },
  {
    title: 'Login',
    icon: 'shopping-cart-outline',
    link: '/gecdi/dashboard',
    home: true,
  },
  ...(!environment.production ? MENU_ITENS_ORIGINAL:[])
];

