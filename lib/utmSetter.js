'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    this.UtmSetter = function () {
        this.init();
    };

    UtmSetter.prototype.init = function () {
        var utm = [];
        new URLSearchParams(window.location.search).forEach(function (v, i) {
            var kv = i + '=' + v;
            if (i.indexOf('utm_') === 0 && !utm.includes(kv)) {
                utm.push(kv);
            }
        });
        var replace = utm.join('&');
        if (replace.length) {
            document.querySelectorAll('[*|href]').forEach(function (el) {
                addUTM(el, replace);
            });
        }
    };

    function addUTM(el, replace) {
        if (_typeof(el.href) === 'object') {
            var xlinkHref = el.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
            if (xlinkHref.startsWith('http')) {
                el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', xlinkHref + (xlinkHref.indexOf('?') === -1 ? '?' : '&') + replace);
            }
        } else {
            if (el.href.startsWith('http')) {
                el.href = el.href + (el.href.indexOf('?') === -1 ? '?' : '&') + replace;
            }
        }
    }
})();
