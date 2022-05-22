import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";
import { Solicitacao } from "../../../services/push/classes/solicitacao";
import { User } from "../../../services/user/classes/User";
import { UserService } from "../../../services/user/user.service";

@Component({
  selector: "ngx-detalhes-solicitacao",
  templateUrl: "./detalhes-solicitacao.component.html",
  styleUrls: ["./detalhes-solicitacao.component.scss"],
})
export class DetalhesSolicitacaoComponent implements OnInit {

  public isEmojiPickerVisible: boolean;
  @Input("mode") public modo: string = "normal";

  //@Input("solicitacao") public solicitacao: Solicitacao;
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
  minDataSolicitacao = moment();
  dataDe:any = moment().toDate();
  private user:User;

  public formSolicitacao:FormGroup = new FormGroup({
    idSolicitacao_PUSH                     : new FormControl(-1                                              ,[]),
    wF_GECRM                               : new FormControl(null                                            ,[Validators.pattern('^[0-9]*$')]),
    nome_Solicitacao                       : new FormControl(''                                              ,[Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern("^(?!.*(\\w)\\1{3,}).+$")]),
    reQ_WO_Aprovacao_Mensagem              : new FormControl(''                                              ,[Validators.required, Validators.pattern('REQ\\d{12,12}$')]),
    reQ_WO_Aprovacao_Mensagem_Texto        : new FormControl(''                                              ,[]),
    idEnvio_Mensagem                       : new FormControl(-1                                              ,[]),
    mensagem                               : new FormControl(''                                              ,[Validators.required, Validators.minLength(20), Validators.maxLength(1000), Validators.pattern('^(?!.*(\\w)\\1{3,}).+$')]),
    canal                                  : new FormControl(null                                            ,[Validators.required]),
    nome_Campo1                            : new FormControl(''                                              ,[]),
    nome_Campo2                            : new FormControl(''                                              ,[]),
    nome_Campo3                            : new FormControl(''                                              ,[]),
    nome_Campo4                            : new FormControl(''                                              ,[]),
    nome_Campo5                            : new FormControl(''                                              ,[]),
    idCurva_Envio_Dia_Normal               : new FormControl(null                                            ,[]),
    idCurva_Envio_Dia_Cheio                : new FormControl(null                                            ,[]),
    enviar_a_partir_de                     : new FormControl(moment().add(2,'days').startOf('day').toDate()  ,[]), // Validators.required, Validators.pattern('\\d{2}\\/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[.]\\/\d{4}')
    enviar_no_maximo_ate                   : new FormControl(moment().add(35,'days').startOf('day').toDate() ,[]), // Validators.required, Validators.pattern('\\d{2}\\/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[.]\\/\d{4}')
    enviar_SEG                             : new FormControl(true                                            ,[]),
    enviar_TER                             : new FormControl(true                                            ,[]),
    enviar_QUA                             : new FormControl(true                                            ,[]),
    enviar_QUI                             : new FormControl(true                                            ,[]),
    enviar_SEX                             : new FormControl(true                                            ,[]),
    enviar_SAB                             : new FormControl(true                                            ,[]),
    enviar_DOM                             : new FormControl(false                                           ,[]),
    enviar_Horario_Inicial                 : new FormControl(null                                            ,[]), // Validators.required, Validators.pattern('\\d{2}:\\d{2}')
    enviar_Horario_Final                   : new FormControl(null                                            ,[]), // Validators.required, Validators.pattern('\\d{2}:\\d{2}')
    limitacao_Tranche                      : new FormControl(60000                                           ,[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]),
    quantidade_Total                       : new FormControl(null                                            ,[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]),
    quantidade_Enviada                     : new FormControl(0                                               ,[]),
    matricula_Cadastramento                : new FormControl(null                                            ,[]),
    data_Cadastramento                     : new FormControl(null                                            ,[]),
    autorizacao_Gestor_PUSH                : new FormControl(false                                           ,[]),
    matricula_Autorizacao_Gestor_PUSH      : new FormControl(null                                            ,[]),
    bloqueado_TI                           : new FormControl(false                                           ,[]),
    matricula_Bloqueio_TI                  : new FormControl(null                                            ,[]),
    data_Hora_Bloqueio                     : new FormControl(null                                            ,[]),
    data_Hora_Autorizacao                  : new FormControl(null                                            ,[]),
    cancelado                              : new FormControl(false                                           ,[]),
    matricula_Cancelamento                 : new FormControl(null                                            ,[]),
    data_Hora_Cancelamento                 : new FormControl(null                                            ,[]),
    cgcDemandante                          : new FormControl(-1                                              ,[]),
    cgcExecutora                           : new FormControl(-1                                              ,[]),
    finalizado                             : new FormControl(false                                           ,[]),
    impactos_Previstos                     : new FormControl(null                                            ,[Validators.required, Validators.minLength(20), Validators.pattern('^(?!.*(\\w)\\1{3,}).+$')]),
    prioridade                             : new FormControl(100                                             ,[]),
    quantidade_Agendada                    : new FormControl(0                                               ,[]),
    quantidade_Total_Restante              : new FormControl(0                                               ,[]),
    canalNavigation                        : new FormControl(null                                            ,[]),
    idCurva_Envio_Dia_CheioNavigation      : new FormControl(null                                            ,[]),
    idCurva_Envio_Dia_NormalNavigation     : new FormControl(null                                            ,[]),
    idEnvio_MensagemNavigation             : new FormControl(null                                            ,[]),
    solicitacao_Clientes                   : new FormControl(null                                            ,[]),
    solicitacao_Simulacao_Envio            : new FormControl(null                                            ,[]),
    enviar_Horario_InicialFormatado        : new FormControl(moment('07:00','HH:mm')                         ,[]),
    enviar_Horario_FinalFormatado          : new FormControl(moment('21:00','HH:mm')                         ,[]),
    Limite_Mensagens_Por_Dia               : new FormControl(null                                            ,[]),
    idTipoMensagem                         : new FormControl(1                                               ,[]),
    CanalNavigation                        : new FormControl(null                                            ,[]),
    Quantidade_Maxima_AutorizadaNavigation : new FormControl(null                                            ,[]),
    Solicitacao_Clientes                   : new FormControl(null                                            ,[]),
    Solicitacao_Simulacao_Envio            : new FormControl(null                                            ,[]),
    idCurvaNavigation                      : new FormControl(null                                            ,[]),
  })


