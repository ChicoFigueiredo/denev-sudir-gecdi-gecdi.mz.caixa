import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import * as moment from "moment";
import { Observable, of } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { environment } from "../../../../../environments/environment";
import { Solicitacao } from "../../../services/push/classes/solicitacao";
import { PushService } from "../../../services/push/push.service";
import { Unidade } from "../../../services/unidades/classes/unidades";
import { UnidadesService } from "../../../services/unidades/unidades.service";
import { User } from "../../../services/user/classes/User";
import { UserService } from "../../../services/user/user.service";
import { ValidateMessage } from "../../helpers/validators/mensagem.validator";

@Component({
  selector: "ngx-detalhes-solicitacao",
  templateUrl: "./detalhes-solicitacao.component.html",
  styleUrls: ["./detalhes-solicitacao.component.scss"],
})
export class DetalhesSolicitacaoComponent implements OnInit {

  public isEmojiPickerVisible: boolean;
  public listPrioridades:number[] = Array.from({ length: 255 }, (_, i) => i);
  public estaSalvando:boolean = false;
  @Input("mode") public modo: string = "normal";
  //listCGC$:Observable<Unidade[]> = of([]);
  listCGC$:Unidade[];
  @ViewChild('autoCGC') autoCGC;
  private _solicitacao: Solicitacao;
  get solicitacao() { return this._solicitacao; }
  @Input("solicitacao") set solicitacao(value: Solicitacao) {

    if (value?.idSolicitacao_PUSH > 0){
      value.enviar_a_partir_de = <any>moment(value.enviar_a_partir_de).toDate();
      value.enviar_no_maximo_ate = <any>moment(value.enviar_no_maximo_ate).toDate();
      value.enviar_Horario_InicialFormatado = <any>moment(value.enviar_Horario_InicialFormatado,'HH:mm');
      value.enviar_Horario_FinalFormatado = <any>moment(value.enviar_Horario_FinalFormatado,'HH:mm');
      this.formSolicitacao.patchValue(value);
    }
    this._solicitacao = value;
  }

  @ViewChild("diag") dialog: ElementRef<any>;
  @ViewChild("message") message: ElementRef<any>;
  @ViewChild("nomeSolicitacao") public nomeSolicitacao: ElementRef<any>;
  minDataSolicitacao = moment();
  dataDe:any = moment().toDate();
  private user:User;

