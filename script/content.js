(function () {
    var href = location.href, intrvl_id = null;
    if (href.indexOf('&') != -1) {
        return;
    }
    function stop_check() {
        if (intrvl_id != null) {
            clearInterval(intrvl_id);
            intrvl_id = null;
        }
    }
    function check_iframe_hijack() {
        var iframes, i, url;
        iframes = document.getElementsByTagName('iframe');
        for (i = 0; i < iframes.length; ++i) {
            // NOTE: can NOT use '.src' accessor, 'cause chrome will expand it when it's empty.
            url = iframes[i].getAttribute('src');
            if (url != '' && (href + '?' == url || href + ';' == url || href + '#' == url || href == url)) {
                stop_check();
                console.log('HIJACK!!!');
                location.reload();
                break;
            }
        }
    }
    intrvl_id = setInterval(check_iframe_hijack, 400);
    window.addEventListener('load', stop_check);
})();
