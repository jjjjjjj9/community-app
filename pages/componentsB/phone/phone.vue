<template>
	<view>
		<view class="anniubankuai">
			<u-row >
				<u-col span="6">
					<view :class="aid==0?'title_hend_x':'title_hend'" @click="xz(0)">联系物业</view>
				</u-col>
				<u-col span="6">
					<view :class="aid==1?'title_hend_x':'title_hend'" @click="xz(1)">找师傅</view>
				</u-col>
			</u-row>
		</view>
		<view class="body_gong_y">
			<view  v-for="(o,index) in list" :key="index" @click="bo(o.phone)">
				<view class="title">{{o.name}} ： {{o.phone}}<text>立即拨打</text></view>
				<u-line margin="20rpx 0rpx" v-if="index<list.length-1"></u-line>
			</view>
			
		</view>
		<view v-if="list.length==0">
			<u-empty marginTop="100"
					text="暂无活动"
			        mode="message"
			        icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/nei.png"
			>
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aid:0,
				list: []
			}
		},
		onLoad(e) {
			this.aid=e.lx;
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			gethome() {
				uni.$u.http.post('Telephone/xcxlist', {
					aid: this.aid
				}).then(res => {
					this.list = res.data;
			
				})
			},
			xz(e){
				this.aid=e;
				this.gethome()
			},
			bo(e){
				uni.makePhoneCall({
					phoneNumber:e,//电话号码
					success:function(e){
						console.log(e);
					},
					fail:function(e){
						console.log(e);

					}
				})
			}
		},
	}
</script>

<style>
</style>