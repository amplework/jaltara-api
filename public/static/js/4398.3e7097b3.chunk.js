"use strict";(self.webpackChunk_minimal_material_kit_react=self.webpackChunk_minimal_material_kit_react||[]).push([[4398],{76534:function(e,i,n){var t=n(59860),l=n(13967),o=n(20792),a=n(91614),d=n(68870),r=n(20890),s=n(94721),u=n(53767),c=(n(72791),n(32939)),v=n(24422),h=n(80184),f={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:550,bgcolor:"background.paper",boxShadow:24,borderRadius:"10px"};i.Z=function(e){var i=e.openModal,n=e.handleClose,p=e.handleSubmit,g=e.children,m=e.title,x=void 0===m?"Add New Crop":m,Z=e.disabled,b=e.isLoading,j=(0,l.Z)();return(0,h.jsx)(o.Z,{"aria-labelledby":"modal-title","aria-describedby":"modal-description",open:i,onClose:n,disableEnforceFocus:!1,disableAutoFocus:!1,sx:{outline:0},children:(0,h.jsx)(a.Z,{sx:{maxWidth:{xl:"2600px",position:"relative",borderRadius:"20px",height:"100%"}},children:(0,h.jsxs)(d.Z,{sx:f,children:[(0,h.jsxs)(d.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"10px 10px 0 0",p:2,bgcolor:j.palette.primary.lighter,children:[(0,h.jsx)(r.Z,{variant:"h6",color:j.palette.grey[0],sx:{letterSpacing:"0.7px"},children:x}),(0,h.jsx)(t.Z,{onClick:n,sx:{minWidth:0,padding:.2,display:"flex",alignItems:"center",borderRadius:"50%",bgcolor:j.palette.common.white,":hover":{bgcolor:j.palette.common.white}},children:(0,h.jsx)(c.Z,{icon:"iconamoon:close-bold",width:24,height:24,color:j.palette.common.black})})]}),(0,h.jsx)(s.Z,{}),b?(0,h.jsx)(v.VJ,{}):(0,h.jsx)(d.Z,{mt:2,children:g}),(0,h.jsxs)(u.Z,{direction:"row",spacing:2,justifyContent:"flex-end",p:2,children:[(0,h.jsx)(t.Z,{variant:"outlined",onClick:n,fullWidth:!0,sx:{p:1},children:"Cancel"}),(0,h.jsx)(t.Z,{variant:"contained",disabled:Z,onClick:p,fullWidth:!0,sx:{p:1},children:"Delete"})]})]})})})}},32687:function(e,i,n){var t=n(59860),l=n(13967),o=n(20792),a=n(91614),d=n(68870),r=n(20890),s=n(94721),u=n(53767),c=n(72791),v=n(32939),h=n(86446),f=n(73019),p=n(9440),g=n(24422),m=n(80184),x={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:550,bgcolor:"background.paper",boxShadow:24,borderRadius:"10px"};i.Z=function(e){var i=e.openModal,n=e.handleClose,Z=e.children,b=e.methods,j=e.onSubmit,k=e.id,C=(e.cropDetails,e.handleCropDetails),S=e.title,w=void 0===S?"Add New Crop":S,y=e.disabled,D=e.isLoading,L=(0,l.Z)(),I=(0,p.I0)();(0,c.useEffect)((function(){k&&(I((0,f.Av)()),C())}),[k]);var T=b.handleSubmit;b.formState.isSubmitting;return(0,m.jsx)(o.Z,{"aria-labelledby":"modal-title","aria-describedby":"modal-description",open:i,onClose:n,disableEnforceFocus:!1,disableAutoFocus:!1,sx:{outline:0},children:(0,m.jsx)(a.Z,{sx:{maxWidth:{xl:"2600px",position:"relative",borderRadius:"20px",height:"100%"}},children:(0,m.jsx)(d.Z,{sx:x,children:(0,m.jsxs)(h.RV,{methods:b,onSubmit:T(j),children:[(0,m.jsxs)(d.Z,{display:"flex",justifyContent:"space-between",alignItems:"center",borderRadius:"10px 10px 0 0",p:2,bgcolor:L.palette.primary.lighter,children:[(0,m.jsx)(r.Z,{variant:"h6",color:L.palette.grey[0],sx:{letterSpacing:"0.7px"},children:w}),(0,m.jsx)(t.Z,{onClick:n,sx:{minWidth:0,padding:.2,display:"flex",alignItems:"center",borderRadius:"50%",bgcolor:L.palette.common.white,":hover":{bgcolor:L.palette.common.white}},children:(0,m.jsx)(v.Z,{icon:"iconamoon:close-bold",width:24,height:24,color:L.palette.common.black})})]}),(0,m.jsx)(s.Z,{}),D?(0,m.jsx)(g.VJ,{}):(0,m.jsx)(d.Z,{mt:2,children:Z}),(0,m.jsx)(s.Z,{}),(0,m.jsxs)(u.Z,{direction:"row",spacing:2,justifyContent:"flex-end",p:2,children:[(0,m.jsx)(t.Z,{variant:"outlined",onClick:n,children:"Cancel"}),(0,m.jsx)(t.Z,{type:"submit",variant:"contained",disabled:y,startIcon:(0,m.jsx)(v.Z,{icon:k?"fa-solid:user-edit":"mingcute:user-add-fill"}),children:k?"Save":"Add"})]})]})})})})}},77762:function(e,i,n){n.d(i,{ZP:function(){return o}});var t=n(29439),l=n(72791);function o(e){var i=(0,l.useState)((null===e||void 0===e?void 0:e.defaultDense)||!1),n=(0,t.Z)(i,2),o=n[0],a=n[1],d=(0,l.useState)((null===e||void 0===e?void 0:e.defaultOrderBy)||"name"),r=(0,t.Z)(d,2),s=r[0],u=r[1],c=(0,l.useState)((null===e||void 0===e?void 0:e.defaultOrder)||"asc"),v=(0,t.Z)(c,2),h=v[0],f=v[1],p=(0,l.useState)((null===e||void 0===e?void 0:e.defaultCurrentPage)||0),g=(0,t.Z)(p,2),m=g[0],x=g[1],Z=(0,l.useState)((null===e||void 0===e?void 0:e.defaultRowsPerPage)||5),b=(0,t.Z)(Z,2),j=b[0],k=b[1],C=(0,l.useState)((null===e||void 0===e?void 0:e.defaultSelected)||[]),S=(0,t.Z)(C,2),w=S[0],y=S[1];return{dense:o,order:h,page:m,setPage:x,orderBy:s,rowsPerPage:j,selected:w,setSelected:y,onSelectRow:function(e){var i=w.indexOf(e),n=[];-1===i?n=n.concat(w,e):0===i?n=n.concat(w.slice(1)):i===w.length-1?n=n.concat(w.slice(0,-1)):i>0&&(n=n.concat(w.slice(0,i),w.slice(i+1))),y(n)},onSelectAllRows:function(e,i){y(e?i:[])},onSort:function(e){""!==e&&(f(s===e&&"asc"===h?"desc":"asc"),u(e))},onChangePage:function(e,i){x(i)},onChangeDense:function(e){a(e.target.checked)},onChangeRowsPerPage:function(e){k(parseInt(e.target.value,10)),x(0)}}}},23744:function(e,i,n){n.d(i,{Z:function(){return o}});var t=n(29439),l=n(72791);function o(e){var i=(0,l.useState)(e||""),n=(0,t.Z)(i,2),o=n[0],a=n[1];return{currentTab:o,onChangeTab:function(e,i){a(i)},setCurrentTab:a}}},4398:function(e,i,n){n.r(i),n.d(i,{default:function(){return J}});var t=n(15861),l=n(1413),o=n(29439),a=n(64687),d=n.n(a),r=n(77942),s=n(72791),u=n(91614),c=n(36151),v=n(57621),h=n(39281),f=n(79836),p=n(53382),g=n(68870),m=n(26812),x=n(9440),Z=(n(56777),n(77762)),b=n(23744),j=n(53451),k=n(54737),C=n(7055),S=n(97145),w=n(50765),y=n(94474),D=n(32687),L=n(61134),I=n(61265),T=n(17449),P=n(86951),E=n(32939),R=n(47733),V=n(76534),M=n(90163),_=n(52791),A=n(86446),G=n(80184),U=[{id:"state",label:"State",name:"State",value:"state"},{id:"district",label:"District",name:"District",value:"district"},{id:"taluk",label:"Taluk",name:"Taluk",value:"taluk"},{id:"village",label:"Village",name:"Village",value:"village"}],W=function(e){e.statusList,e.handleTalukSelect;var i,n,t,l=e.handleDistrictSelect,o=e.handleLocationChange,a=e.handleStatesSelect,d=e.methods,r=e.state,s=(e.isLoading,(0,x.v9)((function(e){return e.user}))),u=s.statesList,c=s.districtList,v=(s.talukList,d.watch);return(0,G.jsxs)(_.Z,{sx:{display:"grid",columnGap:2,rowGap:2,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(1, 1fr)"},p:2},children:[(0,G.jsx)(A.Wo,{name:"location",label:"Select location",placeholder:"location",value:v("location"),options:U,onChange:o,disabled:!0}),(null===(i=["district","taluk","village"])||void 0===i?void 0:i.includes(v("location")))&&(0,G.jsx)(A.Wo,{name:"selectStates",label:"Select States",placeholder:"States",value:v("selectStates"),options:u||[],onChange:a,disabled:!(null===r||void 0===r||!r.id)}),(null===(n=["taluk","village"])||void 0===n?void 0:n.includes(v("location")))&&v("selectStates")&&(null===Array||void 0===Array?void 0:Array.isArray(null===c||void 0===c?void 0:c.childEntities))&&(null===c||void 0===c||null===(t=c.childEntities)||void 0===t?void 0:t.length)>0&&(0,G.jsx)(A.Wo,{name:"selectDistrict",label:"Select District",placeholder:"District",value:v("selectDistrict"),options:(null===c||void 0===c?void 0:c.childEntities)||[],defaultMessage:"Please Select State",onChange:l,disabled:!(null===r||void 0===r||!r.id)}),(0,G.jsx)(A.au,{name:"name",label:"Name",placeholder:"Name"})]})},N=n(13967),F=n(35855),q=n(53994),B=n(20890),O=n(23786);function z(e){var i=e.row,n=e.handleShowDetails,t=e.onhandleDeleteRow,l=e.onhandleEditDetails,a=((0,N.Z)(),(0,s.useState)(null)),d=(0,o.Z)(a,2),r=d[0],u=d[1],c=function(){u(null)},v=i||{},h=v.id,f=v.name,p=v.farmerCount,g=v.checkUpperGeo,m=(0,R.C)("state",g),x=(0,R.C)("district",g),Z=(0,R.C)("taluk",g);return(0,G.jsxs)(F.Z,{hover:!0,onClick:function(){return n&&n(h)},sx:{textTransform:"capitalize"},children:[(0,G.jsx)(q.Z,{children:(0,G.jsx)(B.Z,{variant:"subtitle2",noWrap:!0,children:null!==Z&&void 0!==Z&&Z.id?null===Z||void 0===Z?void 0:Z.name:"--"})}),(0,G.jsx)(q.Z,{children:(0,G.jsx)(B.Z,{variant:"subtitle2",noWrap:!0,children:null!==x&&void 0!==x&&x.id?null===x||void 0===x?void 0:x.name:"--"})}),(0,G.jsx)(q.Z,{children:(0,G.jsx)(B.Z,{variant:"subtitle2",noWrap:!0,children:null!==m&&void 0!==m&&m.id?null===m||void 0===m?void 0:m.name:"--"})}),(0,G.jsx)(q.Z,{children:(0,G.jsx)(B.Z,{variant:"subtitle2",noWrap:!0,children:p||"--"})}),(0,G.jsx)(q.Z,{align:"left",children:(0,G.jsx)(w.V7,{open:r,onOpen:function(e){u(e.currentTarget)},onClose:c,actions:(0,G.jsxs)(G.Fragment,{children:[(0,G.jsxs)(O.Z,{onClick:function(){l&&l(h),c()},children:[(0,G.jsx)(E.Z,{icon:"eva:edit-fill"}),"Edit"]}),(0,G.jsxs)(O.Z,{onClick:function(){t&&t(h,f),c()},sx:{color:"error.main"},children:[(0,G.jsx)(E.Z,{icon:"eva:trash-2-outline"}),"Delete"]})]})})})]})}var K=[{id:"taluk",label:"Taluk",align:"left"},{id:"district",label:"District",align:"left"},{id:"state",label:"State",align:"left"},{id:"nofarmer",label:"Farmer Count",align:"left"},{id:"action",label:"Action",align:"left"}];function J(){var e=(0,Z.ZP)(),i=e.page,n=e.order,a=e.orderBy,_=e.rowsPerPage,A=e.selected,U=e.onChangePage,N=e.onChangeRowsPerPage,F=(e.setPage,(0,s.useState)("")),q=(0,o.Z)(F,2),B=q[0],O=(q[1],(0,s.useState)("")),J=(0,o.Z)(O,2),Y=J[0],H=(J[1],(0,P.Ds)().enqueueSnackbar),X=(0,x.I0)(),Q=(0,s.useState)({id:"",selectStages:"",openModal:!1,villageId:null,parentId:"",stateId:"",districtId:"",talukId:"",isLoading:!1,openDeleteModal:!1,VillageName:""}),$=(0,o.Z)(Q,2),ee=$[0],ie=$[1],ne=(0,b.Z)("all").currentTab;(0,s.useEffect)((function(){te(),(0,T.yU)()}),[]);var te=function(){(0,y.Cy)("","","taluk")},le=(0,x.v9)((function(e){return e.locations})),oe=le.locationData,ae=le.talukLocationList,de=le.isLoading,re=(0,x.v9)((function(e){return e.user})),se=re.districtList,ue=re.talukList;(0,s.useEffect)((function(){if(X((0,T.Vc)(null)),null!==oe&&void 0!==oe&&oe.id&&null!==ee&&void 0!==ee&&ee.id){var e,i;ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!0})}));var n,t,o,a=(0,R.C)("state",null===oe||void 0===oe?void 0:oe.checkUpperGeo),d=(0,R.C)("district",null===oe||void 0===oe?void 0:oe.checkUpperGeo),r=(0,R.C)("taluk",null===oe||void 0===oe?void 0:oe.checkUpperGeo),s=(0,R.C)("village",null===oe||void 0===oe?void 0:oe.checkUpperGeo);if(ge("selectStates",null===a||void 0===a?void 0:a.id),ge("location",null===oe||void 0===oe||null===(e=oe.checkUpperGeo)||void 0===e?void 0:e.entityType),ge("name",null===oe||void 0===oe||null===(i=oe.checkUpperGeo)||void 0===i?void 0:i.name),oe&&null!==a&&void 0!==a&&a.id)if((0,T.YV)(null===a||void 0===a?void 0:a.id),oe&&null!==d&&void 0!==d&&d.id&&null!==se&&void 0!==se&&se.childEntities)if((0,T.sK)(null===d||void 0===d?void 0:d.id),ge("selectDistrict",(null===d||void 0===d?void 0:d.id)||""),r&&oe&&null!==ue&&void 0!==ue&&ue.childEntities)if((0,T.Ub)(null===r||void 0===r?void 0:r.id),ge("selectTaluk",(null===r||void 0===r?void 0:r.id)||""),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})})),s&&oe)ge("name",null===oe||void 0===oe||null===(n=oe.checkUpperGeo)||void 0===n?void 0:n.name),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}));else ge("name",null===oe||void 0===oe||null===(t=oe.checkUpperGeo)||void 0===t?void 0:t.name),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}));else ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})})),ge("selectTaluk",(null===oe||void 0===oe||null===(o=oe.checkUpperGeo)||void 0===o?void 0:o.id)||"");else if(oe&&null!==a&&void 0!==a&&a.id&&(null===d||void 0===d||!d.id)){var u;ge("selectDistrict",(null===oe||void 0===oe||null===(u=oe.checkUpperGeo)||void 0===u?void 0:u.id)||""),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}))}}}),[null===oe||void 0===oe?void 0:oe.id,null===ee||void 0===ee?void 0:ee.id]);var ce=(0,s.useMemo)((function(){return{location:"",selectStates:"",selectDistrict:"",selectTaluk:"",name:""}}),[]),ve=r.Ry().shape({location:r.Z_().required("Location is required"),name:r.Z_().required("Name is required").max(50,"Limit of 50 characters"),selectStates:r.Z_().when("location",{is:function(e){return"district"===e||"taluk"===e||"village"===e},then:r.Z_().required("State is required"),otherwise:r.Z_()}),selectDistrict:r.Z_().when("location",{is:function(e){return"taluk"===e||"village"===e},then:r.Z_().required("District is required"),otherwise:r.Z_()})}),he=(0,L.cI)({resolver:(0,I.X)(ve),defaultValues:ce}),fe=(he.reset,he.watch),pe=(he.setError,he.clearErrors),ge=he.setValue,me=(he.handleSubmit,he.formState.isSubmitting,["location","name","selectDistrict","selectStates","selectTaluk"]),xe=!(null!==ae&&void 0!==ae&&ae.length)&&!!B||!(null!==ae&&void 0!==ae&&ae.length)&&!!Y||!(null!==ae&&void 0!==ae&&ae.length)&&!!B||!(null!==ae&&void 0!==ae&&ae.length)&&!!ne,Ze=function(){(0,T.yU)(),ge("selectStates",""),ge("selectDistrict",""),ge("selectTaluk",""),ge("name","")},be=function(e){ie((function(i){return(0,l.Z)((0,l.Z)({},i),{},{openModal:!0,id:e,isLoading:!0})}))},je=function(){X((0,T.Vc)(null)),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openModal:!1,id:"",isLoading:!1})})),me.forEach((function(e){return pe(e)}))},ke=function(){var e=(0,t.Z)(d().mark((function e(i){var n;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=(0,l.Z)({name:null===i||void 0===i?void 0:i.name,entityType:null===i||void 0===i?void 0:i.location},(null===ee||void 0===ee?void 0:ee.parentId)&&{parentId:null===ee||void 0===ee?void 0:ee.parentId}),null!==ee&&void 0!==ee&&ee.id?X((0,y.Bl)(n,null===ee||void 0===ee?void 0:ee.id)).then((function(e){var i,n,t,o;if(200===(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.statusCode))H(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.message,{variant:"success"}),te(),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})})),je(),X((0,T.Fi)(null)),X((0,y.c4)(null));else if(409===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)){var a;H(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message,{variant:"error"}),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}))}else if(422===(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.statusCode)){var d;H(null===e||void 0===e||null===(d=e.data)||void 0===d?void 0:d.message,{variant:"error"}),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})}))}else{var r;H(null===e||void 0===e||null===(r=e.data)||void 0===r?void 0:r.message,{variant:"error"}),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!1})})),je()}})):X((0,y.Vx)(n)).then((function(e){var i,n,t,l;if(201===(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.statusCode))H(null===e||void 0===e||null===(l=e.data)||void 0===l?void 0:l.message,{variant:"success"}),te(),je();else if(409===(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.statusCode)){var o;H(null===e||void 0===e||null===(o=e.data)||void 0===o?void 0:o.message,{variant:"error"})}else if(422===(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.statusCode)){var a;H(null===e||void 0===e||null===(a=e.data)||void 0===a?void 0:a.message,{variant:"error"})}}));case 2:case"end":return e.stop()}}),e)})));return function(i){return e.apply(this,arguments)}}(),Ce=function(e,i){ie((function(n){return(0,l.Z)((0,l.Z)({},n),{},{openDeleteModal:!0,id:e,VillageName:i})}))};return(0,G.jsxs)(j.Z,{title:"Taluk",children:[(0,G.jsxs)(u.Z,{maxWidth:"xl",children:[(0,G.jsx)(k.Z,{heading:"Taluk List",links:[{href:C.vB.location.root}],action:(0,G.jsx)(c.Z,{variant:"contained",startIcon:(0,G.jsx)(E.Z,{icon:"eva:plus-fill"}),onClick:function(){ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openModal:!0,id:""})})),ge("location","taluk"),Ze()},children:"Add Geolocation"})}),(0,G.jsxs)(v.Z,{sx:{pt:2},children:[(0,G.jsx)(S.Z,{children:(0,G.jsx)(h.Z,{sx:{minWidth:800,position:"relative"},children:(0,G.jsxs)(f.Z,{size:"medium",children:[(0,G.jsx)(w.K,{order:n,orderBy:a,headLabel:K,rowCount:null===ae||void 0===ae?void 0:ae.length,numSelected:A.length}),(0,G.jsx)(p.Z,{children:!de||null!==ae&&void 0!==ae&&ae.length?null!==ae&&void 0!==ae&&ae.length?ae.slice(i*_,i*_+_).map((function(e){return(0,G.jsx)(z,{row:e,onhandleDeleteRow:Ce,onhandleEditDetails:be},e.id)})):(0,G.jsx)(w.et,{isNotFound:xe}):(0,G.jsx)(w.hM,{})})]})})}),(0,G.jsx)(g.Z,{sx:{position:"relative"},children:(0,G.jsx)(m.Z,{rowsPerPageOptions:[5,10,25],component:"div",count:null!==ae&&void 0!==ae&&ae.length?ae.length:0,rowsPerPage:_,page:i,onPageChange:U,onRowsPerPageChange:N})})]})]}),(0,G.jsx)(D.Z,{openModal:ee.openModal,isLoading:ee.isLoading,handleClose:je,onSubmit:ke,methods:he,id:null===ee||void 0===ee?void 0:ee.id,handleCropDetails:function(){ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{isLoading:!0})})),(0,y.U_)(null===ee||void 0===ee?void 0:ee.id)},title:ee.id?"Edit Taluk location":"Add Taluk Geo Location",disabled:function(){var e,i,n;return(null===oe||void 0===oe||null===(e=oe.checkUpperGeo)||void 0===e?void 0:e.name)===fe("name")||null===(i=fe("name"))||void 0===i||!i.length||null===(n=fe("selectStates"))||void 0===n||!n.length}(),children:(0,G.jsx)(W,{state:ee,methods:he,handleLocationChange:Ze,handleStatesSelect:function(e){ie((function(i){return(0,l.Z)((0,l.Z)({},i),{},{parentId:e,stateId:e})})),(0,T.YV)(e),ge("selectDistrict",""),ge("selectTaluk",""),ge("name","")},handleDistrictSelect:function(e){ie((function(i){return(0,l.Z)((0,l.Z)({},i),{},{parentId:e,districtId:e})})),(0,T.sK)(e),ge("selectTaluk",""),ge("name","")},handleTalukSelect:function(e){ie((function(i){return(0,l.Z)((0,l.Z)({},i),{},{parentId:e,talukId:e})})),ge("name","")},isLoading:ee.isLoading})}),(0,G.jsx)(V.Z,{openModal:ee.openDeleteModal,handleClose:function(){ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openDeleteModal:!1,id:"",VillageName:""})}))},title:"Delete Confirmation!",handleSubmit:function(){X((0,y.uw)(null===ee||void 0===ee?void 0:ee.id)).then((function(e){var i,n;200===(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.statusCode)?(H(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.message,{variant:"success"}),(0,y.Dm)(),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openDeleteModal:!1,id:"",VillageName:""})}))):((0,y.Dm)(),ie((function(e){return(0,l.Z)((0,l.Z)({},e),{},{openDeleteModal:!1,id:"",VillageName:""})})))})).catch((function(e){console.log("error")}))},children:(0,G.jsx)(M.I,{userName:null===ee||void 0===ee?void 0:ee.VillageName})})]})}},90163:function(e,i,n){n.d(i,{I:function(){return d}});var t=n(68870),l=n(20890),o=n(32939),a=n(80184),d=function(e){var i=e.userName;return(0,a.jsxs)(t.Z,{sx:{p:2,minHeight:"180px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",textAlign:"center"},children:[(0,a.jsx)(t.Z,{sx:{width:80,height:80,borderRadius:"50%",backgroundColor:"#FDECF2",display:"flex",alignItems:"center",justifyContent:"center",mb:2},children:(0,a.jsx)(o.Z,{icon:"mingcute:delete-2-line",sx:{fontSize:32,color:"#E91E63"}})}),(0,a.jsxs)(l.Z,{variant:"h6",sx:{fontWeight:"bold",mb:2},children:["Are you sure you want to remove ",i,"?"]})]})}},47733:function(e,i,n){n.d(i,{C:function(){return t}});var t=function(e,i){var n;return i?(null===i||void 0===i?void 0:i.entityType)===e?i:null===i||void 0===i||null===(n=i.parents)||void 0===n?void 0:n.find((function(i){return(null===i||void 0===i?void 0:i.entityType)===e})):null}},52791:function(e,i,n){var t=(0,n(23814).Z)();i.Z=t}}]);
//# sourceMappingURL=4398.3e7097b3.chunk.js.map