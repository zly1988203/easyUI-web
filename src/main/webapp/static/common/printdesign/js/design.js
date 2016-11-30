/**
 *
 * FileName: design.js
 * @Description: 打印模版设计器界面菜单操作
 * @author zhangq
 * @date 2016年6月20日
 *
 * =================================================================================================
 *     Task ID			  Date			     Author		      Description
 * ----------------+----------------+-------------------+-------------------------------------------
 *
 */

//新增模板
function createSheet() {
    gVar.templateNo = -2;
    $.inputDesignTemplateName({
        okCallback: function (tempName) {
            $("#rr #cmbTempName").combobox("setText", tempName);
            loadTemplateData(gVar.page, -1, function (temp) {
                gVar.templateData.isDefault = false;
                gVar.templateData.templateName = tempName;
                
                gVar.templateData.createUserId = undefined;
            });
        }
    });
}

//保存模板
function saveTemplate() {
    /*if (gVar.templateNo == -1) {
        $.helper.infoAlert("默认模板不允许修改！");
        return;
    }*/
    
	var data = { template: JSON.stringify(getTemplate()),detailColumns: getDetailColumns() };
    //var data = { template: getTemplate(), detailColumns: getDetailColumns() };
    
    var url = urlSavePrintTemplate;

    $.helper.post(url, data, function (result) {
        if (result.success != true) {
            $.helper.infoAlert(result.message);
            return;
        }

        gVar.templateData = result.template;
        gVar.templateNo = result.template.templateId;
        var jqCmb = $("#rr #cmbTempName");
        jqCmb.combobox("reload");
        $.helper.infoAlert("模板保存成功！");
    });

}

//另存模板
function saveAsTemplate() {
    gVar.templateNo = -2;
    $.inputDesignTemplateName({
        okCallback: function (tempName) {
            $("#rr #cmbTempName").combobox("setText", tempName);
            
            gVar.templateData.isDefault = false;
            gVar.templateData.templateName = tempName;
            gVar.templateData.createUserId = undefined;
            saveTemplate();
        }
    });
}

//删除模板
function deleteTemplate() {
    if (gVar.templateNo == -1) {
        $.helper.infoAlert("默认模板不允许删除！");
        return;
    }
    if (!gVar.templateData.createUserId) {
        $.helper.infoAlert("未保存的新增模板不允许删除！");
        return;
    }
    $.helper.confirm("确定要删除此模板吗？", function (r) {
        if (r) {
            var data = { templateId: gVar.templateData.templateId };
            $.helper.post(urlDeletePrintTemplate, data, function (result) {
                if (result.success != true) {
                    $.helper.infoAlert(result.message);
                    return;
                }

                gVar.templateNo = -1;
                $("#rr #cmbTempName").combobox("reload");
            });
        }
    });
}

//设置首选打印模板
function setTemplateDefault() {
    if (gVar.templateData.isDefault == true) {
        $.helper.infoAlert("此模板已是首选打印模板！");
        return;
    }
    if (gVar.templateNo == -2) {
        $.helper.infoAlert("请先保存模板！");
        return;
    }

    gVar.templateData.isDefault = true;
    var data = { templateCode: gVar.page, templateId: gVar.templateNo };
    $.helper.post(urlSetTemplateDefault, data, function (result) {
        if (result.success != true) {
            $.helper.infoAlert(result.message);
            return;
        }

        $.helper.infoAlert("设置首选打印模板成功！");
    });
}

