"use strict";var e=require("../uni-popup/popup.js"),t=require("../../../../common/vendor.js");const p={name:"uniPopupMessage",mixins:[e.popup],props:{type:{type:String,default:"success"},message:{type:String,default:""},duration:{type:Number,default:3e3},maskShow:{type:Boolean,default:!1}},data:()=>({}),created(){this.popup.maskShow=this.maskShow,this.popup.messageChild=this},methods:{timerClose(){0!==this.duration&&(clearTimeout(this.timer),this.timer=setTimeout((()=>{this.popup.close()}),this.duration))}}};var s=t._export_sfc(p,[["render",function(e,p,s,o,i,u){return{a:t.t(s.message),b:t.n("uni-popup__"+s.type+"-text"),c:t.n("uni-popup__"+s.type)}}]]);wx.createComponent(s);
