import axios from 'axios';
const state = {
    isContract: false,
    tronWeb: '',
    newContract: '',
    tryNum: 0,
    defaultAddress: null,
    datainfo: {},
    account: {
        name: '',
        balance: '',
        address: '',
    },
    data: {
        bet: ''
    },
    currentContract: 'TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3',
    bandwidth: '',
    resource: {
        NetUsed: '', // 已使用抵押带宽数量
        TotalNetLimit: '', // 抵押带宽总数量
        freeNetLimit: '', // 免费带宽数量
        freeNetUsed: '', // 免费带宽已使用数量
        EnergyLimit: '' // cpu总数
    },
    tronReady: false,
    recordlist: [],
    recordWin: 0,
    recordAnte: 0,
    TronbetContract: {},
};
const actions = {
    async TronInit({ commit, state, dispatch }) {
        return dispatch('waitForGlobal').then(async (res) => {
            console.error(res, 'initwati');
            if (!res) return false;
            await dispatch('getAccountInfo');
            // dispatch('getBandwidth')
            await dispatch('getAccountResources');
            state.tronWeb.on('addressChanged', function () {
                location.reload();
            });
            await dispatch('getContentTronbet');
            commit('setTronState', true);
            return true;
        }).catch(err => {
            console.error(err, 'initwait error');
        });
    },
    waitForGlobal: async ({ commit, state, dispatch }) => {
        if (window.tronWeb) {
            commit('setTron', window.tronWeb);
            const nodes = await state.tronWeb.isConnected();
            const connected = !Object.entries(nodes).map(([name, connected]) => {
                if (!connected) {
                    console.error(`Error: ${name} is not connected`);
                }
                return connected;
            }).includes(false);
            if (connected) {
                return 1;
            } else {
                setTimeout(async () => {
                    await dispatch('waitForGlobal');
                }, 100);
            }
        } else {
            if (state.tryNum > 10) {
                return false;
            }
            setTimeout(async () => {
                await dispatch('waitForGlobal');
                commit('tryLink');
            }, 100);
        }
    },
    // 获取当前帐号信息
    getAccountInfo({ commit, state }) {
        state.tronWeb.trx.getAccount(state.tronWeb.defaultAddress.base58).then(res => {

            commit('setInfo', res);
            commit('setrecord', state.defaultAddress);
            axios.post('/report/api/log/report/report?appid=kkdapp&channel=kkdapp', {
                module: 'moneyk', event: 'login', data: {
                    address: res.address,
                    base58address: state.tronWeb.defaultAddress.base58,
                    balance: res.balance,
                }, os: '暂无'
            });
        });
    },
    // 获取帐号信息
    accountInfo({ state }) {
        return state.tronWeb.trx.getAccount(state.tronWeb.defaultAddress.base58);
    },
    // 链接Tronbet合约
    getContentTronbet({ commit, state }) {
        state.tronWeb.contract().at('TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3', (err, contract) => {
            if (err) return err;
            commit('setTronbet', contract);
        });
    },
    // 获取带宽
    getBandwidth({ state, commit }) {
        state.tronWeb.trx.getBandwidth(state.tronWeb.defaultAddress.base58).then(res => {
            commit('setBandwidth', res);
        });
    },
    // 获取 资源信息
    getAccountResources({ state, commit }) {
        state.tronWeb.trx.getAccountResources(state.tronWeb.defaultAddress.base58, (err, resources) => {
            if (err) return console.log(err, 'resource.err');
            commit('setResource', resources);
        });
    },
    // 查询合约信息
    getContract({ state, commit }) {
        state.tronWeb.trx.getContract(state.currentContract).then(contract => {
            console.log(contract);
        });
    },
    // 连接合约
    contentContract({ state }, callback) {
        state.tronWeb.contract().at(state.currentContract, callback);
    },

};
const mutations = {
    tryLink(state) {
        state.tryNum++;
    },
    setTron(state, tronWeb) {
        state.tronWeb = tronWeb;
    },
    setInfo(state, info) {
        state.account = {
            name: info['account_name'] && decodeURI('%' + info['account_name'].replace(/(.{2})/g, '$1%').slice(0, -1)),
            base58address: state.tronWeb.defaultAddress.base58,
            ...info
        };
        state.defaultAddress = info['address'];
    },
    setBandwidth(state, bandwidth) {
        state.bandwidth = bandwidth;
    },
    setResource(state, resource) {
        state.resource = resource;
    },
    // 设置合约地址
    setContractAddress(state, address) {
        state.currentContract = address;
    },
    setTronState(state, flag) {
        state.tronReady = flag;
    },
    setrecord(state, address) {
        state.recordlist = localStorage.getItem(address) && JSON.parse(localStorage.getItem(address)).historyrecordList || [];
        state.recordWin = localStorage.getItem(address) && JSON.parse(localStorage.getItem(address)).recordWin || 0;
        state.recordAnte = localStorage.getItem(address) && JSON.parse(localStorage.getItem(address)).recordAnte || 0;
    },
    setrecordWin(state, num) {
        state.recordWin += num;
    },
    setrecordAnte(state, num) {
        state.recordAnte += num;
    },
    setTronbet(state, contract) {
        state.TronbetContract = contract;
    },
    SET_BET(state, bet) {
        state.data.bet = bet;
    },
    SET_DATA(state, data) {
        Object.assign(state.datainfo, data);
    }
};
export default { state, actions, mutations };