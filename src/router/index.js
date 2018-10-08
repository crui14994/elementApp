import Vue from 'vue'
import Router from 'vue-router'
import storeHome from '@/components/store/storeHome'
import goods from "@/components/store/goods/goods"
import merchants from "@/components/store/merchants/merchants";  //引入商家
import evaluation from "@/components/store/evaluation/evaluation"; //引入评价组件

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'storeHome',
      component: storeHome,
      redirect:'/goods',
      children:[
        {
          path: 'goods',
          name: 'goods',
          component: goods
        },
        {
          path: 'evaluation',
          name: 'evaluation',
          component: evaluation
        },
        {
          path: 'merchants',
          name: 'merchants',
          component: merchants
        }
      ]
    }
  ]
})
 