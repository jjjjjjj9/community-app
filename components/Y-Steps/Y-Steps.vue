<template>
	<view class="bg">
		<view class="steps">
			<view class="steps_item" v-for="(i, index) in infoList">
				<view class="s_r">
					<view class="line" :style="{backgroundColor:index != 0?backgroundColor:'rgba(0,0,0,0)'}"></view>
					<view class="index" :style="{backgroundColor:backgroundColor,color:color}">
						{{ index + 1 }}
					</view>
					<view class="line" :style="{backgroundColor:index != infoList.length-1?backgroundColor:'rgba(0,0,0,0)'}"></view>
				</view>
				<view class="s_l">
					<view class="info_item">
						<text class="shijian">{{ i.ctime }}</text>
						<view :style="{WebkitLineClamp:lineNum!=0?lineNum:''}" class="biankuang">{{i.status===1 ? "已安排师傅" : i.status==2?"维修中":i.status==3?"已完成":i.status==4?"已评价":"待处理"}}</view>
						<view :style="{WebkitLineClamp:lineNum!=0?lineNum:''}" v-if="i.status===1">师傅姓名：{{i.name}}</view>
						<view :style="{WebkitLineClamp:lineNum!=0?lineNum:''}"  v-if="i.status===1">联系方式：{{i.phone}}</view>
						<view :style="{WebkitLineClamp:lineNum!=0?lineNum:''}" v-if="i.ioc">
							<u-album :urls='i.ioc.split(",")'></u-album>
						</view>
						<view :style="{WebkitLineClamp:lineNum!=0?lineNum:''}" v-if="i.remarks&&i.status<4">回复内容：{{i.remarks}}</view>
						
						<view v-if="i.status==4">
							<u--form labelPosition="left"   ref="form1">
								<u-form-item label="服务态度 : " borderBottom labelWidth="100">
									<view class="u-page__rate-item">
										<u-rate size="20" readonly :value="i.aid"></u-rate>
									</view>
								</u-form-item>
								<u-form-item label="处理速度 : " borderBottom labelWidth="100">
									<view class="u-page__rate-item">
										<u-rate size="20" readonly :value="i.bid"></u-rate>
									</view>
								</u-form-item>
								<u-form-item label="满意度 : " borderBottom labelWidth="100">
									<view class="u-page__rate-item">
										<u-rate size="20" readonly :value="i.cid"></u-rate>
									</view>
								</u-form-item>
								<u-form-item label="评价内容 : "  labelWidth="100 " v-if="i.remarks">
									<view class="u-page__rate-item">
										{{i.remarks}}
									</view>
								</u-form-item>
							</u--form>
							
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'YSteps',
		props: {
			infoList: {
				type: Array,
				default: []
			},
			color: {
				type: String,
				default: '#fff'
			},
			backgroundColor: {
				type: String,
				default: '#ff3838'
			},
			lineNum: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {};
		},
		onLoad(e) {
			//获取列表
		},
		methods: {
			topage(e) {
				this.$emit('click', e);
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f2f2;
	}

	.bg {
		margin: 20upx 0;
		// background-color: #f2f2f2;
		display: flex;
	}
	.steps {
		display: flex;
		flex-direction: column;

		.steps_item {
			display: flex;

			.s_r {
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.line {
					flex: 1;
					width: 5rpx;
					background-color: #fff;
				}

				.index {
					width: 40rpx;
					height: 40rpx;
					font-size: 12px;
					text-align: center;
					line-height: 40rpx;
					border-radius: 50rpx;
				}
			}

			.s_l {
				display: flex;
				flex-direction: column;
				padding: 20rpx 0;

				.info_item {
					background-color: #FFFFFF;
					margin-right: 30upx;
					border-radius: 10upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					padding: 30upx;
					box-shadow: 0 10rpx 30rpx #ddd;

					text {
						// font-size: 18px;
						font-weight: 500;
						// color: rgba(51, 51, 51, 1);
						line-height: 25px;
						font-size: 34rpx;
						color: #478ed5;
					}

					view {
						font-size: 14px;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
						line-height: 20px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;

						flex-direction: column;
					}
				}

				.info_item:active {
					background-color: #f4f4f4;
				}
			}
		}
	}

.biankuang{
	font-size: 30rpx !important;
	color: #00aaff !important;
	
}

	// .steps {
	// 	display: flex;
	// 	flex-direction: column;
	// 	margin: 0 30upx;

	// 	.steps_item {
	// 		display: flex;
	// 		align-items:center ;
	// 		background-color: #fff;
	// 		margin-top: 10rpx;
	// 		.s_r {
	// 			display: flex;
	// 			flex-direction: column;
	// 			align-items: center;
	// 			height: 100%;
	// 			background-color: #f3f;
	// 			flex: 1;
	// 			view {
	// 				height: 100%;
	// 				display: flex;
	// 				flex: 1;
	// 				height: 100%;
	// 				width: 5upx;
	// 			}

	// 			text {
	// 				display: flex;
	// 				flex-direction: column;
	// 				align-items: center;
	// 				width: 40upx;
	// 				line-height: 40upx;
	// 				height: 40upx;
	// 				border-radius: 50%;
	// 				background-color: #ff3838;
	// 				color: #ffffff;
	// 				font-size: 10px;
	// 			}
	// 		}
	// 	}
	// }

	// .info_list {
	// 	display: flex;
	// 	flex-direction: column;
	// 	flex: 1;

	// 	.info_item {
	// 		background-color: #fff;
	// 		height: 200upx;
	// 		margin: 20upx 0;
	// 		margin-right: 30upx;
	// 		border-radius: 10upx;
	// 		display: flex;
	// 		flex-direction: column;
	// 		justify-content: center;
	// 		padding: 0 30upx;

	// 		text {
	// 			font-size: 18px;
	// 			font-family: PingFangSC-Medium, PingFang SC;
	// 			font-weight: 500;
	// 			color: rgba(51, 51, 51, 1);
	// 			line-height: 25px;
	// 		}

	// 		view {
	// 			font-size: 14px;
	// 			font-family: PingFangSC-Regular, PingFang SC;
	// 			font-weight: 400;
	// 			color: rgba(102, 102, 102, 1);
	// 			line-height: 20px;
	// 			overflow: hidden;
	// 			text-overflow: ellipsis;
	// 			display: -webkit-box;
	// 			-webkit-line-clamp: 2;
	// 			flex-direction: column;
	// 		}
	// 	}

	// 	.info_item:active {
	// 		opacity: 0.6;
	// 	}
	// }
</style>
