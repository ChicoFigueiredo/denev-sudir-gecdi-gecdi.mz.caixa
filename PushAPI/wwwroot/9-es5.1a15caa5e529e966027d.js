!function(){function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function t(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}(self.webpackChunkgecdi_mz_caixa=self.webpackChunkgecdi_mz_caixa||[]).push([[9],{53009:function(e,r,i){"use strict";i.r(r),i.d(r,{GecdiModule:function(){return b}});var o,c=i(38583),u=i(99763),a=i(89530),l=i(37716),s=i(88020),d=i(6405),g=i(82008),h=function(){var e=function(){function e(t){var r=this;n(this,e),this.menu=a.U,t.changeMenu().subscribe(function(n){return r.menu=n})}return t(e,[{key:"ngOnInit",value:function(){}}]),e}();return e.\u0275fac=function(n){return new(n||e)(l.Y36(s.h))},e.\u0275cmp=l.Xpm({type:e,selectors:[["ngx-gecdi"]],decls:3,vars:1,consts:[[3,"items"]],template:function(n,e){1&n&&(l.TgZ(0,"ngx-one-column-layout"),l._UZ(1,"nb-menu",0),l._UZ(2,"router-outlet"),l.qZA()),2&n&&(l.xp6(1),l.Q6J("items",e.menu))},directives:[d.s,g.mBz,u.lC],styles:[""]}),e}(),f=i(4357),Z=i(76622),v=[{path:"",component:h,children:[{path:"dashboard",canActivate:[f.a],loadChildren:function(){return i.e(805).then(i.bind(i,92805)).then(function(n){return n.DashboardModule})}},{path:"push",canActivate:[f.a],loadChildren:function(){return i.e(844).then(i.bind(i,41844)).then(function(n){return n.PushModule})}},{path:"atendimento",canActivate:[f.a],loadChildren:function(){return i.e(837).then(i.bind(i,34837)).then(function(n){return n.AtendimentoModule})}},{path:"security",loadChildren:function(){return i.e(266).then(i.bind(i,40266)).then(function(n){return n.SecurityModule})}},{path:"",redirectTo:"dashboard",pathMatch:"full"}]},{path:"cadastro-usuarios",component:Z.m}],p=function(){var e=function e(){n(this,e)};return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[u.Bz.forChild(v)],u.Bz]}),e}(),m=i(10027),b=((o=function e(){n(this,e)}).\u0275fac=function(n){return new(n||o)},o.\u0275mod=l.oAB({type:o}),o.\u0275inj=l.cJS({imports:[[c.ez,p,g.j5J,m.O]]}),o)},76622:function(e,r,i){"use strict";i.d(r,{m:function(){return Z}});var o=i(92340),c=i(37716),u=i(88020),a=i(88182),l=i(82008),s=i(3679),d=i(38583);function g(n,e){if(1&n&&(c.TgZ(0,"nb-option",24),c._uU(1),c.qZA()),2&n){var t=e.$implicit;c.Q6J("value",t.idRole),c.xp6(1),c.Oqu(t.nome_Role)}}function h(n,e){if(1&n&&(c.TgZ(0,"nb-option",24),c._uU(1),c.qZA()),2&n){var t=e.$implicit;c.Q6J("value",t.idRole),c.xp6(1),c.Oqu(t.nome_Role)}}function f(n,e){if(1&n){var t=c.EpF();c.TgZ(0,"tr",25),c.TgZ(1,"th",26),c.NdJ("click",function(){var n=c.CHM(t).index,e=c.oxw();return e.rowClick(e.s,n)}),c._uU(2),c.qZA(),c.TgZ(3,"td",26),c.NdJ("click",function(){var n=c.CHM(t).index,e=c.oxw();return e.rowClick(e.s,n)}),c._uU(4),c.qZA(),c.TgZ(5,"td",26),c.NdJ("click",function(){var n=c.CHM(t).index,e=c.oxw();return e.rowClick(e.s,n)}),c._uU(6),c.qZA(),c.TgZ(7,"td",26),c.NdJ("click",function(){var n=c.CHM(t).index,e=c.oxw();return e.rowClick(e.s,n)}),c._uU(8),c.qZA(),c.TgZ(9,"td",26),c.NdJ("click",function(){var n=c.CHM(t).index,e=c.oxw();return e.rowClick(e.s,n)}),c.TgZ(10,"nb-select",27,28),c.NdJ("ngModelChange",function(n){return e.$implicit.idRole=n})("selectedChange",function(n){var e=c.CHM(t).$implicit;return c.oxw().ChangeRole(e.idUsuario,n)}),c.YNc(12,h,2,2,"nb-option",13),c.qZA(),c.qZA(),c.TgZ(13,"td",26),c.NdJ("click",function(){var n=c.CHM(t).index,e=c.oxw();return e.rowClick(e.s,n)}),c.TgZ(14,"button",29),c.NdJ("click",function(){var n=c.CHM(t).$implicit;return c.oxw().excluirUsuario(n)}),c._UZ(15,"nb-icon",30),c.qZA(),c.qZA(),c.qZA()}if(2&n){var r=e.$implicit,i=c.oxw();c.Q6J("ngClass",i.checkRow(r)+" hand"),c.xp6(2),c.Oqu(null==r?null:r.idUsuario),c.xp6(2),c.Oqu(null==r?null:r.cUsuario),c.xp6(2),c.Oqu(null==r?null:r.nome),c.xp6(2),c.Oqu(null==r?null:r.cgc),c.xp6(2),c.Q6J("ngModel",r.idRole),c.xp6(2),c.Q6J("ngForOf",i.userService.roles)}}var Z=function(){var e=function(){function e(t,r,i){var c=this;n(this,e),this.menuService=t,this.userService=r,this.serviceSticker=i,this.menu=[],this.matricula=null,this.role=6,t.changeMenu().subscribe(function(n){return c.menu=n}),this.userService.getRoles().subscribe(function(n){return c.roles=n}),this.usuariosSelecionados=this.userService.getUsers(o.N.itemsPadrao,"")}return t(e,[{key:"ngOnInit",value:function(){}},{key:"checkRow",value:function(n){}},{key:"rowClick",value:function(n){}},{key:"Search",value:function(n){this.usuariosSelecionados=this.userService.getUsers(o.N.itemsPadrao,n)}},{key:"excluirUsuario",value:function(n){var e=this;this.userService.deleteUser(n.idUsuario).subscribe(function(t){e.serviceSticker.show("Usuario ".concat(null==n?void 0:n.cUsuario," (").concat(null==n?void 0:n.nome,") excluido com sucesso"),"",{status:"success",duration:2e3}),e.Search(e.searchText)},function(t){200!=t.status&&(e.serviceSticker.show("Erro ao excluir ".concat(null==n?void 0:n.cUsuario," (").concat(null==n?void 0:n.nome,")"),"",{status:"danger",duration:5e3}),e.Search(e.searchText))})}},{key:"Cadastrar",value:function(){var n=this;this.userService.postNewUser(this.matricula,this.role).subscribe(function(e){n.serviceSticker.show("Usuario ".concat(null==e?void 0:e.cUsuario," (").concat(null==e?void 0:e.nome,") incluido com sucesso"),"",{status:"success",duration:2e3}),n.Search(n.matricula)},function(e){200!=e.status&&(n.serviceSticker.show("Erro ao incluir ".concat(n.matricula," - ").concat(e.message),"",{status:"danger",duration:5e3}),n.Search(n.searchText))})}},{key:"ChangeRole",value:function(n,e){var t=this;this.userService.postChangeRole(n,e).subscribe(function(n){t.serviceSticker.show("Usuario ".concat(null==n?void 0:n.cUsuario," (").concat(null==n?void 0:n.nome,") alterado para role ").concat(null==n?void 0:n.idRole),"",{status:"success",duration:2e3})},function(n){200!=n.status&&t.serviceSticker.show("Erro ao alterar a role ".concat(t.matricula," - ").concat(n.message),"",{status:"danger",duration:5e3})})}}]),e}();return e.\u0275fac=function(n){return new(n||e)(c.Y36(u.h),c.Y36(a.K),c.Y36(l.quB))},e.\u0275cmp=c.Xpm({type:e,selectors:[["ngx-cadastro-usuarios"]],decls:66,vars:8,consts:[[1,"row"],[1,"col-md-3","col-lg-3","col-xxxl-3"],[1,"form-group"],["nbInput","","id","searchQuery","placeholder","Busca por matricula ou nome","width","30",3,"ngModel","ngModelChange","keyup.enter"],["q",""],["nbSuffix","","nbButton","","ghost","",3,"click"],["pack","eva",3,"icon"],[1,"col-md-9","col-lg-9","col-xxxl-9"],[1,"col-sm-3"],["for","Matricula",1,"label"],["type","text","nbInput","","fullWidth","","id","matricula","placeholder","Matricula (c999999 ou p999999 ou f999999)",3,"ngModel","ngModelChange"],["for","role",1,"label"],["fullWidth","","id","role","name","role",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[1,"col-sm-2"],["for","btnCadastrar",1,"label"],["fullWidth","","nbButton","","id","btnCadastrar",3,"click"],[1,"fas","fa-user"],[1,"col-sm-12"],["icon","person-add-outline","pack","eva",1,"font-2_25rem"],[1,"table"],[1,"row-title"],["scope","col"],[3,"ngClass",4,"ngFor","ngForOf"],[3,"value"],[3,"ngClass"],["scope","row",1,"no-wrap",3,"click"],["fullWidth","","id","role","name","role",3,"ngModel","ngModelChange","selectedChange"],["SelRole",""],["nbButton","","ghost","",3,"click"],["icon","trash","pack","eva","status","danger"]],template:function(n,e){if(1&n){var t=c.EpF();c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"nb-card"),c.TgZ(3,"nb-card-header"),c._uU(4," Busca de Usu\xe1rio "),c.qZA(),c.TgZ(5,"nb-card-body"),c.TgZ(6,"div",2),c.TgZ(7,"nb-form-field"),c.TgZ(8,"input",3,4),c.NdJ("ngModelChange",function(n){return e.searchText=n})("keyup.enter",function(){c.CHM(t);var n=c.MAs(9);return e.Search(n.value)}),c.qZA(),c.TgZ(10,"button",5),c.NdJ("click",function(){c.CHM(t);var n=c.MAs(9);return e.Search(n.value)}),c._UZ(11,"nb-icon",6),c.qZA(),c.qZA(),c._UZ(12,"BR"),c._UZ(13,"BR"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(14,"div",7),c.TgZ(15,"nb-card"),c.TgZ(16,"nb-card-header"),c._uU(17," Cadastro R\xe1pido de Usu\xe1rio "),c.qZA(),c.TgZ(18,"nb-card-body"),c.TgZ(19,"div",0),c.TgZ(20,"div",8),c.TgZ(21,"div",2),c.TgZ(22,"nb-form-field"),c.TgZ(23,"div",2),c.TgZ(24,"label",9),c._uU(25,"Matricula:"),c.qZA(),c.TgZ(26,"input",10),c.NdJ("ngModelChange",function(n){return e.matricula=n}),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(27,"div",8),c.TgZ(28,"div",2),c.TgZ(29,"label",11),c._uU(30,"Role:"),c.qZA(),c.TgZ(31,"nb-select",12),c.NdJ("ngModelChange",function(n){return e.role=n}),c.YNc(32,g,2,2,"nb-option",13),c.qZA(),c.qZA(),c.qZA(),c.TgZ(33,"div",14),c.TgZ(34,"div",2),c.TgZ(35,"label",15),c._uU(36,"\xa0"),c.qZA(),c.TgZ(37,"button",16),c.NdJ("click",function(){return e.Cadastrar()}),c._UZ(38,"i",17),c._uU(39,"\xa0Cadastrar "),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(40,"div",0),c.TgZ(41,"div",18),c.TgZ(42,"nb-card"),c.TgZ(43,"nb-card-header"),c.TgZ(44,"h1"),c._UZ(45,"nb-icon",19),c._uU(46," Cadastramento de Usu\xe1rios"),c.qZA(),c.qZA(),c.TgZ(47,"nb-card-body"),c.TgZ(48,"table",20),c.TgZ(49,"thead",21),c.TgZ(50,"tr",21),c.TgZ(51,"td",22),c._uU(52,"ID"),c.qZA(),c.TgZ(53,"td",22),c._uU(54,"Matricula"),c.qZA(),c.TgZ(55,"td",22),c._uU(56,"Nome"),c.qZA(),c.TgZ(57,"td",22),c._uU(58,"CGC"),c.qZA(),c.TgZ(59,"td",22),c._uU(60,"Role"),c.qZA(),c.TgZ(61,"td",22),c._uU(62,"Excluir"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(63,"tbody"),c.YNc(64,f,16,7,"tr",23),c.ALo(65,"async"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()}2&n&&(c.xp6(8),c.Q6J("ngModel",e.searchText),c.xp6(3),c.Q6J("icon","search-outline"),c.xp6(15),c.Q6J("ngModel",e.matricula),c.xp6(5),c.Q6J("ngModel",e.role),c.xp6(1),c.Q6J("ngForOf",e.userService.roles),c.xp6(32),c.Q6J("ngForOf",c.lcZ(65,6,e.usuariosSelecionados)))},directives:[l.Asz,l.ndF,l.yKW,l.jBG,l.h8i,s.Fj,s.JJ,s.On,l.DPz,l.yyc,l.fMN,l.rs,d.sg,l.q51,d.mk],pipes:[d.Ov],styles:[".flex[_ngcontent-%COMP%]{display:flex;align-items:center}.mensagem-limite30[_ngcontent-%COMP%]{width:30%}.mensagem-limite10[_ngcontent-%COMP%]{width:10%}.dir[_ngcontent-%COMP%]{text-align:right!important}.row-title[_ngcontent-%COMP%]{background-color:#000;color:#fff;font-weight:700}.hand[_ngcontent-%COMP%]{cursor:pointer}tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:nth-child(odd){background:#f4eeff}tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:nth-child(2n){background:#fff}tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%], tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:middle}.font-2_25rem[_ngcontent-%COMP%]{font-size:2.25rem}"]}),e}()},4357:function(e,r,i){"use strict";i.d(r,{a:function(){return l}});var o=i(93342),c=i(37716),u=i(86665),a=i(99763),l=function(){var e=function(){function e(t,r){n(this,e),this.authService=t,this.router=r,this.alive=!1}return t(e,[{key:"canActivate",value:function(){var n=this;return this.authService.isAuthenticated().pipe((0,o.b)(function(e){e||n.router.navigate(["gecdi/security/login"])}))}}]),e}();return e.\u0275fac=function(n){return new(n||e)(c.LFG(u._o),c.LFG(a.F0))},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()}}])}();