//纸张大小设置
function showSetPaperDialog() {
    function init(jqContent) {

        function initSetting() {

            var paperSetting = JSON.parse(gVar.templateData.templateSettings).paperSetting;
            jqUnit.radiogroup("setChecked", paperSetting.unit);

            if (paperSetting.margin) {
                jqMarginLeft.numberbox("setValue", paperSetting.margin.left);
                jqMarginTop.numberbox("setValue", paperSetting.margin.top);
                jqMarginRight.numberbox("setValue", paperSetting.margin.right);
                jqMarginBottom.numberbox("setValue", paperSetting.margin.bottom);
            }

            if (paperSetting.layout) {
                divLayout.radiogroup("setChecked", paperSetting.layout);
            }
        }

        var fsPager = $('<fieldset  style="margin-top:15px;margin-left:25px;margin-right:25px;border:1px solid rgb(204,204,204);"></fieldset>').appendTo(jqContent);
        $("<legend>纸张设置</legend>").appendTo(fsPager);
        var unit = $("<div style='margin-left:10px;'><span style='font-size:12px;'>单位：</span></div>").appendTo(fsPager);
        jqUnit = $("<div style='display:inline;'></div>").appendTo(unit);
        jqUnit.radiogroup({
            items: [{ value: "mm", text: "公制(mm毫米)" },
                    { value: "in", text: "英制(in英寸)" }],
            initCheckedItemValue: "mm",
            onCheckedOptionChanged: function (val) {
                //转换
                var w = jqWidth.numberbox("getValue");
                var h = jqHeight.numberbox("getValue");
                var left = jqMarginLeft.numberbox("getValue");
                var right = jqMarginRight.numberbox("getValue");
                var top = jqMarginTop.numberbox("getValue");
                var bottom = jqMarginBottom.numberbox("getValue");
                if (val == "in") {
                    w = w / 25.4;
                    h = h / 25.4;
                    left = left / 25.4;
                    right = right / 25.4;
                    top = top / 25.4;
                    bottom = bottom / 25.4;
                } else {
                    w = curPaper.editable ? w * 25.4 : curPaper.size.width;
                    h = curPaper.editable ? h * 25.4 : curPaper.size.height;
                    left = left * 25.4;
                    right = right * 25.4;
                    top = top * 25.4;
                    bottom = bottom * 25.4;
                }

                jqWidth.numberbox("setValue", w);
                jqHeight.numberbox("setValue", h);
                jqMarginLeft.numberbox("setValue", left);
                jqMarginRight.numberbox("setValue", right);
                jqMarginTop.numberbox("setValue", top);
                jqMarginBottom.numberbox("setValue", bottom);
            }
        });
        var str = $("<div style='color:red;margin:5px 0px 10px 10px'>注意：请保持浏览器打印纸张的默认设置！</div>");
        str.appendTo(fsPager);
        var fsSize = $('<fieldset  style="margin-top:5px;margin-right:25px;border:none;"></fieldset>').appendTo(fsPager);
        $("<legend>规格</legend>").appendTo(fsSize);
        var pSize = $("<div style='margin-top:5px;'><span style='font-size:12px;'>纸张规格：</span></div>").appendTo(fsSize);
        var cmbPageSize = $("<input />").appendTo(pSize);
        var btnNewPaper = $("<a href='#' style='margin-left:10px;'></a>").appendTo(pSize);
        var btnSavePaper = $("<a href='#' style='margin-left:5px;'></a>").appendTo(pSize);
        var pSizeData = $("<div style='margin-top:5px;'></div>").appendTo(fsSize);
        $("<span style='font-size:12px;'>宽度(W)：</span>").appendTo(pSizeData);
        jqWidth = $("<input type='text' />").appendTo(pSizeData);
        $("<span style='margin-left:12px;font-size:12px;'>高度(H)：</span>").appendTo(pSizeData);
        jqHeight = $("<input type='text' />").appendTo(pSizeData);

        var fsMargin = $('<fieldset  style="margin-top:15px;margin-right:25px;border:none;"></fieldset>').appendTo(fsPager);
        $("<legend>页边距</legend>").appendTo(fsMargin);
        var divFirst = $("<div><span style='font-size:12px;'>左：</span></div>").appendTo(fsMargin);
        jqMarginLeft = $("<input type='text' />").appendTo(divFirst);
        $("<span style='margin-left:12px;font-size:12px;'>顶端：</span>").appendTo(divFirst);
        jqMarginTop = $("<input type='text' />").appendTo(divFirst);
        var divSecond = $("<div style='margin-top:5px;'><span style='font-size:12px;'>右：</span></div>").appendTo(fsMargin);
        jqMarginRight = $("<input type='text' />").appendTo(divSecond);
        $("<span style='margin-left:12px;font-size:12px;'>底部：</span>").appendTo(divSecond);
        jqMarginBottom = $("<input type='text' />").appendTo(divSecond);

        var fsLayout = $('<fieldset  style="margin-top:15px;margin-right:25px;border:none;"></fieldset>').appendTo(fsPager);
        $("<legend>布局</legend>").appendTo(fsLayout);
        divLayout = $("<div></div>").appendTo(fsLayout);
        divLayout.radiogroup({
            items: [
                    { value: "portrait", text: "纵向" },
                    { value: "landscape", text: "横向" }],
            initCheckedItemValue: "portrait"
        });

        var paperSetting = JSON.parse(gVar.templateData.templateSettings).paperSetting;

        cmbPageSize.combobox({
            url: urlLoadPrintPapers,
            width: 270,
            editable: false,
            valueField: "id",
            textField: "name",
            onLoadSuccess: function () {
                if (paperSetting.paper && paperSetting.paper.id) {
                    var recs = $(this).combobox("getData");
                    var id = paperSetting.paper.id;
                    var  exist = false;
                    var j;
                    for (j = 0; j < recs.length; j++) {
                        if (recs[j].id == id) {
                            exist = true;
                            break;
                        }
                    }

                    if (!exist) {
                      id = "A4";
                    }

                    $(this).combobox("select", id);
                }
            },
            onSelect: function (rec) {
                var size = rec.size;
                if (size) {
                    var unit = jqUnit.radiogroup("getChecked");
                    var w = size.width;
                    var h = size.height;
                    if (unit == "in" && rec.unit == "mm") {
                        w = w / 25.4;
                        h = h / 25.4;
                    }
                    else if (unit == "mm" && rec.unit == "in") {
                        w = w * 25.4;
                        h = h * 25.4;
                    }

                    jqWidth.numberbox("setValue", w);
                    jqHeight.numberbox("setValue", h);
                    if (rec.editable) {
                        jqWidth.numberbox("enable");
                        jqHeight.numberbox("enable");
                    } else {
                        jqWidth.numberbox("disable");
                        jqHeight.numberbox("disable");
                    }
                    curPaper = rec;
                }
            }
        });

        btnNewPaper.linkbutton({
            width: 60,
            height: 22,
            text: "新增规格",
            onClick: function () {
                $.inputPrintPaperName({
                    okCallback: function (name) {
                        cmbPageSize.combobox("setValue", name);
                        jqWidth.numberbox("enable");
                        jqHeight.numberbox("enable");
                        jqWidth.numberbox("clear");
                        jqHeight.numberbox("clear");
                        jqWidth.numberbox("textbox").focus();

                        var unit = jqUnit.radiogroup("getChecked");
                        curPaper = {
                            id: "pp_" + $.now(),
                            name: name,
                            isSYS: false,
                            editable: true,
                            size: { width: 0, height: 0 },
                            unit: unit
                        };
                    }
                });
            }
        });

        function deletePaper(id) {
            var data = { id: id };
            $.helper.post(urlDeletePrintPaper, data, function (result) {
                if (result.success != true) {
                    $.helper.infoAlert(result.message);
                    return;
                }

                cmbPageSize.combobox("reload");
            });
        }

        btnSavePaper.linkbutton({
            width: 60,
            height: 22,
            text: "删除规格",
            onClick: function () {
                if (!curPaper.editable) {
                    $.helper.infoAlert("当前纸张规格为系统预定义规格，不允许删除！");
                    return;
                }

                deletePaper(curPaper.id);
            }
        });

        jqWidth.numberbox({ precision: 4 });
        jqHeight.numberbox({ precision: 4 });
        jqMarginLeft.numberbox({ precision: 4 });
        jqMarginTop.numberbox({ precision: 4 });
        jqMarginRight.numberbox({ precision: 4 });
        jqMarginBottom.numberbox({ precision: 4 });

        jqWidth.numberbox("textbox").bind('keydown', function (e) {
            if (e.keyCode == 13) {
                jqHeight.numberbox("textbox").focus().select();
            }
        });

        jqHeight.numberbox("textbox").bind('keydown', function (e) {
            if (e.keyCode == 13) {
                jqMarginLeft.numberbox("textbox").focus().select();
            }
        });

        jqMarginLeft.numberbox("textbox").bind('keydown', function (e) {
            if (e.keyCode == 13) {
                jqMarginTop.numberbox("textbox").focus().select();
            }
        });

        jqMarginTop.numberbox("textbox").bind('keydown', function (e) {
            if (e.keyCode == 13) {
                jqMarginRight.numberbox("textbox").focus().select();
            }
        });

        jqMarginRight.numberbox("textbox").bind('keydown', function (e) {
            if (e.keyCode == 13) {
                jqMarginBottom.numberbox("textbox").focus().select();
            }
        });

        initSetting();

    }

    function okCallback() {

        function doAction() {
            var setting = JSON.parse(gVar.templateData.templateSettings);
            var paperSetting = setting.paperSetting;
            paperSetting.unit = unit;
            paperSetting.layout = layout;
            paperSetting.paper.isSYS = true;
            if (!curPaper.isSYS) {
                paperSetting.paper.isSYS = false;
            }
            var size = paperSetting.paper.size;
            size.width = width;
            size.height = height;
            paperSetting.paper.id = curPaper.id;
            paperSetting.paper.name = curPaper.name;

            paperSetting.margin.left = mLeft;
            paperSetting.margin.top = mTop;
            paperSetting.margin.right = mRight;
            paperSetting.margin.bottom = mBottom;

            gVar.templateData.templateSettings = JSON.stringify(setting);

            setPaper(paperSetting, gVar.templateData.templateType);
        }

        var unit = jqUnit.radiogroup("getChecked");
        var width = jqWidth.numberbox("getValue");
        var height = jqHeight.numberbox("getValue");
        var mLeft = jqMarginLeft.numberbox("getValue");
        var mTop = jqMarginTop.numberbox("getValue");
        var mRight = jqMarginRight.numberbox("getValue");
        var mBottom = jqMarginBottom.numberbox("getValue");
        var layout = divLayout.radiogroup("getChecked");

        curPaper.size.width = width;
        curPaper.size.height = height;
        curPaper.unit = unit;

        if (curPaper.editable) {
            savePaper(curPaper, function () {
                doAction();
            });
        } else {
            doAction();
        }
    }

    var jqUnit = undefined;
    var jqHeight = undefined;
    var jqWidth = undefined;
    var jqMarginLeft = undefined;
    var jqMarginTop = undefined;
    var jqMarginRight = undefined;
    var jqMarginBottom = undefined;
    var jqRdPrintFoot = undefined;
    var jqHeadPrintMode = undefined;
    var jqFootPrintMode = undefined;
    var curPaper = undefined;
    var divLayout = undefined;


    $.helper.modalDialog("打印纸张设置", 600, 400, true, init, true, okCallback);
}

