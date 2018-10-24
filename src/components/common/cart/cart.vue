<template>
  <div class="cart">

	  <!-- 购物车列表 -->
	  
	
      <div class="foodsList">
		  <transition name="bg">
		 	 <div class="fl-bg" v-show="isListCart"  @click="openCart"></div>
		  </transition>

		  <!-- 购物车小球 -->
		  <div class="ball-container">
			<div v-for="(ball,index) in balls" :key="index">
				<transition name="dropdown" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook icon-add_circle"></div>
					</div>
				</transition>	
			</div>
		  </div>

		  <!-- 购物车列表 -->
		  <transition name="listFade">
			<div class="foods-box" v-show="isListCart">
				<div class="foods-header">
					<span class="cart-txt">购物车</span>
					<span class="clear-cart" @click="closeCart">清空</span>
				</div>
				<div class="lists" ref="listsBox">
						<ul>
							<li v-for="(item,index) in selectFoods" :key="index">
								<span class="food-title">{{item.name}}</span>
								<span class="food-price">
									<span class="symbol">￥</span>{{item.price}}
								</span>
								<span class="food-control">
									<cartControl :food="item" @postEl="getEl"></cartControl>
								</span>
							</li>
						</ul>
				</div>				
			</div>
		  </transition>
      </div>
	
      <!-- 购物车图标 -->
      <div class="cart-icon" :class="{'cart-active':cartNum>0}" @click="openCart">
        <i class="icon-shopping_cart"></i>
      </div>
      <!-- 购物车信息 -->
      <div class="cart-price">
        <span class="shop-price " :class="{'total-active':totalPrice>0}">￥{{totalPrice}}</span>
        <span class="lone"></span>
        <span class="cost">另需配送费￥{{deliveryPrice}}元</span>
      </div>
      <!-- 需要支付的价格 -->
      <div class="cart-total " :class="{'pay-active':isPay}">{{payMessage}}</div>
      <!-- 购物车数量 -->
      <span v-show="cartNum>0" class="icon-num">{{cartNum}}</span>

      
  </div>
</template>

<script>
import cartControl from "../cartcontrol/cartcontrol";
import BScroll from "better-scroll";

