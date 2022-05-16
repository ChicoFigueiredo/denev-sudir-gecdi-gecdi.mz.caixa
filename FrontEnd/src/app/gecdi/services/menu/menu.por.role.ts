import {
  NbMenuItem
} from '@nebular/theme';
import {
  environment
} from '../../../../environments/environment';
//import { MENU_ITEMS  } from '../../../pages/pages-menu';
//import { MENU_ITENS_ORIGINAL } from '../../../pages/pages-menu.original';

interface OpcoesDaRole {
  rota: string,
    menu: NbMenuItem[]
}

type MenuMap = Record < string, OpcoesDaRole > ;

export const MENU_LOGIN: NbMenuItem[] = [{
  title: 'Login',
  icon: 'log-in-outline',
  link: '/gecdi/security/login',
}]

const MENU_LOGOFF: NbMenuItem[] = [{
  title: 'Logoff / Sair',
  icon: 'log-out-outline',
  link: '/gecdi/security/logoff',
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

const MENU_GECDI_ADMIN: NbMenuItem[] = [{
  title: 'GECDI Administração',
  group: true,
}, {
  title: 'Cadastro Usuários',
  icon: 'person-add-outline',
  link: '/gecdi/security/cadastro-usuarios',
}, {
  title: 'Manutenção Curvas',
  icon: 'bar-chart-outline',
  link: '/gecdi/push/manutencao-curvas',
}, {
  title: 'Processamento Upload',
  icon: 'cloud-upload-outline',
  link: '/gecdi/push/controle-processamento-upload-arquivo',
}, ]

const MENU_PUSH_BASE: NbMenuItem[] = [{
    title: 'PUSH',
    group: true,
  },
  {
    title: 'Envios do dia',
    icon: {
      icon: 'file-export',
      pack: 'font-awesome'
    },
    link: '/gecdi/push/envios',
  },
  {
    title: 'Minhas Solicitações',
    icon: {
      icon: 'clipboard-list',
      pack: 'font-awesome'
    },
    link: '/gecdi/push/minhas-solicitacoes',
  },
  {
    title: 'Resumo',
    icon: {
      icon: 'newspaper',
      pack: 'font-awesome'
    },
    link: '/gecdi/push/resumo',
  },
]

const MENU_PUSH_TI: NbMenuItem[] = [{
    title: 'PUSH',
    group: true,
  },
  {
    title: 'Envios do dia',
    icon: {
      icon: 'file-export',
      pack: 'font-awesome'
    },
    link: '/gecdi/push/envios',
    home: true
  },
  {
    title: 'Resumo',
    icon: {
      icon: 'newspaper',
      pack: 'font-awesome'
    },
    link: '/gecdi/push/resumo',
  },
]


const MENU_PUSH_ADMIN: NbMenuItem[] = [{
    title: 'Informe Whatsapp',
    icon: {
      icon: 'whatsapp',
      pack: 'gecdi-icons'
    },
    link: '/gecdi/push/resumo-whatsapp',
  },
  {
    title: 'Fila de Solicitações',
    icon: {
      icon: 'cubes',
      pack: 'font-awesome'
    },
    link: '/gecdi/push/solicitacoes',
  },
]

export const MENU_DA_ROLE: MenuMap = {
  1: { // Role Admin
    rota: '/gecdi/dashboard',
    menu: [
      ...MENU_GECDI_BASE,
      ...MENU_PUSH_BASE,
      ...MENU_PUSH_ADMIN,
      ...MENU_GECDI_ADMIN,
      ...MENU_LOGOFF,
      //...((!environment.production) ? MENU_ITENS_ORIGINAL : []),
    ],
  },
  2: { // Role GECDI
    rota: '/gecdi/dashboard',
    menu: [
      ...MENU_GECDI_BASE,
      ...MENU_PUSH_BASE,
      ...MENU_PUSH_ADMIN,
      ...MENU_LOGOFF,
    ],
  },
  3: { // Role Transmissor
    rota: '/gecdi/push/envios',
    menu: [
      ...MENU_PUSH_TI,
      ...MENU_LOGOFF,
    ],
  },
  4: { // Role GestorTI
    rota: '/gecdi/push/envios',
    menu: [
      ...MENU_PUSH_BASE,
      ...MENU_LOGOFF,
    ],
  },
  5: { // Solicitante (Gestor de produto)
    rota: '/gecdi/push/minhas-solicitacoes',
    menu: [
      ...MENU_PUSH_BASE,
      ...MENU_LOGOFF,
    ],
  },
  6: { // Role user
    rota: '/gecdi/dashboard',
    menu: [
      ...MENU_LOGOFF,
    ],
  },
}
