!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function t(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}function r(e,n){return(r=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function o(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var t,r=u(e);if(n){var o=u(this).constructor;t=Reflect.construct(r,arguments,o)}else t=r.apply(this,arguments);return i(this,t)}}function i(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(self.webpackChunkgecdi_mz_caixa=self.webpackChunkgecdi_mz_caixa||[]).push([[266],{40266:function(n,i,u){"use strict";u.r(i),u.d(i,{SecurityModule:function(){return U}});var l=u(38583),a=u(3679),s=u(99763),c=u(82008),f=u(86665),g=u(37716);function d(e,n){if(1&e&&(g.TgZ(0,"li",23),g._uU(1),g.qZA()),2&e){var t=n.$implicit;g.xp6(1),g.Oqu(t)}}function p(e,n){if(1&e&&(g.TgZ(0,"nb-alert",19),g.TgZ(1,"p",20),g.TgZ(2,"b"),g._uU(3,"Oh n\xe3o!"),g.qZA(),g.qZA(),g.TgZ(4,"ul",21),g.YNc(5,d,2,1,"li",22),g.qZA(),g.qZA()),2&e){var t=g.oxw();g.xp6(5),g.Q6J("ngForOf",t.errors)}}function m(e,n){if(1&e&&(g.TgZ(0,"li",23),g._uU(1),g.qZA()),2&e){var t=n.$implicit;g.xp6(1),g.Oqu(t)}}function h(e,n){if(1&e&&(g.TgZ(0,"nb-alert",24),g.TgZ(1,"p",20),g.TgZ(2,"b"),g._uU(3,"Hooray!"),g.qZA(),g.qZA(),g.TgZ(4,"ul",21),g.YNc(5,m,2,1,"li",22),g.qZA(),g.qZA()),2&e){var t=g.oxw();g.xp6(5),g.Q6J("ngForOf",t.messages)}}function Z(e,n){1&e&&(g.TgZ(0,"p",26),g._uU(1," Matricula \xe9 obrigat\xf3rio! "),g.qZA())}function b(e,n){1&e&&(g.TgZ(0,"p",26),g._uU(1," Email should be the real one! "),g.qZA())}function v(e,n){if(1&e&&(g.ynx(0),g.YNc(1,Z,2,0,"p",25),g.YNc(2,b,2,0,"p",25),g.BQk()),2&e){g.oxw();var t=g.MAs(19);g.xp6(1),g.Q6J("ngIf",null==t.errors?null:t.errors.required),g.xp6(1),g.Q6J("ngIf",null==t.errors?null:t.errors.pattern)}}function y(e,n){1&e&&(g.TgZ(0,"p",26),g._uU(1," Password is required! "),g.qZA())}function q(e,n){if(1&e&&(g.TgZ(0,"p",26),g._uU(1),g.qZA()),2&e){var t=g.oxw(2);g.xp6(1),g.AsE(" Password should contains from ",t.getConfigValue("forms.validation.password.minLength")," to ",t.getConfigValue("forms.validation.password.maxLength")," characters ")}}function A(e,n){if(1&e&&(g.ynx(0),g.YNc(1,y,2,0,"p",25),g.YNc(2,q,2,2,"p",25),g.BQk()),2&e){g.oxw();var t=g.MAs(26);g.xp6(1),g.Q6J("ngIf",null==t.errors?null:t.errors.required),g.xp6(1),g.Q6J("ngIf",(null==t.errors?null:t.errors.minlength)||(null==t.errors?null:t.errors.maxlength))}}function w(e,n){if(1&e){var t=g.EpF();g.TgZ(0,"nb-checkbox",27),g.NdJ("ngModelChange",function(e){return g.CHM(t),g.oxw().user.rememberMe=e}),g._uU(1,"Me manter logado "),g.qZA()}if(2&e){var r=g.oxw();g.Q6J("ngModel",r.user.rememberMe)}}var x,T,M=function(){var n,i=function(n){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&r(e,n)}(u,n);var i=o(u);function u(){return e(this,u),i.apply(this,arguments)}return t(u,[{key:"ngOnInit",value:function(){this.rememberMe=!0}}]),u}(f.Yx);return i.\u0275fac=function(e){return(n||(n=g.n5z(i)))(e||i)},i.\u0275cmp=g.Xpm({type:i,selectors:[["ngx-auth"]],features:[g.qOj],decls:36,vars:17,consts:[["id","title",1,"title"],[1,"sub-title"],["outline","danger","role","alert",4,"ngIf"],["outline","success","role","alert",4,"ngIf"],["aria-labelledby","title",1,"form-horizontal",3,"ngSubmit"],["form","ngForm"],[1,"form-group","row","vertical-center"],["for","inputEmail3",1,"label","col-sm-3","form-control-label"],[1,"col-sm-9"],["nbInput","","fullWidth","","name","email","id","input-email","placeholder","Seu usu\xe1rio no rede caixa","autofocus","",3,"ngModel","status","required","ngModelChange"],["email","ngModel"],[4,"ngIf"],["for","inputPassword3",1,"label","col-sm-3","form-control-label"],["nbInput","","fullWidth","","name","password","type","password","id","input-password","placeholder","Password",3,"ngModel","status","required","minlength","maxlength","ngModelChange"],["password","ngModel"],[1,"form-group","row"],[1,"offset-sm-3","col-sm-9"],["name","rememberMe",3,"ngModel","ngModelChange",4,"ngIf"],["nbButton","","fullWidth","","status","success",3,"disabled"],["outline","danger","role","alert"],[1,"alert-title"],[1,"alert-message-list"],["class","alert-message",4,"ngFor","ngForOf"],[1,"alert-message"],["outline","success","role","alert"],["class","error-message",4,"ngIf"],[1,"error-message"],["name","rememberMe",3,"ngModel","ngModelChange"]],template:function(e,n){if(1&e&&(g.TgZ(0,"nb-layout"),g._UZ(1,"nb-layout-column"),g.TgZ(2,"nb-layout-column"),g.TgZ(3,"nb-card"),g.TgZ(4,"nb-card-header"),g.TgZ(5,"h1",0),g._uU(6,"Login"),g.qZA(),g.qZA(),g.TgZ(7,"nb-card-body"),g.TgZ(8,"p",1),g._uU(9,"Utilize seu usu\xe1rio e senha de rede"),g.qZA(),g.YNc(10,p,6,1,"nb-alert",2),g.YNc(11,h,6,1,"nb-alert",3),g.TgZ(12,"form",4,5),g.NdJ("ngSubmit",function(){return n.login()}),g.TgZ(14,"div",6),g.TgZ(15,"label",7),g._uU(16,"Matricula:"),g.qZA(),g.TgZ(17,"div",8),g.TgZ(18,"input",9,10),g.NdJ("ngModelChange",function(e){return n.user.email=e}),g.qZA(),g.YNc(20,v,3,2,"ng-container",11),g.qZA(),g.qZA(),g.TgZ(21,"div",6),g.TgZ(22,"label",12),g._uU(23,"Senha:"),g.qZA(),g.TgZ(24,"div",8),g.TgZ(25,"input",13,14),g.NdJ("ngModelChange",function(e){return n.user.password=e}),g.qZA(),g.YNc(27,A,3,2,"ng-container",11),g.qZA(),g.qZA(),g.TgZ(28,"div",15),g.TgZ(29,"div",16),g.YNc(30,w,2,1,"nb-checkbox",17),g.qZA(),g.qZA(),g.TgZ(31,"div",15),g.TgZ(32,"div",16),g.TgZ(33,"button",18),g._uU(34," Log In "),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g._UZ(35,"nb-layout-column"),g.qZA()),2&e){var t=g.MAs(13),r=g.MAs(19),o=g.MAs(26);g.xp6(10),g.Q6J("ngIf",n.showMessages.error&&(null==n.errors?null:n.errors.length)&&!n.submitted),g.xp6(1),g.Q6J("ngIf",n.showMessages.success&&(null==n.messages?null:n.messages.length)&&!n.submitted),g.xp6(7),g.Q6J("ngModel",n.user.email)("status",r.dirty?r.invalid?"danger":"success":""),g.uIk("aria-invalid",!(!r.invalid||!r.touched)||null),g.xp6(2),g.Q6J("ngIf",r.invalid&&r.touched),g.xp6(5),g.Q6J("ngModel",n.user.password)("status",o.dirty?o.invalid?"danger":"success":"")("required",n.getConfigValue("forms.validation.password.required"))("minlength",n.getConfigValue("forms.validation.password.minLength"))("maxlength",n.getConfigValue("forms.validation.password.maxLength")),g.uIk("aria-invalid",!(!o.invalid||!o.touched)||null),g.xp6(2),g.Q6J("ngIf",o.invalid&&o.touched),g.xp6(3),g.Q6J("ngIf",n.rememberMe),g.xp6(3),g.ekj("btn-pulse",n.submitted),g.Q6J("disabled",n.submitted||!t.valid)}},directives:[c.Aqw,c.dP_,c.Asz,c.ndF,c.yKW,l.O5,a._Y,a.JL,a.F,c.h8i,a.Fj,a.JJ,a.On,a.Q7,a.wO,a.nD,c.DPz,c.$9b,l.sg,c.NTf],styles:[".vertical-center[_ngcontent-%COMP%]{display:flex;align-items:center}"]}),i}(),_=u(88182),O=function(){var n=function(){function n(t){e(this,n),this.userService=t}return t(n,[{key:"ngOnInit",value:function(){this.userService.logoff()}}]),n}();return n.\u0275fac=function(e){return new(e||n)(g.Y36(_.K))},n.\u0275cmp=g.Xpm({type:n,selectors:[["ngx-logoff"]],decls:2,vars:0,template:function(e,n){1&e&&(g.TgZ(0,"p"),g._uU(1,"logoff works!"),g.qZA())},styles:[""]}),n}(),I=u(76622),J=[{path:"",component:(x=function(){function n(){e(this,n)}return t(n,[{key:"ngOnInit",value:function(){}}]),n}(),x.\u0275fac=function(e){return new(e||x)},x.\u0275cmp=g.Xpm({type:x,selectors:[["ngx-security"]],decls:1,vars:0,template:function(e,n){1&e&&g._UZ(0,"router-outlet")},directives:[s.lC],styles:[""]}),x),children:[{path:"login",component:M},{path:"logoff",component:O},{path:"cadastro-usuarios",component:I.m},{path:"",redirectTo:"dashboard",pathMatch:"full"}]}],C=function(){var n=function n(){e(this,n)};return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=g.oAB({type:n}),n.\u0275inj=g.cJS({imports:[[s.Bz.forChild(J)],s.Bz]}),n}(),U=((T=function n(){e(this,n)}).\u0275fac=function(e){return new(e||T)},T.\u0275mod=g.oAB({type:T}),T.\u0275inj=g.cJS({imports:[[l.ez,a.u5,s.Bz,c.PYG,c.nKr,c.T2N,c.MfT,c.zyh,c.BW0,c.IIj,C,f.S,c.KdK,c.V7y]]}),T)}}])}();