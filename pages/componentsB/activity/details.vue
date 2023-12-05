<template>
	<view>
		<view v-if="list">
			<view class="hd_title">{{list.title}} </view>
			<u-line></u-line>
			<view class="hd_body">
				<image :src="list.ioc" mode="widthFix"></image>
			</view>
			<view class="hd_time">
				<view class="">
					<view class="daojishi"> {{list.zt==1?"活动报名倒计时": list.zt==3?"活动报名已结束":"活动报名未开始"}}</view>
					<u-count-down v-if="list.zt==1" :time="list.time" format="DD 天 HH 时 mm 分 ss 秒" :autoStart="true"
						:millisecond="true">
					</u-count-down>
					<view class="baoming" v-if="list.zt==1">
						<u-button text="立即报名" size="normal" @click="baoming()"
							color="linear-gradient(to right, rgb(213, 25, 75), rgb(216, 161, 32))"></u-button>
					</view>

				</view>
			</view>
			<view class="hd_nei">
				<u-parse :content="list.content"></u-parse>
			</view>
		</view>
		<view v-if="list==null">
			<u-empty marginTop="100" text="暂无活动" mode="message"
				icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/nei.png">
			</u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: null,
				timeData: {},
			}
		},
		onLoad(e) {
			this.gethome(e.id)
		},
		onShow() {

		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Activity/byData', {
					id: id
				}).then(res => {
					this.list = res.data;

				})
			},
			baoming(){
				uni.$u.route({
					url: "/pages/componentsB/activity/add?id="+this.list.id
				})
			}


		},

	}
</script>

<style>
	page {
		background-color: #fff;

	}

	.baoming {
		padding: 20rpx 80rpx;
	}
</style>
