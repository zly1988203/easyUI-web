/**
 * 加盟店合同-列表
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev", 30));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	
	// 单据状态切换
	changeStatus();
	
	initDatagridRequire();
	//机构组件初始化
	$('#branchSelect').branchSelect();
	
});

// 单据状态切换
function changeStatus() {
	$(".radioItem").change(function() {
		queryForm();
	});
}

var gridHandel = new GridClass();
var datagirdID = 'contractList';
// 初始化表格
function initDatagridRequire() {
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
		pageSize:50,
        columns:[[
                {field:'cb',checkbox:true},
                {field: 'formNo', title: '合同编号', width: '140px', align: 'left',
                	formatter:function(value,row,index){
                    	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店合同明细\',\''+ contextPath +'/settle/franchiseContract/contractEdit?id='+ row.id +'\')">' + value + '</a>';
                		return strHtml;
                    }
                },
                {field: 'formName', title: '合同名称', width: '140px', align: 'left'},
                {field: 'status',title: '审核状态', width: '80px', align: 'center',
                	formatter:function(value,row,index){
                		if(value == '0'){
                			return '未审核';
                		}else if(value == '1'){
                			return '已审核';
                		}else if(value == '2'){
                			return '已终止';
                		}
                		return '';
                	}
                },
      			{field: 'franchiseBranchCode', title: '机构编号', width: '140px', align: 'left'},
    			{field: 'franchiseBranchName', title: '机构名称', width: '140px', align: 'left'},
    			{field: 'franchiseAgentName', title: '经办人', width: '80px', align: 'left'},
    			{field: 'franchiseAgentPhone', title: '联系电话', width: '80px', align: 'left'},
    			{field: 'targetBranchName', title: '所属分公司', width: '80px', align: 'left'},
    			{field: 'validityTimeStart', title: '有效期起', width: '120px', align: 'center',
    				formatter: function (value, row, index) {
    					if (value) {
    						return new Date(value).format('yyyy-MM-dd hh:mm');
    					}
    					return "";
    				}
    			},
    			{field: 'validityTimeEnd', title: '有效期止', width: '120px', align: 'center',
    				formatter: function (value, row, index) {
    					if (value) {
    						return new Date(value).format('yyyy-MM-dd hh:mm');
    					}
    					return "";
    				}
    			},
    			{field: 'createUserName', title: '建档人', width: '80px', align: 'left'},
    			{field: 'createTime', title: '建档时间', width: '120px', align: 'center',
    				formatter: function (value, row, index) {
    					if (value) {
    						return new Date(value).format('yyyy-MM-dd hh:mm');
    					}
    					return "";
    				}
    			},
                {field: 'updateUserName', title: '修改人', width: '80px', align: 'left'},
                {field: 'updateTime', title: '修改时间', width: '120px', align: 'center',
    				formatter: function (value, row, index) {
    					if (value) {
    						return new Date(value).format('yyyy-MM-dd hh:mm');
    					}
    					return "";
    				}
    			},
    			{field: 'auditUserName', title: '审核人', width: '130px', align: 'left'},
    			{field: 'auditTime', title: '审核时间', width: '120px', align: 'center',
    				formatter: function (value, row, index) {
    					if (value) {
    						return new Date(value).format('yyyy-MM-dd hh:mm');
    					}
    					return "";
    				}
    			}
            ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
	queryForm();
}

// 查询加盟店合同
function queryForm() {
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagirdID).datagrid("options").method = "post";
	$("#"+datagirdID).datagrid('options').url = contextPath + '/settle/franchiseContract/getContractList';
	$("#"+datagirdID).datagrid('load', fromObjStr);
}

// 新增加盟店合同
function addContact() {
	toAddTab("新增加盟店合同", contextPath + "/settle/franchiseContract/contractAdd");
}

// 终止加盟店合同
function endContact(){
	var rows =$("#"+datagirdID).datagrid("getChecked");
	if(rows.length <= 0){
		 $_jxc.alert('请选中一行进行终止！');
		return null;
	}
	var tempIds = [];
	rows.forEach(function(data,index){
    	tempIds.push(data.id);
	})
    
	$_jxc.confirm('是否要终止选中数据?',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/franchiseContract/contractTerminate",
		    	data:{
		    		ids:tempIds
		    	}
		    },function(result){
	    		if(result['code'] == 0){
	    			$_jxc.alert("操作成功");
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
	    		$("#"+datagirdID).datagrid('reload');
		    });
		}
	});
}

//删除加盟店合同
function delContact(){
	var rows =$("#"+datagirdID).datagrid("getChecked");
	if(rows.length <= 0){
		 $_jxc.alert('请选中一行进行删除！');
		return null;
	}
	var tempIds = [];
	rows.forEach(function(data,index){
    	tempIds.push(data.id);
	})
    
	$_jxc.confirm('是否要删除选中数据?',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/franchiseContract/contractDelete",
		    	data:{
		    		ids:tempIds
		    	}
		    },function(result){
	    		if(result['code'] == 0){
	    			$_jxc.alert("删除成功");
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
	    		$("#"+datagirdID).datagrid('reload');
		    });
		}
	});
}


// 打印
/*function printList() {
	var fromObjStr = $('#queryForm').serialize();
	parent.addTabPrint("StockLeadPrint","加盟店合同列表打印",contextPath+"/stock/lead/print?"+fromObjStr);
}*/

/**
 * 重置
 */
var resetForm = function() {
	$("#queryForm").form('clear');
};