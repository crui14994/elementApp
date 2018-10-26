<template>

	  <transition name="bg">
  <div class="food" v-show="foodShow" ref="foodScroll" @click="show">
		<div class="food-content">
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
						<span class="add-cart" @click.stop.prevent="addCart">加入购物车</span>
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
					<p class="food-evaluation-tit">商品评价</p>
					<ul class="food-e-nav">
						<li @click.stop.prevent="filterType()">全部<span class="nav-num" >54</span></li>
						<li @click.stop.prevent="filterType(0)" class="recommended">推荐<span class="nav-num" >54</span></li>
						<li @click.stop.prevent="filterType(1)" class="teasing">吐槽<span class="nav-num">54</span></li>
					</ul>
					<div class="line"></div>
					<p class="food-e-filter">
						<span class="icon icon-check_circle" :class="{'icon-active':empty}" @click.stop.prevent="filter"></span>
						<span>只看有内容的评价</span>
					</p>
					
				</div>
				<div class="line"></div>
				<!-- 评价列表 -->
				<div class="food-e-list">
					<ul class=" ">
						<li v-for="(item,index) in ratings" :key="index"  v-if="item.text||!empty">
							<div class="user-message">
								<div class="data">{{item.rateTime}}</div>
								<div class="message">
									<p class="phone">{{item.username}}<span class="user-icon"><img :src="item.avatar" width="12" height="12" alt=""></span></p>    
								</div>
							</div>
							<p class="food-e-message">
								<span class="icon icon-thumb_up"></span>
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
import BScroll from "better-scroll";
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
      ratingsType: 0 //推荐为0，吐槽为1
    };
  },
  components: {},
  created() {
    this._initScroll();
    Date.prototype.Format = function(fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
		};
  },
  mounted() {},
  computed: {
    description() {
      if (!this.food.description) {
        return "无";
      } else {
        return this.food.description;
      }
    },
    /**根据评价类型进行分类 */
    ratings() {
			let foodRatings = [];
			if(this.food.ratings){
					this.food.ratings.forEach((item)=>{
							let time=new Date(item.rateTime).Format("yyyy-MM-dd hh:mm:ss");
							item.rateTime=time;
					})
			}
      if (this.ratingsType != undefined && this.food.ratings) {
        this.food.ratings.forEach(element => {
          if (element.rateType === this.ratingsType) {
            foodRatings.push(element);
          }
        });
        return foodRatings;
      } else {
        return this.food.ratings;
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
					});
					
        } else {
					this.scroll.refresh(); //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
					this.scroll.scrollTo(0,0,0.1);
        }
      });
    },
    show() {
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
    /**是否只看有内容的评价 */
    filter() {
      !this.empty ? (this.empty = true) : (this.empty = false);
    },
    /**类型过滤 */
    filterType(n) {
      this.ratingsType = n;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
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
	box-sizing border-box
	padding 18px 18px 12px 18px
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
			background rgb(0, 160, 220)
			margin-left 8px
			color rgb(255, 255, 255)
			font-size 12px
			line-height 18px
			border-radius 6px
			&.recommended
				background rgba(0, 160, 220, 0.2)
				color rgb(77, 85, 93)
			&.teasing
				background rgba(77, 85, 93, 0.2)
				color rgb(77, 85, 93)
			.nav-num
				font-size 8px
				margin-left 4px
				vertical-align text-top
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
</style>
