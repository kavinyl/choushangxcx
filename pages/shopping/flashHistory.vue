<template>
	<view>
		<view class="history-area">
			<view class="title">
				<img class='pic' src="/static/images/etc/clock.png" alt="">
				<text class="txt">最近成交历史</text>
			</view>
			<view class="history">
				<view class="border" v-for="(item,index) in historyList" :key="index">
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

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyList: [{
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
				]
			}
		},
		methods: {
			changeName() {
				this.historyList.forEach(function(item) {
					item.anonymity = item.name.replace(/./g, '*') + item.name.charAt(item.name.length - 1)
					// console.log(item.anonymity)
				})
			},
			changeTime() {
				var now = new Date();
				this.historyList.forEach(function(item) {
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
		},
		mounted(){
			this.changeName();
			this.changeTime()
		}
	}
</script>

<style lang="scss">
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

	}
</style>
