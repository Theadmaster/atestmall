<template>
  <div>
    <div v-if="Object.keys(commentInfo).length !== 0">
      <div class="comment-top">
        <div class="user-comment">用户评价</div>
        <div class="more">更多</div>
      </div>
      <div class="user-info">
          <img :src="commentInfo.user.avatar" alt="">
          <div>{{commentInfo.user.uname}}</div>
      </div>
      <div class="info-words">
          {{commentInfo.content}}
      </div>
      <div class="info-detail">
          <div class="date">
              {{commentInfo.created}}
          </div>
          <div class="style">
              {{commentInfo.style}}
          </div>
      </div>
      <div class="comment-images"> 
        <img v-for="(item, index) in commentInfo.images" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
          return {}
      }
    }
  },
  created() {
    //   console.log(this.commentInfo);
      
  }
};
</script>

<style scoped>
.comment-top {
  color: black;
  margin: 0 20px;
  padding-bottom: 20px;
  border-bottom: 3px solid rgba(100, 100, 100, 0.1);
  display: flex;
  height: 60px;
  line-height: 60px;
}
.user-comment {
  flex: 1;
  text-align: left;
}
.more {
  flex: 1;
  text-align: right;
}
.user-info {
    padding: 20px;
    display: flex;
    align-items: center;
    color: black;
}
.user-info img {
    margin-right: 20px;
    width: 50px;
    border-radius: 25px;
}
.info-words {
    padding: 0 20px;
}
.info-detail {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    color: rgba(100, 100, 100, 0.5);
    font-size: 14px;
}
.date {
    
    margin-right: 10px;
}
.comment-images {
    padding: 0 20px 20px 20px;
    border-bottom: 3px solid rgba(100, 100, 100, 0.1);
}
.comment-images img{
    width: 100px;
    height: 100px;
    margin-right: 5px; 
}
</style>