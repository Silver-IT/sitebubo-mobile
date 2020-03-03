function asyncGeneratorStep(t,e,n,i,o,r,a){try{var s=t[r](a),d=s.value}catch(c){return void n(c)}s.done?e(d):Promise.resolve(d).then(i,o)}function _asyncToGenerator(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var r=t.apply(e,n);function a(t){asyncGeneratorStep(r,i,o,a,s,"next",t)}function s(t){asyncGeneratorStep(r,i,o,a,s,"throw",t)}a(void 0)}))}}(window.webpackJsonp=window.webpackJsonp||[]).push([[115],{upP9:function(t,e,n){"use strict";n.r(e),n.d(e,"ion_toggle",(function(){return s}));var i=n("dSyh"),o=(n("AfW+"),n("aiEM")),r=n("Dl6n"),a=n("opz7");const s=class{constructor(t){Object(i.l)(this,t),this.inputId=`ion-tg-${c++}`,this.lastDrag=0,this.activated=!1,this.name=this.inputId,this.checked=!1,this.disabled=!1,this.value="on",this.onClick=()=>{this.lastDrag+300<Date.now()&&(this.checked=!this.checked)},this.onFocus=()=>{this.ionFocus.emit()},this.onBlur=()=>{this.ionBlur.emit()},this.ionChange=Object(i.d)(this,"ionChange",7),this.ionFocus=Object(i.d)(this,"ionFocus",7),this.ionBlur=Object(i.d)(this,"ionBlur",7),this.ionStyle=Object(i.d)(this,"ionStyle",7)}checkedChanged(t){this.ionChange.emit({checked:t,value:this.value})}disabledChanged(){this.emitStyle(),this.gesture&&this.gesture.setDisabled(this.disabled)}connectedCallback(){var t=this;return _asyncToGenerator((function*(){t.gesture=(yield Promise.resolve().then(n.bind(null,"mUkt"))).createGesture({el:t.el,gestureName:"toggle",gesturePriority:100,threshold:5,passive:!1,onStart:()=>t.onStart(),onMove:e=>t.onMove(e),onEnd:e=>t.onEnd(e)}),t.disabledChanged()}))()}disconnectedCallback(){this.gesture&&(this.gesture.destroy(),this.gesture=void 0)}componentWillLoad(){this.emitStyle()}emitStyle(){this.ionStyle.emit({"interactive-disabled":this.disabled})}onStart(){this.activated=!0,this.setFocus()}onMove(t){d(document,this.checked,t.deltaX,-10)&&(this.checked=!this.checked,Object(a.d)())}onEnd(t){this.activated=!1,this.lastDrag=Date.now(),t.event.preventDefault(),t.event.stopImmediatePropagation()}getValue(){return this.value||""}setFocus(){this.buttonEl&&this.buttonEl.focus()}render(){const{inputId:t,disabled:e,checked:n,activated:a,color:s,el:d}=this,c=Object(i.e)(this),g=t+"-lbl",l=Object(o.f)(d),h=this.getValue();return l&&(l.id=g),Object(o.a)(!0,d,this.name,n?h:"",e),Object(i.i)(i.a,{onClick:this.onClick,role:"checkbox","aria-disabled":e?"true":null,"aria-checked":`${n}`,"aria-labelledby":g,class:Object.assign(Object.assign({},Object(r.a)(s)),{[c]:!0,"in-item":Object(r.c)("ion-item",d),"toggle-activated":a,"toggle-checked":n,"toggle-disabled":e,interactive:!0})},Object(i.i)("div",{class:"toggle-icon"},Object(i.i)("div",{class:"toggle-inner"})),Object(i.i)("button",{type:"button",onFocus:this.onFocus,onBlur:this.onBlur,disabled:e,ref:t=>this.buttonEl=t}))}get el(){return Object(i.f)(this)}static get watchers(){return{checked:["checkedChanged"],disabled:["disabledChanged"]}}static get style(){return":host{-webkit-box-sizing:content-box!important;box-sizing:content-box!important;display:inline-block;outline:none;contain:content;cursor:pointer;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.ion-focused) input{border:2px solid #5e9ed6}:host(.toggle-disabled){pointer-events:none}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}:host-context([dir=rtl]) button,[dir=rtl] button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}:host{--background:rgba(var(--ion-text-color-rgb,0,0,0),0.3);--background-checked:rgba(var(--ion-color-primary-rgb,56,128,255),0.5);--handle-background:#fff;--handle-background-checked:var(--ion-color-primary,#3880ff);padding-left:12px;padding-right:12px;padding-top:12px;padding-bottom:12px;-webkit-box-sizing:content-box;box-sizing:content-box;position:relative;width:36px;height:14px;contain:strict}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:12px;padding-inline-start:12px;-webkit-padding-end:12px;padding-inline-end:12px}}:host(.ion-color.toggle-checked) .toggle-icon{background:rgba(var(--ion-color-base-rgb),.5)}:host(.ion-color.toggle-checked) .toggle-inner{background:var(--ion-color-base)}.toggle-icon{border-radius:14px;display:block;position:relative;width:100%;height:100%;-webkit-transition:background-color .16s;transition:background-color .16s;background:var(--background);pointer-events:none}.toggle-inner{left:0;top:-3px;border-radius:50%;position:absolute;width:20px;height:20px;-webkit-transition-duration:.16s;transition-duration:.16s;-webkit-transition-property:background-color,-webkit-transform;transition-property:background-color,-webkit-transform;transition-property:transform,background-color;transition-property:transform,background-color,-webkit-transform;-webkit-transition-timing-function:cubic-bezier(.4,0,.2,1);transition-timing-function:cubic-bezier(.4,0,.2,1);background:var(--handle-background);-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);will-change:transform,background-color;contain:strict}:host-context([dir=rtl]) .toggle-inner,[dir=rtl] .toggle-inner{left:unset;right:unset;right:0}:host(.toggle-checked) .toggle-icon{background:var(--background-checked)}:host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(16px,0,0);transform:translate3d(16px,0,0);background:var(--handle-background-checked)}:host-context([dir=rtl]).toggle-checked .toggle-inner,:host-context([dir=rtl]):host(.toggle-checked) .toggle-inner{-webkit-transform:translate3d(calc(-1 * 16px),0,0);transform:translate3d(calc(-1 * 16px),0,0)}:host(.toggle-disabled){opacity:.3}:host(.in-item[slot]){margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;padding-left:16px;padding-right:0;padding-top:12px;padding-bottom:12px;cursor:pointer}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot]){padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:0;padding-inline-end:0}}:host(.in-item[slot=start]){padding-left:2px;padding-right:18px;padding-top:12px;padding-bottom:12px}@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host(.in-item[slot=start]){padding-left:unset;padding-right:unset;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-padding-end:18px;padding-inline-end:18px}}"}},d=(t,e,n,i)=>{const o="rtl"===t.dir;return e?!o&&i>n||o&&-i<n:!o&&-i<n||o&&i>n};let c=0}}]);