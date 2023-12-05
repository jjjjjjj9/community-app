<template>
	<view>
		<view class="body_gong" v-if="list">
			<view class="title_jz">{{list.title}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">
				<u-parse :content="list.content"></u-parse>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {}
			}
		},
		onLoad(e) {
			console.log(1111)
			this.gethome(e.id)
		},
		onShow() {
			
		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Info/byData', {id:id}).then(res => {
					this.list = res.data;
					
				})
			},
			
			
		},
		
	}
</script>

<style>
</style>