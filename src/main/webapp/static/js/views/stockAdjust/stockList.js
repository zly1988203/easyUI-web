/**
 * Created by wxl on 2016/10/12.
 * 库存调整-列表
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
    $("#stockFromList").datagrid({
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
            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	return "<a style='text-decoration: underline;' href='"+ contextPath +"/stock/adjust/edit?id="+ row.id +"'>" + value + "</a>"
            }},
            {field:'status',title: '审核状态', width: '100px', align: 'left',formatter:function(value,row,index){
            	if(value == '0'){
            		return '待审核';
            	}else if(value == '1'){
            		return '审核通过';
            	}else if(value == '2'){
            		return '审核失败';
            	}else{
            		return '未知类型：'+ value;
            	}
            }},
			{field: 'branchCode', title: '机构编号', width: '200px', align: 'left'},
			{field: 'branchName', title: '机构名称', width: '200px', align: 'left'},
			{field: 'amount', title: '单据金额', width: '80px', align: 'right',
				formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
			},
            {field: 'reason', title: '调整原因', width: '200px', align: 'left'},
            {field: 'createUserName', title: '操作人员', width: '130px', align: 'left'},
            {field: 'createTime', title: '操作日期', width: '120px', align: 'center',
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
	location.href = contextPath + "/stock/adjust/add?stockType=DI";
}

//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#stockFromList").datagrid("options").method = "post";
	$("#stockFromList").datagrid('options').url = contextPath + '/stock/adjust/getStockFormList';
	$("#stockFromList").datagrid('load', fromObjStr);
}

//删除
function delStockForm(){
	var dg = $("#stockFromList");
	var row = dg.datagrid("getSelected");
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/stock/adjust/deleteStockAdjust",
		    	type:"POST",
		    	data:{
		    		id : row.id
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
		$("#createBranchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
/**
 * 操作员
 */
function selectOperator(){
	new publicOperatorService(function(data){
		$("#salesmanId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

//打印
/*function printDesign(){
     var dg = $("#gridRequireOrders");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }
     //弹出打印页面
     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
}
*/
/**
 * 导出
 */
function exportExcel(){
	debugger;
	var rows = $("#stockFromList").datagrid("getChecked");
	if(rows.length==0){
		$.messager.alert('提示',"无数据可导");
		return ;
	}
	if(rows.length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	
	var ids = [];
	$.each(rows,function(i,row){
		ids.push(row["id"]);
	})
	var objs = $("#queryForm").serialize();
	var param;
	if(ids.length >0){
		param = objs +"&ids="+ids;
	}else{
		param = objs;
	}
	$.ajax({
		url:contextPath+"/stock/adjust/exportList",
		type:'GET',
		data:param,
		success:function(data){
			if(data.code==0){
				
				$.messager.alert('提示',"导出成功");
			}else{
				$.messager.alert('提示',"导出失败");
			}
		},
		error:function(error){
			
		}
	})
	
	$("#queryForm").form({
		success : function(data){
			if(data.code > 0){
				$.messager.alert('提示',data.message);
			}
		}
	});

}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};