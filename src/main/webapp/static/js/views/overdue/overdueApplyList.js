$(function(){
    //初始化默认条件
    initConditionParams();
    initDatagridOrders();
    
    //单据状态切换
    changeStatus();
});

var cleaeBranchId=function(){
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
    
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
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
            {field:'formNo',title:'单号',width:'140px',align:'left',formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看调价申请单\',\''+contextPath+'/form/overdue/edit/'+row.id+'\')">' + value + '</a>';
            	return strHtml;
            }},
            {field:'status',title:'状态',width:'100px',align:'center',formatter:function(value,row,index){
            	if(value == '0'){
            		return '未审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未提交';
            	}
            }},
            {field:'branchCode',title:'机构编码',width:'140px',align:'left'},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'createUserName',title:'制单人',width:'130px',align:'left'},
            {field:'createTime',title:'制单时间',width:'130px',align:'left'},
            
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
	toAddTab("新增调价申请单",contextPath + "/form/overdue/add");
}

function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("options").url = contextPath+'/form/overdue/apply/list/data';
	$("#gridOrders").datagrid("load");
}

//删除
function orderDelete(){
	var rows =$("#gridOrders").datagrid("getChecked");
	if($("#gridOrders").datagrid("getChecked").length <= 0){
		 $_jxc.alert('请选中一行进行删除！');
		return null;
	}
	var checkFlag = false; //审核标示
	

	 var formIds='';
	    $.each(rows,function(i,v){
	    	formIds+=v.id+",";
	    	if(rows[i].status == '1'){
				checkFlag = true;
			}
	    });
	    if(checkFlag){
			$_jxc.alert("不能删除已审核的单据！");
			return;
		}
	$_jxc.confirm('是否要删除选中数据?',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/form/overdue/delete",
		    	data:{
		    		formIds:formIds
		    	}
		    },function(result){
	    		
	    		if(result['code'] == 0){
	    			$_jxc.alert("删除成功");
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
	    		$("#gridOrders").datagrid('reload');
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
	parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/form/overdue/report/print?params="+queryParams);
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
