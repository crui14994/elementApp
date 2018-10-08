<template>
  <div class="store-home">
  	<!--头部-->
    <storeHeader :seller="seller"> </storeHeader>
    <!--导航-->
    <div class="store-nav">
    	<div class="store-item" :class="{'nav-active':navActive==='goods'}" 
        @click="toogleMessage('goods')">
        <router-link to="/goods">商品</router-link>
      </div>

    	<div class="store-item" :class="{'nav-active':navActive==='evaluation'}" 
        @click="toogleMessage('evaluation')">
        <router-link to="/evaluation">评价</router-link>
      </div>

    	<div class="store-item" :class="{'nav-active':navActive==='merchants'}" 
        @click="toogleMessage('merchants')">
        <router-link to="/merchants">商家</router-link>
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <transition name="fade-nav">
        <keep-alive>
			            <router-view></router-view>
			  </keep-alive>
      </transition>
    </div>
    <!-- 购物车 -->
    <div class="cart-box">
      <cart></cart>
    </div>
  </div>

</template>

<script>
import header from "./header/header";
import cart from "../common/cart/cart"
const ERR_OK = 0;

export default {
  name: "storeHome",
  data() {
    return {
      seller: {}, //商品信息
      navActive:"goods", //当前选中商品，评价，商家的状态
    };
  },
  created() {
    this.$http.get("http://localhost:8080/api/seller").then(
      response => {
        response = response.body;
        if (response.errno == ERR_OK) {
          this.seller = response.data;
        }
      },
      response => {
        // error callback
      }
    );
  },
  components: {
    storeHeader: header,
    cart:cart
  },
  mounted() {
    
  },
  methods:{
   toogleMessage:function(str){
    this.navActive=str;
   }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.store-nav
  display flex
  position relative
  border none
  height 40px
  z-index 50
  background-color #fff
.store-nav:after
  content ''
  position absolute
  bottom 0
  background #999999
  width 100%
  height 1px
  -webkit-transform scaleY(0.5)
  transform scaleY(0.5)
  -webkit-transform-origin 0 0
  transform-origin 0 0
.store-item
  height 40px
  width 33.3%
  line-height 40px
  text-align center
  &.nav-active
    color #E95C59
.fade-nav-enter 
  opacity:0
.fade-nav-leave
  opacity:1
.fade-nav-enter-active
  transition:all .5s
.fade-nav-leave-active
  opacity:0
  transition:all .5s
.content
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  >div
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    padding-top: 174px;
    padding-bottom 45px
    box-sizing: border-box;
    height: 100%;
.cart-box
  width 100%
  height 58px
  position fixed
  bottom 0
  left 0
</style>
