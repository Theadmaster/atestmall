<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    });
    // 监听滚动 位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }
    // 监听 滚到底部
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    // 监听上拉事件
    // this.scroll.on('pullingUp', () => {
    //     // console.log('上拉加载更多数据');
    //     // 发送网络请求
    //     this.$emit('pullingUp')
    //     // 等数据请求完成，并且将新的数据显示出来后
    //     // this.scroll.finishPullUp()

    // })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
        return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>