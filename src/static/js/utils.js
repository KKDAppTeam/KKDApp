export const isAddress = function (num) {
    // 检验地址
    return num;
};
export const fixnumber = function (num) {
    let newNum = num;
    let numStr = String(newNum);
    if (Math.abs(newNum) < 1.0) {
        let e = parseInt(newNum.toString().split('e-')[1], 0);
        if (e) {
            let negative = newNum < 0;
            if (negative) newNum *= -1;
            newNum *= Math.pow(10, e - 1);
            numStr = '0.' + (new Array(e)).join('0') + newNum.toString().substring(2);
            if (negative) numStr = '-' + numStr;
        }
    } else {
        let e = parseInt(num.toString().split('+')[1], 0);
        if (e > 20) {
            e -= 20;
            newNum /= Math.pow(10, e);
            numStr = newNum.toString() + (new Array(e + 1)).join('0');
        }
    }

    return numStr;

};
export const fixdata = function (numStr) {
    let returndata = '0.00000000';
    if (numStr < 1) {
        returndata = fixnumber(numStr).substring(0, 10);
    } else {
        if (numStr) {
            let arr = fixnumber(numStr).split('.');
            if (arr[1]) {
                let length = arr[0].length + 9;
                returndata = fixnumber(numStr).substring(0, length);
            } else {
                returndata = fixnumber(numStr);
            }
        }
    }
    return returndata;
};
export const getparams = function (url, name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = url.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
export const browserRedirect = () => {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i);
    let bIsIphoneOs = sUserAgent.match(/iphone os/i);
    let bIsMidp = sUserAgent.match(/midp/i);
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i);
    let bIsUc = sUserAgent.match(/ucweb/i);
    let bIsAndroid = sUserAgent.match(/android/i);
    let bIsCE = sUserAgent.match(/windows ce/i);
    let bIsWM = sUserAgent.match(/windows mobile/i);
    // document.writeln('您的浏览设备为：');
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 'phone';
    } else {
        return 'pc';
    }
};