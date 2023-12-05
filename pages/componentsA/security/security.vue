<template>
	<view>
		<view class="anniubankuai">
			<u-row >
				<u-col span="6">
					<view :class="model.aid==0?'title_hend_x':'title_hend'" @click="xz(0)">住户查询</view>
				</u-col>
				<u-col span="6">
					<view :class="model.aid==1?'title_hend_x':'title_hend'" @click="xz(1)">车辆查询</view>
				</u-col>
			</u-row>
		</view>
		<view class="bianjia u-demo-block__content">
			<u--form labelPosition="left" :model="model" ref="form1">
				<u-form-item label="选择房屋:" borderBottom ref="item1" labelWidth="100" @click="toggleMaskLocation" v-if="model.aid==0">
					<u--input v-model="fangwu" border="none" placeholder="请选择房屋" :disabled="true" disabledColor="#fff"
						inputAlign="right"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="车牌号:" borderBottom ref="item1" labelWidth="100"  v-if="model.aid==1">
					<u--input v-model="model.name" border="none" placeholder="请输入车牌号" maxlength="10" inputAlign="right">
					</u--input>
				</u-form-item>
			
			
			</u--form>
			<view class="but" @click="tijiao()">查询</view>
			
			
		</view>
		<view class="" v-if="model.aid==0">
			<view class="body_gong" v-for="(o,index) in hoselist" :key="index" >
				<view class="title"  >姓名：{{o.name}} 
					<text class="zhaungtai ">
						与业主关系：{{o.relationship}} 
					</text>
				</view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view class="album__content">
						联系方式：{{o.phone}}<text class="boda" @click="bo(o.phone)">立即拨打</text>
				</view>
			</view>
		</view>
		<view class="" v-if="model.aid==1">
			<view class="body_gong" v-for="(o,index) in chelist" :key="index" >
				<view class="title"  >姓名：{{o.name}} 
					<text class="zhaungtai ">
						车牌号：{{o.hao}} 
					</text>
				</view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view class="album__content" >
						联系方式：{{o.phone}} <text class="boda" @click="bo(o.phone)">立即拨打</text>
				</view>
			</view>
		</view>
		<gk-city :headtitle="headtitle" :provincedata="provincedata" :data="selfData" mode="cityPicker" ref="cityPicker"
			@funcvalue="getpickerParentValue" :pickerSize="3"></gk-city>
	</view>
</template>

<script>
	import gkcity from '@/components/gk-city/gk-city.vue';
	export default {
		components: {
			gkcity
		},
		data() {
			return {
				fangwu:"",
				list: [],
				provincedata: [],
				selfData: [],
				hoselist:[],
				chelist:[],
				qid:0,
				model: {
					aid:0,
					houseid: 0,
					name:""
				},
			}
		},
		onLoad() {
			uni.hideShareMenu();
			uni.onCopyUrl((result) => {
				setTimeout(() => {
				  uni.setClipboardData({
					data: "不可复制哦",
				  });
				}, 1000);
			  });
			this.gethome()
		},
		onShow() {
			uni.$u.http.post('OwnerMember/fangzi', {}).then(res => {
				this.list = res.data;
			})
		},
		methods: {
			gethome() {
				uni.$u.http.post('AdminUser/quanxian', {wxid:uni.getStorageSync('userData').uid}).then(res => {
					this.qid=res.data
				})
			},
			xz(e){
				this.model.aid=e;
			},
			toggleMaskLocation() {
				this.selfData = this.list;
				this.$nextTick(() => {
					this.$refs["cityPicker"].show();
				})
			},
			getpickerParentValue(data) {
				this.fangwu = data[0].text + "-" + data[1].text + "-" + data[2].text;
				this.model.houseid = data[2].value
			},
			tijiao(){
				console.log(11)
				if(this.qid==1){
					this.getcy()
				}else{
					uni.showToast({
						title: "你没有权限！",
						icon: 'none',
						duration: 2000
					})
				}
			},
			getcy() {
				if(this.model.aid==0){
					if(this.model.houseid>0){
						uni.$u.http.post('OwnerMember/byData', {houseid:this.model.houseid}).then(res => {
							this.hoselist=res.data;
							if(res.data.length==0){
								uni.showToast({
									title: "暂无用户信息！",
									icon: 'none',
									duration: 2000
								})
							}
						})
					}else{
						uni.showToast({
							title: "请选择房屋！",
							icon: 'none',
							duration: 2000
						})
					}
					
				}else if(this.model.aid==1){
					if(this.model.name!=""){
						uni.$u.http.post('OwnerVehicleAmount/buydat', {name:this.model.name}).then(res => {
							this.chelist=res.data;
							
							if(res.data.length==0){
								uni.showToast({
									title: "暂无用户信息！",
									icon: 'none',
									duration: 2000
								})
							}
						})
					}else{
						uni.showToast({
							title: "请输入车牌号！",
							icon: 'none',
							duration: 2000
						})
					}
				}
				
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
 
<style lang="scss">
	

	.bianjia {
		padding: 10rpx 40rpx;
		margin: 10rpx 40rpx;
		background-color: #fff;
		border-radius: 10rpx;
	}

	.but {
		
		border-radius: 30rpx;
		background-color: #2b85e4;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		font-weight: 600;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}

	.yanghisb {
		display: inline;
	}

	.xanze {
		width: 100rpx;
		float: left;
		text-align: center;

	}

	.yt-list {
		background: #fff;
	}

	.yt-list-cell-warnning {
		display: flex;
		padding: 10rpx 30rpx 10rpx 40rpx;
		color: red;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 6px 12px 6px 17px;
		line-height: 70rpx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30rpx;
			right: 30rpx;

		}

		.gray {
			flex: 1;
			font-size: 28rpx;
			margin-right: 10rpx;
			height: 25px;
			line-height: 20px;
			color: gray;
		}

		.cell-icon {
			height: 32rpx;
			width: 32rpx;
			font-size: 28rpx;
			color: #fff;
			text-align: center;
			line-height: 32rpx;
			background: #f85e52;
			border-radius: 4rpx;
			margin-right: 12rpx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 28rpx;
			margin-left: 8rpx;
			margin-right: -10rpx;
		}

		.cell-tit {
			flex: 1;
			font-size: 14px;
			margin-right: 10rpx;
		}

		.money {

			font-weight: bold;
			margin-left: 10px;
		}

		.picker-class {
			display: inline-block;
		}

		.cell-tip {
			font-size: 14px;
			flex-direction: column;

			&.disabled {}

			&.active {}

			&.red {}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90rpx;
			}
		}

		.desc {
			flex: 1;
			font-size: 14px;
		}
	}

	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		-webkit-transform: scaleY(0.5);
		-ms-transform: scaleY(0.5);
		transform: scaleY(0.5);
		border-bottom: 1px solid #E4E7ED;
	}

	.red_color {
		color: red;
		display: inline-flex;
		padding-right: 6px;
	}
	.zhaungtai{
		color: #7c7c7c !important;
	}
	.boda{
		float: right;
		color: #2b85e4;
		font-size: 30rpx;
	}
</style>