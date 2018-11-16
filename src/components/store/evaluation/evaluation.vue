<template>
  <div class="evaluation" >
	  <div ref="ratingScroll"  class="evaluation-content">
		<div>
				<!-- 商家信息 -->
				<div class="shop-message">
					<div class="message-left">
						<p class="score">3.9</p>
						<p class="comprehensive-score">综合评分</p>
						<p class="contrast">高于周边商家69.2%</p>
						<div class="border"></div>
					</div>
					<div class="message-right">
						<ul class="service-list">
							<li>
								<span class="service-tit">服务态度</span>
								<span class="service-star"><star :score="4" :size="24"></star></span>
								<span class="service-score">3.9</span>
							</li>
							<li>
								<span class="service-tit">服务态度</span>
								<span class="service-star"><star :score="4" :size="24"></star></span>
								<span class="service-score">4.0</span>
							</li>
							<li>
								<span class="service-tit">送达时间</span>
								<span class="service-time">44分钟</span>
							</li>
						</ul>
					</div>
				</div>
				<!-- 分割线 -->
				<div class="split">
					<div class="split-padding"></div>
				</div>
				<!-- 分类选择 -->
				<div>	
					<label-box :txtArr='["全部","满意","不满意"]' :ratings="ratings"
					@isFilter="setFilter" @ratingType="setType"></label-box>
				</div>

				<div class="line"></div>
				<!-- 评价列表 -->
				<div class="list">
					<ul>
						<li v-for="(rating,index) in selectArr" :key="index" v-show="filter?rating.text:true">
							<div class="author">
								<img :src="rating.avatar" width="28px" height="28px" alt="">
							</div>
							<div class="content">
								<p class="user-name">
									<span>{{rating.username}}</span>
									<span class="create-time">{{rating.rateTime}}</span>
								</p>
								<div class="score">
									<star :score="rating.score" :size="24"></star>
									<span class="deliveryTime">{{rating.deliveryTime}}分钟到达</span>
								</div>
								<p class="user-txt">
									{{rating.text}}
								</p>
								<div class="user-label">
									<div class="icon">
										<i v-show="rating.rateType==0" class="icon-thumb_up"></i>
										<i v-show="rating.rateType==1" class="icon-thumb_down"></i>
									</div>
									<div class="recommend">
										<ul>
											<li v-for="(item,index) in rating.recommend" :key="index">
												<span>{{item}}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
							
							<div class="line"></div>
						</li>
					</ul>
				</div>
		</div>
	  </div>
  </div>
</template>

<script>
const ERR_OK = 0;
import star from "../../common/star/star";
import labelBox from "../../common/labelBox/labelBox";
import BScroll from "better-scroll";
import {formatDate} from "../../../common/js/date.js"

export default {
  name: "evaluation",
  data() {
    return {
	  ratings: [], //评价信息
	  filter:false,//是否显示没有内容的评价
	  type:2, //默认显示全部评价
    };
  },
  components: {
    star: star,
    labelBox: labelBox
  },
  created() {
    this.$http.get("http://172.16.18.1:8080/api/ratings").then(
      response => {
        response = response.body;
        if (response.errno == ERR_OK) {
		  this.ratings = response.data;
		  this.ratings.forEach(rating=>{
			  rating.rateTime=formatDate(new Date(rating.rateTime),"yyyy-MM-dd hh:mm:ss");
		  })
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      },
      response => {
        // error callback
      }
    );
  },
  mounted() {},
  computed:{
	  selectArr(){
		  let ratingArr=[];
		  if(this.type==2){
			  return this.ratings;
		  }else{
			this.ratings.forEach((rating)=>{
				if(rating.rateType==this.type){
					ratingArr.push(rating);
				}
			})
			return ratingArr;
		  }
		  
	  }
  },
  methods: {
    //初始化滚动条
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratingScroll, {
          click: true
        });
      } else {
        this.scroll.refresh(); //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        this.scroll.scrollTo(0, 0, 0.1);
      }
	},
	//将label组件传递的值赋给filter
	setFilter(data){
		this.filter=data;
	},
	setType(i){
		this.type=i;
	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
.evaluation
	overflow hidden
	.evaluation-content
		width 100%
		height 100%
		overflow hidden
.split
	width 100%
	height 16px
	background rgba(7, 17, 27, 0.1)
	box-sizing border-box
	padding 1px 0
	.split-padding
		width 100%
		height 100%
		background #f3f5f7
.shop-message
	box-sizing border-box
	padding 18px 0px
	overflow hidden
	.message-left
		box-sizing border-box
		padding 4px 12px
		width 36%
		float left
		text-align center
		position relative
		.border
			position absolute
			width 1px
			height 100%
			background-color rgb(239, 239, 239)
			top 0
			right 0px
		.score
			font-size 24px
			color rgb(255, 153, 0)
			line-height 28px
		.comprehensive-score
			font-size 12px
			color rgb(7, 17, 27)
			line-height 12px
			padding 6px 0px 8px 0px
		.contrast
			font-size 10px
			color rgba(7, 17, 27, 0.5)
			line-height 10px
	.message-right
		box-sizing border-box
		padding 4px 18px
		width 63%
		float right
		.service-list
			>li
				margin-top 6px
			>li:first-child
				margin-top 2px
			.service-tit
				font-size 12px
				color rgb(7, 17, 27)
				line-height 18px
				display inline-block
				float left
				margin-right 12px
			.service-star
				display inline-block
				float left
			.service-score
				font-size 12px
				color rgb(255, 153, 0)
				line-height 18px
				margin-left 6px
			.service-time
				font-size 12px
				color rgb(147, 153, 169)
				line-height 18px
.list
	box-sizing border-box
	padding 0 18px 18px 18px
	.author
		width 28px
		height 28px
		border-radius 28px
		overflow hidden
		float left
	.content
		width 100%
		box-sizing border-box
		padding-left 40px
		.user-name
			font-size 10px
			line-height 12px
			color rgb(7, 17, 27)
			.create-time
				float right
				font-weight 200
				color rgb(147, 153, 159)
		.score
			padding 4px 0 6px 0
			>div
				display inline-block
			.deliveryTime
				font-size 10px
				line-height 12px
				color rgb(147, 153, 159)
				vertical-align text-bottom
		.user-txt
			font-size 12px
			line-height 18px
			color rgb(7, 17, 27)
			padding 0px 0 8px 0
		.user-label
			overflow hidden
			.icon
				width 12px
				float left
				i
					font-size 12px
					line-height 16px
					&:first-child
						color rgb(0, 160, 220)
					&:last-child
						color rgb(183, 187, 193)
			.recommend
				width 100%
				box-sizing border-box
				padding-left 12px
				li
					>span
						vertical-align text-bottom
					font-size 10px
					max-width 80px
					line-height 18px
					color rgb(147, 153, 159)
					margin-bottom 8px
					margin-left 8px
					float left
					padding 0 6px
					background-color rgb(255, 255, 255)
					border none
					display inline-block
					position relative
					-webkit-box-sizing border-box
					box-sizing border-box
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					>span:after
						content ''
						position absolute
						top 0
						left 0
						border 1px solid rgba(7, 17, 127, 0.3)
						-webkit-box-sizing border-box
						box-sizing border-box
						width 200%
						height 200%
						-webkit-transform scale(0.5)
						transform scale(0.5)
						-webkit-transform-origin left top
						transform-origin left top
.line
	width 100%
	height 1px
	line-height 0
	margin 18px 0px
	background-color rgba(7, 17, 27, 0.1)
</style>
