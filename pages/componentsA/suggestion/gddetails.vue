<template>
	<view>
		<view class="body_gong">
			<view>
				投诉信息
				<text class="zhaungtai color1" v-if="list.status==1" @click="show = true" >
					反馈信息
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
		<u-popup :show="show" mode="bottom" :round="10" @close="close" @open="open">
			<view class="pingfen">
				<u--form labelPosition="left" :model="frmdat" ref="form1">
					
					<u-form-item label="处理反馈 : " borderBottom labelWidth="100">
						<view class="u-page__rate-item">
							<u--textarea placeholder="请输入处理反馈信息" v-model="frmdat.bname" ></u--textarea>
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
	export default {
		data() {
			return {
				list: null,
				img: null,
				show: false,
				fileList4: [],
				frmdat:{
					id:0,
					bname:"",
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
				uni.$u.http.post('Suggestion/bylist', {
					id: id
				}).then(res => {
					this.list = res.data;
					this.img = res.data.ioc.split(",");

				})
			},
			open() {
				// console.log('open');
				
			},
			close() {
				this.show = false;
				
				// console.log('close');
			},
			
			tijiao(){
				
				uni.$u.http.post('Suggestion/fk', this.frmdat)
					.then(res => {
						if(res.code==200){
							uni.showToast({
								title: res.msg,
								icon: 'success',
								duration: 2000
							})
							this.gethome(this.frmdat.id)
							this.show = false;
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
						
					})
			},
			

		},

	}
</script>

<style>
</style>
