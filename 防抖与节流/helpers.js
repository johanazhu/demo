
var helpers = {

    /**
     * debouncing, executes the function if there was no new event in $wait milliseconds
     * @param func
     * @param wait
     * @param scope
     * @returns {Function}
     */
    // 司徒正美版本
    debounce: function (func, wait, scope) {
        var timeout;
        return function () {
            var context = scope || this, args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    // johan 版本防抖，可与大佬版对比
    // debounce: function (event, wait, flag) {
    //     let timer = null;
    //     return function (...args) {
    //         if (!timer && flag) {
    //             event.apply(this, args)
    //         } else {
    //             timer = setTimeout(() => {
    //                 event.apply(this, args)
    //             }, wait)
    //         }
    //     }
    // }

    /**
     * in case of a "storm of events", this executes once every $threshold
     * @param fn
     * @param threshhold
     * @param scope
     * @returns {Function}
     */
    throttle: function (fn, threshhold, scope) {
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    // johan 版节流，可与大佬版做对比
    // throttle: function (event, wait) {
    //     let pre = 0, timer = null;
    //     return function (...args) {
    //         if (new Date() - pre > wait) {
    //             clearTimeout(timer);
    //             timer = null;
    //             pre = new Date();
    //             event.apply(this, args)
    //         } else {
    //             timer = setTimeout(() => {
    //                 event.apply(this, args)
    //             }, wait)
    //         }
    //     }
    // }
}