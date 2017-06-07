/**
 * Created by wxl on 2016/08/17.
 * 商品销售汇总分析
 */
$(function() {
	//选择报表类型
	changeType();
	initGoodsTotalAnalysiGrid();
	// 开始和结束时间
	if(!$("#txtStartDate").val()){
		// 开始和结束时间
		$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
		$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	    $("#categoryTypeDiv").hide();
		$("#categoryType").combobox("disable");
		
	}else{
		flushFlg = true;
		$('input:radio[name=searchType]')[0].checked = true;
		$('input:radio[name=searchType]')[0].click();
	}
});

var flushFlg = false;
function changeType(){
	$(".radioItem").on("click",function(){
		flushFlg = true;
		resetCondition();
    	var a = $(this).val();
    	$("#goodsTotalAnalysi").datagrid("options").url = "";
    	if (a=="goodsTotal") {
			//  按商品汇总
    		skuNameOn();
    		categoryOn();
    		skuCodeOrBarCodeOn();
    		branchOn();
    		initGoodsTotalAnalysiGrid();
		}else if (a=="branchTotal") {
			//初始化列表按店铺汇总
			skuNameOff();
			categoryOff();
			skuCodeOrBarCodeOff();
			branchOn();
			initPurReportSupplierGrid();
		}  else if (a=="categoryTotal") {
			// 初始化列表按类别汇总
			skuNameOff();
			categoryOn();
			skuCodeOrBarCodeOff();
			branchOn();
			initCategoryGrid();
		}
    	$("#goodsTotalAnalysi").datagrid('loadData', { total: 0, rows: [] });
    	$('#goodsTotalAnalysi').datagrid({showFooter:false});
    });
}
//重置条件
function resetCondition(){
//	 $("#branchName").val("");
//	 $("#branchId").val("");
	 $("#categoryName").val("");
	 $("#categoryCode").val("");
	 $("#skuName").val('');
	 $("#skuCodeOrBarCode").val("");
}
//店铺开启
function branchOn(){
	$("#branchName").removeClass("uinp-no-more");
	$("#branchSelect").attr("onclick","searchBranch()");
}
//店铺禁用
function branchOff(){
	 $("#branchName").addClass("uinp-no-more");
	 $("#branchSelect").removeAttr("onclick");
	 $("#branchName").val("");
	 $("#branchCompleCode").val("");
	 $("#branchId").val("");
}
//类别开启
function categoryOn(){
    $("#categoryCode").removeClass("uinp-no-more");
	$("#categorySelect").attr("onclick","searchCategory()");
    $("#categoryCode").removeAttr("readonly");
}
//类别禁用
function categoryOff(){
    $("#categoryCode").addClass("uinp-no-more");
	$("#categorySelect").removeAttr("onclick");
	$("#categoryCode").attr("readonly","readonly");
	$("#categoryCode").val("");
}
//商品名称开
function skuNameOn(){
	 $("#skuName").removeClass("uinp-no-more");
	 $("#skuName").removeAttr("readonly");
}
//关
function skuNameOff(){
	$("#skuName").attr("readonly","readonly");
    $("#skuName").addClass("uinp-no-more");
    $("#skuName").val('');
}
//货号开启
function skuCodeOrBarCodeOn(){
    $("#skuCodeOrBarCode").removeClass("uinp-no-more");
	$("#skuCodeOrBarCode").removeAttr("readonly");
}
//货号禁用
function skuCodeOrBarCodeOff(){
	$("#skuCodeOrBarCode").attr("readonly","readonly");
    $("#skuCodeOrBarCode").addClass("uinp-no-more");
    $("#skuCodeOrBarCode").val("");
}
//三级分类开启
function categoryTypeOn(){
    $("#categoryTypeDiv").show();
	$("#categoryType").combobox("enable");
}
//三级分类禁用
function categoryTypeOff(){
    $("#categoryTypeDiv").hide();
	$("#categoryType").combobox("disable");
}

var gridHandel = new GridClass();
/**
 * 单据类型
 * @param newV
 * @param oldV
 */
