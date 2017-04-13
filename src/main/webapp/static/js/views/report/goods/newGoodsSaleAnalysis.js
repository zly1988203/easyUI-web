/**
 * Created by wxl on 2016/08/17.
 * 新品销售分享
 */
$(function() {
	initNewGoodsTotalAnalysiGrid();
	
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	
});

var datagridName = 'newgoodsTotalAnalysi';
var gridHandel = new GridClass();
/**
 * 初始化表格按  商品
 * @param queryType
 */
function initNewGoodsTotalAnalysiGrid() {
	gridHandel.setGridName(datagridName);
   dg =  $("#"+datagridName).datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        //url: "",
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        pageSize : 50,
        pageList : [20,50,100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        columns: [[
			{field: 'branchCode', title: '店铺编号', width:60, align: 'left'},
			{field: 'branchName', title: '店铺名称', width:120, align: 'left'},
            {field: 'skuCode', title: '货号', width:60, align: 'left'},
            {field: 'skuName', title: '商品名称', width:185, align: 'left'},
            {field: 'barCode', title: '条码', width:100, align: 'left'},
            {field: 'unit', title: '单位', width:60, align: 'left'},
            {field: 'spec', title: '规格', width:60, align: 'left'},
            {field: 'categoryCode', title: '类别编号', width:80, align: 'left'},
            {field: 'categoryName', title: '类别名称', width:80, align: 'left'},
            {field: 'actualStock', title: '库存', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleNum', title: '销售数量', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'salePrice', title: '平均售价', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'costPrice', title: '平均零售价', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'saleAmount', title: '销售金额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'costAmount', title: '成本金额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'grossProfit', title: '毛利', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'grossProfitRate', title: '毛利率', width:80, align: 'right',
                formatter:function(value,row,index){
                	if(row.isFooter){
                        return '';
                    }
                    if(row.grossProfitRate===''){
                        return '';
                    }
                    return '<b>'+parseFloat(value).toFixed(2)+'%</b>';
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
function purchaseTotalCx(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var formData = $("#queryForm").serializeObject();
	$("#"+datagridName).datagrid("options").url = "";
	$("#"+datagridName).datagrid({showFooter:true});
	$("#"+datagridName).datagrid("options").queryParams = formData;
	$("#"+datagridName).datagrid("options").method = "post";
	$("#"+datagridName).datagrid("options").url =  contextPath+"/report/newGoodsSaleAnalysis/reportListPage";
	$("#"+datagridName).datagrid("load");
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $("#"+datagridName).datagrid('getData').total;
	if(length == 0){
		successTip("无数据可导");
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
	var branchCompleCode = $("#branchCompleCode").val();
	var categoryType=$('input[name="searchType"]:checked ').val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}
	/*if(categoryType!='branchTotal'){
		if(!branchName){
			$.messager.alert('提示', '店铺名不能为空');
			return ;
		}
	}*/
	var length = $("#"+datagridName).datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/newGoodsSaleAnalysis/exportExcelList');
	$("#queryForm").submit();	
}
/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
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
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val('['+data.categoryCode+']'+data.categoryName);
	},param);
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/total";
	
};