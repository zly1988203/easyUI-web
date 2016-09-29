(function ($) {
    $.extend({ helper: {} });
    $.extend($.helper, {
        post: function (url, data, success, error, async) {
            var isAsync = true;
            if (async != undefined)
                isAsync = isAsync && async;

            $.ajax({
                url: url,
                dataType: "json",
                type: "POST",
                async: isAsync,
                data: data,
                success: function (result) {
                    if (!result) return;

                    if (success && $.isFunction(success)) {
                        success(result);
                    }
                },
                error: function (result) {
                    if (!result) return;
                    if (error && $.isFunction(error)) {
                        error(result);
                        return;
                    }

                    $.helper.infoAlert("操作异常！url:" + url);
                }
            });
        },
        infoAlert: function (msg, callback) {
            $.messager.alert({ title: "消息", msg: msg, icon: "info", fn: callback });
        },
        errorAlert: function (msg, callback) {
            $.messager.alert("错误", msg, "error", callback);
        },
        warningAlert: function (msg, callback) {
            $.messager.alert("警告", msg, "warning", callback);
        },
        questionAlert: function (msg, callback) {
            $.messager.alert("问题", msg, "question", callback);
        },
        confirm: function (msg, callback) {
            $.messager.confirm("操作提示", '<div  style="word-wrap:break-word;word-break:normal;float: left;width: 220px;">' + msg + '</div>', callback);
        },
        modalDialog: function (title, width, height, closable, contentInit, showButtons, okCallback, cancelCallback, url) {
            function modalDialog(title, width, height, closable, contentInit, showButtons, okCallback, cancelCallback, url) {
                var dlg = $("<div ><div id='content'></div></div>");
                if (closable == undefined) closable = true;
                if (showButtons == undefined) showButtons = false;
                height = height || 300;
                width = width || 400;
                title = title || "Modal Dialog";



                var opts =
                {
                    title: title,
                    width: width,
                    height: height,
                    closable: closable,
                    href: url,
                    cache: false,
                    border: false,
                    modal: true,
                    style: { 'border-radius': '5px', 'padding': '0px', 'background-color': '#F4F4F4' },
                    onClose: function () { dlg.dialog('destroy', true); },
                    onDestroy: function () {
                        $('.window-shadow').remove();
                        $('.window-mask').remove();
                    }
                };

                if (showButtons) {
                    opts.buttons = [{
                        text: '&nbsp;&nbsp;确&nbsp;&nbsp;认&nbsp;&nbsp;',
                        //iconCls: 'icon-ok',
                        handler: function () {
                            if (okCallback && $.isFunction(okCallback)) {
                                okCallback();
                            }
                            dlg.dialog('close');
                        }
                    }, {
                        text: '&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;',
                        //iconCls: 'icon-cancel',
                        handler: function () {
                            if (cancelCallback && $.isFunction(cancelCallback)) {
                                cancelCallback();
                            }
                            dlg.dialog('close');
                        }
                    }];
                }

                dlg.dialog(opts);
                var panel = dlg.dialog('panel');
                var width = panel.width();
                dlg.dialog('header').addClass('panel-title-ex').find('.panel-tool').css({ 'right': '15px', 'margin-top': '-8px' });
                dlg.dialog('body').css({ 'border': '0px' }).dialog('resize', { width: width + 3 });
                if (showButtons) {
                    var btns = panel.find('.dialog-button>a');
                    if (btns) {
                        btns.css({ 'color': '#fff' });
                        btns.eq(0).addClass('c5');
                        btns.eq(1).addClass('c2');
                    }
                }
                panel.parent().find('.window-mask').css({ 'background-color': 'gray' }).end().find('.window-shadow').addClass('window-shadow-ex');
                if (contentInit && $.isFunction(contentInit)) {
                    contentInit(dlg.find('#content'));
                }
                return dlg;
            }

            var dialog = modalDialog(title, width, height, closable, contentInit, showButtons, okCallback, cancelCallback, url);

            this.show = function () {
                dialog.dialog('center').dialog('open');
            };
            this.hide = function () {
                dialog.dialog('close');
            };

            return this;
        },

        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars[name];
        },
        getSiteRootPath: function () {
            var strFullPath = window.document.location.href;
            var strPath = window.document.location.pathname;
            var pos = strFullPath.indexOf(strPath);
            var prePath = strFullPath.substring(0, pos);
            if (!isDebug) {
                var vDivPos = strPath.indexOf('/', 2);
                var vDiv = strPath.substring(0, vDivPos);
                prePath += vDiv;
            }
            return prePath;
        },

        //设置缓存
        setCache: function (key, value) {
            localStorage.setItem(key, value);
        },
        //获取指定缓存数据
        getCache: function (key) {
            return localStorage.getItem(key);
        },
        //删除指定缓存数据
        removeCache: function (key) {
            localStorage.removeItem(key);
        },
        //清除缓存
        clearCache: function () {
            localStorage.clear();
        },

        getSize_pt: function (unit, size) {
            if (!size) return null;
            var w = size.width;
            var h = size.height;
            if (unit == "mm") {
                w = (w * 72) / 25.4;
                h = (h * 72) / 25.4;
            }
            else if(unit == "in") {
                w = w * 72;
                h = h * 72;
            }

            return { width: w, height: h };
        },

        getMargin_pt: function (unit, margin) {
            if (!margin) return null;
            var left = margin.left;
            var top = margin.top;
            var right = margin.right;
            var bottom = margin.bottom;

            if (unit == "mm") {
                left = (left * 72) / 25.4;
                top = (top * 72) / 25.4;
                right = (right * 72) / 25.4;
                bottom = (bottom * 72) / 25.4;
            }
            else if (unit == "in") {
                left = left * 72;
                top = top * 72;
                right = right * 72;
                bottom = bottom * 72;
            }

            return { left: left, top: top, right: right, bottom: bottom };
        },

        getScreenSize: function (unit, size) {
            if (!size) return null;
            var sDpi = $.helper.getScreenDPI();
            var inSize = {};

            if (sDpi) {
                var xsDpi = sDpi.x;
                var ysDpi = sDpi.y;
                if (unit == 'mm') {
                    inSize.width = size.width / 25.4;
                    inSize.height = size.height / 25.4;
                }
                var width = inSize.width * xsDpi;
                var height = inSize.height * ysDpi;
                return { width: width, height: height };
            }

            return null;
        },

        getScreenMargin: function (unit, margin) {
            if (!margin) return null;
            var sDpi = $.helper.getScreenDPI();
            var inMargin = {};
            if (sDpi) {
                var xsDpi = sDpi.x;
                var ysDpi = sDpi.y;
                if (unit == 'mm') {
                    inMargin.left = margin.left / 25.4;
                    inMargin.top = margin.top / 25.4;
                    inMargin.right = margin.right / 25.4;
                    inMargin.bottom = margin.bottom / 25.4;
                }
                var left = inMargin.left * xsDpi;
                var top = inMargin.top * ysDpi;
                var right = inMargin.right * xsDpi;
                var bottom = inMargin.bottom * ysDpi;
                return { left: left, top: top, right: right, bottom: bottom };
            }
            return null;
        },

        //获取屏幕DPI
        getScreenDPI: function () {
            var dpi = { x: 96, y: 96 };
            if (window.screen.deviceXDPI) {
                dpi.x = window.screen.deviceXDPI;
                dpi.y = window.screen.deviceYDPI;
            }
            else {
                var tmpDiv = $("<div></div>").appendTo(document.body);
                tmpDiv.css({ width: "1in", height: "1in", position: "absolute", left: "0px", top: "0px", visibility: "hidden" });
                tmpDiv.css("z-index", "99");

                dpi.x = tmpDiv.width();
                dpi.y = tmpDiv.height();
                tmpDiv.remove();
            }
            return dpi;
        },

        ///在父窗体打开当前链接的tab页
        //linkHref:tab页面链接；
        //tabTit;tab页面的标题； 
        //tabId:tab页标识,用于识别是否为同一个tab(可空)；
        //tabType：tab类型，可空；
        openTabInParentWnd: function (linkHref, tabTit, tabId, tabType) {
            var parentDoc = $(window.parent.document);
            if (!tabId || tabId.length == 0) {
                tabId = (new Date).getTime().toString() + Math.round(Math.random() * 100);
            }
            var tab_active = $(window.parent.document).find('a.sisc_tab_link_item[tabId="' + $.trim(tabId) + '"]');
            if (tab_active && tab_active.length > 0) {
                //激活
                var Content_active = $(window.parent.document).find('div.sisc_tab_content_item[tabId="' + $.trim(tabId) + '"]');
                var thatli = tab_active.parent();
                if (Content_active && Content_active.length > 0) {
                    parentDoc.find('div.sisc_tab_content_item').css('display', 'none');
                    Content_active.css('display', 'block');
                    thatli.siblings().removeClass('l_selected');
                    thatli.addClass('l_selected');
                }
            } else {
                //新增
                var canCreate = $(window.parent.document).find('div.sisc_tab_link ul').children('li').length < 9;
                if (canCreate) {
                    var tabLinkHtm = '<li class="l_selected">' +
                    '<a class="sisc_tab_link_item" tabid="' + tabId + '" ';
                    if (tabType && tabType.length > 0) {
                        tabLinkHtm += ' data-type="' + tabType + '"';
                    }
                    tabLinkHtm += '>' + tabTit +
                    '</a><a class="sisc_tab_link_item_close"><i class="icon-remove"></i></a>' +
                    '</li>';

                    //var tabContentHtm = '<div class="sisc_tab_content_item" tabid="' + tabId + '" style="height: 100%;">' +
                    //'<iframe frameborder="0" src="' + linkHref.replace('~', '') + '"></iframe>' +
                    //'</div>';

                    var tabContentHtm = $('<div class="sisc_tab_content_item" tabid="' + tabId + '" style="height: 100%;"></div>');
                    if (typeof linkHref == 'string') {
                        var iframeStr = '<iframe frameborder="0" src="' + linkHref.replace('~', '') + '"></iframe>';
                        tabContentHtm.html(iframeStr);
                    } else {
                        var sourceDoc = linkHref[0].contentWindow.document;
                        var frame = $('<iframe  frameborder="0"></iframe>').appendTo(tabContentHtm);
                        var html = $('<html></html>').appendTo(frame);
                        html[0].innerHTML = sourceDoc.childNodes[0].innerHTML;
                        frame[0].srcdoc = html.outer();
                    }

                    var tabLinkContainer = parentDoc.find('div.sisc_tab_link ul');
                    var tabContentContainer = parentDoc.find('div.sisc_tab_content');
                    tabLinkContainer.children('li').removeClass('l_selected');
                    tabLinkContainer.append(tabLinkHtm);
                    tabContentContainer.children('div:visible').css('display', 'none');
                    tabContentContainer.append(tabContentHtm);
                } else {
                    alert('您打开的窗口太多了，请关闭不用的窗口');
                }
            }
        },

        ///动态添加样式
        loadStyleString: function (css) {
            var style = document.createElement("style");
            style.type = "text/css";
            try {
                style.appendChild(document.createTextNode(css));
            } catch (ex) {
                style.styleSheet.cssText = css;
            }

            var head = document.getElementsByTagName("head")[0];
            head.appendChild(style);
        }
    });

    if (navigator.appName == "Microsoft Internet Explorer") {
        window.history.forward(1);
    }
    else {
        window.history.forward(-1);
    }

    $(document).bind('keydown', function (e) {
        if (e.keyCode == '8') {
            if (e.target.tagName != 'INPUT') {
                return false;
            }
        }
    });

})(jQuery);