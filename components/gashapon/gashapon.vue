<template>
	<view class="gashapon">
		<view class="mask" v-show="!complete&&!gifShow" @click="close"></view>
		<view class="mask" v-show="complete||gifShow"></view>
		<view class="gashpon-content">
			<view class="gashapon-middle">
				<view v-show="!complete" class="machine">
					<img v-show='!gifShow' class='pic'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/ready.png" alt="">
					<img v-show='gifShow' class='pic gif'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/go.gif" alt="">

				</view>
				<view v-show="complete" class="result">
					<img class='pic resultbg'
						src="https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/gashapon/resultbg.png" alt="">
					<view class="result-title">恭喜抽中:
						<text class="title-amount">{{curIdx+1}}/{{quantity}}</text>
					</view>
					<view class="result-img">
						<img class='pic' :src="resultList[curIdx].imgUrl" alt="">
						<view class="result-type t-c">{{resultList[curIdx].itemTypeName}}</view>
					</view>

					<view class="result-name">{{resultList[curIdx].productItemName}}</view>
				</view>
			</view>
			<view v-show="startShow" class="gashapon-bottom t-c" @click="start">
				{{buttonText}}
			</view>
			<view v-show="nextShow" class="gashapon-bottom t-c" @click="next">
				{{buttonText}}
			</view>
			<view v-show="allShow" class="gashapon-bottom t-c" @click="all">
				{{buttonText}}
			</view>
			<view v-show="nextShow" class="skip" @click="skip">跳过</view>
			<view @click="test" class="t-c" style="width: 200px;height: 50px;margin: 20px auto;background-color: #fff;display: none;">
				test
			</view>
		</view>

	</view>
</template>

<script>
	import md5 from '@/node_modules/js-md5/src/md5.js'
	export default {
		name: "gashapon",
		props: {
			quantity: {
				type: Number,
				require: true,
				default: 1
			}
		},
		data() {
			return {
				buttonText: '开始',
				resultList: [{}],
				curIdx: 0, //当前展示第几个
				complete: false, //抽奖结束，开始展示结果
				gifShow: false, //点击开始，png变gif
				startShow: true, //开始按钮
				nextShow: false, //next按钮
				allShow: false, //查看全部按钮
				timestamp: '',
				salt: '94c3a70edf07f72a',
				sign: '',
				productBoxCode:'',
				productCode:''
			};
		},
		methods: {
			test() {
				this.$emit('addTime', true);
				console.log('test');
			},
			close() {
				this.$emit('close', false);
				this.complete = false;
				this.gifShow = false;
				this.startShow = true;
				this.nextShow = false;
				this.allShow = false;
				this.curIdx = 0;
				this.buttonText = '开始'
			},
			start() {
				var that = this;
				this.gifShow = true;
				this.$emit('close', true);
				this.$emit('addTime', true);
				this.getResult();
				setTimeout(function() {
					that.complete = true;
					if (that.quantity == 1) {
						that.buttonText = '查看全部';
						that.startShow = false;
						that.allShow = true;
					} else {
						that.buttonText = 'NEXT';
						that.startShow = false;
						that.nextShow = true;
					}
				}, 2000);
			},
			getResult() {
				this.productBoxCode=uni.getStorageSync('productBoxCode');
				this.productCode=uni.getStorageSync('productCode')
				this.timestamp = Date.now();
				// console.log(this.timestamp);
				var str = ''+this.productBoxCode + this.quantity + this.timestamp + this.salt;
				this.sign = md5(str);
				// console.log(this.sign);
				uni.request({
					url: 'http://123.60.71.74:20001/' + '/mh/user/lottery/generate',
					method: "GET",
					header: {
						'token': uni.getStorageSync('token')
					},
					data: {
						sign: this.sign,
						productBoxCode: this.productBoxCode,
						productCode: this.productCode,
						lotteryTimes: this.quantity,
						timestamp: this.timestamp
					},
					success: (res) => {
						// console.log(res)
						this.resultList = res.data.data;
						// console.log(this.resultList)
						uni.setStorage({
							key: 'result',
							data: this.resultList
						})
					}
				})
			},
			next() {
				var that = this;
				if (that.curIdx < that.resultList.length - 1) {
					that.curIdx++;
					if (that.curIdx == that.resultList.length - 1) {
						that.allShow = true;
						that.nextShow = false;
						that.buttonText = '查看全部';
					}
				}
			},
			all() {
				uni.navigateTo({
					url: '/sub-play/pages/playResult'
				});
				this.close();
			},
			skip() {
				uni.navigateTo({
					url: '/sub-play/pages/playResult'
				});
				this.close();
			}
		},
		onShow() {
			uni.removeStorage({
				key: 'result'
			})
			
		},
		mounted() {}
	}
</script>

<style lang="scss">
	.gashapon {
		position: fixed;
		z-index: 100;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		.mask {
			position: absolute;
			z-index: 101;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.gashpon-content {
			position: relative;
			z-index: 102;
			width: 100%;

			.gashapon-middle {
				margin: 0 auto;
				width: 670rpx;

				.machine {
					width: 500rpx;
					height: 500rpx;
					margin: 0 auto;
					margin-top: calc(50vh - 322rpx);
				}

				.result {
					width: 100%;
					height: 790rpx;
					position: relative;
					margin-top: calc(50vh - 467rpx);
					padding: 90rpx 85rpx 0;

					.resultbg {
						position: absolute;
						top: 0;
						left: -10rpx;
						z-index: -1;
					}

					.result-title {
						font-size: 32rpx;
						line-height: 44rpx;
						color: #fff;
						font-weight: bold;
						-webkit-text-stroke: 2rpx #9D5F61;
						text-shadow: 1rpx 1rpx 1rpx #9D5F61;

						.title-amount {
							float: right;
						}
					}

					.result-img {
						width: 500rpx;
						height: 500rpx;
						border-radius: 10rpx;
						overflow: hidden;
						margin-top: 30rpx;
						position: relative;

						.result-type {
							position: absolute;
							width: 55rpx;
							height: 55rpx;
							left: 0;
							top: 0;
							background-color: #020202;
							color: #F9B002;
							font-size: 34rpx;
							line-height: 55rpx;
							border-radius: 10rpx;
						}
					}

					.result-name {
						font-size: 30rpx;
						margin-top: 10rpx;
						line-height: 42rpx;
						color: #020202;
						padding-left: 30rpx;
					}

				}
			}

			.gashapon-bottom {
				margin: 30rpx auto 0;
				width: 286rpx;
				height: 114rpx;
				background: url(https://xcxcs.obs.cn-east-3.myhuaweicloud.com/images/gashapon/button.png) no-repeat;
				background-size: contain;
				font-size: 32rpx;
				line-height: 114rpx;
				color: #fff;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #9D5F61;
				text-shadow: 1rpx 1rpx 1rpx #9D5F61;
				position: relative;
			}

			.skip {
				position: absolute;
				bottom: 0;
				right: 100rpx;
				line-height: 114rpx;
				font-size: 32rpx;
				color: #fff;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #9D5F61;
				text-shadow: 1rpx 1rpx 1rpx #9D5F61;
			}
		}

	}
</style>
