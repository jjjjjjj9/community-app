<template>
	<view>
		<view class="anniubankuai">
			<u-row >
				<u-col span="6">
					<view :class="aid==0?'title_hend_x':'title_hend'" @click="xz(0)">物业费</view>
				</u-col>
				<u-col span="6">
					<view :class="aid==1?'title_hend_x':'title_hend'" @click="xz(1)">停车费</view>
				</u-col>
			</u-row>
		</view>
		<view >
			<view class="body_gong" v-if="list" v-for="(o,index) in list" :key="index">
				<view >订单号：{{o.number}}</view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view >标题：{{o.atitle}}</view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view v-if="aid == 0">房屋：{{o.title}}-{{o.unit}}单元-{{o.name}} </view>
				<view v-if="aid == 1">车位：{{o.title}}-{{o.region}}-{{o.name}} </view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view v-if="aid == 0">使用面积：{{o.sarea}} </view>
				<view v-if="aid == 1">车位面积：{{o.area}} </view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view v-if="aid == 0">公摊面积：{{o.garea}} </view>
				<u-line margin="20rpx 0rpx"  v-if="aid == 0"></u-line>
				<view v-if="aid == 0">房主：{{o.yname}} </view>
				<u-line margin="20rpx 0rpx"  v-if="aid == 0"></u-line>
				<view >起止时间：{{o.stime}} </view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view >截至时间：{{o.etime}} </view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view >应缴费用：{{o.pay}} </view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view >备注信息：{{o.remarks==undefined?"":o.remarks}} </view>
				<u-line margin="20rpx 0rpx"></u-line>
				<view class="ysa" v-if="o.status==1">状态：已交 </view>
				<view class="ysb" v-if="o.status==0">状态：未交  <text class="jiaofei" @click="jiaofei(o.id)">上传缴费凭证</text> </view>
				<view class="ysc" v-if="o.status==2">状态：待审核 </view>
				<view class="ys" v-if="o.status==3">状态：审核失败 <text class="jiaofei" @click="jiaofei(o.id)">上传缴费凭证</text></view>
				<u-line margin="20rpx 0rpx" v-if="o.status>1"></u-line>
				<view class="" v-if="o.status>1">缴费凭证</view>
				<u-line margin="20rpx 0rpx" v-if="o.status>1"></u-line>
				<view class="" v-if="o.status>1">
					<u-album :urls='o.dname.split(",")'></u-album>
				</view>
				<u-line margin="20rpx 0rpx" v-if="o.status == 1"></u-line>
				<view  v-if="o.status == 1">实缴费用：{{o.spay}} </view>
				<u-line margin="20rpx 0rpx" v-if="o.status>0"></u-line>
				<view  v-if="o.status>0">缴费时间：{{o.jtime}} </view>
				
				
			</view>
			
		</view>
		<view v-if="list.length==0">
			<u-empty marginTop="100"
					text="暂无账单"
			        mode="message"
			        icon="https://shopimges.oss-cn-hangzhou.aliyuncs.com/wuye/xia/nei.png"
			>
			</u-empty>
		</view>
		
		<u-popup :show="show" mode="bottom" :round="10" @close="close" @open="open">
			<view class="pingfen">
				<u--form labelPosition="left" :model="frmdat" ref="form1">
					
					<u-form-item label="上传缴费凭证 : " borderBottom ref="item1" labelWidth="120">
						<u-upload :fileList="fileList4" @afterRead="afterRead" @delete="deletePic" name="4" multiple :maxCount="1"></u-upload>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="tijiao()"></u-button>
				<u-button type="error" text="关闭" customStyle="margin-top: 10px" @click="close()"></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import action from '@/common/util.js'
	export default {
		data() {
			return {
				show: false,
				fileList4: [],
				xia:0,
				aid:0,
				page:1,
				list: [],
				frmdat:{
					id:0,
					aid:1,
					ioc:""
				}
			}
		},
		onLoad(e) {
			this.list=[];
			this.xia=0;
			this.page=1;
			this.gethome()
		},
		onShow() {
			
		},
		methods: {
			gethome() {
				uni.$u.http.post('Bill/xcxlist', {
					lxid: this.aid,
					page: this.page,
					limit: 10,
					wxid:uni.getStorageSync('userData').uid
				}).then(res => {
					this.list = this.list.concat(res.data);
					if(res.data.length>9){
						this.page=this.page+1;
					}else{
						this.xia=1
					}
			
				})
			},
			xz(e){
				this.aid=e;
				this.list=[];
				this.xia=0;
				this.page=1;
				this.gethome()
			},
			jiaofei(id){
				this.frmdat={
					id:id,
					aid:this.aid,
					ioc:""
				}
				this.fileList4=[]
				this.show=true
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					// console.log(result)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				let ioc=action.imgurl
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: ioc, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							// console.log(JSON.parse(res.data).data)
							setTimeout(() => {
								resolve(JSON.parse(res.data).data)
							}, 1000)
						}
					});
				})
			},
			tijiao(){
				for (let i=0;i<this.fileList4.length;i++) {
					if(i==0){
						this.frmdat.ioc=this.fileList4[i].url
					}else{
						this.frmdat.ioc=this.frmdat.ioc+","+this.fileList4[i].url
					}
				}
				uni.$u.http.post('Bill/jiaofei', this.frmdat)
					.then(res => {
						if(res.code==200){
							uni.showToast({
								title: res.msg,
								icon: 'success',
								duration: 2000
							})
							this.list=[];
							this.page=1;
							this.gethome()
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
			open() {
				// console.log('open');
				
			},
			close() {
				this.show = false;
				
				// console.log('close');
			},
			
		},
		onReachBottom(){//do sth
			if(this.xia==0){
				this.gethome()
				
			}
		},
	}
</script>

<style>
	.ys{
		color: red;
	}
	.ysa{
		color: #00aaff;
	}
	.ysb{
		color: #f56c6c;
	}
	.ysc{
		color: #a5a5f8;
	}
	.jiaofei{
		background-color: #00aaff;
		color: #fff;
		font-size: 26rpx;
		padding: 8rpx 15rpx;
		border-radius: 20rpx;
		float: right;
		letter-spacing: 2rpx;
	}
</style>