$(function(){
	console.log(111)
	$('.icon-printPreview').trigger("click");
})
//打印预览
function printPreview() {

	//预览地址
    var url = rootPath + gVar.controller+ "/preview" + "?page=" + gVar.page + "&template=" + gVar.templateNo + "&sheetNo=" + gVar.sheetNo;
    
    console.log(url);
    var tab_id = 'prev_'+gVar.page+'_'+gVar.sheetNo;
    var tab_title = gVar.templateData.templateName;
    console.log(tab_title);
    refreshPreviewOptions();
    window.parent[tab_id] = gVar.previewOptions;
    parent.addTabPrint(tab_id,'模板【' + tab_title + '】打印预览',url,'');
}

/************帮助方法*****************/
//菜单工具栏初始化
function initToolbar() {
    /*****************菜单************************/
    var menuData = {
        selected: 0,
        tabs: [{
            groups: [
            {
                tools: [{//选择打印模版下拉框
                    type: 'toolbar',
                    tools: [{
                        type: 'combobox',
                        id: 'cmbTempName',
                        url: urlLoadPrintTemplates,
                        queryParams: { templateCode: gVar.page },
                        valueField: 'templateId',
                        textField: 'templateName',
                        width: 116,
                        onLoadSuccess: function () {
                            var jqCmb = $(this);
                            var lstRec = jqCmb.combobox("getData");
                            if (lstRec && $.isArray(lstRec)) {
                            	var rec = lstRec[0];
                                jqCmb.combobox("select", rec.templateId);
                                /*for (var i = 0; i < lstRec.length; i++) {
                                    var rec = lstRec[i];
                                    if (rec.templateId == gVar.templateNo) {
                                        jqCmb.combobox("select", rec.templateId);
                                        return;
                                    }
                                }*/
                            }
                        },
                        onSelect: function (rec) {
                            gVar.templateNo = rec.templateId;
                            gVar.templateData = rec;
                            loadTemplate(rec);
                        }
                    }]
                }, {
                    type: 'toolbar',
                    tools: [/*{
                        name: 'newNormal',
                        iconCls: 'icon-new-normal',
                        toggle: false,
                        group: 'p1'
                    },*/
                    {
                        name: 'newSheet',
                        iconCls: 'icon-new-sheet',
                        tip: "新增模板"
                    }, {
                        name: 'save',
                        iconCls: 'icon-save',
                        tip: "保存模板"
                    }, {
                        name: 'saveAs',
                        iconCls: 'icon-saveas',
                        tip: "另存模板"
                    }, {
                        name: 'delete',
                        iconCls: 'icon-delete',
                        tip: "删除模板"
                    }, {
                        name: 'setDefault',
                        iconCls: 'icon-setdefault',
                        tip: "设为首选打印模板"
                    }, {
                        name: 'printPreview',
                        iconCls: 'icon-printPreview',
                        tip: "打印预览"
                    }]
                }]
            }, {
                tools: [{
                    type: 'toolbar',
                    tools: [{
                        type: 'combobox',
                        id: 'cmbFontF',
                        valueField: 'value',
                        textField: 'text',
                        data: fontFamily,
                        width: 116,
                        panelHeight: 'auto',
                        editable: false,
                        onSelect: function (rec) {
                            $.each(gVar.selected, function () {  $(this).css("font-family", rec.value); });
                        }
                    }, {
                        type: 'combobox',
                        id: 'cmbFontS',
                        valueField: 'value',
                        textField: 'text',
                        data: fontData,
                        width: 45,
                        panelHeight: 'auto',
                        editable: false,
                        onSelect: function (rec) {
                            $.each(gVar.selected, function () { $(this).css("font-size", rec.value); });
                        }
                    }]
                }, {
                    type: 'toolbar',
                    style: { marginLeft: '5px' },
                    tools: [{
                        id: 'btnBold',
                        name: 'bold',
                        iconCls: 'icon-bold',
                        toggle: true,
                        tip: "粗体"
                    }, {
                        id: 'btnItalic',
                        name: 'italic',
                        iconCls: 'icon-italic',
                        toggle: true,
                        tip: "斜体"
                    }, {
                        name: 'deleteElement',
                        iconCls: 'icon-elementDelete',
                        tip: "删除打印项"
                    }]
                }]
            }, {
                dir: 'v',
                tools: [{
                    type: 'toolbar',
                    tools: [{
                        name: 'align-left',
                        iconCls: 'icon-aligncontrol-left',
                        tip: "左对齐"
                    }, {
                        name: 'align-right',
                        iconCls: 'icon-aligncontrol-right',
                        tip: "右对齐"
                    }, {
                        name: 'align-top',
                        iconCls: 'icon-aligncontrol-top',
                        tip: "上对齐"
                    }, {
                        name: 'align-bottom',
                        iconCls: 'icon-aligncontrol-bottom',
                        tip: "下对齐"
                    }]
                }]
            }, {
                dir: 'v',
                tools: [{
                    type: 'toolbar',
                    tools: [{
                        type: 'combobox',
                        id: 'cmbHead',
                        valueField: 'value',
                        textField: 'text',
                        data: [{ value: 'firstPage', text: '首页打印单据头', selected: true }, { value: 'perPage', text: '每页打印单据头' }],
                        width: 116,
                        onSelect: function (rec) {
                            var setting = JSON.parse(gVar.templateData.templateSettings);
                            var sheetSetting = setting.sheetSetting;
                            sheetSetting.head = rec.value;
                            gVar.templateData.templateSettings = JSON.stringify(setting);
                        }
                    }, {
                        type: 'combobox',
                        id: 'cmbFoot',
                        valueField: 'value',
                        textField: 'text',
                        data: [{ value: 'lastPageByDetail', text: '尾页紧接明细打印单据尾', selected: true }, { value: 'lastPageByBottom', text: '尾页底打印单据尾' }, { value: 'perPage', text: '每页打印单据尾' }, { value: 'notPrint', text: '不打印单据尾' }],
                        width: 160,
                        onSelect: function (rec) {
                            var setting = JSON.parse(gVar.templateData.templateSettings);
                            var sheetSetting = setting.sheetSetting;
                            sheetSetting.foot = rec.value;
                            gVar.templateData.templateSettings = JSON.stringify(setting);
                        }
                    }]
                }]
            },
            {
                dir: 'v',
                tools: [{
                    type: 'toolbar',
                    tools: [{
                        name: 'pageSet',
                        iconCls: 'icon-pageset',
                        tip: "打印纸张设置"
                    }/*, {
                        name: 'columnSet',
                        iconCls: 'icon-columnset',
                        tip: "明细列表设置"
                    }*/]
                }]
            }]
        }]
    };

    var width = $(document.body).innerWidth();
    $('#rr').ribbon({
        width: width,
        data: menuData,
        onClick: function (name, target) {
            if (name == "bold") {
                if ($(target).attr("state") == "on") {
                    $.each(gVar.selected, function () { $(this).css("font-weight", ""); });
                    $(target).attr("state", "off");
                } else {
                    $.each(gVar.selected, function () { $(this).css("font-weight", "bold"); });
                    $(target).attr("state", "on");
                }
            }
            else if (name == "italic") {
                if ($(target).attr("state") == "on") {
                    $.each(gVar.selected, function () { $(this).css("font-style", ""); });
                    $(target).attr("state", "off");
                } else {
                    $.each(gVar.selected, function () { $(this).css("font-style", "italic"); });
                    $(target).attr("state", "on");
                }
            }
            else if (name == "underline") {
                if ($(target).attr("state") == "on") {
                    $.each(gVar.selected, function () { $(this).css("text-decoration", ""); });
                    $(target).attr("state", "off");
                } else {
                    $.each(gVar.selected, function () { $(this).css("text-decoration", "underline"); });
                    $(target).attr("state", "on");
                }
            }
            else if (name == "increase-font") {
                $("#t .print .drag.assigned.selected").each(function () {
                    var size = parseInt($.trim($(this).css("font-size").replace("px", "")));
                    size += 1;
                    $(this).css("font-size", size + "px");
                });
            }
            else if (name == "decrease-font") {
                $("#t .print .drag.assigned.selected").each(function () {
                    var size = parseInt($.trim($(this).css("font-size").replace("px", "")));
                    size -= 1;
                    if (size < 0) size = 0;
                    $(this).css("font-size", size + "px");
                });
            }
            else if (name == "newNormal") {
                //createNormal();
            }
            else if (name == "newSheet") {
                createSheet();
            }
            else if (name == "save") {
                saveTemplate();
            }
            else if (name == "saveAs") {
                saveAsTemplate();
            }
            else if (name == "delete") {
                deleteTemplate();
            }
            else if (name == "pageSet") {
                showSetPaperDialog();
            }
            else if (name == "sheetSet") {
                showSetSheetDialog();
            }
            else if (name == "columnSet") {
                $(this).colssetting({ gridFlag: gVar.gridFlag, sheetType: gVar.controller, targetGrid: '#dg' });
            }
            else if (name == "printPreview") {
            	console.log(222)
            	//打印预览
                printPreview();
            }
            else if (name == "setDefault") {
                setTemplateDefault();
            }
            else if (name == "deleteElement") {
                deleteSelectedElement();
            }
            else if (name == "align-left") {
                if (gVar.selected.length == 0) return;
                var first = gVar.selected[0];
                var left = $(first).css("left");
                for (var i = 1; i < gVar.selected.length; i++) {
                    $(gVar.selected[i]).css("left", left);
                }
            }
            else if (name == "align-top") {
                if (gVar.selected.length == 0) return;
                var first = gVar.selected[0];
                var top = $(first).css("top");
                for (var i = 1; i < gVar.selected.length; i++) {
                    $(gVar.selected[i]).css("top", top);
                }
            }
            else if (name == "align-bottom") {
                if (gVar.selected.length == 0) return;
                var first = gVar.selected[0];
                var firstBottom = $(first).position().top + $(first).outerHeight(true);
                for (var i = 1; i < gVar.selected.length; i++) {
                    var s = gVar.selected[i];
                    var top = firstBottom - $(s).outerHeight(true);
                    $(s).css("top", top + "px");
                }
            }
            else if (name == "align-right") {
                if (gVar.selected.length == 0) return;
                var first = gVar.selected[0];
                var firstRight = $(first).position().left + $(first).outerWidth(true);
                for (var i = 1; i < gVar.selected.length; i++) {
                    var s = gVar.selected[i];
                    var left = firstRight - $(s).outerWidth(true);
                    $(gVar.selected[i]).css("left", left + "px");
                }
            }
        }
    });
}

