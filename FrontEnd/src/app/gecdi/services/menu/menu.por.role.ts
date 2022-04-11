import {
  NbMenuItem
} from '@nebular/theme';
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
        title: 'Security',
        icon: 'shopping-cart-outline',
        link: '/gecdi/security',
        home: true,
      },
      {
        title: 'INSPIRAÇÃO',
        group: true,
      },
      {
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração Envio',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envio',
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
        title: 'Security',
        icon: 'shopping-cart-outline',
        link: '/gecdi/security',
        home: true,
      },
      {
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração Envio',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envio',
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
    ],
  },
  3: {
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
        title: 'Security',
        icon: 'shopping-cart-outline',
        link: '/gecdi/security',
        home: true,
      },
      {
        title: 'PUSH',
        group: true,
      },
      {
        title: 'Monitoração Envio',
        icon: 'shopping-cart-outline',
        link: '/gecdi/push/envio',
        home: true,
      },
    ]
  },
}
