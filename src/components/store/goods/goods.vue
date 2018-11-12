<template>
  <div class="goods">
      <!-- 左侧导航 -->
      <div class="box-left" ref="boxLeft">
        <ul class="left-menu">
            <li v-for="(item,index) in goods" :class="{'active':nowIndex==index}" 
            :key="index" @click="selectMenu(index,$event)">
                <div class="menu-txt">   
                    <span v-show="item.type>0" class="icon" :class="iconArr[item.type]"></span>
                    {{item.name}}
                </div>
            </li>
            
        </ul>
      </div>
      <!-- 右侧内容 -->
      <div class="box-right" ref="boxRight">
        <ul class="box-ul">
            <li class="box-item box-item-hook"  v-for="(item,index) in goods" :key="index">
                <div class="box-title">{{item.name}}</div>
                <ul class="box-content">
                    <li v-for="(bocItem,index) in item.foods" :key="index" @click="foodClick(bocItem,$event)">
                        <div class="good-icon">
                            <img :src="bocItem.icon" alt="" width="57px" height="57px">
                        </div>
                        <div class="good-message">
                            <h2 class="good-name">{{bocItem.name}}</h2>
                            <p class="good-description" v-if="bocItem.description">{{bocItem.description}}</p>
                            <p class="good-sellCount">
                                <span>月售{{bocItem.sellCount}}</span>
                                <span class="good-rating">好评率{{bocItem.rating}}%</span>
                            </p>
                            <div>
                                <span class="good-price"><span>￥</span>{{bocItem.price}}</span>
                                <span class="good-oldPrice" v-if="bocItem.oldPrice"><span>￥</span>{{bocItem.oldPrice}}</span>
                            </div>
                        </div>
                        <!-- 购买数量 -->
                        <div class="cart-control">
                            <cartControl :food="bocItem" @postEl="getEl"></cartControl>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
      </div>
      
      <!-- 购物车 -->
      <div class="cart-box">
        <cart ref="cartBox"  :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods"></cart>
      </div>

      <!-- 商品详情 -->
      
      <food :food="selectedFood" ref="food"></food>
     
  </div>
</template>
o
<script>
import cartControl from "../../common/cartcontrol/cartcontrol";
import BScroll from "better-scroll";
import cart from "../../common/cart/cart";
import food from "../food/food";

const ERR_OK = 0;

