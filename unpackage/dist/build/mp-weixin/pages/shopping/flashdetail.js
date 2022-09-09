"use strict";var e=require("../../common/vendor.js");const t={data:()=>({chartData:{},opts:{color:["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],padding:[15,10,0,15],legend:{},xAxis:{disableGrid:!0},yAxis:{gridType:"dash",dashLength:2},extra:{line:{type:"straight",width:2}}},detail:{},userHas:1,averageOneDay:0,averageOneWeek:0,selling:[],buying:[],lowPrice:0,highPrice:0,history:[],historyLatest:[]}),methods:{getJson(){},test(){},flashBuy(){this.selling.length&&e.index.navigateTo({url:"confirmBuy"})},flashSell(){this.userHas>0&&e.index.navigateTo({url:"confirmSell"})},releaseBuy(){e.index.navigateTo({url:"releaseBuy"})},releaseSell(){e.index.navigateTo({url:"releaseSell"})},getBestPrice(){this.selling.sort((function(e,t){return e.price-t.price})),this.lowPrice=this.selling[0].price,this.buying.sort((function(e,t){return t.price-e.price})),this.highPrice=this.buying[0].price},historyFive(){this.history.sort((function(e,t){return t.time-e.time}));for(var e=0;e<5;e++)this.historyLatest[e]=this.history[e]},changeName(){this.historyLatest.forEach((function(e){e.anonymity=e.name.replace(/./g,"*")+e.name.charAt(e.name.length-1)}))},changeTime(){var e=new Date;this.historyLatest.forEach((function(t){var i=e.getTime()-t.time;if(i>=2592e5){var a=new Date(Number(t.time));t.date=a.getMonth()+1+"/"+a.getDate()}else i<2592e5&&i>=1728e5?t.date="三天前":i<1728e5&&i>=864e5?t.date="昨天":i<864e5&&(t.date="今天")}))},viewMore(){e.index.navigateTo({url:"flashHistory"})}},onShow(){e.index.getStorage({key:"token",success:e=>{this.token=e.data},fail:t=>{e.index.showToast({title:"请先登录",icon:"none"}),setTimeout((function(){e.index.switchTab({url:"../../pages/user"})}),1e3)}}),this.getJson(),this.selling=[{imgUrl:"/static/images/admin.png",price:"95.0",amount:"1"},{imgUrl:"/static/images/admin.png",price:"95.0",amount:"1"},{imgUrl:"/static/images/admin.png",price:"100.0",amount:"1"}],this.buying=[{imgUrl:"/static/images/admin.png",price:"95.0",amount:"1",time:"1661238591000",name:"sadasd"},{imgUrl:"/static/images/admin.png",price:"95.0",amount:"1",time:"1661239592000",name:"啊实打实大苏打"},{imgUrl:"/static/images/admin.png",price:"100.0",amount:"1",time:"1661242593000",name:"123"},{imgUrl:"/static/images/admin.png",price:"100.0",amount:"1",time:"1661146043000",name:"阿斯顿525"},{imgUrl:"/static/images/admin.png",price:"85.0",amount:"1",time:"1660973243000",name:"5a"}],this.chartData={categories:["2016","2017","2018","2019","2020","2021"],series:[{name:"闪购",data:[35,36,31,33,13,34]},{name:"闪出",data:[36,31,33,13,34,35]}]},this.history=this.buying,this.detail={imgUrl:"https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f1.png",name:"十二星座白羊座",class1:"大分类A",class2:"分类a",class3:"品类1"},this.historyFive(),this.changeName(),this.changeTime(),this.getBestPrice()}};if(!Array){e.resolveComponent("qiun-data-charts")()}Math;var i=e._export_sfc(t,[["render",function(t,i,a,s,r,n){return{a:r.detail.imgUrl,b:e.t(r.detail.name),c:e.t(r.detail.class2),d:e.t(r.detail.class3),e:e.t(r.userHas),f:e.t(r.lowPrice),g:e.o(((...e)=>n.flashBuy&&n.flashBuy(...e))),h:r.userHas?"":1,i:e.t(r.highPrice),j:e.o(((...e)=>n.flashSell&&n.flashSell(...e))),k:r.userHas?"":1,l:e.t(r.lowPrice),m:e.t(r.highPrice),n:e.f(r.selling,((t,i,a)=>({a:t.imgUrl,b:e.t(t.price),c:e.t(t.amount),d:i}))),o:e.f(r.buying,((t,i,a)=>({a:t.imgUrl,b:e.t(t.price),c:e.t(t.amount),d:i}))),p:0==r.userHas?1:"",q:e.o((e=>n.releaseSell())),r:e.o((e=>n.releaseBuy())),s:e.t(r.averageOneDay),t:e.t(r.averageOneDay),v:e.p({type:"line",opts:r.opts,chartData:r.chartData}),w:e.f(r.historyLatest,((t,i,a)=>({a:t.imgUrl,b:e.t(t.anonymity),c:e.t(t.price),d:e.t(t.amount),e:e.t(t.date),f:i}))),x:e.o(((...e)=>n.viewMore&&n.viewMore(...e)))}}]]);wx.createPage(i);