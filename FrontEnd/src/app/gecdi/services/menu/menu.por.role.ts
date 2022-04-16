import {
  NbMenuItem
} from '@nebular/theme';
import {
  environment
} from '../../../../environments/environment';
import {
  MENU_ITEMS
} from '../../../pages/pages-menu';
import { MENU_ITENS_ORIGINAL } from '../../../pages/pages-menu.original';

interface OpcoesDaRole {
  rota: string,
    menu: NbMenuItem[]
}

type MenuMap = Record < string, OpcoesDaRole > ;

const MENU_LOGIN: NbMenuItem[] = [{
  title: 'Login',
  icon: 'log-in',
  link: '/gecdi/security/auth',
  home: true,
}]

const MENU_USER: NbMenuItem[] = [{
    title: 'GECDI',
    group: true,
  },
  {
    title: 'Dashboard GECDI',
    icon: 'home-outline',
    link: '/gecdi/dashboard',
    home: true,
  },
]

const MENU_GECDI_BASE: NbMenuItem[] = [
  ...MENU_USER,
  {
    title: 'Atendimento',
    icon: 'headphones-outline',
    link: '/gecdi/atendimento',
  },
]



const MENU_GECDI_ADMIN: NbMenuItem[] = [
  {
    title: 'Cadastro Usuários',
    icon: 'person-add-outline',
    link: '/gecdi/security/cadastro-usuarios',
  },
]

const MENU_PUSH_BASE: NbMenuItem[] = [{
    title: 'PUSH',
    group: true,
  },
  {
    title: 'Envios do dia',
    icon: {icon:'file-export', pack:'font-awesome'},
    link: '/gecdi/push/envios',
  },
  {
    title: 'Solicitações/Fila',
    icon: {icon:'cubes', pack:'font-awesome'},
    link: '/gecdi/push/solicitacoes',
  },
  {
    title: 'Resumo',
    icon: {icon:'newspaper', pack:'font-awesome'},
    link: '/gecdi/push/resumo',
  },
]

const MENU_PUSH_ADMIN: NbMenuItem[] = [{
  title: 'Informe Whatsapp',
  icon: {icon:'whatsapp', pack:'gecdi-icons'},
  link: '/gecdi/push/resumo-whatsapp',
}, ]

export const MENU_DA_ROLE: MenuMap = {
  1: { // Role Admin
    rota: '/gecdi/dashboard',
    menu: [
      ...MENU_GECDI_BASE,
      ...MENU_GECDI_ADMIN,
      ...MENU_LOGIN,
      ...MENU_PUSH_BASE,
      ...MENU_PUSH_ADMIN,
      ...((!environment.production) ? MENU_ITENS_ORIGINAL : [])
    ],
  },
  2: { // Role GECDI
    rota: '/gecdi/dashboard',
    menu: [
      ...MENU_GECDI_BASE,
      ...MENU_LOGIN,
      ...MENU_PUSH_BASE,
      ...MENU_PUSH_ADMIN,
    ],
  },
  3: { // Role Transmissor
    rota: '/gecdi/push/envios',
    menu: [
      ...MENU_PUSH_BASE,
    ],
  },
  4: { // Role GestorTI
    rota: '/gecdi/push/envios',
    menu: [
      ...MENU_PUSH_BASE,
    ],
  },
  5: { // Solicitante (Gestor de produto)
    rota: '/gecdi/push/envios',
    menu: [
      ...MENU_PUSH_BASE,
    ],
  },
  6: { // Role user
    rota: '/gecdi/dashboard',
    menu: [

    ],
  },
}
