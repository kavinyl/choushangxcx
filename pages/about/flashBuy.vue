<template>
	<view class="container-about">
		<view class="title t-c">闪购须知</view>
		<view class="part">
			<p class='p'>一、闪购闪出是什么</p>
			<p class='p'>1.闪购闪出是AR抽赏小程序自动根据所有挂单售价高低，是用户最快速度购买最低价赏品或以最高价卖出赏品的交易模式。</p>
			<p class='p'>2.闪购闪出的商品来源：仅在AR抽赏小程序上架的赏品。</p>
		</view>
		<view class="part">
			<p class='p'>二、闪购交易规则</p>
			<p class='p'>1.闪购自动购买所有挂单售价中的最低价商品。</p>
			<p class='p'>2.单次闪购仅购买一件商品。</p>
			<p class='p'>3.交易成功后，对方商品将直接转入赏柜。</p>
			<p class='p'>4.如何发布闪购赏品：</p>
			<p class='p'>4.1. 发布出售，发布后系统会根据所有挂单售价由低到高显示，当有买家选择购买，自动按照最低价成交。</p>
			<p class='p'>4.2. 当出售价低于已有挂单的售价，将会以售价和对方直接成交。</p>
		</view>
		<view class="part">
			<p class='p'>三、闪出交易规则</p>
			<p class='p'>1.闪出商品仅限于在本平台拥有的商品。</p>
			<p class='p'>2.闪出商品数量不得高于对方求购数量，不得高于自己拥有数量。</p>
			<p class='p'>3.闪出自动选择所有挂单中的最高求购价挂单。</p>
			<p class='p'>4.交易成功后，对方冻结金额将直接转入我的账户，可自由选择提现。</p>
			<p class='p'>5.如何发布收购：</p>
			<p class='p'>5.1.发布收购，发布后系统会根据所有挂单售价由高到低显示，当有卖家选择闪购，自动按照最高价成交。 </p>
			<p class='p'>5.2.发布收购需要冻结您全部收购单金额的余额，余额不足时需充值。 </p>
			<p class='p'>5.3.冻结余额在成功收购时直接付给卖家。 </p>
			<p class='p'>5.4.当收购价高于已有挂单的售价，将会以售价和对方直接成交。 </p>
			<p class='p'>5.5.取消收购时解除冻结可提现。</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container-about {
		padding: 30rpx;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #020202;
		}

		.part {
			margin-top: 20rpx;

			.p:first-child {
				font-size: 30rpx;
				color: #020202;
			}
		}

		.p {
			font-size: 26rpx;
			margin-bottom: 10rpx;
			color: #333;
		}

		.b {
			font-weight: bold;
		}
	}
</style>
