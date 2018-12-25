<template>
  <div class="messagebox">
    <div class="box">
      <div class="message">
        <slot name="title"></slot>
        <slot name="messagecontent"></slot>
      </div>
      <i class="iconfont icon-guanbi1" @click="$emit('show')"></i>
    </div>
  </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            showcontent: true
        };
    },
    computed: {},

    //   mounted: {},

    methods: {

    }
};
</script>
<style lang='stylus' scoped>
.messagebox {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width 100%;
  height 100%;
  z-index:999;
  color:#50504f;
  background: #232033;

  .box {
      width 100%;
      height 100%;
      display flex
      flex-direction column;
      justify-content center;
      align-items  center;
      .message{
          width 345px;
          min-height 180px
          text-align center
          border-radius:6px;
          background #fff;
          .title{
              padding 15px 20px;
              font-size 15px
              font-weight 600
          }
      }
      .iconfont.icon-guanbi1{
          margin-top 10px
          font-size:26px;
          color:#fff;
          cursor pointer
      }
  }
}
@media only screen and (min-width: 900px) {
    .messagebox{
        background rgba(35, 32, 51,.6)
    }
}
</style>
