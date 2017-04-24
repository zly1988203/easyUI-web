/**
 * 退货单-列表
 */
$(function() {
	//开始和结束时间
	toChangeDatetime(0);
	
	initDatagridSaleReturnList();
	if(getUrlQueryString('message')=='0'){
		 $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30)+" 00:00");
		queryForm();
    }
	// 单据状态切换
	changeStatus();
});

var datagridID = "saleReturnList";

// 单据状态切换
function changeStatus() {
	$(".radioItem").change(function() {
		queryForm();
	});
}

var gridHandel = new GridClass();
// 初始化表格
function initDatagridSaleReturnList() {
	$("#"+datagridID).datagrid(
			{
				method : 'post',
				align : 'center',
				// toolbar: '#tb', //工具栏 id为tb
				singleSelect : false, // 单选 false多选
				rownumbers : true, // 序号
				pagination : true, // 分页
				fitColumns : true, // 每列占满
				// fit:true, //占满
				showFooter : true,
				height : '100%',
				width : '100%',
				columns : [ [
						{field:'check',checkbox:true},
			            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
			            	if(updatePermission){
			            		var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'退货单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.deliverFormId +'&deliverType=DR\')">' + value + '</a>';
			            		return strHtml;
			            		//return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/deliverForm/deliverEdit?deliverFormId="+ row.deliverFormId +"'>" + value + "</a>";
			            	}else{
			            		return value;
			            	}
			            }},
						{field: 'status',title: '审核状态', width: '100px', align: 'center'},
						{field: 'dealStatus', title: '单据状态', width: '100px', align: 'center'},
						{field: 'sourceBranchName', title: '退货机构', width: '200px', align: 'left'},
						{field: 'targetBranchName', title: '收货机构', width: '200px', align: 'left'},
						{field: 'createUserName', title: '制单人员', width: '130px', align: 'left'},
						{field: 'createTime', title: '制单时间', width: '120px', align: 'center',
							formatter: function (value, row, index) {
								if (value) {
									return new Date(value).format('yyyy-MM-dd hh:mm');
								}
								return "";
							}
						},
						{field: 'validUserName', title: '审核人员', width: '130px', align: 'left'},
						{field: 'validTime', title: '审核时间', width: '120px', align: 'center',
							formatter: function (value, row, index) {
								if (value) {
									return new Date(value).format('yyyy-MM-dd hh:mm');
								}
								return "";
							}
						},
						{field: 'remark', title: '备注', width: '200px', align: 'left'}
					] ],
					onLoadSuccess : function(data) {
						gridHandel.setDatagridHeader("center");
					}

			});
}

// 查询退货单
function queryForm() {
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagridID).datagrid("options").method = "post";
	$("#"+datagridID).datagrid('options').url = contextPath+ '/form/deliverForm/getDeliverForms';
	$("#"+datagridID).datagrid('load', fromObjStr);
}

// 新增退货单
function addDeliverReturn() {
	toAddTab("新增退货单",contextPath + "/form/deliverForm/addDeliverForm?deliverType=DR");
}

//删除退货单
//删除
function delDeliverReturn(){
	var dg = $("#"+datagridID);
	var row = dg.datagrid("getChecked");
	var ids = [];
	for(var i=0; i<row.length; i++){
		ids.push(row[i].deliverFormId);
	}
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除选中数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/deliverForm/deleteDeliverForm",
		    	type:"POST",
		    	contentType:"application/json",
		    	data:JSON.stringify(ids),
		    	success:function(result){
		    		if(result['code'] == 0){
		    			successTip("删除成功");
		    			dg.datagrid('reload');
		    		}else{
		    			successTip(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

/**
 * 制单机构、退货机构
 */
function selectSourceBranch(){
	var targetBranchType = parseInt($("#targetBranchType").val());
    new publicAgencyService(function(data){
        if($("#sourceBranchId").val()!=data.branchesId){
            $("#sourceBranchId").val(data.branchesId);
            $("#sourceBranchName").val("["+data.branchCode+"]"+data.branchName);
            $("#sourceBranchType").val(data.type);
        }
    },'DD');
}

/**
 * 收货机构
 */
function selectTargetBranch(){
	new publicAgencyService(function(data){
        $("#targetBranchId").val(data.branchesId);
        $("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
        $("#targetBranchType").val(data.type);
	},'DZ',$("#sourceBranchId").val());
}

/**
 * 制单人
 */
function selectOperator() {
	new publicOperatorService(function(data) {
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

/**
 * 重置
 */
var resetForm = function() {
	$("#queryForm").form('clear');
};