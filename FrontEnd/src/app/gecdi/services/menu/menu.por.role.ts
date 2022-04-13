import {
  NbMenuItem
} from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import {
  MENU_ITEMS
} from '../../../pages/pages-menu';

interface OpcoesDaRole {
  rota: string,
    menu: NbMenuItem[]
}

type MenuMap = Record < string, OpcoesDaRole > ;

export const MENU_DA_ROLE: MenuMap = {
  1: {
    rota: '/gecdi/dashboard',
    menu: [{
        title: 'GECDI',
        group: true,
      },
      {
        title: 'Dashboard GECDI',
        icon: 'shopping-cart-outline',
        link: '/gecdi/dashboard',
        home: true,
      },
      {
        title: 'Atendimento',
        icon: 'shopping-cart-outline',
        link: '/gecdi/atendimento',
        home: true,
      },
      {
        title: 'login',
        icon: 'shopping-cart-outline',
        link: '/gecdi/security/auth',
        home: true,
      },
      {
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração envios',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envios',
        home: true,
      },
      {
        title: 'Monitoração Fila',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/fila',
        home: true,
      },
      {
        title: 'Solicitações',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/solicitacoes',
        home: true,
      },
      {
        title: 'resumo',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/resumo',
        home: true,
      },
      ...(!environment.production?MENU_ITEMS:[])
    ],
  },
  2: {
    rota: '/gecdi/dashboard',
    menu: [{
        title: 'GECDI',
        group: true,
      },
      {
        title: 'Dashboard GECDI',
        icon: 'shopping-cart-outline',
        link: '/gecdi/dashboard',
        home: true,
      },
      {
        title: 'Atendimento',
        icon: 'shopping-cart-outline',
        link: '/gecdi/atendimento',
        home: true,
      },
      {
        title: 'login',
        icon: 'shopping-cart-outline',
        link: '/gecdi/security/auth',
        home: true,
      },
      {
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração envios',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envios',
        home: true,
      },
      {
        title: 'Monitoração Fila',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/fila',
        home: true,
      },
      {
        title: 'Solicitações',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/solicitacoes',
        home: true,
      },
      {
        title: 'resumo',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/resumo',
        home: true,
      },
    ],
  },
  3: {
    rota: '/gecdi/push/envios',
    menu: [{
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração envios',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envios',
        home: true,
      },
      {
        title: 'Monitoração Fila',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/fila',
        home: true,
      },
    ],
  },
  4: {
    rota: '/gecdi/push/envios',
    menu: [{
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração envios',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envios',
        home: true,
      },
      {
        title: 'Monitoração Fila',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/fila',
        home: true,
      },
    ],
  },
  5: {
    rota: '/gecdi/push/envios',
    menu: [{
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração envios',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envios',
        home: true,
      },
      {
        title: 'Monitoração Fila',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/fila',
        home: true,
      },
    ],
  },
  6: {
    rota: '/gecdi/dashboard',
    menu: [{
        title: 'GECDI',
        group: true,
      },
      {
        title: 'Dashboard GECDI',
        icon: 'shopping-cart-outline',
        link: '/gecdi/dashboard',
        home: true,
      },
    ],
  },
}
