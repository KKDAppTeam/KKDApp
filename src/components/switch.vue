<template>
  <section class="switchvue">
    <div class="inner">
      <button
        v-for="(item,index) in value"
        :key="index"
        :class="{&quot;unactivted&quot;:index!==showindex}"
        @click="change(index)"
        ref="switch"
      >{{item.label}}</button>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
export default {

    components: {},
    props: {
        value: {
            type: Array,
            default: () => {
                return [
                    {
                        value: 0,
                        label: '小'
                    },
                    {
                        value: 1,
                        label: '大'
                    },
                ];
            }
        }
    },
    data() {
        return {
            showindex: 0
        };
    },
    computed: {


    },
    mounted() {
        this.SET_BET(this.value[0].value);
    },
    methods: {
        ...mapMutations(['SET_BET']),
        change(index) {
            this.SET_BET(this.value[index].value);
            this.showindex = index;
            if (this.$refs['switch'][index].className === 'unactivted') {
                this.$emit('change', index);
            }
        }
    }
};
</script>
<style lang='stylus' scoped>
@import '../common/index.styl';
.switchvue {
  display: inline-block;
  .inner {
    margin: 0 auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #464850;
    overflow: hidden;
    border-radius: 6px;

    button {
      cursor pointer
      width: 100px;
      height: 36px;
      background: blue1;
      color: #fff;
      border-radius: 6px;
      box-sizing: border-box;
      border: none;
      box-shadow: inset 0 -3px blue2;

      &.unactivted {
        background: #464850;
        box-shadow: none;
      }
    }
  }
}

@media only screen and (min-width: 900px) {
  .switchvue .inner,.switchvue .inner button {
    height: 30px;
  }
}

</style>