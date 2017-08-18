/**
 * Created by zhaoly on 2017/8/17.
 */

$(function () {
    initKeygrid();
    initGoodsgrid();
    //机构选择初始化 发货机构
    $('#branchTemp').branchSelect({
        //数据过滤
        onAfterRender:function(data){
            getGroupList(data.branchId);
        }
    });
})

var keygridHandle = new GridClass();
var keygridDefault = {
    groupNo:"01",
    groupName:"热销商品",
    sortNo:01
}
function  initKeygrid() {
    keygridHandle.setGridName("keygrid");
    $("#keygrid").datagrid({
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'300px',
        width:'100%',
        pageSize:50,
        columns:[[
            {field:'id',title:'id',width:'85px',align:'left',hidden:true},
            {field:'groupNo',title:'分组编号',width:'85px',align:'left',
                formatter : function(value, row,index) {
                    var str =  '<a name="edit" onclick="editKeyGroup('+index+')" ' +
                        ' class="ualine">'+value+'</a>';

                    return str;
                },
            },
            {field:'groupName',title:'分组名称',width:'85px',align:'left'},
            {field:'sortNo',title:'排序',width:'85px',align:'right',
                formatter:function(value,row,index){
                    return  '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
        ]],
        onClickCell : function(rowIndex, field, value) {
            keygridHandle.setBeginRow(rowIndex);
            keygridHandle.setSelectFieldName(field);
            var target = keygridHandle.getFieldTarget(field);
            if(target){
                keygridHandle.setFieldFocus(target);
            }else{
                keygridHandle.setSelectFieldName("sort");
            }
        },
        onSelect:function (rowIndex,rowData) {
            if(rowData.code == "01"){
                $('#btnHot').addClass('ubtns-item').removeClass('ubtns-item-disabled event-none');
            }else{
                $('#btnHot').removeClass('ubtns-item').addClass('ubtns-item-disabled event-none');
            }
        },
        onLoadSuccess:function(data){
            keygridHandle.setDatagridHeader("center");
        }
    })
    keygridHandle.setLoadData([$.extend({},keygridDefault)]);
}
var cardDialog = null;
function editKeyGroup(index) {
    $('#keygrid').datagrid('selectRow',index);
    var item =  $("#keygrid").datagrid('getSelected');
    cardDialog = $('<div/>').dialog({
        href: contextPath+"/pos/group/key/editGroup/",
        width:400,
        height:300,
        title: "编辑分组",
        closable: true,
        resizable: true,
        onClose: function () {
            $(cardDialog).panel('destroy');
            cardDialog = null;
        },
        modal: true,
        onLoad: function () {
            initKeyGroupData(item);
        }
    })
}

function closeCardDialog() {
    $(cardDialog).panel('destroy');
    cardDialog = null;
}


var goodsgridHandel = new GridClass();
var gridDefault = {
    sort:0,
}
function  initGoodsgrid() {
    goodsgridHandel.setGridName("goodsgrid");
    goodsgridHandel.initKey({
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                goodsgridHandel.addRow(parseInt(goodsgridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    goodsgridHandel.setBeginRow(goodsgridHandel.getSelectRowIndex()+1);
                    goodsgridHandel.setSelectFieldName("skuCode");
                    goodsgridHandel.setFieldFocus(goodsgridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
                selectGoods(arg);
            }
        },
    })

    $("#goodsgrid").datagrid({
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'380px',
        width:'100%',
        pageSize:50,
        columns:[[
            {field:'ck',checkbox:true},
            {field:'cz',title:'操作',width:'60px',align:'center',
                formatter : function(value, row,index) {
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }else{
                        str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
                            '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
                    }
                    return str;
                }
            },

            {field:'skuCode',title:'货号',width: '70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'150px',align:'left'},
            {field:'barCode',title:'类别名称',width:'150px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'price',title:'零售价',width:'80px',align:'right'},
            {field:'skuName',title:'简称',width:'200px',align:'left'},
            {field:'sort',title:'排序',width:'200px',align:'right',
                formatter:function(value,row,index){
                    return  '<b>'+parseFloat(value||0).toFixed(0)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
        ]],
        onClickCell : function(rowIndex, field, value) {
            goodsgridHandel.setBeginRow(rowIndex);
            goodsgridHandel.setSelectFieldName(field);
            var target = goodsgridHandel.getFieldTarget(field);
            if(target){
                goodsgridHandel.setFieldFocus(target);
            }else{
                goodsgridHandel.setSelectFieldName("sort");
            }
        },

        onLoadSuccess:function(data){
            goodsgridHandel.setDatagridHeader("center");
        }
    })
    goodsgridHandel.setLoadData([$.extend({},gridDefault)])
}


//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    goodsgridHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    goodsgridHandel.delRow(index);
}

function saveform() {
    $("#keygrid").datagrid("endEdit", keygridHandle.getSelectRowIndex());

    if(!$("#branchId").val()){
        $_jxc.alert("请选择机构");
        return;
    }

    var param = {
        jsontext:JSON.stringify(keygridHandle.getRows()),
        branchId :$("#branchId").val()
    };
    $_jxc.ajax({
        url:contextPath+'/pos/group/key/save/groups',
        data: param,
    },function(result){
        if(result.code == 0){

        }else{
            $_jxc.alert(result['message']);
        }
    })

}

function copyfrom() {
    if(!$("#branchId").val()){
        $_jxc.alert("请选择机构");
        return;
    }
    var param = {
        branchTypesStr:$_jxc.branchTypeEnum.OWN_STORES+','+$_jxc.branchTypeEnum.FRANCHISE_STORE_B+','+$_jxc.branchTypeEnum.FRANCHISE_STORE_C
    }

    //按钮弹框选择机构
    publicBranchesService(param,function (data) {
        if(data == 'NO') return;

        $_jxc.confirm("是否确定从选择机构复制数据到当前机构?",function (r) {
            if(!r)return;
            getGroupList(data.branchId);
        })
    });
}

function getGroupList(branchId) {
    var param = {
        branchId :""
    }
    if(!branchId){
        param.branchId = $("#branchId").val();
    }else {
        param.branchId = branchId;
    }

    $_jxc.ajax({
        url:contextPath+'/pos/group/key/list',
        data:param,
    },function(result){
        if(result.code == 0){
            keygridHandle.setLoadData(result.data.list);
        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function addgroup() {
    if(!$("#branchId").val()){
        $_jxc.alert("请选择机构");
        return;
    }
    cardDialog = $('<div/>').dialog({
        href: contextPath+"/pos/group/key/addGroup/"+$("#branchId").val(),
        width:400,
        height:300,
        title: "新增分组",
        closable: true,
        resizable: true,
        onClose: function () {
            $(cardDialog).panel('destroy');
            cardDialog = null;
        },
        modal: true,
        onLoad: function () {

        }
    })

}

function delgroup() {
    var row = $("#keygrid").datagrid("getSelected");
    if(!row){
        $_jxc.alert("请选择一条分组");
        return;
    }

    $_jxc.confirm("是否删除选中数据",function (r) {
        if(!r)return;

        if(row.code == "01"){
            $_jxc.alert("该分组为系统固定分组，不能删除！");
            return;
        }

        $_jxc.ajax({
            url:contextPath+'/pos/group/key/del/group/'+row.id
        },function(result){
            if(result.code == 0){
                $_jxc.alert("删除分组成功",function () {
                    getGroupList($("#branchId").val());
                })
            }else{
                $_jxc.alert(result['message']);
            }
        })

    })

}

function savegoods() {
    var param = {
        branchId : data.branchId
    }
    $_jxc.ajax({
        url:contextPath+'/pos/group/key/save/groups',
        data:param,
    },function(result){
        if(result.code == 0){

        }else{
            $_jxc.alert(result['message']);
        }
    })
}

function hotgoods() {

    var branchId = $("#branchId").val();
    if(!branchId){
        $_jxc.alert("请先选择机构");
        return;
    }

    var param = {
        branchId : data.branchId
    }
    $_jxc.ajax({
        url:contextPath+'/common/chargeSelect/getChargeComponentList',
        data:param,
    },function(result){
        if(result.code == 0){
            $("#goodsgrid").datagrid("loadData",result.list);
        }else{
            $_jxc.alert(result['message']);
        }
    })
}


function selectGoods(searchKey) {
    var branchId = $("#branchId").val();
    if(!branchId){
        $_jxc.alert("请先选择机构");
        return;
    }

    var queryParams = {
        type:'PA',
        key:searchKey,
        isRadio:0,
        'branchId': $('#branchId').val(),
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
    };

    new publicGoodsServiceTem(queryParams,function(data){
        if(data.length==0){
            return;
        }
        if(searchKey){
            $("#goodsgrid").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#goodsgrid").datagrid("acceptChanges");
        }

        var nowRows = goodsgridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = goodsgridHandel.addDefault(data,gridDefault);

        var argWhere ={skuCode:1};  //验证重复性
        var isCheck ={isGift:1 };   //只要是赠品就可以重复
        var newRows = goodsgridHandel.checkDatagrid(nowRows,addDefaultData,argWhere,isCheck);

        $("#goodsgrid").datagrid("loadData",newRows);

        setTimeout(function(){
            goodsgridHandel.setBeginRow(goodsgridHandel.getSelectRowIndex()||0);
            goodsgridHandel.setSelectFieldName("sort");
            goodsgridHandel.setFieldFocus(goodsgridHandel.getFieldTarget('sort'));
        },100)
    });


}