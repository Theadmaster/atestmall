<template>
  <div class="shop-item">
      <div class="item-selector">
        <check-button :is-select="product.selected" 
      @click.native="selectClick" /></div>
      <div class="item-image"><img :src="product.image" alt=""></div>
      <div class="item-info">
          <div class="item-title">{{product.title}}</div>
          <div class="item-detail">{{product.desc}}</div>
          <div class="item-price-number">
              <div class="price"><strong>￥{{product.price}}</strong></div>
              <div class="count">x{{product.count}}</div>
          </div>
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
    name: 'CartListItem',
    props: {
        product: {
            type:Object,
            default() {
                return {}
            }
        }
    },
    components: {
            CheckButton
    },
    methods: {
        selectClick() {
            this.product.selected = !this.product.selected 
        }
    }
}
</script>

<style scoped>
.item-selector {
    width: 20px;
    align-self: center;
    margin: 0 10px;
}
.item-image {
    flex: 0.2;
    align-self: center;
    margin-right: 15px; 
}
.item-image img{
    height: 100px;
    width: 83px;
    border-radius: 7px;
}
.shop-item {
    display: flex;
    height: 130px;
    border-bottom: 1.5px solid rgba(120, 125, 128, .4);
    flex:0.8;
    padding-right: 10px;
    
}
.item-title {
    margin: 10px 0; 
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: black;
}
.item-detail {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: black;
    font-size: 13px;
}
.item-price-number {
    margin: 27px 20px 20px 0;
    display: flex;
}
.price {
    flex:1;
    margin-left: 0;
    color: rgb(240, 143, 16);
    font-size: 18px;
}
.count {
    flex: 1;
    margin-right: 0;
    text-align: right;
    padding-top: 5px;
}

</style>