//模板设计用标签和占位初始化
function initDraggable(groups) {

    function createGroup(text) {
        var li = $("<li class='group'><div>" + text + "</div></li>");
        return li;
    }

    function createItem(item) {
        var li = $("<li class='item'><div class='drag " + item.type + "'>" + item.text + "</div></li>");
        return li;
    }

    if (!groups) return;
    var jqDrag = $("#t #divWest");
    var jqUL = $("<ul></ul>").appendTo(jqDrag);

    for (var i = 0; i < groups.length; i++) {
        var g = groups[i];
        var jqGroupLi = createGroup(g.group).appendTo(jqUL);
        var jqGroupUL = $("<ul></ul>").appendTo(jqGroupLi);
        var items = g.items;
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            createItem(item).appendTo(jqGroupUL);
        }
    }

    jqDrag.find("li.item div").draggable({
        revert: true,
        proxy: 'clone',
        onStartDrag: function () {
            $(this).draggable('proxy').css({'z-index': 65534,'position':'absolute'});
        },
        onDrag: function (e) {
            gVar.dragX = e.clientX;
            gVar.dragY = e.clientY;
        }
    });
}

//主区域初始化
function initMainFrame() {
    var width = $(document.body).innerWidth();
    var height = $(document.body).innerHeight();
    $("#t").layout({ width: width, height: height });
    $("#t").layout('add', {
        split: true,
        region: 'west',
        width: '15%',
        style: { overflow: 'visible' },
        content: "<div id='divWest'></div>"
    });
    $("#t").layout('add', {
        region: 'center',
        width: '85%',
        content: "<div class='container' style='position: relative;overflow:auto;background-color:gray;height:100%;width:100%;'></div>"
    });

    //绑定键盘按键事件
    $(document).bind('keydown', function (e) {
        if (e.keyCode == '46') { //Delete
            deleteSelectedElement();
        }
        else if (e.keyCode == "37") { //左移
            e.preventDefault();
            $.each(gVar.selected, function () {
                var pos = $(this).position();
                var left = pos.left - 1 < 0 ? 0 : pos.left - 1;
                $(this).css("left", left);
            });
        }
        else if (e.keyCode == "39") { //右移
            e.preventDefault();
            $.each(gVar.selected, function () {
                var pos = $(this).position();
                var left = pos.left + 1;
                if (left + $(this).outerWidth(true) > $(this).parent().width()) {
                    left = $(this).parent().width() - $(this).outerWidth(true);
                }
                $(this).css("left", pos.left + 1);
            });
        }
        else if (e.keyCode == "38") { //上移
            e.preventDefault();
            $.each(gVar.selected, function () {
                var pos = $(this).position();
                var top = pos.top - 1 < 0 ? 0 : pos.top - 1;
                $(this).css("top", top);
            });
        }
        else if (e.keyCode == "40") { //下移
            e.preventDefault();
            $.each(gVar.selected, function () {
                var pos = $(this).position();
                var top = pos.top + 1;
                if (top + $(this).outerHeight(true) > $(this).parent().height()) {
                    top = $(this).parent().height() - $(this).outerHeight(true);
                }
                $(this).css("top", pos.top + 1);
            });
        }
    });
}

