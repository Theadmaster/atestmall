<template>
    <div id="check-button">
        <div v-if="!isSelect"><img src="~assets/img/cart/no_select.svg" alt=""></div>
        <div v-else><img src="~assets/img/cart/select.svg" alt=""></div>
    </div>
</template>

<script>
export default{
    name:"CheckButton",
    props: {
        isSelect: {
            type: Boolean,
            default: false  
        }
        
    },

}
</script>

<style scoped>
#check-button img{
    width: 18px;
}
</style>