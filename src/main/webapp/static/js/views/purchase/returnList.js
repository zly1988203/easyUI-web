/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
	//初始化默认条件
    initConditionParams();
    
    initDatagridOrders();
});

//初始化默认条件
function initConditionParams(){
    
	var startTime = dateUtil.getPreMonthDateStr();
    var endTime = dateUtil.getCurrentDateStr();
    
    //开始和结束时间
    $("#txtStartDate").val(startTime);
    $("#txtEndDate").val(endTime);
    
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridOrders(){
    $("#gridOrders").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //url:contextPath+'/form/purchase/returnListData',
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
            	return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/purchase/returnEdit?formId="+ row.id +"'>" + value + "</a>"
            }},
            {field:'status',title:'审核状态',width:'100px',align:'left',formatter:function(value,row,index){
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
            {field:'branchName',title:'退货机构',width:'140px',align:'left'},
            {field:'supplierCode',title:'供应商编号',width:'200px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'amount',title:'总金额',width:'120px',align:'right',
                formatter : function(value, row, index) {
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'updateUserName',title:'操作员',width:'130px',align:'left'},
            {field:'createTime',title:'操作日期',width:'150px',align:'center', formatter: function (value, row, index) {
                if (value) {
                	return new Date(value).format('yyyy-MM-dd hh:mm:ss');
                }
                return "";
            }},
            {field:'validUserName',title:'审核人',width:'130px',align:'left'},
            {field:'remark',title:'备注',width:'200px',align:'left'}
        ]]
    });
    query();
}
function receiptAdd(){
	location.href = contextPath + "/form/purchase/returnAdd";
}
function query(){
	$("#gridOrders").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid("options").url = contextPath+'/form/purchase/returnListData';
	$("#gridOrders").datagrid("load");
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}
function selectOperator(){
	new publicOperatorService(function(data){
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}
function selectBranch(){
	new publicBranchService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},0);
}

//打印
function printDesign(){
     var dg = $("#gridOrders");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }
     //弹出打印页面
     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
}

/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};


