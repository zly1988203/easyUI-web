$(function(){
    //初始化默认条件
    initConditionParams();
    
    initDatagridOrders();
    
    //单据状态切换
    changeStatus();
});
var	cleaeBranchId=function(){
	$("#branchId").val("");
};

//单据状态切换
function changeStatus(){
	$(".radioItem").change(function(){
    	query();
    });
}

//初始化默认条件
function initConditionParams(){
    
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridOrders(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
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
            /*{field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+contextPath+'/form/purchase/orderEdit?formId='+row.id+'\')">' + value + '</a>';
            	return strHtml;
            }},*/
            /*{field:'status',title:'审核状态',width:'100px',align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '待审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},*/
            {field:'branchCode',title:'机构编码',width:'140px',align:'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'skuCode',title:'货号',width:'120px',align:'left'},
            {field:'skuName',title:'名称',width:'140px',align:'left'},
            {field:'barCode',title:'条码',width:'80px',align:'right'},
            {field:'unit',title:'单位',width:'80px',align:'right'},
            {field:'spec',title:'规格',width:'80px',align:'right'},
            {field:'applyNum',title:'数量',width:'80px',align:'right'},
            {field:'applyPrice',title:'售价',width:'80px',align:'right'},
            {field:'applyAmount',title:'金额',width:'80px',align:'right'},
            {field:'applyDesc',title:'申请说明',width:'80px',align:'right'},
            {field:'auditDesc',title:'处理意见',width:'80px',align:'right'},
            {field:'formNo',title:'单号',width:'80px',align:'right'},
            /*
				formatter : function(value, row, index) {
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},*/
            
            {field:'createUserName',title:'制单人',width:'130px',align:'left'},
            {field:'createTime',title:'制单时间',width:'130px',align:'left'},
            /*{field:'createTime',title:'操作时间',width:'150px',align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm');
                }
                return "";
            }},*/
            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
    query();
}
function orderAdd(){
	toAddTab("新增采购订单",contextPath + "/form/purchase/orderAdd");
}

function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("options").url = contextPath+'/form/overdue/approved/list';
	$("#gridOrders").datagrid("load");
}

//删除
function orderDelete(){
	var rows =$("#gridOrders").datagrid("getChecked");
	if($("#gridOrders").datagrid("getChecked").length <= 0){
		 $.messager.alert('提示','请选中一行进行删除！');
		return null;
	}
	 var formIds='';
	    $.each(rows,function(i,v){
	    	formIds+=v.id+",";
	    });
	
	$.messager.confirm('提示','是否要删除选中数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/purchase/delete",
		    	type:"POST",
		    	data:{
		    		formIds:formIds
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			successTip("删除成功");
		    		}else{
		    			successTip(result['message']);
		    		}
		    		$("#gridOrders").datagrid('reload');
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

function selectSupplier(){
	new publicSupplierService(function(data){
//		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
function selectOperator(){
	new publicOperatorService(function(data){
		$("#createUserId").val(data.id);
		$("#createUserName").val(data.userName);
	});
}

/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};

function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

var printReport = function(){
	var queryParams =  urlEncode($("#queryForm").serializeObject());
	parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/form/overdue/approved/report/print?params="+queryParams);
}

var urlEncode = function (param, key, encode) {
	  if(param==null) return '';
	  var paramStr = '';
	  var t = typeof (param);
	  if (t == 'string' || t == 'number' || t == 'boolean') {
	    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
	  } else {
	    for (var i in param) {
	      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
	      paramStr += urlEncode(param[i], k, encode);
	    }
	  }
	  return paramStr;
	};

function setParams(formId){  
	var param="";
	var arr = $('#' + formId).serializeArray();
	if(arr != null){
		for(var i=0;i<arr.length;i++){
			var _val = encodeURIComponent(arr[i].value);
			if(_val){
				param = param + arr[i].name + "="+_val+"&";
			}
		}
	}
	if(param){
		param = param.substring(0,param.length-1);
	}
	return param;
}