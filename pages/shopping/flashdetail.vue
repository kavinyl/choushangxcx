<template>
	<view>
		<view class="detail-head">
			<view class="pro-img"><img class="pic" :src="detail.imgUrl" alt=""></view>
			<view class="pro-name">
				{{detail.name}}
			</view>
			<view class="pro-class">
				{{detail.class2}}-{{detail.class3}}
			</view>
			<view class="pro-has">
				我拥有{{userHas}}个
			</view>
			<view class="buttons">

				<view @click="flashBuy" class="btn f-buy t-c" :class="{'disabled':!userHas}">￥{{lowPrice}} 购买</view>
				<view @click="flashSell" class="btn f-sell t-c" :class="{'disabled':!userHas}">￥{{highPrice}} 出售</view>
			</view>
		</view>
		<view class="prices-area">
			<view class="prices-top">
				<view class="low-price">
					最低出售 ￥ {{lowPrice}}
				</view>
				<view class="line">

				</view>
				<view class="high-price">
					最高收购 ￥ {{highPrice}}
				</view>
			</view>
			<view class="prices-center">
				<view class="prices-center-left">
					<view class="title">
						当前在售
					</view>
					<scroll-view class="box" scroll-y="true">
						<view class="border" v-for="(item,index) in selling" :key="index">
							<view class="img"><img class='pic' :src="item.imgUrl" alt=""></view>
							<view class="price">￥{{item.price}} </view>
							<view class="amount t-r">×{{item.amount}}</view>
						</view>
					</scroll-view>

				</view>
				<view class="line"></view>
				<view class="prices-center-right">
					<view class="title">
						当前收购
					</view>
					<scroll-view class="box" scroll-y="true">
						<view class="border" v-for="(item,index) in buying" :key="index">
							<view class="img"><img class='pic' :src="item.imgUrl" alt=""></view>
							<view class="price">￥{{item.price}} </view>
							<view class="amount t-r">×{{item.amount}}</view>
						</view>
					</scroll-view>

				</view>
			</view>
			<view class="prices-bottom">
				<view class="btn t-c" :class="{'disabled':userHas==0}" @click="releaseSell()">
					发布出售
				</view>
				<view class="btn t-c" @click="releaseBuy()">
					发布收购
				</view>
			</view>
		</view>
		<view class="charts-area">
			<view class="title">
				<img class='pic' src="/static/images/etc/data.png" alt="">
				<text class="txt">最近成交均价</text>
			</view>
			<view class="average">
				<view class="average-txt">
					过去一天成交均价 ￥ {{averageOneDay}}
				</view>
				<view class="average-txt">
					过去一周成交均价 ￥ {{averageOneDay}}
				</view>
			</view>
			<view class="charts-box">
				<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
			</view>
		</view>
		<view class="history-area">
			<view class="title">
				<img class='pic' src="/static/images/etc/clock.png" alt="">
				<text class="txt">最近成交历史</text>
			</view>
			<view class="history">
				<view class="border" v-for="(item,index) in historyLatest" :key="index">
					<view class="img">
						<img class='pic' :src="item.imgUrl" alt="">
					</view>
					<view class="name">
						{{item.anonymity}}
					</view>
					<view class="price">
						￥{{item.price}}
					</view>
					<view class="amount">
						×{{item.amount}}
					</view>
					<view class="time t-r">
						{{item.date}}
					</view>
				</view>
				<view class="more t-r" @click="viewMore">More &gt;</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 10, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					extra: {
						line: {
							type: "straight",
							width: 2
						}
					}
				},
				detail: {},
				userHas: 1,
				averageOneDay: 0,
				averageOneWeek: 0,
				selling: [],
				buying: [],
				lowPrice: 0,
				highPrice: 0,
				history: [],
				historyLatest: []
			}
		},
		methods: {
			getJson() {
				// 先从后台拿数据
				// #ifndef MP-WEIXIN
				uni.request({
					url: "/static/fake.json",
					method: "get",
					dataType: "JSON",
					success: res => {
						this.detail = res.data.flash[0];
						// console.log(this.chartData)
						this.chartData = res.data.ucharts;
						this.selling = res.data.selling;
						this.buying = res.data.buying;
						this.history = res.data.buying;
						this.historyFive();
						this.changeName();
						this.changeTime();
						this.getBestPrice();
					},
				});
				// #endif
				
			},
			test() {
				// console.log(this.chartData)
			},
			flashBuy() {
				if(this.selling.length){
					uni.navigateTo({
						url:'confirmBuy'
					})
				}
			},
			flashSell() {
				if(this.userHas>0){
					uni.navigateTo({
						url:'confirmSell'
					})
				}
			},
			releaseBuy() {
				uni.navigateTo({
					url:'releaseBuy'
				})
			},
			releaseSell() {
				uni.navigateTo({
					url:'releaseSell'
				})
			},
			getBestPrice() {
				this.selling.sort(function(a, b) {
					return a.price - b.price
				})
				this.lowPrice = this.selling[0].price;
				this.buying.sort(function(a, b) {
					return b.price - a.price
				})
				this.highPrice = this.buying[0].price;
			},
			historyFive() {
				this.history.sort(function(a, b) {
					return b.time - a.time
				})
				for (var i = 0; i < 5; i++) {
					this.historyLatest[i] = this.history[i]
				}
			},
			changeName() {
				this.historyLatest.forEach(function(item) {
					item.anonymity = item.name.replace(/./g, '*')+item.name.charAt(item.name.length-1)
					// console.log(item.anonymity)
				})
			},
			changeTime() {
				var now = new Date();
				this.historyLatest.forEach(function(item) {
					var a = now.getTime() - item.time;
					if (a >= 86400000 * 3) {
						var dt = new Date(Number(item.time));
						// console.log(dt.getMonth());
						item.date = dt.getMonth() + 1 + '/' + dt.getDate()
					} else if (a < 86400000 * 3 && a >= 86400000 * 2) {
						item.date = '三天前';
					} else if (a < 86400000 * 2 && a >= 86400000 * 1) {
						item.date = '昨天';
					} else if (a < 86400000) {
						item.date = '今天';
					}
				})
			},
			viewMore(){
				uni.navigateTo({
					url:'flashHistory'
				})
			}
		},
		onShow() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data;
					// console.log(this.token)
				},
				fail: (res) => {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '../../pages/user'
						})
					}, 1000)
				},
			});
			this.getJson();
			// #ifdef MP-WEIXIN
			this.selling = [{
					"imgUrl": "/static/images/admin.png",
					"price": "95.0",
					"amount": "1"
				},
				{
					"imgUrl": "/static/images/admin.png",
					"price": "95.0",
					"amount": "1"
				},
				{
					"imgUrl": "/static/images/admin.png",
					"price": "100.0",
					"amount": "1"
				}
			];
			this.buying = [{
					"imgUrl": "/static/images/admin.png",
					"price": "95.0",
					"amount": "1",
					"time": "1661238591000",
					"name": "sadasd"
				},
				{
					"imgUrl": "/static/images/admin.png",
					"price": "95.0",
					"amount": "1",
					"time": "1661239592000",
					"name": "啊实打实大苏打"
				},
				{
					"imgUrl": "/static/images/admin.png",
					"price": "100.0",
					"amount": "1",
					"time": "1661242593000",
					"name": "123"
				},
				{
					"imgUrl": "/static/images/admin.png",
					"price": "100.0",
					"amount": "1",
					"time": "1661146043000",
					"name": "阿斯顿525"
				},
				{
					"imgUrl": "/static/images/admin.png",
					"price": "85.0",
					"amount": "1",
					"time": "1660973243000",
					"name": "5a",
				}
			];
			this.chartData = {
				"categories": ["2016", "2017", "2018", "2019", "2020", "2021"],
				"series": [{
						"name": "闪购",
						"data": [35, 36, 31, 33, 13, 34]
					},
					{
						"name": "闪出",
						"data": [36, 31, 33, 13, 34, 35]
					}
				]
			};
			this.history = this.buying;
			this.detail = {
				"imgUrl": "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/shop/f1.png",
				"name": "十二星座白羊座",
				"class1": "大分类A",
				"class2": "分类a",
				"class3": "品类1"
			};
			this.historyFive();
			this.changeName();
			this.changeTime();
			this.getBestPrice();
			// #endif
		}
	}
