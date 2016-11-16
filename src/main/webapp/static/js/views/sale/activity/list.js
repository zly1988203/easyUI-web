$(function(){
	//开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
var grid = new GridClass();
//初始化表格
function initDatagridRequire(){
	gridHandel.setGridName("saleMange");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("skuCode");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
                },100)
            }else{
               selectGoods(arg);
            }
        },
    })
    $("#saleMange").datagrid({
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
		pageSize:50,
		width:'100%',
        columns:[[
            {field:'activityCode',title:'活动编号',width:'220px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
                    return str;
                }
            },
			{field:'activityName', title: '活动名称', width: '200px', align: 'left'},
			{field:'activityTyep',title:'活动类型',width:'150px',align:'left'},
			{field:'starttime',title:'开始日期',width:'115px',align:'left'},
	        {field:'endtime',title:'结束日期',width:'115px',align:'left'},
	        {field:'categoryName',title:'活动时段',width:'120px',align:'left'},
	        {field:'categoryName',title:'活动状态',width:'80px',align:'left'},
	        {field:'zdpeople',title:'制单人',width:'80px',align:'left'},
	        {field:'categoryName',title:'审核人',width:'80px',align:'left'},
	        {field:'categoryName',title:'审核日期',width:'115px',align:'left'},

      ]],
      onLoadSuccess:function(data){
		gridHandel.setDatagridHeader("center");
			
	 }
    });

}

//查询入库单
function queryForm(){
	if($("#branchName").val()==""){
        messager("请选择店铺名称");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#saleMange").datagrid("options").method = "post";
	$("#saleMange").datagrid('options').url = contextPath + '/categorySale/report/getCategorySaleList';
	$("#saleMange").datagrid('load', fromObjStr);
}

/**
 * 活动店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
/**
 * 导出
 */
function exportExcel(){
	var length = $("#saleMange").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/categorySale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}

function addActivity(){
	location.href = contextPath + "/sale/activity/add";
}

//终止
function stop(){
	$.messager.confirm('提示','是否终止？',function(data){
		if(data){
			$.ajax({
				url : contextPath+"/form/deliverForm/stopped",
				type : "POST",
				data : {
					deliverFormId : $("#formId").val(),
					deliverType : 'DA'
				},
				success:function(result){
					if(result['code'] == 0){
						$.messager.alert("操作提示", "操作成功！", "info",function(){
							location.href = contextPath +"/form/deliverForm/deliverEdit?deliverFormId=" + result["formId"];
						});
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
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};