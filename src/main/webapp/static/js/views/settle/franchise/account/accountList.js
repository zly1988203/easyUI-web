

$(function(){
	
	initfraAcountList();
})

var datagirdID = 'fraAccountList';

function getAccountColumns(){
	var accountType = $('input[name="type"]:checked').val();
	console.log('accountType',accountType)
	var defaultColumns = [];
	
	defaultColumns =defaultColumns.concat([
             		{field: 'branchCode', title: '加盟店编号', width: '100px', align: 'left'},
           			{field: 'branchName', title: '加盟店', width: '140px', align: 'left'}])
	
	//3 未收账款汇总
	if(accountType != '3'){
		defaultColumns = defaultColumns.concat([
				    {field: 'targetFormNo',title:'单号',width:'150px',align:'left',formatter:function(value,row,index){
	            		var str = "";
	            		if(row.isFooter){
	                        str ='<div class="ub ub-pc">合计</div> '
	                    }else if(value.indexOf('DI') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'入库单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.targetFormId +'&deliverType=DI\')">' + (value||"") + '</a>';
	                    }else if(value.indexOf('DO') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'出库单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.targetFormId +'&formType=DO\')">' + (value||"") + '</a>';
	                    }else if(value.indexOf('PI') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购收货详细\',\''+contextPath+'/form/purchase/receiptEdit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
	                    }else if(value.indexOf('PM') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'直送收货单详细\',\''+contextPath+'/directReceipt/edit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
	                    }else if(value.indexOf('PR') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购退货详细\',\''+contextPath+'/form/purchase/returnEdit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
	                    }else if(value.indexOf('FI') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店预收款明细\',\''+ contextPath +'/settle/franchiseCharge/advanceView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
	                    }else if(value.indexOf('FO') == 0){
	                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店费用明细\',\''+ contextPath +'/settle/franchiseCharge/chargeView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
	                    }
	            		return str;
				    }},
				    {field: 'targetFormType',title: '单据类型', width: '100px', align: 'center'}])
	}
	
	//5 已付账款明细  6预收账款明细
	if(accountType != '5' && accountType != '6' ){
		defaultColumns = defaultColumns.concat([
		           {field: 'payableAmount', title: '应收金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'payedAmount', title: '已收金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'unpayAmount', title: '未收金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}])
	}
	
	//5 已付账款明细
	if(accountType == '5'){
		defaultColumns = defaultColumns.concat([
                    {field: 'payableAmount', title: '收款金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	
	//预收账款明细
	if(accountType == '6'){
		defaultColumns = defaultColumns.concat([
                    {field: 'payableAmount', title: '已付金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'payedAmount', title: '已用金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					},
					{field: 'unpayAmount', title: '未用金额', width: '120px', align: 'right',
						formatter: function (value, row, index) {
							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
						}
					}]);
	}
	
	//3 未收账款汇总
	if(accountType != '3'){
		defaultColumns = defaultColumns.concat([
				{field: 'auditUserName', title: '审核人', width: '120px', align: 'left'},
				{field: 'auditTime', title: '审核时间', width: '150px', align: 'left'}
				])
	}	
	
	//到期账款 历史往来账款
	if(accountType == '2' ){
		defaultColumns = defaultColumns.concat([
				{field: 'payTime', title: '结算日期', width: '100px', align: 'left',
					formatter: function (value, row, index) {
						return new Date().format('yyyy-MM-dd');
					}
				}])
	}	
	
	if(accountType == '1' || accountType == '2' || accountType == '4'){
		defaultColumns = defaultColumns.concat([
				{field: 'remark', title: '备注', width: '200px', align: 'left'}]);
	}
	console.log(defaultColumns,defaultColumns.length);
	return [defaultColumns];
}

//初始化表格
function initfraAcountList(){
    $("#"+datagirdID).datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,         //占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:getAccountColumns(),
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}

/**
 * 机构
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'');
}

function clearBranchCode(obj,branchId){
	var branchName = $(obj).val();
	//如果修改名称
	if(!branchName || 
			(branchName && branchName.indexOf("[")<0 && branchName.indexOf("]")<0)){
		$("#" + branchId +"").val('');
	}
}

function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)

	$("#"+datagirdID).datagrid("options").method = "post";
	$("#"+datagirdID).datagrid('options').url = contextPath + '/settle/franchiseAccountCurrent/getAccountList';
	$("#"+datagirdID).datagrid('load',fromObjStr);
}

/**
 * 导出表单
 */
function exportAccountList(){
	var length = $("#"+datagirdID).datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/settle/franchiseAccountCurrent/exportList");
	$("#queryForm").submit(); 
}