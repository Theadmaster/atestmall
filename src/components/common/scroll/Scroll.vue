<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    data() {
        return {
            scroll: null
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: 3,
            click: true,
            pullUpLoad: true
        })
        this.scroll.on('scroll', (position) => {
            console.log(position);
            
        })
        this.scroll.on('pullingUp', () => {
            console.log('上拉加载更多数据');
            // 发送网络请求

            // 等数据请求完成，并且将新的数据显示出来后
            this.scroll.finishPullUp()
            
        })
    },
    methods: {
        scrollTo(x, y, time=300) {
            this.scroll.scrollTo(x, y, time)
        }
    }
}
</script>

<style scoped>

</style>