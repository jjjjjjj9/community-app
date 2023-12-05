<template>
	<view class="bianjia u-demo-block__content">
		<u-notice-bar text="业主信息以房屋认证信息为主,如有变动请联系物业工作人员!"></u-notice-bar>
		<u--form labelPosition="left" :model="model" ref="form1">
			
			<u-form-item label="选择类型:" borderBottom ref="item1" labelWidth="100">
				<u-radio-group v-model="model.lx">
					<u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.id">
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="标题:" borderBottom ref="item1" labelWidth="100" >
				<u--input v-model="model.title"  placeholder="请输入标题"  border="none">
				</u--input>
			</u-form-item>
			<u-form-item label="房间号:" borderBottom ref="item1" labelWidth="100" 
				@click="showSex = true; hideKeyboard()">
				<u--input v-model="model.type" disabled disabledColor="#ffffff" placeholder="请选择房间号" border="none">
				</u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="内容描述:" borderBottom ref="item1" labelWidth="100" >
				<u--textarea placeholder="请具体描述相关情况" v-model="model.details" count maxlength="200"></u--textarea>
			</u-form-item>
			<u-form-item  borderBottom ref="item1" labelWidth="0">
				<u-upload :fileList="fileList4" @afterRead="afterRead" @delete="deletePic" name="4" multiple :maxCount="3"></u-upload>
			</u-form-item>
		</u--form>
		<view class="but" @click="tijiao()">提交</view>

		<u-action-sheet :show="showSex" :actions="radiolist2" title="选择房间" @close="showSex = false"
			@select="sexSelect">
		</u-action-sheet>
	</view>
</template>

<script>
	import action from '@/common/util.js'
	export default {
		data() {
			return {
				showSex: false,
				lx: 0,
				model: {
					wxid:uni.getStorageSync('userData').uid,
					houseid:0,
					ioc: '',
					details: '',
					lx: 1,
					type: '',
					title:""
				},
				radiolist1: [{
					id:0,
						name: '投诉',
						disabled: false
					},
					{
						id:1,
						name: '建议',
						disabled: false
					}
				],
				radiolist2: [],
				fileList4: [],
			}
		},
		onLoad(e) {
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
			this.gethome()
		},
		methods: {
			gethome() {
				uni.$u.http.post('House/bydate', {id:uni.getStorageSync('userData').uid}).then(res => {
					let arr=[];
					for(let i=0;i<res.data.length;i++){
						arr.push({
							id:res.data[i].id,
							name: res.data[i].title+"-"+res.data[i].unit+"单元-"+res.data[i].name,
						})
					}
					
					this.radiolist2 = arr;
					
				})
			},
			sexSelect(e) {
				console.log(e)
				this.model.houseid = e.id
				this.model.type = e.name
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
				// console.log(this.fileList4)
				for (let i=0;i<this.fileList4.length;i++) {
					if(i==0){
						this.model.ioc=this.fileList4[i].url
					}else{
						this.model.ioc=this.model.ioc+","+this.fileList4[i].url
					}
				}
				// console.log(this.model)
				uni.$u.http.post('Suggestion/edit', this.model)
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
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.bianjia {
		padding: 10rpx 40rpx;
	}

	.but {
		border-radius: 30rpx;
		background-color: #2b85e4;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.yanghisb {
		display: inline;
	}

	.xanze {
		width: 100rpx;
		float: left;
		text-align: center;

	}
</style>
