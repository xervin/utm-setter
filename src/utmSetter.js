class UtmSetter {
    constructor() {
        this.init()
    }

    init() {
        const utm = [];
        (new URLSearchParams(window.location.search)).forEach((v, i) => {
            if (i.indexOf('utm_') === 0) {
                utm.push(i+'='+v)
            }
        })
        let replace = utm.join('&');
        if (replace.length) {
            document.querySelectorAll('[*|href]').forEach((el) => {
                this.addUTM(el, replace)
            });
        }
    }

    addUTM(el, replace) {
        if (typeof el.href === 'object') {
            let xlinkHref = el.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
            if (xlinkHref.startsWith('http')) {
                el.setAttributeNS(
                    'http://www.w3.org/1999/xlink',
                    'xlink:href',
                    xlinkHref + (xlinkHref.indexOf('?') === -1 ? '?' : '&') + replace
                );
            }
        } else {
            if (el.href.startsWith('http')) {
                el.href = el.href + (el.href.indexOf('?') === -1 ? '?' : '&') + replace;
            }
        }
    }
}

(function() {
    new UtmSetter()
}());
