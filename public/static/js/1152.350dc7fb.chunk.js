"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[1152],{71152:function(e,n,t){t.r(n),t.d(n,{default:function(){return X},statusList:function(){return K}});var i=t(15861),o=t(1413),a=t(29439),l=t(64687),r=t.n(l),s=t(77942),u=t(72791),d=t(16871),c=t(91614),v=t(36151),f=t(57621),h=t(39281),m=t(79836),p=t(53382),Z=t(68870),x=t(26812),g=t(7055),j=t(23744),C=t(77762),w=t(53451),b=t(32939),N=t(97145),D=t(54737),M=t(50765),S=t(35285),P=t(9440),k=t(73019),L=t(13967),_=t(35855),y=t(53994),A=t(20890),R=t(23786),W=t(763),Y=t.n(W),E=t(34132),T=t(80184);function I(e){var n=e.row,t=e.onDeleteRow,i=(e.handleShowDetails,e.onEditRow),o=((0,L.Z)(),(0,u.useState)(null)),l=(0,a.Z)(o,2),r=l[0],s=l[1],d=function(){s(null)},c=n||{},v=c.name,f=c.status,h=c.modified,m=c.id;return(0,T.jsxs)(_.Z,{hover:!0,children:[(0,T.jsx)(y.Z,{children:(0,T.jsx)(A.Z,{variant:"subtitle2",noWrap:!0,children:Y().capitalize(v)||"N/A"})}),(0,T.jsx)(y.Z,{children:(0,T.jsx)(A.Z,{variant:"subtitle2",noWrap:!0,children:Y().capitalize(f)||"N/A"})}),(0,T.jsx)(y.Z,{children:(0,T.jsx)(A.Z,{variant:"subtitle2",noWrap:!0,children:(0,E.w)(h)||"N/A"})}),(0,T.jsx)(y.Z,{align:"left",children:(0,T.jsx)(M.V7,{open:r,onOpen:function(e){s(e.currentTarget)},onClose:d,actions:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(R.Z,{onClick:function(){i&&i(m),d()},children:[(0,T.jsx)(b.Z,{icon:"eva:edit-fill"}),"Edit"]}),(0,T.jsxs)(R.Z,{onClick:function(){t&&t(m,v),d()},sx:{color:"error.main"},children:[(0,T.jsx)(b.Z,{icon:"eva:trash-2-outline"}),"Delete"]})]})})})]})}var q=t(32687),O=t(52791),V=t(86446),z=function(e){var n=e.statusList,t=e.methods.watch;return(0,T.jsxs)(O.Z,{sx:{display:"grid",columnGap:2,rowGap:3,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(1, 1fr)"},p:2},children:[(0,T.jsx)(V.au,{name:"name",label:"Crop Name"}),(0,T.jsx)(V.Wo,{name:"status",label:"Status",value:t("status"),placeholder:"Status",options:n})]})},B=t(61134),F=t(61265),G=t(86951),H=t(76534),$=t(90163),K=[{id:"active",label:"Active",name:"Active"},{id:"inactive",label:"Inactive",name:"Inactive"}],U=[{id:"crop",label:"Crops",align:"left"},{id:"status",label:"Status",align:"left"},{id:"lastdate",label:"Last Update Date",align:"left"},{id:"action",label:"Action",align:"left"}];function X(){var e=(0,C.ZP)(),n=e.page,t=e.order,l=e.orderBy,L=e.rowsPerPage,_=e.selected,y=(e.onSelectRow,e.onChangePage),A=e.onChangeRowsPerPage,R=e.setPage,W=(0,G.Ds)().enqueueSnackbar,Y=(0,P.I0)(),E=((0,d.s0)(),(0,u.useState)({openModal:!1,filterName:"",filterStatus:"",id:"",openDeleteModal:!1,cropsName:""})),O=(0,a.Z)(E,2),V=O[0],X=O[1],J=(0,j.Z)("all").currentTab;(0,u.useEffect)((function(){Q()}),[]);var Q=function(){(0,k.O$)()},ee=(0,P.v9)((function(e){return e.crops})),ne=ee.cropListData,te=ee.cropsDetails,ie=ee.isLoading,oe=(0,u.useMemo)((function(){return{name:"",status:""}}),[te]),ae=s.Ry().shape({name:s.Z_().required("Name is required").max(50,"Limit of 50 characters"),status:s.Z_().required("Status is required")}),le=(0,B.cI)({resolver:(0,F.X)(ae),defaultValues:oe}),re=le.watch,se=le.setValue;(0,u.useEffect)((function(){console.log("crops details ---\x3e",te),se("name",null===te||void 0===te?void 0:te.name),console.log("status ---\x3e",null===te||void 0===te?void 0:te.status),se("status",null===te||void 0===te?void 0:te.status)}),[te]);var ue=!(null!==ne&&void 0!==ne&&ne.length)&&!!V.filterName||!(null!==ne&&void 0!==ne&&ne.length)&&!!V.filterStatus||!(null!==ne&&void 0!==ne&&ne.length)&&!!V.filterName||!(null!==ne&&void 0!==ne&&ne.length)&&!!J,de=function(e,n){X((function(t){return(0,o.Z)((0,o.Z)({},t),{},{openDeleteModal:!0,id:e,cropsName:n})}))},ce=function(e){Y((0,k.W5)(null)),X((function(n){return(0,o.Z)((0,o.Z)({},n),{},{openModal:!0,id:e})}))},ve=function(){var e=(0,i.Z)(r().mark((function e(n){var t,i;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("submit");try{t={name:null===te||void 0===te?void 0:te.name,status:null===te||void 0===te?void 0:te.status},i={name:null===n||void 0===n?void 0:n.name,status:null===n||void 0===n?void 0:n.status},Object.keys(i).forEach((function(e){i[e]===t[e]&&delete i[e]})),null!==V&&void 0!==V&&V.id?Y((0,k.HT)(i,V.id)).then((function(e){var n,t;200===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)&&(W(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message,{variant:"success"}),Q(),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openModal:!1,id:""})})))})):Y((0,k.HT)(i)).then((function(e){var n,t,i;201===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)?(W(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message,{variant:"success"}),Q(),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openModal:!1,id:""})}))):(W(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.message,{variant:"success"}),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openModal:!1,id:""})})))}))}catch(a){console.error(a)}case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,T.jsxs)(w.Z,{title:"Crops List",children:[(0,T.jsxs)(c.Z,{maxWidth:"xl",children:[(0,T.jsx)(D.Z,{heading:"Crops List",links:[{href:g.vB.masterdata.create}],action:(0,T.jsx)(v.Z,{variant:"contained",startIcon:(0,T.jsx)(b.Z,{icon:"eva:plus-fill"}),onClick:function(){Y((0,k.W5)(null)),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openModal:!0,id:""})}))},children:"Add Crop"})}),(0,T.jsxs)(f.Z,{children:[(0,T.jsx)(S.N,{filterName:V.filterName,filterVillage:V.filterStatus,onFilterName:function(e){X((function(n){return(0,o.Z)((0,o.Z)({},n),{},{filterName:e})}))},onSearch:function(){R(0),(0,k.O$)(V.filterName,V.filterStatus)},placeholderText:"Search by crop name",placeholderTextSecond:"Search by status",challenges:!0,state:V,onChange:function(e){X((function(n){return(0,o.Z)((0,o.Z)({},n),{},{filterStatus:e})}))}}),(0,T.jsx)(N.Z,{children:(0,T.jsx)(h.Z,{sx:{minWidth:800,position:"relative"},children:(0,T.jsxs)(m.Z,{size:"medium",children:[(0,T.jsx)(M.K,{order:t,orderBy:l,headLabel:U,rowCount:null===ne||void 0===ne?void 0:ne.length,numSelected:_.length}),(0,T.jsxs)(p.Z,{children:[null!==ne&&void 0!==ne&&ne.length?ne.slice(n*L,n*L+L).map((function(e){return(0,T.jsx)(I,{row:e,onDeleteRow:de,onEditRow:ce},e.id)})):null,(0,T.jsx)(M.et,{isNotFound:ue})]})]})})}),(0,T.jsx)(Z.Z,{sx:{position:"relative"},children:(0,T.jsx)(x.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:null!==ne&&void 0!==ne&&ne.length?ne.length:0,rowsPerPage:L,page:n,onPageChange:y,onRowsPerPageChange:A})})]})]}),(0,T.jsx)(q.Z,{openModal:V.openModal,isLoading:ie,handleClose:function(){X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openModal:!1,id:""})}))},onSubmit:ve,methods:le,id:V.id,handleCropDetails:function(){Y((0,k.f3)(null===V||void 0===V?void 0:V.id))},title:V.id?"Edit Crop Details":"Add New Crop",cropDetails:te,disabled:(null===te||void 0===te?void 0:te.name)===re("name")&&(null===te||void 0===te?void 0:te.status)===re("status"),children:(0,T.jsx)(z,{statusList:K,methods:le})}),(0,T.jsx)(H.Z,{openModal:V.openDeleteModal,handleClose:function(){X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openDeleteModal:!1,id:"",cropsName:""})}))},title:"Delete Confirmation!",handleSubmit:function(){Y((0,k.eG)(null===V||void 0===V?void 0:V.id)).then((function(e){var n,t;200===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)?(W(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message,{variant:"success"}),Q(),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openDeleteModal:!1,id:"",cropsName:""})}))):(Q(),X((function(e){return(0,o.Z)((0,o.Z)({},e),{},{openDeleteModal:!1,id:"",cropsName:""})})))})).catch((function(e){console.log("error")}))},children:(0,T.jsx)($.I,{userName:null===V||void 0===V?void 0:V.cropsName})})]})}},34132:function(e,n,t){t.d(n,{w:function(){return a},r:function(){return l}});var i=t(72426),o=t.n(i);function a(e){return o()(e).format("MM/DD/YYYY")}function l(e){return o()(e).format("MM/DD/YYYY hh:mm a")}}}]);
//# sourceMappingURL=1152.350dc7fb.chunk.js.map