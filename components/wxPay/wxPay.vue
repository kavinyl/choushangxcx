<template>
	<view>

	</view>
</template>

<script>
	export default {
		name: "wxPay",
		data() {
			return {
				token:''
				appid:'',
				mchid:'',
				notifyUrl:'',
				mchKey:'',
				openid:'',
				accessToken:'',
				data:{},
				
			};
		},
		onShow() {
			this.token=uni.getStorageSync('token');
		},
		methods: {
			getOpenId(code) {
				uni.request({
					url:'http://123.60.71.74:20001/'+'mh/open/wx/openId',
					method:"GET",
					header:{
						'token':this.token
					},
					success: (res) => {
						this.openid=res.data.data
						console.log('openid',this.openid);
					}
				})
			},
			getAccessToken(){
				uni.request({
					url:'http://123.60.71.74:20001/'+'mh/open/wx/access/token',
					method:"GET",
					header:{
						'token':this.token
					},
					success: (res) => {
						this.accessToken=res.data.data
						console.log('accesstoken',this.accessToken);
					}
				})
			},
			wxPay() {
				uni.requestPayment({
					provider:'wxpay',
					timeStamp:this.data.timeStamp,
					nonceStr:this.data.nonceStr,
					package:this.data.package,
					signType:'MD5',
					paySign:this.data.paySign,
					success: (res) => {
						console.log('支付成功',res);
					},
					fail: (err) => {
						console.log('支付失败',err);
					}
				})
			},
		}
	}
</script>

<style>

</style>
