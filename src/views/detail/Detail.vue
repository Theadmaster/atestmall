<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @goto="goto" 
    ref="nav" />
    
    <scroll class="content" ref="scroll" @scroll="positionScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgload="imgLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isActive" />
    <detail-bottom-bar @addCart="addToCart"/>

    
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin"



import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      realPosition: 0
    };
  },
  created() {
    // 1.保存 传入的iid
    this.iid = this.$route.params.id;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);

      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情信息
      this.detailInfo = data.detailInfo;

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //
      //   this.$nextTick(() => {
      //     //   根据最新的数据， 对应的DOM是已经被渲染出来
      //     // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
      //     // offsetTop值不对的时候。都是因为图片的问题
      //     this.themeTopYs.push(0);
      //     this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //     console.log(this.themeTopYs);
      //   });
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //取最大值 为了下面的positionScroll 
      // Number.MAX_VALUE为js最大值
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);

    
  },
  updated() {},
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();

      this.getThemeTopY();
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车里
      this.$store.dispatch('addCart', product)
    },
    positionScroll(position) {

      this.isActive = position.y < -1000;
      // console.log(this.$refs.param.$el.offsetTop);
      
      const positionY = -position.y
      for(let i=0; i<this.themeTopYs.length-1; i++ ) { //i 为 str
        // if ((this.realPosition != i) && ((i<3 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
        //  || (i>2 && positionY >= this.themeTopYs[i]))) {
        //    this.realPosition = i
        //   //  console.log(this.realPosition);
        //     this.$refs.nav.currentIndex = this.realPosition
        // }
        if ((this.realPosition != i) && 
        (positionY >= this.themeTopYs[i] &&
         positionY < this.themeTopYs[i+1])) {
           this.realPosition = i
          //  console.log(this.realPosition);
            this.$refs.nav.currentIndex = this.realPosition
        }
      }
      
    },
    
    goto(option) {
      // switch(option) {
      //     case 0:
      //         this.$refs.scroll.scrollTO(0, 0)
      //         break;
      //     case 1:
      //         this.$refs.scroll.scrollTo(0, -10717)
      //         break;
      //     case 2:
      //         this.$refs.scroll.scrollTo(0, -10717)
      // }
      
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[option], 500)
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 100;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 101;
  background-color: #fff;
}
</style>