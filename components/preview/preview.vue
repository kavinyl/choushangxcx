<template>
	<view class="view-bg">
		<swiper class="swiper" v-show="update" circular='true' @change='swiperChange' :current='current'>
			<swiper-item v-for="(item, index) in swiperList" :key="index" class="swiper-item" @click="close">
				<view class="number t-c">
					{{imgIndex}}/{{swiperList.length}}
				</view>
				<view class="img">
					<img class="pic" lazy-load :src="item.imgUrl" />
				</view>
				<view class="detail t-c">
					{{item.productItemName}} 获得概率约为{{Math.floor(item.leftAmount/total*10000)/100}}%
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "imgview",
		props: {
			proList: {
				type: Array,
				default: []
			},
			index: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				swiperList: [],
				imgIndex: 1,
				update: true,
				current: 0,
				total: 0
			};
		},
		methods: {
			close() {
				this.current=0;
				this.$emit('close', false)
			},
			swiperChange(e) {
				this.current = e.detail.current;
				this.imgIndex = (this.current + this.index) % this.proList.length +1;
			},
			forceUpdate() {
				this.update = false;
				this.update = true
			},
			getList() {
				const arr2 = this.proList.slice(this.index);
				const arr1 = this.proList.slice(0, this.index);
				this.swiperList = arr2.concat(arr1);
				this.current=0;
				console.log(this.swiperList);
			},
			getAmount() {
				this.total = 0;
				this.proList.forEach((i) => {
					this.total += i.leftAmount;
				})
			},
		},
		watch: {
			proList: function(newVal) {
				this.swiperList = newVal;
				
				this.forceUpdate();
				this.getAmount();
			},
			index: function(newVal) {
				this.imgIndex = newVal + 1;
				this.getList();
				this.forceUpdate()
			}
		}
	}
</script>

<style lang="scss">
	.view-bg {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100vh;
		background-color: #020202;
		z-index: 999;
		color: #fff;

		.swiper {
			height: 100%;
			position: relative;
		}

		.number {
			font-size: 30rpx;
			margin: 20rpx 0;
		}

		.img {
			width: 750rpx;
			height: 750rpx;
			position: absolute;
			top: calc(50% - 480rpx);
			left: 0;
		}
		.detail{
			font-size: 30rpx;
			line-height: 1.2;
			width: 100%;
			padding: 0 30rpx;
			position: absolute;
			left: 0;
			top: calc(50% + 330rpx);
		}
	}
</style>
