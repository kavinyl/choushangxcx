<template>
	<view>
		<view v-show="!isquery">
			<view v-for="(item,index) in bill" :key="index" class="border">
				<view class="month">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						{{item.month}}
						<text class="arrow">
						</text>
					</picker>
				</view>
				<view class="total t-r">
					总支出：{{item.totalExpend}}
				</view>
				<view class="list">
					<view v-for="(items,idx) in item.userCurrencyHistoryVoList" :key="idx" class="line">
						<view class="date">{{items.dealTime}}</view>
						<view class="type">{{items.dealTypeName}}</view>
						<view class="amount">{{items.amount}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="isquery">
			<view class="border">
				<view class="month query">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						{{query.year}}年-{{query.month}}月-{{query.day}}日
						<text class="arrow">
						</text>
					</picker>
				</view>
				<view class="total t-r">
					总支出：{{queryTotal}}
				</view>
				<view class="list" v-show="update">
					<view v-for="(item,index) in bill" :key="index">
						<view class="line">
							<view class="date">{{item.dealTime}}</view>
							<view class="type">{{item.dealTypeName}}</view>
							<view class="amount">{{item.amount}}</view>
						</view>

					</view>
				</view>
			</view>
			<view class="nomore t-c">
				没有更多了~
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				bill: [],
				date: currentDate,
				isquery: false,
				query: [],
				quertTime: 0,
				queryTotal: 0,
				update: true
			}
		},
		onShow() {
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data;
					console.log(this.token);
					this.getJson();
				}
			});
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
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
					url: "http://123.60.71.74:20001/" + "/mh/user/currency/history/list/monthly",
					// #endif
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					// #ifdef H5
					success: res => {
						// console.log(res.data.user);
						this.bill = res.data.user.bill;
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						let data = JSON.parse(res.data)
						console.log(data);
						this.bill = data.data;
						this.changeDealType()
					}
					// #endif
				});
			},
			bindDateChange: function(e) {
				this.date = e.detail.value;
				this.billQuery()
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			billQuery() {
				console.log(this.date);
				var that = this;
				this.isquery = true;
				var arr = this.date.split("-");
				let d = new Date(this.date);
				this.queryTime = d.getTime();
				that.query.year = arr[0];
				that.query.month = arr[1];
				that.query.day = arr[2];
				that.query.list = [];
				that.queryTotal = 0;
				this.getDayList()
				// this.bill.forEach(function(item, index) {
				// 	item.list.forEach(function(items, idx) {
				// 		if (items.time - that.queryTime >= 0 && items.time - that.queryTime < 86400000) {
				// 			that.query.list.push(items);
				// 			that.queryTotal += Number(items.amount);
				// 		}
				// 	})
				// })
				this.forceupdate();
			},
			forceupdate() {
				this.update = false;
				this.update = true;
			},
			changeDealType() {
				var that = this;
				if (!this.isquery) {
					that.bill.forEach(function(item) {
						item.userCurrencyHistoryVoList.forEach(function(items) {
							switch (items.dealType) {
								case '10':
									items.dealTypeName = '交易';
									break;
								case '20':
									items.dealTypeName = '充值';
									break;
								case '30':
									items.dealTypeName = '提现';
									break;
							}
						})
					})
				} else if (this.isquery) {
					that.bill.forEach(function(item) {
						switch (item.dealType) {
							case '10':
								item.dealTypeName = '交易';
								break;
							case '20':
								item.dealTypeName = '充值';
								break;
							case '30':
								item.dealTypeName = '提现';
								break;
						}
					})
				}
			},
			getDayList() {
				uni.request({
					url: "http://123.60.71.74:20001/" + "mh/user/currency/history/list" + '?dealTime=' + this.date,
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					success: (res) => {
						let data = JSON.parse(res.data)
						console.log(data);
						this.bill = data.data;
						this.changeDealType()
					}
				})
			}
		},
		watch: {
			query: function(newVal, oldVal) {
				var that = this;
				that.queryTotal = 0;
				newVal.list.forEach(function(item) {
					if (item.type == "交易" || item.type == "提现") {
						console.log(Number(item.amount))
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.border {
		position: relative;
		margin: 20rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.month {
			font-size: 22rpx;
			color: #5E5E5E;
			width: 240rpx;
			height: 60rpx;
			line-height: 60rpx;
			background-color: #F7F7F7;
			border-radius: 30rpx;
			margin-left: 30rpx;
			position: relative;
			padding-left: 30rpx;

			.arrow {
				width: 0;
				height: 0;
				border: 10rpx solid transparent;
				border-top-color: #5E5E5E;
				position: absolute;
				top: 25rpx;
				right: 30rpx;
			}

			&.query {
				width: 280rpx;
			}
		}

		.total {
			font-size: 24rpx;
			color: #5E5E5E;
			line-height: 60rpx;
			flex: 1;
			margin-right: 30rpx;
		}

		.list {
			width: 100%;
			margin-top: 20rpx;
			background-color: #FEFEFD;
			border-top: 1rpx solid #F0F0F0;

			.line {
				padding: 30rpx;
				border-bottom: 1rpx solid #F0F0F0;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				justify-content: space-between;

				.date,
				.type,
				.amount {
					font-size: 24rpx;
					color: #020202;
				}

				.amount {
					width: 100rpx;
				}
			}
		}
	}

	.nomore {
		font-size: 22rpx;
		color: #5E5E5E;
	}
</style>
