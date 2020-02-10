<template>
  <div class="detail-page">
    <div class="shop-logo">
      <div class="shop-img">
        <img :src="shop.logo" alt />
      </div>
      <div class="shop-name">{{shop.name}}</div>
    </div>
    <div class="all-info">
      <div class="sell-data">
        <div class="sell-number">
          <div>{{shop.sells | sellCountFilter}}</div>
          <span>总销量</span>
        </div>
        <div class="all-number">
          <div>{{shop.goodsCount}}</div>
          <span>全部宝贝</span>
        </div>
      </div>
      <div class="sell-evaluate">
        
          <table>
            <tr v-for="(item, index) in shop.score" :key="index">
              <td>{{item.name}}</td>
              <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
              <td class="better" :class="{'better-more': item.isBetter}">
                <span>{{item.isBetter ? '高':'低'}}</span>
              </td>
            </tr>
          </table>
        
      </div>
    </div>
    <div class="shop-bottom">
        <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped>
.detail-page {
  position: relative;
  z-index: 99;
  background-color: #fff;
}
.shop-logo {
  display: flex;
  /* align-content: center; */
}
.shop-logo img {
  
  width: 50px;

}
.shop-img {
  margin: 15px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: 1px solid rgb(192, 190, 190);
  overflow: hidden;
}
.shop-name {
  line-height: 90px;
  margin-left: 10px;
}
.all-info {
  display: flex;
}
.sell-data {
  display: flex;
  flex: 1;
  height: 80px;
  text-align: center;
  /* line-height: 80px; */
  align-items: center;
  font-size: 13px;
  justify-content: space-evenly;
}

.sell-number {
  flex: 1;
  height: 40px;
  align-self: center;
}
.sell-number div {
  height: 30px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
}
.all-number {
  flex: 1;
  height: 40px;
  border-right: 2px solid rgb(241, 245, 245);
  align-self: center;
}
.all-number div {
  height: 30px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
}
.sell-evaluate {
  flex: 1;
  margin-left: 40px;
  margin-top: 10px;
}
.sell-evaluate tr td {
    padding-right: 12px;
    padding-bottom: 10px;
}
.better span {
    color: #fff;
    background-color: rgb(37, 185, 37);
}
.better-more span {
    color: #fff;
    background-color: red;
}
.shop-bottom {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 25px;
    border-bottom: 5px solid #f2f5f8;
  }
 
  .enter-shop {
    background-color: rgb(241, 245, 245);
    width: 180px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0 auto;
    border-radius: 10px;
    
  }
</style>