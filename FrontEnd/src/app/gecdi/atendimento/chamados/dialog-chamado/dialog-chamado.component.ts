import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation  } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Chamado, ChamadoMinimo } from '../../../services/chamados/chamados';
import { ChamadosService } from '../../../services/chamados/chamados.service';
import { TemplatesRespostaService } from '../../../services/templates-resposta/templates-resposta.service';
import { TemplateResposta } from '../../../services/templates-resposta/templates_respostas_interfaces';
import { UserService } from '../../../services/user/user.service';
import { openWindowWithPost } from '../../../services/window-post';

@Component({
  selector: 'ngx-dialog-chamado',
  templateUrl: './dialog-chamado.component.html',
  styleUrls: ['./dialog-chamado.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class DialogChamadoComponent implements OnInit {

  @Input('chamado') public chamado: Chamado;
  @Input('position') public position: number;
  @Input('listaChamados') public listaChamados: ChamadoMinimo[];
  @Input('callbackMark') public callbackMark:any;

  @ViewChild('dialog') dialog: TemplateRef<any>;
  @ViewChild('inputTemplateRef') inputTemplateRef: TemplateRef<any>;


  private templateResponse:Map<string,TemplateResposta> = new Map<string,TemplateResposta>();
  private templateResponseArray:string[] = [];
  filteredNgModelOptions$: Observable<string[]>;

  constructor(
    private dialogService: NbDialogService,
    private serviceChamado: ChamadosService,
    private serviceTemplateResposta: TemplatesRespostaService,
    private serviceSticker: NbToastrService,
    private serviceUser: UserService,
  ) {
    this.serviceTemplateResposta.changeTemplatesRespostas.subscribe((arrayTemplates:TemplateResposta[]) => {
      if (arrayTemplates?.length > 0) {
        this.templateResponse.clear();
        arrayTemplates.forEach(u => {
          this.templateResponse.set(u.vTemplateResposta,u)
          this.templateResponseArray.push(u.vTemplateResposta)
        });
        this.filteredNgModelOptions$ = of(this.templateResponseArray);
      }

    });
  }


  ngOnInit(): void {
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.templateResponseArray.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }


  public selectedTemplateResponseString:string = "";
  public selectedTemplateResponse:TemplateResposta = null;
  onChangeTemplateResponse(value){
    if (this.templateResponse.has(value)){
      this.selectedTemplateResponseString = value;
      this.selectedTemplateResponse = this.templateResponse.get(value);
    } else {
      this.filteredNgModelOptions$ = of(this.filter(value));
    }
  }

  public openDialog(){
    this.dialogService.open(this.dialog, { hasScroll: true, dialogClass: 'dialog-class' });
    this.selectedTemplateResponseString = this.chamado?.vTemplateResposta;
    if(this.templateResponse.has(this.selectedTemplateResponseString)){
      this.selectedTemplateResponse = this.templateResponse.get(this.selectedTemplateResponseString);
    }
  }

  getPosition(pos){
    if (pos < 0 && this.position > 0){

      this.position--;
      const idChamado = this.listaChamados[this.position].idChamado;
      this.serviceChamado.getChamadoById(idChamado).subscribe(c => {
        this.chamado = c;
        if (this.chamado?.vTemplateResposta == null || this.chamado?.vTemplateResposta == ""){
          this.selectedTemplateResponseString =  null;
          this.selectedTemplateResponse = null;
        }
      });

    } else if (pos > 0 && this.position < this.listaChamados.length){

      this.position++;
      const idChamado = this.listaChamados[this.position].idChamado;
      this.serviceChamado.getChamadoById(idChamado).subscribe(c => {
        this.chamado = c;
        if (this.chamado?.vTemplateResposta == null || this.chamado?.vTemplateResposta == ""){
          this.selectedTemplateResponseString =  null;
          this.selectedTemplateResponse = null;
        }
      });

    }
  }

  private ultimoCarimbo:string = ""
  Carimbar(chamado:Chamado,TR:TemplateResposta){
    if (TR == null){
      if (this.templateResponse.has(this.selectedTemplateResponseString)){
        TR = this.templateResponse.get(this.selectedTemplateResponseString)
        this.selectedTemplateResponse = TR;
        this.selectedTemplateResponseString = TR.vTemplateResposta;
      } else if (this.templateResponse.has((<any>this.inputTemplateRef).nativeElement.value)){
        TR = this.templateResponse.get((<any>this.inputTemplateRef).nativeElement.value)
        this.selectedTemplateResponse = TR;
        this.selectedTemplateResponseString = TR.vTemplateResposta;
      } //
    }
    if (TR == null){
      this.serviceSticker.show(`Escolha o template!`,'',{ status: 'danger', duration: 5000 });
      (<any>this.inputTemplateRef).nativeElement.focus();
    } else {
      this.serviceChamado.getCarimbarChamadoById(this.chamado.idChamado,TR.vTemplateResposta).subscribe(c => {
        this.chamado = c;
        this.ultimoCarimbo = TR.vTemplateResposta;
        this.selectedTemplateResponse = TR;
        this.selectedTemplateResponseString = TR.vTemplateResposta;
        this.serviceSticker.show(`Chamado Nº ${c.idChamado} Carimbado com a ação '${TR.vTemplateResposta}' com sucesso`,'',{ status: 'success' })
      },(e => {
        this.serviceSticker.show(`Chamado Nº ${this.chamado.idChamado} com erro na carimbação: ${JSON.stringify(e,null,0)}`,'',{ status: 'danger', duration: 5000 })
      }));
    }
  }

  desCarimbar(chamado:Chamado,TR:TemplateResposta=null){
    this.selectedTemplateResponseString = null;
    this.selectedTemplateResponse = null;
    this.serviceChamado.getDesCarimbarChamadoById(this.chamado.idChamado).subscribe(c => {
      this.chamado = c;
      this.serviceSticker.show(`Chamado Nº ${c.idChamado} descarimbado com sucesso`,'',{ status: 'success' })
    },(e => {
      this.serviceSticker.show(`Chamado Nº ${this.chamado.idChamado} com erro na descarimbação: ${JSON.stringify(e,null,0)}`,'',{ status: 'danger', duration: 5000 })
    }))
  }

  changeCheckTratado(c:Chamado,$event:boolean){
    c.bFoiTratado = $event;
    this.serviceChamado
        .putTratarChamadoById(
          c.idChamado,
          $event,
          this.serviceUser.currentUser.apelidoAtendente
        ).subscribe((ct:Chamado) => {
          if(ct.bFoiTratado == $event){
            this.serviceSticker.show(`Chamado Nº ${c?.idChamado} marcado como ${c?.bFoiTratado?'TRATADO':'NÃO TRATADO'}`,'',{ status: 'success' })
            this.listaChamados[this.position].bFoiTratado = ct.bFoiTratado;
            this.callbackMark(this.position,ct.bFoiTratado)
          } else {
            this.serviceSticker.show(`Chamado Nº ${c?.idChamado} com erro na marcação de tratamento`,'',{ status: 'danger', duration: 5000 })
          }
        },(e => this.serviceSticker.show(`Chamado Nº ${c?.idChamado} com erro na marcação de tratamento: ${JSON.stringify(e,null,0)}`,'',{ status: 'danger', duration: 5000 })))
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.ctrlKey && (event.key == "ArrowRight"  || event.key == "ArrowDown") ){
      this.getPosition(+1)
    } else if(event.ctrlKey && (event.key == "ArrowLeft" || event.key == "ArrowUp") ){
      this.getPosition(-1)
    } else if(event.ctrlKey && (event.key == "F") ){
      (<any>this.dialog).close()
    } else if(event.key == "F6") {
      (<any>this.inputTemplateRef).nativeElement.focus();
    } else if(event.key == "F7") {
      let TR:TemplateResposta;
      if (this.selectedTemplateResponseString == null || this.selectedTemplateResponseString == "" ){
        if (this.templateResponse.has(this.ultimoCarimbo)){
          TR = this.templateResponse.get(this.ultimoCarimbo);
        }
      } else {
        TR = this.selectedTemplateResponse;
      }
      this.Carimbar(this.chamado,TR)
    } else if(event.key == "F8") {
      this.desCarimbar(this.chamado)
    }
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
