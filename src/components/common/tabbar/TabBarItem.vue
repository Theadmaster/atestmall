<template>
  <div class="tab-bar-item" @click="itemClick">
      <slot v-if="!isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-selected"></slot>
      <div :style="activeStyle">
          <slot name="item-text"></slot>
      </div>
      
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'firebrick'
    }
  },
  data() {
      return {
          // isActive: false
      }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    // $route 是指处于活跃的路由所致的对象
    itemClick() {
      if(this.$route.path != this.path){
        this.$router.push(this.path)
      }

      
      // console.log('itemClick');
      
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
}

</style>