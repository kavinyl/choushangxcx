<script>
	import index from '@/pages/index/index.vue'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			uni.onAppShow(this.checkQueue);
			uni.onAppShow(this.checkToken);
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			checkToken() {
				uni.request({
					url: "http://123.60.71.74:20001/" + "wx/mini/user/check",
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': uni.getStorageSync('token')
					},
					success: (res) => {
						console.log('token', res)
						if(res.data.code=='555'||res.data.code=='556'){
							uni.showToast({
								title:'登录过期！',
								icon:'error'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/user'
								},1000)
							})
						}else{
							uni.setStorage({
								key:'token',
								data:res.data.data
							})
						}
					}
				})
			},
			checkQueue() {
				uni.request({
					url: "http://123.60.71.74:20001/" + "mh/user/queue/now",
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': uni.getStorageSync('token')
					},
					success: (res) => {
						console.log('queue', res);
						if (res.data.data.productBoxCode) {
							uni.showLoading({
								title: '跳转至队列'
							});
							uni.setStorageSync('productCode', res.data.data.productCode)
							uni.setStorageSync('productBoxCode', res.data.data.productBoxCode)
							setTimeout(function() {
								uni.hideLoading()
								uni.navigateTo({
									url: '/sub-play/pages/play'
								})
							}, 1000)
						}
					}
				})
			}
		}
	}
</script>

<style>
	view {
		box-sizing: border-box;
	}

	.t-l {
		text-align: left;
	}

	.t-r {
		text-align: right;
	}

	.t-c {
		text-align: center;
	}

	img,
	image {
		width: 100%;
		height: 100%;
	}

	.pic {
		display: block;
	}

	wx-swiper .wx-swiper-dot {
		border: 2px solid #FCBD5D;
	}
	::v-deep .popup-alert .uni-popup__wrapper {
		background-color: #fff !important;
		border-radius: 20rpx;
		padding: 25rpx 40rpx 50rpx;
		width: 690rpx;
	}
	page{
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>
