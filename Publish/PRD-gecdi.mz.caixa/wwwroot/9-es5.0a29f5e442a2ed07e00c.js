!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function n(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}(self.webpackChunkgecdi_mz_caixa=self.webpackChunkgecdi_mz_caixa||[]).push([[9],{53009:function(t,r,i){"use strict";i.r(r),i.d(r,{GecdiModule:function(){return b}});var a,o=i(38583),l=i(99763),c=i(13023),u=i(37716),d=i(71423),s=i(6405),m=i(25814),f=function(){var t=function(){function t(n){var r=this;e(this,t),this.menu=c.U,n.changeMenu().subscribe(function(e){return r.menu=e})}return n(t,[{key:"ngOnInit",value:function(){}}]),t}();return t.\u0275fac=function(e){return new(e||t)(u["\u0275\u0275directiveInject"](d.h))},t.\u0275cmp=u["\u0275\u0275defineComponent"]({type:t,selectors:[["ngx-gecdi"]],decls:3,vars:1,consts:[[3,"items"]],template:function(e,t){1&e&&(u["\u0275\u0275elementStart"](0,"ngx-one-column-layout"),u["\u0275\u0275element"](1,"nb-menu",0),u["\u0275\u0275element"](2,"router-outlet"),u["\u0275\u0275elementEnd"]()),2&e&&(u["\u0275\u0275advance"](1),u["\u0275\u0275property"]("items",t.menu))},directives:[s.s,m.mBz,l.lC],styles:[""]}),t}(),h=i(4357),v=i(76622),p=[{path:"",component:f,children:[{path:"dashboard",canActivate:[h.a],loadChildren:function(){return i.e(805).then(i.bind(i,92805)).then(function(e){return e.DashboardModule})}},{path:"push",canActivate:[h.a],loadChildren:function(){return i.e(62).then(i.bind(i,84062)).then(function(e){return e.PushModule})}},{path:"atendimento",canActivate:[h.a],loadChildren:function(){return i.e(837).then(i.bind(i,34837)).then(function(e){return e.AtendimentoModule})}},{path:"security",loadChildren:function(){return i.e(330).then(i.bind(i,26330)).then(function(e){return e.SecurityModule})}},{path:"",redirectTo:"dashboard",pathMatch:"full"}]},{path:"cadastro-usuarios",component:v.m}],g=function(){var t=function t(){e(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u["\u0275\u0275defineNgModule"]({type:t}),t.\u0275inj=u["\u0275\u0275defineInjector"]({imports:[[l.Bz.forChild(p)],l.Bz]}),t}(),S=i(20336),b=((a=function t(){e(this,t)}).\u0275fac=function(e){return new(e||a)},a.\u0275mod=u["\u0275\u0275defineNgModule"]({type:a}),a.\u0275inj=u["\u0275\u0275defineInjector"]({imports:[[o.ez,g,m.j5J,S.O]]}),a)},76622:function(t,r,i){"use strict";i.d(r,{m:function(){return p}});var a=i(92340),o=i(13023),l=i(37716),c=i(71423),u=i(88182),d=i(25814),s=i(3679),m=i(38583);function f(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"nb-option",23),l["\u0275\u0275text"](1),l["\u0275\u0275elementEnd"]()),2&e){var n=t.$implicit;l["\u0275\u0275property"]("value",n.idRole),l["\u0275\u0275advance"](1),l["\u0275\u0275textInterpolate"](n.nome_Role)}}function h(e,t){if(1&e&&(l["\u0275\u0275elementStart"](0,"nb-option",23),l["\u0275\u0275text"](1),l["\u0275\u0275elementEnd"]()),2&e){var n=t.$implicit;l["\u0275\u0275property"]("value",n.idRole),l["\u0275\u0275advance"](1),l["\u0275\u0275textInterpolate"](n.nome_Role)}}function v(e,t){if(1&e){var n=l["\u0275\u0275getCurrentView"]();l["\u0275\u0275elementStart"](0,"tr",24),l["\u0275\u0275elementStart"](1,"th",25),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).index,t=l["\u0275\u0275nextContext"]();return t.rowClick(t.s,e)}),l["\u0275\u0275text"](2),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](3,"td",25),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).index,t=l["\u0275\u0275nextContext"]();return t.rowClick(t.s,e)}),l["\u0275\u0275text"](4),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](5,"td",25),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).index,t=l["\u0275\u0275nextContext"]();return t.rowClick(t.s,e)}),l["\u0275\u0275text"](6),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](7,"td",25),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).index,t=l["\u0275\u0275nextContext"]();return t.rowClick(t.s,e)}),l["\u0275\u0275text"](8),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](9,"td",25),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).index,t=l["\u0275\u0275nextContext"]();return t.rowClick(t.s,e)}),l["\u0275\u0275elementStart"](10,"nb-select",26),l["\u0275\u0275listener"]("ngModelChange",function(e){return t.$implicit.idRole=e})("selectedChange",function(e){var t=l["\u0275\u0275restoreView"](n).$implicit;return l["\u0275\u0275nextContext"]().ChangeRole(t.idUsuario,e)}),l["\u0275\u0275template"](11,h,2,2,"nb-option",13),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](12,"td",25),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).index,t=l["\u0275\u0275nextContext"]();return t.rowClick(t.s,e)}),l["\u0275\u0275elementStart"](13,"button",27),l["\u0275\u0275listener"]("click",function(){var e=l["\u0275\u0275restoreView"](n).$implicit;return l["\u0275\u0275nextContext"]().excluirUsuario(e)}),l["\u0275\u0275element"](14,"nb-icon",28),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()}if(2&e){var r=t.$implicit,i=l["\u0275\u0275nextContext"]();l["\u0275\u0275property"]("ngClass",i.checkRow(r)+" hand"),l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](null==r?null:r.idUsuario),l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](null==r?null:r.cUsuario),l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](null==r?null:r.nome),l["\u0275\u0275advance"](2),l["\u0275\u0275textInterpolate"](null==r?null:r.cgc),l["\u0275\u0275advance"](2),l["\u0275\u0275property"]("ngModel",r.idRole),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngForOf",i.userService.roles)}}var p=function(){var t=function(){function t(n,r,i){var l=this;e(this,t),this.menuService=n,this.userService=r,this.serviceSticker=i,this.menu=o.U,this.matricula=null,this.role=6,n.changeMenu().subscribe(function(e){return l.menu=e}),this.userService.getRoles().subscribe(function(e){return l.roles=e}),this.usuariosSelecionados=this.userService.getUsers(a.N.itemsPadrao,"")}return n(t,[{key:"ngOnInit",value:function(){}},{key:"checkRow",value:function(e){}},{key:"rowClick",value:function(e){}},{key:"Search",value:function(e){this.usuariosSelecionados=this.userService.getUsers(a.N.itemsPadrao,e)}},{key:"excluirUsuario",value:function(e){var t=this;this.userService.deleteUser(e.idUsuario).subscribe(function(n){t.serviceSticker.show("Usuario ".concat(null==e?void 0:e.cUsuario," (").concat(null==e?void 0:e.nome,") excluido com sucesso"),"",{status:"success",duration:2e3}),t.Search(t.searchText)},function(n){200!=n.status&&(t.serviceSticker.show("Erro ao excluir ".concat(null==e?void 0:e.cUsuario," (").concat(null==e?void 0:e.nome,")"),"",{status:"danger",duration:5e3}),t.Search(t.searchText))})}},{key:"Cadastrar",value:function(){var e=this;this.userService.postNewUser(this.matricula,this.role).subscribe(function(t){e.serviceSticker.show("Usuario ".concat(null==t?void 0:t.cUsuario," (").concat(null==t?void 0:t.nome,") incluido com sucesso"),"",{status:"success",duration:2e3}),e.Search(e.matricula)},function(t){200!=t.status&&(e.serviceSticker.show("Erro ao incluir ".concat(e.matricula," - ").concat(t.message),"",{status:"danger",duration:5e3}),e.Search(e.searchText))})}},{key:"ChangeRole",value:function(e,t){var n=this;this.userService.postChangeRole(e,t.role).subscribe(function(e){n.serviceSticker.show("Usuario ".concat(null==e?void 0:e.cUsuario," (").concat(null==e?void 0:e.nome,") alterado para role ").concat(null==e?void 0:e.idRole),"",{status:"success",duration:2e3}),n.Search(n.matricula)},function(e){200!=e.status&&(n.serviceSticker.show("Erro ao alterar a role ".concat(n.matricula," - ").concat(e.message),"",{status:"danger",duration:5e3}),n.Search(n.searchText))})}}]),t}();return t.\u0275fac=function(e){return new(e||t)(l["\u0275\u0275directiveInject"](c.h),l["\u0275\u0275directiveInject"](u.K),l["\u0275\u0275directiveInject"](d.quB))},t.\u0275cmp=l["\u0275\u0275defineComponent"]({type:t,selectors:[["ngx-cadastro-usuarios"]],decls:64,vars:8,consts:[[1,"row"],[1,"col-md-3","col-lg-3","col-xxxl-3"],[1,"form-group"],["nbInput","","id","searchQuery","placeholder","Busca por matricula ou nome","width","30",3,"ngModel","ngModelChange","keyup.enter"],["q",""],["nbSuffix","","nbButton","","ghost","",3,"click"],["pack","eva",3,"icon"],[1,"col-md-9","col-lg-9","col-xxxl-9"],[1,"col-sm-3"],["for","Matricula",1,"label"],["type","text","nbInput","","fullWidth","","id","matricula","placeholder","Matricula (c999999 ou p999999 ou f999999)",3,"ngModel","ngModelChange"],["for","role",1,"label"],["fullWidth","","id","role","name","role",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"col-sm-2"],["for","btnCadastrar",1,"label"],["fullWidth","","nbButton","","id","btnCadastrar",3,"click"],[1,"fas","fa-user"],[1,"col-sm-12"],[1,"table"],[1,"row-title"],["scope","col"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"value"],[3,"ngClass"],["scope","row",1,"no-wrap",3,"click"],["fullWidth","","id","role","name","role",3,"ngModel","ngModelChange","selectedChange"],["nbButton","","ghost","",3,"click"],["icon","trash","pack","eva",1,"danger"]],template:function(e,t){if(1&e){var n=l["\u0275\u0275getCurrentView"]();l["\u0275\u0275elementStart"](0,"div",0),l["\u0275\u0275elementStart"](1,"div",1),l["\u0275\u0275elementStart"](2,"nb-card"),l["\u0275\u0275elementStart"](3,"nb-card-header"),l["\u0275\u0275text"](4," Busca de Usu\xe1rio "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](5,"nb-card-body"),l["\u0275\u0275elementStart"](6,"div",2),l["\u0275\u0275elementStart"](7,"nb-form-field"),l["\u0275\u0275elementStart"](8,"input",3,4),l["\u0275\u0275listener"]("ngModelChange",function(e){return t.searchText=e})("keyup.enter",function(){l["\u0275\u0275restoreView"](n);var e=l["\u0275\u0275reference"](9);return t.Search(e.value)}),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](10,"button",5),l["\u0275\u0275listener"]("click",function(){l["\u0275\u0275restoreView"](n);var e=l["\u0275\u0275reference"](9);return t.Search(e.value)}),l["\u0275\u0275element"](11,"nb-icon",6),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275element"](12,"BR"),l["\u0275\u0275element"](13,"BR"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](14,"div",7),l["\u0275\u0275elementStart"](15,"nb-card"),l["\u0275\u0275elementStart"](16,"nb-card-header"),l["\u0275\u0275text"](17," Cadastro R\xe1pido de Usu\xe1rio "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](18,"nb-card-body"),l["\u0275\u0275elementStart"](19,"div",0),l["\u0275\u0275elementStart"](20,"div",8),l["\u0275\u0275elementStart"](21,"div",2),l["\u0275\u0275elementStart"](22,"nb-form-field"),l["\u0275\u0275elementStart"](23,"div",2),l["\u0275\u0275elementStart"](24,"label",9),l["\u0275\u0275text"](25,"Matricula:"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](26,"input",10),l["\u0275\u0275listener"]("ngModelChange",function(e){return t.matricula=e}),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](27,"div",8),l["\u0275\u0275elementStart"](28,"div",2),l["\u0275\u0275elementStart"](29,"label",11),l["\u0275\u0275text"](30,"Role:"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](31,"nb-select",12),l["\u0275\u0275listener"]("ngModelChange",function(e){return t.role=e}),l["\u0275\u0275template"](32,f,2,2,"nb-option",13),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](33,"div",14),l["\u0275\u0275elementStart"](34,"div",2),l["\u0275\u0275elementStart"](35,"label",15),l["\u0275\u0275text"](36,"\xa0"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](37,"button",16),l["\u0275\u0275listener"]("click",function(){return t.Cadastrar()}),l["\u0275\u0275element"](38,"i",17),l["\u0275\u0275text"](39,"\xa0Cadastrar "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](40,"div",0),l["\u0275\u0275elementStart"](41,"div",18),l["\u0275\u0275elementStart"](42,"nb-card"),l["\u0275\u0275elementStart"](43,"nb-card-header"),l["\u0275\u0275text"](44," Lista de Usu\xe1rios "),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](45,"nb-card-body"),l["\u0275\u0275elementStart"](46,"table",19),l["\u0275\u0275elementStart"](47,"thead",20),l["\u0275\u0275elementStart"](48,"tr",20),l["\u0275\u0275elementStart"](49,"td",21),l["\u0275\u0275text"](50,"ID"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](51,"td",21),l["\u0275\u0275text"](52,"Matricula"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](53,"td",21),l["\u0275\u0275text"](54,"Nome"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](55,"td",21),l["\u0275\u0275text"](56,"CGC"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](57,"td",21),l["\u0275\u0275text"](58,"Role"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](59,"td",21),l["\u0275\u0275text"](60,"Excluir"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementStart"](61,"tbody"),l["\u0275\u0275template"](62,v,15,7,"tr",22),l["\u0275\u0275pipe"](63,"async"),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"](),l["\u0275\u0275elementEnd"]()}2&e&&(l["\u0275\u0275advance"](8),l["\u0275\u0275property"]("ngModel",t.searchText),l["\u0275\u0275advance"](3),l["\u0275\u0275property"]("icon","search-outline"),l["\u0275\u0275advance"](15),l["\u0275\u0275property"]("ngModel",t.matricula),l["\u0275\u0275advance"](5),l["\u0275\u0275property"]("ngModel",t.role),l["\u0275\u0275advance"](1),l["\u0275\u0275property"]("ngForOf",t.userService.roles),l["\u0275\u0275advance"](30),l["\u0275\u0275property"]("ngForOf",l["\u0275\u0275pipeBind1"](63,6,t.usuariosSelecionados)))},directives:[d.Asz,d.ndF,d.yKW,d.jBG,d.h8i,s.Fj,s.JJ,s.On,d.DPz,d.yyc,d.fMN,d.rs,m.sg,d.q51,m.mk],pipes:[m.Ov],styles:[".flex[_ngcontent-%COMP%]{display:flex;align-items:center}.mensagem-limite30[_ngcontent-%COMP%]{width:30%}.mensagem-limite10[_ngcontent-%COMP%]{width:10%}.dir[_ngcontent-%COMP%]{text-align:right!important}.row-title[_ngcontent-%COMP%]{background-color:#000;color:#fff;font-weight:700}.hand[_ngcontent-%COMP%]{cursor:pointer}tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:nth-child(odd){background:#f4eeff}tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:nth-child(2n){background:#fff}tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%], tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:middle}"]}),t}()},4357:function(t,r,i){"use strict";i.d(r,{a:function(){return u}});var a=i(93342),o=i(37716),l=i(86665),c=i(99763),u=function(){var t=function(){function t(n,r){e(this,t),this.authService=n,this.router=r,this.alive=!1}return n(t,[{key:"canActivate",value:function(){var e=this;return this.authService.isAuthenticated().pipe((0,a.b)(function(t){t||e.router.navigate(["gecdi/security/login"])}))}}]),t}();return t.\u0275fac=function(e){return new(e||t)(o["\u0275\u0275inject"](l._o),o["\u0275\u0275inject"](c.F0))},t.\u0275prov=o["\u0275\u0275defineInjectable"]({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}])}();