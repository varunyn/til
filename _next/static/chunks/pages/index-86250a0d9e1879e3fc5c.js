(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405,179],{6071:function(e,t,r){"use strict";var n=r(3038),o=r(862);t.default=void 0;var a=o(r(9748)),c=r(1689),i=r(2441),l=r(5749),u={};function s(e,t,r,n){if(e&&(0,c.isLocalURL)(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;u[t+"%"+r+(o?"%"+o:"")]=!0}}var f=function(e){var t=!1!==e.prefetch,r=(0,i.useRouter)(),o=r&&r.pathname||"/",f=a.default.useMemo((function(){var t=(0,c.resolveHref)(o,e.href,!0),r=n(t,2),a=r[0],i=r[1];return{href:a,as:e.as?(0,c.resolveHref)(o,e.as):i||a}}),[o,e.href,e.as]),d=f.href,p=f.as,h=e.children,v=e.replace,b=e.shallow,g=e.scroll,y=e.locale;"string"===typeof h&&(h=a.default.createElement("a",null,h));var m=a.Children.only(h),w=m&&"object"===typeof m&&m.ref,k=(0,l.useIntersection)({rootMargin:"200px"}),x=n(k,2),O=x[0],N=x[1],_=a.default.useCallback((function(e){O(e),w&&("function"===typeof w?w(e):"object"===typeof w&&(w.current=e))}),[w,O]);(0,a.useEffect)((function(){var e=N&&t&&(0,c.isLocalURL)(d),n="undefined"!==typeof y?y:r&&r.locale,o=u[d+"%"+p+(n?"%"+n:"")];e&&!o&&s(r,d,p,{locale:n})}),[p,d,N,y,t,r]);var E={ref:_,onClick:function(e){m.props&&"function"===typeof m.props.onClick&&m.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,i,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(r))&&(e.preventDefault(),null==i&&(i=n.indexOf("#")<0),t[o?"replace":"push"](r,n,{shallow:a,locale:l,scroll:i}))}(e,r,d,p,v,b,g,y)},onMouseEnter:function(e){(0,c.isLocalURL)(d)&&(m.props&&"function"===typeof m.props.onMouseEnter&&m.props.onMouseEnter(e),s(r,d,p,{priority:!0}))}};if(e.passHref||"a"===m.type&&!("href"in m.props)){var L="undefined"!==typeof y?y:r&&r.locale,j=r&&r.isLocaleDomain&&(0,c.getDomainLocale)(p,L,r&&r.locales,r&&r.domainLocales);E.href=j||(0,c.addBasePath)((0,c.addLocale)(p,L,r&&r.defaultLocale))}return a.default.cloneElement(m,E)};t.default=f},5749:function(e,t,r){"use strict";var n=r(3038);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!c,l=(0,o.useRef)(),u=(0,o.useState)(!1),s=n(u,2),f=s[0],d=s[1],p=(0,o.useCallback)((function(e){l.current&&(l.current(),l.current=void 0),r||f||e&&e.tagName&&(l.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=i.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return i.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,a=n.observer,c=n.elements;return c.set(e,t),a.observe(e),function(){c.delete(e),a.unobserve(e),0===c.size&&(a.disconnect(),i.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[r,t,f]);return(0,o.useEffect)((function(){if(!c&&!f){var e=(0,a.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,a.cancelIdleCallback)(e)}}}),[f]),[p,f]};var o=r(9748),a=r(8391),c="undefined"!==typeof IntersectionObserver;var i=new Map},3401:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return f},default:function(){return d}});var n=r(6156),o=r(7146),a=r(9748),c=r(4790),i=r(3855),l=r(1664),u=function(e){var t=e.slug,r=e.title,n=e.date,a=e.desc;return(0,o.tZ)("div",{className:"border mobile:w-auto border-black-100 mx-auto justify-center shadow hover:shadow-md rounded-md p-4 dark:bg-lightgrey dark:text-whitedarktheme",children:(0,o.tZ)(l.default,{href:"/blog/".concat(t),children:(0,o.BX)("a",{children:[(0,o.tZ)("h4",{className:"text-lg font-bold",children:r}),(0,o.tZ)("div",{className:"text-gray-600 text-xs",children:(0,c.Z)((0,i.Z)(n),"MMMM dd, yyyy")}),(0,o.tZ)("div",{children:a})]})})})};function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var f=!0;function d(e){var t=e.posts,r=(0,a.useState)(""),c=r[0],i=r[1],l=t.filter((function(e){return e.title.toLowerCase().includes(c.toLowerCase())}));return(0,o.BX)("div",{className:"flex flex-col justify-center max-w-2xl mx-auto h-full",children:[(0,o.BX)("div",{className:"relative mt-5",children:[(0,o.tZ)("input",{"aria-label":"Search articles",type:"text",onChange:function(e){return i(e.target.value)},placeholder:"Search articles",className:"px-4 py-2 border border-gray-300 dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"}),(0,o.tZ)("svg",{className:"absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,o.tZ)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})]}),(0,o.BX)("section",{className:"relative mt-5 min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme",children:[!l.length&&(0,o.tZ)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"No posts found."}),(0,o.tZ)("div",{className:"space-y-4 mobile:p-5",children:l.map((function(e){return(0,o.tZ)(u,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e),e.title)}))})]})]})}},8581:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(3401)}])},1664:function(e,t,r){e.exports=r(6071)},4453:function(){}},function(e){e.O(0,[351,433,400],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);