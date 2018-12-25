<template>
  <section class="container">
    <ul class="card-box">
      <li
        class="card-item"
        v-for="(item, index) of dappList"
        :key="index"
      >
        <div class="card-item-header">
          <span class="title">{{item.name}}</span>
        </div>
        <div class="card-item-content">
          <div class="left">
            <div
              class="left-content"
              ref="left-box"
              :class="item.open ? 'open' : ''"
            >
              <p ref="content-left">
                {{$t(`moneyk.content.${item.name}`)}}
              </p>
            </div>
            <div
              class="moreopen"
              @click="open(item, index)"
              ref="moreopen"
            >
              <span v-if="item.open">{{$t('moneyk.closemore')}}
                <i class="iconfont icon-ic_up"></i>
              </span>
              <span v-else>{{$t('moneyk.openMore')}}<i class="iconfont icon-ic_down"></i></span>
            </div>
          </div>
          <kbutton
            @click="toDetail(item)"
            class="right"
            :content="$t('moneyk.startMin')"
          ></kbutton>
        </div>
      </li>
      <li
        class="card-item"
      >
      <div class="more-game">{{$t('moneyk.moreGame')}}</div>
      </li>
    </ul>
    <div
      v-for="item in test "
      :key="item"
    >
      {{item}}
    </div>
  </section>
</template>
<script>
import kbutton from '../../components/kButton';
// import listcard from '../components/list-card'
import { mapMutations } from 'vuex';
export default {
    components: {
        kbutton: kbutton,
    },
    data() {
        return {
            exponent: 0,
            title: 'DICE',
            profit: this.$t('moneyk.profit'),
            dappList: this.$store.state.tronbet.dappList,
            test: [],
            datainfo: {
                entry: '0',
                netentry: '0',
                dice: '0',
                cost: '0',
                count: '0',
                eosprofit: '0',
                win: '0',
                default: '0'
            }
        };
    },
    computed: {
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs['content-left'].forEach((item, index) => {
                if (item.offsetHeight <= this.$refs['left-box'][index].offsetHeight) {
                    this.$refs.moreopen[index].style.display = 'none';
                }
            });

        });
    },
    methods: {
        ...mapMutations(['SET_DATA']),
        toDetail(item) {
            this.SET_DATA(this.datainfo);
            this.$store.commit('setContractAddress', item.address);
            this.$router.push({ name: 'miner.' + item.name });
        },
        open(item, index) {
            let newObj = JSON.parse(JSON.stringify(item));
            newObj.open = !item.open;
            this.$set(this.dappList, index, newObj);
        },

    }

};
</script>
<style lang="stylus" scoped>
@import '../../common/index';
.card-box {
  width: 100%;
  height 100vh;
  padding: 12.5px 0;
  box-sizing: border-box;

  .card-item {
    margin-bottom: 12.5px;
    width: 100%;
    background: depbg;
    box-shadow: inset 0 -3px #2c2943;
    padding: 16px;
    box-sizing: border-box;
    border-radius: 6px;
  }

  .card-item-header {
    display: flex;
    justify-content: space-between;

    .title {
      color: yellow;
      font-size: f2;
    }

    .exponent {
      font-size: f3;

      &.positive {
        color: cg;
      }

      &.negative {
        color: cr;
      }
    }
  }
.more-game {
  color #9691ae
  text-align center
}
  .card-item-content {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    position: relative;
    .left {
      width: 60%;
      font-size: f3;
      line-height: f2;
      color: #9691ae;
      overflow: hidden;

      .left-content {
        max-height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box; // 作为弹性伸缩盒子模型显示。
        -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
        // -webkit-line-clamp: 4; //显示的行
        &.open {
          max-height: none;
        }
      }
    }

    .right {
      margin-top: 30px;
      position: absolute;
      bottom: 4px;
      right: 0;
    }
  }

  .moreopen {
    cursor: pointer;
    color: yellow;
    font-size: f3;

    .iconfont {
      font-size: 20px;
      display: inline-block;
      transform: translateY(3px);
    }
  }
}

@media only screen and (min-width: 900px) {
  .view-scroll {
    margin: 0 auto;
    max-width: 420px;
    box-sizing border-box
    -webkit-overflow-scrolling: touch;

    .card-box .card-item .card-item-header {
      .title {
        font-size: 10px;
      }
    }

    .card-item-content {
      p {
        font-size: 10px;
      }

      .right {
         width 80px;
         height 30px;
        font-size: 10px;
      }
    }
  }
}
</style>
