<template>
  <div>
      <nav-bar class="detail-nav">
          <div slot="left" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
          <div slot="center" class="nav-item">
              <span v-for="(item,index) in titles" 
              :class="{active: index === currentIndex}"
              @click="titleClick(index)">{{item}}</span>
          </div>
          
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'



export default {
    name: 'DetailNavBar',
    components: {
        NavBar
    },
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index
            this.$emit('goto', index)
        },
        backClick() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.detail-nav img{
    padding-top: 12px;
}
.nav-item {
    display: flex;
    justify-content: space-evenly;
    font-size: 14px;
}
.active {
    color: var(--color-high-text);
}
</style>