//可放置标签、占位组件区域初始化
function initDroppable(templateType) {
    var jqWork = $("#t .work");

    var jqDrop = jqWork;
    if (templateType == TEMP_TYPES.sheet) {
        jqDrop = jqWork.find(".head,.foot");
    }

    jqDrop.droppable({
        accept: '.drag',
        onDragEnter: function () {
            $(this).addClass('over');
        },
        onDragLeave: function () {
            $(this).removeClass('over');
        },
        onDrop: function (e, source) {
            $(this).removeClass('over');
            if ($(source).hasClass("assigned")) return;

            var div = $(source).clone().addClass("assigned");
            div.appendTo(this);
            var proxyPos = { top: gVar.dragY, left: gVar.dragX };
            var printPos = $('#t').layout('panel', 'center').find('div.print').position();
            var workPos = $('#t').layout('panel', 'center').find('div.work');
            var left1 = printPos.left + workPos.position().left + $('#t').layout('panel', 'west').parent().outerWidth() + 8;
            var top1 = 0;
            if ($(this).hasClass('head')) {
                top1 = workPos.position().top - $('.container').scrollTop() + $('#rr').height() + 8;
            }
            if ($(this).hasClass('foot')) {
                top1 = workPos.position().top + workPos.layout('panel', 'south').parent().position().top - $('.container').scrollTop() + $('#rr').height() + 12;
            }
            div.css({ position: "absolute", top: (proxyPos.top - top1) + 'px', left: (proxyPos.left - left1) + 'px' });
            div.css("font-size", "10pt");
            //特别处理审核状态
            if (div.hasClass(".holder") && div.html() == "_审核状态") {
                div.addClass("borderable");
            }
            bindDropElementEvent(div);
        }
    });
}

