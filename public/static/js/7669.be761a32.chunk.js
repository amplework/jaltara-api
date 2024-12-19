"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[7669],{76534:function(e,n,i){var t=i(59860),l=i(13967),o=i(20792),a=i(91614),d=i(68870),r=i(20890),s=i(94721),c=i(53767),u=(i(72791),i(32939)),v=i(24422),h=i(80184),f={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:550,bgcolor:"background.paper",boxShadow:24,borderRadius:"10px"};n.Z=function(e){var n=e.openModal,i=e.handleClose,g=e.handleSubmit,x=e.children,p=e.title,m=void 0===p?"Add New Crop":p,Z=e.disabled,b=e.isLoading,j=(0,l.Z)();return(0,h.jsx)(o.Z,{"aria-labelledby":"modal-title","aria-describedby":"modal-description",open:n,onClose:i,disableEnforceFocus:!1,disableAutoFocus:!1,sx:{outline:0},children:(0,h.jsx)(a.Z,{sx:{maxWidth:{xl:"2600px",position:"relative",borderRadius:"20px",height:"100%"}},children:(0,h.jsxs)(d.Z,{sx:f,children:[(0,h.jsxs)(d.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"10px 10px 0 0",p:2,bgcolor:j.palette.primary.lighter,children:[(0,h.jsx)(r.Z,{variant:"h6",color:j.palette.grey[0],sx:{letterSpacing:"0.7px"},children:m}),(0,h.jsx)(t.Z,{onClick:i,sx:{minWidth:0,padding:.2,display:"flex",alignItems:"center",borderRadius:"50%",bgcolor:j.palette.common.white,":hover":{bgcolor:j.palette.common.white}},children:(0,h.jsx)(u.Z,{icon:"iconamoon:close-bold",width:24,height:24,color:j.palette.common.black})})]}),(0,h.jsx)(s.Z,{}),b?(0,h.jsx)(v.VJ,{}):(0,h.jsx)(d.Z,{mt:2,children:x}),(0,h.jsxs)(c.Z,{direction:"row",spacing:2,justifyContent:"flex-end",p:2,children:[(0,h.jsx)(t.Z,{variant:"outlined",onClick:i,fullWidth:!0,sx:{p:1},children:"Cancel"}),(0,h.jsx)(t.Z,{variant:"contained",disabled:Z,onClick:g,fullWidth:!0,sx:{p:1},children:"Delete"})]})]})})})}},32687:function(e,n,i){var t=i(59860),l=i(13967),o=i(20792),a=i(91614),d=i(68870),r=i(20890),s=i(94721),c=i(53767),u=i(72791),v=i(32939),h=i(86446),f=i(73019),g=i(9440),x=i(24422),p=i(80184),m={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:550,bgcolor:"background.paper",boxShadow:24,borderRadius:"10px"};n.Z=function(e){var n=e.openModal,i=e.handleClose,Z=e.children,b=e.methods,j=e.onSubmit,C=e.id,w=(e.cropDetails,e.handleCropDetails),S=e.title,y=void 0===S?"Add New Crop":S,k=e.disabled,L=e.isLoading,D=(0,l.Z)(),P=(0,g.I0)();(0,u.useEffect)((function(){C&&(P((0,f.Av)()),w())}),[C]);var I=b.handleSubmit;b.formState.isSubmitting;return(0,p.jsx)(o.Z,{"aria-labelledby":"modal-title","aria-describedby":"modal-description",open:n,onClose:i,disableEnforceFocus:!1,disableAutoFocus:!1,sx:{outline:0},children:(0,p.jsx)(a.Z,{sx:{maxWidth:{xl:"2600px",position:"relative",borderRadius:"20px",height:"100%"}},children:(0,p.jsx)(d.Z,{sx:m,children:(0,p.jsxs)(h.RV,{methods:b,onSubmit:I(j),children:[(0,p.jsxs)(d.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"10px 10px 0 0",p:2,bgcolor:D.palette.primary.lighter,children:[(0,p.jsx)(r.Z,{variant:"h6",color:D.palette.grey[0],sx:{letterSpacing:"0.7px"},children:y}),(0,p.jsx)(t.Z,{onClick:i,sx:{minWidth:0,padding:.2,display:"flex",alignItems:"center",borderRadius:"50%",bgcolor:D.palette.common.white,":hover":{bgcolor:D.palette.common.white}},children:(0,p.jsx)(v.Z,{icon:"iconamoon:close-bold",width:24,height:24,color:D.palette.common.black})})]}),(0,p.jsx)(s.Z,{}),L?(0,p.jsx)(x.VJ,{}):(0,p.jsx)(d.Z,{mt:2,children:Z}),(0,p.jsx)(s.Z,{}),(0,p.jsxs)(c.Z,{direction:"row",spacing:2,justifyContent:"flex-end",p:2,children:[(0,p.jsx)(t.Z,{variant:"outlined",onClick:i,children:"Cancel"}),(0,p.jsx)(t.Z,{type:"submit",variant:"contained",disabled:k,startIcon:(0,p.jsx)(v.Z,{icon:C?"fa-solid:user-edit":"mingcute:user-add-fill"}),children:C?"Save":"Add"})]})]})})})})}},77762:function(e,n,i){i.d(n,{ZP:function(){return o}});var t=i(29439),l=i(72791);function o(e){var n=(0,l.useState)((null===e||void 0===e?void 0:e.defaultDense)||!1),i=(0,t.Z)(n,2),o=i[0],a=i[1],d=(0,l.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),r=(0,t.Z)(d,2),s=r[0],c=r[1],u=(0,l.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),v=(0,t.Z)(u,2),h=v[0],f=v[1],g=(0,l.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),x=(0,t.Z)(g,2),p=x[0],m=x[1],Z=(0,l.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),b=(0,t.Z)(Z,2),j=b[0],C=b[1],w=(0,l.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]),S=(0,t.Z)(w,2),y=S[0],k=S[1];return{dense:o,order:h,page:p,setPage:m,orderBy:s,rowsPerPage:j,selected:y,setSelected:k,onSelectRow:function(e){var n=y.indexOf(e),i=[];-1===n?i=i.concat(y,e):0===n?i=i.concat(y.slice(1)):n===y.length-1?i=i.concat(y.slice(0,-1)):n>0&&(i=i.concat(y.slice(0,n),y.slice(n+1))),k(i)},onSelectAllRows:function(e,n){k(e?n:[])},onSort:function(e){""!==e&&(f(s===e&&"asc"===h?"desc":"asc"),c(e))},onChangePage:function(e,n){m(n)},onChangeDense:function(e){a(e.target.checked)},onChangeRowsPerPage:function(e){C(parseInt(e.target.value,10)),m(0)}}}},23744:function(e,n,i){i.d(n,{Z:function(){return o}});var t=i(29439),l=i(72791);function o(e){var n=(0,l.useState)(e||""),i=(0,t.Z)(n,2),o=i[0],a=i[1];return{currentTab:o,onChangeTab:function(e,n){a(n)},setCurrentTab:a}}},7669:function(e,n,i){i.r(n),i.d(n,{StateLocationList:function(){return $},default:function(){return J}});var t=i(15861),l=i(1413),o=i(29439),a=i(64687),d=i.n(a),r=i(77942),s=i(72791),c=i(91614),u=i(36151),v=i(57621),h=i(39281),f=i(79836),g=i(53382),x=i(68870),p=i(26812),m=i(9440),Z=i(77762),b=i(23744),j=i(53451),C=i(54737),w=i(7055),S=i(97145),y=i(50765),k=i(94474),L=i(32687),D=i(61134),P=i(61265),I=i(17449),R=i(86951),V=i(32939),N=i(76534),M=i(90163),E=i(13967),W=i(35855),A=i(53994),T=i(20890),_=i(23786),F=i(80184);function G(e){var n=e.row,i=(e.handleShowDetails,e.onhandleDeleteRow),t=e.onhandleEditDetails,l=((0,E.Z)(),(0,s.useState)(null)),a=(0,o.Z)(l,2),d=a[0],r=a[1],c=function(){r(null)},u=n||{},v=u.id,h=u.name,f=u.code;return(0,F.jsxs)(W.Z,{hover:!0,sx:{textTransform:"capitalize"},children:[(0,F.jsx)(A.Z,{sx:{display:"flex",alignItems:"center"},children:(0,F.jsx)(T.Z,{variant:"subtitle2",noWrap:!0,children:h})}),(0,F.jsx)(A.Z,{children:(0,F.jsx)(T.Z,{variant:"subtitle2",noWrap:!0,children:f||"--"})}),(0,F.jsx)(A.Z,{children:(0,F.jsx)(T.Z,{variant:"subtitle2",noWrap:!0,children:"--"})}),(0,F.jsx)(A.Z,{align:"left",children:(0,F.jsx)(y.V7,{open:d,onOpen:function(e){r(e.currentTarget)},onClose:c,actions:(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(_.Z,{onClick:function(){t&&t(v),c()},children:[(0,F.jsx)(V.Z,{icon:"eva:edit-fill"}),"Edit"]}),(0,F.jsxs)(_.Z,{onClick:function(){i&&i(v,h),c()},sx:{color:"error.main"},children:[(0,F.jsx)(V.Z,{icon:"eva:trash-2-outline"}),"Delete"]})]})})})]})}var B=i(52791),q=i(86446),O=[{id:"state",label:"State",name:"State",value:"state"},{id:"district",label:"District",name:"District",value:"district"},{id:"taluk",label:"Taluk",name:"Taluk",value:"taluk"},{id:"village",label:"Village",name:"Village",value:"village"}],U=function(e){var n=e.handleLocationChange,i=e.methods,t=(e.state,e.selectLocation),l=i.watch;return(0,F.jsxs)(B.Z,{sx:{display:"grid",columnGap:2,rowGap:2,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(1, 1fr)"},p:2},children:[(0,F.jsx)(q.Wo,{name:"location",label:"Select location",placeholder:"location",value:l("location"),options:null!==t&&void 0!==t&&t.length?t:O,onChange:n,disabled:!0}),(0,F.jsx)(q.au,{name:"name",label:"Name",placeholder:"Name"})]})},z=[{id:"state",label:"State Name",align:"left"},{id:"code",label:"Code",align:"left"},{id:"nofarmer",label:"Farmer Count",align:"left"},{id:"action",label:"Action",align:"left"}],$=[{id:"state",label:"State",name:"State",value:"state"}];function J(){var e=(0,Z.ZP)(),n=e.page,i=e.order,a=e.orderBy,E=e.rowsPerPage,W=e.selected,A=e.onChangePage,T=e.onChangeRowsPerPage,_=(e.setPage,(0,R.Ds)().enqueueSnackbar),B=(0,m.I0)(),q=(0,s.useState)({id:"",selectStages:"",openModal:!1,villageId:null,parentId:"",stateId:"",districtId:"",talukId:"",isLoading:!1,openDeleteModal:!1,VillageName:"",filterName:"",filterVillage:""}),O=(0,o.Z)(q,2),J=O[0],H=O[1],K=(0,b.Z)("all").currentTab;(0,s.useEffect)((function(){X()}),[]);var X=function(){(0,k.Cy)("","","state")},Q=(0,m.v9)((function(e){return e.locations})),Y=Q.locationData,ee=Q.villageList,ne=Q.isLoading;(0,s.useEffect)((function(){var e,n;(B((0,I.Vc)(null)),null!==Y&&void 0!==Y&&Y.id&&null!==J&&void 0!==J&&J.id)&&(H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!0,parentId:null===Y||void 0===Y?void 0:Y.id})})),ae("location",null===Y||void 0===Y||null===(e=Y.checkUpperGeo)||void 0===e?void 0:e.entityType),ae("name",null===Y||void 0===Y||null===(n=Y.checkUpperGeo)||void 0===n?void 0:n.name),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1,parentId:null===Y||void 0===Y?void 0:Y.id})})))}),[null===Y||void 0===Y?void 0:Y.id,null===J||void 0===J?void 0:J.id]);var ie=(0,s.useMemo)((function(){return{location:"",name:""}}),[]),te=r.Ry().shape({location:r.Z_().required("Location is required"),name:r.Z_().required("Name is required").matches(/^[^\s].*$/,"First Characters space not allowed.").max(50,"Limit of 50 characters")}),le=(0,D.cI)({resolver:(0,P.X)(te),defaultValues:ie}),oe=le.clearErrors,ae=le.setValue,de=le.watch,re=["location","name","selectDistrict","selectStates","selectTaluk"],se=!(null!==ee&&void 0!==ee&&ee.length)&&!!J.filterName||!(null!==ee&&void 0!==ee&&ee.length)&&!!J.filterVillage||!(null!==ee&&void 0!==ee&&ee.length)&&!!J.filterName||!(null!==ee&&void 0!==ee&&ee.length)&&!!K,ce=function(){(0,I.yU)(),ae("name","")},ue=function(e){H((function(n){return(0,l.Z)((0,l.Z)({},n),{},{openModal:!0,id:e,isLoading:!0})}))},ve=function(){B((0,I.Vc)(null)),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openModal:!1,id:"",isLoading:!1})})),re.forEach((function(e){return oe(e)}))},he=function(){var e=(0,t.Z)(d().mark((function e(n){var i;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i={name:null===n||void 0===n?void 0:n.name,entityType:null===n||void 0===n?void 0:n.location},null!==J&&void 0!==J&&J.id?B((0,k.Bl)(i,null===J||void 0===J?void 0:J.id)).then((function(e){var n,i,t,o;if(200===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode))_(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.message,{variant:"success"}),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})})),X(),ve(),B((0,I.xm)(null)),B((0,k.c4)(null));else if(409===(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.statusCode)){var a;_(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message,{variant:"error"}),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}))}else if(422===(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.statusCode)){var d;_(null===e||void 0===e||null===(d=e.data)||void 0===d?void 0:d.message,{variant:"error"}),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}))}else{var r;_(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.message,{variant:"error"}),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})})),ve()}})):B((0,k.Vx)(i)).then((function(e){var n,i,t,l;if(201===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode))_(null===e||void 0===e||null===(l=e.data)||void 0===l?void 0:l.message,{variant:"success"}),X(),ve();else if(409===(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.statusCode)){var o;_(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.message,{variant:"error"})}else if(422===(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.statusCode)){var a;_(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message,{variant:"error"})}}));case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),fe=function(e,n){H((function(i){return(0,l.Z)((0,l.Z)({},i),{},{openDeleteModal:!0,id:e,VillageName:n})}))};return(0,F.jsxs)(j.Z,{title:"State",children:[(0,F.jsxs)(c.Z,{maxWidth:"xl",children:[(0,F.jsx)(C.Z,{heading:"State List",links:[{href:w.vB.location.root}],action:(0,F.jsx)(u.Z,{variant:"contained",startIcon:(0,F.jsx)(V.Z,{icon:"eva:plus-fill"}),onClick:function(){H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openModal:!0,id:""})})),ae("location","state"),ce()},children:"Add Geolocation"})}),(0,F.jsxs)(v.Z,{sx:{pt:2},children:[(0,F.jsx)(S.Z,{children:(0,F.jsx)(h.Z,{sx:{minWidth:800,position:"relative"},children:(0,F.jsxs)(f.Z,{size:"medium",sx:{},children:[(0,F.jsx)(y.K,{order:i,orderBy:a,headLabel:z,rowCount:null===ee||void 0===ee?void 0:ee.length,numSelected:W.length}),(0,F.jsx)(g.Z,{children:!ne||null!==ee&&void 0!==ee&&ee.length?null!==ee&&void 0!==ee&&ee.length?ee.slice(n*E,n*E+E).map((function(e){return(0,F.jsx)(G,{row:e,onhandleDeleteRow:fe,onhandleEditDetails:ue},e.id)})):(0,F.jsx)(y.et,{isNotFound:se}):(0,F.jsx)(y.hM,{})})]})})}),(0,F.jsx)(x.Z,{sx:{position:"relative"},children:(0,F.jsx)(p.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:null!==ee&&void 0!==ee&&ee.length?ee.length:0,rowsPerPage:E,page:n,onPageChange:A,onRowsPerPageChange:T})})]})]}),(0,F.jsx)(L.Z,{openModal:J.openModal,isLoading:null===J||void 0===J?void 0:J.isLoading,handleClose:ve,onSubmit:he,methods:le,id:null===J||void 0===J?void 0:J.id,handleCropDetails:function(){H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!0})})),(0,k.U_)(null===J||void 0===J?void 0:J.id)},title:J.id?"Edit State Location":"Add State Geo Location",disabled:function(){var e,n;return(null===Y||void 0===Y||null===(e=Y.checkUpperGeo)||void 0===e?void 0:e.name)===de("name")||null===(n=de("name"))||void 0===n||!n.length}(),children:(0,F.jsx)(U,{selectLocation:$,state:J,methods:le,handleLocationChange:ce,isLoading:J.isLoading})}),(0,F.jsx)(N.Z,{openModal:J.openDeleteModal,handleClose:function(){H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openDeleteModal:!1,id:"",VillageName:""})}))},title:"Delete Confirmation!",handleSubmit:function(){B((0,k.uw)(null===J||void 0===J?void 0:J.id)).then((function(e){var n,i;200===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)?(_(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.message,{variant:"success"}),(0,k.G$)(),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openDeleteModal:!1,id:"",VillageName:""})}))):((0,k.G$)(),H((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openDeleteModal:!1,id:"",VillageName:""})})))})).catch((function(){console.log("error")}))},children:(0,F.jsx)(M.I,{userName:null===J||void 0===J?void 0:J.VillageName})})]})}},90163:function(e,n,i){i.d(n,{I:function(){return d}});var t=i(68870),l=i(20890),o=i(32939),a=i(80184),d=function(e){var n=e.userName;return(0,a.jsxs)(t.Z,{sx:{p:2,minHeight:"180px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",textAlign:"center"},children:[(0,a.jsx)(t.Z,{sx:{width:80,height:80,borderRadius:"50%",backgroundColor:"#FDECF2",display:"flex",alignItems:"center",justifyContent:"center",mb:2},children:(0,a.jsx)(o.Z,{icon:"mingcute:delete-2-line",sx:{fontSize:32,color:"#E91E63"}})}),(0,a.jsxs)(l.Z,{variant:"h6",sx:{fontWeight:"bold",mb:2},children:["Are you sure you want to remove ",n,"?"]})]})}},52791:function(e,n,i){var t=(0,i(23814).Z)();n.Z=t}}]);
//# sourceMappingURL=7669.be761a32.chunk.js.map