<template>
  <div class="cart">

	  <!-- 购物车列表 -->
	  
	
      <div class="foodsList">
		  <transition name="bg">
		 	 <div class="fl-bg" v-show="isListCart"  @click="openCart"></div>
		  </transition>
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
									<cartControl :food="item"></cartControl>
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
      isShowCart: false //判断列表是否显示的条件
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
		isShow=this.isShowCart=false;
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
	  this.isShowCart=false;
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
</style>
