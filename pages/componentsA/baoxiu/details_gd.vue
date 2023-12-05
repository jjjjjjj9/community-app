<template>
	<view>
		<view class="body_gong">
			<view>
				维修工单信息
				<text class="zhaungtai color4" @click="show = true" v-if="list.data.status<3">
					提交进度
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
					<u-form-item label="是否完成:" borderBottom ref="item1" labelWidth="100">
						<u-radio-group v-model="frmdat.status">
							<u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in radiolist1" :key="index"
								:label="item.name" :name="item.id">
							</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="进度描述 : " borderBottom labelWidth="100">
						<view class="u-page__rate-item">
							<u--textarea placeholder="请输入进度描述" v-model="frmdat.remarks" ></u--textarea>
						</view>
					</u-form-item>
					<u-form-item  borderBottom ref="item1" labelWidth="0">
						<u-upload :fileList="fileList4" @afterRead="afterRead" @delete="deletePic" name="4" multiple :maxCount="3"></u-upload>
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
	import action from '@/common/util.js'
	export default {
		components: {
			YSteps
		},
		data() {
			return {
				list: null,
				img: null,
				show: false,
				fileList4: [],
				radiolist1: [{
					id:2,
						name: '未完成',
						disabled: false
					},
					{
						id:3,
						name: '已完成',
						disabled: false
					}
				],
				frmdat:{
					id:0,
					status:2,
					remarks:"",
					ioc:"",
					fid:""
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
				uni.$u.http.post('RepairLog/edit', this.frmdat)
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