export default {
  name: "goods",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      iconArr: ["special", "decrease", "discount", "guarantee", "invoice"], //左侧优惠信息所对应的class
      coordinates: [], //保存右侧每个菜单的相对于父元素坐标的数组
      offsettY: 0, //右侧当前滑动的坐标
      selectFood: [], //购物车中商品的数组
      selectedFood:{},//当前选中的商品
      c:0
    };
  },
  components: {
    cartControl: cartControl,
    cart: cart,
    food: food
  },
  computed: {
    /**左侧当前选中菜单的下标 */
    nowIndex() {
        for (let i = 0; i < this.coordinates.length; i++) {
          let height1 = this.coordinates[i];
          let height2 = this.coordinates[i + 1];
          if (!height2 || (this.offsettY >= height1 && this.offsettY < height2)) {
            return i;
          }
        }
        return 0;
    },
    selectFoods() {
      //当商品数量为true时将当前商品添加到需要存入购物车商品数组中
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.$http.get("http://172.28.241.1:8080/api/goods").then(
      response => {
        response = response.body;
        if (response.errno == ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._getCoordinates();
          });
        }
      },
      response => {
        // error callback
      }
    );
    
  },
  mounted() {},
  methods: {
    /*左侧菜单选项*/
    selectMenu(i, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.boxRight.getElementsByClassName('box-item-hook');
      let el = foodList[i];
      this.offsettY=this.coordinates[i];
      this.$nextTick(()=>{
        this.rightScroll.scrollToElement(el,300);
      })
    },
    _initScroll() {
      /*初始化左侧菜单列表*/
      this.leftScroll = new BScroll(this.$refs.boxLeft, {
        click: true
      });

      /*初始化右侧商品列表*/
      this.rightScroll = new BScroll(this.$refs.boxRight, {
        click: true,
        probeType: 3,
        startY: -this.$refs.boxRight.getElementsByClassName("box-item-hook")[0]
          .offsetHeight
      });
      /*右侧商品绑定滚动事件*/
      this.rightScroll.on("scroll", ops => {
        this.offsettY = Math.abs(Math.floor(ops.y));
      });
    },
    /*获得右侧每个菜单的相对于父元素坐标*/
    _getCoordinates() {
      let boxRight = this.$refs.boxRight;
      let foodsArr = boxRight.getElementsByClassName("box-item-hook");
      for (let i = 0; i < foodsArr.length; i++) {
        this.coordinates.push(foodsArr[i].offsetTop);
      }
    },

    /*获得当前点击的元素dom*/
    getEl(el) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.cartBox.drop(el);
      });
    },

    /*点击商品显示或隐藏商品详情*/
    foodClick(item,event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood=item;
      this.$refs.food.show();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/mixin'
.goods
    height 100%
    overflow hidden
    .box-left
        width 80px
        height 100%
        background-color #F3F5F7
        float left
        font-size 12px
        overflow hidden
        .left-menu
            li
                width 100%
                height 54px
                position relative
                padding 12px
                box-sizing border-box
                display table
                line-height 14px
                .menu-txt
                    display table-cell
                    vertical-align middle
                    text-align left /* 设置文本水平居中 */
                    width 100%
                    .icon
                        display inline-block
                        vertical-align top
                        width 12px
                        height 12px
                        margin-right 2px
                        background-size 12px 12px
                        background-repeat no-repeat
                        margin-top 1px
                        &.special
                            bg-image('special_3') // 使用bg-image($url)函数
                        &.decrease
                            bg-image('decrease_3') // 使用bg-image($url)函数
                        &.discount
                            bg-image('discount_3') // 使用bg-image($url)函数
                        &.guarantee
                            bg-image('guarantee_3') // 使用bg-image($url)函数
                        &.invoice
                            bg-image('invoice_3') // 使用bg-image($url)函数
            li.active
                background-color #fff
            li:after
                content ' '
                display block
                width 56px
                height 1px
                background-color rgba(7, 17, 27, 0.1)
                position absolute
                bottom -1px
                left 12px
            li.active:after
                display none
    .box-right
        width 100%
        height 100%
        padding-left 80px
        box-sizing border-box
        .box-item
            .box-title
                width 100%
                height 26px
                font-size 12px
                line-height 26px
                background-color #f3f5f7
                position relative
                color rgb(147, 153, 159)
                padding-left 14px
                &:before
                    content ''
                    display inline-block
                    width 3px
                    height 100%
                    background-color #d9dde1
                    position absolute
                    top 0
                    left 0
            .box-content
                padding 0 18px
                box-sizing border-box
                width 100%
                height 100%
                li
                    padding 18px 0
                    box-sizing border-box
                    width 100%
                    height 100%
                    position relative
                    box-sizing border-box
                    .cart-control
                        position absolute
                        bottom 12px
                        right 0
                    .good-icon
                        width 57px
                        height 57px
                        float left
                    .good-message
                        width 100%
                        padding-left 67px
                        box-sizing border-box
                        .good-name
                            font-size 14px
                            line-height 14px
                            padding 2px 0 0 0px
                            color rgb(7, 17, 27)
                        .good-description, .good-sellCount
                            font-size 10px
                            line-height 10px
                            padding 8px 0px 0px 0px
                            color rgb(147, 153, 159)
                            .good-rating
                                margin-left 12px
                        .good-description
                            line-height 12px
                        .good-sellCount
                            padding-bottom 8px
                        .good-price
                            font-size 14px
                            font-weight 700
                            line-height 14px
                            color #F01414
                            vertical-align text-bottom
                            span
                                font-weight normal
                                font-size 10px
                                display inline-block
                                vertical-align bottom
                        .good-oldPrice
                            font-size 10px
                            font-weight 700
                            line-height 14px
                            margin-left 8px
                            color rgb(147, 153, 159)
                            text-decoration line-through
                            vertical-align bottom
                li:after
                    content ' '
                    display inline-block
                    width 100%
                    height 1px
                    position absolute
                    top 0
                    left 0
                    background-color rgba(7, 17, 27, 0.1)
                li:first-child:after
                    display none
.cart-box
    width 100%
    height 58px
    position fixed
    bottom 0
    left 0
    z-index 170
.box-ul
    position relative
</style>
