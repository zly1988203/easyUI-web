function loader() {

    function createUrlScript(el) {
        var url = el.data;
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        return script;
    }

    function createStringScript(el) {
        var code = el.data;
        var script = document.createElement("script");
        script.type = "text/javascript";
        try {
            script.appendChild(document.createTextNode(code));
        }
        catch (ex) {
            script.text = code;
        }
        return script;
    }

    function createLink(el) {
        var url = el.data;
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        if (el.attributes) {
            for (var attr in el.attributes) {
                link[attr] = el.attributes[attr];
            }
        }
        return link;
    }

    function createStyle(el) {
        var css = el.data;
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        }
        catch (ex) {
            style.styleSheet.cssText = css;
        }
        return style;
    }

    function appendToHead(el) {
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(el);
    }

    this.load = function (elements,onload) {
        if (elements && elements instanceof Array) {
            if (elements.length) {
                var elArr = [];
                var el = undefined;
                var element = undefined;
                for (var i = 0; i < elements.length; i++) {
                    el = elements[i];
                    if (el.type == "link") {
                        element = createLink(el);
                        elArr.push(element);
                    }
                    else if (el.type == "style") {
                        elArr.push(createStyle(el));
                    }
                    else if (el.type == "urlScript") {
                        elArr.push(createUrlScript(el));
                    }
                    else if (el.type == "stringScript") {
                        elArr.push(createStringScript(el));
                    }
                }

                for (var k = 0; k < elArr.length; k++) {
                    el = elArr[k];
                    //el.onload = el.onreadystatechange = (function (p) {
                    //    var that = this;
                    //    var isLoaded = false;
                    //    return function () {
                    //        if (!isLoaded && (!that.readyState || that.readyState == "loaded" || that.readyState == "complete")) {
                    //            isLoaded = true;
                    //            that.onload = that.onreadystatechange = null;
                    //            if (p + 1 < elArr.length) {
                    //                appendToHead(elArr[p + 1]);
                    //            } else {
                    //                if (onload) {
                    //                    alert(that.readyState);
                    //                    onload.call(that);
                    //                }
                    //            }
                    //        }
                    //    }
                    //})(k);

                    el.onload = (function (p) {
                        var that = this;
                        var isLoaded = false;
                        return function () {
                            if (!isLoaded ) {
                                isLoaded = true;
                                that.onload = null;
                                if (p + 1 < elArr.length) {
                                    appendToHead(elArr[p + 1]);
                                } else {
                                    if (onload) {                                       
                                        onload.call(that);
                                    }
                                }
                            }
                        }
                    })(k);
                }

                if (elArr.length) {
                    appendToHead(elArr[0]);
                }
            }
        }
    }

    this.loadAsync = function (elements) {
        if (elements && elements instanceof Array) {
            if (elements.length) {               
                var el = undefined;
                var element = undefined;
                for (var i = 0; i < elements.length; i++) {
                    el = elements[i];
                    if (el.type == "link") {
                        element = createLink(el);                        
                    }
                    else if (el.type == "style") {
                        element = createStyle(el);
                    }
                    else if (el.type == "urlScript") {
                        element = createUrlScript(el);
                    }
                    else if (el.type == "stringScript") {
                        element = createStringScript(el);
                    }

                    appendToHead(element);
                }
            }
        }
    }

    this.loadUrl = function (element, onload) {
        if (!element) return;
        var el;
        if (element.type == "link") {
            el = createLink(element);
        }
        else if (element.type == "style") {
            el = createStyle(element);
        }
        else if (element.type == "urlScript") {
            el = createUrlScript(element);
        }
        else if (element.type == "stringScript") {
            el = createStringScript(element);
        }

        var isLoaded = false;
        el.onload = function () {
            if (!isLoaded ) {
                isLoaded = true;
                el.onload = null;
                if (onload) {
                    onload.call(el);
                }
            }
        };

        appendToHead(el);
    }
}