/**
 * Created by wxl on 2016/08/17.
 * 供应商销售报表
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
var gridName = "goodsSellistList";
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
        data:[{}],
        pageList : [20,50,100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        columns: [[
           {field: 'supplierCode', title: '供应商编码', width:120, align: 'left'},
           {field: 'supplierName', title: '供应商名称', width:120, align: 'left'},
           {field: 'saleType', title: '经营方式', width:120, align: 'left'},
           {field: 'saleCount', title: '销售数量', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'saleAmount', title: '销售金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },        
           {field: 'dqkc', title: '当前库存', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'kczbje', title: '库存成本金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'purjx', title: '采购进货量', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'kcxisj', title: '库存销售金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'psjx', title: '毛利', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'psjx', title: '毛利率', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }   
           },
           {field: 'psjx', title: 'SKU数', width:120, align: 'left',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }   
           }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
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