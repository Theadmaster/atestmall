<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="titles" 
                    v-show="isTabFixed"
                    @tabClick="tabClick" 
                    ref="tabControl1" 
                    class="tab-control-top"/>
    <scroll class="main" ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pullUpLoad="true"
    @pullingUp="getMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" 
                    
                    @tabClick="tabClick" 
                    ref="tabControl2" />
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
      isActive: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      leavePosition: 0,
      itemImageListener: 0
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
    this.itemImageListener = () => {
      // this.$refs.wrapper.refresh();
      refresh();
    }
    this.$bus.$on("itemimgLoad", () => {
      // this.$refs.wrapper.refresh();
      refresh();
    });
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.leavePosition);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.记录离开时的位置
    this.leavePosition = this.$refs.scroll.getScrollY()
    // console.log(this.leavePosition);

    // 2.取消全局事件的监听
    this.$bus.$off('itemimgLoad', this.itemImageListener)
    
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      // console.log(position);
      this.isActive = position.y < -1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y)> this.tabOffsetTop

      
      
    },
    getMore() {
        //加载更多数据
        this.getHomeGoods(this.currentType)

        //解决使用better-scroll时，容易产生的 bug。由于页面加载就把能够滑动的距离计算好，所以滚到一定距离不能滚动
        // this.$refs.scroll.scroll.refresh();
        
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      
    },

    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res.data);

        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
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
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
  position: relative;
  /* 在浏览器使用原生滚动时，为了让导航不跟随一起滚动而设置 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;*/
  z-index: 99; 
}
.tab-control {
  /* 吸顶效果  */
  position: sticky;
  top: 44px;
  z-index: 9;
  background-color: #fff;
}
.tab-control-top{
  position: fixed;
  z-index: 9;
  
  right: 0;
  left: 0;
}
.main {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

</style>