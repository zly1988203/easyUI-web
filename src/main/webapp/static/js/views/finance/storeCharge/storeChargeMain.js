/**
 * Created by zhaoly on 2017/5/25.
 */

var chargeStatus = "add";
var url = "";
var isdisabled = false;
$(function () {
    chargeStatus = $('#chargeStatus').val();
    if(chargeStatus === "add"){
        $("#branchName").val(sessionBranchName);
        $("#branchId").val(sessionBranchId);
        $("#chargeMonth").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM"));
    }else if(chargeStatus === "edit"){
        $('#already-examine').css('display','none');
         url = contextPath + "/finance/storeCharge/get";
    }else if(chargeStatus === "check"){
        $('#already-examine').css('display','block');
        isdisabled = true;
         url = contextPath + "/finance/storeCharge/check";
    }
    initGridStoreCharge();
})

var gridName = "gridStoreCharge";
var gridHandel = new GridClass();
var gridDefault = {
    chargeAmount:"0.00"
}

function initGridStoreCharge() {
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        align:'center',
        url:url,
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
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
                },
            },
            {field:'chargeCode',title:'费用代码',width:120,align:'left'},
            {field:'chargeName',title:'费用名称',width:180,align:'left'},
            {field:'chargeAmount',title:'费用金额',width:120,align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                        disabled:isdisabled,
                        onChange: onChangeAmount,
                    }
                },
            },
            {field:'remark',title:'备注',width:180,align:'left'},
        ]],
        onClickCell:function(rowIndex,field,value){
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("branchCode");
            }
        },
        onLoadSuccess : function(data) {
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }
    })

    if(chargeStatus === "add"){
        gridHandel.setLoadData([$.extend({},gridDefault)]);
    }
}

function onChangeAmount() {
    updateFooter();
}


//合计
function updateFooter(){
    var fields = {chargeAmount:0};
    var argWhere = {name:'isGift',value:""}//
    gridHandel.updateFooter(fields,argWhere);
}
//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}


function storeChargeAdd() {
    toAddTab("新增门店费用",contextPath + "/finance/storeCharge/toAdd");
}

/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val(data.branchName);
    },'BF','');
}


function saveStoreCharge() {
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({branchCode:1})
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }

    //收货机构
    var branchId = $("#branchId").val();
    //费用月份
    var chargeMonth = $("#chargeMonth").val();
    //
    var remark = $("#remark").val();

    var reqObj = {
        branchId:branchId,
        chargeMonth:chargeMonth,
        remark:remark,
        chargeList:rows
    };

    var param = JSON.stringify(reqObj);

    var url = "";
    if(chargeStatus === "add"){
        url = contextPath + "/finance/storeCharge/add";
    }else if(chargeStatus === "edit"){
        url = contextPath + "/finance/storeCharge/edit";
        var id = $("#formId").val();
        param.id = id;
    }
    ajaxSubmit(url,param,function (result) {
        if(result['code'] == 0){

        }else{

        }
    })
}

function updateStoreCharge() {
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({branchCode:1})
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
}

function selectFinanceCode() {
    
}

function chargeDelete() {
    var id = $("#formId").val();
    var url = contextPath+"/finance/storeCharge/check";
    var param = {
        formId:id,
    }
    $.messager.confirm('提示','是否要删除此条数据',function(data){
        if(data){
            ajaxSubmit(url,param,function (result) {
                if(result['code'] == 0){
                    messager("操作成功");
                    toClose();
                }else{
                    messager(result['message']);
                }
            })

        }
    });
}

function  chargeCheck() {
    var id = $("#formId").val();
    var url = contextPath+"/finance/storeCharge/check";
    var param = {
        formId:id,
        status:1
    }
    ajaxSubmit(url,param,function (result) {
        if(result['code'] == 0){
            $.messager.alert("操作提示", "操作成功！", "info",function(){
                location.href = contextPath +"/finance/storeCharge/toEdit?formId=" + id;
            });
        }else{
            new publicErrorDialog({
                "title":"审核失败",
                "error":result['message']
            });
        }
    })

}

function toImportStoreCharge() {
    
}