/**
 * Created by huangj02 on 2016/8/5.
 */
$(function(){
    //初始树
    initShopTree();
    //初始化列表
    initDatagrid();
    //初始化列表-可编辑
    initDatagridEdit();
});
//初始树
function initShopTree(){
    var setting = {
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var zNodes =[
        { id:1, pId:0, name:"所有类别", open:true},
        { id:11, pId:1, name:"进阶"},
        { id:111, pId:11, name:"进阶1"},
        { id:112, pId:11, name:"进阶2"},
        { id:113, pId:11, name:"进阶3"},
        { id:114, pId:11, name:"进阶4"},
        { id:12, pId:1, name:"化妆品"},
        { id:121, pId:12, name:"脸部保养"},
        { id:122, pId:12, name:"身体保养"},
        { id:123, pId:12, name:"手部保养"},
        { id:124, pId:12, name:"唇部保养"},
    ];
    $.fn.zTree.init($("#treeShop"), setting, zNodes);
}

function initDatagrid(){
    $("#grid").datagrid({
        //title:'普通表单-用键盘操作',
        method:'get',
        align:'center',
        url:'../../json/component.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        //fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        columns:[[
            {field:'hh',title:'货号',width:100,align:'center'},
            {field:'pm',title:'品名',width:100,align:'center'},
            {field:'jc',title:'简称',width:100,align:'center'},
            {field:'zbm',title:'自编码',width:100,align:'center'},
            {field:'zjm',title:'助记码',width:100,align:'center'},
            {field:'lbbm',title:'类别编码',width:100,align:'center'},
            {field:'lbmc',title:'类别名称',width:100,align:'center'},
            {field:'ppbm',title:'品牌编码',width:100,align:'center'},
            {field:'ppmc',title:'品牌名称',width:100,align:'center'},
            {field:'jhj',title:'进货价',width:100,align:'center'},
            {field:'pfj',title:'批发价',width:100,align:'center'},
            {field:'lsj',title:'零售价',width:100,align:'center'},
            {field:'mll',title:'毛利率',width:100,align:'center'},
            {field:'hyj',title:'会员价',width:100,align:'center'},
            {field:'spzt',title:'商品状态',width:100,align:'center'},
            {field:'gg',title:'规格',width:100,align:'center'},
            {field:'dw',title:'单位',width:100,align:'center'},
            {field:'gysbm',title:'供应商编码',width:100,align:'center'},
            {field:'gysmc',title:'供应商名称',width:100,align:'center'},
            {field:'cd',title:'产地',width:100,align:'center'},
            {field:'bzqts',title:'保质期天数',width:100,align:'center'},
            {field:'fdbj',title:'分店变价',width:100,align:'center'},
            {field:'tcfl',title:'提成分类',width:100,align:'center'},
        ]]
    });
}

