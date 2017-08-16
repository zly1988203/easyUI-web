/**
 * Created by wxl on 2016/08/17.
 * 商品销售汇总分析
 */
$(function() {
	/*$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));*/
	toChangeDatetime(0);
	//选择报表类型
	initGoodsTotalAnalysiGrid();
	
	//机构选择
	$('#branchSelects').branchSelect();
	
	//商品类别选择组件
	$('#categoryNameDiv').categorySelect();
	
	$('input[name="reportType"]').on('change',function(){
		initGoodsCategorty();
	})
});

var gridHandel = new GridClass();

var gridName = "goodsTotalAnalysi";
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
        //fitColumns:true,    //占满
        showFooter:true,
        pageSize : 50,
        pageList : [20,50,100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        frozenColumns:[[
			{field: 'branchCode', title: '机构编码', width:120, align: 'left'},
			{field: 'branchName', title: '机构名称', width:120, align: 'left'},
			{field: 'orderNo', title: '单据编号', width:150, align: 'left'}
        ]],
        columns: [[
           {field: 'time', title: '完成时间', width:150, align: 'left',
        	   formatter:function(value,row,index){
        		   if(!value){
        			   return '';
        		   }
        		   var now = new Date(value);
        		  return now.format("yyyy-MM-dd hh:mm:ss");
        	   }
           },   
           {field: 'skuCode', title: '货号', width:120, align: 'left'},
           {field: 'skuName', title: '商品名称', width:120, align: 'left'},
           {field: 'barCode', title: '商品条码', width:120, align: 'left'},
           {field: 'spec', title: '规格', width:65, align: 'left'},
           {field: 'unit', title: '单位', width:65, align: 'left'},
           {field: 'categoryCode', title: '类别编码', width:120, align: 'left'},
           {field: 'categoryName', title: '类别名称', width:120, align: 'left'},        
            {field: 'businessTypeStr', title: '业务类型', width:80, align: 'left'},
            {field: 'salePrice', title: '销售价格', width:80, align: 'left'},
            {field: 'saleNum', title: '销售数量', width:80, align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'originalPrice', title: '原价', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '原价金额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'discount', title: '折扣', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'costPrice', title: '成本价', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'costAmount', title: '成本额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'cashier', title: '收银员', width:80, align: 'left'}
            
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
   
    //价格权限
    var param={
    	costPrice:['costPrice','costAmount']
    }
    priceGrantUtil.grantPrice(gridName,param);
}




/**
 * 查询
 */
function purchaseTotalCx(){
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
	$("#"+gridName).datagrid("options").url =  contextPath+"/report/sale/goodSaleDetailReport/reportListPage";
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
	var branchCompleCode = $("#branchCompleCode").val();
	var categoryType=$('input[name="searchType"]:checked ').val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	if(length>10000){
		$_jxc.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/sale/goodSaleDetailReport/exportExcel');
	$("#queryForm").submit();	
}

/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/total";
};