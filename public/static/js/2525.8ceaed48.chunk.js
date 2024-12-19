"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[2525],{54737:function(e,i,t){t.d(i,{Z:function(){return x}});var n=t(1413),a=t(45987),s=t(68870),r=t(20890),o=t(50533),l=t(43504),d=t(93517),u=t(80184),c=["links","activeLast"];function v(e){var i=e.links,t=e.activeLast,o=void 0!==t&&t,l=(0,a.Z)(e,c),v=i[i.length-1].name,m=i.map((function(e){return(0,u.jsx)(h,{link:e},e.name)})),x=i.map((function(e){return(0,u.jsx)("div",{children:e.name!==v?(0,u.jsx)(h,{link:e}):(0,u.jsx)(r.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:v})},e.name)}));return(0,u.jsx)(d.Z,(0,n.Z)((0,n.Z)({separator:(0,u.jsx)(s.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},l),{},{children:o?m:x}))}function h(e){var i=e.link,t=i.href,n=i.name,a=i.icon;return(0,u.jsxs)(o.Z,{variant:"body2",component:l.rU,to:t||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[a&&(0,u.jsx)(s.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:a}),n]},n)}var m=["links","action","heading","moreLink","sx"];function x(e){var i=e.links,t=e.action,l=e.heading,d=e.moreLink,c=void 0===d?[]:d,h=e.sx,x=(0,a.Z)(e,m);return(0,u.jsxs)(s.Z,{sx:(0,n.Z)({mb:5},h),children:[(0,u.jsxs)(s.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,u.jsxs)(s.Z,{sx:{flexGrow:1},children:[(0,u.jsx)(r.Z,{variant:"h4",gutterBottom:!0,children:l}),(0,u.jsx)(v,(0,n.Z)({links:i},x))]}),t&&(0,u.jsx)(s.Z,{sx:{flexShrink:0},children:t})]}),(0,u.jsx)(s.Z,{sx:{mt:2},children:"string"===typeof c?(0,u.jsx)(o.Z,{href:c,target:"_blank",rel:"noopener",variant:"body2",children:c}):c.map((function(e){return(0,u.jsx)(o.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},32525:function(e,i,t){t.r(i),t.d(i,{default:function(){return V}});var n=t(15861),a=t(93433),s=t(64687),r=t.n(s),o=t(77942),l=t(16871),d=t(13967),u=t(91614),c=t(61889),v=t(57621),h=t(68870),m=t(20890),x=t(53767),p=t(86951),f=t(72791),b=t(61134),j=t(61265),Z=t(86446),g=t(59860),k=t(32939),w=t(53451),y=t(54737),S=t(7055),_=t(9440),C=t(14786),q=t(80184),T=[{id:"active",label:"Active",name:"active"},{id:"inactive",label:"Inactive",name:"inactive"}],I=o.Ry().shape({subject:o.Z_().required("Subject name is required").matches(/^[^\s].*$/,"First characters space not allowed."),description:o.Z_().required("Description is required").matches(/^[^\s].*$/,"First characters space not allowed."),status:o.Z_(),videos:o.IX().of(o.Ry().shape({url:o.Z_().required("Video URL is required"),thumbnail:o.Z_().required("Thumbnail is required"),status:o.Z_().required("Video status is required"),name:o.Z_().required("Video name is required").matches(/^[^\s].*$/,"First Characters space not allowed.")})).min(1,"At least one video must be added")});function V(){var e=(0,l.UO)().id,i=(0,l.s0)(),t=(0,_.I0)(),s=(0,d.Z)(),o=(0,p.Ds)().enqueueSnackbar,V=(0,_.v9)((function(e){return e.tutorials})).tutorialDetails;(0,f.useEffect)((function(){e&&R()}),[]);var R=function(){t((0,C.ZN)(e))};(0,f.useEffect)((function(){V&&e&&A()}),[null===V||void 0===V?void 0:V.id]);var A=function(){B("subject",null===V||void 0===V?void 0:V.subject),B("status",null===V||void 0===V?void 0:V.status),B("description",null===V||void 0===V?void 0:V.description),B("videos",null===V||void 0===V?void 0:V.videos)},L=(0,b.cI)({resolver:(0,j.X)(I),defaultValues:{subject:"",description:"",status:"",videos:[{url:"",thumbnail:"",status:"",name:""}]}}),E=(L.reset,L.watch),B=L.setValue,G=L.clearErrors,D=L.handleSubmit,N=L.formState.isSubmitting,U=E("videos"),W=function(e,i,t){var n=(0,a.Z)(U);"status"===i?(n[e][i]=E("videos.".concat(e,".status")),G("videos.".concat(e,".").concat(i))):(n[e][i]=t,G("videos.".concat(e,".").concat(i))),B("videos",n)},F=function(){var a=(0,n.Z)(r().mark((function n(a){var s,l;return r().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:s={subject:null===V||void 0===V?void 0:V.subject,description:null===V||void 0===V?void 0:V.description,status:null===V||void 0===V?void 0:V.status},l={subject:null===a||void 0===a?void 0:a.subject,description:null===a||void 0===a?void 0:a.description,status:null===a||void 0===a?void 0:a.status,videos:U},Object.keys(l).forEach((function(e){var i=e;l[i]===s[i]&&delete l[i]})),e?t((0,C.Z4)(l,e)).then((function(e){var n,a;200===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)&&(o(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message,{variant:"success"}),t((0,C.NS)()),i(S.vB.masterdata.tutorial))})):t((0,C.Z4)(l)).then((function(e){var n,a,s;201===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)?(o(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message,{variant:"success"}),t((0,C.NS)()),i(S.vB.masterdata.tutorial)):(o(null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.message,{variant:"success"}),t((0,C.NS)()),i(S.vB.masterdata.tutorial))}));case 4:case"end":return n.stop()}}),n)})));return function(e){return a.apply(this,arguments)}}(),O=function(){return U.some((function(e){return""===(null===e||void 0===e?void 0:e.status)||""===(null===e||void 0===e?void 0:e.thumbnail)||""===(null===e||void 0===e?void 0:e.url)||""===(null===e||void 0===e?void 0:e.name)}))};return(0,q.jsx)(w.Z,{title:"Add Training",children:(0,q.jsxs)(u.Z,{maxWidth:"xl",children:[(0,q.jsx)(y.Z,{heading:e?"Edit Training details":"Add Training",links:[{name:"Training List",href:S.vB.sevak.list},{name:e?"Edit Training":"Add Training"}]}),(0,q.jsx)(Z.RV,{methods:L,onSubmit:D(F),children:(0,q.jsx)(c.ZP,{container:!0,spacing:3,children:(0,q.jsx)(c.ZP,{item:!0,xs:12,children:(0,q.jsxs)(v.Z,{sx:{p:3,boxShadow:"0 12px 24px rgba(0,0,0,0.18)"},children:[(0,q.jsxs)(h.Z,{sx:{display:"grid",columnGap:2,rowGap:3,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(1, 1fr)"}},children:[(0,q.jsx)(Z.au,{name:"subject",label:"Subject name"}),(0,q.jsx)(Z.au,{name:"description",label:"Description name"})]}),(0,q.jsx)(h.Z,{children:(0,q.jsx)(g.Z,{onClick:function(){B("videos",[].concat((0,a.Z)(U),[{url:"",thumbnail:"",status:"",name:""}])),G("videos")},disabled:O(),sx:{py:1,width:"150px",display:"flex",bgcolor:O()?"#aaa":s.palette.primary.light,alignItems:"center",justifyContent:"center",borderRadius:"10px",cursor:"pointer",color:"white",mt:2,":hover":{bgcolor:O()?"#aaa":s.palette.primary.light,color:"white"},":disabled":{color:"white"}},children:"Add Videos"})}),(0,q.jsx)(h.Z,{sx:{p:1,borderRadius:"10px"},children:null===U||void 0===U?void 0:U.map((function(e,i){var t;return(0,q.jsxs)(h.Z,{sx:{boxShadow:"1px 2px 12px rgba(0,0,0,0.18)",p:2,borderRadius:"10px",mt:3},children:[(0,q.jsxs)(h.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,q.jsxs)(m.Z,{variant:"h5",py:2,children:["Training Video ",i+1]}),0!==i&&(0,q.jsx)(k.Z,{icon:"uiw:delete",sx:{color:"#d23838",cursor:"pointer"},onClick:function(){return function(e){if((null===U||void 0===U?void 0:U.length)>1){var i=null===U||void 0===U?void 0:U.filter((function(i,t){return t!==e}));B("videos",i)}else 1===(null===U||void 0===U?void 0:U.length)&&(B("videos.".concat(e,".url"),""),B("videos.".concat(e,".thumbnail"),""),B("videos.".concat(e,".status"),""))}(i)}})]}),(0,q.jsxs)(h.Z,{sx:{display:"grid",columnGap:2,rowGap:3,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(2, 1fr)"}},children:[(0,q.jsx)(Z.au,{name:"videos[".concat(i,"].name"),label:"Video title",value:e.name,onChange:function(e){return W(i,"name",e.target.value)}}),(0,q.jsx)(Z.au,{name:"videos[".concat(i,"].url"),label:"Video URL",value:e.url,onChange:function(e){return W(i,"url",e.target.value)}}),(0,q.jsx)(Z.au,{name:"videos[".concat(i,"].thumbnail"),label:"Thumbnail url",value:e.thumbnail,onChange:function(e){return W(i,"thumbnail",e.target.value)}}),(0,q.jsx)(Z.Wo,{name:"videos[".concat(i,"].status"),label:"Status",placeholder:"Select status",value:null===(t=U[i])||void 0===t?void 0:t.status,options:T,onClick:function(e){return W(i,"status",e.target.value)}})]})]},i)}))}),(0,q.jsx)(x.Z,{alignItems:"flex-end",sx:{mt:3},children:(0,q.jsx)(g.Z,{type:"submit",variant:"contained",loading:N,startIcon:(0,q.jsx)(k.Z,{icon:e?"fa-solid:user-edit":"mingcute:user-add-fill"}),children:e?"Save":"Add"})})]})})})})]})})}}}]);
//# sourceMappingURL=2525.8ceaed48.chunk.js.map