/**
 * Created by zhanghuan on 2016/08/09.
 */
var dg;
$(function(){
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    //单据状态切换
    changeStatus();
    //初始化列表
    initBranchPriceAdjustGrid();
   // modifyPriceOrderCx();
    
});

//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
		modifyPriceOrderCx();
    });
}
var gridHandel = new GridClass();
function initBranchPriceAdjustGrid() {
     dg=$("#branchPriceAdjustGrid").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        url: contextPath+'/goods/branchPriceAdjust/getGoodsBranchPriceAdjustList',
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
                	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看调价单详细\',\''+contextPath+'/goods/priceAdjust/showDetail?formNo='+value+'\')">' + value + '</a>';
                	return strHtml;
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
            {field: 'branchCode', title: '机构编码', width: '100px', align: 'left'},
            {field: 'branchName', title: '机构名称', width: '90px', align: 'left'},
            {field: 'createUserName', title: '制单人', width: '120px', align: 'left'},
            {field: 'createTime', title: '制单时间', width: '120px', align: 'left',
            	formatter: function (value, row, index) {
	                if (value != null && value != '') {
	                    var date = new Date(value);
	                    return date.format("yyyy-MM-dd hh:mm");
	                }
	                return "";
	            }
            },
            {field: 'validUserName', title: '审核人', width: '160px', align: 'left'},
            {field: 'validTime', title: '生效日期', width: '100px', align: 'left',
            	formatter: function (value, row, index) {
	                if (value != null && value != '') {
	                    var date = new Date(value);
	                    return date.format("yyyy-MM-dd");
	                }
	                return "";
	            }},
            {field: 'remark', title: '备注', width: '160px', align: 'left'}
        ]],
         onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
         }
    });
}
//新增
function addModifyDataGrid(){
	toAddTab("新增门店调价单",contextPath + "/goods/branchPriceAdjust/addFormView");
}

//删单
function delModifyOrderDialog(){
	var row = $('#branchPriceAdjustGrid').datagrid('getSelected');
	var rowIndex = $('#branchPriceAdjustGrid').datagrid('getRowIndex',row);
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
                        $('#branchPriceAdjustGrid').datagrid('deleteRow', rowIndex);
                    }
                });
            }
        });
    }
}

//datagridId datagrid的Id
var datagridId = "branchPriceAdjustGrid";
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
	dg.datagrid('options').url = contextPath+'/goods/branchPriceAdjust/getGoodsBranchPriceAdjustList';
	dg.datagrid('load', fromObjStr);
}
/**
 * 机构列表下拉选
 */
function selectBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCompleCode);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
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