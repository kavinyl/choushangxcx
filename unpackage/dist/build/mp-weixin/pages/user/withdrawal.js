"use strict";var t=require("../../common/vendor.js");const a={data:()=>({withdrawal:"",account:{}}),onLoad(){this.getJson()},methods:{blur(a){var e=this;this.withdrawal=Math.floor(100*a.detail.value)/100,e.withdrawal<=0?(e.withdrawal=0,t.index.showToast({title:"请输入提现金额",icon:"none"})):e.withdrawal>e.account.remain&&(e.withdrawal=e.account.remain,t.index.showToast({title:"最多可提现"+e.account.remain+"元",icon:"none"}))},post(){t.index.showToast({title:"提现成功"+this.withdrawal+"元",icon:"none"})},formSubmit(){this.withdrawal&&this.post()},getJson(){t.index.request({url:"https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",method:"get",dataType:"JSON",success:t=>{let a=JSON.parse(t.data);this.account=a.user.account}})}}};var e=t._export_sfc(a,[["render",function(a,e,o,i,r,n){return{a:t.o((t=>n.blur(t))),b:r.withdrawal,c:t.o((t=>r.withdrawal=t.detail.value)),d:t.t(r.account.remain),e:t.o(((...t)=>n.formSubmit&&n.formSubmit(...t)))}}]]);wx.createPage(e);
