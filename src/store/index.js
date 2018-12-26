import Vue from 'vue';
import Vuex from 'vuex';
import tronbet from './modules/tronbet';
Vue.use(Vuex);
const state = {
    locales: ['en', 'zh_cn', 'zh_tw'],
    locale: 'en',
    splits: '',
    currency: '',
    dappList: [{
        name: 'TRONbet',
        address: 'TEEXEWrkMFKapSMJ6mErg39ELFKDqEs6w3',
        exponent: 7.8, // 如何计算？
        open: false,
        methods: {
            play: 'bet',
        }
    },
    ]
};
const actions  = {};

const mutations = {};
export default new Vuex.Store({
    state,
    actions,
    mutations,
    modules: {
        tronbet,
    },
});