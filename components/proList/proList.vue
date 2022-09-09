<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt container goods-area">
			<uni-segmented-control class='goods-sort' :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" /> 
		</view>

		<view class="prolist" v-show="update">
			<view class="box" v-if="current === 0">
				<view v-for="(item,index) in productList" :key="index" class="border" @click="toPage(item)">
					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<view class='product-title'>{{ item.productName }}</view>
					<text class='product-info'>{{ item.info }}</text>
					<text class='product-price'>￥{{ item.price }}</text>
				</view>

			</view>

			<view class="box" v-if="current === 1">
				<view v-for="(item,index) in productList" :key="index" class="border" @click="toPage(item)"
					v-show="item.class1Code=='C0000001'">
					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<view class='product-title'>{{ item.productName }}</view>
					<text class='product-info'>{{ item.info }}</text>
					<text class='product-price'>￥{{ item.price }}</text>
				</view>
			</view>
			<view class="box" v-if="current === 2">
				<view v-for="(item,index) in productList" :key="index" class="border" @click="toPage(item)"
					v-show="item.class1Code=='C0000002'">
					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<view class='product-title'>{{ item.productName }}</view>
					<text class='product-info'>{{ item.info }}</text>
					<text class='product-price'>￥{{ item.price }}</text>
				</view>
			</view>
			<view class="box" v-if="current === 3">
				<view v-for="(item,index) in productList" :key="index" class="border" @click="toPage(item)"
					v-show="item.class1Code=='C0000003'">
					<img class='pic' :src="item.imgUrl" alt="">
					<img class='presale' v-show='item.flagPreSale'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ys.png" alt="">
					<text class='product-title'>{{ item.productName }}</text>
					<text class='product-info'>{{ item.info }}</text>
					<text class='product-price'>￥{{ item.price }}</text>
				</view>
			</view>
		</view>
		<uni-load-more class="load-more" :status="status" :content-text="contentText" @clickLoadMore='loadMore'>
		</uni-load-more>
	</view>

</template>

<script>
	export default {
		name: 'proList',
		props: {
			productList: {
				type: Array,
				default: []
			},
			totalPage: {
				type: Number,
				default: 1
			}
		},
		options: {
			styleIsolation: 'shared'
		},
		data() {
			return {
				items: ['全部', '一番赏', '手办', '盲盒'],
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
				activeColor: '#FDA804',
				styleType: 'text',
				update: true,
				status: 'more',
				contentText: {
					contentdown: '点击展示更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多了'
				},
				pageNo: 1
			}
		},
		onLoad() {},
		methods: {
			toPage(item) {
				uni.navigateTo({
					url: '/sub-play/pages/play'
				})
				uni.setStorage({
					key: 'productCode',
					data: item.productCode
				})

			},
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			forceupdate() {
				this.update = false;
				this.update = true;
			},
			loadMore(e) {
				var that = this;
				// console.log(this.totalPage);
				if (this.pageNo < this.totalPage) {
					that.status = 'loading';
					that.pageNo++;
					uni.request({
						url: "http://123.60.71.74:20001/" + "/mh/product/page",
						method: "GET",
						dataType: "JSON",
						data: {
							no: that.pageNo,
							size: 10
						},
						success: res => {
							let data = JSON.parse(res.data);
							// console.log(data.data.list);
							data.data.list.forEach(function(item) {
								that.productList.push(item);
							})
							// console.log(that.productList);
							// console.log(data);
							that.status = 'more'
						}
					});
				} else {
					that.status = 'noMore'
				}

			}

		},
		mounted() {
			if (this.totalPage == 1) {
				this.status = 'noMore'
			}
		},
		watch: {
			productList: function(newVal, oldVal) {
				// console.log(newVal);
				this.forceupdate();
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef H5 */
	::v-deep uni-text,
	text {
		white-space: nowrap !important;
	}

	/* #endif */
	.goods-area {
		padding: 0 30rpx;
		width: 100%;

		.segmented-control__item {
			flex: 0 !important;
			font-size: 26rpx;
			white-space: nowrap;
		}
	}

	::v-deep .segmented-control {
		height: 42rpx !important;
	}

	::v-deep .segmented-control__item {
		flex: 0 !important;
	}

	::v-deep .segmented-control__text {
		font-size: 26rpx;
		line-height: 34rpx;
	}

	.prolist {
		width: 100%;
		padding: 0 20rpx;
		margin: 20rpx auto;

		.box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			// margin: 0 10rpx;
		}

		.border {
			width: 350rpx;
			position: relative;
			margin-bottom: 20rpx;

			.presale {
				position: absolute;
				top: 0;
				left: 0;
				width: 83rpx;
				height: 82rpx;
			}

			.pic {
				width: 350rpx;
				height: 350rpx;
				display: block;
			}

			.product-title {
				font-size: 30rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: #020202;
				line-height: 50rpx;
				padding: 20rpx 10px 15rpx;
				letter-spacing: 1rpx;
			}

			.product-price {
				font-size: 30rpx;
				color: #F9B002;
				font-weight: bold;
				padding: 0 10rpx;
			}
		}
	}
</style>
