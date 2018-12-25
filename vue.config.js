const CompressionWebpackPlugin = require('compression-webpack-plugin');
const px2rem = require('postcss-px2rem');
const path = require('path');
const chalk = require('chalk');
const postcss = px2rem({
    remUnit: 20 // 基准大小 baseSize，需要和rem.js中相同
});
// 是否使用gzip
const productionGzip = true;

// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css'];

// 转为CND外链方式的npm包，键名是import的npm包名，键值是该库暴露的全局变量，参考https://webpack.js.org/configuration/externals/#src/components/Sidebar/Sidebar.jsx
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'vue-i18n': 'VueI18n',
};
// CDN外链，会插入到index.html中
const cdn = {
    dev: {
        css: [
        ],
        js: []
    },
    build: {
        css: [
        ],
        js: [
            'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
            'https://unpkg.com/element-ui/lib/index.js',
            'https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/8.5.0/vue-i18n.min.js',
        ]
    }
};
const baseUrl = process.env.NODE_ENV === 'development' ? '/' : '/';
module.exports = {
    // pages,
    baseUrl: baseUrl,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },
    productionSourceMap: false,
    configureWebpack: config => {
        const myConfig = {};
        if (process.env.NODE_ENV === 'production') {
            // 1. 生产环境npm包转CDN
            myConfig.externals = externals;
            myConfig.plugins = [];
            // 3. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip && myConfig.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 8192,
                    minRatio: 0.8
                })
            );
        }
        if (process.env.NODE_ENV === 'development') {
            /**
           * 关闭host check，方便使用ngrok之类的内网转发工具
           */
            myConfig.devServer = {
                disableHostCheck: true
            };
        }
        return myConfig;
    },
    chainWebpack: config => {
        /**
         * 删除懒加载模块的prefetch，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
         */
        config.plugins
            .delete('prefetch');
        /**
         * 添加CDN参数到htmlWebpackPlugin配置中
         */
        config
            .plugin('html')
            .tap(args => {
                if (process.env.NODE_ENV === 'production') {
                    args[0].cdn = cdn.build;
                }
                if (process.env.NODE_ENV === 'development') {
                    args[0].cdn = cdn.dev;
                }
                return args;
            });
    },
    devServer: {
        proxy: {
        }
    }
};