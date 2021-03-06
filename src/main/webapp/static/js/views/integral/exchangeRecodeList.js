
$(function(){
	toChangeDate(9);
	$("#startTime").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#endTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initDatagrid();
});

//初始化表格
var dg;
var gridHandel = new GridClass();
function initDatagrid(){
	dg=$("#goodsTab").datagrid({
		//title:'普通表单-用键盘操作',
		align:'center',
		method: 'post',
		//url: contextPath+"/goods/report/getList",
		singleSelect:true,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		pageSize:20,
		height:'100%',
		columns:[[  
		          {field:"id",title:"礼品兑换记录id",hidden:true},  
		          {field:"mobile",title:"会员号",width:200},  
		          {field:"skuCode",title:"货号",width:200}, 
		          {field:"skuName",title:"礼品名称",width:200},
		          {field:"barCode",title:"条码",width:200},
		          {field:"branchName",title:"兑换机构",width:200},
		          {field:"num",title:"兑换数量",width:200,align: "right",},
		          {field:"integral",title:"消耗积分",width:200,align: "right",},
		          {field: "createTime", title: "兑换时间", width: 150, align: "left",formatter : function(createTime){
		    			if(createTime){
		    				var now = new Date(createTime);
		    				var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
		    				return nowStr;
		    			}
		    			return null;
		    		}},
		          ]],
		          onLoadSuccess:function(data){
		              gridHandel.setDatagridHeader("center");
		           }
	});
}

/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
	$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}

/**
 * 导出
 */
function exportData(){
    var length = $("#goodsTab").datagrid('getData').total;
    if(length == 0){
        $_jxc.alert("无数据可导");
        return;
    }
    var param = {
        datagridId:'goodsTab',
        formObj:$("#queryForm").serializeObject(),
        url:contextPath+"/integral/giftExchangeRecode/exportList"
    }
    publicExprotService(param);
}



//查询
function query(){
	var params = $("#queryForm").serializeObject();
	params.branchName = params.branchName.substring(params.branchName.lastIndexOf(']')+1)
	$("#goodsTab").datagrid("options").queryParams = params;
	
	
	$("#goodsTab").datagrid("options").method = "post";
	$("#goodsTab").datagrid("options").url = contextPath+"/integral/giftExchangeRecode/getList";
	$("#goodsTab").datagrid("load");
}

/**
 * 重置
 */
var resetForm = function() {
	location.href = contextPath + "/integral/giftExchangeRecode/view";
};
