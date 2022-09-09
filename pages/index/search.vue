<template>
	<view>
		<searchArea ref='searcharea' @history="getHistory"></searchArea>
		<!-- 搜索历史区 -->
		<view class="search-history" v-show="update&&historyDatas.length" >
			<view class="history-title">
				<text>历史搜索</text>
			</view>
			<view class="history-content">
				<view class="border" v-for="(item,index) in historyDatas" :key='index'  @click="searchHistory(item.keyword)">
					<text class="clamp">{{item.keyword}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import searchArea from '@/components/search-area/search-area.vue'
	export default {
		components: {
			searchArea
		},
		data() {
			return {
				historyDatas: [],
				historyNum: 0,
				update: true,
			}
		},
		onShow() {
			// this.getJson();
			this.historyDatas=uni.getStorageSync('historyDatas');
			// console.log(this.autoDatas)
		},
		methods: {
			changeHistory(res) {
				// console.log(res)
			},
			searchHistory(key){
				uni.navigateTo({
					url:'searchDetail'
				})
			},
			getHistory(msg){
				this.historyDatas=msg;
				this.update = false;
				this.update = true;
			},
			getJson() {
				// 先从后台拿数据
				uni.request({
					url: "/static/fake.json",
					method: "get",
					success: res => {
						// console.log(res.data);
						// let data = JSON.parse(res.data)
						// this.autoDatas = data.autoDatas;
					}
				});
			},
		},
		mounted() {
			
		},
		watch: {
			
		}
	}
</script>

<style lang="scss">
	.search-history {
		padding: 0 30rpx;

		.history-title {
			font-size: 24rpx;
			line-height: 1.5;
			color: #020202;
		}

		.history-content {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			margin-top: 20rpx;

			.border {
				padding: 0 30rpx;
				height: 60rpx;
				line-height: 60rpx;
				border-radius: 30rpx;
				background-color: #EDEBEB;
				margin-right: 20rpx;
				margin-bottom: 20rpx;

				.clamp {
					font-size: 24rpx;
					color: #595858;
				}
			}
		}
	}
</style>
