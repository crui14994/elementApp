<template>
  <div class="store-home">
  	<!--头部-->
    <storeHeader :seller="seller"> </storeHeader>
    <!--导航-->
    <div class="store-nav">
    	<div class="store-item" :class="{'nav-active':navActive==='goods'}" 
        @click.stop.prevent="toogleMessage('goods',0)">
        <router-link to="/goods">商品</router-link>
      </div>

    	<div class="store-item" :class="{'nav-active':navActive==='evaluation'}" 
        @click.stop.prevent="toogleMessage('evaluation',1)">
        <router-link to="/evaluation">评价</router-link>
      </div>

    	<div class="store-item" :class="{'nav-active':navActive==='merchants'}" 
        @click.stop.prevent="toogleMessage('merchants',2)">
        <router-link to="/merchants">商家</router-link>
      </div>
    </div>
    <!--内容-->
    <div class="content">
      <transition :name="toggleName">
        <keep-alive>
			      <router-view :seller="seller"></router-view>
			  </keep-alive>
      </transition>
    </div>
  </div>

</template>

<script>
import header from "./header/header";
const ERR_OK = 0;

export default {
  name: "storeHome",
  data() {
    return {
      seller: {}, //商品信息
      navActive:"goods", //当前选中商品，评价，商家的状态
      lastN:0, //点击切换nav前状态的编号
      nowN:0,  //nav当前状态的编号
    };
  },
  created() {
    this.$http.get("http://172.16.18.1:8080/api/seller").then(
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
    storeHeader: header
  },
  computed:{
    toggleName(){  //如果点击的是左边的菜单返回 “fade2-nav”让动画向右移动
      let l=this.lastN;
      let n=this.nowN;
      if(n<l){
        return "fade2-nav";
      }else{
        return "fade-nav";
      }
    }
  },
  mounted() {
    
  },
  methods:{
   toogleMessage:function(str,n){
    this.lastN=this.nowN;
    this.nowN=n;
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
  a
    display: block
    width: 100%
    height: 100%
  &.nav-active
    a
      color #E95C59

.fade-nav-enter 
  transform: translateX(400px)
  opacity: 0
.fade-nav-leave
  transform: translateX(0px)
  opacity: 1
.fade-nav-enter-active,.fade-nav-leave-active
  transition:all .5s
.fade-nav-leave-active
  opacity:0
  transform translateX(-400px)

.fade2-nav-enter 
  transform: translateX(-400px)
  opacity: 0
.fade2-nav-leave
  transform: translateX(0px)
  opacity: 1
.fade2-nav-enter-active,.fade2-nav-leave-active
  transition:all .5s
.fade2-nav-leave-active
  opacity:0
  transform translateX(400px)

.content
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  >div
    position: absolute
    width: 100%
    top: 0
    left: 0
    padding-top: 174px
    // padding-bottom 45px
    box-sizing: border-box
    height: 100%

</style>
