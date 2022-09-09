<template>
	<view>
		<!-- 1.头部三切换 -->
		<view class='head'>
			<view ref='shipno' class="ship t-c" :class="{'active':isActive[0]}" @click="shipToggle(0)">未发货</view>
			<view ref='shipping' class="ship t-c" :class="{'active':isActive[1]}" @click="shipToggle(1)">已申请</view>
			<view ref='shipped' class="ship t-c" :class="{'active':isActive[2]}" @click="shipToggle(2)">已发货</view>
		</view>
		<cabinet ref="cabinet" :page-index='page' :get-data="testdata" :fake="testlist" :total-page="total"
			:token='token' @update='update'></cabinet>
	</view>

</template>

<script>
	import cabinet from '../components/cabinet/cabinet.vue'
	export default {
		components: {
			cabinet
		},
		options:{
			styleIsolation: 'shared'
		},
		data() {
			return {
				page: 0,
				isActive: [true, false, false],
				testdata: {},
				testlist: [],
				token: '',
				total: 1,
			}
		},
		onLoad() {
			// #ifdef H5
			this.getJson()
			// #endif
		},
		onPullDownRefresh() {
			this.getJson();
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			shipToggle(n) {
				this.isActive = [false, false, false];
				this.isActive[n] = true;
				this.page = n;
			},
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
				
					url: "http://123.60.71.74:20001/" + 'mh/user/product/list',
					// #endif
					method: "GET",
					dataType: "JSON",
					header: {
						'token': this.token
					},
					// #ifdef H5
					success: res => {
						console.log(res.data);
						this.testdata = res.data.list;
						this.testlist = res.data.list;
						console.log(this.testlist);
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						let data = JSON.parse(res.data);
						console.log(data);
						this.testdata = data.data;
						// this.total = data.data.totalPage;
						// console.log(this.total);
					}
					// #endif
				});
			},
			update() {
				this.getJson();
				this.$refs.cabinet.forceupdate;
			}
		},
		onShow() {
			// console.log('show');
			// #ifndef H5
			uni.getStorage({
				key: "token",
				success: (res) => {
					this.token = res.data;
					this.getJson();
					// console.log(this.token)
				},
				fail: (res) => {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					setTimeout(function() {
						uni.switchTab({
							url: '/pages/user'
						})
					}, 1000)
				},
			});
			this.$refs.cabinet.forceupdate;
			// #endif
		},
		mounted() {
			// this.$refs.cabinet.forceupdate();
		},
		watch: {},
		onPullDownRefresh() {
			this.getJson();
			this.$refs.cabinet.forceupdate;
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1500)
		}
	}
</script>

<style lang="scss">
	.head {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		padding: 0 55rpx;

		.ship {
			width: 180rpx;
			height: 68rpx;
			border-radius: 15rpx;
			color: #181818;
			font-size: 28rpx;
			line-height: 66rpx;
			border: 1rpx solid transparent;
		}

		.active {
			background-color: #FDF5E2;
			border-color: #FDB302;
			color: #F9B002;
			font-weight: bold;
		}
	}
</style>
