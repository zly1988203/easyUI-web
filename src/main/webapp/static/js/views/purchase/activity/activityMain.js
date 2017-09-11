/**
 * Created by zhaoly on 2017/9/7.
 */
var gridCostId = "gridActivity";
var gridActHandel = new GridClass();

$(function () {
    initConditionParams();
    initGridActivity();

    //机构选择初始化 收货机构
    $('#targetBranch').branchSelect({
        //ajax请求参数
        param: {
            scope: 1,
            selectType: 1,  //多选
        },
        //数据过滤
        loadFilter: function (data) {
            data.isContainChildren = data.allBranch;
            return data;
        }
    });

    //供应商组件初始化
    $('#supplierSelect').supplierSelect({
        loadFilter:function(data){
            data.supplierId = data.id;
            return data;
        }
    })

    if($("#pageStatus").val() === "add"){
        $("#beginTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
        $("#overTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    }else if ($("#pageStatus").val() == "copy"){
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#copyId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }else if($("#pageStatus").val() == "0"){
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#formId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
    }else{
        $_jxc.ajax({url:contextPath+"/pos/wheelsurf/form/edit/detail/"+$("#formId").val()},function (data) {
            $("#gridAddPosAct").datagrid("loadData",data.detail);
        });
        // disabledElement();
    }

})

//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

function initGridActivity() {
    gridActHandel.setGridName(gridCostId);
    $("#"+gridCostId).datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:false,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'skuId',title:'skuId',width:'85px',align:'left',hidden:true},
            {field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'60px',align:'left'},
            {field:'bigCategoryName',title:'类别',width:'60px',align:'left'},


            {field:'price',title:'原进货价',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'price',title:'活动进货价',width:'80px',align:'right',
                formatter : function(value, row, index) {

                    if(row.isFooter){
                        return ;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },

            {field:'remark',title:'备注',width:'200px',align:'left',editor:'textbox'}
        ]],
        onClickCell:function(rowIndex,field,value){
            gridActHandel.setBeginRow(rowIndex);
            gridActHandel.setSelectFieldName(field);
            var target = gridActHandel.getFieldTarget(field);
            if(target){
                gridActHandel.setFieldFocus(target);
            }else{
                gridActHandel.setSelectFieldName("newAmount");
            }
        },
        onLoadSuccess : function() {
            gridActHandel.setDatagridHeader("center");
            updateFooter();
        }
    })

}

//合计
function updateFooter(){
    var fields = {amount:0,newAmount:0,totalMoney:0};
    var argWhere = {name:'isGift',value:""}
    gridActHandel.updateFooter(fields,argWhere);
}