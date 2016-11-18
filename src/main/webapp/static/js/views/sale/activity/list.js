$(function(){
	//开始和结束时间
	toChangeDatetime(0);
	
	$("#txtStartDate").val("");
	$("#txtEndDate").val("");
	
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
                 return "<a style='text-decoration: underline;' href='"+ contextPath +"/sale/activity/edit?activityId="+ row.id +"'>" + value + "</a>"
              },
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
	var fromObjStr = $('#queryForm').serializeObject();
	$("#saleMange").datagrid("options").method = "post";
	$("#saleMange").datagrid('options').url = contextPath +'/sale/activity/listData';
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

//pos新增
function addActivity(){
	location.href = contextPath + "/sale/activity/add";
}

//删除
function delActivity(){
	var dg = $("#saleMange");
	var row = dg.datagrid("getSelected");
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/sale/activity/delete",
		    	type:"POST",
		    	data:{
		    		formId : row.deliverFormId
		    	},
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
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};