import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Atendente } from '../services/atendentes/atendentes';
import { AtendentesService } from '../services/atendentes/atendentes.service';
import { CacheParametros } from '../services/cache-parametros/cache-parametros.interfaces';
import { CacheParametrosService } from '../services/cache-parametros/cache-parametros.service';
import { Chamado, ChamadoMinimo } from '../services/chamados/chamados';
import { ChamadosService } from '../services/chamados/chamados.service';
import { User } from '../services/user/classes/User';
import { UserService } from '../services/user/user.service';
import { openWindowWithPost } from '../services/window-post';
import { DialogChamadoComponent } from './chamados/dialog-chamado/dialog-chamado.component';

const API_USER = environment.urlAPI + '/api/user';

@Component({
  selector: 'ngx-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {

  public atendentes: Observable<Atendente[]>;
  public chamados: Observable<ChamadoMinimo[]>;
  public listaFisicaChamados:ChamadoMinimo[];
  public apelidoAtendente: string = "";
  @ViewChild('diag') dialog: ElementRef<DialogChamadoComponent>;
  public chamadoAtual:Observable<Chamado> = null;
  public parametros:CacheParametros = null;
  public estatisticas:EstatisticasChamados= new EstatisticasChamados;
  public estatisticasAtendentes:Array<EstatisticasAtendente>= new Array<EstatisticasAtendente>();

  constructor(
    private serviceAtendentes: AtendentesService,
    private serviceChamados: ChamadosService,
    private serviceUser: UserService,
    private serviceParametros: CacheParametrosService,
    private serviceSticker: NbToastrService,
  ) {
    this.serviceUser.changeUser().subscribe( (u:User) => {
      if (u){
          if (u.user.role == 1){
            this.apelidoAtendente = "<Todos>"
          }
          this.atendentes = serviceAtendentes.getAtendentes().pipe(
            map(at => {
              this.onChange(this.apelidoAtendente)
              return at;
            })
          );
        }
      });
   }

   onChange(newValue) {
     this.apelidoAtendente = newValue;
     this.syncList();
   }

    syncList(){

      this.chamados = this.serviceChamados.getChamados(true,null,null,this.apelidoAtendente,null,null,null,null,null,"minimo")
          .pipe(
              map((lc:ChamadoMinimo[],i) => {
                if (lc.length > 0)
                this.idPrimeiroChamado = lc[0].idChamado;

                const est: EstatisticasChamados = new EstatisticasChamados;
                const atend: Map < string, number > = new Map();
                const atendentes: Map < string, EstatisticasAtendente > = new Map();
                lc.forEach(c => {
                    est.TotalChamados++;
                    if (c.vOrigem == "ATENDER")
                        est.TotalChamadosAtender++;
                    else
                        est.TotalChamadosServicos++;

                    if (c?.vTipoOcorrencia == "OUVIDORIA")
                        est.Ouvidorias++;

                    if (/venc/gi.test(c.vSituacaoGECDI)) {
                        est.ChamadosVencidosOuVencendo++;
                        if (c?.vTipoOcorrencia == "OUVIDORIA")
                            est.OuvidoriasVencendo++;
                    }

                    if (/último dia/gi.test(c.vSituacaoGECDI))
                        est.ChamadosUltimoDiaTransferir++;

                    if (/não transf/gi.test(c.vSituacaoGECDI))
                        est.ChamadosNaoTransferir++;

                    if (c && c?.vApelidoAtendente != "" && c?.vApelidoAtendente != undefined) {
                        est.ChamadosAtribuidos++;
                        if (atend.has(c.vApelidoAtendente))
                            atend.set(c.vApelidoAtendente, atend.get(c.vApelidoAtendente) + 1);
                        else
                            atend.set(c.vApelidoAtendente, 1);

                        if (!atendentes.has(c.vApelidoAtendente)) {
                            let atdestat = new EstatisticasAtendente;
                            atdestat.Apelido = c.vApelidoAtendente;
                            atdestat.Matricula = c.cUsuario;
                            atdestat.UrlAvatar = `${API_USER}/${c.cUsuario}/avatar`; //`http://tdv.caixa/img/${c.cUsuario}.jpg`;
                            atendentes.set(c.vApelidoAtendente, atdestat);
                        }
                        let atdestat = atendentes.get(c.vApelidoAtendente);
                        if (!c?.bFoiTratado) {
                            if (c?.vTipoOcorrencia == "OUVIDORIA")
                                atdestat.Ouvidorias++;
                            else
                                atdestat.Chamados++;
                            atdestat.Total++;
                        }

                        atendentes.set(c.vApelidoAtendente, atdestat);
                    } else {
                        est.ChamadosNaoAtribuidos++;
                    }

                })
                est.Atendentes = atend.size;
                this.estatisticas = est;
                this.listaFisicaChamados = lc;

                this.estatisticasAtendentes = new Array<EstatisticasAtendente>();

                atendentes.forEach((v, k) => this.estatisticasAtendentes.push(v))

                this.estatisticasAtendentes = this.estatisticasAtendentes.sort((a, b) => b.Total - a.Total);

                return lc;
              })
          );

       this.serviceParametros.getPatametros().subscribe(u => {
         this.parametros  = u;
       })
   }

   public posicao:number = 0;
   private idPrimeiroChamado: number = -1;

   detalheChamado(idChamado, position){

      this.chamadoAtual = this.serviceChamados.getChamadoById(idChamado);
      this.posicao = position;
      (<any> this.dialog).openDialog();

   }

    checkRow(c:ChamadoMinimo){

      if(c.bFoiTratado){
        return 'row-green '
      }

      if(/venc/gi.test(c.vSituacaoGECDI)){
        return 'row-red '
      }

      if(/ouvidoria/gi.test(c.vTipoOcorrencia)){
        return 'row-blue'
      }

    }

    checkCellTransferir(c:ChamadoMinimo){

      if(c.bFoiTratado){
        return 'row-green '
      }

      if(/não tran/gi.test(c.vSituacaoGECDI)){
        return 'cell-nao-transferir'
      }

      if(/último dia/gi.test(c.vSituacaoGECDI)){
        return 'cell-ultimo-dia-transferir'
      }

    }

    checkCell(chamado:Chamado){
      if (chamado?.vTipoOcorrencia == "OUVIDORIA"){
        return 'row-blue'
      }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if(event.key == "F2"){
        if(this.idPrimeiroChamado>0){
            this.chamadoAtual = this.serviceChamados.getChamadoById(this.idPrimeiroChamado);
            this.posicao = 0;
            (<any> this.dialog).openDialog();
        }
      }
    }

    changeCheckTratado(c:Chamado,$event:boolean){
      c.bFoiTratado = $event;
      this.serviceChamados
          .putTratarChamadoById(
            c.idChamado,
            $event,
            this.serviceUser?.currentUser?.apelidoAtendente
          ).subscribe((ct:Chamado) => {
            if(ct.bFoiTratado == $event){
              this.serviceSticker.show(`Chamado Nº ${c?.idChamado} marcado como ${c?.bFoiTratado?'TRATADO':'NÃO TRATADO'}`,'',{ status: 'success' })
              //this.chamados[this.posicao].bFoiTratado = ct.bFoiTratado;
            } else {
              this.serviceSticker.show(`Chamado Nº ${c?.idChamado} com erro na marcação de tratamento`,'',{ status: 'danger', duration: 5000 })
            }
          },(e => this.serviceSticker.show(`Chamado Nº ${c?.idChamado} com erro na marcação de tratamento: ${JSON.stringify(e,null,0)}`,'',{ status: 'danger', duration: 5000 })))
    }

  positionTratado(pos,trat){
    //this.chamados[pos].bFoiTratado = trat;
    //this.chamadoAtual.map(r => r[pos].bFoiTratado = trat);
    this.listaFisicaChamados[pos].bFoiTratado = trat;
  }

  ngOnInit(): void {
  }

  openAtender(numeroOcorrencia){
    openWindowWithPost("https://atender.caixa/siouv/jsp/login/DetalharOcorrencia.do", {
      sequencialOcorrencia: numeroOcorrencia,
      method: 'iniciarDetalhamentoEnviadas',
      perfilUsuario: 'gestor',
      escopo:'I',
      sequencialTipoOcorrencia: '2',
      situacao: 'Enviada',
      sequencialFase:'2',
      gravaHistorico:'S',
      paginaVoltar:'ListaOcorrenciasResponder',
      ordenacaoOuvidoria: '3' ,
      ordenacaoSac: '3',
      ordenacaoInterna: '3',
      tipoOrdenacaoOuvidoria: 'DESC',
      tipoOrdenacaoSac: 'DESC',
      tipoOrdenacaoInterna: 'DESC'
    });
  }
}

class EstatisticasChamados {
  public TotalChamados:number=0;
  public TotalChamadosAtender:number=0;
  public TotalChamadosServicos:number=0;
  public Ouvidorias:number=0;
  public OuvidoriasVencendo:number=0;
  public ChamadosVencidosOuVencendo:number=0;
  public ChamadosUltimoDiaTransferir:number=0;
  public ChamadosNaoTransferir:number=0;
  public ChamadosAtribuidos:number=0;
  public ChamadosNaoAtribuidos:number=0;
  public Atendentes:number=0;
}


class EstatisticasAtendente {
  public Apelido:String="";
  public Matricula:String="";
  public UrlAvatar:String="";
  public Ouvidorias:number=0;
  public Chamados:number=0;
  public Total:number=0;
}
