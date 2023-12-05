<template>
	<view>
		<view class="body_gong">
			<view>
				报修信息
				<text class="zhaungtai" :class="list.data.status==1?'color2':list.data.status==2 ? 'color3' :list.data.status==3 ? 'color4':list.data.status==4 ? 'color5':'color1'">
					{{list.data.status===1 ? "已安排师傅" : list.data.status==2?"维修中":list.data.status==3?"待评价":list.data.status==4?"已评价":"待处理"}}
				</text>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">楼栋名称：{{list.data.title}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">单元：{{list.data.unit}}单元 </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">房间号：{{list.data.name}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">姓名：{{list.data.username}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">手机号：{{list.data.phone}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">报修类型：{{list.data.lx==1?"房屋":"公共"}}报修</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">报修描述：{{list.data.details}} </view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">报修图片</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">
				<u-album :urls="img"></u-album>
			</view>
			<u-line margin="20rpx 0rpx"></u-line>
			<view class="">申请时间：{{list.data.ctime}} </view>
			<u-line margin="20rpx 0rpx 50rpx 0rpx"></u-line>
			<view  class="dianping" @click="show = true" v-if="list.data.status==3">
				物业点评
			</view>
			<u-loadmore v-if="list.data.status>0"
							loadmoreText="处理进度"
							color="#55aaff"
							lineColor="#55aaff"
							dashed
							line
			    />
			<view>
				<view style="padding-top: 10rpx;">
					<YSteps lineNum='0' color='#fff' backgroundColor='#55aaff' :infoList='list.list'></YSteps>
				</view>
			</view>
			
		</view>
		<view v-if="list==null">
			<u-empty marginTop="100" mode="search" icon="https://cdn.uviewui.com/uview/empty/search.png">
			</u-empty>
		</view>
		
		<u-popup :show="show" mode="bottom" :round="10" @close="close" @open="open">
			<view class="pingfen">
				<u--form labelPosition="left" :model="frmdat" ref="form1">
					<u-form-item label="服务态度 : " borderBottom labelWidth="100">
						<view class="u-page__rate-item">
							<u-rate size="20"  v-model="frmdat.aid"></u-rate>
						</view>
					</u-form-item>
					<u-form-item label="处理速度 : " borderBottom labelWidth="100">
						<view class="u-page__rate-item">
							<u-rate size="20"  v-model="frmdat.bid"></u-rate>
						</view>
					</u-form-item>
					<u-form-item label="满意度 : " borderBottom labelWidth="100">
						<view class="u-page__rate-item">
							<u-rate size="20"  v-model="frmdat.cid"></u-rate>
						</view>
					</u-form-item>
					<u-form-item label="点评内容 : " borderBottom labelWidth="100">
						<view class="u-page__rate-item">
							<u--textarea placeholder="请输入点评内容" v-model="frmdat.remarks" ></u--textarea>
						</view>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="tijiao()"></u-button>
				<u-button type="error" text="关闭" customStyle="margin-top: 10px" @click="close()"></u-button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import YSteps from '@/components/Y-Steps/Y-Steps.vue'
	export default {
		components: {
			YSteps
		},
		data() {
			return {
				list: null,
				img: null,
				show: false,
				frmdat:{
					id:0,
					aid:0,
					cid:0,
					bid:0,
					remarks:""
				}
			}
		},
		onLoad(e) {
			this.gethome(e.id)
			this.frmdat.id=e.id
		},
		onShow() {

		},
		methods: {
			gethome(id) {
				uni.$u.http.post('Repair/bylist', {
					id: id
				}).then(res => {
					this.list = res.data;
					this.img = res.data.data.ioc.split(",");

				})
			},
			tijiao(){
				uni.$u.http.post('RepairLog/dp', this.frmdat)
					.then(res => {
						this.gethome(this.frmdat.id)
						this.show = false;
					})
			},
			open() {
				// console.log('open');
				
			},
			close() {
				this.show = false;
				
				// console.log('close');
			},


		},

	}
</script>

<style>
</style>
