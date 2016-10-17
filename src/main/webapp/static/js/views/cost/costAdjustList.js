/**
 * Created by wxl on 2016/10/12.
 * 成本调整单-列表
 */
$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequireOrders();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
    $("#costFromList").datagrid({
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
            {field:'adjustNo',title:'单号',width:'140px',align:'left',formatter:function(value,row,index){
            	return "<a style='text-decoration: underline;' href='"+ contextPath +"/cost/costAdjust/edit?id="+ row.id +"'>" + value + "</a>"
            }},
            {field:'status',title: '审核状态', width: '100px', align: 'left',
            	   formatter: function(value,row,index){
            		 
                       if (value==1){
                           return "已审核";
                       }else if(value==2){
                    	   return "不通过";
                       } 
                       else {
                           return "未审核";
                       }
                   }
            },
			{field: 'branchCode', title: '机构编号', width: '200px', align: 'left'},
			{field: 'branchName', title: '机构名称', width: '200px', align: 'left'},
			{field: 'totalMoney', title: '单据金额', width: '80px', align: 'right',
				formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
			},
			{field: 'adjustReasonName', title: '调整原因', width: '200px', align: 'left'},
            {field: 'adjustReason', title: '调整原因', width: '200px', align: 'left',hidden:false},
            {field: 'updateUserName', title: '操作人员', width: '130px', align: 'left'},
            {field: 'updateTime', title: '操作日期', width: '120px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			},
            {field: 'validUserName', title: '审核人员', width: '130px', align: 'left'},
            {field: 'remark', title: '备注', width: '200px', align: 'left',
    		     onLoadSuccess:function(data){
    			gridHandel.setDatagridHeader("center");
    		   }
            }
        ]],
        
    });
    queryForm();
}

//新增入库单
function addStockForm(){
	location.href = contextPath + "/cost/costAdjust/add";
}

//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#costFromList").datagrid("options").method = "post";
	$("#costFromList").datagrid('options').url = contextPath + '/cost/costAdjust/queryList';
	$("#costFromList").datagrid('load', fromObjStr);
	//console.log(fromObjStr);
}

//删除
function delStockForm(){
	var dg = $("#costFromList");
	var row = dg.datagrid("getSelected");
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/cost/costAdjust/deleteCostForm",
		    	type:"POST",
		    	data:{
		    		formId : row.deliverFormId
		    	},
		    	success:function(result){
		    		console.log(result);
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
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'DO','');
}
/**
 * 操作员
 */
function selectOperator(){
	new publicOperatorService(function(data){
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

//打印
function printDesign(){
     var dg = $("#gridRequireOrders");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }
     //弹出打印页面
     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
}

/**
 * 导出
 */
function exportExcel(){
	$("#queryForm").form({
		success : function(data){
			if(data.code > 0){
				$.messager.alert('提示',data.message);
			}
		}
	});

	var isValid = $("#queryForm").form('validate');
	if(!isValid){
		return;
	}

	var length = $("#goodsTab").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/goods/report/exportList");
	$("#queryForm").submit(); 

}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};