  public formSolicitacao:FormGroup = new FormGroup({
    idSolicitacao_PUSH                     : new FormControl(-1                                              ,[]),
    nome_Solicitacao                       : new FormControl(''                                              ,[Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern("^(?!.*(\\w)\\1{3,}).+$")]),
    reQ_WO_Aprovacao_Mensagem              : new FormControl(''                                              ,[Validators.required, Validators.pattern('REQ\\d{12,12}$')]),
    reQ_WO_Aprovacao_Mensagem_Texto        : new FormControl(''                                              ,[]),
    wF_GECRM                               : new FormControl(null                                            ,[Validators.pattern('^[0-9]*$')]),
    idEnvio_Mensagem                       : new FormControl(-1                                              ,[]),
    mensagem                               : new FormControl(''                                              ,[Validators.required, Validators.minLength(20), Validators.maxLength(1000), ValidateMessage]),
    idTipoMensagem                         : new FormControl(1                                               ,[]),
    canal                                  : new FormControl(null                                            ,[Validators.required]),
    quantidade_Total                       : new FormControl(null                                            ,[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]),
    limitacao_Tranche                      : new FormControl(60000                                           ,[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]),
    impactos_Previstos                     : new FormControl(null                                            ,[Validators.required, Validators.minLength(20), Validators.pattern('^(?!.*(\\w)\\1{3,}).+$')]),
    enviar_a_partir_de                     : new FormControl(moment().add(2,'days').startOf('day').toDate()  ,[]), // Validators.required, Validators.pattern('\\d{2}\\/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[.]\\/\d{4}')
    enviar_no_maximo_ate                   : new FormControl(moment().add(35,'days').startOf('day').toDate() ,[]), // Validators.required, Validators.pattern('\\d{2}\\/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[.]\\/\d{4}')
    enviar_Horario_InicialFormatado        : new FormControl(moment('07:00','HH:mm')                         ,[]),
    enviar_Horario_FinalFormatado          : new FormControl(moment('21:00','HH:mm')                         ,[]),
    enviar_SEG                             : new FormControl(true                                            ,[]),
    enviar_TER                             : new FormControl(true                                            ,[]),
    enviar_QUA                             : new FormControl(true                                            ,[]),
    enviar_QUI                             : new FormControl(true                                            ,[]),
    enviar_SEX                             : new FormControl(true                                            ,[]),
    enviar_SAB                             : new FormControl(true                                            ,[]),
    enviar_DOM                             : new FormControl(false                                           ,[]),
    Limite_Mensagens_Por_Dia               : new FormControl(null                                            ,[]),
    observacoes                            : new FormControl(''                                              ,[]),
    prioridade                             : new FormControl(100                                             ,[]),
    idCurva                                : new FormControl(-1                                              ,[]),
    autorizacao_Gestor_PUSH                : new FormControl(false                                           ,[]),
    cancelado                              : new FormControl(false                                           ,[]),
    cgcDemandante                          : new FormControl(-1                                              ,[]),
    nome_Campo1                            : new FormControl(''                                              ,[]),
    nome_Campo2                            : new FormControl(''                                              ,[]),
    nome_Campo3                            : new FormControl(''                                              ,[]),
    nome_Campo4                            : new FormControl(''                                              ,[]),
    nome_Campo5                            : new FormControl(''                                              ,[]),
    enviar_Horario_Inicial                 : new FormControl(null                                            ,[]), // Validators.required, Validators.pattern('\\d{2}:\\d{2}')
    enviar_Horario_Final                   : new FormControl(null                                            ,[]), // Validators.required, Validators.pattern('\\d{2}:\\d{2}')
    quantidade_Enviada                     : new FormControl(0                                               ,[]),
    matricula_Cadastramento                : new FormControl(null                                            ,[]),
    data_Cadastramento                     : new FormControl(null                                            ,[]),
    matricula_Autorizacao_Gestor_PUSH      : new FormControl(null                                            ,[]),
    bloqueado_TI                           : new FormControl(false                                           ,[]),
    matricula_Bloqueio_TI                  : new FormControl(null                                            ,[]),
    data_Hora_Bloqueio                     : new FormControl(null                                            ,[]),
    data_Hora_Autorizacao                  : new FormControl(null                                            ,[]),
    matricula_Cancelamento                 : new FormControl(null                                            ,[]),
    data_Hora_Cancelamento                 : new FormControl(null                                            ,[]),
    cgcExecutora                           : new FormControl(-1                                              ,[]),
    finalizado                             : new FormControl(false                                           ,[]),
    quantidade_Agendada                    : new FormControl(0                                               ,[]),
    quantidade_Total_Restante              : new FormControl(0                                               ,[]),
    canalNavigation                        : new FormControl(null                                            ,[]),
    idEnvio_MensagemNavigation             : new FormControl(null                                            ,[]),
    solicitacao_Clientes                   : new FormControl(null                                            ,[]),
    solicitacao_Simulacao_Envio            : new FormControl(null                                            ,[]),
    CanalNavigation                        : new FormControl(null                                            ,[]),
    Quantidade_Maxima_AutorizadaNavigation : new FormControl(null                                            ,[]),
    Solicitacao_Clientes                   : new FormControl(null                                            ,[]),
    Solicitacao_Simulacao_Envio            : new FormControl(null                                            ,[]),
    idCurvaNavigation                      : new FormControl(null                                            ,[]),
    Tipo_Categoria_Solicitacao             : new FormControl(1                                               ,[Validators.required]),
  })

