<template>
  <section class="content">
    <!-- 帐户信息 -->
    <content-vue :infoshow="true">
      <span
        class="name"
        slot="name">{{$t('moneyk.user')}}</span>
      <p
        class="info"
        slot="info">
        <span @click="input('net')">{{info.countnet}}</span>
        <span @click="input('engrgy')">{{info.countengrgy}}</span>
      </p>
      <div
        class="contentdata"
        slot="content">
        <!-- 第一行 -->
        <div class="contentinner">
          <p class="left">
            <span class="mingmu">
              {{$t('moneyk.dice')}}
            </span>
            <span class="data">{{ante == 0 ? 0 :ante.toFixed(4)}}</span>
            <span class="production">
               {{$t('moneyk.total')}} {{recordAnte == 0 ? 0 :recordAnte.toFixed(4)}}
            </span>
          </p>
          <p>
            <span class="mingmu" >
              {{$t('moneyk.eosprofit')}}
            </span>
            <span class="data">
                {{winNum == 0 ? 0 :winNum.toFixed(2)}}
            </span>
            <span class="production" >
              {{$t('moneyk.total')}} {{recordWin == 0 ? 0 : recordWin.toFixed(2)}}
            </span>
          </p>
        </div>
        <!-- 第二行 -->
        <div class="contentinner">
          <!-- 成本 -->
          <p class="left">
            <span class="mingmu">
              {{$t('moneyk.cost')}}
            </span>
            <span class="data">
              {{ante == 0 ? 0 : String((-(winNum/ante)).toFixed(6)).substr(0,7)}}
              <!-- {{recordAnte == 0 ? 0 : (-(recordWin/recordAnte)).toFixed(4)}} -->
            </span>
            <span class="production">
              TRX
            </span>
          </p>
          <!-- 投注次数 -->
          <p>
            <span class="mingmu">
              {{$t('moneyk.count')}}
            </span>
            <span class="data">
              {{totalNum}}
            </span>
            <span class="production">
              {{$t('moneyk.total')}}  {{historyrecordList.length}}
            </span>
          </p>
        </div>
        <p
          class="getmore"
          v-if="getmore"
          @click="toshow">
          {{$t('moneyk.openMore')}}
          <i class="iconfont icon-ic_down"></i>
        </p>
        <div class="contentinner" v-else>
          <p class="left">
            <span class="mingmu">
              {{$t('moneyk.winaccount')}}
            </span>
            <span class="data">{{recordWinNum}}/{{recordLoseNum}}</span>
          </p>
          <p>
            <span class="mingmu">
              {{$t('moneyk.winpercent')}}
            </span>
            <!-- 胜率 -->
            <span class="data">{{(historyrecordList.length == 0 ? 0 :(this.recordWinNum / historyrecordList.length)*100).toFixed(2)+'%'}}</span>
          </p>
        </div>
        <p
          class="getmore"
          v-if="!getmore"
          @click="tohidden" > {{$t('moneyk.closemore')}}<i class="iconfont icon-ic_up"></i>
        </p>
      </div>
    </content-vue>
    <!-- 矿机状态 -->
    <content-vue>
      <span
        class="name"
        slot="name">{{$t('moneyk.set')}}</span>
      <div class="setdata" slot="content" v-if="buymark">
        <p>{{$t('moneyk.bet')}}
          <i class="iconfont icon-wenhao" @click="bet('bet')"></i></p>
        <p class="input"><input type="text" v-model="betdata"><label>{{$t('moneyk.symbol')}}</label></p>
        <p class="center">{{$t('moneyk.type')}}
          <i class="iconfont icon-wenhao" @click="bet('type')"></i>
        </p>
        <p class="bet">
          <switch-button
            :value="value"
            @change="change"></switch-button>
        </p>
        <div class="center">
          <!-- <span>{{$t('moneyk.winaccount')}}
            <i class="iconfont icon-wenhao" @click="bet('winaccount')"></i></span> -->
          <!-- 待补充样式 -->
          <div class="winsGame">
            <b>{{winsgametext+' '+windata}}</b></div>
          <div class="mt-range">
            <mt-range
              v-model="windata"
              :barHeight="10"
              :max="betRolesMax"
              :min="betRolesMin">
              <div slot="start" class="mt-range-start">0</div>
              <div slot="end" class="mt-range-end"> 99 </div>
            </mt-range>
          </div>
            <div class="winsGame">
        <b>{{$t('moneyk.winpercent')+Probability}}</b></div>
          </div>
          <p class="center waitstart">
          {{$t('moneyk.waitstart')}}
        </p>

        <p class="start">
          <kbutton
            v-if="getTronState"
            :content="$t('moneyk.start')"
            @click="start"></kbutton>
          <kbutton :content="$t('moneyk.login')" v-else
              @click="contentTron"
              >
          </kbutton>
        </p>
        <p class="space" v-if="advanced">
          <span>{{$t('moneyk.savemoney')}}<i
              class="iconfont icon-wenhao"
              @click="bet('savemoney')"></i></span>
               <span class="count"><span>{{$t('moneyk.balance')+': '}}</span><span class="balance">{{pow(this.balance).toFixed(4)+' '+$t('moneyk.symbol')}}</span></span>
        </p>
        <!-- 保留余额 -->
        <p class="input" v-if="advanced">
          <span><input
              type="text"
              class="balance"
              v-model="savedata">
              <label>{{$t('moneyk.symbol')}}</label></span>
        </p>
         <p class="getmore" v-if="advanced" @click="changeadvanced">
            {{$t('moneyk.advancedset')}}
             <i class="iconfont icon-ic_up"></i>
        </p>
        <p class="getmore" v-if="!advanced" @click="changeadvanced">
            {{$t('moneyk.advanced')}}
             <i class="iconfont icon-ic_down"></i>
        </p>

      </div>
      <div
        class="setdata "
        slot="content"
        v-else>
        <p class="buyafter"><span>{{$t('moneyk.bet')}}
          <i class="iconfont icon-wenhao" @click="bet('bet')"></i>
          </span> <span class="right">{{betdata+' '+$t('moneyk.symbol')}}</span></p>
        <p class="buyafter"><span>{{$t('moneyk.type')}}
          <i class="iconfont icon-wenhao" @click="bet('type')"></i>
        </span>
          <span class="right">{{this.winsgametext+windata}}</span>
        </p>
        <p class="buyafter"><span>{{$t('moneyk.savemoney')}}
            <i class="iconfont icon-wenhao" @click="bet('savemoney')"></i>
          </span> <span class="right">{{savedata}}</span></p>
        <p class="end">
          <kbutton
            :content="$t('moneyk.end')"
            :disabled="btnDisabled"
            @click="end"
          ></kbutton>
        </p>
        <p class="center">
          <span>{{$t('moneyk.balance')+': '}}</span><span class="count">{{pow(this.balance).toFixed(4)+' '+$t('moneyk.symbol')}}</span>
        </p>
        <div class="center waitstart wining" :class="{'endstart': !miningStart}">
          {{$t('moneyk.mining')}}
          <div class="lds-ellipsis" :class="{'endstart': !miningStart}">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
        </div>
      </div>
    </content-vue>
    <!-- 历史记录 -->
    <content-vue>
      <span
        class="name"
        slot="name"
      >{{$t('moneyk.history')}}</span>
      <div
        class="listdata"
        slot="content"
      >
        <p class="header">
          <span class="bet">{{$t('moneyk.betting')}}</span>
          <span class="result">{{$t('moneyk.result')}}</span>
          <span class="bonus">{{$t('moneyk.bonus')}}</span>
        </p>
        <!-- <span class="getmore">{{$t('moneyk.norecord')}}</span> -->
        <ul class="recordlist" v-if="getmorelist">
          <li
            v-for="item in nowrecordList"
            :key="item.orderId"
            :class="{&quot;last&quot;: !item.win}"
          >
            <span class="bet">{{item.bet}}</span>
            <span class="result">{{item.win ? 'win': 'lose'}} {{item.number}}/{{item.roll}}</span>
            <span class="bonus">{{Number(item.bonus).toFixed(4)}}</span>
          </li>
        </ul>
        <p
          class="getmore"
          v-if="getmorelist"
          @click="changerecord"
        >
          {{$t('moneyk.openMore')}}<i class="iconfont icon-ic_down"></i>
        </p>
        <ul class="recordlist" v-if="!getmorelist">
          <li
            v-for="item in historyrecordList"
            :key="item.orderId"
            :class="{&quot;last&quot;: !item.win}"
          >
            <span class="bet">{{item.bet}}</span>
            <span class="result">{{item.win ? 'win': 'lose'}} {{item.number}}/{{item.roll}}</span>
            <span class="bonus">{{Number(item.bonus).toFixed(4)}}</span>
          </li>
        </ul>
        <p
          class="getmore"
          v-if="!getmorelist"
          @click="changerecord"
        >
          {{$t('moneyk.closemore')}}<i class="iconfont icon-ic_up"></i>
        </p>
      </div>
    </content-vue>
    <message-box
      v-if="showmessage"
      @show="show"
    >
      <p
        class="title"
        slot="title"
      >{{message.title}}
      </p>
      <div
        class="messagecontent"
        slot="messagecontent"
        v-if="slottype==='text'"
      >{{message.content}}</div>
      <div
        class="messagecontent"
        slot="messagecontent"
        v-else-if="slottype==='net'"
      >
        <p><input
            type="text"
            v-model="net"
          ></p>
        <p>
          <kbutton
            :content="$t('moneyk.mortgage')"
            @click="mortnet"
          ></kbutton>
        </p>
      </div>
      <div
        class="messagecontent"
        slot="messagecontent"
        v-else-if="slottype==='engrgy'"
      >
        <p><input
            type="text"
            v-model="engrgy"
          ></p>
        <p>
          <kbutton
            :content="$t('moneyk.mortgage')"
            @click="mortengrgy"
          ></kbutton>
        </p>
      </div>
    </message-box>
    <message-box
      v-if="contentMessage"
      @show="contentMessage = false; group = true"
    >
      <p
        class="title"
        slot="title"
      >
      {{group ? $t('moneyk.freeTime.title') : $t('moneyk.join')}}
      </p>
      <div slot="messagecontent"
      class="messagecontent"
      v-if="group">
        <p class="contract-server">{{$t('moneyk.freeTime.content.one')}} <a href="https://www.jianshu.com/p/4b68080718cb">{{$t('moneyk.freeTime.content.click')}}</a></p>
        <p class="contract-server">{{$t('moneyk.freeTime.content.two')}}</p>
        <ul
          class="grouplist"
        >
        <li
          v-for="(item,index) in $t('moneyk.grouplist')"
          :key="index"
          v-clipboard:copy="item.type === 'link' ? item.link : null"
          v-clipboard:success="item.type === &quot;link&quot; ? onCopy : null"
          v-clipboard:error="item.type === &quot;link&quot; ? onError : null"
          @click="item.type === 'link' ? toLink(item.link) : wechat()">
          <span class="group">
            <img :src="item.src" alt="" onerror="this.src=''">{{item.name}}</span><span>{{item.link}}</span>
        </li>
      </ul>
      </div>
      <div class="wechat" slot="messagecontent" v-else>
          <img src="../../static/images/moneyk/erweima.png" alt="">
          <!-- <p>{{$t('moneyk.scan')}}</p> -->
      </div>
    </message-box>
  <!-- 下载弹框 -->
    <message-box
      v-if="showLogin"
      @show="showLogin = false; group = true"
    >
      <p
        class="title"
        slot="title"

      >
      {{group ? $t('moneyk.loginMessage.title') : $t('moneyk.join')}}
      </p>
      <div slot="messagecontent"
      class="messagecontent"
      v-if="group">
        <p class="contract-server" v-html="$t('moneyk.loginMessage.content.one')">></p>
        <p class="contract-server">{{$t('moneyk.loginMessage.content.two')}}</p>
        <ul
          class="grouplist"
        >
        <li
          v-for="(item,index) in $t('moneyk.grouplist')"
          :key="index"
          v-clipboard:copy="item.type === 'link' ? item.link : null"
          v-clipboard:success="item.type === &quot;link&quot; ? onCopy : null"
          v-clipboard:error="item.type === &quot;link&quot; ? onError : null"
          @click="item.type === 'link' ? toLink(item.link) : wechat()">
          <span class="group">
            <img :src="item.src" alt="" onerror="this.src=''">{{item.name}}</span><span>{{item.link}}</span>
        </li>
      </ul>
      </div>
      <div class="wechat" slot="messagecontent" v-else>
          <img src="../../static/images/moneyk/erweima.png" alt="">
          <!-- <p>{{$t('moneyk.scan')}}</p> -->
      </div>
    </message-box>
  </section>
