(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ee54d16"],{4881:function(t,n,e){"use strict";var a=e("b7a4"),r=e.n(a);r.a},9639:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"my-container"},[t.$store.state.user?e("div",{staticClass:"user-info-wrap"},[e("div",{staticClass:"base-info-wrap"},[e("div",{staticClass:"avatar-title-wrap"},[e("van-image",{staticClass:"avatar",attrs:{round:"",fit:"cover",src:t.user.photo}}),e("div",{staticClass:"title"},[t._v(t._s(t.user.name))])],1),e("van-button",{attrs:{round:"",size:"mini"},on:{click:function(n){return t.$router.push("/user/profile")}}},[t._v("编辑资料")])],1),e("van-grid",{staticClass:"data-info",attrs:{border:!1}},[e("van-grid-item",[e("span",{staticClass:"count"},[t._v(t._s(t.user.art_count))]),e("span",{staticClass:"text"},[t._v("头条")])]),e("van-grid-item",[e("span",{staticClass:"count"},[t._v(t._s(t.user.follow_count))]),e("span",{staticClass:"text"},[t._v("关注")])]),e("van-grid-item",[e("span",{staticClass:"count"},[t._v(t._s(t.user.fans_count))]),e("span",{staticClass:"text"},[t._v("粉丝")])]),e("van-grid-item",[e("span",{staticClass:"count"},[t._v(t._s(t.user.like_count))]),e("span",{staticClass:"text"},[t._v("获赞")])])],1)],1):e("div",{staticClass:"not-login",on:{click:function(n){return t.$router.push("/login")}}},[e("div",{staticClass:"mobile"}),e("div",{staticClass:"text"},[t._v("点击登录")])]),e("van-grid",{attrs:{clickable:"","column-num":3}},[e("van-grid-item",{attrs:{text:"我的收藏",to:"/my-article/collect"}},[e("van-icon",{attrs:{slot:"icon",name:"star-o",color:"#eb5253"},slot:"icon"})],1),e("van-grid-item",{attrs:{text:"浏览历史",to:"/my-article/history"}},[e("van-icon",{attrs:{slot:"icon",name:"browsing-history-o",color:"#ffa023"},slot:"icon"})],1),e("van-grid-item",{attrs:{text:"作品",to:"/my-article"}},[e("van-icon",{attrs:{slot:"icon",name:"edit",color:"#678eff"},slot:"icon"})],1)],1),e("van-cell-group",{attrs:{border:!1}},[e("van-cell",{attrs:{title:"消息通知","is-link":""}}),e("van-cell",{attrs:{title:"小智同学","is-link":""},on:{click:function(n){return t.$router.push("/user/chat")}}})],1),t.$store.state.user?e("van-cell-group",{on:{click:t.onLogOut}},[e("van-cell",{staticStyle:{"text-align":"center"},attrs:{title:"退出登录",clickable:""}})],1):t._e()],1)},r=[],s=(e("96cf"),e("1da1")),o=e("c24f"),c={name:"MyPage",components:{},props:{},data:function(){return{user:{}}},computed:{},watch:{},created:function(){this.$store.state.user&&this.getuserInfo()},mounted:function(){},methods:{getuserInfo:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var n,e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(o["f"])();case 3:n=t.sent,e=n.data,this.user=e.data,console.log(e),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,this,[[0,9]])})));function n(){return t.apply(this,arguments)}return n}(),onLogOut:function(){var t=this;this.$dialog.confirm({title:"退出提示",message:"你确定退出吗"}).then((function(){t.$store.commit("setUser",null)})).catch((function(){t.$toast("已取消退出")}))}}},i=c,u=(e("4881"),e("2877")),l=Object(u["a"])(i,a,r,!1,null,"3a72cfa6",null);n["default"]=l.exports},b7a4:function(t,n,e){},c24f:function(t,n,e){"use strict";e.d(n,"h",(function(){return r})),e.d(n,"d",(function(){return s})),e.d(n,"f",(function(){return o})),e.d(n,"e",(function(){return c})),e.d(n,"c",(function(){return i})),e.d(n,"g",(function(){return u})),e.d(n,"b",(function(){return l})),e.d(n,"a",(function(){return v}));var a=e("b775"),r=function(t){return Object(a["a"])({method:"POST",url:"/app/v1_0/authorizations",data:t})},s=function(t){return Object(a["a"])({method:"get",url:"/app/v1_0/sms/codes/".concat(t)})},o=function(){return Object(a["a"])({method:"get",url:"/app/v1_0/user"})},c=function(){return Object(a["a"])({method:"get",url:"/app/v1_0/user/channels"})},i=function(){return Object(a["a"])({method:"get",url:"/app/v1_0/channels"})},u=function(){return Object(a["a"])({method:"get",url:"/app/v1_0/user/profile"})},l=function(t){return Object(a["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:t})},v=function(t){return Object(a["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:t})}}}]);
//# sourceMappingURL=chunk-2ee54d16.03fb16b5.js.map