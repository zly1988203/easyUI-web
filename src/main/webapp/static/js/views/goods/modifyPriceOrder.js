/**
 * Created by zhanghuan on 2016/08/09.
 */
var dg;
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    //初始化列表
    initModifyPriceGrid();
    modifyPriceOrderCx();
    
});
var gridHandel = new GridClass();
function initModifyPriceGrid() {
     dg=$("#modifyPriceGrid").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        url: '',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: true,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
         height:'100%',
         pageSize:20,
        //showFooter:true,
        columns: [[
            {field: 'formNo', title: '单号', width: '135px', align: 'left',
                formatter: function(value,row,index){
                    return "<a href="+contextPath+"/goods/priceAdjust/showDetail?formNo="+value+" class='ualine'>"+value+"</a>";
                }
            },
            {field: 'status', title: '审核状态', width:'90px', align: 'left',
                formatter: function(value,row,index){
                    if (value==1){
                        return "已审核";
                    } else {
                        return "未审核";
                    }
                }
            },
            {field: 'branchAreaCode', title: '区域编码', width: '100px', align: 'left'},
            {field: 'branchAreaName', title: '区域名称', width: '90px', align: 'left'},
            {field: 'createUserName', title: '操作员', width: '120px', align: 'left'},
            {field: 'createTime', title: '操作日期', width: '100px', align: 'left',
            	formatter: function (value, row, index) {
	                if (value != null && value != '') {
	                    var date = new Date(value);
	                    return date.format("yyyy-MM-dd");
	                }
	                return "";
	            }
            },
            {field: 'validUserName', title: '审核人', width: '160px', align: 'left'},
            {field: 'remark', title: '备注', width: '160px', align: 'left'},
            {field: 'createBranchName', title: '制单机构', width: '100px', align: 'left'}
        ]],
         onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
         }
    });
}
//新增
function addModifyDataGrid(){
	window.location.href=contextPath+"/goods/priceAdjust/addFormView";
}

//删单
function delModifyOrderDialog(){
	var row = $('#modifyPriceGrid').datagrid('getSelected');
	var rowIndex = $('#modifyPriceGrid').datagrid('getRowIndex',row);
	if(row!=null&&row.status==1){
		 $.messager.confirm('提示','已经审核的单据不可以删除！');
		return;
	}
    if(datagridUtil.isSelectRows()){
        $.messager.confirm('提示','单据删除后将无法恢复，确认是否删除？',function(r){
            if (r){
            	//删除单据
            	gFunStartLoading();
            	$.ajax({
                    type: "POST",
                    url: contextPath+"/goods/priceAdjust/removeForm",
                    data: {"formNo":row.formNo},
                    dataType: "json",
                    success: function(data){
                    	gFunEndLoading();
                        $('#modifyPriceGrid').datagrid('deleteRow', rowIndex);
                    }
                });
            }
        });
    }
}

//datagridId datagrid的Id
var datagridId = "modifyPriceGrid";
//datagrid的常用操作方法
var datagridUtil = {
    isSelectRows:function(){
        if($("#"+datagridId).datagrid("getSelections").length <= 0){
            $.messager.alert('提示','没有单据可以删除，请选择一笔单据再删除？');
            return false;
        }else{
            return true;
        }
    }
}

//查询
function modifyPriceOrderCx(){
	var isValid = $('#searchForm').form('validate');
	if (!isValid) {
		return isValid;
	}
	var fromObjStr = $('#searchForm').serializeObject();
	dg.datagrid('options').method = "post";
	dg.datagrid('options').url = contextPath+'/goods/priceAdjust/queryByCondition';
	dg.datagrid('load', fromObjStr);
}

/**
 * 导出
 */
/*function exportData(){
	var isValid = $("#searchForm").form('validate');
	if(!isValid){
		return isValid;
	}
	var length = $("#modifyPriceGrid").datagrid('getData').total;
	console.info($("#searchForm").serializeObject());
	if(length == 0){
		$.messager.alert("无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#searchForm").attr("action",contextPath+'/goods/priceAdjust/exportList');
	$("#searchForm").submit();	
}*/
/**
 * 机构列表下拉选
 */
function selectBranch (){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#createBranchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}
/**
 * 操作员列表下拉选
 */
function selectOperator(){
	new publicOperatorService(function(data){
		//data.Id
		$("#createUserId").val(data.id);
		$("#createUserName").val("["+data.userCode+"]"+data.userName);
	});
}

/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};