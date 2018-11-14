<template>
  <div class="label-box">
	  <ul class="label-list">
		  <li @click.stop.prevent="selectType(2,$event)" :class="{'active':type==2}">
			  <span class="label-txt">{{txtArr[0]}}</span>
			  <span class="num">{{recommendNum+teasingNum}}</span>
		  </li>
		  <li @click.stop.prevent="selectType(0,$event)" :class="{'active':type==0}">
			  <span class="label-txt">{{txtArr[1]}}</span>
			  <span class="num">{{recommendNum}}</span>
		  </li>
		  <li @click.stop.prevent="selectType(1,$event)" :class="{'active':type==1}">
			  <span class="label-txt">{{txtArr[2]}}</span>
			  <span class="num">{{teasingNum}}</span>
		  </li>
	  </ul>
	  <div class="line"></div>
	  <div class="filter">
		  <span @click.stop.prevent="isFilter" class="icon"><i class="icon-check_circle" :class="{'active':filter}"></i></span>
		  <span class="filter-type" >只看有内容的评价</span>
	  </div>
  </div>
</template>

<script>
const All=2; //全部
const GOOD=0; //满意
const SAD=1; //不满意

export default {
  name: "labelBox",
  props: {
	  txtArr:{
		  type:Array,
		  default(){
			  return [];
		  }
	  },
	  ratings:{
		  type:Array,
		  default(){
			  return []
		  }
	  }
  },
  data(){
	  return{
		  filter:false, //是否只看有内容的评价
		  type:All,  //当前类型
		  
	  }
  },
  computed:{
		//推荐评价数量
		recommendNum(){
			let i=0;
			this.ratings.forEach(rating => {
				if(rating.rateType==0){
					i++;
				}
			});
			return i;
		},
		//吐槽评价数量
		teasingNum(){
			let i=0;
			this.ratings.forEach(rating => {
				if(rating.rateType==1){
					i++;
				}
			});
			return i;
		}
  },
  created(){

  },
  mounted(){
	
  },
  methods:{
	  //只看有内容的评价
	  isFilter(event){
		if (!event._constructed) {
          return;
        }
		this.filter ? this.filter=false:this.filter =true;
		this.$emit("isFilter",this.filter);
	  },
	  //  类型选择
	  selectType(i,event){
		if (!event._constructed) {
          return;
		}
		this.type=i;
		this.$emit("ratingType",this.type);
	  }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import '../../../common/stylus/icon'
.line
	width 100%
	height 1px
	line-height 0
	margin 0px 0px 18px 0
	background-color rgba(7,17,27,0.1)
.label-box
	box-sizing border-box
	padding 18px 18px 0 18px
	.label-list
		overflow hidden
		padding 18px 0
		
		li:first-child
			margin-left 0px
		li:last-child
			background-color rgba(77,85,93,0.2)
		li
			padding 8px 12px
			box-sizing border-box
			font-size 12px
			background-color rgb(204,236,248)
			float left
			margin-left 8px
			border-radius 4px
			&.active
				background-color rgb(0,160,220)
				color #fff
			.label-txt
				font-size 14px
			.num
				font-size 10px
				vertical-align bottom
	.filter
		.icon
			color rgb(147,153,159)
			font-size 24px
			line-height 24px
			i.active 
				color rgb(0,160,220)
		.filter-type
			font-size 12px
			line-height 24px
			color rgb(147,153,159)
			vertical-align bottom
</style>