</template>

<script>
import kbutton from '../../components/kButton';
import contentVue from '../../components/content.vue';
import switchButton from '../../components/switch.vue';
import messageBox from '../../components/messagebox.vue';
import { Toast, Range, Indicator } from 'mint-ui';
import { mapMutations } from 'vuex';
import { setInterval, clearInterval, setTimeout } from 'timers';
import io from 'socket.io-client';
// import switchVue from '../components/switch.vue';
export default {
    components: {
        contentVue,
        kbutton,
        switchButton,
        messageBox,
        'mt-range': Range
    // switchVue
    },
    data() {
        return {
            info: {
                countnet: '',
                countengrgy: ''
            },
            buymark: true, // 挖矿界面切换
            miningStart: false, // 是否正在挖矿
            balance: 0, // 余额
            value: [{
                value: 1,
                label: 'Roll Over'
            }, {
                value: 0,
                label: 'Roll Under'
            }
            ],
            currentWay: 0,
            betvalue: '',
            getmore: true,
            showmessage: false,
            message: {
                title: '',
                content: '',
            },
            slottype: 'text',
            net: '',
            engrgy: '',
            // 下注金额
            betdata: '10',
            windata: 95,
            savedata: '0',
            referreldata: 'kminer',
            showreferrel: false,
            betRolesMax: 95,
            betRolesMin: 1,
            miningInterval: '',
            currentOrder: {},
            ante: 0, // 本次获取ante代币数量
            totalNum: 0, // 投注次数
            recordNum: 0, // 历史投注次数
            needTrx: 0, // trx与ante比例
            lose: 0, // 本次输掉
            winNum: 0, // 本次赢得
            totalWinNum: 0,
            showlist: true,
            nowrecordList: [],
            historyrecordList: [],
            getmorelist: true,
            btnDisabled: false, // 结束按钮,
            winsgametext: this.$t('moneyk.rollunder'),
            advanced: false,
            interval: '',
            orderInterval: '',
            currentMiningNum: '', // 当前帐户可挖矿次数
            socket: '', // websocket 与tronbet建立链接
            kkAddress: 'TS6Kn25WVqFPNBvc5jTicFRCc7qUXBJqgh', // 官方邀请码
            currentRefirel: '', // 当前帐号邀请码
            freeBetNum: null,  // 免费投注次数
            contentMessage: false, // 投注上线。联系客服
            group: true,
            showLogin: false,
        };
    },
    computed: {
        recordWin() {
            return this.$store.state.tronbet.recordWin;
        },
        recordAnte() {
            return this.$store.state.tronbet.recordAnte;
        },
        defaultAddress() {
            return this.$store.state.tronbet.defaultAddress;
        },
        account() {
            return this.$store.state.tronbet.account;
        },
        getTronState() {
            return this.$store.state.tronbet.tronReady;
        },
        betbignumber() {
            return this.$store.state.tronbet.tronWeb && this.$store.state.tronbet.tronWeb.toBigNumber(this.betdata).times(1e6);
        },
        Probability() {
            if (this.currentWay === 1) {
                return 99 - this.windata + '%';
            } else {
                return this.windata + '%';
            }
        },
        // 累胜利次数
        recordWinNum() {
            let num = 0;
            this.historyrecordList.forEach(item => {
                if (item.win) {
                    num++;
                }
            });
            return num;
        },
        // 累计失败次数
        recordLoseNum() {
            let num = 0;
            this.historyrecordList.forEach(item => {
                if (!item.win) {
                    num++;
                }
            });
            return num;
        },
    },
    watch: {
        betdata(n) {
            let val = n.replace(/[^(\-?\d+\.?\d+)]/g, '');
            //   val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            val = val.replace(/^\./g, ''); // 验证第一个字符是数字而不是
            val = val.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
            val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //   val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
            if (val > this.pow(this.balance)) val = this.pow(this.balance);
            this.betdata = val.toString();
        },
        savedata(n) {
            let val = n.replace(/[^(\-?\d+\.?\d+)]/g, '');
            //   val = val.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
            val = val.replace(/^\./g, ''); // 验证第一个字符是数字而不是
            val = val.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
            val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
            //   val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数
            if (val > this.pow(this.balance)) val = this.pow(this.balance);
            this.savedata = val.toString();
        },
        getTronState(n) {
            if (n) {
                this.initdata();
            }
            return;
        },
        interval(n, o) {
            if (o) {
                clearInterval(o);
            }
        }

    },
    created() {
        this.value = this.$t('moneyk.betvalue');
    },
    beforeRouteLeave(to, from, next) {
        this.miningStart = false;
        clearInterval(this.orderInterval);
        next();
    },
    mounted() {
        this.initdata();
    },
    beforeDestroy() {
        clearInterval(this.orderInterval);
    },
    methods: {
        ...mapMutations(['SET_SHOWNAME']),
        contentTron() {
            Indicator.open({
                text: this.$t('moneyk.loginng'),
                spinnerType: 'fading-circle'
            });
            setTimeout(() => {
                this.$store.dispatch('TronInit').then((res) => {
                    if (!res) {
                        this.showLogin = true;
                    }
                    Indicator.close();
                    // this.$store.dispatch('accountInfo').then(accountInfo => {
                    //   this.balance = this.$store.state.tronbet.tronWeb.toBigNumber(accountInfo.balance)
                    // })
                });
            }, 500);
        },
        initdata() {
            if (this.getTronState) {
                this.$store.dispatch('accountInfo').then(accountInfo => {
                    this.historyrecordList = localStorage.getItem(accountInfo.address) && JSON.parse(localStorage.getItem(accountInfo.address)).historyrecordList || [];
                    this.balance = this.$store.state.tronbet.tronWeb.toBigNumber(accountInfo.balance);
                    this.searchOrder().then((order) => {
                        this.currentOrder = order;
                    }).catch((e) => {
                        console.error('search order error', e);
                    });
                    this.orderInterval = setInterval(() => {
                        this.searchOrder().catch((e) => {
                            console.error('search order error', e);
                        });
                    }, 1000);
                    this.getRefirrel();
                });
                this.getMinningRate();
            }
        },
        pow(num) {
            if (typeof num !== 'object') return 0;
            return num.div(1e6).toNumber();
        },
        start() {
            let balance = this.pow(this.balance);
            if (this.savedata && this.savedata <= balance && this.betdata && balance >= this.betdata) {
                this.buymark = false;
                this.miningStart = true;
                this.mining();
            } else {
                Toast({
                    message: this.$t('moneyk.nobalance')
                });
            }
        },
        validata() {
            if (this.savedata < 0) {
                Toast({
                    message: this.$t('moneyk.dataerror')
                });
            }
            if (this.betdata < 10) {
                Toast({
                    message: this.$t('monetk.dateerror')
                });
            }
        },
        changerecord() {
            this.getmorelist = !this.getmorelist;
        },
        end() {
            this.btnDisabled = true;
            this.miningStart = false;
        },
        resetData() {
            this.ante = 0;
            this.lose = 0;
            this.winNum = 0;
            this.totalNum = 0;
        },
        changere() {
            this.showreferrel = true;
        },
        change(index) {
            if (this.value[index].value === 0) {
                this.winsgametext = this.$t('moneyk.rollunder');
                this.betRolesMax = 95;
                this.betRolesMin = 1;
                this.currentWay = 0;
                if (this.windata > 95) {
                    this.windata = 95;
                }
            } else {
                this.winsgametext = this.$t('moneyk.rollover');
                this.betRolesMax = 98;
                this.betRolesMin = 4;
                this.currentWay = 1;
                if (this.windata < 4) {
                    this.windata = 4;
                }
            }
        },
        toshow() {
            this.getmore = false;
        },
        tohidden() {
            this.getmore = true;
        },
        // 挖矿
        async mining() {
            if (!this.miningStart) {
                return;
            }
            let balance = this.pow(this.balance);
            if (this.savedata <= balance && balance >= this.betdata) {
                let err; let tx;
                [err, tx] = await this.betMoney();
                if (err) {
                    return this.mining();
                }
                setTimeout(() => {
                    this.mining();
                }, 3000);
            } else {
                // 余额小于保留余额
                this.buymark = true;
                Toast({
                    message: this.$t('moneyk.tipsmessage')
                });
            }

        },
        // 存储记录
        setRecord() {
            let obj = {
                recordAnte: this.recordAnte,
                recordWin: this.recordWin,
                historyrecordList: this.historyrecordList,
            };
            localStorage.setItem(this.defaultAddress, JSON.stringify(obj));
        },
        // 调用合约
        betMoney() {
            this.referreldata = this.referreldata || 'kminer';
            const toBigNumber = this.$store.state.tronbet.tronWeb.toBigNumber;
            const callValue = toBigNumber(this.betdata).times(toBigNumber(String(1e6)));
            return new Promise((resolve, reject) => {
                if (this.freeBetNum && this.historyrecordList.length >= this.freeBetNum) {
                    this.buymark = true;
                    this.contentMessage = true;
                    reject(['次数上线']);
                    return;
                }
                this.$store.state.tronbet.TronbetContract.WelcomeToTronBet(this.windata, this.currentWay, this.referreldata).send({ callValue }, (err, tx) => {
                    if (err) {
                        // 拒绝执行
                        this.buymark = true;
                        Toast({
                            message: this.$t('moneyk.reject')
                        });
                        reject([err]);
                    } else {
                        resolve([null, tx]);
                    }
                });
            });
        },
        // 查询是否成功上链
        searchTX(tx) {
            return new Promise((resolve, reject) => {
                this.interval = setInterval(() => {
                    this.$store.state.tronbet.tronWeb.trx.getTransaction(tx).then((transaction) => {
                        if (transaction.ret && transaction.ret[0]) {
                            clearInterval(this.interval);
                            resolve([null, transaction.ret[0].contractRet]);
                        }
                    }).catch((err) => {
                        clearInterval(this.interval);
                        reject([err]);
                    });
                }, 500);
            });
        },
        // 获取波场代币比例
        getMinningRate() {
            this.$store.state.tronbet.tronWeb.contract().at('41734c2f23ab41c52308d1206c4eb5fe8e124e6898', (err, contract) => {
                if (err) { return console.error(err) }
                contract && contract.getPoolAnteBalance().call((err, tx) => {
                    if (err) { return console.error(err) }
                    let o = tx.toNumber() / 1e6;


                    let i = 1e8 - o;
                    let nowAnte = Number(i.toFixed(3));


                    let stage = Math.ceil(nowAnte / 1e6);


                    let needTrx = 20 * (stage - 1) + 1e3;
                    this.needTrx = needTrx;
                });
            });
        },
        getAnte() {
            return new Promise((resolve, reject) => {
                this.$store.state.tronbet.tronWeb.contract().at('41734c2f23ab41c52308d1206c4eb5fe8e124e6898', (err, contract) => {
                    if (err) { return reject(err) }
                    contract && contract.playerAnteCache(this.$store.state.tronbet.tronWeb.defaultAddress.hex).call((err, tx) => {
                        if (err) { return reject(err) }
                        resolve(tx);
                    });
                });
            });

        },
        // 查询订单
        searchOrder() {
            return new Promise((resolve, reject) => {
                let getOrder = this.$store.state.tronbet.TronbetContract.getOrder(this.$store.state.tronbet.tronWeb.defaultAddress.hex);
                const callBack = (err, tx) => {
                    if (err) return reject(err);
                    const order = {
                        number: tx.number.toNumber(),
                        orderId: tx.orderId.toNumber(),
                        roll: tx.roll.toNumber(),
                        direction: tx.direction.toNumber(),
                        tx
                    };
                    this.currentOrder = order;
                    if (order.roll < 100 && !this.buymark) {
                        this.betInfo(tx, order);
                    }
                    if (!this.buymark && order.roll > 100) {
                        if (!this.miningStart) {
                            this.buymark = true;
                            this.btnDisabled = false;
                            this.resetData();
                            // Toast({ message: this.$t('moneyk.end') })
                            return;
                        }
                    }
                    resolve(order);
                };
                getOrder.call(callBack);
            });
        },
        // 查询当前联系人是否被推荐
        getRefirrel() {
            this.$store.state.tronbet.tronWeb.contract().at('41af16843d1b471364576015e4062cdc3f2628eb62', (err, contract) => {
                if (err) { return console.error(err, 'error contract') }
                contract && contract.getReferralShip(this.$store.state.tronbet.tronWeb.defaultAddress.base58).call().then(output => {
                    this.currentRefirel = this.$store.state.tronbet.tronWeb.address.fromHex(output);
                    if (this.currentRefirel !== this.kkAddress) {
                        this.freeBetNum = 20;
                    }
                });
            });
        },
        // 查询订单
        handleSearchOrder() {
            let _this = this;
            return new Promise((resolve, reject) => {
                let count = 0;
                let getOrder = this.$store.state.tronbet.TronbetContract.getOrder(this.$store.state.tronbet.tronWeb.defaultAddress.hex);
                function callBack(err, tx) {
                    // 获取最新订单
                    if (err) return getOrder.call(callBack);
                    if (!(tx.orderId.toNumber() > _this.currentOrder.orderId) && count < 10) {
                        if (count === 31) {
                        setTimeout(() => {
                            count++;
                            getOrder.call(callBack);
                        }, 300);
                    } else {
                        // 如果10次以上的随机数是255 或者有结果
                        callBack = null;
                        resolve([null, {
                            number: tx.number.toNumber(),
                            orderId: tx.orderId.toNumber(),
                            roll: tx.roll.toNumber(),
                            direction: tx.direction.toNumber(),
                            tx
                        }]);
                    }
                }
                getOrder.call(callBack);
            });
        },
        // 下注详情
        betInfo(tx, order) {
            if (!this.miningStart) {
                this.buymark = true;
                this.btnDisabled = false;
                this.resetData();
                return;
            }
            if (order.roll > 100) {
                this.currentOrder = order;
                return;
            }
            this.currentOrder = order;
            if (this.historyrecordList.find((item) => {
                return item.orderId === order.orderId;
            })) {
                return;
            }
            // 查询订单信息
            const isWin = order.direction === 1 ? order.number < order.roll : order.number > order.roll;
            if (!isWin) {
                this.winNum -= this.betdata;
                this.$store.commit('setrecordWin', -this.betdata);
                this.balance = this.balance.minus(this.betbignumber);
                this.totalWinNum -= this.betdata;
            } else {
                let winnum = 0;
                if (order.direction === 0) {
                    winnum = this.betbignumber.times(98.5 / order.number - 1);
                } else {
                    winnum = this.betbignumber.times(98.5 / (99 - order.number) - 1);
                }
                this.winNum += this.betdata * 98.5 / (order.direction === 0 ? order.number : 99 - order.number) - this.betdata;
                this.totalWinNum += this.betdata * 98.5 / (order.direction === 0 ? order.number : 99 - order.number) - this.betdata;
                this.$store.commit('setrecordWin', this.betdata * 98.5 / (order.direction === 0 ? order.number : 99 - order.number) - this.betdata);
                this.balance = this.balance.plus(winnum);
            }
            let listItem = {
                bet: order.tx.trxAmount.div(1e6).toNumber(),
                win: isWin,
                bonus: isWin ? order.tx.trxAmount.div(1e6).toNumber() * 98.5 / (order.direction === 0 ? order.number : 99 - order.number) : order.tx.trxAmount.div(1e6).toNumber(),
                number: order.number,
                roll: order.roll,
                orderId: order.orderId
            };

            this.historyrecordList.unshift(listItem);
            this.nowrecordList.unshift(listItem);
            this.totalNum++;
            this.ante += this.betdata / this.needTrx;
            this.$store.commit('setrecordAnte', this.betdata / this.needTrx);
            // 存储本地localstorage
            this.setRecord();
        },
        // 提示
        bet(type) {
            let showmessage = this.$t('moneyk.showtype')[type];
            this.slottype = 'text';
            this.message = Object.assign({}, this.message, showmessage);
            this.showmessage = true;
        },
        //
        input(type) {
            this.$set(this.message, 'title', this.$t('moneyk.showtype')[type].title);
            this.slottype = type;
            this.showmessage = true;
        },
        mortnet() {
        },
        mortengrgy() {
            return;
        },
        show() {
            this.showmessage = false;
        },
        download() {
            location.href = 'http://www.bankowallet.com';
        },
        changeadvanced() {
            this.advanced = !this.advanced;
        },
        wechat() {
            this.group = false;
        },
        toLink(link) {
            location.href = link;
        },
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
    }
};
</script>
<style lang='stylus' scoped>
@import '../../common/index';

.content {
  color: c1;

  .contentdata {
    padding-top: 15px;

    .contentinner {
      padding-bottom: 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      color: #9691ae;

      p {
        &.left {
          width: 65%;
        }

        span {
          display: block;
          text-align: left;
          font-size: 14px;
        }

        .data {
          color: #ffd100;
          font-size: 24px;
          line-height: 28px;
        }

        .production {
          font-size: 10px;
        }
      }
    }

    .getmore {
      text-align: center;
      color: #f8d500;
      cursor: pointer;
    }
  }

  .setdata {
    padding-top: 15px;
    font-size: 13px;
    color: #9691ae;
    text-align: left;

    .buyafter {
      padding: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #27243b;
    }

    .iconfont {
      margin-left: 5px;
      vertical-align: top;
      cursor: pointer;
    }

    input {
      width: 100%;
      height: 40px;
      font-size: 17px;
      color: #fff;
      background-color: #27243b;
      border-radius: 6px;
      border: solid 1px #9690ae;
      box-sizing: border-box;
      text-align:right
      padding: 0 45px 0 0 ;
    }

    .center {
      padding: 10px 0;
      text-align: center;

      .couint {
        color: #fff;
      }
    }
    .getmore{
        padding-top:20px;
        color: #f8d500;
        text-align:center
        cursor pointer
    }
    .space{
        padding-top:30px;
        display:flex;
        flex-direction:row;
        justify-content: space-between;
        align-items:center;
        .balance{
            position:relative;
            color:#fff
            label{
                position:absolute;
                top:17px;
                right:20px;
                font-size:17px;
            }
        }
    }
    .input {
      position:relative;
      padding: 10px 0;
      label{
          position:absolute;
          right:12px;
          top:17px;
          font-size:17px;
          color:#fff;
      }
    }

    .bet {
        padding-bottom:15px;
      text-align: center;
    }

    .account {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      p span {
        padding: 5px 0;
        display: block;

        input {
          padding-left: 20px;
          width: 125px;
        }
      }
    }

    .referrer {
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      input {
        width: 125px;
      }

      .mike {
        color: #fff;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // width 1rem
        .iconfont {
          color: #9691ae;
        }
      }
    }

    .start .k-button, .end .k-button {
      margin: 0 auto;
      width: 220px;
      // background: blue1;
      // box-shadow: inset 0 -3px blue2;
    }

    .end {
      padding-top: 20px;
    }

    .waitstart {
      padding-top: 0;
      font-size: 14px;
      color: #40c0a7;
      &.wining {
        color #ff3469
      }
      &.endstart {
        color #9691ae
      }
    }
  }

  .listdata {
    .header {
      padding: 10px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      color: #f8d500;

      span {
        width: 33%;
      }

      .bonus {
        text-align: right;
      }
    }

    .getmore {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content center
      color: #f8d500;
      cursor pointer

    }

    .recordlist {
      max-height: 300px;
      overflow-x: hidden;
      overflow-y: scroll;

      li {
        padding: 12px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 13px;
        border-bottom: 1px solid #27243b;

        span {
          width: 33%;
          color: #9690ae;
        }

        .bonus {
          text-align: right;
        }

        &.last span {
          color: #ff2f61;
        }
      }
    }
  }
}

.messagecontent {
  padding: 0 20px;
  font-size: 14px;
  text-align: left;
  color:#777484
  input {
    display: block;
    margin: 0 auto;
    padding-left: 20px;
    width: 250px;
    height: 43px;
    background-color: #e9e6f2;
    border-radius: 6px;
    border: none;
    box-sizing: border-box;
  }
  .contract-server {
    margin-top 6px
  }
  button {
    display: block;
    margin: 20px auto;
    width: 150px;
    box-shadow: inset 0 -3px blue2;
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
.winsGame {
  font-size: 17px;
  text-align: center;
  color: c1;
}

.mt-range {
  width: 300px;
  margin: 0 auto;
}

.mt-range-start {
  margin-right: 5px;
}

.mt-range-end {
  margin-left: 5px;
}

@media only screen and (min-width: 900px) {
  .mt-range {
    width: 200px;
    margin: 0 auto;
  }
  .content .contentdata .contentinner p .data{
    font-size:16px;
  }
  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;

    .inner {
      width: 260px;
      font-size: 11px;

      .top {
        margin: 0;
        font-size: 12px;
      }
    }
  }
  .content .contentdata .contentinner p span, .content .setdata, .content .listdata .recordlist li, .content .setdata .waitstart {
    font-size: 11px;
  }

  .content .setdata input {
    height: 30px;
    font-size:14px
    &.balance{
        padding:0 40px 0 0
    }
  }

  .content .setdata button {
    height: 30px;
  }

  .content .setdata .account p span input {
    width: 105px;
  }
  .winsGame{
      font-size:10px;
  }
  .content .setdata {
    input.balance{
      font-size:14px
    }

  }
  .content .setdata .input label{
      top:17px;
      font-size:12px;
  }
  .getmore{
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      font-size:10px;
      cursor pointer
  }
  .content .setdata .iconfont {
    margin-left:5px;
    cursor: pointer;
    font-size:12px;
}
}

.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 34px;
  height: 10px;
  .item {
    position: absolute;
    top: 3px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff3469;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  &.endstart{
    .item {
      background #9691ae
      position: absolute;
      top: 3px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }
  }
}
.lds-ellipsis .item:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis .item:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis .item:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis .item:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
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
</style>
<style lang="stylus">
.mt-range-runway {
  border-top-color #ff3469 !important
  border-radius 5px
}
.mt-range-progress {
  background #38f0cb !important
  border-radius 5px 0 0 5px
}
.mt-range-thumb {
  height 20px !important
  width 20px !important
  box-shadow: 2px 4px 10px 0px  rgba(117, 80, 187, 0.61)
  top 5px !important
  }

</style>
