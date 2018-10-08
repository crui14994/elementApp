<template>
  <div class="cart">
      <!-- 购物车图标 -->
      <div class="cart-icon">
        <i class="icon-shopping_cart"></i>
      </div>
      <!-- 购物车信息 -->
      <div class="cart-price">
        <span class="shop-price">￥0</span>
        <span class="lone"></span>
        <span class="cost">另需配送费￥4元</span>
      </div>
      <!-- 需要支付的价格 -->
      <div class="cart-total">还差￥20起送</div>
  </div>
</template>

<script>


export default {
  name: "cart",
  data() {
    return {
      
    };
  },
  created() {
    
  },
  components: {
    
  },
  mounted() {
    
  },
  methods:{
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon';
  .cart
    width 100%
    height 100%
    position relative
    .cart-icon
      width 44px
      height 44px
      position absolute
      bottom 2px
      margin  0 12px
      z-index 105
      border solid 6px #141d27
      // box-sizing border-box
      border-radius 44px
      background-color #2B333B
      text-align center
      line-height 40px
      font-size 24px
      color #80858A
    .cart-price
      width 100%
      height 48px
      background-color #141d27
      position absolute
      bottom 0
      right 0
      box-sizing border-box
      padding 12px 105px 12px 80px
      color rgba(255,255,255,0.4)
      // line-height 24px
      font-size 16px
      .shop-price
        font-weight 700
        line-height 24px
      .lone
        content ""
        display inline-block
        width 1px
        height 100%
        background-color rgba(255,255,255,0.1)
        margin  0 12px
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
      color rgba(255,255,255,0.4)
</style>
