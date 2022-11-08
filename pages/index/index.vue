<template>
	<view class="content">
		<view class="header-wrap">
			<image class="logo" src="https://luckyp.top/images/bg_header.jpg" mode="top left"></image>
			<text class="title">{{title}}</text>
		</view>
		<view class="home-list">
			<view class="list-wrap" v-for="(item,index) in listData" :key="index">
				<view class="list-title">
					<text>{{item.title}}</text>
				</view>
				<view class="list-time">
					<text>发表于:{{$u.timeFormat(item.date, 'yyyy-mm-dd')}}</text>
					<text v-if="item.date !== item.updated">更新于: {{$u.timeFormat(item.updated, 'yyyy-mm-dd')}}</text>
				</view>
			</view>
			<text class="list-footer" v-if="this.pageNum >= this.pageCount">---我是有底线的---</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '远方',
				pageNum: 1,
				listData: [],
				pageCount: 99
			}
		},
		onLoad() {
			this.getListData()
		},
		onPullDownRefresh() {
			this.listData = [];
			this.pageNum = 1;
			this.getListData();
		},
		onReachBottom() {
			if(this.pageNum + 1 > this.pageCount)return;
			this.pageNum += 1;
			this.getListData();
		},
		methods: {
			getListData() {
				this.http.get(`/api/posts/${this.pageNum}.json`).then(res => {
					console.log(res)
					let tempData = res.data;
					this.pageCount = res.pageCount;
					this.listData = [...this.listData, ...tempData];
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.header-wrap{
		width: 100%;
		position: relative;
		.logo {
			height: 300rpx;
			width: 100%;
		}
		
		.title{
			position: absolute;
			left: 20rpx;
			bottom: 20rpx;
			font-size: 36rpx;
			color: #737375;
		}
	}
	.home-list{
		width: 100%;
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.list-wrap{
		margin: 30rpx 0rpx 20rpx;
		padding: 20rpx;
		border-radius: 15rpx;
		background: #efefef;
		.list-title{
			font-size: 33rpx;
		}
		.list-time{
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;    
			font-size: 25rpx;
			color: #7b7a78;
		}
	}
	.list-footer{
		text-align: center;
		color: #737375;
		font-size: 25rpx;
		display: block;
		margin-bottom: 20rpx;

	}
	
</style>
