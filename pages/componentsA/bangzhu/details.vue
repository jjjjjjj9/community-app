<template>
	<view>
		<view class="body_gong">
			<view>
				求助信息
				<text class="zhaungtai" :class="list.status==1?'color2':'color1'">
					{{list.status===1 ? "已安排负责人" :"待处理"}}
				</text>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">楼栋名称：{{list.title}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">单元：{{list.unit}} 单元</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">房间号：{{list.name}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">姓名：{{list.username}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">手机号：{{list.phone}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">求助类型：{{list.data.lx==1?"个人困难":"纠纷调解"}}</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">求助描述：{{list.details}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">求助图片</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">
				<u-album :urls="img"></u-album>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">求助时间：{{list.ctime}} </view>
			<u-line margin="20rpx 0rpx" ></u-line>
			<view class="" v-if="list.status===1">负责人姓名：{{list.fname}} </view>
			<u-line margin="20rpx 0rpx" v-if="list.status===1"></u-line>
			<view class="" v-if="list.status===1">负责人电话：{{list.fphone}} </view>
			<u-line margin="20rpx 0rpx" v-if="list.status===1"></u-line>
		</view>
		<view v-if="list==null">
			<u-empty marginTop="100" mode="search" icon="https://cdn.uviewui.com/uview/empty/search.png">
			</u-empty>
		</view>
		
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: null,
				img: null,
				show: false,
				
			}
		},
		onLoad(e) {
			this.gethome(e.id)
		},
		onShow() {

		},
		methods: {
			gethome(id) {
				uni.$u.http.post('SeekHelp/bylist', {
					id: id
				}).then(res => {
					this.list = res.data;
					this.img = res.data.ioc.split(",");

				})
			},
			

		},

	}
</script>

<style>
</style>
