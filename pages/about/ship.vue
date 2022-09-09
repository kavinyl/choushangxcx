<template>
	<view class="container-about">
		<view class="title t-c">发货规则</view>
		<view class="part">
			<p class='p'>1.关于发货选品</p>
			<p class='p'>
				为了更好的用户体验，AR抽赏平台提供可选类赏品在线选择的优质服务，用户选择赏品后，默认优先发所有中的赏品款式。但若遇到官方修改赏品款式配比等特殊情况出现，平台则会随机发货，一切以最终实际发货为准。</p>
		</view>
		<view class="part">
			<p class='p'>2.关于发货日期∶</p>
			<p class='p'>现货商品∶</p>
			<p class='p'>
				默认工作日按照申请发货的先后顺序依次发货，如遇发货高峰或者节假日促销高峰，平台也会尽量在节假日加班加点为大家提供发货服务。一般现货类商品1-5个工作日均能到达用户手上（不可抗力或者物流，疫情等原因引起的不能准时到达也请各位予以理解）。
			</p>
			<p class='p'>预售商品∶</p>
			<p class='p'>
				当预售类商品转为现货的时候，用户即可点击发货，平台按照申请先后顺序依次发货。平台也会以各种形式通知大家，包括但不仅限于公众号，订阅提醒等请各位即时发货，以免在仓存储时间较长引起的积灰，盒损，褪色等不必要的损失，如现货时间超过一年，平台将不再对以上情况引起的任何损失或者产品质量问题予以负责或售后，敬请谅解。用户亦可通过客服窗口询问客服人员了解更多信息，客服时间为工作日早9点至晚8点，客服人员每天咨询较多，还请耐心等待，我们会一一接入并解答。
			</p>
		</view>
		<view class="part">
			<p class='p'>3.关于邮费∶</p>
			<p class='p'>
				平台默认顺丰物流，5件（除卡牌等特小件商品外）包邮国内大部分地区（香港、澳门、台湾、青海、内蒙古、西藏、新疆等偏远地区需联系客服补差价可选择预付10元邮费发国内大部分地区（香港、澳门、台湾、青海、内蒙古、西藏、新疆等偏远地区需联系客服补差价）或者选择到付等方式。如套数较多需要走物流重货件（超过20KG），不能通过快递物流运输的，请自行承担运费。（二级经销商，及其他批货厂商都请自行承担物流重货件运费）
				以上，最终解释权归“AR抽赏”平台所有。</p>
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
