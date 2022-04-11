// Generated by https://quicktype.io

import { Chamado } from "../chamados/chamados";

export interface Atendente {
    $id:                     string;
    vApelidoAtendente:       string;
    cUsuario:                null | string;
    bRecebeChamado:          boolean;
    bRecebeOuvidoria:        boolean;
    bE_Ativo:                boolean;
    cUsuarioNavigation:      null | string;
    chamados:                Chamados;
    distribuicao_Atendentes: DistribuicaoAtendentes;
    distribuicao_Chamados:   DistribuicaoChamados;
}

// export interface ResponseAtendentes {
//     $id:     string;
//     $values: Atendente[];
// }


export interface ResponseAtendentes extends Array<Atendente>{

};


// export interface DistribuicaoAtendentes {
//     $id:     string;
//     $values: [];
// }

export interface DistribuicaoAtendentes extends Array<string>{
    
};

// export interface DistribuicaoChamados {
//     $id:     string;
//     $values: [];
// }

export interface DistribuicaoChamados extends Array<string>{
    
};


// export interface Chamados {
//     $id:     string;
//     $values: [];
// }

export interface Chamados extends Array<Chamado>{
    
};