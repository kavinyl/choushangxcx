<template>
	<view class="content">
		<!-- 1.搜索 -->
		<view class="container search">
			<view class="search-area" @click='search'>
				<img class='search-icon' src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/search.png" alt="">
				<text class="search-tip">{{searchTip}}</text>
			</view>
		</view>
		<!-- 2.轮播 -->
		<view class="container swiper-area" v-if="swiperDatas && swiperDatas.length > 0">
			<swiper class="swiper" :autoplay="autoplay" indicator-dots indicator-color="transparent"
				indicator-active-color="#FCBD5D" circular>
				<swiper-item v-for="(item, index) in swiperDatas" :key="item.id" class="swiper-item">
					<view class="animated-all" @click.stop="">
						<img class="pic" mode="aspectFill" lazy-load :src="item.imgUrl" />
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 3.分类 -->
		<scroll-view class="sort-area" scroll-x="true">
			<view v-for="(item, index) in sortList" :key="item.id" class='sort-item' @click="toPage()">
				<img :src='item.img'>
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>
		<!-- 4.产品 -->
		<proList :product-list="product" :total-page="total"></proList>
	</view>
</template>

<script>
	import proList from '@/components/proList/proList.vue'
	export default {
		components: {
			proList
		},
		data() {
			return {
				searchTip: '搜索关键词',
				swiperDatas: [],
				autoplay: true,
				sortList: [{
					id: 1,
					img: 'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/神龙.png',
					name: '神龙',
					url: '/sub-play/pages/play'
				}, {
					id: 2,
					img: 'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/高达.png',
					name: '高达',
					url: '/sub-play/pages/play'
				}, {
					id: 3,
					img: 'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/海贼王.png',
					name: '海贼王',
					url: '/sub-play/pages/play'
				}, {
					id: 4,
					img: 'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/七龙珠.png',
					name: '七龙珠',
					url: '/sub-play/pages/play'
				}, {
					id: 5,
					img: 'https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/手办.png',
					name: '手办',
					url: '/sub-play/pages/play'
				}],
				title: '',
				product: [],
				pageNo: 1,
				total: 1,
				requestUrl: "http://123.60.71.74:20001/"
			}
		},
		onLoad() {
			this.getJson();
			// console.log(this.product)
		},
		onPullDownRefresh() {
			this.getJson();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			search() {
				uni.navigateTo({
					url: 'search'
				})
			},
			toPage() {
				uni.navigateTo({
					url: '/sub-play/pages/play'
				})
			},
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "http://123.60.71.74:20001/" + "/mh/banner/list",
					// #endif
					method: "GET",
					dataType: "JSON",
					// #ifdef H5
					success: res => {
						// console.log(res.data.productList);
						this.product = res.data.productList;
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						let data = JSON.parse(res.data);
						// console.log(data);
						this.swiperDatas = data.data
					}
					// #endif
				});
				// #ifdef MP-WEIXIN
				uni.request({
					url: "http://123.60.71.74:20001/" + "/mh/product/page",
					method: "GET",
					dataType: "JSON",
					data: {
						no: this.pageNo,
						size: 10
					},
					success: res => {
						let data = JSON.parse(res.data);
						this.product = data.data.list;
						this.total = data.data.totalPage;
						// console.log(data);
					}
				})
				// #endif
			},
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.container {
		width: 100%;
		padding: 0 30rpx;
	}

	.search-area {
		width: 100%;
		margin: 5rpx auto 20rpx;
		height: 68rpx;
		border-radius: 34rpx;
		background-color: #f5f5f5;
		display: flex;
		align-items: center;

		.search-icon {
			content: url(https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/search.png);
			width: 40rpx;
			height: 40rpx;
			margin: 0 10rpx 0 30rpx;
		}

		.search-tip {
			font-size: 22rpx;
			color: #AAAAAA;
		}
	}

	.swiper-area {
		padding: 0 20rpx;
		
		.swiper {
			height: 300rpx;
			width: 100%;

			.pic {
				width: 100%;
				height: 300rpx;
				border-radius: 25px;
			}
		}
	}

	.sort-area {
		white-space: nowrap;
		width: 100%;
		margin-top: 45rpx; 
		.sort-item {
			width: 20%;
			display: inline-block;
			text-align: center;

			img,
			image {
				display: block;
				width: 88rpx;
				height: 88rpx;
				margin: 0 auto 15rpx;
			}

			text {
				font-size: 24rpx;
				color: #020202;
			}
		}
	}

	::v-deep .goods-area {
		margin-top: 55rpx;
	}
</style>
