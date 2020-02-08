<template>
    <div class="wrapper">
        <ul class="content">
           
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
            <li>列表</li>
            <li>列别</li>
        </ul>
            
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Category',
    data(){
        return {
            scroll: null
        }
    },
    mounted() {
        // 默认情况下BScroll是不可以实时监听滚动位置的
        // probe侦测
        // 0,1都是不侦测实时位置
        // 2：在手指滚动过程中侦测，手指离开后的惯性滚动过程中不侦测
        // 3：只要是滚动，都侦测
        this.scroll = new BScroll('.wrapper', {
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
    }
}
</script>

<style>
.wrapper {
    height: 159px;
    background-color: red;

    overflow: hidden;
    overflow-y: scroll; 
}
</style>