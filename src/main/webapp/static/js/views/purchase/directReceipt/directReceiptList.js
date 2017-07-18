
var gridName = "gridDirectList";

$(function(){
	initConditionParams();
	
	//待处理采购订单
	initDatagridFormPA();
	
	//直送收货单
	initDirectDatagrid();
	
	changeStatus();
	
	$('#tabs').tabs({
		border:false,
		onSelect:function(title){
			changeBtnStatus();
			query();
		}
	});
	
	initTabGrid();
	changeBtnStatus();
})


//改变btn操作
function changeBtnStatus(){
	var _index = getTabIndex();
	if(_index == 0){
		$('#addBtn').removeClass('ubtns-item').addClass('ubtns-item-disabled event-none');
		$('#delBtn').removeClass('ubtns-item').addClass('ubtns-item-disabled event-none');
		$('#printBtn').removeClass('ubtns-item-disabled event-none').addClass('ubtns-item');
	}else if(_index == 1){
		$('#addBtn').addClass('ubtns-item').removeClass('ubtns-item-disabled event-none');
		$('#delBtn').addClass('ubtns-item').removeClass('ubtns-item-disabled event-none');
		$('#printBtn').addClass('ubtns-item-disabled event-none').removeClass('ubtns-item');
	}
}

//初始化默认条件
function initConditionParams(){
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}


//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
	  	query();
	});
}


var gridHandel = new GridClass();

function query(){
	var oldBranchName = $("#oldBranchName").val();
	var branchName = $("#branchName").val();
	if(oldBranchName && oldBranchName != branchName){
		$("#branchId").val('');
		$("#branchCompleCode").val('');
	}
	
	var oldOperateUserName = $("#oldOperateUserName").val();
	var operateUserName = $("#operateUserName").val();
	if(oldOperateUserName && oldOperateUserName != operateUserName){
		$("#operateUserId").val('');
	}
	
	var oldSupplierName = $("#oldSupplierName").val();
	var supplierName = $("#supplierName").val();
	if(oldSupplierName && oldSupplierName != supplierName){
		$("#supplierId").val('');
	}
	
	var _index = getTabIndex();
	
	if(_index == 1){
		//直送收货单
		$("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
		$("#"+gridName).datagrid("options").method = "post";
		$("#"+gridName).datagrid("options").url = contextPath+'/directReceipt/getList';
		$("#"+gridName).datagrid("load");
	}else if(_index == 0){
		//待处理采购订单
		$("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
		$("#"+gridName).datagrid("options").method = "post";
		$("#"+tableIdName).datagrid("options").url = contextPath+'/form/purchaseSelect/getPurchaseFormList';
		$("#"+tableIdName).datagrid("load");
	}
}

//收货机构
function selectBranch(){
    new publicBranchService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
        $("#oldBranchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}

//制单人
function selectOperator(){
    new publicOperatorService(function(data){
        $("#operateUserId").val(data.id);
        $("#operateUserName").val("["+data.userCode+"]"+data.userName);
        $("#oldOperateUserName").val("["+data.userCode+"]"+data.userName);
    });
}

//选择供应商
function selectSupplier(){
    new publicSupplierService(function(data){
        $("#supplierId").val(data.id);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
        $("#oldSupplierName").val("["+data.supplierCode+"]"+data.supplierName);
    });
}

//新增直送收货单
function directAdd(){
		toAddTab("新增直送收货单",contextPath + "/directReceipt/add");
}

//删除直送收货单 批量
function directDelete(){
	var rows = $("#"+gridName).datagrid("getChecked");
	if($("#"+gridName).datagrid("getChecked").length <= 0){
		 $_jxc.alert('请选中一行进行删除！');
		return null;
	}
	
    var formIds = [];
	var flag = true;
	rows.forEach(function(data,index){
		formIds.push(data.id);
	});
	
	$_jxc.confirm('是否要删除选中数据?',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/directReceipt/delete",
		    	data:{
		    		formIds:formIds
		    	}
		    },function(result){
	    		
	    		if(result['code'] == 0){
	    			$_jxc.alert("删除成功");
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
	    		$("#"+gridName).datagrid('reload');
		    });
		}
	});
}

//获取tabindex
function getTabIndex(){
	var index = -1;
	var tab = $('#tabs').tabs('getSelected');
	var index = $('#tabs').tabs('getTabIndex',tab);
	return index;
}

function initTabGrid(){
	query();
}



var tableIdName = 'receiptOrderList';
//初始化表格 单据选择（采购）
function initDatagridFormPA(){
	$("#"+tableIdName).datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        /*queryParams : {},*/
        //url:contextPath+tempURL,
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
            {field:'check',checkbox:true},
            {field:'formNo',title:'单号',width:'200px',align:'left',formatter:function(value,row,index){
				var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'新增采购收货单\',\''+ contextPath +'/form/purchase/addReceiptForm?id='+ row.id +'&formType=PI\')">' + value + '</a>';
				return strHtml;
			}},
            {field:'branchName',title:'收货机构',width:200,align:'left'},
            {field:'supplierName',title:'供应商',width:200,align:'left'},
            {field:'amount',title:'单据金额',width:200,align:'right',
            	formatter : function(value, row, index) {
            		return parseFloat(value||0).toFixed(2);
            	}
            },
            {field:'validTime',title:'审核时间',width:200,align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }}
        ]],
        onLoadSuccess : function() {
        	$('.datagrid-header').find('div.datagrid-cell').css('text-align','center');
        },
    });

    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice(tableIdName,["amount"])
    }
}


function initDirectDatagrid(){
	gridHandel.setGridName("gridDirectReceipt");
    $("#"+gridName).datagrid({

        method:'post',
        align:'center',

        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'直送收货单详细\',\''+contextPath+'/directReceipt/edit?formId='+row.id+'\')">' + value + '</a>';
            	return strHtml;
            }},
            {field:'branchCode',title:'收货机构',width:'120px',align:'left'},
            {field:'status',title:'审核状态',width:'100px',align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '未审核';
            	}else if(value == '1'){
            		return '已审核';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'80px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'amount',title:'总金额',width:100,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'formNo',title:'采购单号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'直送收货单详细\',\''+contextPath+'/directReceipt/edit?formId='+row.id+'\')">' + value + '</a>';
            	return strHtml;
            }},
            {field:'createUserName',title:'操作人',width:'130px',align:'left'},
            {field:'createTime',title:'操作时间',width:'150px',align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }},
            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    //query();
}

//打印
function printList() {
	var fromObjStr = $('#queryForm').serialize();
	
	parent.addTabPrint("DirectReceiptPrint","直送收货单列表打印",contextPath+"/directReceipt/print?"+fromObjStr);
}


