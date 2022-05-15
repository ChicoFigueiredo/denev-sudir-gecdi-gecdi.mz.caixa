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
  @Input("solicitacao") public solicitacao: Solicitacao;
  @ViewChild("diag") dialog: ElementRef<any>;
  @ViewChild("message") message: ElementRef<any>;
  minDataSolicitacao = moment();
  dataDe = moment();
  private user:User;

  public formSolicitacao:FormGroup = new FormGroup({
    idSolicitacao_PUSH                     : new FormControl(-1                              ,[]),
    wF_GECRM                               : new FormControl(null                            ,[Validators.pattern('^[0-9]*$')]),
    nome_Solicitacao                       : new FormControl(''                              ,[Validators.required, Validators.minLength(10), Validators.maxLength(100), Validators.pattern("^(?!.*(\\w)\\1{3,}).+$")]),
    reQ_WO_Aprovacao_Mensagem              : new FormControl(''                              ,[Validators.required, Validators.pattern('REQ\\d{12,12}$')]),
    reQ_WO_Aprovacao_Mensagem_Texto        : new FormControl(''                              ,[]),
    idEnvio_Mensagem                       : new FormControl(-1                              ,[]),
    mensagem                               : new FormControl(''                              ,[Validators.required, Validators.minLength(20), Validators.maxLength(100), Validators.pattern('^(?!.*(\\w)\\1{3,}).+$')]),
    canal                                  : new FormControl(null                            ,[Validators.required]),
    nome_Campo1                            : new FormControl(''                              ,[]),
    nome_Campo2                            : new FormControl(''                              ,[]),
    nome_Campo3                            : new FormControl(''                              ,[]),
    nome_Campo4                            : new FormControl(''                              ,[]),
    nome_Campo5                            : new FormControl(''                              ,[]),
    idCurva_Envio_Dia_Normal               : new FormControl(null                            ,[]),
    idCurva_Envio_Dia_Cheio                : new FormControl(null                            ,[]),
    enviar_a_partir_de                     : new FormControl('2022-05-09'                    ,[]), // Validators.required, Validators.pattern('\\d{2}\\/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[.]\\/\d{4}')
    enviar_no_maximo_ate                   : new FormControl('2022-05-10'                    ,[]), // Validators.required, Validators.pattern('\\d{2}\\/(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)[.]\\/\d{4}')
    enviar_SEG                             : new FormControl(true                            ,[]),
    enviar_TER                             : new FormControl(true                            ,[]),
    enviar_QUA                             : new FormControl(true                            ,[]),
    enviar_QUI                             : new FormControl(true                            ,[]),
    enviar_SEX                             : new FormControl(true                            ,[]),
    enviar_SAB                             : new FormControl(true                            ,[]),
    enviar_DOM                             : new FormControl(false                           ,[]),
    enviar_Horario_Inicial                 : new FormControl(null                            ,[]), // Validators.required, Validators.pattern('\\d{2}:\\d{2}')
    enviar_Horario_Final                   : new FormControl(null                            ,[]), // Validators.required, Validators.pattern('\\d{2}:\\d{2}')
    limitacao_Tranche                      : new FormControl(null                            ,[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]),
    quantidade_Total                       : new FormControl(null                            ,[Validators.required, Validators.minLength(2), Validators.pattern('^[0-9]*$')]),
    quantidade_Enviada                     : new FormControl(0                               ,[]),
    matricula_Cadastramento                : new FormControl(null                            ,[]),
    data_Cadastramento                     : new FormControl(null                            ,[]),
    autorizacao_Gestor_PUSH                : new FormControl(false                           ,[]),
    matricula_Autorizacao_Gestor_PUSH      : new FormControl(null                            ,[]),
    bloqueado_TI                           : new FormControl(false                           ,[]),
    matricula_Bloqueio_TI                  : new FormControl(null                            ,[]),
    data_Hora_Bloqueio                     : new FormControl(null                            ,[]),
    data_Hora_Autorizacao                  : new FormControl(null                            ,[]),
    cancelado                              : new FormControl(false                           ,[]),
    matricula_Cancelamento                 : new FormControl(null                            ,[]),
    data_Hora_Cancelamento                 : new FormControl(null                            ,[]),
    cgcDemandante                          : new FormControl(-1                              ,[]),
    cgcExecutora                           : new FormControl(-1                              ,[]),
    finalizado                             : new FormControl(false                           ,[]),
    impactos_Previstos                     : new FormControl(null                            ,[Validators.required, Validators.minLength(20), Validators.pattern('^(?!.*(\\w)\\1{3,}).+$')]),
    prioridade                             : new FormControl(100                             ,[]),
    quantidade_Agendada                    : new FormControl(0                               ,[]),
    quantidade_Total_Restante              : new FormControl(0                               ,[]),
    canalNavigation                        : new FormControl(null                            ,[]),
    idCurva_Envio_Dia_CheioNavigation      : new FormControl(null                            ,[]),
    idCurva_Envio_Dia_NormalNavigation     : new FormControl(null                            ,[]),
    idEnvio_MensagemNavigation             : new FormControl(null                            ,[]),
    solicitacao_Clientes                   : new FormControl(null                            ,[]),
    solicitacao_Simulacao_Envio            : new FormControl(null                            ,[]),
    enviar_Horario_InicialFormatado        : new FormControl(new Date('1980-01-01 07:00:00') ,[]),
    enviar_Horario_FinalFormatado          : new FormControl(new Date('1980-01-01 21:00:00') ,[]),
    Limite_Mensagens_Por_Dia               : new FormControl(null                            ,[]),
    idTipoMensagem                         : new FormControl(1                               ,[]),
    CanalNavigation                        : new FormControl(null                            ,[]),
    Quantidade_Maxima_AutorizadaNavigation : new FormControl(null                            ,[]),
    Solicitacao_Clientes                   : new FormControl(null                            ,[]),
    Solicitacao_Simulacao_Envio            : new FormControl(null                            ,[]),
    idCurvaNavigation                      : new FormControl(null                            ,[]),
  })


  filterDataDe = (date) => date.getDay() !== 0 && date >= moment().add(2,'days').startOf('day');
  filterDataAte = (date) => date.getDay() !== 0 && date >= this.dataDe.startOf('day');


  constructor(
    private userService:UserService,
  ) {
    userService.changeUser().subscribe(u => this.user = u);
  }

  ngOnInit(): void {

    moment.locale('pt-br');

    if (moment().hour()>12)
      this.dataDe = moment().add(2,'days').startOf('day');
    else
      this.dataDe = moment().add(2,'days').startOf('day');

    if (this.dataDe.day() === 0)
      this.dataDe = this.dataDe.add(1,'days').startOf('day');

    this.formSolicitacao.patchValue({
      enviar_a_partir_de: this.dataDe.format('YYYY-MM-DD'),
      enviar_no_maximo_ate: this.dataDe.add(35,'days').startOf('day').format('YYYY-MM-DD')
    })


  }

  public addEmoji(event) {
    //this.textArea = `${this.textArea}${event.emoji.native}`;
    //alert(event.emoji.native);
    this.insertAtCursor(this.message.nativeElement, event.emoji.native);
    this.isEmojiPickerVisible = false;
    this.message.nativeElement.focus();
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

  filtraDataDe(ev){
    if (ev.srcElement.value != ''){
      let data = moment(ev.srcElement.value,"DD/MMM./yyyy");
      if (data.isValid()){
          const min = moment().add(2,'days').startOf('day');
          if (data.isBefore(min))
            ev.srcElement.value = min.format('DD/MMM./yyyy');

          data = moment(ev.srcElement.value,"DD/MMM./yyyy");
          if (data.day() === 0)
            ev.srcElement.value = data.add(1,'days').startOf('day').format('DD/MMM./yyyy');
      } else {
          data = moment().add(2,'days').startOf('day');
          if (data.day() === 0)
            data = data.add(1,'days').startOf('day')
          ev.srcElement.value = data.format('DD/MMM./yyyy');
      }
      this.dataDe = data;
    }
  }

  filtraDataAte(ev){
    if (ev.srcElement.value != ''){
      let data = moment(ev.srcElement.value,"DD/MMM./yyyy");
      if (data.isValid()){
          const min = moment().add(2,'days').startOf('day');
          if (data.isBefore(this.dataDe))
            ev.srcElement.value = this.dataDe.add(30,'days').startOf('day').format('DD/MMM./yyyy');

          data = moment(ev.srcElement.value,"DD/MMM./yyyy");
          if (data.day() === 0)
            ev.srcElement.value = data.add(1,'days').startOf('day').format('DD/MMM./yyyy');
      } else {
          data = this.dataDe.add(30,'days').startOf('day');
          if (data.day() === 0)
            data = data.add(1,'days').startOf('day')
          ev.srcElement.value = data.format('DD/MMM./yyyy');
      }
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
