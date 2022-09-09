<template>
	<view>
		<view class="bid-area">
			<view class="title">出价</view>
			<input type="number" placeholder="请输入金额" v-model="bidValue" class="input" @blur="blur">
		</view>
		<view class="tips">
			<text class="txt remain">余额：{{remain}} 手信</text>
			<text class="txt lowprice">最低出价：{{lowprice}}</text>
		</view>
		<view class="bottom">
			<view class="btn t-c" @click="submit" v-if="!isUpdate">
				确定
			</view>
			<view class="btn t-c" @click="update" v-if="isUpdate">
				更新出价
			</view>
			<view class="about" @click="toAbout">
				<text class="icon t-c">?</text>出价规则
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				remain: 30,
				lowprice: 10.0,
				bidValue: '',
				isUpdate: false
			}
		},
		methods: {
			submit() {
				if (this.check()) {
					uni.showToast({
						title: "出价成功！",
						icon: "success"
					})
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				}
			},
			blur(e) {
				this.bidValue = Math.floor(e.detail.value * 100) / 100;
				if (this.bidValue <= 0) {
					this.bidValue = 0;
					uni.showToast({
						title: "请输入充值金额",
						icon: "none"
					})
				} else if (this.bidValue < this.lowprice) {
					this.bidValue = this.lowprice;
					uni.showToast({
						title: "出价必须高于最低出价！",
						icon: "none"
					})
				} else if (this.bidValue > this.remain) {
					this.bidValue = this.remain;
					uni.showToast({
						title: "余额不足，请充值！",
						icon: "none"
					})
				}
			},
			toAbout() {
				uni.navigateTo({
					url: '/pages/about/about'
				})
			},
			check() {
				if (this.bidValue) {
					return true
				} else {
					uni.showToast({
						title: "请输入出价金额！",
						icon: "none"
					})
					return false
				}
			},
			update() {}
		},
		onShow() {
			uni.getStorage({
				key: "bidPrice",
				success: (res) => {
					this.bidValue = res.data;
					this.isUpdate = true
				}
			})
		},
		onUnload() {
			uni.removeStorage({
				key: "bidPrice",
				success: (res) => {
					console.log(1)
				}
			})
		}

	}
</script>

<style lang="scss">
	.bid-area {
		padding: 20rpx 30rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;

		.title {
			font-size: 26rpx;
			color: #020202;
			width: 100rpx;
		}

		.input {
			flex: 1;
			background-color: #FDF3DE;
			height: 88rpx;
			padding-left: 15rpx;
			border-radius: 10rpx;
			font-size: 26rpx;
			color: #020202;
		}
	}

	.tips {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;

		.remain {
			margin-left: 100rpx;
		}

		.txt {
			font-size: 24rpx;
			color: #646363;
		}
	}

	.bottom {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		border-top: 1rpx solid #F7F7F7;
		background-color: #fff;

		.btn {
			margin: 16rpx auto;
			width: 340rpx;
			height: 68rpx;
			color: #fff;
			border-radius: 34rpx;
			line-height: 68rpx;
			background-color: #F9B002;
			font-size: 26rpx;
		}

		.about {
			text-align: right;
			font-size: 26rpx;
			color: #5E5E5E;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 30rpx;

			.icon {
				display: inline-block;
				border: 1px solid #5E5E5E;
				border-radius: 20rpx;
				width: 26rpx;
				height: 26rpx;
				font-size: 20rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>
