"use strict";var t=require("../../common/vendor.js");const e={data:()=>({deposit:""}),methods:{blur(e){this.deposit=Math.floor(100*e.detail.value)/100,this.deposit<=0&&(this.deposit=0,t.index.showToast({title:"请输入充值金额",icon:"none"}))},post(){t.index.showToast({title:"充值成功"+this.deposit+"元",icon:"none"})},formSubmit(){this.deposit&&(this.post(),setTimeout((function(){t.index.navigateBack({delta:1})}),1e3))},payment(){t.index.requestPayment({provider:"wxpay",timeStamp:String(Date.now()),nonceStr:"A1B2C3D4E5",package:"prepay_id=wx20180101abcdefg",signType:"MD5",paySign:"",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})}}};var i=t._export_sfc(e,[["render",function(e,i,o,s,n,a){return{a:t.o((t=>a.blur(t))),b:n.deposit,c:t.o((t=>n.deposit=t.detail.value)),d:t.o(((...t)=>a.formSubmit&&a.formSubmit(...t)))}}]]);wx.createPage(i);
