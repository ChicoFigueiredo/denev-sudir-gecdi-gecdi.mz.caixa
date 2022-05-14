import { NbMenuItem } from '@nebular/theme';
import { environment } from '../../environments/environment';
import { MENU_ITENS_ORIGINAL } from './pages-menu.original';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'GECDI',
    group: true,
  },
  ...(!environment.production ? MENU_ITENS_ORIGINAL:[])
];

