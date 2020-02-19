<template>
  <div class="layout">

    <scroll class="content" ref="wrapper"
            :probeType="3"
            :pullUpLoad="true">
      <ul>
        <li class="" :class="{isCheck:currentIndex===i}"
         v-for="(item,i) in list" @click="liClick(i)">
          <a href="javascript:;" >{{item}}</a></li>
      </ul>
    </scroll>
     

  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CategoryRight from './childcomps/CategoryRight'

  export default {
    name: 'Category',
    components: {
      Scroll,
      CategoryRight
    },
    data() {
      return {
        isCheck:true,
        currentIndex:0,
        list:['热门推荐','潮流女装','品牌男装','内衣配饰','家用电器','电脑办公','手机数码','母婴频道','图书',
        '家居家纺','潮流女装','品牌男装','内衣配饰','家用电器','电脑办公','手机数码','母婴频道']
      }
    },
    methods: {
      liClick(i) {
        this.currentIndex = i;
      }
    }
  }


</script>

<style scoped>
  .layout {
    width: 100%;
  }
  .content {
    height: calc(100vh - 49px);
    float: left;
  }
  ul {
    background-color: #f1f1f1;
    width: 96px;
  }
  li {
    width: 100%;
    height: 50px;
    line-height: 50px;
    list-style: none;
    text-align: center;
  }

  li a {
    text-decoration: none;
    color: #666;
  }
  .isCheck {
    background-color: #fff;
    border-left: 4px solid var(--color-tint);
  }

</style>
