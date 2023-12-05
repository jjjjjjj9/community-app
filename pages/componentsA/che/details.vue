<template>
	<view>
		<view class="body_gong" v-if="list" v-for="(o,index) in list" :key="index">
			<view class="">姓名：{{o.name}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">车库名称：{{o.dname}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">车位区域：{{o.region}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">车位号：{{o.cname}} </view>
			
		</view>
		<view  v-if="list==null">
			<u-empty marginTop="100"
			        mode="search"
			        icon="https://cdn.uviewui.com/uview/empty/search.png"
			>
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: null
			}
		},
		onLoad() {	
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			gethome(id) {
				uni.$u.http.post('OwnerVehicle/xcxList', {wxid:uni.getStorageSync('userData').uid}).then(res => {
					this.list = res.data;
					
				})
			},
			
			
		},
		
	}
</script>

<style>
</style>