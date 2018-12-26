import Vue from 'vue';
import Router from 'vue-router';
import main from '../views/main';
import miner from '../views/moneyk/index';
import miner_main from '../views/moneyk/main';
import miner_tronbet from '../views/moneyk/tronbet';
import error_404 from '../views/404/404';
Vue.use(Router);
let router = new Router({
    mode: 'history',
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