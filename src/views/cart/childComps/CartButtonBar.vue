<template>
  <div class="button-bar">
      <div class="check-button">
          <check-button class="button"></check-button>
          <span>全选</span>
      </div>
      <div class="count">
          <span>合计:￥{{totalPrice}}</span>
          
      </div>
      <div class="calcute">
          <div>去计算({{checkLength}})</div>
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name: "CartButtonBar",
    components: {
        CheckButton
    },
    computed:{
        totalPrice() {
            return this.$store.state.cartList.filter(item => {
                return item.selected
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            },0)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.selected).length
        }
    }
}
</script>

<style>
.button-bar {
    height: 40px;
    background-color: red;
    position: relative;
    background-color: rgba(165, 173, 173, 0.2);
    box-shadow: 0 -1 #666 .3;
    display: flex;
}
.check-button {
    display: flex;
    padding-top: 12px;
    padding-left: 10px;
    font-size: 13px;
    width: 70px;
    
    flex: 0.3;
}
.button {
    margin-right: 5px;
    
}
.count {
    flex: 1;
    width: 100px;
    align-self: center;
}
.calcute {
    width: 100px;
    background-color: rgb(236, 102, 12);
    flex: 0.5;
    padding-top: 9px;
    padding-left: 20px;
    color: aliceblue;
}


</style>