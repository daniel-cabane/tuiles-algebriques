(function(t){function e(e){for(var n,l,s=e[0],o=e[1],c=e[2],p=0,f=[];p<s.length;p++)l=s[p],Object.prototype.hasOwnProperty.call(r,l)&&r[l]&&f.push(r[l][0]),r[l]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);u&&u(e);while(f.length)f.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],n=!0,s=1;s<i.length;s++){var o=i[s];0!==r[o]&&(n=!1)}n&&(a.splice(e--,1),t=l(l.s=i[0]))}return t}var n={},r={app:0},a=[];function l(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,l),i.l=!0,i.exports}l.m=t,l.c=n,l.d=function(t,e,i){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(l.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)l.d(i,n,function(e){return t[e]}.bind(null,n));return i},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var u=o;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"016b":function(t,e,i){"use strict";i("7638")},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("v-app-bar",{staticClass:"headline",attrs:{app:"",color:"primary",dark:""}},[t._v(" Tuiles algébriques ")]),i("v-main",[i("mainDeck")],1)],1)},a=[],l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",[i("v-row",{staticClass:"text-center"},[i("v-col",{attrs:{cols:"12"}},[i("v-card",{staticClass:"pa-3"},[i("v-btn",{staticStyle:{position:"absolute",right:"2px",top:"2px"},attrs:{fab:"",icon:"",small:"",elevation:"2",color:"error"},on:{click:function(e){t.deleteDialog=!0}}},[i("v-icon",[t._v(t._s(t.svgPath))])],1),i("v-dialog",{attrs:{width:"400px"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[i("v-card",[i("v-card-title",[t._v("Effacer toutes les tuiles ?")]),i("v-card-actions",{staticStyle:{display:"flex","justify-content":"center"}},[i("v-btn",{attrs:{width:"150px",color:"primary"},on:{click:function(e){t.deleteDialog=!1}}},[t._v("Annuler")]),i("v-btn",{attrs:{width:"150px",color:"error"},on:{click:t.clearAll}},[t._v("Effacer tout")])],1)],1)],1),i("div",{staticClass:"text-center headline mb-2"},[t._v("Ajouter des tuiles")]),i("div",{staticStyle:{display:"flex","justify-content":"space-around","align-items":"center"}},[i("v-card",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-h3",staticStyle:{display:"flex","align-content":"center","justify-content":"center"},attrs:{tile:"",hover:"",width:"85",height:"85",color:"red"},on:{click:function(e){return t.addTile("xx")}}},[i("span",{staticStyle:{"font-family":'"Brush Script MT"',display:"flex","align-items":"center"}},[i("span",{staticStyle:{"margin-bottom":"15px"}},[t._v(" x "),i("span",{staticStyle:{"vertical-align":"super","font-size":"50%","margin-left":"-10px"}},[t._v(" 2 ")])])])]),i("v-card",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-h3",staticStyle:{display:"flex","align-content":"center","justify-content":"center"},attrs:{tile:"",hover:"",width:"85",height:"55",color:"blue"},on:{click:function(e){return t.addTile("x1")}}},[i("span",{staticStyle:{"font-family":'"Brush Script MT"',display:"flex","align-items":"center"}},[i("span",{staticStyle:{"margin-bottom":"10px"}},[t._v("x")])])]),i("v-card",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-h3",staticStyle:{display:"flex","align-content":"center","justify-content":"center"},attrs:{tile:"",hover:"",width:"55",height:"85",color:"blue"},on:{click:function(e){return t.addTile("1x")}}},[i("span",{staticStyle:{"font-family":'"Brush Script MT"',display:"flex","align-items":"center"}},[i("span",{staticStyle:{"margin-bottom":"10px"}},[t._v("x")])])]),i("v-card",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"text-h3",staticStyle:{display:"flex","align-content":"center","justify-content":"center"},attrs:{tile:"",hover:"",width:"55",height:"55",color:"grey"},on:{click:function(e){return t.addTile("11")}}},[i("span",{staticStyle:{"font-family":'"Brush Script MT"',display:"flex","align-items":"center"}},[t._v(" 1 ")])])],1)],1)],1),i("v-col",{staticStyle:{display:"flex"},attrs:{cols:"12"}},t._l(t.tileGroups,(function(e,n){return i("span",{key:"group-"+n,staticStyle:{display:"flex"}},[i("draggable",{attrs:{group:"tiles",list:e},on:{start:function(e){t.drag=!0},end:function(e){t.drag=!1},change:t.checkGroups}},t._l(e,(function(t){return i("singleTile",{key:t.id,attrs:{h:t.h,v:t.v,id:t.id}})})),1),t.margins[n]?i("span",{staticStyle:{width:"10px"}}):t._e()],1)})),0)],1)],1)},s=[],o=(i("4160"),i("159b"),i("b76a")),c=i.n(o),u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var n=e.hover;return[i("v-card",{staticStyle:{display:"flex","align-content":"center","justify-content":"center","font-family":'"Times new roman"',"font-style":"italic"},attrs:{tile:"",flat:"",width:t.tileWidth,height:t.tileHeight,color:t.tileColor}},[i("div",{class:n?"font-weight-bold":"",staticStyle:{position:"absolute",width:"100%",height:"100%",display:"flex","flex-direction":"column","justify-content":"space-between"}},[i("div",{staticStyle:{"font-size":"16px"}},[t._v(t._s(t.h))]),i("div",{staticStyle:{"font-size":"16px","text-align":"right","padding-right":"5px"}},[i("i",[t._v(t._s(t.v))])]),i("div",{staticStyle:{visibility:"hidden"}},[t._v("hidden")])]),i("span",{staticStyle:{"font-size":"72px",display:"flex","align-items":"center"},domProps:{innerHTML:t._s(t.centerText)}}),n?i("v-btn",{staticStyle:{position:"absolute",left:"0px",top:"0px"},attrs:{fab:"",icon:"","x-small":"",color:"black"},on:{click:t.deleteMe}},[i("v-icon",[t._v(t._s(t.svgPath))])],1):t._e()],1)]}}])})},p=[],f=(i("a9e3"),i("94ed")),h={props:{h:String,v:String,id:Number},data:function(){return{svgPath:f["a"]}},computed:{centerText:function(){return this.v!=this.h?'<span style="margin-bottom:10px;">x</span>':"x"==this.v?'<span style="margin-bottom:15px;">x<span style="vertical-align:super;font-size:50%">2</span></span>':'<span style="font-size:48px;font-style:normal">1</span>'},tileColor:function(){return this.v!=this.h?"blue":"x"==this.v?"red":"grey"},tileWidth:function(){return"x"==this.h?135:75},tileHeight:function(){return"x"==this.v?135:75}},methods:{deleteMe:function(){this.eventBus.$emit("deleteTile",this.id)}}},d=h,v=(i("016b"),i("2877")),g=i("6544"),y=i.n(g),m=i("8336"),x=i("b0af"),b=i("ce87"),S=i("132d"),_=Object(v["a"])(d,u,p,!1,null,null,null),w=_.exports;y()(_,{VBtn:m["a"],VCard:x["a"],VHover:b["a"],VIcon:S["a"]});var G={components:{draggable:c.a,singleTile:w},name:"mainDeck",data:function(){return{svgPath:f["a"],deleteDialog:!1,tileGroups:[[],[]],margins:[!0]}},mounted:function(){var t=this;this.eventBus.$on("deleteTile",(function(e){var i=t.tileGroups;t.tileGroups=[],i.forEach((function(i){var n=[];i.forEach((function(t){t.id!=e&&n.push(t)})),t.tileGroups.push(n)})),t.checkGroups()}))},methods:{checkGroups:function(){var t=this,e=this.tileGroups;this.tileGroups=[],e.forEach((function(e){e.length>0&&t.tileGroups.push(e)})),this.tileGroups.push([]),this.margins=[];for(var i=0;i<this.tileGroups.length;i++)this.margins.push(!this.compareGroups(i))},compareGroups:function(t){var e=this.tileGroups[t],i=this.tileGroups[t+1];if(void 0==e||void 0==i)return!1;if(!this.isConsistent(e)||!this.isConsistent(i))return!1;if(e.length!=i.length)return!1;for(var n=0;n<e.length;n++)if(e[n].v!=i[n].v)return!1;return!0},isConsistent:function(t){if(0==t.length)return!1;var e=t[0].h;return t.forEach((function(t){if(t.h!=e)return!1})),!0},addTile:function(t){var e=1;this.tileGroups.forEach((function(t){t.forEach((function(t){e=Math.max(e,t.id+1)}))}));var i=t.charAt(0),n=t.charAt(1),r=this.tileGroups.length-1;while(0==this.tileGroups[r].length&&r>0)r--;void 0==this.tileGroups[r][0]||this.tileGroups[r][0].h==i?this.tileGroups[r].push({v:n,h:i,id:e}):this.tileGroups.push([{v:n,h:i,id:e}]),this.checkGroups()},clearAll:function(){this.tileGroups=[[],[]],this.deleteDialog=!1}}},k=G,T=i("99d9"),j=i("62ad"),C=i("a523"),V=i("169a"),O=i("0fd9"),M=i("269a"),P=i.n(M),D=i("5607"),E=Object(v["a"])(k,l,s,!1,null,null,null),A=E.exports;y()(E,{VBtn:m["a"],VCard:x["a"],VCardActions:T["a"],VCardTitle:T["b"],VCol:j["a"],VContainer:C["a"],VDialog:V["a"],VIcon:S["a"],VRow:O["a"]}),P()(E,{Ripple:D["a"]});var B={name:"App",components:{mainDeck:A},data:function(){return{}}},z=B,$=i("7496"),N=i("40dc"),H=i("f6c4"),I=Object(v["a"])(z,r,a,!1,null,null,null),J=I.exports;y()(I,{VApp:$["a"],VAppBar:N["a"],VMain:H["a"]});var R=i("f309");n["a"].use(R["a"]);var W=new R["a"]({icons:{iconfont:"mdiSvg"}});n["a"].config.productionTip=!1;var q=new n["a"];n["a"].mixin({data:function(){return{eventBus:q}}}),new n["a"]({vuetify:W,render:function(t){return t(J)}}).$mount("#app")},7638:function(t,e,i){}});
//# sourceMappingURL=app.10991e58.js.map