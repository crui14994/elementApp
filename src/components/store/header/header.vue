<template>
  <div>
   <div class="header-parent">
      <!-- 背景 -->
      <div class="background">
        <img :src="seller.avatar" width="100%" alt="">
      </div>

      <div class="header">
        <!-- 商家头像 -->
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64" alt="">
        </div>
        <!-- 商家信息 -->
        <div class="avatar-content">
          <div class="tit">
            <span class="brand"></span>
            <span>{{seller.name}}</span>
          </div>
          <div class="description"><span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span></div>
          <div class="supports">
            <span v-if="seller.supports" class="dcrs" :class="dcrs[seller.supports[0].type]"></span>
            <span v-if="seller.supports">{{seller.supports[0].description}}</span>
            <!-- 优惠个数 -->
            <span v-if="seller.supports" class="supports-num" @click="isDetailShow"> {{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
          </div>
        </div>
      </div>
      <!-- 公告栏 -->
      <div class="notice" @click="isDetailShow">
        <div class="notice-left">
          <span class="bulletin"></span>
          <span>{{seller.bulletin}}</span>
        </div>
        <div class="notice-right">
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <transition name="fade">
      <div class="detailShow" v-show="showDetail">
        <div class="wrap clearfix">
          <div class="wrap-content">
            <div class="detail-tit">{{seller.name}}</div>
            <!-- star -->
            <div class="star">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 优惠信息 -->
            <div class="special-offers">
                <div class="line-txt">
                <span class="line line-left"></span>
                <span>优惠信息</span>
                <span class="line line-right"></span>
              </div>
                <ul>
                  <li v-for="item in seller.supports" :key="item.type">
                    <span  class="dcrs" :class="dcrs[item.type]"></span>
                    <span>{{item.description}}</span>
                  </li>
                </ul>
            </div>
            <!-- 商家公告 -->
            <div class="announcement">
              <div class="line-txt">
                <span class="line line-left"></span>
                <span>商家公告</span>
                <span class="line line-right"></span>
              </div>
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="wrap-footer">
          <i class="icon-close" @click="isDetailShow"></i>
        </div>
      </div>
    </transition>
  </div>
  
</template>

<script>
  import star from "../../common/star/star"

  export default {
    name: "storeHome",
    props: {
      seller: {
        type: Object
      }
    },
    components:{
      star:star
    },
    data() {
      return {
        dcrs:["decrease","discount","guarantee","invoice","special"],
        showDetail:false
      };
    },
    methods:{
      isDetailShow:function(){
        this.showDetail=!this.showDetail;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../../common/stylus/mixin';
@import '../../../common/stylus/icon';

@font-face 
  font-family: 'sell-icon'
  src:  url('../../../common/fonts/sell-icon.eot?xy1h2g')
  src:  url('../../../common/fonts/sell-icon.eot?xy1h2g#iefix') format('embedded-opentype'),
    url('../../../common/fonts/sell-icon.ttf?xy1h2g') format('truetype'),
    url('../../../common/fonts/sell-icon.woff?xy1h2g') format('woff'),
    url('../../../common/fonts/sell-icon.svg?xy1h2g#sell-icon') format('svg')
  font-weight: normal
  font-style: normal
.star
  margin-top 16px
.clearfix
     display: inline-block
.clearfix:after 
     content: "."
     display: block
     height: 0
     clear: both
     visibility: hidden
.line-txt
  width 100%
  text-align center
  position relative
  span
    font-size 14px
    font-weight 700
.line
  width 35%
  height 2px
  position absolute
  top 10px
  background-color #898989
.line-left
  left 0
.line-right
  right 0
.detailShow
  position fixed
  top 0px
  left 0px
  z-index 200
  width 100%
  height 100%
  overflow auto
  padding 64px 36px 32px 36px
  box-sizing border-box
  color #fff
  background-color rgba(7,17,27,0.8)
  backdrop-filter: blur(10px)
  &.fade-enter-active,&.fade-leave-active
    transition: opacity .5s
  &.fade-enter,&.fade-leave-active
    opacity 0
  
  .wrap
    width 100%
    height auto
    min-height 100%
    .wrap-content
      padding-bottom: 32px
      .detail-tit
        width 100%
        text-align center
        font-size 16px
        font-weight 700
        line-height 32px
      .special-offers
        margin-top 28px
        ul 
          padding 24px 12px
          li 
            font-size 12px
            font-weight 200
            color #fff
            margin-top 12px
            .dcrs
              display inline-block
              width 16px
              height 16px
              background-size 16px 16px
              background-repeat no-repeat
              padding-right 4px
            .decrease
              bg-image('decrease_2') // 使用bg-image($url)函数 
            .discount
              bg-image('discount_2') // 使用bg-image($url)函数 
            .guarantee
              bg-image('guarantee_2') // 使用bg-image($url)函数 
            .invoice
              bg-image('invoice_2') // 使用bg-image($url)函数 
            .special
              bg-image('special_2') // 使用bg-image($url)函数 
      .announcement
        margin-top 28px
        
        p 
          padding 24px 12px
          font-size 12px
          font-weight 200
          color #fff
          line-height 24px
  .wrap-footer
    width: 100%
    height: 32px
    /* margin-top 为 footer 高度的负值 */
    margin-top: -32px
    font-size 32px
    text-align center
    &i 
      color #ffffff
.header-parent
  width 100%
  height 134px
  color #fff
  position relative
  z-index 100
  .background
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index -2
    background-color #212121
    overflow hidden
    img 
      filter blur(10px)
      opacity 0.5
  .header
    width 100%
    height 106px
    box-sizing border-box
    padding 24px 12px 18px 24px
    .avatar
      display inline-block
      width 64px
      height 64px
      float left
      img
        border-radius 2px
    .avatar-content
      display block
      vertical-align top
      width 100%
      padding-left 80px
      box-sizing border-box
      .tit
        font-size 16px
        font-weight bold
        line-height 18px
        margin-top 2px
        .brand
          display inline-block
          width 30px
          height 18px
          bg-image('brand') // 使用bg-image($url)函数 $url为变量：brand
          background-size 30px 18px
          background-repeat no-repeat
          padding-right 6px
      .description
        font-size 12px
        font-weight 200
        line-height 12px
        margin-top 6px
      .supports
        font-size 10px
        font-weight 200
        line-height 12px
        margin-top 8px
        position relative
        .dcrs
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          padding-right 4px
        .decrease
          bg-image('decrease_1') // 使用bg-image($url)函数 
        .discount
          bg-image('discount_1') // 使用bg-image($url)函数 
        .guarantee
          bg-image('guarantee_1') // 使用bg-image($url)函数 
        .invoice
          bg-image('invoice_1') // 使用bg-image($url)函数 
        .special
          bg-image('special_1') // 使用bg-image($url)函数 
        .supports-num
          height 24px
          background-color rgba(0, 0, 0, 0.2)
          display inline-block
          font-size 10px
          font-weight 100
          line-height 24px
          box-sizing border-box
          padding 0px 3px 0px 8px
          color rgb(255, 255, 255)
          border-radius 12px
          position absolute
          top -4px
          right 0px
          &>i
            position: relative
            top: -1px
          .icon
            width 10px
            height 10px
  .notice
    width 100%
    height 28px
    background rgba(0, 0, 0, 0.5)
    box-sizing border-box
    padding 0 12px
    position relative
    .notice-left
      width 100%
      padding-right 30px
      box-sizing border-box
      text-overflow ellipsis
      white-space nowrap 
      overflow hidden
      .bulletin
        display inline-block
        width 22px
        height 12px
        bg-image('bulletin') // 使用bg-image($url)函数 $url为变量：brand
        background-size 22px 12px
        background-repeat no-repeat
        padding-right 4px
      span
        // display: inline-block
        // white-space: nowrap
        // width: 100%
        // overflow: hidden
        // text-overflow:ellipsis
        line-height 28px
        font-size 10px
    .notice-right
      padding 0 12px
      height 28px
      line-height 28px
      position absolute
      right 0
      top 0px
      span 
        vertical-align top
      
</style>