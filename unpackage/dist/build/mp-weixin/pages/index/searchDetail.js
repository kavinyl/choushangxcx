"use strict";var a=require("../../common/vendor.js");const t={components:{proList:()=>"../../components/proList/proList.js",searchArea:()=>"../../components/search-area/search-area.js"},data:()=>({searchVal:"",snapValue:"",autoDatas:[],product:[]}),onLoad(){this.getJson()},methods:{getJson(){a.index.request({url:"https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",method:"get",dataType:"JSON",success:a=>{let t=JSON.parse(a.data);this.autoDatas=t.autoDatas,this.product=t.productList}})}},mounted(){},watch:{}};if(!Array){(a.resolveComponent("searchArea")+a.resolveComponent("proList"))()}Math;var e=a._export_sfc(t,[["render",function(t,e,s,o,r,c){return{a:a.sr("searcharea","fd71894a-0"),b:a.p({"auto-datas":r.autoDatas}),c:a.p({"product-list":r.product})}}]]);wx.createPage(e);
