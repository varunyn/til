(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888,179],{3646:function(e,t,n){var r=n(7228);e.exports=function(e){if(Array.isArray(e))return r(e)}},9713:function(e){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},6156:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,{Z:function(){return r}})},6860:function(e){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},319:function(e,t,n){var r=n(3646),a=n(6860),o=n(379),i=n(8206);e.exports=function(e){return r(e)||a(e)||o(e)||i()}},6071:function(e,t,n){"use strict";var r=n(3038),a=n(862);t.default=void 0;var o=a(n(9748)),i=n(1689),c=n(2441),u=n(5749),s={};function l(e,t,n,r){if(e&&(0,i.isLocalURL)(t)){e.prefetch(t,n,r).catch((function(e){0}));var a=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;s[t+"%"+n+(a?"%"+a:"")]=!0}}var f=function(e){var t=!1!==e.prefetch,n=(0,c.useRouter)(),a=n&&n.pathname||"/",f=o.default.useMemo((function(){var t=(0,i.resolveHref)(a,e.href,!0),n=r(t,2),o=n[0],c=n[1];return{href:o,as:e.as?(0,i.resolveHref)(a,e.as):c||o}}),[a,e.href,e.as]),d=f.href,m=f.as,p=e.children,h=e.replace,v=e.shallow,y=e.scroll,b=e.locale;"string"===typeof p&&(p=o.default.createElement("a",null,p));var g=o.Children.only(p),w=g&&"object"===typeof g&&g.ref,k=(0,u.useIntersection)({rootMargin:"200px"}),_=r(k,2),O=_[0],M=_[1],x=o.default.useCallback((function(e){O(e),w&&("function"===typeof w?w(e):"object"===typeof w&&(w.current=e))}),[w,O]);(0,o.useEffect)((function(){var e=M&&t&&(0,i.isLocalURL)(d),r="undefined"!==typeof b?b:n&&n.locale,a=s[d+"%"+m+(r?"%"+r:"")];e&&!a&&l(n,d,m,{locale:r})}),[m,d,M,b,t,n]);var C={ref:x,onClick:function(e){g.props&&"function"===typeof g.props.onClick&&g.props.onClick(e),e.defaultPrevented||function(e,t,n,r,a,o,c,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,i.isLocalURL)(n))&&(e.preventDefault(),null==c&&(c=r.indexOf("#")<0),t[a?"replace":"push"](n,r,{shallow:o,locale:u,scroll:c}))}(e,n,d,m,h,v,y,b)},onMouseEnter:function(e){(0,i.isLocalURL)(d)&&(g.props&&"function"===typeof g.props.onMouseEnter&&g.props.onMouseEnter(e),l(n,d,m,{priority:!0}))}};if(e.passHref||"a"===g.type&&!("href"in g.props)){var j="undefined"!==typeof b?b:n&&n.locale,S=n&&n.isLocaleDomain&&(0,i.getDomainLocale)(m,j,n&&n.locales,n&&n.domainLocales);C.href=S||(0,i.addBasePath)((0,i.addLocale)(m,j,n&&n.defaultLocale))}return o.default.cloneElement(g,C)};t.default=f},5749:function(e,t,n){"use strict";var r=n(3038);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!i,u=(0,a.useRef)(),s=(0,a.useState)(!1),l=r(s,2),f=l[0],d=l[1],m=(0,a.useCallback)((function(e){u.current&&(u.current(),u.current=void 0),n||f||e&&e.tagName&&(u.current=function(e,t,n){var r=function(e){var t=e.rootMargin||"",n=c.get(t);if(n)return n;var r=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return c.set(t,n={id:t,observer:a,elements:r}),n}(n),a=r.id,o=r.observer,i=r.elements;return i.set(e,t),o.observe(e),function(){i.delete(e),o.unobserve(e),0===i.size&&(o.disconnect(),c.delete(a))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[n,t,f]);return(0,a.useEffect)((function(){if(!i&&!f){var e=(0,o.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,o.cancelIdleCallback)(e)}}}),[f]),[m,f]};var a=n(9748),o=n(8391),i="undefined"!==typeof IntersectionObserver;var c=new Map},3367:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var a=((r=n(9748))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=a},7845:function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=i,t.useAmp=function(){return i(a.default.useContext(o.AmpStateContext))};var r,a=(r=n(9748))&&r.__esModule?r:{default:r},o=n(3367);function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery,i=void 0!==o&&o;return n||a&&i}},7947:function(e,t,n){"use strict";var r=n(9713);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}t.__esModule=!0,t.defaultHead=d,t.default=void 0;var o,i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=f();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var o=r?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=e[a]}n.default=e,t&&t.set(e,n);return n}(n(9748)),c=(o=n(617))&&o.__esModule?o:{default:o},u=n(3367),s=n(4287),l=n(7845);function f(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return f=function(){return e},e}function d(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[i.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(i.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function m(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function h(e,t){return e.reduce((function(e,t){var n=i.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(m,[]).reverse().concat(d(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0,i=!1;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){i=!0;var c=a.key.slice(a.key.indexOf("$")+1);e.has(c)?o=!1:e.add(c)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var u=0,s=p.length;u<s;u++){var l=p[u];if(a.props.hasOwnProperty(l))if("charSet"===l)n.has(l)?o=!1:n.add(l);else{var f=a.props[l],d=r[l]||new Set;"name"===l&&i||!d.has(f)?(d.add(f),r[l]=d):o=!1}}}return o}}()).reverse().map((function(e,n){var o=e.key||n;if(!t.inAmpMode&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css"].some((function(t){return e.props.href.startsWith(t)}))){var c=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.props||{});return c["data-href"]=c.href,c.href=void 0,i.default.cloneElement(e,c)}return i.default.cloneElement(e,{key:o})}))}function v(e){var t=e.children,n=(0,i.useContext)(u.AmpStateContext),r=(0,i.useContext)(s.HeadManagerContext);return i.default.createElement(c.default,{reduceComponentsToState:h,headManager:r,inAmpMode:(0,l.isInAmpMode)(n)},t)}v.rewind=function(){};var y=v;t.default=y},617:function(e,t,n){"use strict";var r=n(319),a=n(4575),o=n(3913),i=(n(1506),n(2205)),c=n(8585),u=n(9754);function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var a=u(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return c(this,n)}}t.__esModule=!0,t.default=void 0;var l=n(9748),f=function(e){i(n,e);var t=s(n);function n(e){var o;return a(this,n),(o=t.call(this,e))._hasHeadManager=void 0,o.emitChange=function(){o._hasHeadManager&&o.props.headManager.updateHead(o.props.reduceComponentsToState(r(o.props.headManager.mountedInstances),o.props))},o._hasHeadManager=o.props.headManager&&o.props.headManager.mountedInstances,o}return o(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(l.Component);t.default=f},5668:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return y}});var r=n(6156),a=n(7146),o=(n(7297),n(9748)),i=n(9008),c=(0,o.createContext)({setTheme:function(e){},themes:[]}),u=function(e){var t=e.forcedTheme,n=e.disableTransitionOnChange,r=void 0!==n&&n,a=e.enableSystem,i=void 0===a||a,u=e.storageKey,d=void 0===u?"theme":u,m=e.themes,p=void 0===m?["light","dark"]:m,h=e.defaultTheme,v=void 0===h?"light":h,y=e.attribute,b=void 0===y?"data-theme":y,g=e.value,w=e.children,k=(0,o.useState)((function(){return l(d)})),_=k[0],O=k[1],M=(0,o.useState)((function(){return l(d)})),x=M[0],C=M[1],j=g?Object.values(g):p,S=(0,o.useCallback)((function(e,t){void 0===t&&(t=!0);var n=(null==g?void 0:g[e])||e,a=r?f():null;if(t)try{localStorage.setItem(d,e)}catch(e){}var o,i=document.documentElement;"class"===b?((o=i.classList).remove.apply(o,j),i.classList.add(n)):i.setAttribute(b,n),null==a||a()}),[]),E=(0,o.useCallback)((function(e){var t=e.matches?"dark":"light";C(t),"system"===_&&S(t,!1)}),[_]);(0,o.useEffect)((function(){if(i){var e=window.matchMedia("(prefers-color-scheme: dark)");return e.addListener(E),E(e),function(){return e.removeListener(E)}}}),[E]);var P=(0,o.useCallback)((function(e){t||(S(e),O(e))}),[]);return(0,o.useEffect)((function(){var e=function(e){e.key===d&&P(e.newValue)};return window.addEventListener("storage",e),function(){return window.removeEventListener("storage",e)}}),[]),o.default.createElement(c.Provider,{value:{theme:_,setTheme:P,forcedTheme:t,resolvedTheme:"system"===_?x:_,themes:i?[].concat(p,["system"]):p,systemTheme:i?x:void 0}},o.default.createElement(s,{forcedTheme:t,storageKey:d,attribute:b,value:g,enableSystem:i,defaultTheme:v,attrs:j}),w)},s=(0,o.memo)((function(e){var t=e.forcedTheme,n=e.storageKey,r=e.attribute,a=e.enableSystem,c=e.defaultTheme,u=e.value,s="class"===r?"var d=document.documentElement.classList;d.remove("+e.attrs.map((function(e){return"'"+e+"'"})).join(",")+");":"var d=document.documentElement;",l=function(e,t){e=(null==u?void 0:u[e])||e;var n=t?e:"'"+e+"'";return"class"===r?"d.add("+n+")":"d.setAttribute('"+r+"', "+n+")"};return o.default.createElement(i.default,null,o.default.createElement("script",t?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){"+s+l(t)+"}()"}}:a?{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){try {"+s+"var e=localStorage.getItem('"+n+"');if(!e)return localStorage.setItem('"+n+"','"+c+"'),"+l(c)+';if("system"===e){var t="(prefers-color-scheme: dark)",m=window.matchMedia(t);m.media!==t||m.matches?'+l("dark")+":"+l("light")+"}else "+(u?"var x="+JSON.stringify(u)+";":"")+l(u?"x[e]":"e",!0)+"}catch(e){}}()"}}:{key:"next-themes-script",dangerouslySetInnerHTML:{__html:"!function(){try{"+s+'var t=localStorage.getItem("'+n+'");if(!t)return localStorage.setItem("'+n+'","'+c+'"),'+l(c)+";"+(u?"var x="+JSON.stringify(u)+";":"")+l(u?"x[t]":"t",!0)+"}catch(t){}}();"}}))}),(function(e,t){return e.forcedTheme===t.forcedTheme})),l=function(e){if("undefined"!=typeof window){var t;try{t=localStorage.getItem(e)||void 0}catch(e){}return t}},f=function(){var e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),function(){window.getComputedStyle(e),document.head.removeChild(e)}},d=n(1664),m=function(){var e=(0,o.useContext)(c),t=e.theme,n=e.setTheme;return(0,a.tZ)("nav",{className:" sticky-nav my-0 fixed bg-white h-16 my-0 md:my-8 mx-auto  dark:bg-darkgrey  w-full  shadow-md",children:(0,a.BX)("div",{className:"flex h-full container mx-auto justify-between items-center px-6 md:px-0",children:[(0,a.tZ)("a",{className:"dark:bg-darkgrey dark:text-whitedarktheme",children:"TIL"}),(0,a.BX)("ul",{className:"flex flex-row space-x-4 items-center dark:bg-darkgrey dark:text-whitedarktheme md:relative md:left-0",children:[(0,a.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,a.tZ)(d.default,{href:"/",children:(0,a.tZ)("a",{className:"relative",children:"Home"})})}),(0,a.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,a.tZ)(d.default,{href:"/about",children:(0,a.tZ)("a",{className:"relative",children:"About"})})}),(0,a.tZ)("li",{className:"mt-2 sm:mt-0 sm:mr-6",children:(0,a.tZ)("a",{href:"https://twitter.com/varun1_yadav",rel:"me"})})]}),(0,a.tZ)("button",{"aria-label":"Toggle Dark Mode",type:"button",className:"p-3 h-12 w-12 oabsolute left-2/4 transform -translate-x-2/4 md:relative md:left-0",onClick:function(){return n("dark"===t?"light":"dark")},children:(0,a.tZ)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",stroke:"currentColor",className:"h-6 w-6 text-gray-800 dark:text-gray-200",children:"dark"===t?(0,a.tZ)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"}):(0,a.tZ)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"})})})]})})},p=function(e){return(0,a.BX)(a.HY,{children:[(0,a.BX)(i.default,{children:[(0,a.tZ)("title",{children:"TIL - varunyadav.com"}),(0,a.tZ)("link",{rel:"icon",href:"/favicon.ico"}),(0,a.tZ)("link",{rel:"webmention",href:"https://webmention.io/til.varunyadav.com/webmention"}),(0,a.tZ)("link",{rel:"pingback",href:"https://webmention.io/til.varunyadav.com/xmlrpc"})]}),(0,a.tZ)(m,{}),(0,a.tZ)("main",{className:"justify-center bg-white dark:bg-darkgrey",children:e.children})]})};function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=function(e){var t=e.Component,n=e.pageProps;return(0,a.tZ)(u,{attribute:"class",children:(0,a.tZ)(p,{children:(0,a.tZ)(t,v({},n))})})}},1780:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n(5668)}])},7297:function(){},9008:function(e,t,n){e.exports=n(7947)},1664:function(e,t,n){e.exports=n(6071)},7146:function(e,t,n){"use strict";n.d(t,{HY:function(){return r.HY},tZ:function(){return a},BX:function(){return a}});var r=n(6400);function a(e,t,n,a,o){var i={};for(var c in t)"ref"!=c&&(i[c]=t[c]);var u,s,l={type:e,props:i,key:n,ref:t&&t.ref,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:++r.YM.__v,__source:a,__self:o};if("function"==typeof e&&(u=e.defaultProps))for(s in u)void 0===i[s]&&(i[s]=u[s]);return r.YM.vnode&&r.YM.vnode(l),l}},4453:function(){}},function(e){var t=function(t){return e(e.s=t)};e.O(0,[351,433],(function(){return t(1780),t(2441)}));var n=e.O();_N_E=n}]);