var v={exports:{}},o={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function R(){if(x)return o;x=1;var u=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function e(n,t,i){var a=null;if(i!==void 0&&(a=""+i),t.key!==void 0&&(a=""+t.key),"key"in t){i={};for(var d in t)d!=="key"&&(i[d]=t[d])}else i=t;return t=i.ref,{$$typeof:u,type:n,key:a,ref:t!==void 0?t:null,props:i}}return o.Fragment=r,o.jsx=e,o.jsxs=e,o}var c;function _(){return c||(c=1,v.exports=R()),v.exports}var h=_();let l=[],s=0;const f=4;let E=u=>{let r=[],e={get(){return e.lc||e.listen(()=>{})(),e.value},lc:0,listen(n){return e.lc=r.push(n),()=>{for(let i=s+f;i<l.length;)l[i]===n?l.splice(i,f):i+=f;let t=r.indexOf(n);~t&&(r.splice(t,1),--e.lc||e.off())}},notify(n,t){let i=!l.length;for(let a of r)l.push(a,e.value,n,t);if(i){for(s=0;s<l.length;s+=f)l[s](l[s+1],l[s+2],l[s+3]);l.length=0}},off(){},set(n){let t=e.value;t!==n&&(e.value=n,e.notify(t))},subscribe(n){let t=e.listen(n);return n(e.value),t},value:u};return e},m=(u={})=>{let r=E(u);return r.setKey=function(e,n){let t=r.value;typeof n>"u"&&e in r.value?(r.value={...r.value},delete r.value[e],r.notify(t,e)):r.value[e]!==n&&(r.value={...r.value,[e]:n},r.notify(t,e))},r};const q=E(!1),p=m({});function T(u){const e=p.get()[1];e?p.setKey(1,{...e,quantity:e.quantity+parseInt(u)}):p.setKey(1,{id:1,quantity:parseInt(u)})}export{T as a,p as c,q as i,h as j};
