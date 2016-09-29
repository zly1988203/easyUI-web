(function ($) {
    $.fn.radiogroup = function (options, param) {
        if (typeof options == "string") {
            switch (options) {
                case "getChecked":
                    var jqChecked = $(this).find("input:checked");
                    if (jqChecked.length > 0)
                        return $(jqChecked[0]).val();
                case "setChecked":
                    $(this).find("input[value='" + param + "']").prop("checked", true);
                    break;
                case "disable":
                    if (!param) {
                        var radios = $(this).find("input[type='radio']");
                        radios.each(function () {
                            $(this).prop('disabled', true);
                        });
                    } else {
                        var radio = $(this).find("input[type='radio'][value='" + param + "']");
                        radio.prop("disabled", true);
                    }
                    break;
                case "enable":
                    if (!param) {
                        var radios = $(this).find("input[type='radio']");
                        radios.each(function () {
                            $(this).prop('disabled', false);
                        });
                    } else {
                        var radio = $(this).find("input[type='radio'][value='" + param + "']");
                        radio.prop("disabled", false);
                    }
                    break;
            }
            return;
        }

        if (options) {
            if (!options.items || !$.isArray(options.items)) return;
            $(this).empty();
            var name = $.now();
            var that = this;
            $.each(options.items, function (index, el) {
                var jq = $("<input type='radio' style='vertical-align: middle;' id='radio-" + name + '-' + index + "'>");
                jq.appendTo(that);
                jq.attr('name', name);
                jq.val(el.value);
                jq.change(function () {
                    if ($("input[name='" + name + "']:checked").val() == $(this).val()) {
                        if (options.onCheckedOptionChanged && $.isFunction(options.onCheckedOptionChanged)) {
                            options.onCheckedOptionChanged(jq.val());
                        }
                    }
                }); //处理选中事件

                $("<label style='vertical-align: middle' for='radio-" + name + '-' + index + "'>" + el.text + "</label>").insertAfter(jq[0]);

                if (options.initCheckedItemValue) {
                    if (el.value === options.initCheckedItemValue) {
                        jq.attr("checked", "checked");
                    }
                }
            });
        }
    };

    $.fn.checkboxgroup = function (options, param) {
        if (typeof options == "string") {
            switch (options) {
                case "getChecked":
                    var jqChecked = $(this).find("input:checked");
                    var checked = "";
                    for (var i = 0; i < jqChecked.length; i++) {
                        var value = $(jqChecked[i]).val();
                        checked = checked + value + ",";
                    }

                    return checked.substr(0, checked.length - 1);

                case "setChecked":
                    if (!param) return;
                    var arr = param.split(",");
                    if (arr && $.isArray(arr)) {
                        var vStr = "";
                        for (var i = 0; i < arr.length; i++) {
                            vStr = vStr + "[value='" + arr[i] + "'],";
                        }

                        vStr = vStr.substr(0, vStr.length - 1);
                        $(this).find("input" + vStr).prop("checked", true);
                    }
                    break;
                case "unCheckAll":
                    $(this).find("input").prop("checked", false);
                    break;
            }
            return;
        }

        if (options) {
            if (!options.items || !$.isArray(options.items)) return;
            $(this).empty();
            var name = $.now();
            var that = this;
            $.each(options.items, function (index, el) {
                //var jq = $("<input type='checkbox'>");
                var jq = $("<input type='checkbox' style='vertical-align: middle;' id='checkbox-" + name + '-' + index + "'>");
                jq.appendTo(that);
                jq.attr('name', name);
                jq.val(el.value);
                jq.change(function () {
                    if ($(this).prop("checked") == true) {
                        if (options.onItemCheck && $.isFunction(options.onItemCheck)) {
                            options.onItemCheck($(this).val());
                        }
                    } else {
                        if (options.onItemUncheck && $.isFunction(options.onItemUncheck)) {
                            options.onItemUncheck($(this).val());
                        }
                    }
                }); 


                //$("<span>" + el.text + "</span>").insertAfter(jq[0]);
                $("<label style='vertical-align: middle' for='checkbox-" + name + '-' + index + "'>" + el.text + "</label>").insertAfter(jq[0]);

                if (options.initCheckedItemValues && $.isArray(options.initCheckedItemValues)) {
                    $.each(options.initCheckedItemValues, function (index, value) {
                        if (el.value === value) {
                            jq.attr("checked", "checked");
                        }
                    });

                }
            });
        }
    };

    $.fn.colssetting = function (options, param) {
        var data = options.data;
        var editIndex = undefined;

        function init(target) {
            var colsSetting = $.data(target, 'colsSetting');
            var options = colsSetting.options;

            function mergeCols(defaultCols, customCols) {
                var rows = [];
                if ($.isArray(defaultCols) && $.isArray(customCols)) {
                    $.each(defaultCols, function () {                        
                        var row = { };
                        var that = this;
                        $.each(customCols, function () {
                            if (this.field == that.field) {                               
                                row.print = !this.hidden,
                                row.title = that.title;
                                row.customTitle = this.title;
                                row.field = that.field;
                                rows.push(row);
                                return false;
                            }
                        });
                    });
                }
                return rows;
            }
            function initContent(jqContent) {

                function loadDefaultCols(customColumns) {
                    var url = $.helper.getSiteRootPath() + "/api/GridCommon/LoadAllDefaultGridColumns";
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: { flag: options.gridFlag, sheetType: options.sheetType },
                        dataType: 'json',
                        async: false,
                        success: function (data) {
                            if (data.success) {
                                var cols = data.columns;
                                var rows = mergeCols(cols, customColumns);
                                $(options.grid).datagrid('loadData', rows);
                                options.defaultCols = cols;
                            } else {

                            }
                        },
                        error: function () {

                        }
                    });
                }

                function setFontSize(fontSize) {
                    var pnl = $(options.targetGrid).datagrid("getPanel");
                    pnl.find('.datagrid-header .datagrid-cell span').css('font-size', fontSize);                    
                }

                var dgId = 'dg_' + $.now().toString();
                var okId = 'ok_' + $.now().toString();
                var cancelId = 'cancel_' + $.now().toString();
                var defaultId = "default_" + $.now().toString();
                var cmbFontSize = "cmbFontS_" + $.now().toString();
                jqContent.layout({ fit: true });
                jqContent.layout('add', {
                    region: 'center',
                    width: '60%',
                    content: "<div id='" + dgId + "'></div>"
                }).layout('add', {
                    region: 'south',
                    height: 40,
                    content: '<div style="min-height: 25px;margin-bottom:5px;"><a style="float:left;margin-top:8px;margin-left:5px" id="' + defaultId
                        + '"/><a style="float:right;margin-top:8px;margin-right:5px;" id="' + cancelId
                        + '"><a style="float:right;margin-top:8px;margin-right:5px;" id="' + okId
                        + '"/><div style="display:inline;float:right;margin-top:8px;margin-right:20px;"><span>明细字号：</span><input id="' + cmbFontSize
                        + '"/></div></div>'
                });               
                jqGrid = jqContent.find('#' + dgId); 
                
                jqGrid.datagrid({
                    fit: true,
                    fitColumns: true,
                    columns: [[{
                        field: 'print',
                        title: '打印',                        
                        formatter: function (value, row, index) {
                            return '<input type="checkbox" rowIndex="' + index + '"' + (value == true ? ' checked="checked">' : '>');
                        }
                    }, {
                        field: 'title', title: '默认文本', width: '40%',
                    }, {
                        field: 'customTitle', title: '自定义文本', width: '40%', editor: {
                            type: 'textbox', options: {
                                onChange: function (newValue, oldValue) {
                                    var t = $(this);
                                    if (newValue.length > 20) {
                                        t.textbox('setValue', newValue.substring(0, 20));
                                    }
                                }
                            }
                        }
                    }]],
                    width: '100%',
                    selectOnCheck: false,
                    checkOnSelect: false,
                    singleSelect: true,
                    onClickRow: function (index, row) {
                        if (editIndex != index) {
                            if (editIndex != undefined) {
                                jqGrid.datagrid("endEdit", editIndex);
                            }
                            jqGrid.datagrid("beginEdit", index).datagrid("selectRow", index);
                            editIndex = index;
                        } 
                    },
                    onLoadSuccess: function () {
                        jqGrid.grid('getPanel').find('.datagrid-body input[type="checkbox"]').click(t_click);
                    }
                });
                options.grid = jqGrid;
                if (options.targetGrid) {
                    var grid = $(options.targetGrid);
                    var columns = grid.datagrid('options').columns[0];
                    var rows = [];
                    if (options.defaultCols) {
                        rows = mergeCols(options.defaultCols, columns);
                        jqGrid.grid('loadData', rows);
                    } else {
                        loadDefaultCols(columns);
                    }
                }

                //初始化按钮
                jqContent.find('#' + defaultId).linkbutton({
                    width: 70,
                    height: 24,
                    text: '还原默认',
                    onClick: function () {
                        if (!gVar.detailColumns) return;
                        var url = $.helper.getSiteRootPath() + "/api/" + options.sheetType + "/LoadDefaultPrintGridColumns";
                        $.helper.post(url, { templateCode: gVar.page }, function (result) {
                            var defCols = result.columns;
                            $.each(defCols, function () {
                                var that = this;
                                $.each(gVar.detailColumns, function () {
                                    if (this.field == that.field) {
                                        this.hidden = that.hidden;
                                        this.width = that.width;
                                        this.title = that.title;
                                        this.orderIndex = that.orderIndex;
                                        return false;
                                    }
                                });
                            });

                            var displayColumns = gVar.detailColumns.concat([]);
                            $.each(displayColumns, function () { this.formatter = undefined; });
                            $(options.targetGrid).datagrid({ columns: [displayColumns] });                           
                            var dlg = options.dlg;
                            if (dlg) {
                                dlg.hide();
                            }
                        });                       
                    }
                });
                jqContent.find('#' + cmbFontSize).combobox({
                    valueField: 'value',
                    textField: 'text',
                    data: fontData,
                    width: 60,
                    panelHeight: 'auto',
                    editable: false
                });
                jqContent.find('#' + okId).linkbutton({
                    width: 70,
                    height: 24,
                    text: '确定',
                    onClick: function () {
                        if (editIndex != undefined) {
                            jqGrid.datagrid("endEdit", editIndex);
                        }
                        var rs = jqGrid.datagrid("getRows");
                        if (!gVar.detailColumns) return;
                        $.each(rs, function () {
                            var that = this;
                            $.each(gVar.detailColumns, function () {
                                if (this.field == that.field) {
                                    this.hidden = !that.print;
                                    this.title = that.customTitle;
                                    return false;
                                }
                            });                           
                        });                      

                        var displayColumns = gVar.detailColumns.concat([]);
                        $.each(displayColumns, function () { this.formatter = undefined; });
                        $(options.targetGrid).datagrid({ columns: [displayColumns] });

                        //保存明细字号信息
                        var fs = jqContent.find('#' + cmbFontSize).combobox('getValue');
                        var setting = JSON.parse(gVar.templateData.templateSettings);
                        setting.detailSetting.fontSize = fs;
                        gVar.templateData.setting = JSON.stringify(setting);
                        setFontSize(fs)                       

                        var dlg = options.dlg;
                        if (dlg) {
                            dlg.hide();
                        }
                    }
                });
                jqContent.find('#' + cancelId).linkbutton({
                    width: 70,
                    height: 24,
                    text: '取消',
                    onClick: function () {
                        var dlg = options.dlg;
                        if (dlg) {
                            dlg.hide();
                        }
                    }
                });

                //初始化明细字号
                var detSetting = JSON.parse(gVar.templateData.templateSettings).detailSetting;
                jqContent.find('#' + cmbFontSize).combobox("select", detSetting.fontSize);
            }

            var title = options.title || "" + '明细设置';
            var dialogW = options.width || 450;
            var dialogH = options.height || 400;
            var dlg = $.helper.modalDialog(title, dialogW, dialogH, true, initContent);
            options.dlg = dlg;
        }

        if (typeof options == 'string') {
            return $.fn.colssetting.methods[options](this, param);
        }
        $.fn.colssetting.methods = {
            saveSetting: function (jq, param) {
                return _saveSetting(jq[0], param);
            },
            cancelSetting: function (jq, param) {
                return _cancelSetting(jq[0], param);
            },
            loadDefaultSetting: function (jq, param) {
                return _loadDefaultSetting(jq[0], param);
            }
        };

        function t_click(e) {
            var target = this;
            var rowIndex = parseInt($(target).attr("rowIndex"));
            var r = jqGrid.datagrid('getRows')[rowIndex];
            if ($(target).prop('checked') == true) {
                r.print = true;
            } else {
                r.print = false;
            }
        }
        function _saveSetting(target, param) {
            var options = $.data(target, 'colsSetting').options;
            var targetGrid = options.targetGrid;
            var curGrid = options.grid;
            var cols = $(targetGrid).grid('options').columns[0];
            var rows = curGrid.grid('acceptChanges').grid('getGridRows');
            $.each(rows, function () {
                var that = this;
                $.each(cols, function () {
                    if (that.field == this.field) {
                        this.title = that.customTitle;
                        $(targetGrid).grid('updateGridFieldTitle', { field: this.field, title: this.title });
                        if (!that.display) {
                            $(targetGrid).grid('hideColumn', this.field);
                        } else {
                            $(targetGrid).grid('showColumn', this.field);
                        }
                        this.hidden = !that.display;
                        this.isPrint = that.print == true ? '1' : '0';

                        return false;
                    }
                });
            });
            $(targetGrid).grid('saveConfig');
            options.dlg.hide();
        }
        function _cancelSetting(target, param) {
            var options = $.data(target, 'colsSetting').options;
            options.dlg.hide();
        }
        function _loadDefaultSetting(target, param) {
            var options = $.data(target, 'colsSetting').options;
            var targetGrid = options.targetGrid;
            $(targetGrid).grid('loadDefaultConfig');
            options.dlg.hide();
        }
        var opts = options || {};
        return this.each(function () {
            var state = $.data(this, 'colsSetting');
            if (state) {
                $.extend(state.options, opts)
            } else {
                $.data(this, 'colsSetting', { options: $.extend({}, opts) });

            }
            init(this);
            $.data(this, 'colsSetting').options.dlg.show();
        });
    }

    //打印模板名称输入窗口
    $.inputDesignTemplateName = function (options) {
        function init(jqContent) {
            var btnOK = 'btnOK_' + $.now().toString();
            var btnCancel = "btnCancel_" + $.now().toString();

            var divName = $('<div style="text-align:center;margin-top:10px;"><span>模板名称：</span><input id="txtName" type="text" /></div>').appendTo(jqContent);
            txtName = divName.find('#txtName');
            txtName.textbox({ width: 180, height: 26 });

            var buttons = $('<div style="text-align:center;margin-top:25px;"><a href="#" class="c5" style="margin-right:10px;" id="' + btnOK + '"></a><a href="#" class="c2" style="margin-right:10px;" id="' + btnCancel + '"></a></div>').appendTo(jqContent);

            buttons.find("#" + btnOK).linkbutton({
                width: 80,
                text: '确认',
                height: 26,
                onClick: okCallback
            });

            buttons.find("#" + btnCancel).linkbutton({
                width: 80,
                text: '取消',
                height: 26,
                onClick: function () {
                    dlg.hide();
                }
            });            
        }

        function okCallback() {
            var tempName = txtName.textbox('getValue');
            tempName = $.trim(tempName);
            if ($.trim(tempName) == '') {
                $.helper.infoAlert("模板名称不能为空！", function () {
                    txtName.textbox('textbox').focus();
                });
                return;
            }
            if ($.trim(tempName) == '默认模板') {
                $.helper.infoAlert("模板名称不能为【默认模板】！", function () {
                    txtName.textbox('textbox').focus().select();
                });
                return;
            }

            if (options.okCallback && $.isFunction(options.okCallback)) {
                options.okCallback(tempName);
            }
            dlg.hide();
        }

        var modalWidth = options.width || 300;
        var modalHeight = options.height || 140;
        var modalTitle = options.title || "模板名称输入";
        var txtName = undefined;        
        var dlg = $.helper.modalDialog(modalTitle, modalWidth, modalHeight, true, init);        
        dlg.show();
        txtName.textbox("textbox").focus();
    }

    //打印纸张名称输入窗口
    $.inputPrintPaperName = function (options) {
        function init(jqContent) {
            var btnOK = 'btnOK_' + $.now().toString();
            var btnCancel = "btnCancel_" + $.now().toString();

            var divName = $('<div style="text-align:center;margin-top:10px;"><span>规格名称：</span><input id="txtName" type="text" /></div>').appendTo(jqContent);
            txtName = divName.find('#txtName');
            txtName.textbox({ width: 180, height: 26 });

            var buttons = $('<div style="text-align:center;margin-top:25px;"><a href="#" class="c5" style="margin-right:10px;" id="' + btnOK + '"></a><a href="#" class="c2" style="margin-right:10px;" id="' + btnCancel + '"></a></div>').appendTo(jqContent);

            buttons.find("#" + btnOK).linkbutton({
                width: 80,
                text: '确认',
                height: 26,
                onClick: okCallback
            });

            buttons.find("#" + btnCancel).linkbutton({
                width: 80,
                text: '取消',
                height: 26,
                onClick: function () {
                    dlg.hide();
                }
            });
        }

        function okCallback() {
            var tempName = txtName.textbox('getValue');
            tempName = $.trim(tempName);
            if ($.trim(tempName) == '') {
                $.helper.infoAlert("规格名称不能为空！", function () {
                    txtName.textbox('textbox').focus();
                });
                return;
            }           

            if (options.okCallback && $.isFunction(options.okCallback)) {
                options.okCallback(tempName);
            }
            dlg.hide();
        }

        var modalWidth = options.width || 300;
        var modalHeight = options.height || 140;
        var modalTitle = options.title || "规格名称输入";
        var txtName = undefined;
        var dlg = $.helper.modalDialog(modalTitle, modalWidth, modalHeight, true, init);
        dlg.show();
        txtName.textbox("textbox").focus();
    }
})(jQuery);