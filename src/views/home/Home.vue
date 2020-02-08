<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="main" ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pullUpLoad="true"
    @pullingUp="getMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" class="tab-control" @tabClick="tabClick" ref="tabControl"/>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isActive" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childcomps/HomeSwiper";
import RecommendView from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isActive: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.获取商品信息
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // // 3.监听item中图片加载完成
    // this.$bus.$on("itemImageLoad", () => {
    //   // console.log('执行');
    //   this.$refs.scroll.refresh();
    // });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemimgLoad", () => {
      // this.$refs.wrapper.refresh();
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position);
      this.isActive = position.y < -1000;
    },
    getMore() {
        //加载更多数据
        this.getHomeGoods(this.currentType)

        //解决使用better-scroll时，容易产生的 bug。由于页面加载就把能够滑动的距离计算好，所以滚到一定距离不能滚动
        // this.$refs.scroll.scroll.refresh();
        
    },
    swiperImageLoad() {
      console.log(this.$refs.tabControl.$el.offsetTop);
      
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res.data);

        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp()
      });
    }
    
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  /* 吸顶效果  */
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}
.main {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>