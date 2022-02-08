'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtmSaver = function () {
    function UtmSaver() {
        _classCallCheck(this, UtmSaver);

        this.init();
    }

    _createClass(UtmSaver, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var utm = [];
            new URLSearchParams(window.location.search).forEach(function (v, i) {
                if (i.indexOf('utm_') === 0) {
                    utm.push(i + '=' + v);
                }
            });
            var replace = utm.join('&');
            if (replace.length) {
                document.querySelectorAll('[*|href]').forEach(function (el) {
                    _this.addUTM(el, replace);
                });
            }
        }
    }, {
        key: 'addUTM',
        value: function addUTM(el, replace) {
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
    }]);

    return UtmSaver;
}();

exports.default = UtmSaver;