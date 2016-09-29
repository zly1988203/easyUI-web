/**
 * Created by huangj02 on 2016/8/10.
 */
$(function(){
    initDatagridEditOutBoundAdd();
});
var editRowIndex = undefined;      //光标所在当前行
var editField = undefined;      //光标所在当前列
function initDatagridEditOutBoundAdd(){
    $("#gridEditOutBoundAdd").datagrid({
        //title:'普通表单-用键盘操作',
        //method:'get',
        align:'center',
        //url:'../../json/componentEdit.json',
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
            {field:'pc',title:'批次',width:100,align:'center',},
            {field:'pm',title:'品名',width:100,align:'center',},
            {field:'dw',title:'单位',width:100,align:'center',},
            {field:'gg',title:'规格',width:100,align:'center',},
            {field:'xs',title:'箱数',width:100,align:'center',editor:'textbox'},
            {field:'sl',title:'数量',width:100,align:'center',editor:'textbox'},
            {field:'dj',title:'单价',width:100,align:'center',},
             {field:'je',title:'金额',width:100,align:'center'},
             {field:'lsj',title:'零售价',width:100,align:'center'},
             {field:'lsje',title:'零售金额',width:100,align:'center'},
             {field:'scrq',title:'生产日期',width:100,align:'center'},
             {field:'yxrq',title:'有效期限',width:100,align:'center'},
             {field:'slv',title:'税率',width:100,align:'center'},
             {field:'se',title:'税额',width:100,align:'center'},
             {field:'cd',title:'产地',width:100,align:'center'},
             {field:'bz',title:'备注',width:100,align:'center'},
             {field:'dqkc',title:'当前库存',width:100,align:'center'},
             {field:'mbkc',title:'目标库存',width:100,align:'center'},
        ]],
        onClickCell:function(rowIndex,field,value){
            $('#gridEditOutBoundAdd').datagrid('endEdit', editRowIndex);     //结束之前的编辑
            $('#gridEditOutBoundAdd').datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
            editRowIndex = rowIndex;
            editField = field;
            var ed = $('#gridEditOutBoundAdd').datagrid('getEditor', {index:rowIndex,field:editField});
            if(!ed||!ed.target){
                ed = $('#gridEditOutBoundAdd').datagrid('getEditor', {index:rowIndex,field:"hh"});
                editField = "hh";
            }
            $(ed.target).textbox('textbox').focus();

        },
         onLoadSuccess:function(data){
            console.log("onLoadSuccess");
            var rowL = $("#gridEditOutBoundAdd").datagrid("getRows").length;
            if(rowL==0){
                $("#gridEditOutBoundAdd").datagrid("insertRow",{
                    index:0,
                    row:{}
                });
            }
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
    $("#gridEditOutBoundAdd").datagrid({}).datagrid("keyCtr");
    $('#gridEditOutBoundAdd').datagrid('loadData',{ code: '01',rows: []});
}
function getLRFiledName(index,field,type){
    var row = $("#gridEditOutBoundAdd").datagrid('getEditors', index);
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
    $("#gridEditOutBoundAdd").datagrid("insertRow",{
        index:parseInt(index)+1,
        row:{}
    });
    setTimeout(function(){
         $("#gridEditOutBoundAdd").datagrid("loadData",$("#gridEditOutBoundAdd").datagrid("getRows"));
    },10);

    //event.stopPropagation();
}
//删除一行
function delLineHandel(event){
    var index = $(event.target).attr('data-index');
    console.log("addLine"+$(event.target).attr('data-index'));
    $("#gridEditOutBoundAdd").datagrid("deleteRow",index);
        setTimeout(function(){
         $("#gridEditOutBoundAdd").datagrid("loadData",$("#gridEditOutBoundAdd").datagrid("getRows"));
    },10);
}
//保存
function saveItemHandel(e){
    var rows = $("#gridEditOutBoundAdd").datagrid('getRows');
    var saveData = JSON.stringify(rows);
    console.log(saveData);
}