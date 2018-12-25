import Vue from 'vue';
import App from './App.vue';
import I18n from 'vue-i18n';
import vueTap from 'v-tap';
import vueClipboards from 'vue-clipboard2';
import router from './router';
import store from './store/index';
import 'mint-ui/lib/style.css';
import './common/reset.styl';
import loc from './i18n/index';

import {
    Dropdown,
    DropdownMenu,
    DropdownItem
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// require('./js/TronWeb.js')
require('../static/iconfont.css');
import {
    Actionsheet, Radio
} from 'mint-ui';
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Radio.name, Radio);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.config.productionTip = false;
vueClipboards.config.autoSetContainer = true;
Vue.use(I18n);
Vue.use(vueClipboards);
Vue.use(vueTap);

const i18n = new I18n({
    locale: 'zh-cn',
    fallbackLocale: 'en',
    messages: {
        en: loc.en,
        'zh-cn': loc.zh_cn,
        'zh-tw': loc.zh_tw
    }
});

new Vue({
    i18n,
    router,
    store,
    render: h => h(App),
}).$mount('#app');