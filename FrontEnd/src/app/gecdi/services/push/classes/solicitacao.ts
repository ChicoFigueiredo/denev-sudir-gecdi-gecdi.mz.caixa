// Generated by https://quicktype.io

export interface Solicitacao {
  idSolicitacao_PUSH:                 number;
  wF_GECRM:                           number;
  nome_Solicitacao:                   string;
  reQ_WO_Aprovacao_Mensagem:          string;
  reQ_WO_Aprovacao_Mensagem_Texto:    null;
  idEnvio_Mensagem:                   number;
  mensagem:                           string;
  canal:                              string;
  nome_Campo1:                        string;
  nome_Campo2:                        string;
  nome_Campo3:                        string;
  nome_Campo4:                        string;
  nome_Campo5:                        string;
  idCurva_Envio_Dia_Normal:           number;
  idCurva_Envio_Dia_Cheio:            number;
  enviar_a_partir_de:                 string;
  enviar_no_maximo_ate:               string;
  enviar_SEG:                         boolean;
  enviar_TER:                         boolean;
  enviar_QUA:                         boolean;
  enviar_QUI:                         boolean;
  enviar_SEX:                         boolean;
  enviar_SAB:                         boolean;
  enviar_DOM:                         boolean;
  enviar_Horario_Inicial:             string;
  enviar_Horario_Final:               string;
  limitacao_Tranche:                  number;
  quantidade_Total:                   number;
  quantidade_Enviada:                 number;
  matricula_Cadastramento:            null;
  data_Cadastramento:                 string;
  autorizacao_Gestor_PUSH:            boolean;
  matricula_Autorizacao_Gestor_PUSH:  null;
  bloqueado_TI:                       boolean;
  matricula_Bloqueio_TI:              null;
  data_Hora_Bloqueio:                 null;
  data_Hora_Autorizacao:              null;
  cancelado:                          boolean;
  matricula_Cancelamento:             null;
  data_Hora_Cancelamento:             null;
  cgcDemandante:                      number;
  cgcExecutora:                       number;
  finalizado:                         boolean;
  impactos_Previstos:                 string;
  prioridade:                         number;
  quantidade_Agendada:                number;
  quantidade_Total_Restante:          number;
  canalNavigation:                    null;
  idCurva_Envio_Dia_CheioNavigation:  null;
  idCurva_Envio_Dia_NormalNavigation: null;
  idEnvio_MensagemNavigation:         string;
  solicitacao_Clientes:               any[];
  solicitacao_Simulacao_Envio:        any[];
  enviar_Horario_InicialFormatado:    string;
  enviar_Horario_FinalFormatado:      string;
}

export interface IDEnvioMensagemNavigation {
  idEnvio_Mensagem:     number;
  mensagem1:            string;
  data_Inicio:          null;
  data_Fim:             null;
  tranches:             null;
  push_Enviados:        null;
  apelido:              null;
  ativo:                boolean;
  enviados:             number;
  faltam:               number;
  appCaixa:             boolean;
  caixaTem:             boolean;
  mensagemRegex:        null | string;
  monitoração_Producao: null | string;
  caixA_Tem:            boolean;
  cartão:               boolean;
  crédito:              boolean;
  pre_Autorizado:       boolean;
  envio_CPF:            any[];
  envio_Tranche:        any[];
  solicitacao:          Array<Solicitacao | null>;
}

