"use strict";var e=require("../../common/vendor.js");const t={components:{searchArea:()=>"../../components/search-area/search-area.js"},data:()=>({historyDatas:[],historyNum:0,update:!0}),onShow(){this.historyDatas=e.index.getStorageSync("historyDatas")},methods:{changeHistory(e){},searchHistory(t){e.index.navigateTo({url:"searchDetail"})},getHistory(e){this.historyDatas=e,this.update=!1,this.update=!0},getJson(){e.index.request({url:"/static/fake.json",method:"get",success:e=>{}})}},mounted(){},watch:{}};if(!Array){e.resolveComponent("searchArea")()}var a=e._export_sfc(t,[["render",function(t,a,s,r,o,i){return{a:e.sr("searcharea","d4eb462c-0"),b:e.o(i.getHistory),c:e.f(o.historyDatas,((t,a,s)=>({a:e.t(t.keyword),b:a,c:e.o((e=>i.searchHistory(t.keyword)),a)}))),d:o.update&&o.historyDatas.length}}]]);wx.createPage(a);
