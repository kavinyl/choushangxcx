<template>
	<view>
		<searchArea ref='searcharea' :auto-datas="autoDatas"></searchArea>
		
		<proList :product-list="product"></proList>
	</view>
</template>

<script>
	import proList from '@/components/proList/proList.vue'
	import searchArea from '@/components/search-area/search-area.vue'
	export default {
		components:{
			proList,searchArea
		},
		data() {
			return {
				searchVal:'',
				snapValue:'',
				autoDatas:[],
				product:[]
			}
		},
		onLoad() {
			this.getJson();
		},
		methods: {
			getJson() {
				// 先从后台拿数据
				uni.request({
					// #ifdef H5
					url: "/static/fake.json",
					// #endif
					// #ifdef MP-WEIXIN
					url: "https://xcxcs.obs.cn-east-3.myhuaweicloud.com/fake.json",
					// #endif
					method: "get",
					dataType: "JSON",
					// #ifdef H5
					success: res => {
						this.autoDatas = res.data.autoDatas;
						this.product=res.data.productList;
						// console.log(this.autoDatas);
					},
					// #endif
					// #ifdef MP-WEIXIN
					success: res => {
						// console.log(res.data);
						let data = JSON.parse(res.data)
						this.autoDatas = data.autoDatas;
						this.product=data.productList;
					}
					// #endif
				});
			},
		},
		mounted() {
			
		},
		watch:{
			
		}
	}
</script>

<style lang="scss">

</style>
