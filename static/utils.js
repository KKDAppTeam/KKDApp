export default {
    browserRedirect() {
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
    },
};