  filterDataDe = (date) => {
    if (date && date.getDay())
      return date.getDay() !== 0 && moment(date).isSameOrAfter(moment().add(2,'days').startOf('day'));
    else
      return false;
  };

  filterDataAte = (date) => {
    this.dataDe = moment(this.formSolicitacao.controls.enviar_a_partir_de.value).toDate();
    if (date && date.getDay())
      return date.getDay() !== 0 && moment(date).isSameOrAfter(moment(this.dataDe).startOf('day'));
    else
      return false;
  };


  constructor(
    private userService:UserService,
  ) {
    userService.changeUser().subscribe(u => this.user = u);
  }

  ngOnInit(): void {

    moment.locale('pt-br');

    if (this.solicitacao?.idSolicitacao_PUSH > 0){
      // // conversões conveniêntes para aceitação no FormGroup e nos componentes de data e hora
      // this.solicitacao.enviar_a_partir_de = <any>moment(this.solicitacao.enviar_a_partir_de).toDate();
      // this.solicitacao.enviar_no_maximo_ate = <any>moment(this.solicitacao.enviar_no_maximo_ate).toDate();
      // this.solicitacao.enviar_Horario_InicialFormatado = <any>moment(this.solicitacao.enviar_Horario_InicialFormatado,'HH:mm');
      // this.solicitacao.enviar_Horario_FinalFormatado = <any>moment(this.solicitacao.enviar_Horario_FinalFormatado,'HH:mm');

      // this.formSolicitacao.patchValue(this.solicitacao);
    }

  }

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
