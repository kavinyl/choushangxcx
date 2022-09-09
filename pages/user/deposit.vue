<template>
	<view class="container">
		<form @submit="formSubmit" ref="deposit">
			<view class="title">
				充值金额
			</view>
			<view class="money">
				<text class="rmb">￥</text> <input focus v-model="deposit" name='deposit' type="number" class="input"
					@blur="blur($event)">
			</view>
			<button class="btn t-c" form-type="submit">微信充值</button>
		</form>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				deposit: ''
			}
		},
		methods: {
			blur(e) {
				this.deposit = Math.floor(e.detail.value * 100) / 100;
				if (this.deposit <= 0) {
					this.deposit = 0;
					uni.showToast({
						title: "请输入充值金额",
						icon: "none"
					})
				}
			},
			post() {
				uni.showToast({
					title: "充值成功" + this.deposit + "元",
					icon: "none"
				})
			},
			formSubmit() {
				if (this.deposit) {
					this.post();
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				}
			},
			payment(){
				uni.requestPayment({
				    provider: 'wxpay',
					timeStamp: String(Date.now()),
					nonceStr: 'A1B2C3D4E5',
					package: 'prepay_id=wx20180101abcdefg',
					signType: 'MD5',
					paySign: '',
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx 60rpx;
	}

	.title {
		font-size: 28rpx;
		color: #020202;
	}

	.btn {
		width: 340rpx;
		height: 68rpx;
		border-radius: 34rpx;
		margin: 110rpx auto 0;
		font-size: 26rpx;
		line-height: 68rpx;
		background-color: #F9B002;
		color: #fff;

	}

	.money {
		padding-bottom: 60rpx;
		border-bottom: 1px solid #DCDCDC;
		margin-top: 80rpx;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;

		.rmb {
			font-size: 80rpx;
			line-height: 80rpx;
		}

		.input {
			width: 500rpx;
			height: 80rpx;
			font-size: 80rpx;
			line-height: 80rpx;
		}
	}
</style>
