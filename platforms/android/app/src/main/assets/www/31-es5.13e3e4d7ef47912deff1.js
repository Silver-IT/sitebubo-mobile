(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{majE:function(n,e,l){"use strict";l.r(e);var t=l("8Y7J");class o{}var i=l("pMnS"),a=l("oBZk"),u=l("ZZ/e"),d=l("s7LF"),r=l("SVse"),c=l("AyJq"),s=l("c9fC"),m=l("8bJo"),g=l("omvX"),p=l("5GAg");class f{transform(n){if(!n)return;const e=n.split("-");let l="";return e.forEach(n=>{if(n){const e=n.substr(0,1).toUpperCase()+n.substr(1)+" ";l+=e}}),l}}var h=l("UwyE"),b=l("xehS");class v{constructor(n,e,l,t){this.notifcationAPI=n,this.storage=e,this.ionService=l,this.navCtrl=t,this.filterType=1,this.bydomainSetting=[]}ngOnInit(){this.initData()}ngOnChanges(n){console.log(n)}ionViewWillEnter(){}initData(){this.storage.get("userInfo").then(n=>{n&&(this.userID=n.id,this.token=n.token,this.getNotificationSettings(n.id,n.token))})}getNotificationSettings(n,e){this.notifcationAPI.getNotificationSetting(n,e).subscribe(n=>{1===n.RESPONSECODE?(this.bydomainSetting=n.data.domains,this.generalSetting=n.data.general):this.ionService.presentToast(n.RESPONSE)})}changeObjectToArray(n){return new Promise(e=>{const l=[];Object.keys(n).map(e=>{const t={};t[e]=n[e],l.push(t)}),e(l)})}listenGeneralSettings(n,e){this.generalSetting[n]=e.detail.checked,console.log(this.generalSetting),this.changeObjectToArray(this.generalSetting).then(n=>{this.notifcationAPI.saveGeneralPermission(this.userID,this.token,JSON.stringify(n)).subscribe(n=>{1===n.RESPONSECODE?console.log(n):this.ionService.presentToast(n.RESPONSE)},n=>{this.ionService.presentToast("Server API Problem")})})}listenDomainMonitors(n,e,l){n.notification[e]=l.detail.checked,console.log(n),this.changeObjectToArray(n.notification).then(e=>{this.notifcationAPI.saveDomainPushPermission(this.userID,this.token,n.id,JSON.stringify(e)).subscribe(n=>{1===n.RESPONSECODE||this.ionService.presentToast(n.RESPONSE)},n=>{this.ionService.presentToast("Server API Problem")})})}switchpage(n){this.filterType=parseInt(n.target.value,10)}toggleMenu(){this.ionService.toggleMenu()}back(){this.navCtrl.back()}}var C=l("xgBC"),R=t["\u0275crt"]({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{position:absolute;z-index:1}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button.menu[_ngcontent-%COMP%]{right:0}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button.back[_ngcontent-%COMP%]{left:0}ion-content[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]{display:block;width:94%;margin:auto;margin-top:20px!important;margin-bottom:10px!important;box-shadow:1px 0 5px #c3c2c2!important;border-radius:15px!important}ion-content[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-expansion-panel-header[_ngcontent-%COMP%]{border-radius:15px!important;display:flex;align-items:center}ion-content[_ngcontent-%COMP%]   mat-expansion-panel[_ngcontent-%COMP%]   mat-panel-description[_ngcontent-%COMP%]{flex-direction:column;margin-bottom:10px!important}"]],data:{}});function E(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,9,"ion-item",[["lines","none"]],null,null,null,a.lb,a.s)),t["\u0275did"](1,49152,null,0,u.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{lines:[0,"lines"]},null),(n()(),t["\u0275eld"](2,0,null,0,3,"ion-label",[],null,null,null,a.mb,a.w)),t["\u0275did"](3,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](4,0,["",""])),t["\u0275ppd"](5,1),(n()(),t["\u0275eld"](6,0,null,0,3,"ion-toggle",[["color","success"],["mode","ios"],["slot","end"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(n,e,l){var o=!0,i=n.component;return"ionBlur"===e&&(o=!1!==t["\u0275nov"](n,9)._handleBlurEvent(l.target)&&o),"ionChange"===e&&(o=!1!==t["\u0275nov"](n,9)._handleIonChange(l.target)&&o),"ionChange"===e&&(o=!1!==i.listenGeneralSettings(n.context.$implicit.key,l)&&o),o}),a.Eb,a.O)),t["\u0275prd"](5120,null,d.i,(function(n){return[n]}),[u.d]),t["\u0275did"](8,49152,[["general",4]],0,u.Db,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{checked:[0,"checked"],color:[1,"color"],mode:[2,"mode"]},null),t["\u0275did"](9,16384,null,0,u.d,[t.ElementRef],null,null)],(function(n,e){n(e,1,0,"none"),n(e,8,0,e.context.$implicit.value,"success","ios")}),(function(n,e){var l=t["\u0275unv"](e,4,0,n(e,5,0,t["\u0275nov"](e.parent.parent,0),e.context.$implicit.key));n(e,4,0,l)}))}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,5,"div",[["class","general"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,4,"ion-list",[["mode","ios"]],null,null,null,a.ob,a.x)),t["\u0275did"](2,49152,null,0,u.Q,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(n()(),t["\u0275and"](16777216,null,0,2,null,E)),t["\u0275did"](4,278528,null,0,r.j,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](0,r.e,[t.KeyValueDiffers])],(function(n,e){var l=e.component;n(e,2,0,"ios"),n(e,4,0,t["\u0275unv"](e,4,0,t["\u0275nov"](e,5).transform(l.generalSetting)))}),null)}function S(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,9,"ion-item",[["lines","none"]],null,null,null,a.lb,a.s)),t["\u0275did"](1,49152,null,0,u.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{lines:[0,"lines"]},null),(n()(),t["\u0275eld"](2,0,null,0,3,"ion-label",[],null,null,null,a.mb,a.w)),t["\u0275did"](3,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](4,0,["",""])),t["\u0275ppd"](5,1),(n()(),t["\u0275eld"](6,0,null,0,3,"ion-toggle",[["color","success"],["mode","ios"],["slot","end"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(n,e,l){var o=!0,i=n.component;return"ionBlur"===e&&(o=!1!==t["\u0275nov"](n,9)._handleBlurEvent(l.target)&&o),"ionChange"===e&&(o=!1!==t["\u0275nov"](n,9)._handleIonChange(l.target)&&o),"ionChange"===e&&(o=!1!==i.listenDomainMonitors(n.parent.context.$implicit,n.context.$implicit.key,l)&&o),o}),a.Eb,a.O)),t["\u0275prd"](5120,null,d.i,(function(n){return[n]}),[u.d]),t["\u0275did"](8,49152,null,0,u.Db,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{checked:[0,"checked"],color:[1,"color"],mode:[2,"mode"]},null),t["\u0275did"](9,16384,null,0,u.d,[t.ElementRef],null,null)],(function(n,e){n(e,1,0,"none"),n(e,8,0,e.context.$implicit.value,"success","ios")}),(function(n,e){var l=t["\u0275unv"](e,4,0,n(e,5,0,t["\u0275nov"](e.parent.parent.parent,0),e.context.$implicit.key));n(e,4,0,l)}))}function D(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,16777216,null,null,17,"mat-expansion-panel",[["class","mat-expansion-panel"]],[[2,"mat-expanded",null],[2,"_mat-animation-noopable",null],[2,"mat-expansion-panel-spacing",null]],null,null,c.d,c.a)),t["\u0275did"](1,1753088,null,1,s.e,[[3,s.a],t.ChangeDetectorRef,m.a,t.ViewContainerRef,r.c,[2,g.a],[2,s.b]],null,null),t["\u0275qud"](603979776,2,{_lazyContent:0}),t["\u0275prd"](256,null,s.a,void 0,[]),(n()(),t["\u0275eld"](4,0,null,0,6,"mat-expansion-panel-header",[["class","mat-expansion-panel-header"],["role","button"]],[[1,"id",0],[1,"tabindex",0],[1,"aria-controls",0],[1,"aria-expanded",0],[1,"aria-disabled",0],[2,"mat-expanded",null],[2,"mat-expansion-toggle-indicator-after",null],[2,"mat-expansion-toggle-indicator-before",null],[40,"@.disabled",0],[40,"@expansionHeight",0]],[[null,"click"],[null,"keydown"],["component","@expansionHeight.start"]],(function(n,e,l){var o=!0;return"click"===e&&(o=!1!==t["\u0275nov"](n,5)._toggle()&&o),"keydown"===e&&(o=!1!==t["\u0275nov"](n,5)._keydown(l)&&o),"component:@expansionHeight.start"===e&&(o=!1!==t["\u0275nov"](n,5)._animationStarted()&&o),o}),c.c,c.b)),t["\u0275did"](5,180224,[[1,4]],0,s.g,[s.e,t.ElementRef,p.b,t.ChangeDetectorRef,[2,s.b]],{expandedHeight:[0,"expandedHeight"],collapsedHeight:[1,"collapsedHeight"]},null),t["\u0275pod"](6,{collapsedHeight:0,expandedHeight:1}),t["\u0275pod"](7,{value:0,params:1}),(n()(),t["\u0275eld"](8,0,null,2,2,"ion-label",[["class","domain-name"]],null,null,null,a.mb,a.w)),t["\u0275did"](9,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](10,0,["",""])),(n()(),t["\u0275eld"](11,0,null,1,6,"mat-panel-description",[["class","mat-expansion-panel-header-description"]],null,null,null,null,null)),t["\u0275did"](12,16384,null,0,s.f,[],null,null),(n()(),t["\u0275eld"](13,0,null,null,4,"ion-list",[["mode","ios"]],null,null,null,a.ob,a.x)),t["\u0275did"](14,49152,null,0,u.Q,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(n()(),t["\u0275and"](16777216,null,0,2,null,S)),t["\u0275did"](16,278528,null,0,r.j,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pid"](0,r.e,[t.KeyValueDiffers]),(n()(),t["\u0275and"](0,null,null,0))],(function(n,e){n(e,5,0,"65px","65px"),n(e,14,0,"ios"),n(e,16,0,t["\u0275unv"](e,16,0,t["\u0275nov"](e,17).transform(e.context.$implicit.notification)))}),(function(n,e){n(e,0,0,t["\u0275nov"](e,1).expanded,"NoopAnimations"===t["\u0275nov"](e,1)._animationMode,t["\u0275nov"](e,1)._hasSpacing());var l=t["\u0275nov"](e,5).panel._headerId,o=t["\u0275nov"](e,5).disabled?-1:0,i=t["\u0275nov"](e,5)._getPanelId(),a=t["\u0275nov"](e,5)._isExpanded(),u=t["\u0275nov"](e,5).panel.disabled,d=t["\u0275nov"](e,5)._isExpanded(),r="after"===t["\u0275nov"](e,5)._getTogglePosition(),c="before"===t["\u0275nov"](e,5)._getTogglePosition(),s=t["\u0275nov"](e,5)._animationsDisabled,m=n(e,7,0,t["\u0275nov"](e,5)._getExpandedState(),n(e,6,0,t["\u0275nov"](e,5).collapsedHeight,t["\u0275nov"](e,5).expandedHeight));n(e,4,0,l,o,i,a,u,d,r,c,s,m),n(e,10,0,e.context.$implicit.url)}))}function O(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"div",[["class","domain"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,7,"ion-list",[["mode","ios"]],null,null,null,a.ob,a.x)),t["\u0275did"](2,49152,null,0,u.Q,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(n()(),t["\u0275eld"](3,0,null,0,5,"mat-accordion",[["class","mat-accordion"]],null,null,null,null,null)),t["\u0275prd"](6144,null,s.a,null,[s.c]),t["\u0275did"](5,1720320,null,1,s.c,[],null,null),t["\u0275qud"](603979776,1,{_headers:1}),(n()(),t["\u0275and"](16777216,null,null,1,null,D)),t["\u0275did"](8,278528,null,0,r.j,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(n,e){var l=e.component;n(e,2,0,"ios"),n(e,8,0,l.bydomainSetting)}),null)}function P(n){return t["\u0275vid"](0,[t["\u0275pid"](0,f,[]),(n()(),t["\u0275eld"](1,0,null,null,16,"ion-header",[["class","small-header"]],null,null,null,a.fb,a.p)),t["\u0275did"](2,49152,null,0,u.D,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275eld"](3,0,null,0,14,"ion-toolbar",[["class","toolbar"],["mode","md"]],null,null,null,a.Fb,a.P)),t["\u0275did"](4,49152,null,0,u.Eb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(n()(),t["\u0275eld"](5,0,null,0,12,"ion-buttons",[],null,null,null,a.T,a.d)),t["\u0275did"](6,49152,null,0,u.n,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275eld"](7,0,null,0,2,"ion-title",[],null,null,null,a.Db,a.N)),t["\u0275did"](8,49152,null,0,u.Cb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](-1,0,["Notifications"])),(n()(),t["\u0275eld"](10,0,null,0,3,"ion-button",[["class","menu"],["mode","md"]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.toggleMenu()&&t),t}),a.S,a.c)),t["\u0275did"](11,49152,null,0,u.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(n()(),t["\u0275eld"](12,0,null,0,1,"ion-icon",[["class","menu"],["slot","icon-only"]],null,null,null,a.gb,a.q)),t["\u0275did"](13,49152,null,0,u.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275eld"](14,0,null,0,3,"ion-button",[["class","back"],["mode","md"]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.back()&&t),t}),a.S,a.c)),t["\u0275did"](15,49152,null,0,u.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(n()(),t["\u0275eld"](16,0,null,0,1,"ion-icon",[["class","back"],["mode","ios"],["name","arrow-back"]],null,null,null,a.gb,a.q)),t["\u0275did"](17,49152,null,0,u.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null),(n()(),t["\u0275eld"](18,0,null,null,17,"ion-content",[],null,null,null,a.bb,a.l)),t["\u0275did"](19,49152,null,0,u.w,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275eld"](20,0,null,0,9,"ion-segment",[["mode","md"]],null,[[null,"ionChange"],[null,"ionBlur"]],(function(n,e,l){var o=!0,i=n.component;return"ionBlur"===e&&(o=!1!==t["\u0275nov"](n,23)._handleBlurEvent(l.target)&&o),"ionChange"===e&&(o=!1!==t["\u0275nov"](n,23)._handleChangeEvent(l.target)&&o),"ionChange"===e&&(o=!1!==i.switchpage(l)&&o),o}),a.wb,a.F)),t["\u0275prd"](5120,null,d.i,(function(n){return[n]}),[u.Qb]),t["\u0275did"](22,49152,null,0,u.nb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],value:[1,"value"]},null),t["\u0275did"](23,16384,null,0,u.Qb,[t.ElementRef],null,null),(n()(),t["\u0275eld"](24,0,null,0,2,"ion-segment-button",[["mode","md"],["value","1"]],null,null,null,a.vb,a.G)),t["\u0275did"](25,49152,null,0,u.ob,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],value:[1,"value"]},null),(n()(),t["\u0275ted"](-1,0,[" General "])),(n()(),t["\u0275eld"](27,0,null,0,2,"ion-segment-button",[["mode","md"],["value","2"]],null,null,null,a.vb,a.G)),t["\u0275did"](28,49152,null,0,u.ob,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],value:[1,"value"]},null),(n()(),t["\u0275ted"](-1,0,[" By Domain "])),(n()(),t["\u0275eld"](30,0,null,0,5,"div",[["class","content"]],null,null,null,null,null)),t["\u0275did"](31,16384,null,0,r.n,[],{ngSwitch:[0,"ngSwitch"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](33,278528,null,0,r.o,[t.ViewContainerRef,t.TemplateRef,r.n],{ngSwitchCase:[0,"ngSwitchCase"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](35,278528,null,0,r.o,[t.ViewContainerRef,t.TemplateRef,r.n],{ngSwitchCase:[0,"ngSwitchCase"]},null)],(function(n,e){var l=e.component;n(e,4,0,"md"),n(e,11,0,"md"),n(e,15,0,"md"),n(e,17,0,"ios","arrow-back"),n(e,22,0,"md",l.filterType),n(e,25,0,"md","1"),n(e,28,0,"md","2"),n(e,31,0,l.filterType),n(e,33,0,1),n(e,35,0,2)}),null)}var k=t["\u0275ccf"]("app-notification-setting",v,(function(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-notification-setting",[],null,null,null,P,R)),t["\u0275did"](1,638976,null,0,v,[h.a,C.b,b.a,u.Lb],null,null)],(function(n,e){n(e,1,0)}),null)}),{},{},[]),N=l("HlEa"),_=l("iInd"),w=l("B0QU"),y=l("LtGu"),Z=l("5Bek"),M=l("zMNK"),I=l("7++P"),T=l("j1ZV");class A{}l.d(e,"NotificationSettingPageModuleNgFactory",(function(){return F}));var F=t["\u0275cmf"](o,[],(function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,k]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,r.m,r.l,[t.LOCALE_ID,[2,r.x]]),t["\u0275mpd"](4608,d.q,d.q,[]),t["\u0275mpd"](4608,u.c,u.c,[t.NgZone,t.ApplicationRef]),t["\u0275mpd"](4608,u.Kb,u.Kb,[u.c,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](4608,u.Ob,u.Ob,[u.c,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](4608,N.a,N.a,[t.LOCALE_ID,[2,"googleChartsVersion"],[2,"mapsApiKey"]]),t["\u0275mpd"](1073742336,r.b,r.b,[]),t["\u0275mpd"](1073742336,d.p,d.p,[]),t["\u0275mpd"](1073742336,d.f,d.f,[]),t["\u0275mpd"](1073742336,u.Gb,u.Gb,[]),t["\u0275mpd"](1073742336,_.q,_.q,[[2,_.v],[2,_.m]]),t["\u0275mpd"](1073742336,w.c,w.c,[]),t["\u0275mpd"](1073742336,y.a,y.a,[]),t["\u0275mpd"](1073742336,Z.c,Z.c,[]),t["\u0275mpd"](1073742336,M.b,M.b,[]),t["\u0275mpd"](1073742336,s.d,s.d,[]),t["\u0275mpd"](1073742336,I.CountoModule,I.CountoModule,[]),t["\u0275mpd"](1073742336,T.a,T.a,[]),t["\u0275mpd"](1073742336,A,A,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](256,"googleChartsVersion","46",[]),t["\u0275mpd"](256,"mapsApiKey","AIzaSyCHjrW83Zc1vwk4mzxztYbvk2by0PQZoIE",[]),t["\u0275mpd"](256,w.b,{radius:70,outerStrokeWidth:10,innerStrokeWidth:5,showTitle:!1,showSubtitle:!1,showUnits:!1,showBackground:!1,startFromZero:!1},[]),t["\u0275mpd"](1024,_.k,(function(){return[[{path:"",component:v}]]}),[])])}))}}]);