(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{RKvg:function(l,n,e){"use strict";e.r(n);var t=e("8Y7J");class i{}var o=e("pMnS"),u=e("oBZk"),a=e("ZZ/e"),s=e("SVse"),c=e("mrSG"),d=e("xehS"),r=e("HF2u"),m=e("10do"),f=e("9B/o");let g=(()=>{class l{constructor(l){this.iab=l}payNow(l,n,e,t){return c.b(this,void 0,void 0,(function*(){return new Promise((i,o)=>c.b(this,void 0,void 0,(function*(){let o="https://app.sitebubo.com/payments_pro/redirectpaypal?user_id="+l+"&plan_id="+n;o+="&token="+e,t&&(o+="&freetrial=yes");const u=this.iab.create(o,"_blank","closebuttoncaption=back");u.on("loadstop").subscribe(l=>{"https://app.sitebubo.com/payments_pro/paymentsuccess"===l.url?(u.close(),i("success")):"https://app.sitebubo.com/payments_pro/paymentfailure"===l.url?(u.close(),i("error")):"https://app.sitebubo.com/payments_pro/ordercancelled"===l.url?(u.close(),i("cancelled")):"https://app.sitebubo.com/payments_pro/paypalpending"===l.url?(u.close(),i("pending")):"https://app.sitebubo.com/payments_pro/freetrialfailure"===l.url&&(u.close(),i("free-trial-failed"))})})))}))}}return l.ngInjectableDef=t["\u0275\u0275defineInjectable"]({factory:function(){return new l(t["\u0275\u0275inject"](f.a))},token:l,providedIn:"root"}),l})();var h=e("Tddt"),p=e("GS3A");class b{constructor(l,n,e,t,i,o,u,a,s,c,d){this.router=l,this.activatedRoute=n,this.storage=e,this.ionService=t,this.generalSerivce=i,this.subscriptionAPI=o,this.navCtrl=u,this.platform=a,this.modalCtrl=s,this.paypal=c,this.iap=d,this.showbtn=!1}ngOnInit(){this.storage.get("planInfo").then(l=>{this.oldPlan=l.name+"Plan"}),this.definePlatform().then(l=>{l&&this.getPlanID()})}definePlatform(){return new Promise(l=>{this.platform.ready().then(()=>{const n=this.platform.platforms();this.plat=n[1],l(!0)})})}getPlanID(){this.activatedRoute.queryParams.subscribe(l=>{l&&(this.planID=l.planID,this.planName=l.planName,this.planPrice=l.planPrice,"ios"===this.plat&&this.defineIosProduct(),this.initData())},l=>{this.ionService.showAlert("Error Loading Page","No Plan is selected")})}defineIosProduct(){const l=parseInt(this.planID,10);1===l||(2===l?this.productId="P2":3===l?this.productId="P3":4===l&&(this.productId="P4"))}initData(){this.storage.get("userInfo").then(l=>{l?(this.userID=l.id,this.token=l.token,this.getDetailedPlanInfo(this.planID,this.userID,this.token)):this.router.navigate(["welcome"])})}getCurrentSubscription(){this.storage.get("userInfo").then(l=>{this.isNewUser=l.new_user,this.storage.get("planInfo").then(l=>{this.freeTrial=!this.firstPay&&!l.free_trial,this.daysLeft=l.daysleft,this.currentPlanName=l.name,this.currentPlanID=l.id,parseInt(this.planID,10)!==l.id&&(this.showbtn=!0)})})}getDetailedPlanInfo(l,n,e){this.ionService.showLoading(),this.subscriptionAPI.getSubscriptionPlanDetails(l,n,e).subscribe(l=>{console.log(l),1===l.RESPONSECODE?(this.ionService.closeLoading(),this.details=l.data.details,this.firstPay=l.data.need_to_pay,this.getCurrentSubscription(),console.log(l.data)):console.log(l.RESPONSE)},l=>{this.ionService.closeLoading(),this.ionService.showAlert("Connection Error with Server","Perhaps the it has lost connection with the server")})}showPopup(l,n,e){return c.b(this,void 0,void 0,(function*(){yield this.generalSerivce.openPopOver(l,n,e)}))}continuePlan(){console.log(this.currentPlanID),this.isNewUser&&1===parseInt(this.planID,10)?this.gotoFreePlan().then(l=>{l&&this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,planID:1}})}):parseInt(this.planID,10)<this.currentPlanID?this.checkExDomainList():"ios"===this.plat?this.gotoInappPurchase():this.gotoPaypal()}gotoFreePlan(){return new Promise((l,n)=>{this.subscriptionAPI.activatefreesubscription(this.planID,this.userID,this.token).subscribe(e=>{1===e.RESPONSECODE?l(!0):(this.ionService.presentToast(e.RESPONSE),n(!1))},l=>{this.ionService.presentToast("Starter plan activation failed")})})}checkExDomainList(){return c.b(this,void 0,void 0,(function*(){const l=yield this.modalCtrl.create({component:m.a,componentProps:{selectedPlan:this.planName,currentPlan:this.currentPlanName,allowedCnt:this.details.noofdomain,reason:!1}});return l.onDidDismiss().then(l=>{"success"===l.role&&("ios"===this.plat?this.gotoInappPurchase(l.data):this.gotoPaypal(l.data))}),yield l.present()}))}gotoInappPurchase(l=null){return c.b(this,void 0,void 0,(function*(){1===parseInt(this.planID,10)?(this.ionService.showLoading(),this.gotoFreePlan().then(n=>{this.ionService.closeLoading(),n&&this.downgradeDomains(l).then(l=>{this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,platform:"ios",status:"downgrade",oldPlan:this.oldPlan}})})}).catch(l=>{this.ionService.closeLoading()})):(yield this.iap.getProducts(["P2","P3","P4"]),this.iap.subscribe(this.productId).then(n=>{n&&(this.ionService.showLoading(),this.subscriptionAPI.activateSubscriptionIos(parseInt(this.planID,10),n.transactionId,n.productType,this.userID,this.token).subscribe(n=>{this.ionService.closeLoading(),1===n.RESPONSECODE?null!==l?this.downgradeDomains(l).then(l=>{l?this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,platform:"ios",status:"downgrade",oldPlan:this.oldPlan}}):this.ionService.presentToast("Downgrading plan failed. Please try again later.")},l=>{this.ionService.closeLoading(),this.ionService.presentToast("Downgrading plan failed due to server.")}):this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,platform:"ios",status:"upgrade",oldPlan:this.oldPlan}}):(this.ionService.closeLoading(),this.ionService.presentToast("Plan activation failed. Please try again later"))},l=>{this.ionService.closeLoading(),this.ionService.presentToast("Plan activation failed due to server.")}))}).catch(l=>{this.ionService.presentToast("Payment via In app purchase failed. Try again later.")}))}))}gotoPaypal(l=null){1===parseInt(this.planID,10)?(this.ionService.showLoading(),this.gotoFreePlan().then(n=>{this.ionService.closeLoading(),n&&this.downgradeDomains(l).then(l=>{this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,oldPlan:this.oldPlan,platform:"android",status:"downgrade"}})})}).catch(l=>{this.ionService.closeLoading()})):this.paypal.payNow(this.userID,parseInt(this.planID,10),this.token,this.freeTrial).then(n=>{if(this.ionService.closeLoading(),"success"===n)null!==l?this.downgradeDomains(l).then(l=>{l&&this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,platform:"android",status:"downgrade",oldPlan:this.oldPlan}})}).catch(l=>{this.ionService.closeLoading(),this.ionService.presentToast("Downgrading failed due to server api")}):this.router.navigate(["subscription-welcome"],{queryParams:{isNewUser:this.isNewUser,platform:"android",status:"upgrade",oldPlan:this.oldPlan}});else if("pending"===n){let l="Already you have one subscriptions is pending.";l+="So please wait untill status need to update. Then we can change the subscription",this.ionService.presentToast(l)}else this.ionService.presentToast("free-trial-failed"===n?"You are not able to use free trial. There will be something wrong. Please contact support.":"cancelled"===n?"Subscription Activation Failed. Please try again":"Payment Connection Failed. Please try again")}).catch(l=>{this.ionService.presentToast("Subscription Activation Failed. Please try again")})}downgradeDomains(l){return this.ionService.showLoading(),new Promise((n,e)=>{this.subscriptionAPI.downgradePlan(l.domains,this.userID,this.token,l.feedback).subscribe(l=>{this.ionService.closeLoading(),1===l.RESPONSECODE?n(!0):(this.ionService.presentToast(l.RESPONSE),e(!1))},l=>{this.ionService.closeLoading(),this.ionService.presentToast("Somthing might be wrong"),e(!1)})})}goback(){this.navCtrl.back()}}var R=e("iInd"),P=e("xgBC"),C=t["\u0275crt"]({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%]   ion-button.back[_ngcontent-%COMP%]{position:absolute;left:0}ion-header[_ngcontent-%COMP%]   .toolbar[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{font-size:18px;position:absolute;right:0}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]{margin-top:20px}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--min-height:35px;--background:transparent;display:block;width:86%;margin:auto;--border-color:transparent;border-bottom:1px solid #b48bfe;--padding-start:0px;--padding-end:0px}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   div.end[_ngcontent-%COMP%]{width:50px;height:20px;position:absolute;right:10px;display:flex;justify-content:center}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   div.end[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{font-size:22px;margin-bottom:0;margin-top:0;margin-right:0}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   div.end[_ngcontent-%COMP%]   ion-icon[name=close-circle][_ngcontent-%COMP%]{color:#f93a3b}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   div.end[_ngcontent-%COMP%]   ion-icon[name=checkmark-circle][_ngcontent-%COMP%]{color:#4ee136}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-bottom:0;margin-top:0;font-size:13px;font-weight:550}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   .answer[_ngcontent-%COMP%]{text-align:right}ion-content[_ngcontent-%COMP%]   ion-list[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--border-radius:30px;display:block;margin:20px auto;width:60%;height:45px;--background:#ff7980;--background-activated:#f19b9f;--background-focused:#f19b9f;--background-hover:#f19b9f;--color:white;--color-activated:white;font-weight:700;text-transform:none}"]],data:{}});function w(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"ion-label",[["class","price"]],null,null,null,u.mb,u.w)),t["\u0275did"](1,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["Free"]))],null,null)}function v(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"ion-label",[["class","price"]],null,null,null,u.mb,u.w)),t["\u0275did"](1,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](2,0,["\xa3",""]))],null,(function(l,n){l(n,2,0,n.component.planPrice)}))}function E(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function D(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function I(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function k(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function N(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function _(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function S(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function Z(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function O(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function y(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function M(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function T(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function q(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function L(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function x(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","close-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","close-circle")}),null)}function V(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-icon",[["class","answer"],["mode","ios"],["name","checkmark-circle"],["slot","end"]],null,null,null,u.gb,u.q)),t["\u0275did"](1,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null)],(function(l,n){l(n,1,0,"ios","checkmark-circle")}),null)}function U(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"ion-spinner",[["name","lines-small"]],null,null,null,u.yb,u.I)),t["\u0275did"](1,49152,null,0,a.ub,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{name:[0,"name"]},null)],(function(l,n){l(n,1,0,"lines-small")}),null)}function A(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"ion-label",[],null,null,null,u.mb,u.w)),t["\u0275did"](1,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["Continue"]))],null,null)}function F(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,2,"ion-label",[],null,null,null,u.mb,u.w)),t["\u0275did"](1,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["Get started with free trial"]))],null,null)}function J(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,7,"ion-button",[["class","continue"],["expand","block"],["mode","md"],["size","default"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.continuePlan()&&t),t}),u.S,u.c)),t["\u0275did"](1,49152,null,0,a.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{expand:[0,"expand"],mode:[1,"mode"],size:[2,"size"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,U)),t["\u0275did"](3,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,A)),t["\u0275did"](5,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,F)),t["\u0275did"](7,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,1,0,"block","md","default"),l(n,3,0,!e.planID),l(n,5,0,!e.freeTrial||"1"==e.planID||"ios"===e.plat),l(n,7,0,e.freeTrial&&"1"!=e.planID&&"ios"!==e.plat)}),null)}function j(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,155,"ion-list",[["mode","ios"]],null,null,null,u.ob,u.x)),t["\u0275did"](1,49152,null,0,a.Q,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(l()(),t["\u0275eld"](2,0,null,0,10,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](3,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](4,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](5,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["NO.OF.SITES"])),(l()(),t["\u0275eld"](7,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"No. of Sites",i.details.site_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](8,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](9,0,null,0,3,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275eld"](10,0,null,null,2,"ion-label",[["class","answer"],["slot","end"]],null,null,null,u.mb,u.w)),t["\u0275did"](11,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](12,0,["",""])),(l()(),t["\u0275eld"](13,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](14,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](15,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](16,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["MULTI_USER LOGIN"])),(l()(),t["\u0275eld"](18,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Multi-User Login",i.details.multiuser_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](19,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275and"](16777216,null,0,1,null,E)),t["\u0275did"](21,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](22,0,null,0,2,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,D)),t["\u0275did"](24,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](25,0,null,0,8,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](26,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](27,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](28,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["No. of users"])),(l()(),t["\u0275eld"](30,0,null,0,3,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275eld"](31,0,null,null,2,"ion-label",[["class","answer"],["slot","end"]],null,null,null,u.mb,u.w)),t["\u0275did"](32,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](33,0,["",""])),(l()(),t["\u0275eld"](34,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](35,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](36,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](37,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["UPTIME MONITOR"])),(l()(),t["\u0275eld"](39,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Uptime Monitor",i.details.uptime_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](40,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](41,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,I)),t["\u0275did"](43,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,k)),t["\u0275did"](45,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](46,0,null,0,8,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](47,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](48,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](49,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["Check Interval"])),(l()(),t["\u0275eld"](51,0,null,0,3,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275eld"](52,0,null,null,2,"ion-label",[["class","answer"],["slot","end"]],null,null,null,u.mb,u.w)),t["\u0275did"](53,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](54,0,[""," min"])),(l()(),t["\u0275eld"](55,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](56,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](57,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](58,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["SECURITY MONITOR"])),(l()(),t["\u0275eld"](60,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Security Monitor",i.details.security_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](61,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](62,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,N)),t["\u0275did"](64,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,_)),t["\u0275did"](66,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](67,0,null,0,8,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](68,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](69,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](70,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["Check Interval"])),(l()(),t["\u0275eld"](72,0,null,0,3,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275eld"](73,0,null,null,2,"ion-label",[["class","answer"],["slot","end"]],null,null,null,u.mb,u.w)),t["\u0275did"](74,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](75,0,[""," hour"])),(l()(),t["\u0275eld"](76,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](77,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](78,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](79,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["SPEED MONITOR"])),(l()(),t["\u0275eld"](81,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Speed Monitor",i.details.speed_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](82,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](83,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,S)),t["\u0275did"](85,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,Z)),t["\u0275did"](87,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](88,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](89,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](90,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](91,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["ANALYTICS MONITOR"])),(l()(),t["\u0275eld"](93,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Analytics Monitor",i.details.analytic_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](94,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](95,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,O)),t["\u0275did"](97,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,y)),t["\u0275did"](99,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](100,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](101,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](102,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](103,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["DOMAIN MONITOR"])),(l()(),t["\u0275eld"](105,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Domain Monitor",i.details.domain_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](106,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](107,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,M)),t["\u0275did"](109,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,T)),t["\u0275did"](111,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](112,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](113,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](114,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](115,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["SEO HEALTH SCAN"])),(l()(),t["\u0275eld"](117,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"SEO Health Scan",i.details.seo_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](118,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](119,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,q)),t["\u0275did"](121,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,L)),t["\u0275did"](123,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](124,0,null,0,8,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](125,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](126,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](127,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["Report Frequency"])),(l()(),t["\u0275eld"](129,0,null,0,3,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275eld"](130,0,null,null,2,"ion-label",[["class","answer"],["slot","end"]],null,null,null,u.mb,u.w)),t["\u0275did"](131,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](132,0,["",""])),(l()(),t["\u0275eld"](133,0,null,0,8,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](134,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](135,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](136,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["No. of Manual Scans"])),(l()(),t["\u0275eld"](138,0,null,0,3,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275eld"](139,0,null,null,2,"ion-label",[["class","answer"],["slot","end"]],null,null,null,u.mb,u.w)),t["\u0275did"](140,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](141,0,["",""])),(l()(),t["\u0275eld"](142,0,null,0,11,"ion-item",[],null,null,null,u.lb,u.s)),t["\u0275did"](143,49152,null,0,a.J,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](144,0,null,0,2,"ion-label",[["class","title"],["slot","start"]],null,null,null,u.mb,u.w)),t["\u0275did"](145,49152,null,0,a.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["BROKEN LINK SCAN"])),(l()(),t["\u0275eld"](147,0,null,0,1,"ion-icon",[["class","help"]],null,[[null,"click"]],(function(l,n,e){var t=!0,i=l.component;return"click"===n&&(t=!1!==i.showPopup(e,"Broken Link Scan",i.details.broken_desc)&&t),t}),u.gb,u.q)),t["\u0275did"](148,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](149,0,null,0,4,"div",[["class","end"]],null,null,null,null,null)),(l()(),t["\u0275and"](16777216,null,null,1,null,x)),t["\u0275did"](151,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,null,1,null,V)),t["\u0275did"](153,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,J)),t["\u0275did"](155,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,1,0,"ios"),l(n,21,0,"1"!=e.details.is_multi_user_login),l(n,24,0,"1"==e.details.is_multi_user_login),l(n,43,0,"1"!=e.details.is_uptime_monitor),l(n,45,0,"1"==e.details.is_uptime_monitor),l(n,64,0,"1"!=e.details.is_security_monitor),l(n,66,0,"1"==e.details.is_security_monitor),l(n,85,0,"1"!=e.details.is_speed_monitor),l(n,87,0,"1"==e.details.is_speed_monitor),l(n,97,0,"1"!=e.details.is_analytics_monitor),l(n,99,0,"1"==e.details.is_analytics_monitor),l(n,109,0,"1"!=e.details.domain_check_scan),l(n,111,0,"1"==e.details.domain_check_scan),l(n,121,0,"1"!=e.details.is_seo_scan),l(n,123,0,"1"==e.details.is_seo_scan),l(n,151,0,"1"!=e.details.is_broken_link),l(n,153,0,"1"==e.details.is_broken_link),l(n,155,0,e.showbtn)}),(function(l,n){var e=n.component;l(n,12,0,e.details.noofdomain),l(n,33,0,e.details.noofuser),l(n,54,0,e.details.uptimecheck_mins),l(n,75,0,e.details.domain_check_hour),l(n,132,0,e.details.report_frequency),l(n,141,0,e.details.noofmanual)}))}function z(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,16,"ion-header",[["class","small-header"]],null,null,null,u.fb,u.p)),t["\u0275did"](1,49152,null,0,a.D,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](2,0,null,0,14,"ion-toolbar",[["class","toolbar"],["mode","md"]],null,null,null,u.Fb,u.P)),t["\u0275did"](3,49152,null,0,a.Eb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(l()(),t["\u0275eld"](4,0,null,0,12,"ion-buttons",[],null,null,null,u.T,u.d)),t["\u0275did"](5,49152,null,0,a.n,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](6,0,null,0,2,"ion-title",[],null,null,null,u.Db,u.N)),t["\u0275did"](7,49152,null,0,a.Cb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](8,0,[""," Plan"])),(l()(),t["\u0275eld"](9,0,null,0,3,"ion-button",[["class","back"],["mode","md"]],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.goback()&&t),t}),u.S,u.c)),t["\u0275did"](10,49152,null,0,a.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"]},null),(l()(),t["\u0275eld"](11,0,null,0,1,"ion-icon",[["class","back"],["mode","ios"],["name","arrow-back"],["slot","icon-only"]],null,null,null,u.gb,u.q)),t["\u0275did"](12,49152,null,0,a.E,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{mode:[0,"mode"],name:[1,"name"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,w)),t["\u0275did"](14,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275and"](16777216,null,0,1,null,v)),t["\u0275did"](16,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),t["\u0275eld"](17,0,null,null,3,"ion-content",[],null,null,null,u.bb,u.l)),t["\u0275did"](18,49152,null,0,a.w,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275and"](16777216,null,0,1,null,j)),t["\u0275did"](20,16384,null,0,s.k,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,3,0,"md"),l(n,10,0,"md"),l(n,12,0,"ios","arrow-back"),l(n,14,0,0==e.planPrice),l(n,16,0,0!=e.planPrice),l(n,20,0,e.details)}),(function(l,n){l(n,8,0,n.component.planName)}))}var G=t["\u0275ccf"]("app-detailed-plan",b,(function(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-detailed-plan",[],null,null,null,z,C)),t["\u0275did"](1,114688,null,0,b,[R.m,R.a,P.b,d.a,r.a,h.a,a.Lb,a.Nb,a.Kb,g,p.a],null,null)],(function(l,n){l(n,1,0)}),null)}),{},{},[]),K=e("s7LF");class B{}e.d(n,"DetailedPlanPageModuleNgFactory",(function(){return H}));var H=t["\u0275cmf"](i,[],(function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,G]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,s.m,s.l,[t.LOCALE_ID,[2,s.x]]),t["\u0275mpd"](4608,K.q,K.q,[]),t["\u0275mpd"](4608,a.c,a.c,[t.NgZone,t.ApplicationRef]),t["\u0275mpd"](4608,a.Kb,a.Kb,[a.c,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](4608,a.Ob,a.Ob,[a.c,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](1073742336,s.b,s.b,[]),t["\u0275mpd"](1073742336,K.p,K.p,[]),t["\u0275mpd"](1073742336,K.f,K.f,[]),t["\u0275mpd"](1073742336,a.Gb,a.Gb,[]),t["\u0275mpd"](1073742336,R.q,R.q,[[2,R.v],[2,R.m]]),t["\u0275mpd"](1073742336,B,B,[]),t["\u0275mpd"](1073742336,i,i,[]),t["\u0275mpd"](1024,R.k,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);