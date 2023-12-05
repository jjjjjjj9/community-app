<template>
	<view>
		<view class="body_gong" v-if="list" v-for="(o,index) in list" :key="index">
			<view class="">楼栋：{{o.title}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">单元：{{o.unit}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">房间号：{{o.name}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">建筑面积：{{o.jarea}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">使用面积：{{o.sarea}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">公摊面积：{{o.garea}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">房屋户型：{{o.house_type}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">房屋朝向：{{o.orientation}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">房屋类型：{{o.building_type}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">备注信息：{{o.textarea==undefined?"":o.textarea}} </view>
			
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
				uni.$u.http.post('House/bydate', {id:uni.getStorageSync('userData').uid}).then(res => {
					this.list = res.data;
					
				})
			},
			
			
		},
		
	}
</script>

<style>
</style>