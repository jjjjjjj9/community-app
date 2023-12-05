<template>
	<view>
		<view v-if="list">
			<view class="hd_title">{{list.title}} </view>
			<u-line></u-line>
			<view class="tiaocha">
				{{list.content}}
			</view>
			<view v-for="(itme,index) in list.list " :key="index">
				<u-gap height="3" bgColor="#eeeeee"></u-gap>
				<view class="title-tm">{{index+1}}、{{itme.title}} ？</view>
				<view v-if="itme.lxid==0">
					<view class="title-tm-da">
						<u-radio-group
							v-model="itme.da"
							placement="column"
						>
							<u-radio
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, ind) in itme.list"
								:key="ind"
								:label="item.title"
								:name="item.title"
							>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
				<view v-if="itme.lxid==1">
					<view class="title-tm-da">
						<u-checkbox-group
							v-model="itme.da"
							placement="column"
						>
							<u-checkbox
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, ind) in itme.list"
								:key="ind"
								:label="item.title"
								:name="item.title"
							>
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</view>
				<view v-if="itme.lxid==2">
					<view class="title-tm-da">
						<u--textarea v-model="itme.da" placeholder="请输入内容" ></u--textarea>
					</view>
				</view>
			</view>
			<view class="but" @click="tijiao()">提交</view>
		</view>
		<view v-if="list==null">
			<u-empty marginTop="100" text="暂无问卷" mode="message"
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
			uni.hideShareMenu();
			uni.onCopyUrl((result) => {
				setTimeout(() => {
				  uni.setClipboardData({
					data: "不可复制哦",
				  });
				}, 1000);
			  });
		},
		onShow() {

		},
		methods: {
			gethome(id) {
				uni.$u.http.post('QuestionnaireTitle/byList', {
					titleid: id
				}).then(res => {
					this.list = res.data;

				})
			},
			tijiao() {
				this.list.wxid=uni.getStorageSync('userData').uid
				let a=0;
				let arr=this.list.list;
				for (let i=0;i<arr.length;i++){
					let da=arr[i].da;
					if(da==""|| da==null){
						a=1;
					}
					
				}
				if(a==0){
					uni.$u.http.post('QuestionnaireUser/add', this.list)
					.then(res => {
						// this.list=res.data;
						console.log(res)
						// setTimeout(() => {
							
						// }, 1000)
					
						if(res.code==200){
							uni.showToast({
								title: res.msg,
								icon: 'success',
								duration: 2000
							})
							
						}else{
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					})
				}else{
					uni.showToast({
						title: "还有问卷未填写！",
						icon: 'none',
						duration: 2000
					})
				}
				console.log('tijiao', a);
			},


		},

	}
</script>

<style>
	page {
		background-color: #fff;

	}
	.tiaocha {
		padding: 20rpx;
		font-size: 30rpx;
		line-height: 50rpx;
		text-indent:1cm;
		letter-spacing:2rpx;
	}
	.title-tm{
		padding: 10rpx 20rpx ;
		font-size: 30rpx;
		line-height: 50rpx;
		letter-spacing:2rpx;
		font-weight: 600;
		color: #4993dc;
	}
	.title-tm-da{
		padding: 10rpx 50rpx ;
		font-size: 28rpx;
		line-height: 40rpx;
		letter-spacing:2rpx;
	}
	.but {
		border-radius: 30rpx;
		background-color: #2b85e4;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		font-weight: 600;
		margin: 20rpx  100rpx  100rpx  100rpx;
		
	}
	
</style>
