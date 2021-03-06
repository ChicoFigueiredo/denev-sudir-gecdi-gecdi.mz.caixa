// Generated by https://quicktype.io

import { Solicitacao } from "./solicitacao";

export interface SolicitacaoCliente {
  idSolicitacao_Cliente:                   number;
  idSolicitacao_PUSH:                      number;
  idSolicitacao_Simulacao_Envio:           number;
  cpf:                                     number;
  campo1:                                  string;
  campo2:                                  string;
  campo3:                                  string;
  campo4:                                  string;
  campo5:                                  string;
  agendado:                                boolean;
  enviado:                                 boolean;
  idSolicitacao_PUSHNavigation:            Solicitacao | null;
  idSolicitacao_Simulacao_EnvioNavigation: any;
  cpfFormatado:                            string;
  mensagemPreview:                         string;
}
