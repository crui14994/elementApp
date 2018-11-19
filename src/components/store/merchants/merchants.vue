<template>
  <div class="merchants" >
	  <div class="merchantsBox" ref="merchantsBox">
		  <div>
			<!-- 商家顶部信息 -->
			<div class="header">
				<div class="header-top">
					<div class="collection" @click="collection($event)" >
						<span class="icon" :class="{'active':isCollection}"><i class="icon-favorite"></i></span>
						<p class="icon-txt" v-show="!isCollection">收藏</p>
						<p class="icon-txt" v-show="isCollection">已收藏</p>
					</div>
					<div class="top-left">
						<p class="left-tit">{{seller.name}}</p>
						<p class="left-message">
							<span class="star"><star :score="seller.serviceScore" :size="36"></star></span>
							<span class="left-txt1">(661)</span>
							<span class="left-txt2">月售{{seller.sellCount}}单</span>
						</p>
					</div>
				</div>

				<div class="header-bottom">
					<div class="bottom-left">
						<p class="bottom-left-tit">起送价</p>
						<p class="bottom-left-price">
							<span class="price">{{seller.minPrice}}</span>
							<span class="price-txt">元</span>
						</p>
					</div>
					<div class="bottom-left">
						<p class="bottom-left-tit">商家配送</p>
						<p class="bottom-left-price">
							<span class="price">{{seller.deliveryPrice}}</span>
							<span class="price-txt">元</span>
						</p>
					</div>
					<div class="bottom-left last-box">
						<p class="bottom-left-tit">平均配送时间</p>
						<p class="bottom-left-price">
							<span class="price">{{seller.deliveryTime}}</span>
							<span class="price-txt">分钟</span>
						</p>
					</div>
				</div>
			</div>
			<!-- 分割线 -->
			<div class="split">
				<div class="split-padding"></div>
			</div>
			<!-- 公告与活动 -->
			<div class="activity">
				<p class="activity-tit">公告与活动</p>
				<p class="activity-txt">
					{{seller.bulletin}}
				</p>
				<ul class="activity-list">
					<li v-for="(item,index) in seller.supports" :key="index">
						<span class="img" :class="imgsArr[index]"></span>
						<span>{{item.description}}</span>
					</li>
				</ul>
			</div>
			<!-- 分割线 -->
			<div class="split">
				<div class="split-padding"></div>
			</div>
			<!-- 商家实景 -->
			<div class="live">
				<p class="live-tit">商家实景</p>
				<div class="live-imgs" >
					<div ref="imgScroll" class="imgs-scroll">
						<ul>
							<li v-for="(img,index) in seller.pics" :key="index">
								<img :src="img"  width="120" height="90" alt="">
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 分割线 -->
			<div class="split">
				<div class="split-padding"></div>
			</div>
			<!-- 商家信息 -->
			<div class="message">
				<p class="activity-tit">商家信息</p>
				<ul class="activity-list">
					<li v-for="(item,index) in seller.infos" :key="index">
						<span>{{item}}</span>
					</li>
				</ul>
			</div>
		  </div>
		
	  </div>
  </div>
</template>

