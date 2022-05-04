import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Solicitacao } from "../../../services/push/classes/solicitacao";

@Component({
  selector: "ngx-detalhes-solicitacao",
  templateUrl: "./detalhes-solicitacao.component.html",
  styleUrls: ["./detalhes-solicitacao.component.scss"],
})
export class DetalhesSolicitacaoComponent implements OnInit {

  public isEmojiPickerVisible: boolean;
  @Input("solicitacao") public chamado: Solicitacao;
  @ViewChild("diag") dialog: ElementRef<any>;
  @ViewChild("message") message: ElementRef<any>;

  public formSolicitacao:FormGroup = new FormGroup({
    nome          : new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('^(?!.*(\w)\1{3,}).+$')]),
    req           : new FormControl('', [Validators.required, Validators.pattern('REQ\d{12,}$')]),
    msg           : new FormControl('', [Validators.required, Validators.minLength(20), Validators.pattern('^(?!.*(\w)\1{3,}).+$')]),
    qtdMsg        : new FormControl('', [Validators.required, Validators.min(15), Validators.pattern('\d')]),
    qtdLimTranche : new FormControl('', [Validators.required, Validators.min(15), Validators.pattern('\d')]),
    impactos      : new FormControl('', [Validators.required, Validators.minLength(20), Validators.pattern('^(?!.*(\w)\1{3,}).+$')]),
  })

  constructor() {}

  ngOnInit(): void {}

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
