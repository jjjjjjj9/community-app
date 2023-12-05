<template>
	<view>
		<view class="obty wrap">
			感谢您的关注，我们很荣幸。同时也恭喜您，因为您找到了一家专业的也是您所需的团队！
		</view>
		<view class="wrap">
			如果有幸能成为合作伙伴，那么请仔细了解下我们的合作流程，这样能在今后合作中规避矛盾，加快效率！彼此信任，互相协助，才能实现双赢的结果！
		</view>
		
		<view class="name">
			<view class="wm">关于我们</view>
			<u-line color="#19be6b" margin="20rpx 0" length="8%" :hair-line="false" style="border-bottom-width: 5rpx" />
			<view class="content">
				我们团队来自各领域资深技术人，致力于打破传统单 一外包模式，真正从企业长远发展的全局角度来进行战略规划设计。做到“技术保障”，“领域全面”，“服务完善”，争在业界独树一帜。
			</view>
			
			<view class="content">
				我们以多年的线下经验及技术开发团队开拓线上互联网时代，目前线上平台主要经营项目涵盖：高端APP定制开发、高端网站设计与开发、企业互联网营销推广、微信/小程序开发、企业数据托管、定制开发行业软件应用平台（ERP/OA系统）、计算机信息咨询、及其技术服务等。
			</view>
			
		</view>
		<view class="hz">
			<view class="zh">合作</view>
			<view class="tuandi">感谢您对团队的关注，请直接致电：</view>
			<view class="tuandi">134-7686-5273 （微信同号）</view>
		</view>
		
		<view class="name">
			<view class="wm">坚守软件服务，以软件创造价值，打造新生命力</view>
			<u-line color="#19be6b" margin="20rpx 0" length="8%" :hair-line="false" style="border-bottom-width: 5rpx" />
			<view class="content">
				从2019年团队成立以来，一贯秉持“客户至上、服务第一”的理念宗旨，力求为广大企事业单位投身信息时代大潮提供最专业、最便捷、最全面的服务。
			</view>
			
			<view class="content">
				我们以客户为中心，以技术为基础，以质量求生存，以诚信求发展，优秀的我们，为您提供一个无懈可击的展示空间，给您优秀的企业做最好的嫁衣！
			</view>
			
		</view>
		<view class="hz">
			<view class="zh">技术支持</view>
			<view class="tuandi">7*24小时技术支持，确保各系统安全、稳定。</view>
			<view class="tuandi">134-7686-5273 （微信同号）</view>
		</view>
		<view class="dizhi">
			武汉
			
		</view>
		<view class="xiantiao"></view>
		<view class="geren">
			<view class="jianj"><text class="ysd">电话：</text><text class="dhu">134-7686-5273 （微信同号）</text></view>
			<view class="jianj"><text class="ysd">地址：</text><text class="dhu">武汉国际企业中心</text></view>
			<image src="https://shopimges.oss-cn-hangzhou.aliyuncs.com/dz.png" mode="widthFix" class="imgs"></image>
		</view>
	</view>
</template>
 
<script>
	
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	page{
		background-color: #fff;
	}
	.obty{
		padding-top: 0rpx;
	}
	.wrap{
		font-size: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		text-indent:2em;
		color: #4E4E4E;
		line-height: 60rpx;
		letter-spacing:2rpx;
		
	}
	.name{
			padding:30rpx 30rpx 0 30rpx;
			margin-bottom: 60rpx;
		}
		.wm{
			color: #1E1E1E;
			font-size: 32rpx;
			font-weight:800;
		}
		.content{
			margin-top: 40rpx;
			font-size: 32rpx;
			text-indent:2em;
			color: #4E4E4E;
			line-height: 50rpx;
			letter-spacing:2rpx;
		}
	.hz{
		margin: 50rpx 30rpx;
		background-color: #F4F5F6;
		height: 300rpx;
		text-align: center;
	}
	.zh{
		padding-top: 40rpx;
		font-size: 42rpx;
		font-weight:900;
		color: #3D3C3C;
		padding-bottom: 20rpx;
	}
	.tuandi{
		padding-top: 25rpx;
		font-size: 32rpx;
		color: #787D7F;
	}
	.dizhi{
		margin: 30rpx;
		color: #1E1E1E;
		font-size: 34rpx;
		font-weight:600;
	}
	.xiantiao{
		height: 2rpx;
		margin: 30rpx;
		background-color: #D1D5D4;
	}
	.geren{
		margin: 30rpx;
		font-size: 30rpx;
		padding-bottom: 30rpx;
	}
	.jianj{
		margin-top: 20rpx;
	}
	.ysd{
		color: #5AB199;
	}
	.dhu{
		color: #4E4E4E;
	}
	.imgs{
		margin-top: 50rpx;
		width: 100%;
	}
</style>