function onChangeFormType(newV,oldV){
	$("#formType").combobox("setValue",newV);
}
function onChangeCategoryType(newV,oldV){
    $("#categoryName").val("");
    $("#categoryId").val("");
}
var gridHandel = new GridClass();
var gridName = "goodsTotalAnalysi";
/**
 * 初始化表格按  商品
 * @param queryType
 */
function initGoodsTotalAnalysiGrid() {
	gridHandel.setGridName("goodsTotalAnalysi");
   dg =  $("#goodsTotalAnalysi").datagrid({
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
            {field: 'skuCode', title: '货号', width:55, align: 'left'},
            {field: 'skuName', title: '商品名称', width:185, align: 'left'},
            {field: 'barCode', title: '条码', width:100, align: 'left'},
            {field: 'spec', title: '规格', width:45, align: 'left'},
            {field: 'unit', title: '单位', width:45, align: 'left'},
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
                    if(row.grossProfitRate===''){
                        return '';
                    }
                    return '<b>'+parseFloat(value).toFixed(2)+'%</b>';
                }
            }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice(gridName,["costAmount","grossProfit","grossProfitRate"])
    }
}


/**
 * 初始化表格按  类别汇总
 * @param queryType
 */
function initCategoryGrid() {
	gridHandel.setGridName("goodsTotalAnalysi");
    $("#goodsTotalAnalysi").datagrid({
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
        pageList : [20,50,100],//可以设置每页记录条数的列表
        pageSize : 50,
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'categoryCode', title: '类别编号', width: 56, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'bigCategoryName', title: '大类名称', width: 65, align: 'left'},
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
                    if(row.grossProfitRate===''){
                        return '';
                    }
                    return '<b>'+parseFloat(value).toFixed(2)+'%</b>';
                }
            }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice(gridName,["costAmount","grossProfit","grossProfitRate"])
    }
}


/**
 * 初始化表格按  店铺
 * @param queryType
 */
function initPurReportSupplierGrid() {
	gridHandel.setGridName("goodsTotalAnalysi");
    $("#goodsTotalAnalysi").datagrid({
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
        pageList : [20,50,100],//可以设置每页记录条数的列表
        pageSize : 50,
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'branchCode', title: '店铺编号', width: 60, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'branchName', title: '店铺名称', width: 185, align: 'left'},
           /* {field: 'saleNum', title: '销售数量', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },*/
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
                    if(row.grossProfitRate===''){
                        return '';
                    }
                    return '<b>'+parseFloat(value).toFixed(2)+'%</b>';
                }
            }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice(gridName,["costAmount","grossProfit","grossProfitRate"])
    }
}

/**
 * 查询
 */
function purchaseTotalCx(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	var categoryType=$('input[name="searchType"]:checked ').val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	/*if(categoryType!='branchTotal'){
		if(!branchName){
			$_jxc.alert('店铺名不能为空');
			return ;
		}
	}*/
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var formData = $("#queryForm").serializeObject();
	$("#goodsTotalAnalysi").datagrid("options").url = "";
	$('#goodsTotalAnalysi').datagrid({showFooter:true});
	$("#goodsTotalAnalysi").datagrid("options").queryParams = formData;
	$("#goodsTotalAnalysi").datagrid("options").method = "post";
	$("#goodsTotalAnalysi").datagrid("options").url =  contextPath+"/report/goodsTotalAnalysi/reportListPage";
	$("#goodsTotalAnalysi").datagrid("load");
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#goodsTotalAnalysi').datagrid('getData').total;
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
		$_jxc.alert('日期不能为空');
		return ;
	}
	/*if(categoryType!='branchTotal'){
		if(!branchName){
			$_jxc.alert('店铺名不能为空');
			return ;
		}
	}*/
	var length = $("#goodsTotalAnalysi").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	if(length>10000){
		$_jxc.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/goodsTotalAnalysi/exportGoodsAnalsisExcel');
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
		console.info(data);
//		$("#categoryCode").val(data.categoryCode);
		$("#categoryCode").val(data.categoryName);
	},param);
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/total";
	
};