</script>

<style lang="scss">
	.charts-box {
		width: 100%;
		height: 300px;
	}

	.detail-head {
		padding: 20rpx 30rpx;

		.pro-img {
			float: left;
			width: 200rpx;
			height: 200rpx;
			margin-right: 40rpx;
			border-radius: 15rpx;
			overflow: hidden;
		}

		.pro-name {
			font-size: 30rpx;
			color: #020202;
			margin-bottom: 5rpx;
		}

		.pro-class,
		.pro-has {
			font-size: 24rpx;
			color: #807F7F;
			margin-bottom: 20rpx;
		}

		.buttons {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;

			.btn {
				font-size: 22rpx;
				color: #FB9503;
				height: 56rpx;
				line-height: 56rpx;
				padding: 0 45rpx;
				background-color: #FEE8B4;
				border-radius: 28rpx;


			}

			.disabled {
				background-color: #F5f5f5;
				color: #8B8A8A;
			}

			.f-buy {
				background-color: #F9B002;
				color: #fff;
			}
		}
	}

	.prices-area {
		background-color: #FBFBFB;
		border-radius: 35rpx 35rpx 0 0;
		box-shadow: 0 -5rpx 5rpx rgba(0, 0, 0, 0.05);
		margin-top: 30rpx;
		padding-bottom: 20rpx;

		.prices-top {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;
			padding: 25rpx 90rpx;

			.low-price,
			.high-price {
				font-size: 26rpx;
				color: #020202;
			}

			.line {
				width: 1rpx;
				height: 22rpx;
				background-color: #B4B5B5;
			}
		}

		.prices-center {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 35rpx;

			.title {
				font-size: 22rpx;
				color: #5E5E5E;
				line-height: 30rpx;
			}

			.line {
				width: 1rpx;
				height: 255rpx;
				background-color: #EEEEEE;
				margin: 0 20rpx;
			}

			.prices-center-left,
			.prices-center-right {
				flex: 1;
				height: 265rpx;

				.box {
					height: 235rpx;
				}

				.border {
					display: flex;
					flex-wrap: nowrap;
					align-items: center;
					margin: 10rpx 0;

					.img {
						width: 35rpx;
						height: 35rpx;
						border-radius: 35rpx;
						overflow: hidden;
						margin-right: 10rpx;
					}

					.price {
						font-size: 24rpx;
						color: #595858;
					}

					.amount {
						flex: 1;
						margin-right: 10rpx;
						font-size: 24rpx;
						color: #595858;
					}
				}
			}
		}

		.prices-bottom {
			display: flex;
			flex-wrap: nowrap;
			align-items: center;
			justify-content: space-around;
			margin-top: 15rpx;

			.btn {
				width: 240rpx;
				height: 68rpx;
				background-color: #fff;
				border: 1rpx solid #DFDEDC;
				border-radius: 10rpx;
				line-height: 68rpx;
				font-size: 24rpx;
				color: #020202;
			}

			.disabled {
				background-color: #EEEEEE;
				color: #8B8A8A;
			}
		}
	}

	.charts-area {
		margin-top: 20rpx;
		padding: 35rpx 20rpx;
		background-color: #FBFBFB;

		.title {
			.pic {
				width: 48rpx;
				height: 48rpx;
				float: left;
				margin-right: 20rpx;
			}

			.txt {
				font-size: 28rpx;
				color: #020202;
				line-height: 48rpx;
			}
		}

		.average {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			padding: 0 50rpx;
			justify-content: space-between;
			margin: 50rpx 0 30rpx;

			.average-txt {
				font-size: 24rpx;
				color: #6E6D6D;
			}
		}
	}

	.history-area {
		margin-top: 20rpx;
		padding: 35rpx 30rpx;
		background-color: #FBFBFB;

		.title {
			.pic {
				width: 48rpx;
				height: 48rpx;
				float: left;
				margin-right: 20rpx;
			}

			.txt {
				font-size: 28rpx;
				line-height: 48rpx;
				color: #020202;
			}
		}

		.history {
			margin-top: 30rpx;

			.border {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				height: 80rpx;
				border-bottom: 1rpx solid #E5E5E5;

				.img {
					width: 42rpx;
					height: 42rpx;
					border-radius: 21rpx;
					overflow: hidden;
					margin-right: 50rpx;
					margin-left: 20rpx;
				}

				.name {
					width: 170rpx;
					font-size: 26rpx;
					color: #020202;
				}

				.price {
					width: 160rpx;
					font-size: 24rpx;
					color: #020202;
				}

				.amount {
					font-size: 24rpx;
					color: #020202;
				}

				.time {
					font-size: 24rpx;
					color: #5E5E5E;
					flex: 1;
					margin-right: 15rpx;
				}
			}
		}

		.more {
			margin-top: 30rpx;
			font-size: 28rpx;
			color: #F9B002;
		}
	}
</style>
