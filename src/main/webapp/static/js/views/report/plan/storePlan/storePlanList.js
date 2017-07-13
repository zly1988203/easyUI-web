$(function(){
	//开始和结束时间
	$("#startTime").val(dateUtil.getCurrentYearFirstDate().format("yyyy-MM"));
    $("#endTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    
    $("#branchCodeName").val(sessionBranchCodeName);
    $("#branchCompleCode").val(sessionBranchCompleCode);
    
    initStorePlanList();
    
    //机构选择初始化
    $('#branchSelect').branchSelect();
});
var gridHandel = new GridClass();

var datagridId = 'storePlanList';
//初始化表格 没有成本价权限
function initStorePlanList(){
	var updatePermission = $("#updatePermission").html().trim();
    dg = $("#"+datagridId).datagrid({
        method:'post',
        align:'right',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        //fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
            {field:'branchCode',title:'机构编号',width: 120,align:'left'},
            {field:'branchName',title:'机构名称',width: 120,align:'left'},
            {field:'monthStr',title:'月份',align:'center',width: 80,
            	formatter:function(value,row,index){
            		 var strHtml = "";

                	 if(updatePermission && row.branchId && value){
                		 strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'门店计划详细\',\''+ contextPath +'/target/storePlan/toEdit?branchId='+ row.branchId +'&monthStr='+ value +'\')">' + value + '</a>';
                	 }else{
                		 strHtml = "";
                	 }
                    return strHtml;
                }
            },
            {field:'targetSaleAmount',title:'月目标销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'offlineTargetSaleAmount',title:'线下月目标销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'onlineTargetSaleAmount',title:'线上月目标销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'targetCostAmount',title:'月目标成本',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'saleAmount',title:'总完成额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'totalComplePercentStr',title:'总完成率',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+value+'</b>';
                }
            },
            {field:'offlineSaleAmount',title:'线下完成额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'offlineComplePercentStr',title:'线下完成率',align:'right',width: 100,
            	formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
                }
            },
            {field:'onlineSaleAmount',title:'线上完成额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'onlineComplePercentStr',title:'线上完成率',align:'right',width: 100,
            	formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
                }
            }
        ]],
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
        }       
    });
   // queryForm();
}



//查询入库单
function queryForm(){
	 if($("#branchCodeName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
	var fromObjStr = $('#queryForm').serializeObject();
	if($('#isShowZero').is(':checked')) {
		var isShowZero = $("#isShowZero").val();
		fromObjStr.isShowZero = isShowZero;
	}else{
		fromObjStr.isShowZero = null;
	}
	
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/target/storePlan/getStorePlanList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

//新增门店计划
function addPlan(){
	toAddTab("新增门店计划",contextPath + "/target/storePlan/toAdd");
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};