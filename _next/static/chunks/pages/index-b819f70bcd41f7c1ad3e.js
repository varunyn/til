(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405,179],{6071:function(e,t,r){"use strict";var n=r(3038),o=r(862);t.default=void 0;var a=o(r(9748)),c=r(1689),i=r(2441),u=r(5749),l={};function s(e,t,r,n){if(e&&(0,c.isLocalURL)(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;l[t+"%"+r+(o?"%"+o:"")]=!0}}var f=function(e){var t=!1!==e.prefetch,r=(0,i.useRouter)(),o=r&&r.pathname||"/",f=a.default.useMemo((function(){var t=(0,c.resolveHref)(o,e.href,!0),r=n(t,2),a=r[0],i=r[1];return{href:a,as:e.as?(0,c.resolveHref)(o,e.as):i||a}}),[o,e.href,e.as]),d=f.href,p=f.as,v=e.children,h=e.replace,b=e.shallow,y=e.scroll,g=e.locale;"string"===typeof v&&(v=a.default.createElement("a",null,v));var m=a.Children.only(v),w=m&&"object"===typeof m&&m.ref,O=(0,u.useIntersection)({rootMargin:"200px"}),k=n(O,2),_=k[0],E=k[1],M=a.default.useCallback((function(e){_(e),w&&("function"===typeof w?w(e):"object"===typeof w&&(w.current=e))}),[w,_]);(0,a.useEffect)((function(){var e=E&&t&&(0,c.isLocalURL)(d),n="undefined"!==typeof g?g:r&&r.locale,o=l[d+"%"+p+(n?"%"+n:"")];e&&!o&&s(r,d,p,{locale:n})}),[p,d,E,g,t,r]);var j={ref:M,onClick:function(e){m.props&&"function"===typeof m.props.onClick&&m.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,i,u){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&(0,c.isLocalURL)(r))&&(e.preventDefault(),null==i&&(i=n.indexOf("#")<0),t[o?"replace":"push"](r,n,{shallow:a,locale:u,scroll:i}))}(e,r,d,p,h,b,y,g)},onMouseEnter:function(e){(0,c.isLocalURL)(d)&&(m.props&&"function"===typeof m.props.onMouseEnter&&m.props.onMouseEnter(e),s(r,d,p,{priority:!0}))}};if(e.passHref||"a"===m.type&&!("href"in m.props)){var L="undefined"!==typeof g?g:r&&r.locale,N=r&&r.isLocaleDomain&&(0,c.getDomainLocale)(p,L,r&&r.locales,r&&r.domainLocales);j.href=N||(0,c.addBasePath)((0,c.addLocale)(p,L,r&&r.defaultLocale))}return a.default.cloneElement(m,j)};t.default=f},5749:function(e,t,r){"use strict";var n=r(3038);t.__esModule=!0,t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!c,u=(0,o.useRef)(),l=(0,o.useState)(!1),s=n(l,2),f=s[0],d=s[1],p=(0,o.useCallback)((function(e){u.current&&(u.current(),u.current=void 0),r||f||e&&e.tagName&&(u.current=function(e,t,r){var n=function(e){var t=e.rootMargin||"",r=i.get(t);if(r)return r;var n=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return i.set(t,r={id:t,observer:o,elements:n}),r}(r),o=n.id,a=n.observer,c=n.elements;return c.set(e,t),a.observe(e),function(){c.delete(e),a.unobserve(e),0===c.size&&(a.disconnect(),i.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[r,t,f]);return(0,o.useEffect)((function(){if(!c&&!f){var e=(0,a.requestIdleCallback)((function(){return d(!0)}));return function(){return(0,a.cancelIdleCallback)(e)}}}),[f]),[p,f]};var o=r(9748),a=r(8391),c="undefined"!==typeof IntersectionObserver;var i=new Map},3401:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return s},default:function(){return f}});var n=r(6156),o=r(7146),a=(r(9748),r(4790)),c=r(3855),i=r(1664),u=function(e){var t=e.slug,r=e.title,n=e.date,u=e.desc;return(0,o.tZ)("div",{className:"border w-5/6 mobile:w-auto border-black-100 mx-auto justify-center shadow hover:shadow-md rounded-md p-4 dark:bg-lightgrey dark:text-whitedarktheme",children:(0,o.tZ)(i.default,{href:"/blog/".concat(t),children:(0,o.BX)("a",{children:[(0,o.tZ)("h4",{className:"text-lg font-bold",children:r}),(0,o.tZ)("div",{className:"text-gray-600 text-xs",children:(0,a.Z)((0,c.Z)(n),"MMMM dd, yyyy")}),(0,o.tZ)("div",{children:u})]})})})};function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}var s=!0;function f(e){var t=e.posts;return(0,o.tZ)("div",{children:(0,o.tZ)("section",{className:"relative min-h-screen-without-nav dark:bg-darkgrey dark:text-whitedarktheme",children:(0,o.tZ)("div",{className:"space-y-4 p-20 mobile:p-5",children:t.map((function(e){return(0,o.tZ)(u,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({},e),e.slug)}))})})})}},8581:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(3401)}])},1664:function(e,t,r){e.exports=r(6071)},4453:function(){}},function(e){e.O(0,[351,433,400],(function(){return t=8581,e(e.s=t);var t}));var t=e.O();_N_E=t}]);