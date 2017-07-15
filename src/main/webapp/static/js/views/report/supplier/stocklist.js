/**
 * Created by wxl on 2016/08/17.
 * 供应商进货报表
 */
$(function() {
    //开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate().format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	
	//选择报表类型
	initGoodsTotalAnalysiGrid();
	
	$('#branchSelects').branchSelect();
	
	$('#supplierComponent').supplierSelect();
});

var gridHandel = new GridClass();

var gridName = "goodsStockList";
/**
 * 初始化表格按  商品
 * @param queryType
 */
function initGoodsTotalAnalysiGrid() {
	gridHandel.setGridName(gridName);
   dg =  $("#"+gridName).datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        showFooter:true,
        pageSize : 50,
        data:[{purjx:0}],
        pageList : [20,50,100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        columns: [[
           {field: 'supplierCode', title: '供应商编码', width:120, align: 'left'},
           {field: 'supplierName', title: '供应商名称', width:120, align: 'left'},
           {field: 'smallCateCore', title: '小类编号', width:120, align: 'left'},
           {field: 'cateName', title: '商品类别', width:120, align: 'left'},
           {field: 'centerCateName', title: '商品中类', width:120, align: 'left'},
           {field: 'bigCateName', title: '商品大类', width:120, align: 'left'},
           {field: 'skuCode', title: '货号', width:120, align: 'left'},
           {field: 'skuName', title: '商品名称', width:120, align: 'left'},
           {field: 'barCode', title: '商品条码', width:120, align: 'left'},
           {field: 'unit', title: '单位', width:65, align: 'center'},
           {field: 'spec', title: '规格', width:65, align: 'left'},
           {field: 'purjx', title: '期间进货数量', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'psjx', title: '期间成本价', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
        	   }
           },
           {field: 'jhsl', title: '期间进货金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
        	   }
           }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
}


/**
 * 查询
 */
function query(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var formData = $("#queryForm").serializeObject();
	$("#"+gridName).datagrid("options").queryParams = formData;
	$("#"+gridName).datagrid("options").method = "post";
	$("#"+gridName).datagrid("options").url =  contextPath+"/report/goodsGrossProfitRate/list";
	$("#"+gridName).datagrid("load");
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#'+gridName).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(dg.datagrid('getData').total);
	$("#exportWin").window("open");
}
/**
 * 导出
 */
function exportExcel(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/goodsGrossProfitRate/exportList');
	$("#queryForm").submit();	
}

/**
 * 商品类别
 */
function searchCategory(){
	var categoryType=$('input[name="searchType"]:checked ').val();
	var param = {
		categoryType:categoryType
	}
	new publicCategoryService(function(data){
		console.info(data);
		//$("#categoryCode").val(data.categoryCode);
		$("#categoryCode").val(data.categoryName);
	},param);
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/total";
};