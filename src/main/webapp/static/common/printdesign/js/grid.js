
(function ($) {

    function buildGrid(target) {
        var state = $.data(target, "datagrid");
        var opts = $(target).grid("options");

        var specOpts = {};
        if (!opts.customToolbar) {
            var tb = getToolbar(target);
            if (tb != null) specOpts.toolbar = tb;
        }

        var bakOnClickCell = opts.onClickCell;
        specOpts.onClickCell = function (index, field, value) {
            if (opts.editOnClickRow == false) return;
            if (field == "act") return;
            editRow(target, index);
            var ed = $(target).grid("getEditor", { index: index, field: field });
            if (!ed || ed == null) return;
            if (ed.type == "focusCtrlNumber" || ed.type == "focusCtrlText" || ed.type == "focusCtrlDblClickText"|| ed.type=="datebox" || ed.type == "focusCtrlDateBox") {
                var txtTarget = $(ed.target).textbox("textbox");
                if (!txtTarget) return;
                $(txtTarget).focus().select();
            }
            if (bakOnClickCell && $.isFunction(bakOnClickCell)) {
                bakOnClickCell(index, field, value);
            }
        };

        if (opts.columnHiddenCtrl) {

            specOpts.onHeaderContextMenu = function (e, field) {
                var dg = $(target);
                var opts = dg.grid('options');
                function createColumnMenu() {
                    if (!opts.cmenu) opts.cmenu = $('<div/>');
                    else {
                        opts.cmenu.remove();
                        opts.cmenu = $('<div/>');
                    }
                    $(opts.cmenu).cmenu({targetGrid:target });
                    return opts.cmenu;
                }
                e.preventDefault();
                var cmenu = createColumnMenu();
                cmenu.cmenu('show', {
                    top: e.pageY,
                    left:e.pageX
                });
                
            };
        }

        if (opts.resizeLayoutOnResizeColumn) {
            specOpts.onResizeColumn = function (field, width) {
                var totalWidth = getTotalColumnsWidth(target) + 10;
                $(target).datagrid('resize', { width: totalWidth });
            };
        }        

        if (opts.useScrollView == true) {
            //view视图默认是scrollview虚拟滚动条
            specOpts.view = scrollview;
            specOpts.autoRowHeight = false;
            specOpts.pageSize = 60;
        }

        var bakLoadSuccess = opts.onLoadSuccess;
        specOpts.onLoadSuccess = function (data) {
            if (!data || data.total == 0) {
                //是否显示空行
                if (opts.displayEmptyRow == true) {
                    appendRow(target, { });
                }

                if (opts.showFooter == true && opts.footerTextField && opts.footerTextField != "") {
                    var footer = {};
                    footer[opts.footerTextField] = "合计";
                    $(target).grid('reloadFooter', [footer]);
                    
                }
            }

            if (bakLoadSuccess && $.isFunction(bakLoadSuccess)) {
                bakLoadSuccess(data);
            }
            
            //处理操作列事件绑定
            if (opts.showAction == true) {
                bindOptFieldEvent(target);
            }
        }

        //初始化时是否自动加载数据
        if (opts.loadOnInit == false) {
            specOpts.onBeforeLoad = function (param) { return false; } //暂时屏蔽原有onBeforeLoad，中断向服务器加载数据
        }          

        var state = $.data(target, "datagrid");
        if (state && opts) {
            opts.data = state.data.rows;
        }

        $(target).datagrid($.extend({},opts, specOpts));

        state = $.data(target, "datagrid");
        //恢复onBeforeLoad
        if (opts.onBeforeLoad && $.isFunction(opts.onBeforeLoad)) {
            $(target).datagrid("options").onBeforeLoad = opts.onBeforeLoad;
        }

        //初始化时是否自动加载数据
        if (opts.loadOnInit == false) {
            if (opts.displayEmptyRow == true && (!opts.data || opts.data.length == 0)) {
                var row = { row_id: 1 };                
                $(target).datagrid("loadData", [row]);
                state.insertedRows.push(row);
            }

            if (opts.showFooter == true && opts.footerTextField && opts.footerTextField != "") {
                var footer = {};
                footer[opts.footerTextField] = "合计";
                $(target).grid('reloadFooter', [footer]);
            }           
        }

        if (opts.columnDraggable) {
            drag(target);
        }

        //if (opts.pagination) {
        //    var pager = $(target).grid('getPager');
        //    var pOpts = pager.pagination('options');
        //    pOpts.onSelectPage = function (pageNum, pageSize) {
        //        var dgOpts = $(target).grid('options');
        //        dgOpts.pageNumber = pageNum;
        //        dgOpts.pageSize = pageSize;
        //        doWebServiceRequest(target);
        //    }
        //    pOpts.onChangePageSize = function (pageSize) {
        //        $(this).pagination('refresh', { pageNumber: 1 });
        //    }
        //    pager.pagination(pOpts);           
        //}

        setSissCss(target);

        //if (opts.loadOnInit && opts.loadOnInit == true) {
        //    doWebServiceRequest(target);
        //} else {
        //    var jq = $(target);
        //    var opts = jq.grid("options");
        //    if (opts.draggingCol != true) {
        //        if (opts.displayEmptyRow == true) {
        //            var emptyCount = opts.initRowCount;
        //            for (i = 0; i < emptyCount; i++) {
        //                jq.grid('appendRow', {});
        //            }
        //        }
        //    } else {
        //        var rows = jq.grid("getRows");
        //        jq.grid("loadData", rows);
        //    }

        //    if (!opts.footerTextField || opts.footerTextField == null) return;
        //    var foot = {};
        //    foot[opts.footerTextField] = "合计";

        //    if (opts.draggingCol == true) {
        //        var foots = jq.grid("getFooterRows");
        //        if (foots && foots.length > 0) {
        //            foot = foots[0];
        //        }
        //    }

        //    jq.grid('reloadFooter', [foot]);
        //}
    }

    function inArrayByIdField(target, row, rows) {
        var index = $.inArray(row, rows);
        if (index > -1) return index;
        var opts = $(target).grid("options");
        if (!opts.idField || opts.idField == null || opts.idField == "") return -1;

        for (var i = 0; i < rows.length; i++) {
            var r = rows[i];
            if (r[opts.idField] && r[opts.idField] != null && r[opts.idField] != ""
                 && row[opts.idField] && row[opts.idField] != null && row[opts.idField] != ""
                 && r[opts.idField] == row[opts.idField]) {
                return i;
            }
        }
        return -1;
    }

    function setSissCss(target) {
        $(target).grid('getPanel').addClass('sissgridHeader').addClass('sissgridBody').addClass("sissgridFooter");
    }

    function bindOptFieldEvent(target) {

        $(target).grid('getPanel').find('.datagrid-body a[name="add"]').unbind("click");
        $(target).grid('getPanel').find('.datagrid-body a[name="del"]').unbind("click");
        $(target).grid('getPanel').find('.datagrid-body a[name="add"]').click(function () {
            addClick(target, this);
        });

        $(target).grid('getPanel').find('.datagrid-body a[name="del"]').click(function () {
            delClick(target, this);
        });
    }

    function addClick(target,btnTarget) {
        var tr = $(btnTarget).parents("tr.datagrid-row");
        var index = parseInt(tr.attr("datagrid-row-index"));

        insertRow(target, { index: index, row: {} });        
    }

    function delClick(target, btnTarget) {
        $.common.confirm("确定要删除这个记录吗？", function (r) {
            if (r) {
                var tr = $(btnTarget).parents("tr.datagrid-row");
                var index = parseInt(tr.attr("datagrid-row-index"));
                
                deleteRow(target, index);
                //明细数据为空保存一个空行
                if (getRows(target).length == 0) {
                    appendRow(target, {});
                }

                //处理合计更新
                var options = $(target).grid('options');
                if (options.reloadFooterHandler && $.isFunction(options.reloadFooterHandler)) {
                    options.reloadFooterHandler();
                }
            }
        });
    }

    //获取表格所有列的总宽度
    function getTotalColumnsWidth(target) {
        var dg = $(target);
        var gridwidth = 0;
        var cols = dg.grid('getPanel').find('.datagrid-header-row td');
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            gridwidth = gridwidth + $(col).outerWidth();
        }
        return gridwidth;
    }

    function getToolbar(target) {
        var opts = $(target).grid('options');
        if (!opts.showToolbarAdd && !opts.showToolbarDelete
            && !opts.showToolbarExport && !opts.showToolbarImport
            && !opts.showToolbarRefresh && !opts.showToolbarSaveConfig
            && !opts.showToolbarSearch)
            return null;

        $(opts.toolbar).remove();
        var timestamp = $.now();
        var div = $("<div id='" + timestamp.toString() + "' style='background-color: #e5f2fe;margin:10px 15px 10px 15px;vertical-align:middle;text-align:right;'></div>");
        var tb = '#' + timestamp.toString();

        var tbTitle = opts.ToolbarTitle || "";

        if (tbTitle != "") {
            var jqC = $("<span style='float:left;'></span>");
            var jqTitle = $("<span class='headline'></span>");
            jqTitle.html(tbTitle);
            jqTitle.appendTo(jqC);
            jqC.appendTo(div);
        }

        if (opts.showToolbarAdd) {
            var jqAdd = $("<a href='#'></a>");
            var add = {
                text: '新增',
                iconCls: 'icon-add',
                onClick: function () {
                    if (opts.onToolbarAddClick && $.isFunction(opts.onToolbarAddClick)) {
                        opts.onToolbarAddClick.call(target);
                    }
                }
            };
            jqAdd.appendTo(div[0]);
            jqAdd.linkbutton(add);
        }

        if (opts.showToolbarDelete) {
            var jqDel = $("<a href='#'></a>");
            var del = {
                text: '删除',
                iconCls: 'icon-remove',
                onClick: function () {
                    if (opts.onToolbarDeleteClick && $.isFunction(opts.onToolbarDeleteClick)) {
                        opts.onToolbarDeleteClick.call(target);
                    }
                }
            };
            jqDel.appendTo(div[0]);
            jqDel.linkbutton(del);
        }

        if (opts.showToolbarRefresh) {
            var jqRef = $("<a href='#'></a>");
            var ref = {
                text: '刷新',
                iconCls: 'icon-reload',
                onClick: function () {
                    $(target).grid('reload');
                }
            };
            jqRef.appendTo(div[0]);
            jqRef.linkbutton(ref);
        }

        if (opts.showToolbarSaveConfig) {
            var jqSave = $("<a href='#'></a>");
            var save = {
                text: '保存设置',
                iconCls: 'icon-save',
                onClick: function () {
                    if (opts.onSaveColumnsConfig && $.isFunction(opts.onSaveColumnsConfig)) {
                        var configData = getColumnsConfig(target);
                        opts.onSaveColumnsConfig.call(target, configData);
                    }
                }
            };
            jqSave.appendTo(div[0]);
            jqSave.linkbutton(save);
            jqSave.tooltip({
                position: 'right',
                content: '<span style="color:#fff">保存数据列宽度、隐现、排序位置信息.</span>',
                onShow: function () {
                    $(this).tooltip('tip').css({
                        backgroundColor: '#666',
                        borderColor: '#666'
                    });
                }
            });
        }

        if (opts.showToolbarImport) {
            function upload(url) {
                $("#frmUpload").attr("action", url);
                $("#divUpload").dialog("open");
                //                $('#divUpload').dialog({
                //                    title: 'My Dialog',
                //                    width: 400,
                //                    height: 200,
                //                    closed: false,
                //                    cache: false,
                //                    modal: true
                //                });
                //                $("#frmUpload").prop("action", url);
                //                $("#frmUpload").find("input[type='file']").on('change', function () {
                //                    $("#frmUpload").find("input[type='submit']").click();
                //                });
                //                $("#frmUpload").find("input[type='file']").click();



                //                $("#frmPostFile").remove();
                //                var form = $('<form id="frmPostFile" method="post" enctype="multipart/form-data"></form>').appendTo('#divUpload');
                //                form.attr("action", url);
                //                var file = $('<input type="file" name="file1" multiple>').appendTo(form);
                //                var iframe = $('<iframe name="hidden_frame" id="hidden_frame" style="display:none"></iframe>').appendTo(form);
                //                form.prop("target", "hidden_frame");
                //                file.on('change', function () {
                //                    form.submit();
                //                });
                //                file.click();
            }

            function onImportClick(e) {
                var dgOpts = $(target).grid('options');
                var subMenus = dgOpts.importMenuButtons;
                if (!subMenus && subMenus.length == 0) return;

                var cmenu = $('<div/>');
                cmenu.menu({
                    onClick: function (item) {
                        //asdfasdf
                        $(target).grid("stopEdit");
                        var changeRows = $(target).grid('getChanges');
                        var idField = $(target).grid('options').idField;
                        if (changeRows.length > 0) {
                            if (idField && idField != null) {
                                for (var i = 0; i < changeRows.length; i++) {
                                    var row = changeRows[i];
                                    if (row[idField] != null && row[idField] != "") {
                                        $_jxc.alert('单据明细内容有修改，请保存后操作!');
                                        return;
                                    }
                                }
                            }
                        }
                        if (!item) return;
                        var infos = cmenu.menu('options').ItemInfos;
                        var onclick = infos[item.text].onClick;
                        if (onclick && $.isFunction(onclick)) {
                            onclick();
                        }
                    }
                });

                $.each(subMenus, function (index, el) {
                    var mOpts = cmenu.menu('options');
                    if (!mOpts.ItemInfos) mOpts.ItemInfos = {};
                    cmenu.menu('appendItem', {
                        text: el.text
                    });
                    mOpts.ItemInfos[el.text] = {};
                    mOpts.ItemInfos[el.text].onClick = el.onClick;
                });

                cmenu.menu('show', { left: e.pageX, top: e.pageY });
            }

            var jqIm = $("<a href='#'></a>");
            var click = eval(onImportClick || function () { });
            jqIm.click(click);
            var im = {
                text: '导入',
                iconCls: 'icon-import'
            };
            jqIm.appendTo(div[0]);
            jqIm.linkbutton(im);
        }

        if (opts.showToolbarExport) {

            function onExportClick(e) {
                var dgOpts = $(target).grid('options');
                var subMenus = dgOpts.exportMenuButtons;
                if (!subMenus && subMenus.length == 0) return;

                var cmenu = $('<div/>');
                cmenu.menu({
                    onClick: function (item) {

                        $(target).grid("stopEdit");
                        var changeRows = $(target).grid('getChanges');
                        var idField = $(target).grid('options').idField;
                        if (changeRows.length > 0) {
                            if (idField && idField != null) {
                                for (var i = 0; i < changeRows.length; i++) {
                                    var row = changeRows[i];
                                    if (row[idField] != null && row[idField] != "") {
                                        $_jxc.alert('单据明细内容有修改，请保存后操作!');
                                        return;
                                    }
                                }
                            }
                        }
                        if (!item) return;
                        var infos = cmenu.menu('options').ItemInfos;
                        var onclick = infos[item.text].onClick;
                        if (onclick && $.isFunction(onclick)) {
                            onclick();
                        }
                    }
                });

                $.each(subMenus, function (index, el) {
                    var mOpts = cmenu.menu('options');
                    if (!mOpts.ItemInfos) mOpts.ItemInfos = {};
                    cmenu.menu('appendItem', {
                        text: el.text
                    });
                    mOpts.ItemInfos[el.text] = {};
                    mOpts.ItemInfos[el.text].onClick = el.onClick;
                });

                cmenu.menu('show', { left: e.pageX, top: e.pageY });
            }


            var jqEx = $("<a href='#'></a>");
            var click = eval(onExportClick || function () { });
            jqEx.click(click);
            var ex = {
                text: '导出',
                iconCls: 'icon-export'
            };
            jqEx.appendTo(div[0]);
            jqEx.linkbutton(ex);
        }

        if (opts.showToolbarSearch) {
            var jqSearch = $("<input style='width:100%'/>");
            var search = {
                buttonText: "&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;",
                prompt: opts.toolBarSearchPrompt || "请输入要查询的内容",
                onChange: function (n, o) {
                    if (opts.onSearchTextChange && $.isFunction(opts.onSearchTextChange)) {
                        opts.onSearchTextChange(n, o);
                    }                    
                },
                onClickButton: function () {
                    if (opts.onSearch && $.isFunction(opts.onSearch)) {
                        var value  = jqSearch.val();
                        opts.onSearch(value, '');
                    }
                }
            };
            jqSearch.appendTo(div[0]);
            jqSearch.textbox(search);
            if (opts.queryText && $.trim(opts.queryText) != "") {
                jqSearch.textbox("setValue", opts.queryText);
            }
            jqSearch.next('span').find('input[type="text"]').keydown(function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    var value = jqSearch.val();
                    opts.onSearch(value, '');
                    return false;
                }
            });
            //jqSearch.next('span').find('a').removeClass('searchbox-button').text('查询');
        }

        div.appendTo('body');
        return tb;
    }

    //处理列的formatter,editor及是否显示checkbox列，增加删除列
    function dealColumns(target, columns, gridOptions) {
        //处理act列
        if (gridOptions.showAction == true) {
            var exist = false;
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                if (col.field == "act") {
                    exist = true;
                }
            }
            if (!exist) {
                //新增act列
                var col = {
                    field: "act",
                    title: "操作",
                    width: 40,
                    formatter: function (value, row, index) {
                        var add = '<a name="add" class="add-line" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;';
                        var del = '<a name="del" class="del-line" style="cursor:pointer;display:inline-block;text-decoration:none;"></a> ';
                        return add + del;
                    }
                };
                columns.unshift(col);
            }
        } else {
            //删除act列
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                if (col.field == "act") {
                    columns.splice(i, 1);
                }
            }
        }

        //处理checkbox
        if (gridOptions.showCheckbox == true) {
            var exist = false;
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                if (col.field == "ck") {
                    exist = true;
                }
            }
            if (!exist) {
                columns.unshift({ field: "ck", checkbox: true });
            }
        } else {
            //删除ck列
            for (var i = 0; i < columns.length; i++) {
                var col = columns[i];
                if (col.field == "ck") {
                    columns.splice(i, 1);
                }
            }
        }

        var formatters = gridOptions.fieldFormatters;
        if (formatters && formatters != null) {
            $.each(columns, function (index, el) {
                if (el.formatter && el.formatter != null && el.formatter != "" && !$.isFunction(el.formatter)) {
                    el.formatter = formatters[el.formatter];
                }
            });
        }

        var editors = gridOptions.fieldEditors;
        if (!editors || editors == null) return;
        $.each(columns, function (index, el) {
            if (el.editor && el.editor != null && el.editor != "") {

                var ed = editors[el.editor];
                if (ed && ed != null) el.editor = ed;
            }
        });
    }

    function stopEditing(target) {
        var t = $(target);
        if (!t.length) { return }
        var opts = $(target).grid("options");
        if (opts.editIndex == undefined) { return true }
        if (t.datagrid('validateRow', opts.editIndex)) {
            t.datagrid('endEdit', opts.editIndex);
            opts.editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }

    function getFootRow(target) {
        var footers = $(target).grid('getFooterRows');
        if (footers && footers.length > 0) {
            return footers[0];
        }
        return undefined;
    }

    function onMyAfterEdit(target, index, row) {
        var opts = $(target).grid('options');
        if (opts.reloadFooterHandler && $.isFunction(opts.reloadFooterHandler)) {
            opts.reloadFooterHandler();
        }
    }

    function checkChangeRowIsNew(target, row) {
        var rowIndex = $(target).grid('getRowIndex', row);
        var inserteds = $(target).grid('getChanges', 'inserted');
        for (var i = 0; i < inserteds.length; i++) {
            var inserted = inserteds[i];
            var insertedIndex = $(target).grid('getRowIndex', inserted);
            if (insertedIndex == rowIndex) return true;
        }
        return false;
    }

    function appendRow(target, row) {
        insertRow(target, { row: row });
    }

    function removeRow(target) {
        var dg = $(target);
        if (!dg.length) { return }
        var checkeds = dg.datagrid('getChecked');

        for (var i = 0; i < checkeds.length; i++) {
            var selected = checkeds[i];
            var selectedIndex = dg.datagrid('getRowIndex', selected);
            dg.datagrid('deleteRow', selectedIndex);
        }

        var opts = dg.grid('options');
        if (opts.reloadFooterHandler && $.isFunction(opts.reloadFooterHandler)) {
            opts.reloadFooterHandler();
        }
    }

    function deleteRow(target, index) {               
        if (index == undefined || index < 0) return;
        var allRows = $(target).grid("getGridRows");

        //删除updatedRow记录
        var upatedRows = $(target).grid("getChanges", "updated");
        var deletedRow = allRows[index];
        var r_index = $.inArray(deletedRow, upatedRows);
        if (r_index > -1) {
            upatedRows.splice(r_index, 1);
        }

        var opts = $(target).data("datagrid").options;
        if (opts.view.type == "scrollview") {
            $(target).grid("deleteRowScroll", index);
        } else {
            $(target).grid("deleteRow", index);
        }
    }

    function updateRow(target, param) {
        if (!param) return;
        if (!param.row) return;
        var jq = $(target);
        var opts = $(target).data("datagrid").options;
        if (opts.view.type == "scrollview") {
            jq.grid("updateRowScroll", param);
        } else {
            jq.grid("updateRow", param);
        }
      
        var updatedRows = jq.grid('getChanges', 'updated');
        var insertedRows = jq.grid("getChanges", "inserted");
        updatedRows = updatedRows || [];
        if ($.inArray(param.row, insertedRows) > -1) return;
        if ($.inArray(param.row, updatedRows) > -1) return;
        jq.grid('getChanges', 'updated').push(param.row);
    }

    function insertRow(target, param) {
        function doInsert() {
            var row_id;
            if (index > -1) {
                var pRow = allRows[index];
                var nRow = allRows[index + 1];

                var pRow_id, nRow_id;
                if (pRow) pRow_id = pRow.row_id;
                if (nRow) nRow_id = nRow.row_id;

                pRow_id = pRow_id || 1;
                if (nRow_id != undefined) {
                    nRow_id = nRow_id || pRow_id + 1;
                    row_id = parseFloat((pRow_id + nRow_id) / 2);
                } else {
                    row_id = pRow_id + 1;
                }
            } else {
                var pRow = allRows[allRows.length - 1];
                if (pRow && pRow.row_id) {
                    row_id = pRow.row_id + 1;
                } else {
                    row_id = 1;
                }
            }

            row.row_id = row_id;
            if (index > -1) index = index + 1;


            if (opts.view.type == "scrollview") {
                t.grid('insertRowScroll', { index: index, row: row });
            } else {
                t.grid('insertRow', { index: index, row: row });
            }

            //绑定action列操作事件
            if (index == undefined) {
                index = data.total - 1;
            }
            var tr = opts.finder.getTr(target, index, 'body', 2);
            tr.find('a[name="add"]').click(function () {
                addClick(target, this);
            });
            tr.find('a[name="del"]').click(function () {
                delClick(target, this);
            });
        }

        var t = $(target);
        if (!t.length) return;
        if (!param) return;
        if (!stopEditing(target)) return;

        var index = param.index;
        var row = param.row;
        var allRows = $(target).grid("getGridRows");
        var state = $.data(target, 'datagrid');
        var opts = state.options;
        var data = state.data;

        doInsert();
    }

    function getRows(target) {
        var opts = $(target).data("datagrid").options;
        if (opts.view.type == "scrollview") {
            return $(target).grid("getRowsScroll");
        }
        else {
            return $(target).grid("getRows");

        }
    }

    function getRowIndex(target, row) {
        var rows = getRows(target);
        return $.inArray(row, rows);
    }

    function getChecked(target) {
        var opts = $(target).data("datagrid").options;
        if (opts.view.type == "scrollview") {
            return $(target).grid("getCheckedScroll");
        } else {
            return $(target).grid("getChecked");
        }
    }

    function updateFieldTitle(target,param) {
        var field = param.field;
        var title = param.title;
        var dg = $(target);
        if (dg.length < 0) return;
        var panel = dg.datagrid("getPanel");
        var tds = panel.find('.datagrid-view2 .datagrid-htable td[field="' + field + '"]');
        if (tds.length > 0) {
            var spans = $('span', tds[0]);
            if (spans.length > 0) {
                spans.eq(0).text(title);
                dg.datagrid("fitColumns");
            }
        }
    }

    function editRow(target, index) {
        var dg = $(target);
        if (!dg.length) { return }
        var opts = $(target).grid("options");
        if (opts.editIndex != index) {
            if (stopEditing(target)) {
                dg.datagrid('selectRow', index).datagrid('beginEdit', index);
                opts.editIndex = index;
                var row = dg.datagrid('getRows')[index];
                opts.editRowClone = cloneObj(row);
            } else {
                dg.datagrid('selectRow', opts.editIndex);
            }
        }
    }

    function cloneObj(obj) {
        var newObj = {};
        for (var prop in obj) {
            newObj[prop] = obj[prop];
        }
        return newObj;
    }

    function getColumnsConfig(target) {
        var dg = $(target);
        if (!dg.length) { return; }
        var colSettings = [];
        var opts = dg.grid("options");
        for (var i = 0; i < opts.columns[0].length; i++) {
            var col = opts.columns[0][i];
            if (col.field == "ck" || col.field == "act") continue;
            var colSetting = {};
            colSetting.flag = opts.gridFlag;
            colSetting.field = col.field;
            colSetting.title = col.title;
            colSetting.width = col.width;
            colSetting.orderIndex = i;
            colSetting.hidden = col.hidden == true;
            colSetting.isPrint = col.isPrint;
            colSettings.push(colSetting);
        }

        return colSettings;
    }

    function drag(target) {
        var cells = $(target).grid('getPanel').find('div.datagrid-view2 div.datagrid-header td[field!="act"][field!="ck"]');
        cells.draggable({
            revert: true,
            cursor: 'pointer',
            edge: 5,
            proxy: function (source) {
                var p = $('<div class="tree-node-proxy tree-dnd-no" style="position:absolute;border:1px solid #ff0000"/>').appendTo('body');
                p.html($(source).text());
                p.hide();
                return p;
            },
            onBeforeDrag: function (e) {
                if (e.which != 1) return false;

                //var rows = $(target).datagrid('getChanges');
                //if (rows.length > 0) {
                //    for (var i = 0; i < rows.length; i++) {
                //        var row = rows[i];
                //        if (row && row.isValid == true) {
                //            $_jxc.alert('信息', '单据明细内容有修改，请保存后拖动!')
                //            return false;
                //        }
                //    }
                //}
                e.data.startLeft = $(this).offset().left;
                e.data.startTop = $(this).offset().top;
            },
            onStartDrag: function (e) {
                $(this).draggable('proxy').css({
                    left: -10000,
                    top: -10000
                });
            },
            onDrag: function (e) {
                if ((e.data.top - e.data.startTop) > 5 || (e.data.left - e.data.startLeft) > 5) {
                    $(this).draggable('proxy').show().css({
                        left: e.pageX + 15,
                        top: e.pageY + 15
                    });
                }
               
                return false;
            }
        })
        .droppable({
            accept: 'div.datagrid-view2 div.datagrid-header td[field!="ck"][field!="act"]',
            onDragOver: function (e, source) {
                $(source).draggable('proxy').removeClass('tree-dnd-no').addClass('tree-dnd-yes');
                $(this).css('border-left', '1px solid #ff0000');
            },
            onDragLeave: function (e, source) {
                $(source).draggable('proxy').removeClass('tree-dnd-yes').addClass('tree-dnd-no');
                $(this).css('border-left', 0);
            },
            onDrop: function (e, sourceTarget) {
                var dg = $(target);
                if (!dg.length) { return; }
                var state = $.data(target, 'datagrid');
                var opts = state.options;
                var cols = opts.columns[0];

                //取得目标列头的field值  
                var dest = $(e.currentTarget).attr('field');
                //取得源列头的field值  
                var source = $(sourceTarget).attr('field');

                //移动列头
                var hSource = dg.datagrid('getPanel').find('div.datagrid-view2 div.datagrid-header td[field="' + source + '"]');
                var hDest = dg.datagrid('getPanel').find('div.datagrid-view2 div.datagrid-header td[field="' + dest + '"]');
                hSource.insertBefore(hDest);

                //移动数据行
                dg.datagrid('getPanel').find('div.datagrid-view2 div.datagrid-body tr').each(function () {
                    var tdSource = $(this).find('td[field="' + source + '"]');
                    var tdDest = $(this).find('td[field="' + dest + '"]');
                    tdSource.insertBefore(tdDest);
                });

                //移动合计行
                var fSource = dg.datagrid('getPanel').find('div.datagrid-view2 div.datagrid-footer td[field="' + source + '"]');
                var fDest = dg.datagrid('getPanel').find('div.datagrid-view2 div.datagrid-footer td[field="' + dest + '"]');
                fSource.insertBefore(fDest);               


                var destInfo = {};
                var sourceInfo = {};

                //获取目标列头和源列头的列信息
                for (var i = 0; i < cols.length; i++) {
                    var col = cols[i];
                    if (col.field == source) {
                        sourceInfo.index = i;
                        sourceInfo.obj = col;
                    } else if (col.field == dest) {
                        destInfo.index = i;
                        destInfo.obj = col;
                    }
                }

                //替换目标列
                cols.splice(destInfo.index, 1, sourceInfo.obj);
                //替换源列
                cols.splice(sourceInfo.index, 1, destInfo.obj);               
            }
        });
    }
    //开启编辑模式
    function enableEdit(target) {
        var opts = $(target).grid("options");
        if (!opts) return;        
        var bakLoadOnInit = opts.loadOnInit;
        opts.editOnClickRow = true;
        opts.loadOnInit = false;
        opts.showAction = true;
        opts.showCheckbox = true;
        $(target).grid(opts);
        opts.loadOnInit = bakLoadOnInit;
    }
    //关闭编辑模式
    function disableEdit(target) {
        var opts = $(target).datagrid("options");
        if (!opts) return;
        opts.onClickCell = function (index, field, value) { } //取消单击编辑功能
        var panel = $(target).datagrid("getPanel");
        if (!panel) return;
        panel.find(".datagrid-view2").find("td[field='ck'],td[field='act']").remove(); //去除checkbox和操作列
    }

    //添加valid状态
    function dealLoadedData(rows) {
        $.each(rows, function (index, row) {
            row.isValid = true;
        });
    }

    function doWebServiceRequest(target) {
        function restoreCheckedRows(rows) {
            var state = $.data(target, "grid");
            if (!rows || rows == null) return;
            if (!state.svCheckedRows || state.svCheckedRows == null) return;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var inx = $.inArray(row, state.svCheckedRows);
                if (inx < 0) inx = inArrayByIdField(target, row, state.svCheckedRows);
                if (inx < 0) continue;
                $(target).grid("checkRow", i);
            }
        }
        function loadDataSuccess(result) {
            var jq = $(target);
            jq.grid('loaded');

            if (result.success != true) {
                $.common.infoAlert(result.message);
                return;
            }

            dealLoadedData(result.rows);
            jq.grid('loadData', result.rows);
            restoreCheckedRows(result.rows);
            var opts = jq.grid("options");
            //            if (opts.displayEmptyRow == true) {
            //                var emptyCount = opts.initRowCount;
            //                if (result.rows.length == 0) {
            //                    for (i = 0; i < emptyCount; i++) {
            //                        jq.grid('appendRow', {});
            //                    }
            //                }

            //                if (result.rows.length > 0) {
            //                    jq.grid('appendRow', {});
            //                }
            //            }
            jq.grid('reloadFooter', result.footer);
            jq.grid('getPager').pagination('refresh', {
                total: result.total,
                pageNumber: opts.pageNumber
            });
        }
        var dg = $(target);
        var opts = dg.grid('options');
        if (!opts.urlWebService || opts.urlWebService == null) return;

        //var param = $.extend({}, opts.queryParams);
        var param = {};
        param.queryParams = opts.queryParams;
        if (opts.pagination) {
            $.extend(param, {
                page: opts.pageNumber,
                rows: opts.pageSize
            });
        }
        if (opts.sortName) {
            $.extend(param, {
                sort: opts.sortName,
                order: opts.sortOrder
            });
        }

        dg.grid('loading');

        $.webService.post(opts.urlWebService, param, loadDataSuccess);
    }

    $.fn.grid = function (options, param) {
        if (typeof options == 'string') {
            var method = $.fn.grid.methods[options];
            if (method) {
                return method(this, param);
            } else {
                return this.datagrid(options, param);
            }
        }

        options = options || {};

        //获取列信息
        if (!options.columns) {
            if (options.gridFlag && options.gridFlag != "") {
                var url = $.common.getSiteRootPath() + "/" + (options.loadGridColumnsUrl || "api/GridCommon/LoadGridColumns");
                var that = this;
                $.common.post(
                    url,
                    { flag: options.gridFlag, sheetType: options.sheetType },
                    function (result) {
                        if (result.success != true) {
                            $.common.infoAlert("加载列信息失败！错误信息：" + result.message);
                            return;
                        }
                        //options.initingColumns = true;
                        dealColumns(this, result.columns, options);
                        //options.initingColumns = undefined;
                        options.columns = [result.columns];
                    },
                    function (e) {
                        $.common.infoAlert("加载列信息失败！");
                        return;
                    },
                    false);
            }
        } else {
            if (options.columns.length > 0) {
                //options.initingColumns = true;
                dealColumns(this, options.columns[0], options);
                //options.initingColumns = undefined;
            }
        }

        var bakOnAfterRender = $.fn.grid.defaults.view.onAfterRender;
        $.extend($.fn.grid.defaults.view, {
            onAfterRender: function (target) {
                bakOnAfterRender.call(this,target);
                bindOptFieldEvent(target);
            }
        });

        return this.each(function () {
            var state = $.data(this, 'grid');
            if (state) {
                $.extend(state.options, options);
            } else {
                var opts = $.extend({}, $.fn.grid.defaults, $.fn.grid.parseOptions(this), options);
                $.data(this, 'grid', {
                    options: opts
                });
            }          

            buildGrid(this);
        });
    }

    $.fn.grid.methods = $.extend({}, $.fn.datagrid.methods, {
        options: function (jq) {
            return $.data(jq[0], 'grid').options;
        },
        getEditIndex: function (jq) {
            var opts = $.data(jq[0], 'grid').options;
            return opts.editIndex;
        },
        stopEdit: function (jq) {
            return stopEditing(jq[0]);
        },
        updateGridFieldTitle:function(jq,param){
            return updateFieldTitle(jq[0], param);
        },
        startEdit: function (jq, index) {
            editRow(jq[0], index);
        },
        appendGridRow: function (jq, row) {
            appendRow(jq[0], row);
        },
        deleteGridRow: function (jq, index) {
            deleteRow(jq[0], index);
        },
        insertGridRow: function (jq, param) {
            insertRow(jq[0], param);
        },
        updateGridRow: function (jq, param) {
            updateRow(jq[0], param);
        },
        getGridRows: function (jq) {
            return getRows(jq[0]);
        },
        getGridRowIndex: function (jq, row) {
            return getRowIndex(jq[0], row);
        },
        getGridChecked: function (jq) {
            return getChecked(jq[0]);
        },
        //保存列表设置
        saveConfig: function (jq) {
            var opts = jq.grid("options");
            var configs = getColumnsConfig(jq[0]);
            var url = $.common.getSiteRootPath() + "/" + (opts.saveGridConfigUrl || "api/GridCommon/SaveGridConfig");
            $.common.post(
                url,
                { configs: configs, flag: opts.gridFlag },
                function (result) {
                    if (result.success != true) {
                        $.common.infoAlert("保存设置失败！错误信息：" + result.message);
                        return;
                    }

                    $.common.infoAlert("保存设置成功！");
                },
                function (e) {
                    $.common.infoAlert("保存设置失败！");
                }
                );
        },
        loadDefaultConfig: function (jq) {
            var opts = jq.grid("options");
            var url = $.common.getSiteRootPath() + "/" + (opts.saveGridConfigUrl || "api/GridCommon/RecoverDefaultColumnsSetting");
            $.common.post(
                 url,
                { flag: opts.gridFlag, sheetType: opts.sheetType },
                function (result) {
                    if (result.success != true) {
                        $.common.infoAlert("恢复默认设置失败！错误信息：" + result.message);
                        return;
                    }
                    $.common.infoAlert("恢复默认设置成功！");
                    //dealColumns(result.columns, opts)
                    opts.columns = [result.columns];
                    var bakLoadOnInit = opts.loadOnInit;
                    opts.loadOnInit = false;
                    if (opts.lastQueryParams) {
                        if (!opts.queryParams || opts.queryParams.length == 0) {
                            opts.queryParams = {};
                        }
                        $.extend(opts.queryParams, opts.lastQueryParams);
                    }
                    jq.grid(opts);
                    opts.loadOnInit = bakLoadOnInit;
                    if (opts.reloadFooterHandler && $.isFunction(opts.reloadFooterHandler)) {
                       opts.reloadFooterHandler();
                    }
                },
                function (e) {
                    $.common.infoAlert("恢复默认设置失败！");
                }
                );

        },
        getTotal: function (jq) {
            var data = jq.grid("getData");
            if (data.firstRows) {
                return data.firstRows.length;
            }
            if (data.rows) {
                return data.rows.length;
            }
            return -1;
        },
        enableEdit: function (jq) {
            enableEdit(jq[0]);
        },
        disableEdit: function (jq) {
            disableEdit(jq[0]);
        }
    });

    $.fn.grid.parseOptions = function (target) {
        return $.extend({}, $.fn.datagrid.parseOptions(target), {});
    };

    //获取表格编辑状态行的索引
    function getGridEditIndex(target) {
        var dg = $(target);
        var selectedIndex = dg.grid('getRowIndex', dg.grid('getSelected'));
        var ret = dg.grid("options").editIndex || selectedIndex;
        return ret;
    }
    //回车换行并编辑
    function enterNextRowEdit(target, edTarget) {
        var tr = $(edTarget).parents("tr.datagrid-row");
        var inputs = tr.find("td:visible .focusCtrl:enabled");
        var nxtIdx = inputs.index(edTarget) + 1;
        if (nxtIdx == inputs.length) {
            var curEditIndex = getGridEditIndex(target);
            if (curEditIndex < 0) return;

            var rows = getRows(target);
            var rowCount = rows.length;
            if (curEditIndex == rowCount - 1) {//当前编辑行是最后一行则新建一行
                var success = stopEditing(target);
                if (success == false) return;
                appendRow(target, {});
                setTimeout(function () {
                    editRow(target, curEditIndex + 1);
                }, 100);

            } else {
                var success = stopEditing(target);
                if (success == false) return;
                editRow(target, curEditIndex + 1);
            }
            
            

        }
    }
    //单元格编辑焦点向右移动
    function moveRight(edTarget) {
        var tr = $(edTarget).parents("tr.datagrid-row");
        var inputs = tr.find("td:visible .focusCtrl:enabled");
        var nxtIdx = inputs.index(edTarget) + 1;
        if (nxtIdx < inputs.length)
            $(inputs[nxtIdx]).textbox("textbox").focus().select();
    }
    //单元格编辑焦点向左移动
    function moveLeft(edTarget) {
        var inputs = $(edTarget).parents("tr.datagrid-row").find("td:visible .focusCtrl:enabled");
        var prevIdx = inputs.index(edTarget) - 1;
        if (prevIdx > -1)
            $(inputs[prevIdx]).textbox("textbox").focus().select();
    }
    //单元格编辑焦点向上移动
    function moveUp(target, edTarget) {
        var dg = $(target);
        var upIndex = dg.grid("options").editIndex - 1;
        if (upIndex < 0) return;
        //获取editor所在列的位置
        var tr = $(edTarget).parents("tr.datagrid-row");
        var inputs = tr.find("td:visible .focusCtrl:enabled");
        var index = inputs.index(edTarget);

        var success = stopEditing(target);
        if (success == false) return;

        dg.grid('selectRow', upIndex);
        editRow(target, upIndex);
        inputs = tr.prev("tr.datagrid-row").find(".focusCtrl");
        $(inputs[index]).textbox("textbox").focus().select();
    }
    //单元格编辑焦点向下移动
    function moveDown(target, edTarget) {
        var dg = $(target);
        var downIndex = dg.grid('options').editIndex + 1;
        if (downIndex == dg.grid("getRows").length) return;
        //获取editor所在列的位置
        var tr = $(edTarget).parents("tr.datagrid-row");
        var inputs = tr.find("td:visible .focusCtrl:enabled");
        var index = inputs.index(edTarget);

        var success = stopEditing(target);
        if (success == false) return;

        dg.grid('selectRow', downIndex);
        editRow(target, downIndex);
        inputs = tr.next("tr.datagrid-row").find(".focusCtrl");
        $(inputs[index]).textbox("textbox").focus().select();
    }
    //失去焦点
    function blurTextbox(edTarget) {
        $(edTarget).textbox('textbox').blur();
    }
    //获得焦点
    function focusTextbox(edTarget) {
        $(edTarget).textbox('textbox').focus().select();
    }

    function focusTextboxEditor(dg, field) {
        var ed = common.getGridEditor(dg[0], field);
        if (!ed || ed == null) return;

        common.focusTextbox(ed.target);
    }
    function blurTextboxEditor(dg, field) {
        var ed = common.getGridEditor(dg[0], field);
        if (!ed || ed == null) return;

        common.blurTextbox(ed.target);
    }

    $.extend($.fn.datagrid.defaults.editors, {
        focusCtrlText: {
            init: function (container, options) {
                var input = $('<input type="text" class="focusCtrl"/>').appendTo(container);
                options = options || {};
                input.textbox(options);
                if (options.focusOnInit == true) {
                    input.textbox("textbox").focus().select();
                }
                input.textbox('textbox').blur(function (e) {
                    if (options.onBlur && $.isFunction(options.onBlur)) {
                        options.onBlur();
                    }
                });
                input.textbox('textbox').click(function () {
                    $(this).select();
                });
                input.textbox('textbox').keyup(function (e) {
                    var text = input.textbox('getValue');

                    //enter
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveRight(input);
                        enterNextRowEdit(options.jqGrid[0], input);
                        if (options.onEnter && $.isFunction(options.onEnter)) {
                            options.onEnter(input, text);
                        }
                    }

                    //left
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        moveLeft(input);
                        if (options.onMoveLeft && $.isFunction(options.onMoveLeft)) {
                            options.onMoveLeft(input, text);
                        }
                    }

                    //up
                    if (e.keyCode === 38) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveUp(options.jqGrid, input);
                        if (options.onMoveUp && $.isFunction(options.onMoveUp)) {
                            options.onMoveUp(input, text);
                        }
                    }

                    //right
                    if (e.keyCode === 39) {
                        e.preventDefault();
                        moveRight(input);
                        if (options.onMoveRight && $.isFunction(options.onMoveRight)) {
                            options.onMoveRight(input, text);
                        }
                    }

                    //down
                    if (e.keyCode === 40) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveDown(options.jqGrid, input);
                        if (options.onMoveDown && $.isFunction(options.onMoveDown)) {
                            options.onMoveDown(input, text);
                        }
                    }
                });
                if (options.tooltipMsg && options.tooltipMsg != null && options.tooltipMsg != "") {
                    input.textbox("textbox").tooltip({
                        position: 'right',
                        content: '<span style="color:#fff">' + options.tooltipMsg + '</span>',
                        onShow: function () {
                            $(this).tooltip('tip').css({
                                backgroundColor: '#666',
                                borderColor: '#666'
                            });
                        }
                    });
                }
                return input;
            },
            destroy: function (target) {
                $(target).textbox('destroy');
            },
            getValue: function (target) {
                return $(target).textbox('getValue');
            },
            setValue: function (target, value) {               
                $(target).data('isInit', true);
                $(target).textbox('setValue', value);
                $(target).data('isInit', false);
            },
            resize: function (target, width) {
                $(target).textbox('resize', width);
            }
        },
        focusCtrlNumber: {
            init: function (container, options) {
                var input = $('<input type="text" class="focusCtrl"/>').appendTo(container);
                options = options || {};
                options.precision = options.precision || 4;
                input.numberbox(options);
                input.numberbox('textbox').css({ 'text-align': 'right' });
                input.numberbox('textbox').click(function () {
                    $(this).select();
                });
                input.numberbox('textbox').keyup(function (e) {            
                    //enter
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        if (input.numberbox("options").preventOnEnter == true) return;
                        moveRight(input);
                        enterNextRowEdit(options.jqGrid[0], input);
                        if (options.onEnter && $.isFunction(options.onEnter)) {
                            options.onEnter(input);
                        }
                    }

                    //left
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        moveLeft(input);
                        if (options.onMoveLeft && $.isFunction(options.onMoveLeft)) {
                            options.onMoveLeft(input);
                        }
                    }

                    //up
                    if (e.keyCode === 38) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        if (input) input.numberbox("setValue", input.numberbox("getText"));
                        moveUp(options.jqGrid, input);
                        if (options.onMoveUp && $.isFunction(options.onMoveUp)) {
                            options.onMoveUp(input);
                        }
                    }

                    //right
                    if (e.keyCode === 39) {
                        e.preventDefault();
                        moveRight(input);
                        if (options.onMoveRight && $.isFunction(options.onMoveRight)) {
                            options.onMoveRight(input);
                        }
                    }

                    //down
                    if (e.keyCode === 40) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        if (input) input.numberbox("setValue", input.numberbox("getText"));
                        moveDown(options.jqGrid, input);
                        if (options.onMoveDown && $.isFunction(options.onMoveDown)) {
                            options.onMoveDown(input);
                        }
                    }
                });
                return input;
            },
            destroy: function (target) {
                $(target).numberbox('destroy');
            },
            getValue: function (target) {
                return $(target).numberbox('getValue');
            },
            setValue: function (target, value) {
                $(target).data('isInit', true);
                $(target).numberbox('setValue', value);
                $(target).data('isInit', false);
            },
            resize: function (target, width) {
                $(target).numberbox('resize', width);
            }
        },
        span: {
            init: function (container, options) {
                var input = $('<span></span>').appendTo(container);                
                options = options || {};
                if (options.isNumber == true) {
                    input.css({ 'text-align': 'right', 'display': 'inline-block' });
                } else {
                    input.css({ 'text-align': 'left', 'display': 'inline-block' });
                }
                input.data("span", options);
                return input;
            },
            destroy: function (target) {
                $(target).remove();
            },
            getValue: function (target) {
                var d = $(target).data("span");
                if (d && d.isNumber == true) {
                    var ret = parseFloat($(target).html());
                    return ret;
                }
                return $(target).html();
            },
            setValue: function (target, value) {
                var v = value;
                var d = $(target).data("span");
                if (d && d.isNumber == true && d.format && d.format != "") {
                    var n = parseFloat(value);
                    if (n.toString().toLowerCase() != "nan") {
                        v = n.format(d.format);
                    }
                }

                $(target).html(v);
            },
            resize: function (target, width) {
                $(target)._outerWidth(width);
            }
        }, focusCtrlDblClickText: {
            init:function(container,options){
                var input = $('<input type="text" class="focusCtrl" />').appendTo(container);
                options = options || {};
                var t = input.textbox(options).textbox('textbox').bind('dblclick', function (e) {
                    if (options.dblclick && $.isFunction(options.dblclick)) {
                        options.dblclick(e);
                    }
                }).bind('click', function () {
                    $(this).select();
                }).bind('blur', function (e) {
                    if (options.blur && $.isFunction(options.blur)) {
                        options.blur(e);
                    }
                }).bind('keyup', function (e) {
                    //enter
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveRight(input);
                        enterNextRowEdit(options.jqGrid[0], input);
                        if (options.onEnter && $.isFunction(options.onEnter)) {
                            var value = $(input).textbox('getValue');
                            options.onEnter(input, value);
                        }
                    }

                    //left
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        moveLeft(input);
                        if (options.onMoveLeft && $.isFunction(options.onMoveLeft)) {
                            options.onMoveLeft(input);
                        }
                    }

                    //up
                    if (e.keyCode === 38) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveUp(options.jqGrid, input);
                        if (options.onMoveUp && $.isFunction(options.onMoveUp)) {
                            options.onMoveUp(input);
                        }
                    }

                    //right
                    if (e.keyCode === 39) {
                        e.preventDefault();
                        moveRight(input);
                        if (options.onMoveRight && $.isFunction(options.onMoveRight)) {
                            options.onMoveRight(input);
                        }
                    }

                    //down
                    if (e.keyCode === 40) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveDown(options.jqGrid, input);
                        if (options.onMoveDown && $.isFunction(options.onMoveDown)) {
                            options.onMoveDown(input);
                        }
                    }
                });
                return input;
            }, destroy: function (target) {
                $(target).textbox('destroy');
            }, getValue: function (target) {
                return $(target).textbox('getText');
            }
            , setValue: function (target, value) {
                $(target).textbox('setText',value);
            }, resize: function (target, width) {
                $(target).textbox('resize',width);
            }
           
        }, focusCtrlDateBox: {
            init: function (container, options) {
                var input = $('<input type="text" class="focusCtrl" />').appendTo(container);
                options = options || {};
                var t = input.datebox(options).next();
                var s = t.find('input[type="text"]');
                s.bind('click', function () {
                    $(this).select();
                }).bind('blur', function (e) {
                    if (options.blur && $.isFunction(options.blur)) {
                        var value = $(input).datebox('getValue');
                        options.blur(e,value);
                    }
                }).bind('keyup', function (e) {
                    //enter
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveRight(input);
                        enterNextRowEdit(options.jqGrid[0], input);
                        if (options.onEnter && $.isFunction(options.onEnter)) {
                            var value = $(input).datebox('getValue');
                            options.onEnter(input, value);
                        }
                    }

                    //left
                    if (e.keyCode === 37) {
                        e.preventDefault();
                        moveLeft(input);
                        if (options.onMoveLeft && $.isFunction(options.onMoveLeft)) {
                            options.onMoveLeft(input);
                        }
                    }

                    //up
                    if (e.keyCode === 38) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveUp(options.jqGrid, input);
                        if (options.onMoveUp && $.isFunction(options.onMoveUp)) {
                            options.onMoveUp(input);
                        }
                    }

                    //right
                    if (e.keyCode === 39) {
                        e.preventDefault();
                        moveRight(input);
                        if (options.onMoveRight && $.isFunction(options.onMoveRight)) {
                            options.onMoveRight(input);
                        }
                    }

                    //down
                    if (e.keyCode === 40) {
                        e.preventDefault();
                        if (!options.jqGrid) return;
                        moveDown(options.jqGrid, input);
                        if (options.onMoveDown && $.isFunction(options.onMoveDown)) {
                            options.onMoveDown(input);
                        }
                    }
                });
                return input;
            }, destroy: function (target) {
                $(target).datebox('destroy');
            }, getValue: function (target) {
                return $(target).datebox('getValue');
            }
            , setValue: function (target, value) {
                $(target).datebox('setValue', value);
            }, resize: function (target, width) {
                $(target).datebox('resize', width);
            }
        }
    });

    $.fn.grid.defaults = $.extend({}, $.fn.datagrid.defaults, {
        singleSelect: true,
        rownumbers: true,
        showFooter: true,
        sumFields: null,
        sheetType: null,
        loadGridColumnsUrl: null,
        saveGridConfigUrl: null,
        customToolbar: true,
        showToolbarAdd: true,
        showToolbarDelete: true,
        showToolbarRefresh: true,
        showToolbarSaveConfig: true,
        showToolbarImport: true,
        showToolbarExport: true,
        showToolbarSearch: true,
        toolBarSearchPrompt:null,
        queryText:"",
        columnDraggable: true,
        columnHiddenCtrl: false,
        editOnClickRow: false,
        resizeLayoutOnResizeColumn: true,
        urlWebService: null,
        showAction: null,
        showCheckbox: null,
        loadOnInit: true,
        useScrollView: true,
        pagingLoadData:false,
        selectOnCheck: false,
        displayEmptyRow: false,
        emptyRowCount: 12,
        footerTextField: null,
        loadMsg: '数据加载中，请稍候...',
        importMenuButtons: null,
        exportMenuButtons: null,
        rowStyler: function (index, row) {
            return 'font-weight:lighter;font-size:12px;';
        },
        reloadFooterHandler: null,
        striped: true,
        onToolbarAddClick: function () {
            appendRow(this);
        },
        onToolbarDeleteClick: function () {
            removeRow(this);
        },
        onAfterEdit: function (index, row) {
            onMyAfterEdit(this, index, row);
        },
        onSaveColumnsConfig: function (configs) { },
        onSearch: function (value, name) { },
        onSearchTextChange: function (newValue, oldValue) { }
    });
})(jQuery);