//事件绑定
function bindEvent() {
    function setToolbarDefault() {
        $('#rr #cmbFontS').combobox('setValue', '12pt');
        $('#rr #cmbFontF').combobox('setValue', 'Simsun');
        offToggleBtn("btnBold");
        offToggleBtn("btnItalic");
    }

    //绑定去选中状态
    $("#t .work").click(function (e) {
        var cur = e.target;
        if (e.ctrlKey) return;
        $.each(gVar.selected, function () {
            if (this != cur) {
                $(this).removeClass("selected");
                var inx = $.inArray(this, gVar.selected);
                if (inx > -1) {
                    gVar.selected.splice(inx, 1);
                }
            }
        });

        if (!gVar.selected.length) setToolbarDefault();
    });

    $("#t .work .selected").each(function () {
        bindDropElementEvent(this);
    });
}

//选中开关式按钮
function onToggleBtn(id) {
    var jq = $("#rr #" + id);
    jq.linkbutton("select");
    jq.attr("state", "on");
}

//反选开关式按钮
function offToggleBtn(id) {
    var jq = $("#rr #" + id);
    jq.linkbutton("unselect");
    jq.attr("state", "off");
}

//Drop组件事件绑定
function bindDropElementEvent(target) {
    function associateToolbar(jq) {
        //关联字号
        var style = jq.attr('style');
        var start = style.indexOf("font-size:") + 10;
        var end = style.indexOf('pt', start) + 2;
        var fontS = $.trim(style.slice(start,end));

        if (!fontS || fontS == '') {
            fontS = '10pt';
        }

        $('#rr #cmbFontS').combobox('setValue', fontS);

        //关联字体
        var fontF = jq.css("font-family");
        if (!fontF || fontF == '') {
            fontF = 'Simsun';
        }

        $('#rr #cmbFontF').combobox('setValue', fontF);

        //关联粗体
        if (jq.css("font-weight") == "bold") {
            onToggleBtn("btnBold");
        }
        else {
            offToggleBtn("btnBold");
        }
        //关联斜体
        if (jq.css("font-style") == "italic") {
            onToggleBtn("btnItalic");
        }
        else {
            offToggleBtn("btnItalic");
        }
    }

    var t = $(target);
    t.draggable({
        revert: false,
        cursor: 'pointer',
        edge: 5,

        onDrag: function (e) {
            var d = e.data;
            if (d.left < 0) { d.left = 0 }
            if (d.top < 0) { d.top = 0 }
            if (d.left + $(d.target).outerWidth() > $(d.parent).width()) {
                d.left = $(d.parent).width() - $(d.target).outerWidth();
            }
            if (d.top + $(d.target).outerHeight() > $(d.parent).height()) {
                d.top = $(d.parent).height() - $(d.target).outerHeight();
            }
        }
    });
    t.resizable({ handles: 'e,w' });
    t.click(function (e) {
        t.addClass("selected");
        associateToolbar(t);
        if ($.inArray(this, gVar.selected) > -1) return;
        gVar.selected.push(this);
    });

    //特别处理自定义标签
    if (t.hasClass("label") && t.html() == "自定义标签") {
        t.dblclick(function (e) {
            var input = $("<input type='text' />");
            input.css("font-size", t.css("font-size"));
            var v = t.html();
            input.val(v);
            t.html("");
            input.appendTo(t);
            input.keyup(function (e) {
                if (e.keyCode === 13) {
                    t.html(input.val());
                    input.remove();
                }
            });
            input.blur(function () {
                t.html(input.val());
                input.remove();
            });
            input.focus().select();
        });
    }
}

//设置模板设计界面纸张
function setPaper(paperSetting, templateType) {
    if (!paperSetting) return;
    var unit = paperSetting.unit;
    var layout = paperSetting.layout;
    var size = paperSetting.paper.size;
    var margin = paperSetting.margin;
    var screenSize = $.helper.getScreenSize(unit, size);
    var screenMargin = $.helper.getScreenMargin(unit, margin);
    var printWidth = screenSize.width;
    var printHeight = screenSize.height;

    var jqContainer = $("#t .container");
    var jqPrint = $("#t .print");
    var jqWork = $("#t .work");
    if (layout == "landscape") {
        printWidth = screenSize.height;
        printHeight = screenSize.width;
    }
    jqPrint.outerWidth(printWidth);
    jqPrint.outerHeight(printHeight);
    jqWork.css("left", screenMargin.left);
    jqWork.css("top", screenMargin.top);

    var widthContainer = jqContainer.width();
    var heightContainer = jqContainer.height();
    var top = (heightContainer - screenSize.heigth) / 2;
    var left = (widthContainer - screenSize.width) / 2;
    if (top < 0) top = 0;
    if (left < 0) left = 0;
    jqPrint.css({
        position: "absolute",
        top: top,
        left: left
    });

    jqWork.layout("resize", { width: printWidth - screenMargin.left - screenMargin.right, height: printHeight - screenMargin.top - screenMargin.bottom - 6 });
}

