"use strict";var e=require("../../common/vendor.js");const r={data:()=>({name:"kimi",class2:"ki",class3:2022,buyPrice:"",buyNum:"",imgUrl:"/static/images/admin.png",averagePrice:100,token:"",currency:0}),onLoad(){},methods:{blur(e){this.buyPrice=Math.floor(100*e.detail.value)/100,this.buyPrice<=0&&(this.buyPrice=0)},blur2(e){this.buyNum=Math.floor(e.detail.value),this.buyNum<=0&&(this.buyNum=1)},confirm(){this.checkCurrency()&&this.checkNumber()&&e.index.showToast({title:"success",icon:"success"})},getUserCurrency(){e.index.request({url:"http://123.60.71.74:20001/mh/user/currency/info",method:"GET",dataType:"JSON",header:{token:this.token},success:e=>{let r=JSON.parse(e.data);this.currency=r.data.currencyAmount}})},checkCurrency(){return this.currency>=this.buyNum*this.buyPrice||(e.index.showToast({title:"请充值!",icon:"error"}),setTimeout((function(){e.index.switchTab({url:"/pages/user"})}),1e3),!1)},checkNumber(){return this.buyPrice>0&&this.buyNum>0||(0==this.buyPrice?(e.index.showToast({title:"价格错误!",icon:"error"}),!1):0==this.buyNum?(e.index.showToast({title:"数量错误!",icon:"error"}),!1):void 0)}},onShow(){e.index.getStorage({key:"token",success:e=>{this.token=e.data,this.getUserCurrency()}})}};var t=e._export_sfc(r,[["render",function(r,t,i,u,s,c){return{a:s.imgUrl,b:e.t(s.name),c:e.t(s.class2),d:e.t(s.class3),e:e.o(((...e)=>c.blur&&c.blur(...e))),f:s.buyPrice,g:e.o((e=>s.buyPrice=e.detail.value)),h:e.t(s.averagePrice),i:e.o(((...e)=>c.blur2&&c.blur2(...e))),j:s.buyNum,k:e.o((e=>s.buyNum=e.detail.value)),l:e.t(s.buyPrice*s.buyNum),m:e.o(((...e)=>c.confirm&&c.confirm(...e)))}}]]);wx.createPage(t);