<script>
import star from "../../common/star/star";
import BScroll from "better-scroll";
export default {
  name: "merchants",
  data() {
    return {
		imgsArr:["decrease","discount","special","invoice","guarantee"],
		isCollection:false //是否收藏
	};
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star: star
  },
  created(){
	// this.$nextTick(()=>{
	// 	this._initScroll();
	// })
  },
  mounted() {
    this.$nextTick(()=>{
		this._initScroll();
	})
  },
  methods:{
	   //初始化滚动条
	  _initScroll(){
		  if(!this.scroll){
			this.scroll=new BScroll(this.$refs.merchantsBox,{
				click:true
			})
		  }else{
			  this.scroll.refresh(); //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        	  this.scroll.scrollTo(0, 0, 0.1);
		  }

		  let ulBox=this.$refs.imgScroll.getElementsByTagName("ul")[0];
		  ulBox.style.width=((this.imgsArr.length-1)*126-6)+"px";
		  if(!this.imgScroll){
			this.imgScroll=new BScroll(this.$refs.imgScroll,{
				scrollX:true,
				scrollY:false
			})
		  }else{
			this.scroll.refresh(); 
		  }  
	  },
	//   收藏
	collection(event){
		if (!event._constructed) {
        	return;
		  }
		  console.log(0)
		this.isCollection=!this.isCollection;
	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon';
@import '../../../common/stylus/mixin';

.merchants 
	.merchantsBox
		width 100%
		height 100%
	.header 
		padding: 18px;
		box-sizing: border-box
		position relative
		.header-top 
			.collection 
				width: 48px;
				float: right;
				text-align center
				.icon
					font-size 24px
					line-height 24px
					color #898989
					&.active>i
						color rgb(240,20,20)
				.icon-txt
					font-size 10px
					margin-top 4px
					color rgb(77,85,93)
					line-height 10px
			.top-left 
				width: 100%;
				padding-right: 50px;
				box-sizing: border-box;
				.left-tit
					font-size 14px
					color rgb(7,17,27)
					line-height 14px
					font-weight 700
				.left-message
					margin  8px 0 18px 0
					box-sizing border-box
					height 18px
					.star
						vertical-align top
						div
							display inline-block
					.left-txt1,.left-txt2
						font-size 10px
						line-height 18px
						color rgb(77,85,93)
					.left-txt2
						margin-left 2px
		.header-bottom
			padding 18px 0px 0 0px
			position relative
			height 64px
			box-sizing border-box
			overflow hidden
			&:before
					content: '';
					position: absolute;
					left: 0;
					top 0
					background: rgba(7,17,27,0.1)
					width: 100%;
					height: 1px;
					transform: scaleY(0.5);
					transform-origin: 0 0;
			.bottom-left
				width 33%
				height 100%
				position relative
				float left
				text-align center
				&:before
					content: '';
					display block
					position: absolute;
					right: 0;
					top 0
					background: rgba(7,17,27,0.1)
					width: 1px;
					height: 200%;
					transform: scaleY(0.5);
					transform-origin: 0 0;
				&.last-box:before
					display none 
				.bottom-left-tit
					font-size 10px
					margin-top 4px
					line-height 10px
					color rgb(147,153,159)
				.bottom-left-price
					margin-top 6px
					font-size 24px
					color rgb(7,17,27)
					font-weight 200
					line-height 24px
					.price
						vertical-align top 
					.price-txt
						font-size 10px




	.activity,.message
		padding 18px
		box-sizing border-box
		.activity-tit
			font-size 14px
			font-weight 700
			line-height 14px
			color rgb(7,17,27)
			margin-bottom 8px
		.activity-txt
			font-size 12px
			line-height 24px
			font-weight 200
			color rgb(240,20,20)
			margin-bottom 16px
		.activity-list
			position relative
			li:before
				content: '';
				position: absolute;
				left: 0;
				top 0
				background: rgba(7,17,27,0.1)
				width: 100%;
				height: 1px;
				transform: scaleY(0.5);
				transform-origin: 0 0;
			li 
				padding 16px
				position relative
				font-size 12px
				line-height 16px
				font-weight 200
				.img
					display inline-block
					width 16px
					height 16px
					background-size: 16px 16px
					background-repeat: no-repeat
					&.decrease
						bg-image('decrease_4') // 使用bg-image($url)函数 
					&.discount
						bg-image('discount_4') // 使用bg-image($url)函数 
					&.special
						bg-image('special_4') // 使用bg-image($url)函数 
					&.invoice
						bg-image('invoice_4') // 使用bg-image($url)函数 
					&.guarantee
						bg-image('guarantee_4') // 使用bg-image($url)函数 
	.message
		.activity-tit
			margin-bottom 12px
		.activity-list
			li 
				padding 12px
	.live
		padding 18px
		box-sizing border-box
		.live-tit
			font-size 14px
			font-weight 700
			line-height 14px
			color rgb(7,17,27)
			margin-bottom 12px
		.live-imgs
			width 100%
			height 90px
			overflow hidden
			.imgs-scroll
				height 100%
				ul 
					width auto
					li 
						float left
						margin-left 6px
					li:first-child
						margin-left 0
.split 
	width: 100%;
	height: 16px;
	background: rgba(7, 17, 27, 0.1);
	box-sizing: border-box;
	padding: 1px 0;
	.split-padding 
		width: 100%;
		height: 100%;
		background: #f3f5f7;
	

</style>
