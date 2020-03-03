function asyncGeneratorStep(e,t,o,i,n,r,s){try{var a=e[r](s),p=a.value}catch(l){return void o(l)}a.done?t(p):Promise.resolve(p).then(i,n)}function _asyncToGenerator(e){return function(){var t=this,o=arguments;return new Promise((function(i,n){var r=e.apply(t,o);function s(e){asyncGeneratorStep(r,i,n,s,a,"next",e)}function a(e){asyncGeneratorStep(r,i,n,s,a,"throw",e)}s(void 0)}))}}(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{VgKV:function(e,t,o){"use strict";o.r(t),o.d(t,"ion_popover",(function(){return v}));var i=o("dSyh"),n=(o("AfW+"),o("aiEM"),o("+4pY")),r=(o("kBU6"),o("pori")),s=o("Dl6n"),a=o("m9yc"),p=o("+veT");const l=(e,t)=>{let o="top",i="left";const r=e.querySelector(".popover-content"),s=r.getBoundingClientRect(),a=s.width,p=s.height,l=e.ownerDocument.defaultView.innerWidth,d=e.ownerDocument.defaultView.innerHeight,m=t&&t.target&&t.target.getBoundingClientRect(),h=null!=m&&"top"in m?m.top:d/2-p/2,v=null!=m&&"left"in m?m.left:l/2,f=m&&m.width||0,u=m&&m.height||0,b=e.querySelector(".popover-arrow"),g=b.getBoundingClientRect(),y=g.width,w=g.height;null==m&&(b.style.display="none");const x={top:h+u,left:v+f/2-y/2},j={top:h+u+(w-1),left:v+f/2-a/2};let O=!1,D=!1;j.left<c+25?(O=!0,j.left=c):a+c+j.left+25>l&&(D=!0,j.left=l-a-c,i="right"),h+u+p>d&&h-p>0?(x.top=h-(w+1),j.top=h-p-(w-1),e.className=e.className+" popover-bottom",o="bottom"):h+u+p>d&&(r.style.bottom=c+"%"),b.style.top=x.top+"px",b.style.left=x.left+"px",r.style.top=j.top+"px",r.style.left=j.left+"px",O&&(r.style.left=`calc(${j.left}px + var(--ion-safe-area-left, 0px))`),D&&(r.style.left=`calc(${j.left}px - var(--ion-safe-area-right, 0px))`),r.style.transformOrigin=o+" "+i;const P=Object(n.a)(),k=Object(n.a)(),E=Object(n.a)();return k.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,.08),E.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),P.addElement(e).easing("ease").duration(100).addAnimation([k,E])},c=5,d=e=>{const t=Object(n.a)(),o=Object(n.a)(),i=Object(n.a)();return o.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.08,0),i.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),t.addElement(e).easing("ease").duration(500).addAnimation([o,i])},m=(e,t)=>{const o=e.ownerDocument,i="rtl"===o.dir;let r="top",s=i?"right":"left";const a=e.querySelector(".popover-content"),p=a.getBoundingClientRect(),l=p.width,c=p.height,d=o.defaultView.innerWidth,m=o.defaultView.innerHeight,h=t&&t.target&&t.target.getBoundingClientRect(),v=null!=h&&"bottom"in h?h.bottom:m/2-c/2,f=h&&h.height||0,u={top:v,left:null!=h&&"left"in h?i?h.left-l+h.width:h.left:d/2-l/2};u.left<12?(u.left=12,s="left"):l+12+u.left>d&&(u.left=d-l-12,s="right"),v+f+c>m&&v-c>0?(u.top=v-c-f,e.className=e.className+" popover-bottom",r="bottom"):v+f+c>m&&(a.style.bottom="12px");const b=Object(n.a)(),g=Object(n.a)(),y=Object(n.a)(),w=Object(n.a)(),x=Object(n.a)();return g.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.01,.32),y.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.01,1),w.addElement(a).beforeStyles({top:`${u.top}px`,left:`${u.left}px`,"transform-origin":`${r} ${s}`}).fromTo("transform","scale(0.001)","scale(1)"),x.addElement(e.querySelector(".popover-viewport")).fromTo("opacity",.01,1),b.addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).addAnimation([g,y,w,x])},h=e=>{const t=Object(n.a)(),o=Object(n.a)(),i=Object(n.a)();return o.addElement(e.querySelector("ion-backdrop")).fromTo("opacity",.32,0),i.addElement(e.querySelector(".popover-wrapper")).fromTo("opacity",.99,0),t.addElement(e).easing("ease").duration(500).addAnimation([o,i])},v=class{constructor(e){Object(i.l)(this,e),this.presented=!1,this.mode=Object(i.e)(this),this.keyboardClose=!0,this.backdropDismiss=!0,this.showBackdrop=!0,this.translucent=!1,this.animated=!0,this.onDismiss=e=>{e.stopPropagation(),e.preventDefault(),this.dismiss()},this.onBackdropTap=()=>{this.dismiss(void 0,r.a)},this.onLifecycle=e=>{const t=this.usersElement,o=f[e.type];if(t&&o){const i=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:e.detail});t.dispatchEvent(i)}},Object(r.e)(this.el),this.didPresent=Object(i.d)(this,"ionPopoverDidPresent",7),this.willPresent=Object(i.d)(this,"ionPopoverWillPresent",7),this.willDismiss=Object(i.d)(this,"ionPopoverWillDismiss",7),this.didDismiss=Object(i.d)(this,"ionPopoverDidDismiss",7)}present(){var e=this;return _asyncToGenerator((function*(){if(e.presented)return;const t=e.el.querySelector(".popover-content");if(!t)throw new Error("container is undefined");const o=Object.assign(Object.assign({},e.componentProps),{popover:e.el});return e.usersElement=yield Object(a.a)(e.delegate,t,e.component,["popover-viewport",e.el["s-sc"]],o),yield Object(p.a)(e.usersElement),Object(r.f)(e,"popoverEnter",l,m,e.event)}))()}dismiss(e,t){var o=this;return _asyncToGenerator((function*(){const i=yield Object(r.g)(o,e,t,"popoverLeave",d,h,o.event);return i&&(yield Object(a.b)(o.delegate,o.usersElement)),i}))()}onDidDismiss(){return Object(r.h)(this.el,"ionPopoverDidDismiss")}onWillDismiss(){return Object(r.h)(this.el,"ionPopoverWillDismiss")}render(){const e=Object(i.e)(this),{onLifecycle:t}=this;return Object(i.i)(i.a,{"aria-modal":"true","no-router":!0,style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign(Object.assign({},Object(s.b)(this.cssClass)),{[e]:!0,"popover-translucent":this.translucent}),onIonPopoverDidPresent:t,onIonPopoverWillPresent:t,onIonPopoverWillDismiss:t,onIonPopoverDidDismiss:t,onIonDismiss:this.onDismiss,onIonBackdropTap:this.onBackdropTap},Object(i.i)("ion-backdrop",{tappable:this.backdropDismiss,visible:this.showBackdrop}),Object(i.i)("div",{class:"popover-wrapper"},Object(i.i)("div",{class:"popover-arrow"}),Object(i.i)("div",{class:"popover-content"})))}get el(){return Object(i.f)(this)}static get style(){return".sc-ion-popover-md-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1001}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl] .sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl].sc-ion-popover-md .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:.1s;transition-delay:.1s}"}},f={ionPopoverDidPresent:"ionViewDidEnter",ionPopoverWillPresent:"ionViewWillEnter",ionPopoverWillDismiss:"ionViewWillLeave",ionPopoverDidDismiss:"ionViewDidLeave"}}}]);