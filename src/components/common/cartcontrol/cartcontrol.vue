<template>
  <div class="cartcontrol">
      <transition name="fade">
        <div class="fadeBox" v-show="isShowCount">
            <transition name="rotate">
              <span v-show="isShowCount" class="cart-btn icon-remove_circle_outline" @click.stop.prevent="reduceCart"></span>
            </transition> 
        </div>
      </transition>
      <span v-show="isShowCount" class="cart-count">{{food.count}}</span>
      <div class="cart-btn icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from "vue"

export default {
  name: "cartcontrol",
  props: {
    food:{
      type:Object
    }
  },
  data() {
    return {
    };
  },
  computed: {
    isShowCount() {
      if (this.food.count > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if(!this.food.count){
        Vue.set(this.food,"count",1);
      }else{
        this.food.count+=1;
      }
    },
    reduceCart(event){
      if(!event._constructed){//如果不存在这个属性,则为原生点击事件，不执行下面的函数
        return
      }
      if(this.food.count) {
          this.food.count--;
      }
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
.cartcontrol
  .fadeBox
    display inline-block
  .cart-btn
    font-size 24px
    line-height 24px
    color rgb(0, 160, 220)
    display inline-block
  .cart-count
    font-size 10px
    line-height 24px
    padding 0 2px
    text-align center
    display inline-block
    color rgb(147, 153, 159)

.fade-enter
  transform translateX(30px)
  opacity 0
.fade-enter-active,.fade-leave-active
  transition: all 0.5s
.fade-leave
  transform translateX(0px)
  opacity 1
.fade-leave-active
  transform translateX(30px)
  opacity 0


.rotate-enter
  transform rotate(180deg)
.rotate-enter-active,.rotate-leave-active
  transition: all 0.4s
.rotate-leave
  transform rotate(0deg)
.rotate-leave-active
  transform rotate(180deg)

</style>