//设置普通模板
function setNormalTemp(temp) {
    var jqPrint = $(temp.page);
    $("#t .container").empty();
    $("#t .container").append(jqPrint);
    jqPrint.layout();

    initDroppable(TEMP_TYPES.normal);
    bindEvent();
}

//设置单据模板
function setSheetTemp(temp) {
    var jqPrint = $(temp.page);
    $("#t .container").empty();
    $("#t .container").append(jqPrint);
    var jqWork = jqPrint.find(".work");
    jqWork.layout();

    jqWork.layout('add', {
        split: true,
        region: 'north',
        height: temp.headSize.height,
        width: temp.headSize.width,
        content: temp.head
    });
    jqWork.layout('add', {
        region: 'center',
        height: temp.detailSize.height,
        width: temp.detailSize.width,
        content: temp.detail
    });
    jqWork.layout('add', {
        split: true,
        region: 'south',
        height: temp.footSize.height,
        width: temp.footSize.width,
        content: temp.foot
    });

    initDroppable(TEMP_TYPES.sheet);
    bindEvent();
}

//获取当前模板界面数据
function getTemplate() {
    function getDisplayTemplateInfo() {
        var jqContainer = $("#t .container");
        var jqPrint = jqContainer.find(".print");
        var jqWork = jqPrint.find(".work");
        var jqHead = jqWork.find(".head");
        var jqDetail = jqWork.find(".detail");
        var jqFoot = jqWork.find(".foot");

        var info = {};
        info.headSize = { width: jqHead.parent().parent().outerWidth(true), height: jqHead.parent().parent().outerHeight(true) };
        info.detailSize = { width: jqDetail.parent().parent().outerWidth(true), height: jqDetail.parent().parent().outerHeight(true) };
        info.footSize = { width: jqFoot.parent().parent().outerWidth(true), height: jqFoot.parent().parent().outerHeight(true) };

        jqPrint = jqPrint.clone();
        jqPrint.find(".work").empty();
        info.page = $("<div></div>").append(jqPrint).html();
        info.head = $("<div></div>").append(jqHead.clone()).html();
        info.detail = $("<div></div>").append(jqDetail.clone().empty()).html();
        info.foot = $("<div></div>").append(jqFoot.clone()).html();
        return info;
    }

    function getPrintTemplateInfo() {
        var jqContainer = $("#t .container").clone();
        var jqPrint = jqContainer.find(".print");
        var jqWork = jqPrint.find(".work");
        var jqHead = jqWork.find(".head");
        var jqDetail = jqWork.find(".detail");
        jqDetail.empty();
        var jqFoot = jqWork.find(".foot");

        var headHeight = jqHead.parent().height();
        var detailHeight = jqDetail.parent().height();
        var footHeight = jqFoot.parent().height();
        jqHead.css("height", headHeight + "px");
        jqDetail.css("height", detailHeight + "px");
        jqFoot.css("height", footHeight + "px");

        var htPrint = jqPrint.outerHeight(true);
        jqPrint.css({ position: "relative", top: "0px", left: "0px", height: (htPrint - 6) + "px" });
        jqWork.css({ position: "relative" });
        jqWork.empty();
        jqWork.append(jqHead);
        jqWork.append(jqDetail);
        jqWork.append(jqFoot);

        var info = {};
        info.module = $("<div></div>").append(jqPrint).html();
        return info;
    }

    var print = getPrintTemplateInfo();
    var display = getDisplayTemplateInfo();
    var strPrint = JSON.stringify(print);
    var strDisplay = JSON.stringify(display);

    var template = gVar.templateData;
    template.templateContentPrint = JSON.stringify(print);
    template.templateContentDisplay = JSON.stringify(display);
    return template;
}

//获取模板数据
function loadTemplateData(templateCode, templateId, success) {
    var url = urlLoadPrintTemplate;
    $.helper.post(url, { templateCode: templateCode, templateId: templateId },
        function (result) {
            if (result.success != true) {
                $.helper.infoAlert(result.message);
                return;
            }

            gVar.templateData = result.template;
            loadTemplate(result.template);
            if (success && $.isFunction(success)) {
                success(result.template);
            }
        });
}

//加载模板数据到界面
function loadTemplate(temp) {
    //处理模板显示加载
    var display = JSON.parse(temp.templateContentDisplay);
    if (gVar.templateData.templateType == TEMP_TYPES.normal) {
        setNormalTemp(display);
    }
    else if (gVar.templateData.templateType == TEMP_TYPES.sheet) {
        var sheetSetting = JSON.parse(temp.templateSettings).sheetSetting;
        setUISheetSetting(sheetSetting);
        setSheetTemp(display);
        loadDetailGridColumns(gVar.page, temp.templateId, initDetailGrid);
    }

    bindEvent();

    $("#t .drag.assigned").each(function () {
        var span = $(this);
        bindDropElementEvent(span);
    });
}

//初始化明细列表
function initDetailGrid(columns) {
    function setFontSize(fontSize) {
        var pnl = dg.datagrid("getPanel");
        pnl.find('.datagrid-header .datagrid-cell span').css('font-size', fontSize);
    }

    var detailSetting = JSON.parse(gVar.templateData.templateSettings).detailSetting;
    var fs = detailSetting.fontSize;
    if (columns && columns.length > 0) {
        var displayColumns = columns.concat([]);
        $.each(displayColumns, function () { this.formatter = undefined });
        var jqDet = $("#t .work .detail");
        if (!jqDet.length) return;
        var dg = $('<div id="dg"></div>').appendTo(jqDet);
        dg.datagrid({
            rownumbers: false,
            columns: [displayColumns],
            height: 100,
            data: [{}],
            onResizeColumn: function (field, width) {
                if (!gVar.detailColumns) return;
                for (var i = 0; i < gVar.detailColumns.length; i++) {
                    var col = gVar.detailColumns[i];
                    if (col.field == field) {
                        col.width = width;
                    }
                }
               
            }
        });

        setFontSize(fs);
    }
}

