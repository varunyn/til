(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{1118:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(1051)}])},6691:function(e,t){"use strict";var r,n,o,l;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{ACTION_FAST_REFRESH:function(){return f},ACTION_NAVIGATE:function(){return i},ACTION_PREFETCH:function(){return s},ACTION_REFRESH:function(){return a},ACTION_RESTORE:function(){return c},ACTION_SERVER_ACTION:function(){return d},ACTION_SERVER_PATCH:function(){return u},PrefetchCacheEntryStatus:function(){return n},PrefetchKind:function(){return r},isThenable:function(){return m}});let a="refresh",i="navigate",c="restore",u="server-patch",s="prefetch",f="fast-refresh",d="server-action";function m(e){return e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}(o=r||(r={})).AUTO="auto",o.FULL="full",o.TEMPORARY="temporary",(l=n||(n={})).fresh="fresh",l.reusable="reusable",l.expired="expired",l.stale="stale",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4318:function(e,t,r){"use strict";function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(8364),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9577:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return w}});let n=r(8754),o=r(1032),l=n._(r(1720)),a=r(1401),i=r(2045),c=r(7420),u=r(7201),s=r(1443),f=r(9953),d=r(5320),m=r(2905),h=r(4318),p=r(953),v=r(6691),y=new Set;function b(e,t,r,n,o,l){if(l||(0,i.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let o=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(y.has(o))return;y.add(o)}(async()=>l?e.prefetch(t,o):e.prefetch(t,r,n))().catch(e=>{})}}function g(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let w=l.default.forwardRef(function(e,t){let r,n;let{href:c,as:y,children:w,prefetch:k=null,passHref:x,replace:O,shallow:C,scroll:_,locale:j,onClick:E,onMouseEnter:T,onTouchStart:N,legacyBehavior:P=!1,...S}=e;r=w,P&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let M=l.default.useContext(f.RouterContext),Z=l.default.useContext(d.AppRouterContext),L=null!=M?M:Z,$=!M,I=!1!==k,A=null===k?v.PrefetchKind.AUTO:v.PrefetchKind.FULL,{href:R,as:z}=l.default.useMemo(()=>{if(!M){let e=g(c);return{href:e,as:y?g(y):e}}let[e,t]=(0,a.resolveHref)(M,c,!0);return{href:e,as:y?(0,a.resolveHref)(M,y):t||e}},[M,c,y]),B=l.default.useRef(R),H=l.default.useRef(z);P&&(n=l.default.Children.only(r));let X=P?n&&"object"==typeof n&&n.ref:t,[D,K,U]=(0,m.useIntersection)({rootMargin:"200px"}),F=l.default.useCallback(e=>{(H.current!==z||B.current!==R)&&(U(),H.current=z,B.current=R),D(e),X&&("function"==typeof X?X(e):"object"==typeof X&&(X.current=e))},[z,X,R,U,D]);l.default.useEffect(()=>{L&&K&&I&&b(L,R,z,{locale:j},{kind:A},$)},[z,R,K,j,I,null==M?void 0:M.locale,L,$,A]);let V={ref:F,onClick(e){P||"function"!=typeof E||E(e),P&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),L&&!e.defaultPrevented&&function(e,t,r,n,o,a,c,u,s){let{nodeName:f}=e.currentTarget;if("A"===f.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!s&&!(0,i.isLocalURL)(r)))return;e.preventDefault();let d=()=>{let e=null==c||c;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:a,locale:u,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})};s?l.default.startTransition(d):d()}(e,L,R,z,O,C,_,j,$)},onMouseEnter(e){P||"function"!=typeof T||T(e),P&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),L&&(I||!$)&&b(L,R,z,{locale:j,priority:!0,bypassPrefetchedCheck:!0},{kind:A},$)},onTouchStart:function(e){P||"function"!=typeof N||N(e),P&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),L&&(I||!$)&&b(L,R,z,{locale:j,priority:!0,bypassPrefetchedCheck:!0},{kind:A},$)}};if((0,u.isAbsoluteUrl)(z))V.href=z;else if(!P||x||"a"===n.type&&!("href"in n.props)){let e=void 0!==j?j:null==M?void 0:M.locale,t=(null==M?void 0:M.isLocaleDomain)&&(0,h.getDomainLocale)(z,e,null==M?void 0:M.locales,null==M?void 0:M.domainLocales);V.href=t||(0,p.addBasePath)((0,s.addLocale)(z,e,null==M?void 0:M.defaultLocale))}return P?l.default.cloneElement(n,V):(0,o.jsx)("a",{...S,...V,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2905:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return c}});let n=r(1720),o=r(3815),l="function"==typeof IntersectionObserver,a=new Map,i=[];function c(e){let{rootRef:t,rootMargin:r,disabled:c}=e,u=c||!l,[s,f]=(0,n.useState)(!1),d=(0,n.useRef)(null),m=(0,n.useCallback)(e=>{d.current=e},[]);return(0,n.useEffect)(()=>{if(l){if(u||s)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:o,elements:l}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=i.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=a.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},i.push(r),a.set(r,t),t}(r);return l.set(e,t),o.observe(e),function(){if(l.delete(e),o.unobserve(e),0===l.size){o.disconnect(),a.delete(n);let e=i.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&i.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!s){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[u,r,t,s,d.current]),[m,s,(0,n.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1051:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return A}});var n=r(7320);r(9311);var o=r(1720),l=["light","dark"],a="(prefers-color-scheme: dark)",i="undefined"==typeof window,c=o.createContext(void 0),u={setTheme:e=>{},themes:[]},s=()=>{var e;return null!=(e=o.useContext(c))?e:u},f=e=>o.useContext(c)?e.children:o.createElement(m,{...e}),d=["light","dark"],m=({forcedTheme:e,disableTransitionOnChange:t=!1,enableSystem:r=!0,enableColorScheme:n=!0,storageKey:i="theme",themes:u=d,defaultTheme:s=r?"system":"light",attribute:f="data-theme",value:m,children:b,nonce:g})=>{let[w,k]=o.useState(()=>p(i,s)),[x,O]=o.useState(()=>p(i)),C=m?Object.values(m):u,_=o.useCallback(e=>{let o=e;if(!o)return;"system"===e&&r&&(o=y());let a=m?m[o]:o,i=t?v():null,c=document.documentElement;if("class"===f?(c.classList.remove(...C),a&&c.classList.add(a)):a?c.setAttribute(f,a):c.removeAttribute(f),n){let e=l.includes(s)?s:null,t=l.includes(o)?o:e;c.style.colorScheme=t}null==i||i()},[]),j=o.useCallback(e=>{let t="function"==typeof e?e(e):e;k(t);try{localStorage.setItem(i,t)}catch(e){}},[e]),E=o.useCallback(t=>{O(y(t)),"system"===w&&r&&!e&&_("system")},[w,e]);o.useEffect(()=>{let e=window.matchMedia(a);return e.addListener(E),E(e),()=>e.removeListener(E)},[E]),o.useEffect(()=>{let e=e=>{e.key===i&&j(e.newValue||s)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[j]),o.useEffect(()=>{_(null!=e?e:w)},[e,w]);let T=o.useMemo(()=>({theme:w,setTheme:j,forcedTheme:e,resolvedTheme:"system"===w?x:w,themes:r?[...u,"system"]:u,systemTheme:r?x:void 0}),[w,j,e,x,r,u]);return o.createElement(c.Provider,{value:T},o.createElement(h,{forcedTheme:e,disableTransitionOnChange:t,enableSystem:r,enableColorScheme:n,storageKey:i,themes:u,defaultTheme:s,attribute:f,value:m,children:b,attrs:C,nonce:g}),b)},h=o.memo(({forcedTheme:e,storageKey:t,attribute:r,enableSystem:n,enableColorScheme:i,defaultTheme:c,value:u,attrs:s,nonce:f})=>{let d="system"===c,m="class"===r?`var d=document.documentElement,c=d.classList;c.remove(${s.map(e=>`'${e}'`).join(",")});`:`var d=document.documentElement,n='${r}',s='setAttribute';`,h=i?(l.includes(c)?c:null)?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${c}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",p=(e,t=!1,n=!0)=>{let o=u?u[e]:e,a=t?e+"|| ''":`'${o}'`,c="";return i&&n&&!t&&l.includes(e)&&(c+=`d.style.colorScheme = '${e}';`),"class"===r?t||o?c+=`c.add(${a})`:c+="null":o&&(c+=`d[s](n,${a})`),c},v=e?`!function(){${m}${p(e)}}()`:n?`!function(){try{${m}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${d})){var t='${a}',m=window.matchMedia(t);if(m.media!==t||m.matches){${p("dark")}}else{${p("light")}}}else if(e){${u?`var x=${JSON.stringify(u)};`:""}${p(u?"x[e]":"e",!0)}}${d?"":"else{"+p(c,!1,!1)+"}"}${h}}catch(e){}}()`:`!function(){try{${m}var e=localStorage.getItem('${t}');if(e){${u?`var x=${JSON.stringify(u)};`:""}${p(u?"x[e]":"e",!0)}}else{${p(c,!1,!1)};}${h}}catch(t){}}();`;return o.createElement("script",{nonce:f,dangerouslySetInnerHTML:{__html:v}})}),p=(e,t)=>{let r;if(!i){try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t}},v=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},y=e=>(e||(e=window.matchMedia(a)),e.matches?"dark":"light"),b=r(9008),g=r.n(b),w=r(1664),k=r.n(w),x=()=>{let{theme:e,setTheme:t}=s();return(0,n.tZ)("nav",{className:"font-sans sticky-nav my-0 fixed bg-white h-16 my-0 md:my-8 mx-auto  dark:bg-darkgrey  w-full  shadow-md",children:(0,n.BX)("div",{className:"flex h-full container mx-auto justify-between items-center px-6 md:px-0",children:[(0,n.tZ)("a",{className:"dark:bg-darkgrey dark:text-whitedarktheme",children:"TIL"}),(0,n.BX)("ul",{className:"flex flex-row space-x-4 items-center dark:bg-darkgrey dark:text-whitedarktheme md:relative md:left-0",children:[(0,n.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,n.tZ)(k(),{href:"/",className:"relative",children:"Home"})}),(0,n.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,n.tZ)(k(),{href:"/tags",className:"relative",children:"Tags"})}),(0,n.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,n.tZ)(k(),{href:"/about",className:"relative",children:"About"})}),(0,n.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,n.tZ)("a",{href:"https://twitter.com/varun1_yadav",rel:"me"})})]}),(0,n.tZ)("button",{"aria-label":"Toggle Dark Mode",type:"button",className:"p-3 h-12 w-12 oabsolute left-2/4 transform -translate-x-2/4 md:relative md:left-0",onClick:()=>t("dark"===e?"light":"dark"),children:(0,n.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"currentColor",className:"h-6 w-6 text-gray-800 dark:text-gray-200",children:"dark"===e?(0,n.tZ)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"}):(0,n.tZ)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"})})})]})})},O={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},C=o.default.createContext&&o.default.createContext(O),_=["attr","size","title"];function j(){return(j=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function E(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?E(Object(r),!0).forEach(function(t){var n,o;n=t,o=r[t],(n=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(n))in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):E(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function N(e){return t=>o.default.createElement(P,j({attr:T({},e.attr)},t),function e(t){return t&&t.map((t,r)=>o.default.createElement(t.tag,T({key:r},t.attr),e(t.child)))}(e.child))}function P(e){var t=t=>{var r,{attr:n,size:l,title:a}=e,i=function(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r={};for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}(e,_),c=l||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),o.default.createElement("svg",j({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,n,i,{className:r,style:T(T({color:e.color||t.color},t.style),e.style),height:c,width:c,xmlns:"http://www.w3.org/2000/svg"}),a&&o.default.createElement("title",null,a),e.children)};return void 0!==C?o.default.createElement(C.Consumer,null,e=>t(e)):t(O)}function S(e){return N({tag:"svg",attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(e)}function M(e){return N({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"},child:[]}]})(e)}var Z=()=>(0,n.BX)("footer",{className:"px-6 mx-auto mt-10",children:[(0,n.BX)("div",{className:"flex items-center mb-4 space-x-1.5 justify-center -ml-2 sm:ml-0 text-lg md:text-2xl",children:[(0,n.BX)("a",{className:"p-2 hover:text-indigo-600 dark:hover:text-indigo-300",href:"https://twitter.com/varun1_yadav",target:"_blank",rel:"noopener noreferrer",children:[(0,n.tZ)(M,{focusable:"false"}),(0,n.tZ)("span",{className:"sr-only",children:"Twitter profile"})]}),(0,n.BX)("a",{className:"p-2 hover:text-indigo-600 dark:hover:text-indigo-300",href:"https://github.com/varunyn",target:"_blank",rel:"noopener noreferrer",children:[(0,n.tZ)(S,{focusable:"false"}),(0,n.tZ)("span",{className:"sr-only",children:"GitHub profile"})]})]}),(0,n.tZ)("div",{className:"text-sm text-gray-500 dark:text-gray-400 text-center",children:(0,n.tZ)("p",{className:"inline-flex items-center space-x-1",children:(0,n.BX)("span",{children:["Made by Varun Yadav in ",new Date().getFullYear()]})})})]}),L=e=>{let{children:t}=e;return(0,n.BX)(n.HY,{children:[(0,n.BX)(g(),{children:[(0,n.tZ)("title",{children:"TIL - varunyadav.com"}),(0,n.tZ)("link",{rel:"icon",href:"/favicon.ico"}),(0,n.tZ)("link",{rel:"webmention",href:"https://webmention.io/til.varunyadav.com/webmention"}),(0,n.tZ)("link",{rel:"pingback",href:"https://webmention.io/til.varunyadav.com/xmlrpc"})]}),(0,n.tZ)(x,{}),(0,n.tZ)("main",{className:"justify-center bg-white dark:bg-darkgrey",children:t}),(0,n.tZ)(Z,{})]})},$=r(1163);let I=e=>{window.gtag("config","G-CQ2DHLT0V2",{page_path:e})};var A=function(e){let{Component:t,pageProps:r}=e,l=(0,$.useRouter)();return(0,o.useEffect)(()=>{let e=e=>{I(e)};return l.events.on("routeChangeComplete",e),()=>{l.events.off("routeChangeComplete",e)}},[l.events]),(0,n.tZ)(f,{attribute:"class",children:(0,n.tZ)(L,{children:(0,n.tZ)(t,{...r})})})}},9311:function(){},9008:function(e,t,r){e.exports=r(7828)},1664:function(e,t,r){e.exports=r(9577)},1163:function(e,t,r){e.exports=r(9090)},7320:function(e,t,r){"use strict";r.d(t,{BX:function(){return n.jsxs},HY:function(){return n.Fragment},tZ:function(){return n.jsx}}),r(1720);var n=r(6584)}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[179],function(){return t(1118),t(9090)}),_N_E=e.O()}]);