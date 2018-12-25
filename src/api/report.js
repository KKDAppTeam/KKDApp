import axios from 'axios';
export default {
    report({ data, event, os }) {
        return axios.post('/report/api/log/report/report?appid=kkdapp&channel=kkdapp', {
            module: 'kkdapp', event, data, os
        });
    }
};
// axios.post('/report/api/log/report/report?appid=kkdapp&channel=kkdapp', {
//     module: 'moneyk', event: 'login', data: {
//         address: res.address,
//         base58address: state.tronWeb.defaultAddress.base58,
//         balance: res.balance,
//     }, os: '暂无'
// });