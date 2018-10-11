<template>
  <div class="cart">
      <!-- 购物车图标 -->
      <div class="cart-icon" :class="{'cart-active':cartNum>0}">
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
      isPay: false //是否达到支付条件
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
      }else{
        this.isPay = false;
      }
      return message;
    }
  },
  created() {},
  components: {},
  mounted() {},
  methods: {}
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
</style>
