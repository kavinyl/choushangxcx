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
				<text class="txt">抽赏日期</text>
				<img class="pic" :class="{'pic_2':small}" :src="timeImg[timeIndex]" alt="">
			</view>
			<view class="zhanwei" style="width: 75rpx;"></view>

		</view>
		<view class="order-list">
			<view class="total t-r">
				<text class="times">抽赏次数：{{totalTimes}}次</text>
				<text class="quality">抽赏抽数：{{totalQuality}}抽</text>
			</view>
			<view v-show="emptyList" class="empty">无数据</view>
			<view class="border" v-for="(item,index) in orders" :key="index">
				<view class="order-id">
					订单号: {{item.orderCode}}
				</view>
				<view class="tr">
					<text class="title">商品名称:</text>
					<text class="detail">{{item.productName}}</text>
				</view>
				<view class="tr">
					<text class="title">抽赏时间:</text>
					<text class="detail">{{item.makeTime}}</text>
				</view>
				<view class="tr">
					<text class="title">抽赏次数:</text>
					<text class="detail">{{item.lotteryTimes}}</text>
				</view>
				<view class="tr">
					<text class="title">抽赏金额:</text>
					<text class="detail">￥{{item.price}}</text>
				</view>
			</view>
			<uni-load-more :status="status" @clickLoadMore='loadMore' :contentText="contentText">
			</uni-load-more>
		</view>

		<uni-drawer class='allClass' ref="allClass" mode="left" :mask-click="true" @close="closeAll()">
			<uni-search-bar class="search" @confirm="search" v-model="searchVal" placeholder="请输入搜索内容" @input="input"
				cancelButton="none" @clear="clear">
			</uni-search-bar>
			<scroll-view style="height:calc(100% - 100rpx);" scroll-y="true">
				<view class="class-one class-all t-c" @click="clickAll">全部</view>
				<view class='list' v-if="!doSearch">
					<view ref="border1" v-for="(c1,index) in allClass" :key="index" class="border1"
						:style="{maxHeight:c1.choose?'1000rpx':'80rpx'}">
						<view class='class-one t-c' :class="{'active':c1.choose}" @click="classChoose(c1,index)">
							{{c1.class1Name}}
							<view class='tri tri-b' v-if='!c1.choose'></view>
							<view class='tri tri-w' v-if='c1.choose'></view>
						</view>

						<view ref="border2" v-for="(c2,idx) in c1.productClass2VoList" :key="idx" class="border2"
							:style="{maxHeight:c2.choose? '1000rpx':'80rpx'}">
							<view class='class-two t-c' :class="{'active':c2.choose}" @click="classChoose(c2,idx)">
								{{c1.class1Name}}-{{c2.class2Name}}
							</view>
						</view>
					</view>
				</view>

				<view class='list' v-if="doSearch">
					<view ref="border1" v-for="(c1,index) in searchClass" :key="index" class="border1"
						:style="{maxHeight:c1.choose?'1000rpx':'80rpx'}">
						<view class='class-one t-c' :class="{'active':c1.choose}" @click="classChoose(c1,index)">
							{{c1.class1Name}}
							<view class='tri tri-b' v-if='!c1.choose'></view>
							<view class='tri tri-w' v-if='c1.choose'></view>
						</view>

						<view ref="border2" v-for="(c2,idx) in c1.productClass2VoList" :key="idx" class="border2"
							:style="{maxHeight:c2.choose? '1000rpx':'80rpx'}">
							<view class='class-two t-c' :class="{'active':c2.choose}" @click="classChoose(c2,idx)">
								{{c1.class1Name}}-{{c2.class2Name}}
							</view>
						</view>
					</view>
				</view>
				<view class="submit" @click="submit">
					<view class="btn t-c">确认</view>
				</view>
			</scroll-view>
		</uni-drawer>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				hasConditions: false,
				timeImg: [
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/default.png',
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/up.png',
					'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/category/down.png'
				],
				small: false,
				timeIndex: 0,
				update: true,
				history: [],
				totalTimes: 0,
				totalQuality: 0,
				allClass: [],
				classList: [],
				searchVal: '',
				orders: [],
				emptyList: false,
				doSearch: false,
				searchClass: [],
				token: '',
				status: 'more',
				pageNo: 1,
				contentText: {
					contentdown: '点击展示更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				totalPage: 1
			}
		},
		onShow() {
			this.token=uni.getStorageSync('token')
			this.getJson()
		},
		onPullDownRefresh() {
			this.getJson();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "http://123.60.71.74:20001/" + 'mh/user/lottery/record/page',
					// #endif
					method: "GET",
					data: {
						no: 1,
						size: 10
					},
					header: {
						'token': this.token
					},
					// #ifdef H5
					success: res => {
						// console.log(res.data.list);
						this.history = res.data.user.history;
						this.allClass = res.data.allClass;
						// console.log(res.data.allClass)
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						this.history = res.data.data.list;
						this.orders = this.history;
						this.totalPage=res.data.data.totalPage;
						// console.log(this.history);
						// console.log(this.orders);
						// this.getClass();
					}
					// #endif
				});
			},
			getClass() {
				uni.request({
					url: "http://123.60.71.74:20001/" + 'mh/product/class/list',
					method: "GET",
					success: (res) => {
						this.allClass = res.data.data;
					}
				})
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
				this.orders.forEach((item)=>{
					let t=new Date(item.makeTime.replace(/\-/g, "/"));
					item.makeDate=t.getTime();
				})
				switch (that.timeIndex) {
					case 1:
						that.orders.sort(function(a, b) {
							return a.makeDate -b.makeDate
						});
						break;
					case 2:
						that.orders.sort(function(a, b) {
							return b.makeDate -a.makeDate
						});
						break;
					case 0:
						that.orders.sort(function(a, b) {
							return b.orderCode - a.orderCode
						});
						break;
				}
			},
			forceupdate() {
				this.update = false;
				this.update = true;
			},
			showAll() {
				this.$refs.allClass.open();
				this.loadClass()
			},
			closeAll() {
				this.$refs.allClass.close();
			},
			classChoose(item, index) {
				item.choose = !item.choose;
			},
			clickAll() {
				this.getJson();
				this.closeAll();
				this.forceupdate();
				this.doSearch = false;
				// console.log(this.history.orders);
			},
			submit() {
				var arr = [];
				var that = this;
				var num = 0;
				if (this.doSearch) {
					that.searchClass.forEach(function(c1, index) {
						c1.productClass2VoList.forEach(function(c2, idx) {
							num++;
							if (c2.choose) {
								arr.push(c2.class2Name);
							}
						})
					});
				} else {
					that.allClass.forEach(function(c1, index) {
						c1.productClass2VoList.forEach(function(c2, idx) {
							num++;
							if (c2.choose) {
								arr.push(c2.class2Name);
							}
						})
					});
				}

				// console.log(num);
				that.hasConditions = arr.length == num ? false : true;
				if (arr.length == 0) {
					uni.showToast({
						title: '请选择二级分类',
						icon: 'none'
					})
				} else {
					console.log('条件', arr);
					that.orders = [];
					that.orders.forEach(function(item, index) {
						arr.forEach(function(c, i) {
							if (item.class2Name == c) {
								that.orders.push(item);
							}
						})
					})
					// console.log(that.orders);
					this.allClass.forEach(function(c1, index) {
						c1.choose = false;
						c1.productClass2VoList.forEach(function(c2, idx) {
							c2.choose = false;
						})
					});
					that.closeAll();
					that.forceupdate();
					that.searchVal = ''
				}
			},
			search(res) {
				var that = this;
				this.doSearch = true;
				this.searchClass = [];
				var i = 0;
				this.allClass.forEach(function(item, index) {
					item.productClass2VoList.forEach(function(items, idx) {
						if (items.class2Name.indexOf(res.value) != -1) {
							that.searchClass.push({
								"name": item.class1Name,
								"choose": false,
								"productClass2VoList": []
							});
							that.searchClass[i].productClass2VoList.push({
								"name": items.class2Name,
								"choose": false,
							});
							console.log(that.searchClass[i])
							i++;
						}
					})
				})
			},
			input(res) {},
			clear(res) {
				this.doSearch = false;
			},
			loadClass() {
				var that = this;
				this.classList = [];
				this.allClass.forEach(function(item, index) {
					item.productClass2VoList.forEach(function(items, idx) {
						that.classList.push(items.class2Name)
					})
				})
				// console.log(this.classList)
			},
			loadMore(e) {
				var that = this;
				if (this.pageNo < this.totalPage) {
					that.pageNo++;
					this.status = 'loading';
					uni.request({
						url: "http://123.60.71.74:20001/" + "mh/user/lottery/record/page",
						method: "GET",
						header: {
							'token': that.token
						},
						data: {
							no: that.pageNo,
							size: 10
						},
						success: res => {
							// console.log(res.data.data.list);
							res.data.data.list.forEach(function(item) {
								that.history.push(item);
								that.orders.push(item);
							});
							that.status = 'more'
						}
					});
				} else {
					this.status = 'noMore';
				}
			},
		},
		mounted() {

		},
		watch: {
			history: function(newVal, oldVal) {
				this.getClass()
			},
			orders: function(newVal, oldVal) {
				var that = this;
				console.log(newVal);
				this.totalTimes = newVal.length;
				that.totalQuality = 0;
				for (let i = 0; i < this.orders.length; i++) {
					that.totalQuality += that.orders[i].lotteryTimes;
				}
				this.loadClass()
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
		padding: 20rpx 70rpx 20rpx;
		height: 60rpx;
		box-shadow: 0 5rpx 5rpx rgba(0, 0, 0, 0.05);

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

	.allClass {
		.search {
			//#ifndef MP-WEIXIN
			margin: 10rpx 20rpx;
			//#endif
		}

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

		.class-all {
			margin-top: 0;
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

	::v-deep .uni-searchbar__box {
		height: 60rpx !important;
	}

	::v-deep .uni-searchbar__cancel {
		line-height: 60rpx !important;
	}

	.order-list {
		padding: 0 20rpx;

		.total {
			margin: 15rpx 0 20rpx;
			font-size: 22rpx;
			color: #595858;

			.times {
				margin-right: 60rpx;
			}
		}

		.border {
			width: 100%;
			height: 360rpx;
			background-color: #F7F7F7;
			border-radius: 15rpx;
			margin-bottom: 20rpx;
			padding: 30rpx;

			.order-id {
				font-size: 28rpx;
				height: 60rpx;
				border-bottom: 1rpx solid #BFBFBF;
			}

			.tr {
				width: 100%;
				height: 36rpx;
				margin: 20rpx 0 30rpx;

				.title {
					font-size: 26rpx;
					color: #595858;
					line-height: 36rpx;
					margin-right: 50rpx;
				}

				.detail {
					font-size: 26rpx;
					color: #000;
					line-height: 36rpx;
				}
			}
		}
	}
</style>
