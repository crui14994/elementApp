<template>

	<transition name="bg">
  <div class="food" v-show="foodShow" ref="foodScroll" >
	
		<div class="food-content">
				<span class="arrow_lift" @click="show($event)"><i class="icon-arrow_lift"></i></span>
				<div class="food-img">
					<img :src="food.image" width="100%"  alt="">
				</div>
				<!-- 商品头部 -->
				<div class="food-header">
					<p class="food-name">{{food.name}}</p>
					<p class="food-count"><span>月售{{food.sellCount}}</span><span class="food-rating">好评率{{food.rating}}%</span></p>
					<p class="food-price">
						<span class="now-price"><span class="symobe">￥</span>{{food.price}}</span>
						<span class="old-price" v-if="food.oldPrice"><span class="symobe">￥</span>{{food.oldPrice}}</span>
						<span class="add-cart" v-show="!addBtn" @click.stop.prevent="addCart">加入购物车</span>
						<span class="add-num" v-show="addBtn">
								<cartControl :food="food"></cartControl>
						</span>
					</p>
				</div>
				<!-- 分割线 -->
				<div class="split">
					<div class="split-padding"></div>
				</div>
				<!-- 商品介绍 -->
				<div class="food-introduce">
					<p class="food-introduce-tit">商品介绍</p>
					<p class="food-introduce-txt">{{description}}</p>
				</div>

				<!-- 分割线 -->
				<div class="split">
					<div class="split-padding"></div>
				</div>

				<!-- 商品评价 -->
				<div class="food-evaluation">
					<label-box :txtArr='["全部","满意","不满意"]' :ratings="food.ratings"
					@isFilter="setFilter" @ratingType="setType"></label-box>
				</div>


				<div class="line"></div>

				<!-- 评价列表 -->
				<div class="food-e-list">
					<span v-if="foodShow && selectArr.length===0" class="no-txt">暂无评价</span>
					<ul class=" " v-if="selectArr">
						<li v-for="(item,index) in selectArr" :key="index"  v-show="filter?item.text:true">
							<div class="user-message">
								<div class="data">{{item.rateTime}}</div>
								<div class="message">
									<p class="phone">{{item.username}}<span class="user-icon"><img :src="item.avatar" width="12" height="12" alt=""></span></p>    
								</div>
							</div>
							<p class="food-e-message">
								<span v-if="item.rateType===0" class="icon icon-thumb_up"></span>
								<span v-if="item.rateType===1" class="icon icon-thumb_down"></span>
								<span>{{item.text}}</span>
							</p>
							<div class="line"></div>
						</li>
					</ul>
				</div>
		</div>
  </div>
  
	  </transition>
</template>

<script>
import cartControl from "../../common/cartcontrol/cartcontrol";
import BScroll from "better-scroll";
import labelBox from "../../common/labelBox/labelBox";
import Vue from "vue";

