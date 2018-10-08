<template>
  <div class="star-box">
      <span v-for="(item, index) in starArr" :key="index"  :class="[starSize,item]" ></span>
  </div>
</template>

<script>
const LENGTH=5;
const CLS_on="on";
const CLS_haff="half";

export default {
  name: "star",
  props: {
    score: {
      type: Number
    },
    size:{
      type: Number
    }
  },
  computed:{
    starSize(){
      return "star-"+this.size;
    },
    starArr(){
      let result=[];
      let scroe = Math.floor(this.score);
      for(var i=0;i<LENGTH;i++){
        if(i<scroe){
          result.push(CLS_on);
        }else{
          result.push(" ");
        }
      }
      if((this.score%1)>=0.5){
        result[scroe]=CLS_haff;
      }
      return result;

    }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/mixin';
  .star-box
    text-align center
    .star-48
      padding 0 6px
      width 30px
      height 26px
      display inline-block
      background-size 30px 26px
      background-repeat no-repeat
      bg-image('star48_off') // 使用bg-image($url)函数 
      &.on
        bg-image('star48_on') // 使用bg-image($url)函数 
      &.half
        bg-image('star48_half') // 使用bg-image($url)函数 
    .star-36
      padding 0 5px
      width 22px
      height 22px
      display inline-block
      background-size 22px 22px
      background-repeat no-repeat
      bg-image('star36_off') // 使用bg-image($url)函数 
      &.on
        bg-image('star36_on') // 使用bg-image($url)函数 
      &.half
        bg-image('star36_half') // 使用bg-image($url)函数 
    .star-24
      padding 0 4px
      width 15px
      height 15px
      display inline-block
      background-size 15px 15px
      background-repeat no-repeat
      bg-image('star24_off') // 使用bg-image($url)函数 
      &.on
        bg-image('star24_on') // 使用bg-image($url)函数 
      &.half
        bg-image('star24_half') // 使用bg-image($url)函数 
</style>