//获取模板界面明细列
function getDetailColumns() {
    if (!gVar.detailColumns) return null;
    for (var i = 0; i < gVar.detailColumns.length; i++) {
        var col = gVar.detailColumns[i];
        col.temp_no = gVar.templateNo;
    }
    return gVar.detailColumns;
}

//加载模板明细列
function loadDetailGridColumns(templateCode, temp_no, callback) {
    var data = { templateCode: templateCode, templateId: temp_no };
    $.helper.post(urlLoadPrintGridColumns, data, function (result) {
        if (result.success != true) {
            $.helper.infoAlert(result.message);
            return;
        }
        
        gVar.detailColumns = result.columns.slice(0);

        if (temp_no < 0 && gVar.previewOptions.onLoadDefaultPrintColumns && $.isFunction(gVar.previewOptions.onLoadDefaultPrintColumns)) {
            gVar.previewOptions.onLoadDefaultPrintColumns(result.columns);
        }

        if (callback && $.isFunction(callback)) {
            callback(result.columns);
        }
    });
}

//加载模板缺省明细列
function loadDefaultDetailGridColumns(gridFlag, sheetType, callback) {
    if (!gridFlag || !sheetType) return;
    var data = { flag: gridFlag, sheetType: sheetType };
    $.helper.post(urlLoadGridColumns, data, function (result) {
        if (result.success != true) {
            $.helper.infoAlert(result.message);
            return;
        }
        if (callback && $.isFunction(callback)) {
            callback(result.columns);
        }
    });
}

//获取纸张大小数据
function getPaperObj(id) {
    for (var i = 0; i < papers.length; i++) {
        var p = papers[i];
        if (p.id == id) {
            return p;
        }
    }
    return null;
}

//界面单据打印设置项赋值
function setUISheetSetting(sheetSetting) {
    $("#rr #cmbHead").combobox("select", sheetSetting.head);
    $("#rr #cmbFoot").combobox("select", sheetSetting.foot);
}

//删除选中的打印项
function deleteSelectedElement() {
    $.each(gVar.selected, function () {
        $(this).remove();
    });

    gVar.selected = [];
}

//刷新打印预览Options
function refreshPreviewOptions() {
	
    var printTemp = getTemplate().templateContentPrint;
    var jsPrint = JSON.parse(printTemp);
    var jqPrint = $(jsPrint.module);
    gVar.previewOptions.jqPage = jqPrint; //刷新模板
    gVar.previewOptions.printSetting = JSON.parse(gVar.templateData.templateSettings); //刷新打印设置
    gVar.previewOptions.designColumns = gVar.detailColumns; //刷新打印明细列信息
}

//保存打印纸张
function savePaper(paper,success) {
	var data = { paper: JSON.stringify(paper) };
    $.helper.post(urlSavePrintPaper, data, function (result) {
        if (result.success != true) {
            $.helper.infoAlert(result.message);
            return;
        }

        if (success && $.isFunction(success)) {
            success();
        }
    });
}

/**** 全局变量 ****/
var TEMP_TYPES = { sheet: "sheet", normal: "normal" };

//打印模版
var urlLoadPrintTemplates = rootPath + "/printdesign/loadPrintTemplates";
var urlLoadPrintTemplate = rootPath + "/printdesign/loadPrintTemplate";
var urlSavePrintTemplate = rootPath + "/printdesign/savePrintTemplate";
var urlDeletePrintTemplate = rootPath + "/printdesign/deletePrintTemplate";
var urlSetTemplateDefault = rootPath + "/printdesign/setTemplateDefault";
//打印纸张
var urlLoadPrintPapers = rootPath + "/printdesign/loadPrintPapers";
var urlSavePrintPaper = rootPath + "/printdesign/savePrintPaper";
var urlDeletePrintPaper = rootPath + "/printdesign/deletePrintPaper";
//打印列表
var urlLoadPrintGridColumns = rootPath + "/printdesign/loadPrintGridColumns";
var urlLoadGridColumns = rootPath + "/printdesign/loadDefaultGridColumns";

var gVar = {}
gVar.page = undefined;
gVar.controller = undefined;
gVar.gridFlag = undefined;
gVar.templateNo = undefined; //模板编号 PS: -1默认  -2未保存
gVar.templateData = undefined; //存放刚加载时的原始数据
gVar.detailColumns = undefined; //明细列
gVar.selected = []; //存放选中的组件
gVar.previewOptions = undefined; //打印预览options
gVar.sheetNo = undefined;

$(function () {
    gVar.page = $.helper.getUrlVar("page");
    gVar.controller = $.helper.getUrlVar("controller");
    gVar.templateNo = parseInt($.helper.getUrlVar("template"));
    gVar.gridFlag = $.helper.getUrlVar("gridFlag");
    gVar.sheetNo = $.helper.getUrlVar("sheetNo");
    if (!gVar.page || !gVar.controller || !gVar.templateNo) return;

    //全局变量，存放鼠标位置
    gVar.dragX = 0;
    gVar.dragY = 0;

    //gVar.previewOptions = window.parent[gVar.page+gVar.sheetNo];
    gVar.previewOptions = this;
    
    window.parent[gVar.page] = undefined;

    initToolbar();
    initMainFrame();
    var d = defaultData[gVar.page];
    initDraggable(d);
    //loadTemplateData(gVar.page, gVar.templateNo);

});
