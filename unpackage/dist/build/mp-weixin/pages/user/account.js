"use strict";var t=require("../../common/vendor.js");const e={data:()=>({account:{}}),onLoad(){this.token=t.index.getStorageSync("token"),this.getJson()},methods:{getJson(){t.index.request({url:"http://123.60.71.74:20001/mh/user/currency/info",method:"GET",header:{token:this.token},success:t=>{this.account.remain=t.data.data.currencyAmount}})},toBill(){t.index.navigateTo({url:"bill"})},deposit(){t.index.navigateTo({url:"deposit"})},withdrawal(){t.index.navigateTo({url:"withdrawal"})},toAbout(){t.index.navigateTo({url:"/pages/about/about"})}},mounted(){}};var o=t._export_sfc(e,[["render",function(e,o,a,n,i,r){return{a:t.o(((...t)=>r.toAbout&&r.toAbout(...t))),b:t.t(i.account.remain),c:t.o(((...t)=>r.toBill&&r.toBill(...t))),d:t.o(((...t)=>r.deposit&&r.deposit(...t))),e:t.o(((...t)=>r.withdrawal&&r.withdrawal(...t)))}}]]);wx.createPage(o);