var editRowIndex = undefined;      //光标所在当前行
var editField = undefined;      //光标所在当前列
function initDatagridEdit(){
    $("#grid_edit").datagrid({
        //title:'普通表单-用键盘操作',
        method:'get',
        align:'center',
        url:'../../json/componentEdit.json',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //fitColumns:true,    //占满
        //showFooter:true,
        columns:[[
            {field:'ck',checkbox:true},
            {field:'cz',title:'操作',width:100,align:'center',
                formatter : function(value, row,index) {
                    var str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                        '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    return str;
                },
            },
            {field:'hh',title:'货号',width:100,align:'center',editor:'textbox'},
            {field:'zbm',title:'自编码',width:100,align:'center',},
            {field:'pm',title:'品名',width:100,align:'center',},
            {field:'xs',title:'箱数',width:100,align:'center',editor:'textbox'},
            {field:'sl',title:'数量',width:100,align:'center',editor:'textbox'},
            {field:'zssl',title:'赠送数量',width:100,align:'center',editor:'textbox'},
            {field:'slv',title:'税率',width:100,align:'center',editor:'textbox'},
            {field:'jj',title:'进价',width:100,align:'center',editor:'textbox'},
            {field:'bz',title:'备注',width:100,align:'center',editor:'textbox'},
            {field:'je',title:'金额',width:100,align:'center',editor:'numberbox'},
            {field:'lsj',title:'零售价',width:100,align:'center',},
            {field:'lsje',title:'零售金额',width:100,align:'center',},
            {field:'se',title:'税额',width:100,align:'center',},
            {field:'tcfl',title:'提成分类',width:100,align:'center',},
        ]],
        onClickCell:function(rowIndex,field,value){
            $('#grid_edit').datagrid('endEdit', editRowIndex);     //结束之前的编辑
            $('#grid_edit').datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
            editRowIndex = rowIndex;
            editField = field;
            var ed = $('#grid_edit').datagrid('getEditor', {index:rowIndex,field:editField});
            if(!ed||!ed.target){
                ed = $('#grid_edit').datagrid('getEditor', {index:rowIndex,field:"hh"});
                editField = "hh";
            }
            $(ed.target).textbox('textbox').focus();

        },
    });

    $.extend($.fn.datagrid.methods, {
        keyCtr : function (jq) {
            return jq.each(function () {
                var grid = $(this);
                grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                    switch (e.keyCode) {
                        case 37: //左键
                            var field = getLRFiledName(editRowIndex,editField,'left');
                            var ed = grid.datagrid('getEditor', {index:editRowIndex,field:field});
                            if(ed){
                                $(ed.target).textbox('textbox').focus();
                                setTimeout(function(){
                                    $(ed.target).textbox('textbox').select();
                                },10)
                                editField= field;
                            }
                            break;
                        case 39: //右键
                            var field = getLRFiledName(editRowIndex,editField,'right');
                            var ed = grid.datagrid('getEditor', {index:editRowIndex,field:field});
                            if(ed){
                                $(ed.target).textbox('textbox').focus();
                                setTimeout(function(){
                                    $(ed.target).textbox('textbox').select();
                                },10)
                                editField= field;
                            }
                            break;
                        case 38: //上键
                            if(editRowIndex>0){
                                var lastIndex = editRowIndex-1;
                                grid.datagrid('endEdit', editRowIndex);//结束之前的编辑
                                grid.datagrid('selectRow', lastIndex).datagrid('beginEdit', lastIndex);
                                editRowIndex = lastIndex;
                                var ed = grid.datagrid('getEditor', {index:lastIndex,field:editField});
                                if(ed){
                                    $(ed.target).textbox('textbox').focus();
                                    setTimeout(function(){
                                        $(ed.target).textbox('textbox').select();
                                    },10)
                                }
                            }
                            break;
                        case 40: //下键
                            if(grid.datagrid('getRows').length-editRowIndex>1){
                                var lastIndex = editRowIndex+1;
                                grid.datagrid('endEdit', editRowIndex);//结束之前的编辑
                                grid.datagrid('selectRow', lastIndex).datagrid('beginEdit', lastIndex);
                                editRowIndex = lastIndex;
                                var ed = grid.datagrid('getEditor', {index:lastIndex,field:editField});
                                if(ed){
                                    $(ed.target).textbox('textbox').focus();
                                    setTimeout(function(){
                                        $(ed.target).textbox('textbox').select();
                                    },10)
                                }
                            }
                            break;
                    }
                });
            });
        }
    });
    $("#grid_edit").datagrid({}).datagrid("keyCtr");
}
function getLRFiledName(index,field,type){
    var row = $("#grid_edit").datagrid('getEditors', index);
    var searchField = field;
    for(var i=0;i<row.length;i++){
        if(row[i].field==field){
            if(type=='left'&&i>0){
                searchField = row[i-1].field;
            }
            if(type=='right'&&i<row.length-1){
                searchField = row[i+1].field;
            }
        }
    }
    return searchField;
}
//插入一行
function addLineHandel(event){
    var index = $(event.target).attr('data-index')||0;
    $("#grid_edit").datagrid("insertRow",{
        index:parseInt(index)+1,
        row:{}
    });
    $("#grid_edit").datagrid("loadData",$("#grid_edit").datagrid("getRows"));
    //event.stopPropagation();
}
//删除一行
function delLineHandel(event){
    var index = $(event.target).attr('data-index');
    //console.log("addLine"+$(event.target).attr('data-index'));
    $("#grid_edit").datagrid("deleteRow",index);
    $("#grid_edit").datagrid("loadData",$("#grid_edit").datagrid("getRows"));
}
//保存
function saveItemHandel(e){
    var rows = $("#grid_edit").datagrid('getRows');
    var saveData = JSON.stringify(rows);
    //console.log(saveData);
}
