!function(){function e(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}function a(e,a){for(var t=0;t<a.length;t++){var n=a[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}(self.webpackChunkgecdi_mz_caixa=self.webpackChunkgecdi_mz_caixa||[]).push([[837],{34837:function(a,n,o){"use strict";o.r(n),o.d(n,{AtendimentoModule:function(){return ne}});var i=o(38583),l=o(3679),s=o(82008),c=o(99763),r=o(88002),d=o(92340);function u(e,a){var t=document.createElement("form");for(var n in t.target="_blank",t.method="POST",t.action=e,t.style.display="none",a){var o=document.createElement("input");o.type="hidden",o.name=n,o.value=a[n],t.appendChild(o)}document.body.appendChild(t),t.submit(),document.body.removeChild(t)}var m=o(37716),h=o(91841),p=d.N.urlAPI+"/api/atendentes",g=function(){var a=function(){function a(t){e(this,a),this.http=t,this.atendentes=[]}return t(a,[{key:"getAtendentes",value:function(){var e=this;return this.http.get("".concat(p)).pipe((0,r.U)(function(a){return e.atendentes=a,a}))}}]),a}();return a.\u0275fac=function(e){return new(e||a)(m.LFG(h.eN))},a.\u0275prov=m.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a}(),v=d.N.urlAPI+"/api/chamados",f=function(){var a=function(){function a(t){e(this,a),this.http=t}return t(a,[{key:"getChamados",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",t=arguments.length>8&&void 0!==arguments[8]?arguments[8]:null;return this.http.get("".concat(v,"?abertos=").concat(e,"&atendente=").concat(a,"&tratado=").concat(t))}},{key:"getChamadoById",value:function(e){return this.http.get("".concat(v,"/").concat(e))}},{key:"getDesCarimbarChamadoById",value:function(e){return this.http.post("".concat(v,"/").concat(e,"/descarimbar"),null)}},{key:"getCarimbarChamadoById",value:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return this.http.post("".concat(v,"/").concat(e,"/carimbar/?carimbo=").concat(encodeURI(a)),null)}},{key:"putTratarChamadoById",value:function(e,a,t){return this.http.post("".concat(v,"/").concat(e,"/tratado/?foiTratado=").concat(a,"&apelidoAtendente=").concat(t),null)}}]),a}();return a.\u0275fac=function(e){return new(e||a)(m.LFG(h.eN))},a.\u0275prov=m.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a}(),Z=o(88182),T=o(26215),A=d.N.urlAPI+"/api/CacheParametroes",C=function(){var a=function(){function a(t){e(this,a),this.http=t,this.parametros=null,this._changeParametros=new T.X(this.parametros)}return t(a,[{key:"changeParametros",get:function(){return this._changeParametros.asObservable()}},{key:"getPatametros",value:function(){var e=this;return this.http.get("".concat(A)).pipe((0,r.U)(function(a){return e.parametros=a,e._changeParametros.next(e.parametros),a}))}}]),a}();return a.\u0275fac=function(e){return new(e||a)(m.LFG(h.eN))},a.\u0275prov=m.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a}(),b=o(25917),q=d.N.urlAPI+"/api/templates_resposta",_=function(){var a=function(){function a(t){e(this,a),this.http=t,this.templates=null,this._changeTemplatesRespostas=new T.X(this.templates),this.getTemplatesRespostas().subscribe(function(e){return null})}return t(a,[{key:"changeTemplatesRespostas",get:function(){return this._changeTemplatesRespostas.asObservable()}},{key:"getTemplatesRespostas",value:function(){var e=this;return this.http.get("".concat(q)).pipe((0,r.U)(function(a){return e.templates=a,e._changeTemplatesRespostas.next(e.templates),a}))}}]),a}();return a.\u0275fac=function(e){return new(e||a)(m.LFG(h.eN))},a.\u0275prov=m.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a}();function x(e,a){if(1&e&&m._UZ(0,"div",7),2&e){var t=m.oxw(3);m.Q6J("innerHTML",null==t.template?null:t.template.vResposta,m.oJD)}}function O(e,a){if(1&e&&(m.TgZ(0,"pre",8),m._uU(1),m.qZA()),2&e){var t=m.oxw(3);m.xp6(1),m.Oqu(null==t.template?null:t.template.vResposta)}}function U(e,a){if(1&e&&(m.TgZ(0,"div"),m.TgZ(1,"span"),m._uU(2,"PR\xc9VIA: "),m.TgZ(3,"b",2),m._uU(4),m.qZA(),m.qZA(),m._uU(5," \xa0\xa0\xa0 "),m._UZ(6,"BR"),m._uU(7),m.YNc(8,x,1,1,"div",5),m.TgZ(9,"b"),m.YNc(10,O,2,1,"pre",6),m.qZA(),m.qZA()),2&e){var t=m.oxw(2);m.xp6(4),m.AsE("",null==t.template?null:t.template.vAcao," | ",null==t.template?null:t.template.vTemplateResposta,""),m.xp6(3),m.hij(" ",null==t.template||null==t.template.cgC_TranferenciaNavigation?null:t.template.cgC_TranferenciaNavigation.nome_Exibicao," "),m.xp6(1),m.Q6J("ngIf","Fechar!"==(null==t.template?null:t.template.vAcao)),m.xp6(2),m.Q6J("ngIf","Transferir!"==(null==t.template?null:t.template.vAcao))}}function y(e,a){if(1&e&&m._UZ(0,"div",7),2&e){var t=m.oxw(3);m.Q6J("innerHTML",null==t.chamado||null==t.chamado.vTemplateRespostaNavigation?null:t.chamado.vTemplateRespostaNavigation.vResposta,m.oJD)}}function w(e,a){if(1&e&&(m.TgZ(0,"pre",8),m._uU(1),m.qZA()),2&e){var t=m.oxw(3);m.xp6(1),m.Oqu(null==t.chamado||null==t.chamado.vTemplateRespostaNavigation?null:t.chamado.vTemplateRespostaNavigation.vResposta)}}function R(e,a){if(1&e&&(m.TgZ(0,"div"),m.TgZ(1,"span"),m._uU(2,"CARIMBADO: "),m.TgZ(3,"b",2),m._uU(4),m.qZA(),m.qZA(),m._uU(5," \xa0\xa0\xa0 "),m._UZ(6,"BR"),m._uU(7),m.YNc(8,y,1,1,"div",5),m.TgZ(9,"b"),m.YNc(10,w,2,1,"pre",6),m.qZA(),m.qZA()),2&e){var t=m.oxw(2);m.xp6(4),m.AsE("",null==t.chamado?null:t.chamado.vAcao," | ",null==t.chamado?null:t.chamado.vTemplateResposta,""),m.xp6(3),m.hij(" ",null==t.chamado||null==t.chamado.cgC_TranferenciaNavigation?null:t.chamado.cgC_TranferenciaNavigation.nome_Exibicao," "),m.xp6(1),m.Q6J("ngIf","Fechar!"==(null==t.chamado||null==t.chamado.vTemplateRespostaNavigation?null:t.chamado.vTemplateRespostaNavigation.vAcao)),m.xp6(2),m.Q6J("ngIf","Transferir!"==(null==t.chamado||null==t.chamado.vTemplateRespostaNavigation?null:t.chamado.vTemplateRespostaNavigation.vAcao))}}function k(e,a){if(1&e&&(m.TgZ(0,"div",1),m.YNc(1,U,11,5,"div",4),m.YNc(2,R,11,5,"div",4),m.qZA()),2&e){var t=m.oxw();m.xp6(1),m.Q6J("ngIf",null!=t.template&&null==(null==t.chamado?null:t.chamado.vTemplateResposta)),m.xp6(1),m.Q6J("ngIf",null==t.template||null!=(null==t.chamado?null:t.chamado.vTemplateResposta)||""!=(null==t.chamado?null:t.chamado.vTemplateResposta))}}var N=function(){var a=function(){function a(){e(this,a),this.template=null}return t(a,[{key:"ngOnInit",value:function(){}}]),a}();return a.\u0275fac=function(e){return new(e||a)},a.\u0275cmp=m.Xpm({type:a,selectors:[["ngx-dados-chamado"]],inputs:{chamado:"chamado",template:"template"},decls:73,vars:26,consts:[[1,"row","margin-top-1em"],[1,"col-md-4","top-linha-cinza"],[1,"blue-font"],["class","col-md-4 top-linha-cinza",4,"ngIf"],[4,"ngIf"],["class","limitar-25em",3,"innerHTML",4,"ngIf"],["class","limitar-25em",4,"ngIf"],[1,"limitar-25em",3,"innerHTML"],[1,"limitar-25em"]],template:function(e,a){1&e&&(m.TgZ(0,"div",0),m.TgZ(1,"div",1),m._uU(2," Solicitante: "),m.TgZ(3,"b"),m._uU(4),m.qZA(),m._UZ(5,"br"),m._uU(6," Situa\xe7\xe3o (GECDI): "),m.TgZ(7,"b"),m._uU(8),m.qZA(),m._UZ(9,"br"),m._uU(10," Abertura: "),m.TgZ(11,"b"),m._uU(12),m.ALo(13,"date"),m.qZA(),m._UZ(14,"br"),m._uU(15," Vencimento: "),m.TgZ(16,"b"),m._uU(17),m.ALo(18,"date"),m.qZA(),m._UZ(19,"br"),m._uU(20," Transferir at\xe9: "),m.TgZ(21,"b"),m._uU(22),m.ALo(23,"date"),m.qZA(),m._UZ(24,"br"),m._uU(25," Atendente: "),m.TgZ(26,"b",2),m._uU(27),m.qZA(),m._UZ(28,"br"),m.qZA(),m.TgZ(29,"div",1),m._uU(30," Tipo: "),m.TgZ(31,"b"),m._uU(32),m.qZA(),m._UZ(33,"br"),m._uU(34," Ocorrencia: "),m.TgZ(35,"b"),m._uU(36),m.qZA(),m._UZ(37,"br"),m._uU(38," Natureza: "),m.TgZ(39,"b"),m._uU(40),m.qZA(),m._UZ(41,"br"),m._uU(42," Assunto: "),m.TgZ(43,"b"),m._uU(44),m.qZA(),m._UZ(45,"br"),m._uU(46," Item: "),m.TgZ(47,"b"),m._uU(48),m.qZA(),m._UZ(49,"br"),m._uU(50," Motivo: "),m.TgZ(51,"b"),m._uU(52),m.qZA(),m.qZA(),m.YNc(53,k,3,2,"div",3),m.qZA(),m.TgZ(54,"div",0),m.TgZ(55,"div",1),m._uU(56," Manifesto:"),m._UZ(57,"br"),m.TgZ(58,"b"),m.TgZ(59,"pre"),m._uU(60),m.qZA(),m.qZA(),m.qZA(),m.TgZ(61,"div",1),m._uU(62," Movimentacoes:"),m._UZ(63,"br"),m.TgZ(64,"b"),m.TgZ(65,"pre"),m._uU(66),m.qZA(),m.qZA(),m.qZA(),m.TgZ(67,"div",1),m._uU(68," Comentario:"),m._UZ(69,"br"),m.TgZ(70,"b"),m.TgZ(71,"pre"),m._uU(72),m.qZA(),m.qZA(),m.qZA(),m.qZA()),2&e&&(m.xp6(4),m.AsE("",null==a.chamado?null:a.chamado.vCPF_CNPJ_Solicitante," ",null==a.chamado?null:a.chamado.vNomeSolicitante,""),m.xp6(4),m.Oqu(null==a.chamado?null:a.chamado.vSituacao),m.xp6(4),m.Oqu(m.xi3(13,17,null==a.chamado?null:a.chamado.dDataHoraAbertura,"dd/LL/yyyy HH:mm")),m.xp6(5),m.Oqu(m.xi3(18,20,null==a.chamado?null:a.chamado.dDataVencimento,"dd/LL/yyyy")),m.xp6(5),m.Oqu(m.xi3(23,23,null==a.chamado?null:a.chamado.dDataMaximaTransferencia,"dd/LL/yyyy")),m.xp6(5),m.Oqu(null==a.chamado?null:a.chamado.vApelidoAtendente),m.xp6(5),m.Oqu(null==a.chamado?null:a.chamado.vTipoOrigem),m.xp6(4),m.Oqu(null==a.chamado?null:a.chamado.vTipoOcorrencia),m.xp6(4),m.Oqu(null==a.chamado?null:a.chamado.vNatureza),m.xp6(4),m.Oqu(null==a.chamado?null:a.chamado.vAssunto),m.xp6(4),m.Oqu(null==a.chamado?null:a.chamado.vItem),m.xp6(4),m.Oqu(null==a.chamado?null:a.chamado.vMotivo),m.xp6(1),m.Q6J("ngIf",null!=a.template||null!=(null==a.chamado?null:a.chamado.vTemplateResposta)),m.xp6(7),m.Oqu(null==a.chamado?null:a.chamado.vManifesto),m.xp6(6),m.Oqu(null==a.chamado?null:a.chamado.vMovimentacoes),m.xp6(6),m.Oqu(null==a.chamado?null:a.chamado.vComentario))},directives:[i.O5],pipes:[i.uU],styles:["pre[_ngcontent-%COMP%]{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word}.margin-top-1em[_ngcontent-%COMP%]{margin-top:1em}.top-linha-cinza[_ngcontent-%COMP%]{border-top:1px solid gray;margin-left:6px;margin-right:6px;padding:3px}.col-md-4[_ngcontent-%COMP%]{max-width:calc(33.3333333% - 12px)}.col-md-6[_ngcontent-%COMP%]{max-width:calc(50% - 12px)}.limitar-25em[_ngcontent-%COMP%]{max-height:22em;overflow:auto;color:blue}.limitar-25em[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:blue}.blue-font[_ngcontent-%COMP%]{color:blue;font-size:1.2em}"]}),a}(),M=["dialog"],I=["inputTemplateRef"];function S(e,a){if(1&e){var t=m.EpF();m.TgZ(0,"a",12),m.NdJ("click",function(){m.CHM(t);var e=m.oxw(2);return e.openAtender(null==e.chamado?null:e.chamado.iIdentificacaoChamado)}),m._UZ(1,"i",13),m._uU(2),m.qZA()}if(2&e){var n=m.oxw(2);m.xp6(2),m.AsE(" Chamado ",null==n.chamado?null:n.chamado.vOrigem," N\xba ",null==n.chamado?null:n.chamado.iIdentificacaoChamado," ")}}function J(e,a){if(1&e&&(m.TgZ(0,"a"),m._uU(1),m.qZA()),2&e){var t=m.oxw(2);m.xp6(1),m.lnq("Chamado ",null==t.chamado?null:t.chamado.vOrigem," N\xba ",null==t.chamado?null:t.chamado.iIdentificacaoChamado," ",null!=t.chamado&&t.chamado.vWorkOrderID?"( "+(null==t.chamado?null:t.chamado.vWorkOrderID)+" / "+(null==t.chamado?null:t.chamado.vREQ)+" )":"","")}}function E(e,a){if(1&e){var t=m.EpF();m.TgZ(0,"button",11),m.NdJ("click",function(){return m.CHM(t),m.oxw(2).getPosition(-1)}),m._uU(1,"<"),m.qZA()}}function P(e,a){if(1&e){var t=m.EpF();m.TgZ(0,"button",11),m.NdJ("click",function(){return m.CHM(t),m.oxw(2).getPosition(1)}),m._uU(1,">"),m.qZA()}}function D(e,a){if(1&e&&(m.TgZ(0,"nb-option",19),m._uU(1),m.qZA()),2&e){var t=a.$implicit;m.Q6J("value",t),m.xp6(1),m.hij(" ",t," ")}}function F(e,a){if(1&e){var t=m.EpF();m.TgZ(0,"div",14),m._uU(1," Carimbar com (F6) : "),m.TgZ(2,"input",15,16),m.NdJ("ngModelChange",function(e){return m.CHM(t),m.oxw(2).onChangeTemplateResponse(e)}),m.qZA(),m.TgZ(4,"nb-autocomplete",null,17),m.YNc(6,D,2,2,"nb-option",18),m.ALo(7,"async"),m.qZA(),m._uU(8,"\xa0\xa0 "),m.TgZ(9,"button",11),m.NdJ("click",function(){m.CHM(t);var e=m.oxw(2);return e.Carimbar(e.chamado,e.selectedTemplateResponse)}),m._uU(10),m.qZA(),m._uU(11," \xa0\xa0 "),m.TgZ(12,"button",11),m.NdJ("click",function(){m.CHM(t);var e=m.oxw(2);return e.desCarimbar(e.chamado)}),m._uU(13,"Descarimbar (F8)"),m.qZA(),m.qZA()}if(2&e){var n=m.MAs(5),o=m.oxw(2);m.xp6(2),m.Q6J("ngModel",o.selectedTemplateResponseString)("nbAutocomplete",n),m.xp6(4),m.Q6J("ngForOf",m.lcZ(7,4,o.filteredNgModelOptions$)),m.xp6(4),m.hij("Carimbar ",null==o.selectedTemplateResponse?null:o.selectedTemplateResponse.vAcao," (F7)")}}function L(e,a){if(1&e){var t=m.EpF();m.TgZ(0,"nb-card",2),m.TgZ(1,"nb-card-header"),m.YNc(2,S,3,2,"a",3),m.YNc(3,J,2,3,"a",4),m.TgZ(4,"div",5),m.YNc(5,E,2,0,"button",6),m._uU(6),m.YNc(7,P,2,0,"button",6),m.qZA(),m.qZA(),m.TgZ(8,"nb-card-body"),m._UZ(9,"ngx-dados-chamado",7),m.qZA(),m.TgZ(10,"nb-card-footer"),m.YNc(11,F,14,6,"div",8),m.TgZ(12,"div",9),m.TgZ(13,"nb-checkbox",10),m.NdJ("ngModelChange",function(e){m.CHM(t);var a=m.oxw();return a.changeCheckTratado(a.chamado,e)}),m._uU(14,"Ja foi tratado"),m.qZA(),m.qZA(),m.TgZ(15,"div",5),m.TgZ(16,"button",11),m.NdJ("click",function(){return a.dialogRef.close()}),m._uU(17,"Fechar"),m.qZA(),m.qZA(),m.qZA(),m.qZA()}if(2&e){var n=m.oxw();m.xp6(2),m.Q6J("ngIf","ATENDER"==(null==n.chamado?null:n.chamado.vOrigem)),m.xp6(1),m.Q6J("ngIf","ATENDER"!=(null==n.chamado?null:n.chamado.vOrigem)),m.xp6(2),m.Q6J("ngIf",n.position>0),m.xp6(1),m.hij(" ",n.position+1," "),m.xp6(1),m.Q6J("ngIf",n.position<n.listaChamados.length),m.xp6(2),m.Q6J("chamado",n.chamado)("template",n.selectedTemplateResponse),m.xp6(2),m.Q6J("ngIf","ATENDER"==(null==n.chamado?null:n.chamado.vOrigem)),m.xp6(2),m.Q6J("ngModel",null==n.chamado?null:n.chamado.bFoiTratado)}}var H=function(){var a=function(){function a(t,n,o,i,l){var s=this;e(this,a),this.dialogService=t,this.serviceChamado=n,this.serviceTemplateResposta=o,this.serviceSticker=i,this.serviceUser=l,this.templateResponse=new Map,this.templateResponseArray=[],this.selectedTemplateResponseString="",this.selectedTemplateResponse=null,this.ultimoCarimbo="",this.serviceTemplateResposta.changeTemplatesRespostas.subscribe(function(e){(null==e?void 0:e.length)>0&&(s.templateResponse.clear(),e.forEach(function(e){s.templateResponse.set(e.vTemplateResposta,e),s.templateResponseArray.push(e.vTemplateResposta)}),s.filteredNgModelOptions$=(0,b.of)(s.templateResponseArray))})}return t(a,[{key:"ngOnInit",value:function(){}},{key:"filter",value:function(e){var a=e.toLowerCase();return this.templateResponseArray.filter(function(e){return e.toLowerCase().includes(a)})}},{key:"onChangeTemplateResponse",value:function(e){this.templateResponse.has(e)?(this.selectedTemplateResponseString=e,this.selectedTemplateResponse=this.templateResponse.get(e)):this.filteredNgModelOptions$=(0,b.of)(this.filter(e))}},{key:"openDialog",value:function(){var e;this.dialogService.open(this.dialog,{hasScroll:!0,dialogClass:"dialog-class"}),this.selectedTemplateResponseString=null===(e=this.chamado)||void 0===e?void 0:e.vTemplateResposta,this.templateResponse.has(this.selectedTemplateResponseString)&&(this.selectedTemplateResponse=this.templateResponse.get(this.selectedTemplateResponseString))}},{key:"getPosition",value:function(e){var a=this;e<0&&this.position>0?(this.position--,this.serviceChamado.getChamadoById(this.listaChamados[this.position].idChamado).subscribe(function(e){var t,n;a.chamado=e,null!=(null===(t=a.chamado)||void 0===t?void 0:t.vTemplateResposta)&&""!=(null===(n=a.chamado)||void 0===n?void 0:n.vTemplateResposta)||(a.selectedTemplateResponseString=null,a.selectedTemplateResponse=null)})):e>0&&this.position<this.listaChamados.length&&(this.position++,this.serviceChamado.getChamadoById(this.listaChamados[this.position].idChamado).subscribe(function(e){var t,n;a.chamado=e,null!=(null===(t=a.chamado)||void 0===t?void 0:t.vTemplateResposta)&&""!=(null===(n=a.chamado)||void 0===n?void 0:n.vTemplateResposta)||(a.selectedTemplateResponseString=null,a.selectedTemplateResponse=null)}))}},{key:"Carimbar",value:function(e,a){var t=this;null==a&&(this.templateResponse.has(this.selectedTemplateResponseString)?(a=this.templateResponse.get(this.selectedTemplateResponseString),this.selectedTemplateResponse=a,this.selectedTemplateResponseString=a.vTemplateResposta):this.templateResponse.has(this.inputTemplateRef.nativeElement.value)&&(a=this.templateResponse.get(this.inputTemplateRef.nativeElement.value),this.selectedTemplateResponse=a,this.selectedTemplateResponseString=a.vTemplateResposta)),null==a?(this.serviceSticker.show("Escolha o template!","",{status:"danger",duration:5e3}),this.inputTemplateRef.nativeElement.focus()):this.serviceChamado.getCarimbarChamadoById(this.chamado.idChamado,a.vTemplateResposta).subscribe(function(e){t.chamado=e,t.ultimoCarimbo=a.vTemplateResposta,t.selectedTemplateResponse=a,t.selectedTemplateResponseString=a.vTemplateResposta,t.serviceSticker.show("Chamado N\xba ".concat(e.idChamado," Carimbado com a a\xe7\xe3o '").concat(a.vTemplateResposta,"' com sucesso"),"",{status:"success"})},function(e){t.serviceSticker.show("Chamado N\xba ".concat(t.chamado.idChamado," com erro na carimba\xe7\xe3o: ").concat(JSON.stringify(e,null,0)),"",{status:"danger",duration:5e3})})}},{key:"desCarimbar",value:function(e){var a=this;this.selectedTemplateResponseString=null,this.selectedTemplateResponse=null,this.serviceChamado.getDesCarimbarChamadoById(this.chamado.idChamado).subscribe(function(e){a.chamado=e,a.serviceSticker.show("Chamado N\xba ".concat(e.idChamado," descarimbado com sucesso"),"",{status:"success"})},function(e){a.serviceSticker.show("Chamado N\xba ".concat(a.chamado.idChamado," com erro na descarimba\xe7\xe3o: ").concat(JSON.stringify(e,null,0)),"",{status:"danger",duration:5e3})})}},{key:"changeCheckTratado",value:function(e,a){var t=this;e.bFoiTratado=a,this.serviceChamado.putTratarChamadoById(e.idChamado,a,this.serviceUser.currentUser.apelidoAtendente).subscribe(function(n){n.bFoiTratado==a?(t.serviceSticker.show("Chamado N\xba ".concat(null==e?void 0:e.idChamado," marcado como ").concat((null==e?void 0:e.bFoiTratado)?"TRATADO":"N\xc3O TRATADO"),"",{status:"success"}),t.listaChamados[t.position].bFoiTratado=n.bFoiTratado,t.callbackMark(t.position,n.bFoiTratado)):t.serviceSticker.show("Chamado N\xba ".concat(null==e?void 0:e.idChamado," com erro na marca\xe7\xe3o de tratamento"),"",{status:"danger",duration:5e3})},function(a){return t.serviceSticker.show("Chamado N\xba ".concat(null==e?void 0:e.idChamado," com erro na marca\xe7\xe3o de tratamento: ").concat(JSON.stringify(a,null,0)),"",{status:"danger",duration:5e3})})}},{key:"handleKeyboardEvent",value:function(e){if(!e.ctrlKey||"ArrowRight"!=e.key&&"ArrowDown"!=e.key)if(!e.ctrlKey||"ArrowLeft"!=e.key&&"ArrowUp"!=e.key)if(e.ctrlKey&&"F"==e.key)this.dialog.close();else if("F6"==e.key)this.inputTemplateRef.nativeElement.focus();else if("F7"==e.key){var a;null==this.selectedTemplateResponseString||""==this.selectedTemplateResponseString?this.templateResponse.has(this.ultimoCarimbo)&&(a=this.templateResponse.get(this.ultimoCarimbo)):a=this.selectedTemplateResponse,this.Carimbar(this.chamado,a)}else"F8"==e.key&&this.desCarimbar(this.chamado);else this.getPosition(-1);else this.getPosition(1)}},{key:"openAtender",value:function(e){u("https://atender.caixa/siouv/jsp/login/DetalharOcorrencia.do",{sequencialOcorrencia:e,method:"iniciarDetalhamentoEnviadas",perfilUsuario:"gestor",escopo:"I",sequencialTipoOcorrencia:"2",situacao:"Enviada",sequencialFase:"2",gravaHistorico:"S",paginaVoltar:"ListaOcorrenciasResponder",ordenacaoOuvidoria:"3",ordenacaoSac:"3",ordenacaoInterna:"3",tipoOrdenacaoOuvidoria:"DESC",tipoOrdenacaoSac:"DESC",tipoOrdenacaoInterna:"DESC"})}}]),a}();return a.\u0275fac=function(e){return new(e||a)(m.Y36(s.Gln),m.Y36(f),m.Y36(_),m.Y36(s.quB),m.Y36(Z.K))},a.\u0275cmp=m.Xpm({type:a,selectors:[["ngx-dialog-chamado"]],viewQuery:function(e,a){var t;(1&e&&(m.Gf(M,5),m.Gf(I,5)),2&e)&&(m.iGM(t=m.CRH())&&(a.dialog=t.first),m.iGM(t=m.CRH())&&(a.inputTemplateRef=t.first))},hostBindings:function(e,a){1&e&&m.NdJ("keydown",function(e){return a.handleKeyboardEvent(e)},!1,m.evT)},inputs:{chamado:"chamado",position:"position",listaChamados:"listaChamados",callbackMark:"callbackMark"},decls:2,vars:0,consts:[["class","template-chamado"],["dialog",""],[1,"dialog-card"],["class","no-wrap hand",3,"click",4,"ngIf"],[4,"ngIf"],[1,"float-right"],["nbButton","",3,"click",4,"ngIf"],[3,"chamado","template"],["class","float-left",4,"ngIf"],[1,"align-middle","margin-left-2em"],["status","primary",3,"ngModel","ngModelChange"],["nbButton","",3,"click"],[1,"no-wrap","hand",3,"click"],[1,"fas","fa-external-link-alt"],[1,"float-left"],["nbInput","","type","text","placeholder","Escolha o template de Resposta",1,"input-template",3,"ngModel","nbAutocomplete","ngModelChange"],["inputTemplateRef",""],["autoChoiceTemplateRespose",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,a){1&e&&m.YNc(0,L,18,9,"ng-template",0,1,m.W1O)},directives:[s.Asz,s.ndF,i.O5,s.yKW,N,s.XWE,s.NTf,l.JJ,l.On,s.DPz,s.h8i,l.Fj,s.wNd,s.Xh,i.sg,s.q51],pipes:[i.Ov],styles:["nb-card[_ngcontent-%COMP%]{max-height:90vh;max-width:90vw;min-height:90vh;min-width:90vw}.input-template[_ngcontent-%COMP%]{min-width:20rem}.hand[_ngcontent-%COMP%]{cursor:pointer}.margin-left-2em[_ngcontent-%COMP%]{margin-left:2em}"]}),a}(),Q=["diag"];function Y(e,a){if(1&e&&(m.TgZ(0,"div",29),m._UZ(1,"nb-user",30),m.qZA()),2&e){var t=a.$implicit;m.xp6(1),m.s9C("name",t.Apelido),m.hYB("title","",t.Chamados," Ch | ",t.Ouvidorias," Ouv"),m.s9C("badgeText",t.Total),m.s9C("picture",t.UrlAvatar)}}function z(e,a){if(1&e&&(m.TgZ(0,"nb-option",31),m._uU(1),m.qZA()),2&e){var t=a.$implicit;m.Q6J("value",null==t?null:t.vApelidoAtendente),m.xp6(1),m.hij(" ",null==t?null:t.vApelidoAtendente," ")}}function B(e,a){if(1&e&&(m.TgZ(0,"a",40),m._UZ(1,"i",41),m._uU(2),m.qZA()),2&e){var t=m.oxw().$implicit;m.xp6(2),m.hij(" ",null==t?null:t.iIdentificacaoChamado,"")}}function V(e,a){if(1&e&&(m.TgZ(0,"a"),m._uU(1),m.qZA()),2&e){var t=m.oxw().$implicit;m.xp6(1),m.Oqu(null==t?null:t.iIdentificacaoChamado)}}function $(e,a){if(1&e){var t=m.EpF();m.TgZ(0,"tr",32),m.TgZ(1,"th",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index,o=m.oxw();return"ATENDER"==(null==a?null:a.vOrigem)?o.openAtender(null==a?null:a.iIdentificacaoChamado):o.detalheChamado(null==a?null:a.idChamado,n)}),m.YNc(2,B,3,1,"a",34),m.YNc(3,V,2,1,"a",35),m.qZA(),m.TgZ(4,"td",36),m.TgZ(5,"nb-checkbox",37),m.NdJ("ngModelChange",function(e){var a=m.CHM(t).$implicit;return m.oxw().changeCheckTratado(a,e)}),m.qZA(),m.qZA(),m.TgZ(6,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(7),m.qZA(),m.TgZ(8,"td",38),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(9),m.qZA(),m.TgZ(10,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(11),m.qZA(),m.TgZ(12,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(13),m.ALo(14,"date"),m.qZA(),m.TgZ(15,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(16),m.ALo(17,"date"),m.qZA(),m.TgZ(18,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(19),m.ALo(20,"date"),m.qZA(),m.TgZ(21,"td",39),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(22),m.qZA(),m.TgZ(23,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(24),m.qZA(),m.TgZ(25,"td",39),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(26),m.qZA(),m.TgZ(27,"td",33),m.NdJ("click",function(){var e=m.CHM(t),a=e.$implicit,n=e.index;return m.oxw().detalheChamado(null==a?null:a.idChamado,n)}),m._uU(28),m.qZA(),m.qZA()}if(2&e){var n=a.$implicit,o=m.oxw();m.Q6J("ngClass",o.checkRow(n)+" hand"),m.xp6(2),m.Q6J("ngIf","ATENDER"==(null==n?null:n.vOrigem)),m.xp6(1),m.Q6J("ngIf","ATENDER"!=(null==n?null:n.vOrigem)),m.xp6(2),m.Q6J("ngModel",null==n?null:n.bFoiTratado),m.xp6(2),m.Oqu(null==n?null:n.vOrigem),m.xp6(2),m.Oqu((null==n?null:n.vCPF_CNPJ_Solicitante)||""),m.xp6(2),m.Oqu(null==n?null:n.vNomeSolicitante),m.xp6(2),m.Oqu(m.xi3(14,20,null==n?null:n.dDataHoraAbertura,"dd/LL/yyyy HH:mm")),m.xp6(3),m.Oqu(m.xi3(17,23,null==n?null:n.dDataVencimento,"dd/LL/yyyy")),m.xp6(3),m.Oqu(m.xi3(20,26,null==n?null:n.dDataMaximaTransferencia,"dd/LL/yyyy")),m.xp6(2),m.Q6J("ngClass",o.checkCellTransferir(n)+" no-wrap"),m.xp6(1),m.Oqu(null==n?null:n.vSituacaoGECDI),m.xp6(2),m.hij("",null!=n&&n.vAcao?(null==n?null:n.vAcao)+" | "+(null==n?null:n.vTemplateResposta):""," "),m.xp6(1),m.Q6J("ngClass",o.checkCell(n)),m.xp6(1),m.xDo("",null==n?null:n.vTipoOcorrencia," | ",null==n?null:n.vNatureza," | ",null==n?null:n.vAssunto," | ",null==n?null:n.vMotivo," | ",null==n?null:n.vItem,""),m.xp6(2),m.Oqu(null==n?null:n.vApelidoAtendente)}}var G,j=d.N.urlAPI+"/api/user",K=function(){var a=function(){function a(t,n,o,i,l){var s=this;e(this,a),this.serviceAtendentes=t,this.serviceChamados=n,this.serviceUser=o,this.serviceParametros=i,this.serviceSticker=l,this.apelidoAtendente="",this.chamadoAtual=null,this.parametros=null,this.estatisticas=new W,this.estatisticasAtendentes=new Array,this.posicao=0,this.idPrimeiroChamado=-1,this.serviceUser.changeUser().subscribe(function(e){e&&(1==e.user.idRole&&(s.apelidoAtendente="<Todos>"),s.atendentes=t.getAtendentes().pipe((0,r.U)(function(e){return s.onChange(s.apelidoAtendente),e})))})}return t(a,[{key:"onChange",value:function(e){this.apelidoAtendente=e,this.syncList()}},{key:"syncList",value:function(){var e=this;this.chamados=this.serviceChamados.getChamados(!0,null,null,this.apelidoAtendente,null,null,null,null,null,"minimo").pipe((0,r.U)(function(a,t){a.length>0&&(e.idPrimeiroChamado=a[0].idChamado);var n=new W,o=new Map,i=new Map;return a.forEach(function(e){if(n.TotalChamados++,"ATENDER"==e.vOrigem?n.TotalChamadosAtender++:n.TotalChamadosServicos++,"OUVIDORIA"==(null==e?void 0:e.vTipoOcorrencia)&&n.Ouvidorias++,/venc/gi.test(e.vSituacaoGECDI)&&(n.ChamadosVencidosOuVencendo++,"OUVIDORIA"==(null==e?void 0:e.vTipoOcorrencia)&&n.OuvidoriasVencendo++),/\xfaltimo dia/gi.test(e.vSituacaoGECDI)&&n.ChamadosUltimoDiaTransferir++,/n\xe3o transf/gi.test(e.vSituacaoGECDI)&&n.ChamadosNaoTransferir++,e&&""!=(null==e?void 0:e.vApelidoAtendente)&&null!=(null==e?void 0:e.vApelidoAtendente)){if(n.ChamadosAtribuidos++,o.has(e.vApelidoAtendente)?o.set(e.vApelidoAtendente,o.get(e.vApelidoAtendente)+1):o.set(e.vApelidoAtendente,1),!i.has(e.vApelidoAtendente)){var a=new X;a.Apelido=e.vApelidoAtendente,a.Matricula=e.cUsuario,a.UrlAvatar="".concat(j,"/").concat(e.cUsuario,"/avatar"),i.set(e.vApelidoAtendente,a)}var t=i.get(e.vApelidoAtendente);(null==e?void 0:e.bFoiTratado)||("OUVIDORIA"==(null==e?void 0:e.vTipoOcorrencia)?t.Ouvidorias++:t.Chamados++,t.Total++),i.set(e.vApelidoAtendente,t)}else n.ChamadosNaoAtribuidos++}),n.Atendentes=o.size,e.estatisticas=n,e.listaFisicaChamados=a,e.estatisticasAtendentes=new Array,i.forEach(function(a,t){return e.estatisticasAtendentes.push(a)}),e.estatisticasAtendentes=e.estatisticasAtendentes.sort(function(e,a){return a.Total-e.Total}),a})),this.serviceParametros.getPatametros().subscribe(function(a){e.parametros=a})}},{key:"detalheChamado",value:function(e,a){this.chamadoAtual=this.serviceChamados.getChamadoById(e),this.posicao=a,this.dialog.openDialog()}},{key:"checkRow",value:function(e){return e.bFoiTratado?"row-green ":/venc/gi.test(e.vSituacaoGECDI)?"row-red ":/ouvidoria/gi.test(e.vTipoOcorrencia)?"row-blue":void 0}},{key:"checkCellTransferir",value:function(e){return e.bFoiTratado?"row-green ":/n\xe3o tran/gi.test(e.vSituacaoGECDI)?"cell-nao-transferir":/\xfaltimo dia/gi.test(e.vSituacaoGECDI)?"cell-ultimo-dia-transferir":void 0}},{key:"checkCell",value:function(e){if("OUVIDORIA"==(null==e?void 0:e.vTipoOcorrencia))return"row-blue"}},{key:"handleKeyboardEvent",value:function(e){"F2"==e.key&&this.idPrimeiroChamado>0&&(this.chamadoAtual=this.serviceChamados.getChamadoById(this.idPrimeiroChamado),this.posicao=0,this.dialog.openDialog())}},{key:"changeCheckTratado",value:function(e,a){var t,n,o=this;e.bFoiTratado=a,this.serviceChamados.putTratarChamadoById(e.idChamado,a,null===(n=null===(t=this.serviceUser)||void 0===t?void 0:t.currentUser)||void 0===n?void 0:n.apelidoAtendente).subscribe(function(t){t.bFoiTratado==a?o.serviceSticker.show("Chamado N\xba ".concat(null==e?void 0:e.idChamado," marcado como ").concat((null==e?void 0:e.bFoiTratado)?"TRATADO":"N\xc3O TRATADO"),"",{status:"success"}):o.serviceSticker.show("Chamado N\xba ".concat(null==e?void 0:e.idChamado," com erro na marca\xe7\xe3o de tratamento"),"",{status:"danger",duration:5e3})},function(a){return o.serviceSticker.show("Chamado N\xba ".concat(null==e?void 0:e.idChamado," com erro na marca\xe7\xe3o de tratamento: ").concat(JSON.stringify(a,null,0)),"",{status:"danger",duration:5e3})})}},{key:"positionTratado",value:function(e,a){this.listaFisicaChamados[e].bFoiTratado=a}},{key:"ngOnInit",value:function(){}},{key:"openAtender",value:function(e){u("https://atender.caixa/siouv/jsp/login/DetalharOcorrencia.do",{sequencialOcorrencia:e,method:"iniciarDetalhamentoEnviadas",perfilUsuario:"gestor",escopo:"I",sequencialTipoOcorrencia:"2",situacao:"Enviada",sequencialFase:"2",gravaHistorico:"S",paginaVoltar:"ListaOcorrenciasResponder",ordenacaoOuvidoria:"3",ordenacaoSac:"3",ordenacaoInterna:"3",tipoOrdenacaoOuvidoria:"DESC",tipoOrdenacaoSac:"DESC",tipoOrdenacaoInterna:"DESC"})}}]),a}();return a.\u0275fac=function(e){return new(e||a)(m.Y36(g),m.Y36(f),m.Y36(Z.K),m.Y36(C),m.Y36(s.quB))},a.\u0275cmp=m.Xpm({type:a,selectors:[["ngx-atendimento"]],viewQuery:function(e,a){var t;(1&e&&m.Gf(Q,5),2&e)&&(m.iGM(t=m.CRH())&&(a.dialog=t.first))},hostBindings:function(e,a){1&e&&m.NdJ("keydown",function(e){return a.handleKeyboardEvent(e)},!1,m.evT)},decls:127,vars:30,consts:[[1,"row"],[1,"col-md-12"],[1,"col-lg-3","col-md-6","col-sm-6"],[1,"card","card-stats"],[1,"card-body"],[1,"col-3","col-md-2"],[1,"icon-big","text-center","icon-warning"],[1,"fas","fa-users","fa-3x","blue"],[1,"col-9","col-md-10"],[1,"numbers"],[1,"card-category"],[1,"card-title"],[1,"numero-grande"],[1,"fas","fa-list-ul","fa-3x","blue"],[1,"fas","fa-exclamation","fa-3x","red"],[1,"far","fa-clock","fa-3x","red"],["icon","headphones-outline","pack","eva",1,"font-2_25rem"],["class","col-lg-2 col-md-3 col-sm-4 margin-2-bt",4,"ngFor","ngForOf"],["placeholder","Atendente",1,"select-atendente",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],["nbButton","",3,"click"],[1,"fas","fa-sync"],[1,"float-right"],[1,"table"],[1,"row-title"],["scope","col"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"chamado","position","listaChamados","callbackMark"],["diag",""],[1,"col-lg-2","col-md-3","col-sm-4","margin-2-bt"],["size","large","badgeStatus","success","badgePosition","bottom right",3,"name","title","badgeText","picture"],[3,"value"],[3,"ngClass"],["scope","row",3,"click"],["class","no-wrap",4,"ngIf"],[4,"ngIf"],["scope","row"],["status","primary",3,"ngModel","ngModelChange"],["scope","row",1,"no-wrap",3,"click"],["scope","row",3,"ngClass","click"],[1,"no-wrap"],[1,"fas","fa-external-link-alt"]],template:function(e,a){1&e&&(m.TgZ(0,"div",0),m.TgZ(1,"div",1),m.TgZ(2,"div",0),m.TgZ(3,"div",2),m.TgZ(4,"div",3),m.TgZ(5,"div",4),m.TgZ(6,"div",0),m.TgZ(7,"div",5),m.TgZ(8,"div",6),m._UZ(9,"i",7),m.qZA(),m.qZA(),m.TgZ(10,"div",8),m.TgZ(11,"div",9),m.TgZ(12,"p",10),m._uU(13,"Atendentes"),m.qZA(),m.TgZ(14,"p",11),m.TgZ(15,"b",12),m._uU(16),m.qZA(),m._uU(17),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.TgZ(18,"div",2),m.TgZ(19,"div",3),m.TgZ(20,"div",4),m.TgZ(21,"div",0),m.TgZ(22,"div",5),m.TgZ(23,"div",6),m._UZ(24,"i",13),m.qZA(),m.qZA(),m.TgZ(25,"div",8),m.TgZ(26,"div",9),m.TgZ(27,"p",10),m._uU(28,"Chamados"),m.qZA(),m.TgZ(29,"p",11),m.TgZ(30,"b",12),m._uU(31),m.qZA(),m._uU(32),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.TgZ(33,"div",2),m.TgZ(34,"div",3),m.TgZ(35,"div",4),m.TgZ(36,"div",0),m.TgZ(37,"div",5),m.TgZ(38,"div",6),m._UZ(39,"i",14),m.qZA(),m.qZA(),m.TgZ(40,"div",8),m.TgZ(41,"div",9),m.TgZ(42,"p",10),m._uU(43,"Ouvidorias"),m.qZA(),m.TgZ(44,"p",11),m.TgZ(45,"b",12),m._uU(46),m.qZA(),m._uU(47),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.TgZ(48,"div",2),m.TgZ(49,"div",3),m.TgZ(50,"div",4),m.TgZ(51,"div",0),m.TgZ(52,"div",5),m.TgZ(53,"div",6),m._UZ(54,"i",15),m.qZA(),m.qZA(),m.TgZ(55,"div",8),m.TgZ(56,"div",9),m.TgZ(57,"p",10),m._uU(58,"Vencido/Vencer"),m.qZA(),m.TgZ(59,"p",11),m.TgZ(60,"b",12),m._uU(61),m.qZA(),m._uU(62),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m.TgZ(63,"nb-card"),m.TgZ(64,"nb-card-header"),m.TgZ(65,"h1"),m._UZ(66,"nb-icon",16),m._uU(67," Atendimento - Resumo por atendente"),m.qZA(),m.qZA(),m.TgZ(68,"nb-card-body"),m.TgZ(69,"div",0),m.YNc(70,Y,2,5,"div",17),m.qZA(),m.qZA(),m.qZA(),m.TgZ(71,"nb-card"),m.TgZ(72,"nb-card-header"),m._uU(73," Chamados - Atendente: "),m.TgZ(74,"nb-select",18),m.NdJ("ngModelChange",function(e){return a.onChange(e)}),m.YNc(75,z,2,2,"nb-option",19),m.ALo(76,"async"),m.qZA(),m._uU(77," \xa0\xa0"),m.TgZ(78,"button",20),m.NdJ("click",function(){return a.syncList()}),m._UZ(79,"i",21),m._uU(80,"\xa0Atualizar"),m.qZA(),m.qZA(),m.TgZ(81,"nb-card-body"),m.TgZ(82,"div",22),m._uU(83,"Atualizado at\xe9 "),m.TgZ(84,"b"),m._uU(85),m.ALo(86,"date"),m.qZA(),m.qZA(),m.TgZ(87,"table",23),m.TgZ(88,"thead",24),m.TgZ(89,"tr"),m.TgZ(90,"td",25),m._uU(91,"Numero"),m._UZ(92,"br"),m._uU(93,"Ocorr\xeancia"),m.qZA(),m.TgZ(94,"td",25),m._uU(95,"Trat."),m.qZA(),m.TgZ(96,"td",25),m._uU(97,"Sistema"),m.qZA(),m.TgZ(98,"td",25),m._uU(99,"CPF"),m.qZA(),m.TgZ(100,"td",25),m._uU(101,"Cliente"),m.qZA(),m.TgZ(102,"td",25),m._uU(103,"Abertura"),m.qZA(),m.TgZ(104,"td",25),m._uU(105,"Vencimento"),m.qZA(),m.TgZ(106,"td",25),m._uU(107,"Prazo"),m._UZ(108,"br"),m._uU(109,"Transf."),m.qZA(),m.TgZ(110,"td",25),m._uU(111,"Situa\xe7\xe3o"),m.qZA(),m.TgZ(112,"td",25),m._uU(113,"A\xe7\xe3o"),m.qZA(),m.TgZ(114,"td",25),m._uU(115,"Categoriza\xe7\xe3o"),m.qZA(),m.TgZ(116,"td",25),m._uU(117,"Atendente"),m.qZA(),m.qZA(),m.qZA(),m.TgZ(118,"tbody"),m.YNc(119,$,29,29,"tr",26),m.ALo(120,"async"),m.qZA(),m.qZA(),m.qZA(),m.TgZ(121,"nb-card-footer"),m._uU(122," Footer "),m.qZA(),m.qZA(),m.qZA(),m.qZA(),m._UZ(123,"ngx-dialog-chamado",27,28),m.ALo(125,"async"),m.ALo(126,"async")),2&e&&(m.xp6(16),m.Oqu(null==a.estatisticas?null:a.estatisticas.Atendentes),m.xp6(1),m.AsE(" | ",null==a.estatisticas?null:a.estatisticas.ChamadosAtribuidos," atribu\xeddos / ",null==a.estatisticas?null:a.estatisticas.TotalChamadosServicos," n\xe3o atribu\xeddos "),m.xp6(14),m.Oqu(null==a.estatisticas?null:a.estatisticas.TotalChamados),m.xp6(1),m.AsE(" | ",null==a.estatisticas?null:a.estatisticas.TotalChamadosAtender," atender / ",null==a.estatisticas?null:a.estatisticas.TotalChamadosServicos," WO servi\xe7o "),m.xp6(14),m.Oqu(null==a.estatisticas?null:a.estatisticas.Ouvidorias),m.xp6(1),m.hij(" | ",null==a.estatisticas?null:a.estatisticas.OuvidoriasVencendo," ouvidorias vencendo "),m.xp6(14),m.Oqu(null==a.estatisticas?null:a.estatisticas.ChamadosVencidosOuVencendo),m.xp6(1),m.hij(" | ",null==a.estatisticas?null:a.estatisticas.ChamadosUltimoDiaTransferir," que podem transferir hoje "),m.xp6(8),m.Q6J("ngForOf",a.estatisticasAtendentes),m.xp6(4),m.Q6J("ngModel",a.apelidoAtendente),m.xp6(1),m.Q6J("ngForOf",m.lcZ(76,19,a.atendentes)),m.xp6(10),m.Oqu(m.xi3(86,21,null==a.parametros?null:a.parametros.dDataHoraAtualizacao,"dd/LL/yyyy HH:mm")),m.xp6(34),m.Q6J("ngForOf",m.lcZ(120,24,a.chamados)),m.xp6(4),m.Q6J("chamado",m.lcZ(125,26,a.chamadoAtual))("position",a.posicao)("listaChamados",m.lcZ(126,28,a.chamados))("callbackMark",a.positionTratado))},directives:[s.Asz,s.ndF,s.fMN,s.yKW,i.sg,s.rs,l.JJ,l.On,s.DPz,s.XWE,H,s.k0$,s.q51,i.mk,i.O5,s.NTf],pipes:[i.Ov,i.uU],styles:[".select-atendente[_ngcontent-%COMP%]{width:12em}.no-wrap[_ngcontent-%COMP%]{white-space:nowrap}.row-red[_ngcontent-%COMP%]{background-color:red;color:#ff0}.row-blue[_ngcontent-%COMP%]{background-color:blue;color:#fff}.row-green[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff}.row-title[_ngcontent-%COMP%]{background-color:#000;color:#fff}.cell-nao-transferir[_ngcontent-%COMP%]{background-color:gold;color:#000;font-weight:700}.cell-ultimo-dia-transferir[_ngcontent-%COMP%]{background-color:#ff0;color:#000;font-weight:700}.hand[_ngcontent-%COMP%]{cursor:pointer}.numero-grande[_ngcontent-%COMP%]{font-size:3em}.card-category[_ngcontent-%COMP%]{font-size:2em}.row[_ngcontent-%COMP%]{margin-bottom:1em}.red[_ngcontent-%COMP%]{color:red}.blue[_ngcontent-%COMP%]{color:blue}.margin-2-bt[_ngcontent-%COMP%]{margin-bottom:1em}.user-name[_nghost-%COMP%], .user-name   [_nghost-%COMP%]{font-weight:700}.font-2_25rem[_ngcontent-%COMP%]{font-size:2.25rem}"]}),a}(),W=function a(){e(this,a),this.TotalChamados=0,this.TotalChamadosAtender=0,this.TotalChamadosServicos=0,this.Ouvidorias=0,this.OuvidoriasVencendo=0,this.ChamadosVencidosOuVencendo=0,this.ChamadosUltimoDiaTransferir=0,this.ChamadosNaoTransferir=0,this.ChamadosAtribuidos=0,this.ChamadosNaoAtribuidos=0,this.Atendentes=0},X=function a(){e(this,a),this.Apelido="",this.Matricula="",this.UrlAvatar="",this.Ouvidorias=0,this.Chamados=0,this.Total=0},ee=[{path:"",component:K}],ae=function(){var a=function a(){e(this,a)};return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=m.oAB({type:a}),a.\u0275inj=m.cJS({imports:[[c.Bz.forChild(ee)],c.Bz]}),a}(),te={duration:1500,position:s.d6C.BOTTOM_END,destroyByClick:!0,preventDuplicates:!0,status:"success"},ne=((G=function a(){e(this,a)}).\u0275fac=function(e){return new(e||G)},G.\u0275mod=m.oAB({type:G}),G.\u0275inj=m.cJS({imports:[[i.ez,ae,l.u5,s.zyh,s.CG_,s.IIj,s.nKr,s.T2N,s.MfT,s.MfT,s.AE1,s.LW9.forRoot(te),s.KdK]]}),G)}}])}();