  constructor(
    private userService:UserService,
    public pushService:PushService,
    private serviceSticker: NbToastrService,
    private unidadeService: UnidadesService,
  ) {
    userService.changeUser().subscribe(u => this.user = u);

    this.formSolicitacao.get("cgcDemandante")
                        .valueChanges
                        .subscribe(t => {
                            if (t.length>=3)
                               this.unidadeService.getUnidades(t).subscribe(u => this.listCGC$=u);
                        })
  }

  ngOnInit(): void {

    moment.locale('pt-br');
    this.nomeSolicitacao.nativeElement.focus();

  }



  filterDataDe = (date) => {
    if (this.modo==="admin")
        return true;
    const diasPermitidos:Array<number> = [];
    if (this.f.enviar_DOM.value) diasPermitidos.push(0);
    if (this.f.enviar_SEG.value) diasPermitidos.push(1);
    if (this.f.enviar_TER.value) diasPermitidos.push(2);
    if (this.f.enviar_QUA.value) diasPermitidos.push(3);
    if (this.f.enviar_QUI.value) diasPermitidos.push(4);
    if (this.f.enviar_SEX.value) diasPermitidos.push(5);
    if (this.f.enviar_SAB.value) diasPermitidos.push(6);

    let diaAberto = moment();

    if (diaAberto.hour() > environment.horarioLimite)
        diaAberto = diaAberto.add(2,'days').startOf('day');
    else
        diaAberto = diaAberto.add(1,'days').startOf('day');

    if (date && date.getDay())
      return diasPermitidos.includes(date.getDay()) && moment(date).isSameOrAfter(diaAberto);
    else
      return false;
  };

  filterDataAte = (date) => {
    if (this.modo==="admin")
        return true;
    const diasPermitidos:Array<number> = [];
    if (this.f.enviar_DOM.value) diasPermitidos.push(0);
    if (this.f.enviar_SEG.value) diasPermitidos.push(1);
    if (this.f.enviar_TER.value) diasPermitidos.push(2);
    if (this.f.enviar_QUA.value) diasPermitidos.push(3);
    if (this.f.enviar_QUI.value) diasPermitidos.push(4);
    if (this.f.enviar_SEX.value) diasPermitidos.push(5);
    if (this.f.enviar_SAB.value) diasPermitidos.push(6);
    this.dataDe = moment(this.formSolicitacao.controls.enviar_a_partir_de.value).toDate();
    if (date && date.getDay())
      return diasPermitidos.includes(date.getDay()) && moment(date).isSameOrAfter(moment(this.dataDe).startOf('day'));
    else
      return false;
  };


  public addEmoji(event) {
    //this.textArea = `${this.textArea}${event.emoji.native}`;
    //alert(event.emoji.native);
    this.insertAtCursor(this.message.nativeElement, event.emoji.native);
    this.isEmojiPickerVisible = false;
    this.message.nativeElement.focus();
    this.formSolicitacao.patchValue({mensagem: this.message.nativeElement.value}); // necessário para forçar a mensagem a receber o emoji
  }

  insertAtCursor(myField, myValue) {
    if (myField.selectionStart || myField.selectionStart == "0") {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      myField.value =
        myField.value.substring(0, startPos) +
        myValue +
        myField.value.substring(endPos, myField.value.length);
    } else {
      myField.value += myValue;
    }
  }

