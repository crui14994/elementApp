<template>
  <div class="cartcontrol">
      <span v-if="isShowCount"  class="cart-btn icon-remove_circle_outline"></span>
      <span v-if="isShowCount" class="cart-count">{{count}}</span>
      <div class="cart-btn icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
export default {
  name: "cartcontrol",
  props: {
    food:{
      type:Object
    }
  },
  data() {
    return {
      count: 1
    };
  },
  computed: {
    isShowCount() {
      if (this.count > 0) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted(){
    console.log(this.food)
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      console.log(this.count);
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
.cartcontrol
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
</style>
