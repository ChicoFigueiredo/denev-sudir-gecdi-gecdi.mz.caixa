
export interface Role {
  idRole:                     number;
  role:                       string;
  nome_Role:                  string;
  rota:                       string;
  ordem:                      number;
  tem_Permissao_Geral:        boolean;
  e_Admin:                    boolean;
  pode_Marcar_Envio:          boolean;
  pode_Geranciar_Simulacao:   boolean;
  pode_Ver_Relatorio:         boolean;
  pode_Gerenciar_Solicitacao: boolean;
  pode_Gerenciar_Envios:      boolean;
  pode_Gerenciar_Curvas:      boolean;
  pode_Suspender_Envios:      boolean;
}
