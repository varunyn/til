(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[492],{3905:function(e,t,r){"use strict";r.r(t),r.d(t,{MDXContext:function(){return s},MDXProvider:function(){return f},mdx:function(){return h},useMDXComponents:function(){return d},withMDXComponents:function(){return u}});var n=r(9748);function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,c=function(e,t){if(null==e)return{};var r,n,c={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(c[r]=e[r]);return c}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(c[r]=e[r])}return c}var s=n.default.createContext({}),u=function(e){return function(t){var r=d(t.components);return n.default.createElement(e,a({},t,{components:r}))}},d=function(e){var t=n.default.useContext(s),r=t;return e&&(r="function"===typeof e?e(t):o(o({},t),e)),r},f=function(e){var t=d(e.components);return n.default.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.default.createElement(n.default.Fragment,{},t)}},p=n.default.forwardRef((function(e,t){var r=e.components,c=e.mdxType,a=e.originalType,l=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=d(r),f=c,p=u["".concat(l,".").concat(f)]||u[f]||m[f]||a;return r?n.default.createElement(p,o(o({ref:t},s),{},{components:r})):n.default.createElement(p,o({ref:t},s))}));function h(e,t){var r=arguments,c=t&&t.mdxType;if("string"===typeof e||c){var a=r.length,l=new Array(a);l[0]=p;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o.mdxType="string"===typeof e?e:c,l[1]=o;for(var s=2;s<a;s++)l[s]=r[s];return n.default.createElement.apply(null,l)}return n.default.createElement.apply(null,r)}p.displayName="MDXCreateElement"},8093:function(e,t,r){"use strict";var n=r(9748),c=r(3905);function a(e){return e&&"object"===typeof e&&"default"in e?e:{default:e}}function l(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var o=a(n),i=l(c);"undefined"!==typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(e){var t=Date.now();return setTimeout((function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})}),1)},window.cancelIdleCallback=window.cancelIdleCallback||function(e){clearTimeout(e)}),t.R=function({compiledSource:e,scope:t,components:r={},lazy:c}){const[a,l]=n.useState(!c||"undefined"===typeof window);n.useEffect((()=>{if(c){const e=window.requestIdleCallback((()=>{l(!0)}));return()=>window.cancelIdleCallback(e)}}),[]);const s=n.useMemo((()=>{const r=Object.assign({mdx:i.mdx,React:o.default},t),n=Object.keys(r),c=Object.values(r),a=Reflect.construct(Function,n.concat(`${e}; return MDXContent;`));return a.apply(a,c)}),[t,e]);if(!a)return o.default.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});const u=o.default.createElement(i.MDXProvider,{components:r},o.default.createElement(s,null));return c?o.default.createElement("div",null,u):u}},4302:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return h},default:function(){return y}});var n=r(7146),c=r(6156),a=r(9008),l=r(4790),o=r(3855),i=r(8093),s=r(9748);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,c.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e){var t=e.text,r=e.id,c=e.author,a=e.media,o=e.created_at,i=e.public_metrics,s=e.referenced_tweets,u="https://twitter.com/".concat(c.username),m="https://twitter.com/intent/like?tweet_id=".concat(r),p="https://twitter.com/intent/retweet?tweet_id=".concat(r),h="https://twitter.com/intent/tweet?in_reply_to=".concat(r),y="https://twitter.com/".concat(c.username,"/status/").concat(r),g=new Date(o),w=t.replace(/https:\/\/[\n\S]+/g,""),b=s&&s.find((function(e){return"quoted"===e.type}));return(0,n.BX)("div",{className:"tweet rounded border border-gray-300 dark:border-gray-800 px-6 py-4 my-4 w-full",children:[(0,n.BX)("div",{className:"flex items-center",children:[(0,n.tZ)("a",{className:"flex h-12 w-12",href:u,target:"_blank",rel:"noopener noreferrer",children:(0,n.tZ)("img",{alt:c.username,height:48,width:48,src:c.profile_image_url,className:"rounded-full"})}),(0,n.BX)("a",{href:u,target:"_blank",rel:"noopener noreferrer",className:"author flex flex-col ml-4 !no-underline",children:[(0,n.BX)("span",{className:"flex items-center font-bold !text-gray-900 dark:!text-gray-100 leading-5",title:c.name,children:[c.name,c.verified?(0,n.tZ)("svg",{"aria-label":"Verified Account",className:"ml-1 text-blue-500 dark:text-white inline h-4 w-4",viewBox:"0 0 24 24",children:(0,n.tZ)("g",{fill:"currentColor",children:(0,n.tZ)("path",{d:"M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"})})}):null]}),(0,n.BX)("span",{className:"!text-gray-500",title:"@".concat(c.username),children:["@",c.username]})]}),(0,n.tZ)("a",{className:"ml-auto",href:u,target:"_blank",rel:"noopener noreferrer",children:(0,n.tZ)("svg",{viewBox:"328 355 335 276",height:"24",width:"24",xmlns:"http://www.w3.org/2000/svg",children:(0,n.tZ)("path",{d:"M 630, 425    A 195, 195 0 0 1 331, 600    A 142, 142 0 0 0 428, 570    A  70,  70 0 0 1 370, 523    A  70,  70 0 0 0 401, 521    A  70,  70 0 0 1 344, 455    A  70,  70 0 0 0 372, 460    A  70,  70 0 0 1 354, 370    A 195, 195 0 0 0 495, 442    A  67,  67 0 0 1 611, 380    A 117, 117 0 0 0 654, 363    A  65,  65 0 0 1 623, 401    A 117, 117 0 0 0 662, 390    A  65,  65 0 0 1 630, 425    Z",style:{fill:"#3BA9EE"}})})})]}),(0,n.tZ)("div",{className:"mt-4 mb-1 leading-normal whitespace-pre-wrap text-lg !text-gray-700 dark:!text-gray-300",children:w}),a&&a.length?(0,n.tZ)("div",{className:1===a.length?"inline-grid grid-cols-1 gap-x-2 gap-y-2 my-2":"inline-grid grid-cols-2 gap-x-2 gap-y-2 my-2",children:a.map((function(e){return(0,n.tZ)("img",{alt:t,height:e.height,width:e.width,src:e.url,className:"rounded"},e.media_key)}))}):null,b?(0,n.tZ)(f,d({},b)):null,(0,n.tZ)("a",{className:"!text-gray-500 text-sm hover:!underline",href:y,target:"_blank",rel:"noopener noreferrer",children:(0,n.tZ)("time",{title:"Time Posted: ".concat(g.toUTCString()),dateTime:g.toISOString(),children:(0,l.Z)(g,"h:mm a - MMM d, y")})}),(0,n.BX)("div",{className:"flex !text-gray-700 dark:!text-gray-300 mt-2",children:[(0,n.BX)("a",{className:"flex items-center mr-4 !text-gray-500 hover:!text-blue-600 transition hover:!underline",href:h,target:"_blank",rel:"noopener noreferrer",children:[(0,n.tZ)("svg",{className:"mr-2",width:"24",height:"24",viewBox:"0 0 24 24",children:(0,n.tZ)("path",{className:"fill-current",d:"M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"})}),(0,n.tZ)("span",{children:new Number(i.reply_count).toLocaleString()})]}),(0,n.BX)("a",{className:"flex items-center mr-4 !text-gray-500 hover:!text-green-600 transition hover:!underline",href:p,target:"_blank",rel:"noopener noreferrer",children:[(0,n.tZ)("svg",{className:"mr-2",width:"24",height:"24",viewBox:"0 0 24 24",children:(0,n.tZ)("path",{className:"fill-current",d:"M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"})}),(0,n.tZ)("span",{children:new Number(i.retweet_count).toLocaleString()})]}),(0,n.BX)("a",{className:"flex items-center !text-gray-500 hover:!text-red-600 transition hover:!underline",href:m,target:"_blank",rel:"noopener noreferrer",children:[(0,n.tZ)("svg",{className:"mr-2",width:"24",height:"24",viewBox:"0 0 24 24",children:(0,n.tZ)("path",{className:"fill-current",d:"M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z"})}),(0,n.tZ)("span",{children:new Number(i.like_count).toLocaleString()})]})]})]})}function m(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?m(Object(r),!0).forEach((function(t){(0,c.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):m(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h=!0;function y(e){var t=e.title,r=e.date,c=e.content,u=e.readingTime,d=e.desc,m=e.slug,h=e.tags,y=e.tweets,g=(0,s.useState)([]),w=g[0],b=g[1];(0,s.useEffect)((function(){fetch("https://webmention.io/api/mentions.jf2?til.varunyadav.com&token=".concat("Rzhkot6KN8z_itqHnbi3LQ")).then((function(e){return e.json()})).then((function(e){b(e.children)}))}),[]);return(0,n.BX)("div",{className:" container dark:bg-darkgrey dark:text-whitedarktheme",children:[(0,n.BX)(a.default,{children:[(0,n.tZ)("title",{children:t}),(0,n.tZ)("meta",{name:"description",content:d}),(0,n.tZ)("meta",{property:"og:title",content:t}),(0,n.tZ)("meta",{property:"og:description",content:d}),(0,n.tZ)("meta",{property:"og:url",content:"https://til.varunyadav.com/blog/".concat(m)}),(0,n.tZ)("meta",{property:"og:type",content:"website"}),(0,n.tZ)("meta",{name:"twitter:card",content:"summary"}),(0,n.tZ)("meta",{name:"twitter:site",content:"@varun1_yadav"}),(0,n.tZ)("meta",{name:"twitter:title",content:t}),(0,n.tZ)("meta",{name:"twitter:description",content:d}),(0,n.tZ)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,n.BX)("article",{className:"flex flex-col justify-center items-start max-w-2xl mobile:p-3 mx-auto w-full",children:[(0,n.tZ)("h1",{className:"mt-6",children:t}),(0,n.BX)("div",{className:"flex w-full my-6 space-x-3 sm:flex-row justify-between",children:[(0,n.tZ)("div",{className:"inline-flex",children:h.map((function(e,t){return(0,n.tZ)("p",{className:"text-sm fill-current\tbg-yellow-200\t rounded border-2 border-yellow-200\t border-opacity-50 text-gray-700 dark:text-black ml-2",children:e},t)}))}),(0,n.tZ)("div",{className:"flex flex-col text-sm leading-snug",children:(0,n.BX)("span",{children:[(0,n.tZ)("span",{children:u.text}),(0,n.tZ)("span",{className:"mx-2",children:"\u2013"}),(0,n.tZ)("time",{children:(0,l.Z)((0,o.Z)(r),"MMMM dd, yyyy")})]})})]}),(0,n.tZ)("div",{className:"prose dark:prose-dark selection:bg-blue-200",children:(0,n.tZ)(i.R,p(p({},c),{},{components:{StaticTweet:function(e){var t=e.id,r=y.find((function(e){return e.id===t}));return(0,n.tZ)(f,p({},r))}}}))})]}),(0,n.BX)("div",{className:"flex flex-col mt-8 justify-center  items-center  max-w-2xl mx-auto w-full ",children:[(0,n.tZ)("h2",{children:"Webmentions"}),(0,n.tZ)("ol",{className:"border-dashed border-2 webmention-ol border-light-blue-300 w-full",children:w.map((function(e){if("like-of"!=e["wm-property"]&&e["wm-target"]===window.location.href)return(0,n.BX)("li",{className:"m-6 ",children:[e.author.name,"\xa0",(0,n.tZ)("a",{target:"_blank",className:"webmention-anchor",href:e.url,children:"repost-of"===e["wm-property"]?"reposted this ":"mentioned this"}),"\xa0on\xa0",(0,l.Z)((0,o.Z)(e["wm-received"]),"MMMM dd, yyyy"),(0,n.tZ)("p",{className:"flex-col mt-1 ml-5 text-justify",children:e.content.text}),(0,n.tZ)("hr",{className:"mt-2"})]})}))})]})]})}},4163:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog/[slug]",function(){return r(4302)}])}},function(e){e.O(0,[522,888,179],(function(){return t=4163,e(e.s=t);var t}));var t=e.O();_N_E=t}]);