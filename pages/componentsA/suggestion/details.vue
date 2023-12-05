<template>
	<view>
		<view class="body_gong">
			<view>
				{{list.lx==1?"投诉":"建议"}}信息
				<text class="zhaungtai" :class="list.status==0?'color1':'color2'">
					{{list.status===1 ? "已接收" :list.status===2 ? "已处理" :"待接收"}}
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
			<view class="">标题：{{list.atitle}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">{{list.lx==1?"投诉":"建议"}}描述：{{list.details}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">{{list.lx==1?"投诉":"建议"}}详情图片</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">
				<u-album :urls="img"></u-album>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">{{list.lx==1?"投诉":"建议"}}时间：{{list.ctime}} </view>
			<u-line margin="20rpx 0rpx" ></u-line>
			<view class="" v-if="list.status>0">物业回复：{{list.aname}} </view>
			<u-line margin="20rpx 0rpx" v-if="list.status>0"></u-line>
			<view class="" v-if="list.status===2">处理反馈：{{list.bname}} </view>
			<u-line margin="20rpx 0rpx" v-if="list.status===2"></u-line>
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
				uni.$u.http.post('Suggestion/bylist', {
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
