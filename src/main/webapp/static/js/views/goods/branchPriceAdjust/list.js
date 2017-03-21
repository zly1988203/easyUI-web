/**
 * Created by zhanghuan on 2016/08/09.
 */
var dg;
$(function(){
    //开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    //单据状态切换
    changeStatus();
    //初始化列表
    initBranchPriceAdjustGrid();
    //modifyPriceOrderCx();
    
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
        url: '',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
         height:'100%',
         pageSize:20,
        //showFooter:true,
        columns: [[
            {field : 'formId',hidden : true},
            {field:'check',checkbox:true},
            {field: 'formNo', title: '单号', width: '135px', align: 'left',
                formatter: function(value,row,index){
                	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看调价单详细\',\''+contextPath+'/goods/branchPriceAdjust/getForm?formNo='+value+'\')">' + value + '</a>';
                	return strHtml;
                }
            },
            {field: 'status', title: '审核状态', width:'90px', align: 'center',
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
	                    return date.format("yyyy-MM-dd hh:mm:ss");
	                }
	                return "";
	            }
            },
            {field: 'validUserName', title: '审核人', width: '160px', align: 'left'},
            {field: 'validTime', title: '生效日期', width: '100px', align: 'center',
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
	var oldBranchName = $("#oldBranchName").val();
	var oldCreateUserName = $("#oldCreateUserName").val();
	var branchName = $("#branchName").val();
	var createUserName = $("#createUserName").val();
	if(!branchName && branchName != oldBranchName ){
		$("#branchId").val('');
		$("#branchCode").val('');
	}
	if(!createUserName && createUserName != oldCreateUserName ){
		$("#createUserId").val('');
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
		$("#oldBranchName").val("["+data.branchCode+"]"+data.branchName);
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
		$("#oldCreateUserName").val(data.userName);
		$("#createUserName").val("["+data.userCode+"]"+data.userName);
	});
}
function delModifyPriceDialog() {
	debugger;
	// 是否选择的datagrid的行，选择为true，未选择为false，则提示用户选择
	// 确定删除，调用后台删除方法
	var rows = $('#branchPriceAdjustGrid').datagrid('getSelections');
	
	var dg = $("#branchPriceAdjustGrid");
	var row = dg.datagrid("getChecked");
	var ids = [];
	if(row.length <= 0){
		$.messager.alert("提示","请先选择数据！");
		return;
	}
	var checkFlag = false; //审核标示
	for(var i=0; i<row.length; i++){
		ids.push(row[i].deliverFormId);
		if(row[i].status == '1'){
			checkFlag = true;
		}
	}
	if(checkFlag){
		$.messager.alert("提示","已经审核的单据不可以删除");
		return;
	}
	
	if(datagridUtil.isSelectRows()){
		var ids = '';
		 $.each(rows,function(i,val){
			 ids+=val.formId+",";
		 });
			$.messager.confirm('提示', '单据删除后将无法恢复，确认是否删除？', function(r) {
				if (r) {
					//删除单据
					$.ajax({
						type: "POST",
						url: contextPath+"/goods/branchPriceAdjust/bacthDeleteForm",
						data: {ids:ids},
						dataType: "json",
						success: function(data){
							modifyPriceOrderCx();
						}
					});
				}
			});
	}
}
/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};