export default {
  name: "cart",
  props: {
    selectFoods: {
      //购物车中商品的数组
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      //运费
      type: Number,
      default: 0
    },
    minPrice: {
      //起送价格
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isPay: false, //是否达到支付条件
      isShowCart: false, //判断列表是否显示的条件
      balls: [
        //购物车小球5个
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [] //已经在下降的小球存在这里
    };
  },
  computed: {
    cartNum() {
      //购物车中的数量
      let num = 0;
      if (this.selectFoods) {
        this.selectFoods.forEach(food => {
          num += food.count;
        });
      }
      return num;
    },
    totalPrice() {
      //购物车中商品的总价格
      let total = 0;
      if (this.selectFoods) {
        this.selectFoods.forEach(food => {
          total += food.price * food.count;
        });
      }
      return total;
    },
    payMessage() {
      //支付信息
      let message = this.minPrice + "起送";
      if (this.totalPrice != 0) {
        if (this.totalPrice < this.minPrice) {
          message = "还差" + (this.minPrice - this.totalPrice) + "起送";
          this.isPay = false;
        } else if (this.totalPrice >= this.minPrice) {
          message = "去支付";
          this.isPay = true;
        }
      } else {
        this.isPay = false;
      }
      return message;
    },
    isListCart() {
      //显示隐藏购物车列表
      let isShow;
      if (this.isShowCart && this.cartNum) {
        isShow = true;
        this.$nextTick(() => {
          //一些需要在页面数据变化完成后才执行的函数需要写在$nextTick中
          if (!this.listScroll) {
            this.listScroll = new BScroll(this.$refs.listsBox, {
              click: true
            });
          } else {
            this.listScroll.refresh(); //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
          }
        });
      } else {
        isShow = this.isShowCart = false;
      }
      return isShow;
    }
  },
  created() {},
  components: {
    cartControl: cartControl
  },
  mounted() {},
  methods: {
    openCart(enevt) {
      //如果购物车中有商品打开购物车列表
      if (this.cartNum) {
        this.isShowCart = !this.isShowCart;
      }
    },
    closeCart(enevt) {
      //清空购物车
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
      this.isShowCart = false;
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },

    /*获得当前点击的元素dom*/
    getEl(el) {
      //体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.drop(el);
      });
	},
	
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //获取元素的位置
          let x = rect.left - 32; //小球掉落X轴起点
          let y = -(window.innerHeight - rect.top - 22); //小球掉落Y轴起点,向下为负
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0, ${y}px,0)`; /* Safari 和 Chrome */
          el.style.transform = `translate3d(0, ${y}px,0)`; //旋转div元素
          //处理内层动画
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el, done) {
      //关闭ESlint语法监测，因为ES6语言规范会让被申明却未被调用的变量报错
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; //申明rf是为了触发浏览器的重排
      this.$nextTick(() => {
        //修改数据之后立即使用这个方法，获取更新后的 DOM。
        el.style.webkitTransform = "translate3d(0, 0, 0)"; /* Safari 和 Chrome */
        el.style.transform = "translate3d(0, 0, 0)"; //旋转div元素
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0, 0, 0)";
        inner.style.transform = "translate3d(0, 0, 0)";
        el.addEventListener("transitionend", done); //Vue为了知道过渡的完成，否则无法进入到afterEnter中
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift(); //把数组的第一个元素从其中删除，并返回第一个元素的值。
      if (ball) {
        ball.show = false;
        el.style.display = "none"; //隐藏小球
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
.cart
	width 100%
	height 100%
	position relative
	.icon-num
		position absolute
		top 0px
		left 44px
		// width 30px
		padding 1px 5px
		// height 20px
		z-index 150
		font-weight 700
		border-radius 8px
		font-size 9px
		color #fff
		text-align center
		line-height 16px
		background-color rgb(240, 20, 20)
		box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
	.cart-icon
		width 44px
		height 44px
		position absolute
		bottom 2px
		margin 0 12px
		z-index 105
		border solid 6px #141d27
		// box-sizing border-box
		border-radius 44px
		background-color #2B333B
		text-align center
		line-height 40px
		font-size 24px
		color #80858A
		&.cart-active
			background-color rgb(0, 160, 260)
			>i
				color #fff
	.cart-price
		width 100%
		height 48px
		background-color #141d27
		position absolute
		bottom 0
		right 0
		box-sizing border-box
		padding 12px 105px 12px 80px
		color rgba(255, 255, 255, 0.4)
		// line-height 24px
		font-size 16px
		.shop-price
			font-weight 700
			line-height 24px
			&.total-active
				color #fff
		.lone
			content ''
			display inline-block
			width 1px
			height 100%
			background-color rgba(255, 255, 255, 0.1)
			margin 0 12px
		.cost
			line-height 24px
			font-size 10px
	.cart-total
		width 105px
		height 48px
		background-color #2B333B
		position absolute
		bottom 0
		right 0
		font-size 12px
		line-height 24px
		font-weight 700
		text-align center
		box-sizing border-box
		padding 12px 0
		color rgba(255, 255, 255, 0.4)
		&.pay-active
			background-color rgb(0, 160, 260)
			color #fff
.foodsList
	position relative
	width 100%
	height 100%
	top 0px
	left 0
	.fl-bg
		width 100%
		height 100%
		position fixed
		top 0
		left 0
		z-index -1
		background-color rgba(7, 17, 27, 0.6)
		backdrop-filter blur(10px)
	.foods-box
		width 100%
		height 305px
		position absolute
		bottom 0
		background-color rgb(255, 255, 255)
		.foods-header
			width 100%
			height 40px
			background-color #f3f5f7
			&:after
				content ''
				display block
				width 100%
				height 2px
				background-color rgba(7, 17, 27, 0.1)
			.cart-txt
				font-size 14px
				font-weight 200
				color rgb(7, 17, 27)
				line-height 40px
				padding 0 18px
			.clear-cart
				font-size 12px
				line-height 40px
				color rgb(0, 60, 220)
				float right
				padding 0 18px
		.lists
			width 100%
			height 200px
			overflow hidden
			box-sizing border-box
			padding 0 18px
			>ul
				width 100%
				>li
					width 100%
					height 48px
					box-sizing border-box
					padding 12px 0
					position relative
					&:after
						content ''
						display block
						clear both
						width 100%
						height 1px
						position absolute
						bottom 0
						left 0
						background-color rgba(7, 17, 27, 0.1)
					span
						display inline-block
						overflow hidden
					.food-title
						width 62%
						float left
						font-size 14px
						line-height 24px
						padding-right 18px
						box-sizing border-box
						color rgb(7, 17, 27)
					.food-price
						width 15%
						float left
						font-size 14px
						color rgb(240, 20, 20)
						line-height 24px
						text-align center
						.symbol
							font-size 10px
							vertical-align bottom
					.food-control
						// width 25%
						float right
.bg-enter
	opacity 0
.bg-enter-active, .bg-leave-active
	transition all 0.5s
.bg-leave
	opacity 1
.bg-leave-active
	opacity 0
.listFade-enter
	transform translateY(305px)
.listFade-enter-active, .listFade-leave-active
	transition all 0.5s
.listFade-leave
	transform translateY(0px)
.listFade-leave-active
	transform translateY(305px)
.ball
	position fixed
	left 32px
	bottom 22px
	transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
	z-index 100
	.inner
		width 16px
		height 16px
		border-radius 50%
		background #fff
		color #00a0dc
		transition all 0.4s linear
</style>