  alteraCurva(sol:Solicitacao,$event) {
    this.pushService.setCurvaSolicitacao(sol,$event).subscribe((s:Solicitacao) => {
       this.serviceSticker.show(`Solicitação ID ${s.idSolicitacao_PUSH} setado com a curva ${s.idCurva} - ${ this.pushService.Curvas.filter(x => x.idCurva_Envio==$event)[0].nome_Curva_Envio }`,'',{ status: 'success', duration: 10000 })
    },(e) => {
       this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message} ao setar a curva`,'',{ status: 'danger', duration: 10000 })
    })
  }


  alteraTipoCategoria(sol:Solicitacao,$event) {
    if(this.modo==="admin"){
      this.pushService.setTipoCategoria(sol,$event).subscribe((s:Solicitacao) => {
         this.serviceSticker.show(`Solicitação ID ${s.idSolicitacao_PUSH} setado com a curva ${s.idCurva} - ${ this.pushService.Curvas.filter(x => x.idCurva_Envio==$event)[0].nome_Curva_Envio }`,'',{ status: 'success', duration: 10000 })
      },(e) => {
         this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message} ao setar a curva`,'',{ status: 'danger', duration: 10000 })
      })
    }
  }


  alteraPrioridade(sol:Solicitacao,$event) {
    this.pushService.setPrioridadeSolicitacao(sol,$event).subscribe((s:Solicitacao) => {
       sol = s;
       this.serviceSticker.show(`Solicitação ID ${s.idSolicitacao_PUSH} setado com prioridade ${s.prioridade}`,'',{ status: 'success', duration: 10000 })
    },(e) => {
       this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message} ao setar a prioridade`,'',{ status: 'danger', duration: 10000 })
    })
  }


  changeCheckAutorizado(sol:Solicitacao,$event){
    if(!this.estaSalvando){
      if(sol){
        this.pushService.setSolicitacaoAutorizado(sol.idSolicitacao_PUSH,!sol.autorizacao_Gestor_PUSH).subscribe((e:Solicitacao) => {
          if(e.autorizacao_Gestor_PUSH == !sol.autorizacao_Gestor_PUSH){
            sol.autorizacao_Gestor_PUSH = e.autorizacao_Gestor_PUSH;
            sol = e;
            this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} marcado como ${e?.autorizacao_Gestor_PUSH?'AUTORIZADO':'NÃO AUTORIZADO'}`,'',{ status: 'success' })
          } else {
            this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} com erro na marcação de autorização do gestor`,'',{ status: 'danger', duration: 10000 })
          }
        },(e) => {
          this.serviceSticker.show(`ERRO! Solicitação ID ${sol.idSolicitacao_PUSH} retornou erro ${e.message}`,'',{ status: 'danger', duration: 10000 })
        })
      }
    }
  }


  changeCheckCancelado(s:Solicitacao,$event){
    if(!this.estaSalvando){
      if(s){
        this.pushService.setSolicitacaoCancelado(s.idSolicitacao_PUSH,!s.cancelado).subscribe((e:Solicitacao) => {
          if(e.cancelado == !s.cancelado){
            s.cancelado = e.cancelado;
            s = e;
            this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} marcado como ${e?.cancelado?'CANCELADO':'NÃO CANCELADO'}`,'',{ status: 'success' })
          } else {
            this.serviceSticker.show(`Envio ID ${e?.idSolicitacao_PUSH} com erro na marcação de cancelamento`,'',{ status: 'danger', duration: 10000 })
          }
        })
      }
    }
  }

  colorFromTipoCategoria(tipo){
    return this.pushService
               .tiposCategoriasSolicitacao
               .filter(x => x.tipo_Categoria_Solicitacao1 === tipo)[0]?.cor
  }


  // convenience getter for easy access to form fields
  get f() { return this.formSolicitacao.controls; }

  I8N_TRADUCAO = {
    search: "Busca",
    emojilist: "Lista de emojis",
    notfound: "Não encontrei o emoji",
    clear: "Limpar",
    categories: {
      search: "Resultado da Busca",
      recent: "Usado frequentemente",
      people: "Sorrisos e pessoas",
      nature: "Animais e Natureza",
      foods: "Comida e Bebida",
      activity: "Atividade",
      places: "Viajem e ludates",
      objects: "Objetos",
      symbols: "Símbolos",
      flags: "Bandeiras",
      custom: "Customizados",
    },
    skintones: {
      1: "Default Skin Tone",
      2: "Light Skin Tone",
      3: "Medium-Light Skin Tone",
      4: "Medium Skin Tone",
      5: "Medium-Dark Skin Tone",
      6: "Dark Skin Tone",
    },
  };
}
