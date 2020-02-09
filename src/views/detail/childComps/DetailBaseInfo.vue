<template>
  <div>
      <div v-if="Object.keys(goods).length !== 0" class="base-info">
          <div class="info-title">{{goods.title}}</div>
          <div class="price">
                <span class="new-price">{{goods.newPrice}}</span>
                <span class="old-price">{{goods.oldPrice}}</span>
                <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
          </div>
          <div class="info">
              <div v-for="item in goods.columns" class="info-item">{{item}}</div>
          </div>
          <div class="info-service">
              <div class="other-item" v-for="index in 4" :key="index">
                   <img :src="goods.services[index-1].icon" alt="">
                   <span>{{goods.services[index-1].name}}</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailBaseInfo',
    props: {
        goods: {
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
.info-title {
    color: #222;
}
.base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}
.price {
    position: relative;
    margin: 10px 0 10px 0;
}
.new-price {
    font-size: 24px;
    color: var(--color-tint);
}
.old-price {
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}
.discount {
    font-size: 12px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-tint);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
}
.info {
    display: flex;
    text-align: center;
    font-size: 13px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.info-item {
    flex: 1;
}
.info-service {
    border-top: 1px solid rgba(71, 73, 73, 0.089);
    height: 50px;
    text-align: center;
    line-height: 50px;
    display: flex;
    font-size: 12px;
    color: #222;
    justify-content: space-around;
}

.info-service img {
    width: 10px;
}
</style>