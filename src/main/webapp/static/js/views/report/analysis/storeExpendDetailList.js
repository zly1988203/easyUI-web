/*----------门店费用开支明细报表-------------------*/
$(function(){
	//开始和结束时间
    $("#rptDate").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
    
    $('#branchSelect').branchSelect();
    
    initDataStoreExpendDetailReport();
});

var datagridKey = 'gridStoreExpendDetail';
var gridHandel = new GridClass();
var inited = false;
var queryColumns = [];

//初始化表格
function initDataStoreExpendDetailReport(){
	gridHandel.setGridName(datagridKey);
	
	dg = $("#"+datagridKey).datagrid({
        align:'right',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:false,    //分页
        showFooter:true,
		height:'100%',
		width:'100%',
		url:"",
		columns:queryColumns,
        onLoadSuccess:function(data){
        	if(data.rows.length < 1) {
        		$(this).datagrid('reloadFooter',[])
        		return;
        	}
        	gridHandel.setDatagridHeader("center");
        	//updateFooter();
        }       
    });
	inited = true;
   // queryForm();
	
}

function queryForm(){
	 if($("#branchName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
	var fromObjStr = $('#queryForm').serializeObject();
	
	var param = {
        url :contextPath+"/report/storeExpendDetail/getColumns",
        data:fromObjStr
    }

    $_jxc.ajax(param,function (result) {
        if(result.code == 0){
        	if(!result.data){
        		return;
        	}
        	
        	var flg = result.flg;
        	if(flg === true){
        		$_jxc.alert("店铺数据较多，只展示20个店铺数据，如需查看所有请导出excel查看。");
        	}
        	
        	queryColumns = eval("(" + result.data + ")");
        	
        	initDataStoreExpendDetailReport();
        	
        	$("#"+datagridKey).datagrid("options").method = "post";
        	$("#"+datagridKey).datagrid('options').url = contextPath + '/report/storeExpendDetail/getList';
        	$("#"+datagridKey).datagrid('load', fromObjStr);
        }else{
        	queryColumns = [];
        	initDataStoreExpendDetailReport();
        	$("#"+datagridKey).datagrid('loadData', []);
            $_jxc.alert("店铺数据为空!");
        }
    });
	
}

function exportData(){
	if(inited == false){
		$_jxc.alert("请先查询数据");
		return;
	}
		
	var length = $("#"+datagridKey).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}

	$("#queryForm").attr("action",contextPath+"/report/storeExpendDetail/exportList");
	$("#queryForm").submit();
}