export default {
  name: "food",
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      foodShow: false, //商品详情是否显示
      empty: false, //是否只看有内容的评价
      filter: false, //是否显示没有内容的评价
      type: 2 //默认显示全部评价
    };
  },
  components: {
    cartControl: cartControl,
    labelBox: labelBox
  },
  created() {
  },
  mounted() {
		
    setTimeout(() => {
      this._initScroll();
		}, 20);
		
	},
	watch:{
		foodShow(){
			this._initScroll();
		}
	},
  computed: {
    description() {
      if (!this.food.description) {
        return "无";
      } else {
        return this.food.description;
      }
    },
    selectArr() {
			
      let ratingArr = [];
      if (this.type == 2) {
        ratingArr = this.food.ratings;
      } else {
        this.food.ratings.forEach(rating => {
          if (rating.rateType == this.type) {
            ratingArr.push(rating);
          }
        });
			}
      return ratingArr;
    },
    /*点击加入购物车隐藏购物车按钮*/
    addBtn() {
      if (this.food.count >= 1) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    /*初始化滚动条*/
    _initScroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true,
            startY: 300,
            bounce: true,
            probeType: 3
          });
        } else {
          this.scroll.refresh(); //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
          this.scroll.scrollTo(0, 0, 0.1);
        }
      });
    },
    show() {
      if (!event._constructed) {
        return;
      }
      !this.foodShow ? (this.foodShow = true) : (this.foodShow = false);
      this._initScroll();
    },
    /*加入购物车*/
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count += 1;
      }
      this.$emit("postEl", event.target);
    },
    //将label组件传递的值赋给filter
    setFilter(data) {
      this.filter = data;
    },
    setType(i) {
      this.type = i;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
.arrow_lift
	position absolute
	top 5px
	left 5px
	font-size 18px
	padding 5px
	color #fff
	i
		text-shadow 1px 1px 1px #898989
.food
	width 100%
	height 100%
	overflow hidden
	position fixed
	top 0
	left 0
	background-color #fff
	z-index 150
	.food-header
		box-sizing border-box
		padding 18px
.food-name
	font-size 14px
	font-weight 700
	color rgb(7, 17, 27)
	line-height 14px
.food-count
	margin-top 8px
	font-size 10px
	color rgb(147, 153, 159)
	.food-rating
		margin-left 12px
.food-price
	margin-top 18px
	font-size 10px
	position relative
	.now-price
		color rgb(240, 20, 20)
		font-size 14px
		line-height 24px
		font-weight 700
		.symobe
			font-size 10px
			font-weight normal
			vertical-align top
	.add-cart
		position absolute
		right 0
		bottom 0
		width 74px
		height 24px
		background-color rgb(0, 160, 220)
		border-radius 22px
		text-align center
		line-height 24px
		color #fff
		font-size 10px
		padding 5px 10px
	.add-num
		position absolute
		right 0
		bottom 0
		width 74px
		height 24px
	.old-price
		color rgb(147, 153, 159)
		font-size 10px
		line-height 24px
		font-weight 700
		text-decoration line-through
		.symobe
			font-size 10px
			font-weight normal
			vertical-align top
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
.food-introduce
	box-sizing border-box
	padding 18px
	.food-introduce-tit
		font-size 14px
		color rgb(7, 17, 27)
		line-height 14px
		font-weight 200
	.food-introduce-txt
		font-size 12px
		font-weight 200
		margin-top 6px
		line-height 24px
		color rgb(77, 85, 93)
.food-evaluation
	padding-bottom 18px
.food-evaluation-tit
	font-size 14px
	color rgb(7, 17, 27)
	line-height 14px
	font-weight 200
.food-e-nav
	box-sizing border-box
	padding 18px 0
	margin-left -8px
	&:after
		content ''
		display block
		clear both
	li
		float left
		display inline-block
		padding 8px 12px
		// background rgb(0, 160, 220)
		background rgba(0, 160, 220, 0.2)
		margin-left 8px
		// color rgb(255, 255, 255)
		color rgb(77, 85, 93)
		font-size 12px
		line-height 18px
		border-radius 6px
		&.teasing
			background rgba(77, 85, 93, 0.2)
			color rgb(77, 85, 93)
		.nav-num
			font-size 8px
			margin-left 4px
			vertical-align text-top
		&.nav-active
			background rgb(0, 160, 220)
			color rgb(255, 255, 255)
.food-e-filter
	box-sizing border-box
	padding 12px 0 0
	font-size 12px
	line-height 24px
	color rgb(147, 153, 159)
	.icon
		font-size 24px
		line-height 24px
		&.icon-active
			color rgb(0, 160, 220)
.food-e-list
	box-sizing border-box
	padding 18px
	padding-bottom 60px
	.no-txt
		font-size 12px
	.user-message
		width 100%
		font-size 10px
		padding-top 12px
		box-sizing border-box
		color rgb(147, 153, 159)
		.data
			width 150px
			float left
			.time
				vertical-align top
				margin-left 4px
		.message
			text-align right
			.user-icon
				width 12px
				height 12px
				border-radius 12px
				overflow hidden
				display inline-block
				vertical-align top
				margin-left 4px
				img
					vertical-align top
	.food-e-message
		width 100%
		box-sizing border-box
		padding 6px 0 12px 0px
		font-size 12px
		line-height 16px
		color rgb(7, 17, 27)
		.icon
			font-size 12px
			line-height 24px
			color rgb(147, 153, 159)
			vertical-align inherit
.line
	width 100%
	height 1px
	background rgba(7, 17, 27, 0.1)
.bg-enter
	transform translateX(400px)
.bg-enter-active, .bg-leave-active
	transition all 0.4s
.bg-leave
	transform translateX(0px)
.bg-leave-active
	transform translateX(400px)
.icon-thumb_up
	color rgb(0, 160, 220) !important
</style>
