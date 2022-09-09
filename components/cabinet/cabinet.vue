<template>
	<view>
		<!-- 1. 筛选 -->
		<view class="head">
			<view class="all-category" @click='showAll'>
				<text v-show="!hasConditions" class="txt">全部</text>
				<text v-show="hasConditions" class="txt">条件</text>
				<img class="pic" src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png" alt="">
			</view>
			<view class="time-in" @click='timeSwitch'>
				<text class="txt">入手日期</text>
				<img class="pic" :class="{'pic_2':small}" :src="timeImg[timeIndex]" alt="">
			</view>
			<view class="select" @click='select' v-if="pageIndex==0">
				<view v-show="!doSelect" class="line"></view>
				<img v-show="!doSelect" class="pic"
					src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/select.png" alt="">
				<text v-show="!doSelect" class="txt">筛选</text>
				<text v-show="doSelect" class="txt selecting">完成管理</text>
			</view>
			<view style="width: 104rpx;" v-if="pageIndex!=0"></view>
		</view>
		<!-- 2. 分类 列表 -->
		<view class="uni-padding-wrap uni-common-mt goods-area">
			<uni-segmented-control class='goods-sort' :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>

		<view class="cabinet-list" v-show="update">
			<view class="box" v-if="current === 0">
				<view v-for="(item,index) in curList" :key="index" class="border" @click="selectItem(item)"
					v-show="(item.deliveryStatus==pageIndex||item.deliveryStatus==11) && item.productItemPosition==10 && item.flagRecovery==0">
					<img class='pic' :src="item.imgUrl" alt="" @click='imgPreview(item)'>
					<view class="type t-c">{{ item.itemTypeName }}</view>
					<text class='name'>{{ item.productItemName }}</text>
					<view class="choosen" v-show=" doSelect && item.choose">
						<img class='pic_choose'
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/gou.png" alt="">
					</view>
					<view class="pre" v-show="item.flagPreSale">
						预售
					</view>
				</view>
			</view>
			<view class="box" v-if="current === 1">
				<view v-for="(item,index) in curList" :key="index" class="border" @click="selectItem(item)"
					v-show="(item.deliveryStatus==pageIndex||item.deliveryStatus==11)&& item.flagPreSale==0 && item.productItemPosition==10 && item.flagRecovery==0">
					<img class='pic' :src="item.imgUrl" alt="" @click='imgPreview(item)'>
					<view class="type t-c">{{ item.itemTypeName }}</view>
					<text class='name'>{{ item.productItemName }}</text>
					<view class="choosen" v-show=" doSelect && item.choose">
						<img class='pic_choose'
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/gou.png" alt="">
					</view>
				</view>
			</view>
			<view class="box" v-if="current === 2">
				<view v-for="(item,index) in curList" :key="index" class="border" @click="selectItem(item)"
					v-show="(item.deliveryStatus==pageIndex||item.deliveryStatus==11)&& item.flagPreSale==1 && item.productItemPosition==10 && item.flagRecovery==0">
					<img class='pic' :src="item.imgUrl" alt="" @click='imgPreview(item)'>
					<view class="type t-c">{{ item.itemTypeName }}</view>
					<text class='name'>{{ item.productItemName }}</text>
					<view class="choosen" v-show=" doSelect && item.choose">
						<img class='pic_choose'
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/gou.png" alt="">
					</view>
					<view class="pre">
						预售
					</view>
				</view>
			</view>
			<view class="box" v-if="current === 3">
				<view v-for="(item,index) in curList" :key="index" class="border" @click="selectItem(item)"
					v-show="(item.deliveryStatus==pageIndex||item.deliveryStatus==11) && item.flagSingle==1 && item.productItemPosition==10 && item.flagRecovery==0">
					<img class='pic' :src="item.imgUrl" alt="" @click='imgPreview(item)'>
					<view class="type t-c">{{ item.itemTypeName }}</view>
					<text class='name'>{{ item.productItemName }}</text>
					<view class="choosen" v-show="doSelect && item.choose">
						<img class='pic_choose'
							src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/gou.png" alt="">
					</view>
					<view class="pre" v-show="item.flagPreSale">
						预售
					</view>
				</view>
			</view>
			<view class="t-c">-- 到底了！--</view>
			<!-- <uni-load-more :status="status" @clickLoadMore='loadMore' :contentText="contentText">
			</uni-load-more> -->
		</view>

		<!-- 3. 背包 -->
		<view class="bag" @click="goBag" v-show="showBag&&!doSelect">
			<img class='pic' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/bag.png" alt="">
		</view>
		<!-- 4. 全部分类 -->
		<uni-drawer class='allPros' ref="allPros" mode="left" :mask-click="true" @close="closeAll()">
			<scroll-view style="height: 100%;" scroll-y="true">
				<view class="class-one t-c" @click="clickAll">全部</view>
				<view class='list'>
					<view ref="border1" v-for="(c1,index) in classAll" :key="index" class="border1"
						:style="{maxHeight:c1.choose?'1000rpx':'80rpx'}">
						<view class='class-one t-c' :class="{'active':c1.choose}" @click="classChoose(c1,index)">
							{{c1.name}}
							<view class='tri tri-b' v-if='!c1.choose'></view>
							<view class='tri tri-w' v-if='c1.choose'></view>
						</view>

						<view ref="border2" v-for="(c2,idx) in c1.list" :key="idx" class="border2"
							:style="{maxHeight:c2.choose? '1000rpx':'80rpx'}">
							<view class='class-two t-c' :class="{'active':c2.choose}" @click="classChoose(c2,idx)">
								{{c2.name}}
								<view class='tri tri-b' v-if='!c2.choose'></view>
								<view class='tri tri-w' v-if='c2.choose'></view>
							</view>

							<view ref="border3" v-for="(c3,i) in c2.list" :key="i" class="border3">
								<view class='class-three t-c' :class="{'active':c3.choose}" @click="classChoose(c3,i)">
									{{c3.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="submit" @click="submit">
					<view class="btn t-c">确认</view>
				</view>
			</scroll-view>
		</uni-drawer>

		<!-- 5. 底部操作 -->
		<view class='control' ref="cabinetControl" v-show="controlShow">
			<view class="control-left" @click="chooseAll">
				<view class="circle-out">
					<view class="circle-in" v-show="selectAll">
					</view>
				</view>
				<text class="txt">全选</text>
			</view>
			<view class="control-right">
				<view @click="goDeal()" class="btn t-c">发布交易</view>
				<view @click="goRecover()" class="btn t-c">申请回收</view>
				<view @click="goShip()" class="btn t-c">申请发货</view>
			</view>
		</view>

		<!-- 6. 回收 -->
		<uni-popup ref='recover' class="recover" type="bottom" @maskClick="closeRecover">
			<view class="recover-title t-c">回收</view>
			<view class="recover-list">
				<view class="border" v-for="(item,index) in curList" :key="index"
					v-show="item.deliveryStatus==0 && item.readyRecover==1">
					<view class="recover-list-left">
						<img class='pic' :src='item.imgUrl' alt="">
					</view>
					<view class="recover-list-right">
						<view class="name">{{ item.productItemName }}</view>
						<view class="price"><text class="rmb">￥</text>{{ item.recoverPrice }}</view>
					</view>
				</view>
			</view>
			<view class="recover-bottom">
				<view class="recover-bottom-left">
					可回收 :
					<text class="point">{{ recoverPoint }}</text>
					<text class="sx"> 手信</text>
				</view>
				<view class="recover-bottom-right t-c" @click='confirmRecover'>
					回收
				</view>
			</view>
		</uni-popup>

		<!-- 7. 发货 -->
		<uni-popup ref='ship' class="ship" type="bottom" @maskClick="closeShip">
			<view class="ship-title t-c">发货</view>
			<view class="ship-address">
				<view class="address-bg">
					<text class='address-name'>{{address.customerName}}</text>
					<text class="address-phone">{{address.phone}}</text>
					<view class="address-location">
						{{address.province}}{{address.city}}{{address.area}}{{address.detail}}
					</view>
				</view>
				<view class="arrow-right" @click="toAddress"><img class='pic'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/right.png" alt=""></view>
			</view>
			<view class="ship-list">
				<view class="border" v-for="(item,index) in cabinetList" :key="index"
					v-show="item.deliveryStatus==11 && item.choose">
					<view class="ship-list-left">
						<img class='pic' :src='item.imgUrl' alt="">
					</view>
					<view class="ship-list-right">
						<view class="name">{{ item.productItemName }}</view>
						<view class="price"><text class="rmb">￥</text>{{ item.price }}</view>
					</view>
				</view>
			</view>
			<view class="ship-bottom">
				<view class="ship-bottom-left">
					共
					<text class="pros">{{ products }}</text> 件商品
				</view>
				<view class="ship-bottom-right t-c" @click='checkShip'>
					发货
				</view>
			</view>
		</uni-popup>

		<!-- 8. 选择地址 -->
		<uni-popup ref='addressList' class="addlist" type="bottom" @maskClick="closeShip">
			<view class="addlist-title t-c">送货地址</view>
			<view class="address-list">
				<view class="border" v-for="(item,index) in addressList" :key="index" @click="addressClick(index)"
					:class="{'active':item.active}">
					<view>
						<text class="name">{{ item.customerName }}</text>
						<text class="phone">{{item.phone}}</text>
					</view>
					<view style="margin-top: 15rpx;">
						<text class="default t-c" v-show="item.flagDefault">默认</text>
						<text class="location">{{item.province}}{{item.city}}{{item.area}}{{item.detail}}</text>
					</view>
				</view>
			</view>
			<view class="addlist-bottom">
				<view class="addlist-bottom-left t-c" @click='newAddress'>
					新建
				</view>
				<view class="addlist-bottom-right t-c" @click='confirmAddress'>
					确定
				</view>
			</view>
		</uni-popup>

		<!-- 9.提示框 -->
		<view class="popup-alert">
			<uni-popup ref="alert" type="center">
				<view class="popup-title t-c">
					<text>{{msgTitle}}</text>
				</view>
				<view class="popup-center t-c">
					<text>{{msgContent}}</text>
				</view>
				<view class="popup-bottom">
					<button class="btn" v-if="!hasPre" type='primary' @click="confirmShip">确认</button>
					<button class="btn" v-if="hasPre" type='primary' @click="alertClose">确认</button>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		name: "cabinet",
		props: {
			pageIndex: {
				type: Number,
				default: 0,
			},
			getData: {
				type: Object,
				default: {}
			},
			fake: {
				type: Array,
				default: []
			},
			totalPage: {
				type: Number,
				default: 1
			},
			token: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				items: ['全部', '现货', '预售', '单品'],
				styles: [{
						value: 'button',
						text: '按钮',
						checked: true
					},
					{
						value: 'text',
						text: '文字'
					}
				],
				colors: ['#FDA804', '#4cd964', '#dd524d'],
				current: 0,
				colorIndex: 0,
				activeColor: '#F9B002',
				styleType: 'text',
				cabinetList: [],
				timeIndex: 0,
				timeImg: [
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/default.png',
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/up.png',
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png'
				],
				curTime: '',
				small: false,
				update: true,
				showBag: false,
				doSelect: false,
				controlShow: false,
				selectAll: false,
				changeArr: [],
				recoverShow: false,
				recoverPoint: 0,
				products: 0,
				address: {},
				addressList: [],
				applyShip: [],
				classAll: [],
				classAllBtn: false,
				hasConditions: false,
				status: 'more',
				pageNo: 1,
				contentText: {
					contentdown: '点击展示更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				curList: [],
				msgTitle: '提示',
				msgContent: '申请发货后不可撤销！',
				hasPre: false
			};
		},
		onShow() {
			this.doSelect = false;
			// #ifdef H5
			this.curList = this.fake
			console.log(this.curList);
			// #endif
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			showAll() {
				this.$refs.allPros.open();
			},
			closeAll() {
				this.$refs.allPros.close();
			},
			classChoose(item, index) {
				item.choose = !item.choose;
			},
			clickAll() {
				this.closeAll();
				this.$emit('update')
			},
			submit() {
				var arr = [];
				var that = this;
				var num = 0;
				this.classAll.forEach(function(c1, index) {
					c1.list.forEach(function(c2, idx) {
						c2.list.forEach(function(c3, i) {
							num++;
							if (c3.choose) {
								arr.push(c3.class3Code);
							}
						})
					})
				});
				console.log(arr);
				that.hasConditions = arr.length == num ? false : true;
				if (arr.length == 0) {
					uni.showToast({
						title: '请选择三级分类',
						icon: 'none'
					})
				} else {
					console.log('条件', arr);
					that.curList = [];
					that.cabinetList.forEach(function(item, index) {
						arr.forEach(function(c3) {
							if (item.class3Code == c3) {
								that.curList.push(item);
							}
						})
					})
					that.closeAll();
					that.forceupdate();
				}
			},
			timeSwitch() {
				var that = this;
				if (that.timeIndex == 2) {
					that.timeIndex = 0;
					that.small = false;
				} else {
					that.timeIndex++;
					that.small = true;
				}
				this.curList.forEach((item)=>{
					let t=new Date(item.takeTime.replace(/\-/g, "/"));
					item.takeDate=t.getTime();
				})
				switch (that.timeIndex) {
					case 1:
						that.curList.sort(function(a, b) {
							return a.takeDate -b. takeDate
						});
						break;
					case 2:
						that.curList.sort(function(a, b) {
							return b.takeDate -a. takeDate
						});
						break;
					case 0:
						that.curList.sort(function(a, b) {
							return a.itemType - b.itemType
						});
						break;
				}
			},
			select() {
				var that = this;
				that.doSelect = !that.doSelect;
				that.controlShow = !that.controlShow;
			},
			selectItem(item) {
				if (this.doSelect) {
					item.choose = !item.choose;
				}
			},
			goBag() {
				uni.navigateTo({
					url: '/pages/category/bag'
				})
			},
			forceupdate() {
				this.update = false;
				this.update = true;
			},
			chooseAll() {
				var that = this;
				that.selectAll = !that.selectAll;
				for (let i = 0; i < that.curList.length; i++) {
					if (that.curList[i].deliveryStatus == 0) {
						that.curList[i].choose = that.selectAll;
					}
				}
			},
			verify() {
				var that = this;
				let arr = [];
				for (let i = 0; i < that.cabinetList.length; i++) {
					if (that.cabinetList[i].choose) {
						arr.push(that.cabinetList[i]);
					}
				}
				if (arr.length > 0) {
					return true
				} else {
					uni.showToast({
						title: '请选择',
						icon: 'none'
					});
					return false
				}
			},
			goPackage() {
				var that = this;
				if (this.verify()) {
					for (let i = 0; i < that.cabinetList.length; i++) {
						if (that.cabinetList[i].choose) {
							// that.cabinetList[i].productItemPosition = '20';
							that.changeArr.push(that.cabinetList[i].userProductCode);
						}
					}
					console.log(that.changeArr);
					uni.request({
						url: 'http://123.60.71.74:20001/' + 'mh/user/product/bag/in' + '?userProductCodeList=' +
							this.changeArr.join(','),
						method: "PUT",
						header: {
							'token': this.token,
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							console.log(res);
							this.$nextTick(
								function() {
									that.$emit("update");
								}
							);
						}
					})
					this.complete();
				}
				console.log('放进背包', this.changeArr);
				this.changeArr = [];
			},
			goDeal() {
				var that = this;
				if (this.verify()) {
					for (let i = 0; i < that.curList.length; i++) {
						if (that.curList[i].choose) {
							that.curList[i].isdeal = true;
							that.curList[i].choose = false;
							that.changeArr.push(that.curList[i]);
						}
					}
					this.complete();
					console.log('发布交易', this.changeArr);
					uni.navigateTo({
						url: '/pages/category/publish'
					})
				}
				this.changeArr = [];
			},
			goRecover() {
				var that = this;
				that.changeArr = [];
				if (this.verify()) {
					that.$refs.recover.open('bottom');
					var total = 0;
					for (let i = 0; i < that.curList.length; i++) {
						if (that.curList[i].choose) {
							that.curList[i].readyRecover = 1;
							total += Number(that.curList[i].recoverPrice);
							that.changeArr.push(that.curList[i].userProductCode)
						}
					}
					// console.log(that.changeArr.join(','));
					that.recoverPoint = total;
					this.complete();
				}
			},
			closeRecover() {
				for (let i = 0; i < this.curList.length; i++) {
					this.curList[i].flagRecovery = 0;
				}
			},
			confirmRecover() {
				var that = this;
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/product/recover' + '?userProductCodeList=' + this
						.changeArr.join(','),
					method: "PUT",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': this.token
					},
					success: (res) => {
						console.log(res)
					}
				})
				this.$refs.recover.close();
				this.$emit("update");
				this.$nextTick(
					function() {
						that.$emit("update");
					}
				);
			},
			goShip() {
				var that = this;
				this.getAddress();
				if (this.verify()) {
					that.$refs.ship.open('bottom');
					var total = 0;
					for (let i = 0; i < that.cabinetList.length; i++) {
						if (that.cabinetList[i].choose) {
							that.cabinetList[i].deliveryStatus = 11;
							total++;
						}
					}
					that.products = total;
					this.complete();
				}
			},
			closeShip() {
				var that = this;
				for (let i = 0; i < that.cabinetList.length; i++) {
					if (that.cabinetList[i].deliveryStatus == 11) {
						that.cabinetList[i].deliveryStatus = 0;
					}
				}
			},
			checkShip() {
				var arr = [];
				this.cabinetList.forEach((item) => {
					if (item.choose) {
						arr.push(item)
					}
				})
				arr.forEach((item) => {
					while (item.flagPreSale) {
						this.hasPre = true;
						this.msgContent = '预售商品不可申请发货！'
						break
					}
				})
				this.$refs.alert.open('center');
			},
			confirmShip() {
				var that = this;
				var arr = [];
				for (let i = 0; i < that.cabinetList.length; i++) {
					if (that.cabinetList[i].choose) {
						that.cabinetList[i].deliveryStatus = 1;
						arr.push(that.cabinetList[i].userProductCode);
						that.cabinetList[i].choose = false;
					}
				}
				that.applyShip = arr;
				console.log('确认申请', that.applyShip);
				uni.request({
					url: 'http://123.60.71.74:20001/' + 'mh/user/product/delivery/apply' +
						'?userProductCodeList=' +
						this.applyShip.join(','),
					method: "PUT",
					header: {
						'token': this.token,
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						console.log(res);
						this.$nextTick(
							function() {
								that.$emit("update");
							}
						);
					}
				})
				that.$refs.ship.close();
			},
			toAddress() {
				this.$refs.ship.close();
				this.$refs.addressList.open('bottom');
			},
			complete() {
				this.doSelect = false;
				this.controlShow = false;
				this.selectAll = false;
			},
			newAddress() {
				uni.navigateTo({
					url: '/pages/user/address'
				})
			},
			confirmAddress() {
				this.$refs.addressList.close();
				this.$refs.ship.open('bottom');
			},
			addressClick(index) {
				var that = this;
				this.addressList.forEach(function(item) {
					item.active = false;
					that.addressList[index].active = true;
				});
				this.address = this.addressList[index];
			},
			loadClass() {
				var list = this.cabinetList;
				var that = this;
				var arr = [];
				list.forEach(function(item) {
					if (item.productItemPosition == 10 && !item.flagRecovery) {
						arr.push(item)
					}
				});
				var arr1 = [];
				for (let i = 0; i < arr.length; i++) {
					var obj1 = new Object();
					obj1.name = arr[i].class1Name;
					obj1.class1Code = arr[i].class1Code;
					obj1.choose = false;
					obj1.class = 'c1';
					obj1.list = [];
					arr1.push(obj1);
					that.checkRepeat(arr1);
					for (let j = 0; j < arr.length; j++) {
						var obj2 = new Object();
						obj2.name = arr[j].class2Name;
						obj2.class2Code = arr[j].class2Code;
						obj2.choose = false;
						obj2.class = 'c2';
						obj2.list = [];
						if (arr[i].class1Code == arr[j].class1Code) {
							obj1.list.push(obj2);
						}
						that.checkRepeat(obj1.list);
						for (let k = 0; k < arr.length; k++) {
							var obj3 = new Object();
							obj3.name = arr[k].class3Name;
							obj3.class3Code = arr[k].class3Code;
							obj3.class = 'c3';
							obj3.choose = false;
							if (arr[j].class2Code == arr[k].class2Code) {
								obj2.list.push(obj3);
							}
							that.checkRepeat(obj2.list);
						}
					}
				}
				console.log(arr1);
				this.classAll = arr1
			},
			checkRepeat(arr) {
				for (let i = 0; i < arr.length; i++) {
					for (let n = i + 1; n < arr.length; n++) {
						if (arr[i].name === arr[n].name) {
							arr.splice(n, 1);
							n--;
						}
					}
				}
			},
			loadMore(e) {
				var that = this;
				// console.log(this.token);
				if (this.pageNo < this.totalPage) {
					that.pageNo++;
					this.status = 'loading';
					uni.request({
						url: "http://123.60.71.74:20001/" + "mh/user/product/page",
						method: "GET",
						dataType: "JSON",
						header: {
							'token': that.token
						},
						data: {
							no: that.pageNo,
							size: 10
						},
						success: res => {
							let data = JSON.parse(res.data);
							// console.log(data.data.list);
							data.data.list.forEach(function(item) {
								that.cabinetList.push(item);
								that.curList.push(item);
							});
							that.status = 'more'
						}
					});
				} else {
					this.status = 'noMore';
				}
			},
			getAddress() {
				uni.request({
					url: "http://123.60.71.74:20001/" + "/mh/user/address/list",
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					success: res => {
						let data = JSON.parse(res.data);
						this.addressList = data.data;
						console.log(this.addressList);
						this.address = this.addressList[0];
					}
				});
			},
			imgPreview(item) {
				const arr = [];
				arr.push(item.imgUrl);
				if (!this.doSelect) {
					uni.previewImage({
						urls: arr
					})
				}

			},
		},
		mounted() {
			if (this.totalPage == 1) {
				this.status = 'noMore'
			}
		},
		watch: {
			getData: function(newVal, oldVal) {
				console.log('列表更新', newVal);
				this.cabinetList = [];
				this.cabinetList = this.cabinetList.concat(newVal);
				this.curList = [];
				this.curList = this.curList.concat(newVal);
				this.forceupdate();
				this.curList.sort(function(a, b) {
					return a.itemType - b.itemType
				});
				// this.addressList=newVal.address;
				// this.address = this.addressList[0];
			},
			cabinetList: function(newVal) {
				this.loadClass()
			},
			pageIndex: function(newVal) {
				this.doSelect = false
			}
		}
	}
