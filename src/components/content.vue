<template>
  <section class="inner">
    <div class="top">
      <p class="title">
        <slot name="name">
        </slot>
        <span class="info"></span>
        <slot name="info"></slot>
      </p>
      <slot name="content"></slot>
    </div>
  </section>
</template>

<script>
export default {

    components: {},
    data() {
        return {
        };
    },

    computed: {},

    //   mounted: {},

    methods: {}
};
</script>
<style lang='stylus' scoped>
fontcolor = #9691ae;

.inner {
  .top {
      margin-top:10px;
    padding: 10px 17.5px;
    overflow: hidden;
    background: #34304e;
    box-shadow: inset 0px -3px 0px 0px rgba(9, 8, 37, 0.16);
    border-radius: 12px;

    .title {
      padding-bottom: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: fontcolor;
      border-bottom: 1px solid #27243b;

      .info {
        color: #40c0a7;
      }
    }
  }
}
</style>