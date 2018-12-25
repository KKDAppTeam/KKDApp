import Vue from 'vue';
import Router from 'vue-router';
import main from '../views/main';
import miner from '../views/moneyk/index';
import miner_main from '../views/moneyk/main';
import miner_tronbet from '../views/moneyk/tronbet';
// import envelope_nain from '../views/envelope/main';
// import envelope_send from '../views/envelope/send';
// import envelope_share from '../views/envelope/share.vue';
// import envelope_collar from '../views/envelope/collar.vue';
// import envelope_history from '../views/envelope/history.vue';
import error_404 from '../views/404/404';
Vue.use(Router);
let router = new Router({
    mode: 'history',
    // base: '/dapp/salary',
    routes: [{
        path: '/',
        component: main,
        name: 'main',
        children: []
    },
    {
        path: '/miner',
        component: miner,
        name: 'miner',
        meta: {
            showname: false
        },
        children: [{
            path: '',
            component: miner_main,
            name: 'miner.main',
            meta: {
                showname: false
            }
        },
        {
            path: 'TRONbet',
            component: miner_tronbet,
            name: 'miner.TRONbet',
            meta: {
                showname: true
            }
        },

        ]
    },
    // {
    //     path: '/envelope',
    //     component: envelope_nain,
    //     name: 'envelope_nain',
    //     children: [{
    //         path: 'send',
    //         component: envelope_send,
    //         name: 'envelope_send',
    //     },
    //     {
    //         path: 'share',
    //         component: envelope_share,
    //         name: 'envelope_share',
    //     },
    //     {
    //         path: 'collar',
    //         component: envelope_collar,
    //         name: 'envelope_collar',
    //         meta: {

    //         }
    //     },
    //     {
    //         path: 'history',
    //         component: envelope_history,
    //         name: 'envelope_history',
    //         meta: {

    //         }
    //     },
    //     ]
    // },
    {
        path: '/*',
        component: error_404,
        name: '404',
    }

    ]
});
router.beforeEach((to, from, next) => {
    next();
});
export default router;