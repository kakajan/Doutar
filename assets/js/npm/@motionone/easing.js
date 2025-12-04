/**
 * Bundled by jsDelivr using Rollup v2.79.2 and Terser v5.39.0.
 * Original file: /npm/@motionone/easing@10.18.0/dist/index.es.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import{noopReturn as t,clamp as n}from"/npm/@motionone/utils@10.18.0/+esm";const e=(t,n,e)=>(((1-3*e+3*n)*t+(3*e-6*n))*t+3*n)*t;function o(n,o,r,i){if(n===o&&r===i)return t;const u=t=>function(t,n,o,r,i){let u,a,l=0;do{a=n+(o-n)/2,u=e(a,r,i)-t,u>0?o=a:n=a}while(Math.abs(u)>1e-7&&++l<12);return a}(t,0,1,n,r);return t=>0===t||1===t?t:e(u(t),o,i)}const r=(t,e="end")=>o=>{const r=(o="end"===e?Math.min(o,.999):Math.max(o,.001))*t,i="end"===e?Math.floor(r):Math.ceil(r);return n(0,1,i/t)};export{o as cubicBezier,r as steps};export default null;
//# sourceMappingURL=/sm/5963afde5c44e7f1dd3fbc1cbd67de5d980ffad97a6934c92f1568ad730fc7c7.map