</script>

<style lang="scss">
	.head {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-content: center;
		padding: 20rpx 70rpx 0;
		height: 60rpx;
		border-radius: 45rpx 45rpx 0 0;
		box-shadow: 0 -5rpx 5rpx rgba(0, 0, 0, 0.05);

		.all-category,
		.time-in,
		.select {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: center;

			.txt {
				white-space: nowrap;
				font-size: 26rpx;
				color: #020202;
			}
		}

		.all-category {
			.pic {
				width: 12rpx;
				height: 6rpx;
				margin-left: 10rpx;
			}
		}

		.time-in {
			.pic {
				width: 12rpx;
				height: 16rpx;
				margin-left: 10rpx;
			}

			.pic_2 {
				height: 6rpx !important;
			}
		}

		.select {
			.line {
				border-left: 2rpx solid #DCDCDC;
				width: 0;
				height: 40rpx;
			}

			.pic {
				width: 19rpx;
				height: 21rpx;
				margin-left: 20rpx;
				margin-right: 11rpx;
			}

			.selecting {
				color: #FF553F;
			}
		}
	}

	.allPros {

		.class-one {
			margin: 30rpx auto 40rpx;
			width: 440rpx;
			height: 80rpx;
			border: 1rpx solid #F9B002;
			background-color: #FDF5E2;
			font-size: 26rpx;
			color: #020202;
			line-height: 78rpx;
			border-radius: 10rpx;
			position: relative;
		}

		.list {
			padding-bottom: 100rpx;

			.class-one {
				margin-top: 0;
				margin-bottom: 20rpx;
			}
		}

		.border1 {
			margin-bottom: 40rpx;
			overflow: hidden;
			transition: max-height 0.5s ease;
			transition-delay: 0;
			max-height: 80rpx;
		}

		.border2 {
			overflow: hidden;
			transition: max-height 0.5s ease;
			transition-delay: 0;
			margin-bottom: 20rpx;
			max-height: 80rpx;

			&:last-child {
				margin-bottom: 0 !important;
			}
		}

		.border3 {
			margin-top: 20rpx;

			&:last-child {
				margin-bottom: 0 !important;
			}
		}

		.active {
			background-color: #F9B002 !important;
			color: #fff;
		}

		.act {
			height: 100%;
		}

		.class-two {
			@extend .class-one;
			margin-bottom: 0 !important;
			background-color: #fff;
		}

		.class-three {
			@extend .class-two;
			margin-bottom: 0 !important;
			width: 400rpx;
			transform: translateX(20rpx);

		}

		.tri {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-5rpx);
			width: 0;
			height: 0;
			border: 10rpx solid transparent;
		}

		.tri-b {
			border-top-color: #020202;
		}

		.tri-w {
			border-bottom-color: #fff;
			transform: translateY(-15rpx);
		}

		.submit {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 500rpx;
			height: 100rpx;
			border-top: 1rpx solid #F7F7F7;
			background-color: #fff;

			.btn {
				width: 340rpx;
				height: 68rpx;
				line-height: 68rpx;
				background-color: #F9B002;
				color: #fff;
				border-radius: 34rpx;
				font-size: 26rpx;
				margin: 16rpx auto;
			}
		}
	}

	.goods-area {
		margin-top: 35rpx;
		padding: 0 70rpx;

		.goods-sort {
			justify-content: space-between;
		}
	}

	::v-deep.goods-area .segmented-control__item {
		flex: unset;

		.segmented-control__text {
			font-size: 26rpx;
		}
	}

	.cabinet-list {
		padding: 20rpx 35rpx 100rpx;

		.box {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;

			.border {
				width: 160rpx;
				height: 220rpx;
				margin: 0 5rpx;
				position: relative;
				border-radius: 10rpx;
				overflow: hidden;

				.pic {
					height: 160rpx;
					border-radius: 10rpx;
					overflow: hidden;
					border: 1rpx solid #F9B002;
					box-sizing: border-box;
				}

				.type {
					position: absolute;
					top: 0;
					left: 0;
					width: 54rpx;
					height: 54rpx;
					background-color: #020202;
					border-radius: 10rpx;
					color: #F9B002;
					font-size: 34rpx;
					line-height: 54rpx;
					font-weight: bold;
				}

				.name {
					font-size: 22rpx;
					color: #636363;
					line-height: 44rpx;
					display: block;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}

				.choosen {
					width: 160rpx;
					height: 160rpx;
					position: absolute;
					top: 0;
					left: 0;
					background-color: rgba(0, 0, 0, 0.5);

					.pic_choose {
						position: absolute;
						width: 46rpx;
						height: 32rpx;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.pre {
					position: absolute;
					right: 0;
					top: 130rpx;
					width: 54rpx;
					height: 30rpx;
					line-height: 30rpx;
					background-color: #FDF5E2;
					color: #F5CB2B;
					border-radius: 0 0 10rpx 0;
					font-size: 20rpx;
					text-align: center;
				}
			}
		}
	}

	.control {
		position: fixed;
		bottom: 0;
		left: 0;
		border-top: 1rpx solid #FAFAFA;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		width: 100%;
		height: 90rpx;
		background-color: #fff;

		.control-left {
			display: inline-flex;
			align-items: center;

			.circle-out {
				width: 35rpx;
				height: 35rpx;
				border: 1rpx solid #FF553F;
				background-color: #FCE7DE;
				border-radius: 50%;
				position: relative;
				margin-right: 5rpx;

				.circle-in {
					position: absolute;
					width: 15rpx;
					height: 15rpx;
					background-color: #FF553F;
					border-radius: 50%;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.txt {
				font-size: 22rpx;
				color: #9C9C9C;
				line-height: 35rpx;
			}
		}

		.control-right {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;

			.btn {
				width: 160rpx;
				height: 68rpx;
				line-height: 68rpx;
				border-radius: 34rpx;
				background-color: #FCE7DE;
				font-size: 22rpx;
				color: #FF553F;
				margin-left: 15rpx;
			}
		}
	}

	.bag {
		position: fixed;
		z-index: 50;
		right: 10rpx;
		bottom: 160rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: #FDF5E2;

		.pic {
			position: absolute;
			top: 26rpx;
			left: 26rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}

	::v-deep .recover .uni-popup__wrapper,
	::v-deep .ship .uni-popup__wrapper {
		height: 850rpx;
	}

	.recover {
		width: 100%;
		background-color: #fff;
		height: 850rpx;

		.recover-title {
			color: #000;
			font-size: 28rpx;
			background-color: #fff;
			border-radius: 30rpx 30rpx 0 0;
			padding: 25rpx 0 30rpx;
		}

		.recover-list {
			height: 665rpx;
			overflow-y: scroll;
			background-color: #fff;
			padding-bottom: 100rpx;

			.border {
				width: 100%;
				border-bottom: 1rpx solid #E7E7E6;
				height: 200rpx;
				padding: 20rpx 60rpx 0 30rpx;
			}

			.recover-list-left {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				float: left;
				margin-right: 25rpx;
			}

			.recover-list-right {
				.name {
					font-size: 28rpx;
					height: 88rpx;
					line-height: 44rpx;
					color: #020202;
				}

				.price {
					margin-top: 25rpx;
					font-size: 34rpx;
					color: #F9B002;

					.rmb {
						font-size: 30rpx;
					}
				}

			}
		}

		.recover-bottom {
			display: flex;
			justify-content: space-between;
			padding: 0 60rpx 0 30rpx;
			align-items: center;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			border-top: 1rpx solid #F7F7F7;
			background-color: #fff;

			.recover-bottom-left {
				font-size: 24rpx;
				color: #7B7B7B;

				.point {
					font-size: 38rpx;
					color: #F9B002;
				}

				.sx {
					font-size: 26rpx;
					color: #000000;
				}
			}

			.recover-bottom-right {
				width: 340rpx;
				height: 68rpx;
				font-size: 26rpx;
				color: #fff;
				line-height: 68rpx;
				border-radius: 34rpx;
				background-color: #F9B002;
			}
		}
	}

	.ship {
		@extend .recover;

		.ship-title {
			@extend .recover-title;
			padding-bottom: 10rpx;
		}

		.ship-list {
			@extend .recover-list;
		}

		.ship-list-left {
			@extend .recover-list-left;
		}

		.ship-list-right {
			@extend .recover-list-right;
		}

		.ship-bottom {
			@extend .recover-bottom;
		}

		.ship-bottom-right {
			@extend .recover-bottom-right;
		}

		.ship-bottom-left {
			font-size: 24rpx;
			color: #7B7B7B;

			.pros {
				font-size: 30rpx;
				color: #020202;
			}
		}

		.ship-address {
			background-color: #fff;
			padding: 0 20rpx;
			position: relative;
			width: 100%;
			height: 125rpx;

			.address-bg {
				height: 125rpx;
				border-radius: 10rpx;
				background-color: #F9F8F8;
				padding: 10rpx 60rpx 10rpx 20rpx;
			}

			.address-name {
				font-size: 28rpx;
				color: #000;
			}

			.address-phone {
				font-size: 24rpx;
				color: #7D7D7D;
				margin-left: 20rpx;
			}

			.address-location {
				font-size: 24rpx;
				color: #020202;
			}

			.arrow-right {
				position: absolute;
				right: 40rpx;
				top: 50%;
				width: 14rpx;
				height: 22rpx;
				transform: translateY(-50%);
			}
		}
	}

	.addlist {
		@extend .recover;

		.addlist-title {
			@extend .recover-title;
			padding-bottom: 10rpx;
		}

		.address-list {
			width: 100%;
			height: 680rpx;
			background-color: #fff;
			overflow-y: auto;
			padding-bottom: 80rpx;

			.active {
				background-color: #f5f5f5;
			}

			.border {
				width: 100%;
				height: 200rpx;
				border-bottom: 1rpx solid #F1F1F1;
				padding: 30rpx;

				.name {
					font-size: 28rpx;
					color: #020202;
					margin-right: 35rpx;
					line-height: 40rpx;
				}

				.phone {
					font-size: 24rpx;
					color: #9F9E9E;

				}

				.default {
					background-color: #FDF5E2;
					font-size: 20rpx;
					color: #F9B002;
					border-radius: 10rpx;
					float: left;
					width: 60rpx;
					height: 28rpx;
					margin-right: 10rpx;
					margin-top: 4rpx;
				}

				.location {
					font-size: 26rpx;
					color: #6B6B6B;
				}
			}
		}

		.addlist-bottom {
			@extend .recover-bottom;

			.addlist-bottom-right {
				@extend .recover-bottom-right;
			}

			.addlist-bottom-left {
				width: 260rpx;
				height: 68rpx;
				line-height: 68rpx;
				border-radius: 34rpx;
				font-size: 24rpx;
				color: #fff;
				background-color: #7B7B7B;
			}
		}
	}

	.popup-alert {
		.popup-title {
			font-size: 28rpx;
			color: #020202;
			line-height: 42rpx;
		}

		.popup-bottom {
			margin: 65rpx auto 0;

			.btn {
				background-color: #FDB302 !important;
				height: 68rpx;
				font-size: 26rpx;
				line-height: 68rpx;
				width: 320rpx;
				border-radius: 10rpx;
			}
		}
	}
</style>
