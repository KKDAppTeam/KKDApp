<template>
    <div class="container-box">
      <section class="container">
    <div ref="head">
      <header class="main-header">
        <div class="logo">
          <img
            :src="logo"
            alt=""
            @click="back"
          ><i
            class="iconfont icon-tanhao"
            v-tap="{methods: openTips}"
            v-if="!showTips && this.$route.name === 'miner.main'"
          ></i>
        </div>
        <div class="user lan">
        </div>
        <div
          class="user"
          v-if="this.$route.meta.showname && $store.state.tronbet.tronReady"
        >
          <i class="iconfont icon-ic_lianxiren"></i>
          <span
            class="name"
          >
            {{this.$store.state.tronbet.account.name ||this.$store.state.tronbet.account.base58address}}
          </span>
        </div>
      </header>
      <p class="community">
        <a
          href="javascript:void(0)"
          @click="join"
        >{{$t('moneyk.group')}}</a>
         <a v-if="!this.$route.meta.showname" href="https://shimo.im/docs/PBM4v9ECxAIdSLDJ/">{{$t('moneyk.newguide')}}
        </a>
        <span v-else>
          <el-dropdown
            :hide-on-click="true"
            @command="handleCommand"
            trigger="click"
          >
            <span class="el-dropdown-link">
              {{defaultlanguage}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in $t('moneyk.lan')"
                :key="index"
                :command="item"
              >{{item.language}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </p>
      <div
        class="tips"
        v-if="this.$route.name === 'miner.main' && showTips"
      >
        <div class="head">
          <h1>{{$t('moneyk.tips.title')}}</h1>
          <i
            class="iconfont icon-ic_decide_close"
            v-tap="{methods: closeTips}"
          ></i>
        </div>
        <p class="content">
          {{$t('moneyk.tips.content')}}
        </p>
      </div>
    </div>
    <message-box
      v-if="showmessage"
      @show="show">
      <p class="title" slot="title">{{ group ? $t('moneyk.group'): $t('moneyk.join')}}</p>
      <ul
        class="grouplist"
        slot="messagecontent"
        v-if="group">
        <li
          v-for="(item,index) in $t('moneyk.grouplist')"
          :key="index"
          v-clipboard:copy="item.type === 'link' ? item.link : null"
          v-clipboard:success="item.type === &quot;link&quot; ? onCopy : null"
          v-clipboard:error="item.type === &quot;link&quot; ? onError : null"
          @click="item.type === 'link' ? toLink(item.link) : wechat()">
          <span class="group"><img :src="item.src" alt="" onerror="this.src=''">{{item.name}}</span><span>{{item.link}}</span>
        </li>
      </ul>
      <div class="wechat" slot="messagecontent" v-else>
          <img src="../../static/images/moneyk/erweima.png" alt="">
          <!-- <p>{{$t('moneyk.scan')}}</p> -->
      </div>
    </message-box>
    <router-view
      class="view-scroll"
      ref="scroll"
      :style="{'height': this.scrollHeight}"
    ></router-view>
  </section>
</div>

</template>
<script>
import messageBox from '../../components/messagebox.vue';
import utils from './../../../static/utils';
import { Toast } from 'mint-ui';
// import { Indicator } from 'mint-ui'
export default {
    components: {
        messageBox,
    },
    data() {
        return {
            showTips: true,
            scrollHeight: 0,
            showmessage: false,
            isPc: false,
            tronWeb: '',
            defaultlanguage: '中文',
            loading: '',
            group: true,
            logo: require('../../static/images/moneyk/oldk_logo_cn.png')
        };
    },
    computed: {

    },
    watch: {
        $route() {
            this.setScroll();
        }
    },
    created() {
        this.$i18n.locale = window.navigator.language.toLowerCase();
        if (window.navigator.language.toLowerCase() === 'en') {
            this.logo = require('../../static/images/moneyk/oldk_logo_en.png');
        }
        this.showTips = localStorage['closeTip'] === undefined ? true : Number(localStorage['closeTip']);
        this.clientHeight = window.clientHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.datainfo = this.$store.state.tronbet.datainfo;
        document.title = this.$t('moneyk.title');
    // console.log(typeof this.showname)
    },
    mounted() {
        this.setScroll();
        setTimeout(() => {
            this.$store.dispatch('TronInit').then(() => {
            });
        }, 500);
    },
    methods: {
        onCopy: function () {
            Toast({
                message: this.$t('moneyk.copysuccess')
            });
        },
        onError: function () {
            Toast({
                message: this.$t('moneyk.copyfailed')
            });
        },
        wechat() {
            this.group = false;
        },
        toLink(link) {
            location.href = link;
        },
        back() {
            this.$router.push({ name: 'miner.main' });
        },
        openTips() {
            localStorage.setItem('closeTip', 1);
            this.showTips = true;
            this.setScroll();
        },
        closeTips() {
            localStorage.setItem('closeTip', 0);
            this.showTips = false;
            this.setScroll();
        },
        setScroll() {
            this.$nextTick(() => {
                if (utils.browserRedirect() === 'pc') {
                    this.scrollHeight = this.clientHeight - this.$refs.head.offsetHeight - 18 + 'px';
                } else {
                    this.scrollHeight = this.clientHeight - this.$refs.head.offsetHeight + 'px';
                }
            });
        },
        join() {
            this.showmessage = true;
        },
        show() {
            this.showmessage = false;
            this.group = true;
        },
        handleCommand(command) {
            this.$i18n.locale = command.lan;
            this.defaultlanguage = command.language;
        },
        logout() {
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/index';

.container-box {
  width: 100%;
  background: #302c43;
}

.container {
  padding: 0 12.5px;
  height: 100%;
  background: #302c43;
}

.main-header {
  display: flex;
  align-items: center;
  padding: 15px 0 12.5px;
  color: blue1;
  font-size: f4;
  justify-content: space-between;

  .logo {
    cursor pointer
    img {
      width: 140px;
      height: 30px;
      vertical-align: top;
    }
  }

  .user {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100px;
    text-align: right;

    .name {
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.lan {
      color: #fff;
    }
  }

  .iconfont {
    color: c1;
    display: inline-block;
    transform: translateY(2px);
  }
}

.community {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #2097fa;

  a {
    color: #2097fa;
    text-decoration: underline;
  }

  span {
    display: flex;
    align-items: center;
    color: #fff;
  }
}

.tips {
  margin-top: 10px;
  padding: 15px;
  box-sizing: border-box;
  background: tipsbg;
  border-radius: 6px;
  width: 100%;
  min-height: 100px;
  box-shadow: inset 0 -3px blue2;

  .head {
    color: c1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
    }

    .iconfont {
      display: inline-block;
      transform: translate(6px, -10px);
      cursor: pointer;
    }
  }

  .content {
    color: c1;
    font-size: f4;
    margin-top: 6px;
  }
}

.view-scroll {
  padding-bottom: 10px;
  box-sizing border-box
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.grouplist {
  li {
    padding: 20px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #6a6876;
    border-bottom: 1px solid #e2e0ea;
    cursor pointer

    &:last-child {
      border: none;
    }

    .group {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      img {
        margin-right: 3px;
        width: 20px;
        height: 20px;
      }
    }

    &.bordernone {
      border: none;
    }

    .iconfont {
      padding-right: 5px;
    }
  }
}

.wechat {
  img {
    display: block;
    margin: 10px auto;
    width: 150px;
    height: 150px;
  }

  p {
    padding-bottom: 20px;
  }
}

@media only screen and (min-width: 900px) {
  html {
    font-size: 180%;
    height: 100%;
  }

  body {
    background: #302c43;
    width: 100%;
    height: 100%;
  }

  .view {
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    height: 100%;
  }

  .container-box {
    width: 100%;
    background: #302c43;
    height: 100%;
  }

  .container {
    margin: 0 auto;
    max-width: 800px;
  }

  .tips {
    margin: 10px auto;
    max-width: 400px;
  }

  header {
    &.mobile-none {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 35px;
      border-radius: 3px;
      margin-right: 10px;
    }

    height: 40px;
    color: #fff;
    font-size: 20px;
  }

  .float-window {
    position: absolute;
    display: block;
    width: 150px;
    height: 205px;
    text-align: center;
    top: 60px;
    right: 50%;
    transform: translateX(375px);
    background: #fff;
    border-radius: 4px;
    padding: 1px 4px;

    .close {
      height: 20px;

      i {
        float: right;
        color: #cbcbcb;
        cursor: pointer;
      }
    }

    .header {
      margin-top: 6px;

      h1 {
        color: #575757;
        font-size: 10px;
      }

      h5 {
        margin-top: 2px;
        font-size: 8px;
        color: #a0a1a6;
      }
    }

    .content {
      margin-top: 10px;

      img {
        width: 100px;
      }
    }

    .footer {
      position: absolute;
      bottom: 16px;
      width: 100%;

      a {
        text-decoration: underline;
        color: #756dc5;
        font-weight: bold;
      }
    }
  }

  .view-scroll {
    overflow: hidden;
  }
}

@media only screen and (min-width: 900px) {
  .main-header {
    padding: 5px 0;

    .logo img {
      width: 100px;
      height: 24px;
    }

    .user .name {
      font-size: 10px;
    }
  }

  .tips .content {
    font-size: 11px;
  }
}
</style>
<style lang="stylus">
.el-dropdown-link.el-dropdown-selfdefine{
    color:#fff
}
@media only screen and (min-width: 900px) {
    html{
        font-size: 180%;
        height: 100%;
    }
 .main-header,.community{
     .el-dropdown{
         font-size:12px;
         cursor pointer
     }
 }
}
</style>