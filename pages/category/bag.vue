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
			<view class="select" @click='select'>
				<view v-show="!doSelect" class="line"></view>
				<img v-show="!doSelect" class="pic"
					src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/select.png" alt="">
				<text v-show="!doSelect" class="txt">筛选</text>
				<text v-show="doSelect" class="txt selecting">完成管理</text>
			</view>
		</view>

		<!-- 2. 列表 -->
		<view class="bag-list" v-show="update">
			<view v-for="(item,index) in curList" :key="index" class="border" @click="selectItem(item)"
				v-show="item.productItemPosition=='20'">
				<img class='pic' :src="item.imgUrl" alt="">
				<view class="type t-c">{{ item.itemTypeName }}</view>
				<text class='name'>{{ item.productItemName }}</text>
				<view class="choosen" v-show=" doSelect && item.choose&&!item.isdeal">
					<img class='pic_choose' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/gou.png"
						alt="">
				</view>
				<view class="dealing t-c" v-show="item.isdeal">
					交易中
				</view>
			</view>
		</view>
		<view class="t-c">-- 到底了！--</view>

		<!-- 3. 全部分类 -->
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
		<!-- 4. 底部操作 -->
		<view class='control' ref="bagControl" v-show="controlShow">
			<view class="control-left" @click="chooseAll">
				<view class="circle-out">
					<view class="circle-in" v-show="selectAll">
					</view>
				</view>
				<text class="txt">全选</text>
			</view>
			<view class="control-right">
				<view @click="goDeal()" class="btn t-c">发布交易</view>
				<view @click="goCabinet()" class="btn t-c">放回赏柜</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getData: [],
				bagList: [],
				curList: [],
				classAll: [],
				classAllBtn: false,
				hasConditions: false,
				timeImg: [
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/default.png',
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/up.png',
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png'
				],
				doSelect: false,
				small: false,
				timeIndex: 0,
				update: true,
				controlShow: false,
				selectAll: false,
				changeArr: [],
				token: '',
				totalPage: 1
			}
		},
		onShow() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data;
					this.getJson();
					// console.log(this.token)
				},
				fail: (res) => {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/user'
						})
					}, 1000)
				},
			});
		},
		methods: {
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "http://123.60.71.74:20001/" + 'mh/user/product/list',
					// #endif
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					// #ifdef H5
					success: res => {
						// console.log(res.data.list);
						this.getData = res.data.list;
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(res.data);
						let data = JSON.parse(res.data)
						this.getData = data.data;
						// this.totalPage = data.data.totalPage;
					}
					// #endif
				});
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
				uni.redirectTo({
					url: '/pages/category/bag'
				})
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
					console.log(that.getData);
					that.curList = [];
					that.bagList.forEach(function(item, index) {
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
				switch (that.timeIndex) {
					case 1:
						that.curList.sort(function(a, b) {
							return a.time - b.time
						});

						break;
					case 2:
						that.curList.sort(function(a, b) {
							return b.time - a.time
						});
						break;
					case 0:
						that.curList.sort(function(a, b) {
							return a.id - b.id
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
				if (this.doSelect && !item.isdeal) {
					item.choose = !item.choose;
				}
			},
			loadClass() {
				var that = this;
				var arr = [];
				this.bagList.forEach(function(item){
					if(item.productItemPosition==20){
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
				that.classAll = arr1;
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
			forceupdate() {
				this.update = false;
				this.update = true;
			},
			chooseAll() {
				var that = this;
				that.selectAll = !that.selectAll;
				for (let i = 0; i < that.bagList.length; i++) {
					that.bagList[i].choose = that.bagList[i].isdeal ? false : that.selectAll;
				}
			},
			verify() {
				var that = this;
				let arr = [];
				for (let i = 0; i < that.bagList.length; i++) {
					if (that.bagList[i].choose) {
						arr.push(that.bagList[i]);
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
			goCabinet() {
				var that = this;
				if (this.verify()) {
					for (let i = 0; i < that.bagList.length; i++) {
						if (that.bagList[i].choose) {
							// that.cabinetList[i].productItemPosition = '20';
							that.changeArr.push(that.bagList[i].userProductCode);
						}
					}
					console.log(that.changeArr);
					uni.request({
						url: 'http://123.60.71.74:20001/' + 'mh/user/product/case/in' + '?userProductCodeList=' +
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
									that.dataUpdate()
								}
							);
						}
					})
					this.complete();
				}
				console.log('放进赏柜', this.changeArr);
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
			complete() {
				this.doSelect = false;
				this.controlShow = false;
				this.selectAll = false;
			},
			dataUpdate() {
				this.getJson();
				this.forceupdate();
			}
		},
		mounted() {
			this.forceupdate();
		},
		watch: {
			getData: function(newVal, oldVal) {
				console.log('列表更新', newVal);
				this.bagList = [];
				this.bagList = this.bagList.concat(newVal);
				this.curList = [];
				this.curList = this.curList.concat(newVal);
				this.loadClass();
				this.curList.sort(function(a, b) {
					return a.id - b.id
				});
				// console.log(this.bagList);
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

	.bag-list {
		padding: 20rpx 35rpx 80rpx;
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

			.dealing {
				position: absolute;
				top: 0;
				left: 0;
				background-color: rgba(0, 0, 0, 0.5);
				font-size: 34rpx;
				color: #fff;
				line-height: 160rpx;
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
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
</style>
