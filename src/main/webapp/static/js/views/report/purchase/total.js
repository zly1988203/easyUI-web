/**
 * Created by wxl on 2016/08/17.
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initPurReportTotalGrid('goodsTotal');
	
	//选择报表类型
	changeType();
});

var flushFlg = false;
function changeType(){
	var evTimeStamp = 0;
	$(document).on('click','.radioItem',function(){
		//去除双点击事件问题
		 var now = +new Date();
		if (now - evTimeStamp < 100) {
		       return;
	     }
		evTimeStamp = now;
		flushFlg = true;
    	var a = $(this).val();
    	console.log(a)
    	if (a=="goodsTotal") {
			// 初始化列表按收银员汇总
    		initPurReportTotalGrid();
		}else if (a=="supplierTotal") {
			// 初始化列表按日期汇总
			initPurReportSupplierGrid();
		} else if (a=="formNoTotal") {
			// 初始化列表按门店汇总
			initCashDailymdGrid();
		} else if (a=="categoryTotal") {
			// 初始化列表按日期汇总
			initCashDailydateGrid();
		}else if (a=="category") {
			// 初始化列表按日期汇总
			initCashDailydateGrid();
			
		}
    	
    });
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

var gridHandel = new GridClass();
/**
 * 初始化表格按  商品
 * @param queryType
 */
function initPurReportTotalGrid(queryType) {
	gridHandel.setGridName("purReportTotal");
    $("#purReportTotal").datagrid({
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
        pageSize : 20,
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'supplierCode', title: '供应商编号', width: 100, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'supplierName', title: '供应商名称', width: 100, align: 'left'},
            {field: 'skuName', title: '商品名称', width:120, align: 'right'},
            {field: 'skuCode', title: '货号', width:120, align: 'right'},
            {field: 'barCode', title: '条码', width:120, align: 'right'},
            {field: 'categoryCode', title: '类别编号', width:120, align: 'right'},
            {field: 'categoryName', title: '类别名称', width:120, align: 'right'},
            {field: 'brandName', title: '品牌', width:120, align: 'right'},
            {field: 'spec', title: '规格', width:120, align: 'right'},
            {field: 'unit', title: '单位', width:120, align: 'right'},
            {field: 'realNumPI', title: '进货数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){	
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPI', title: '进货金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'realNumPR', title: '退货数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPR', title: '退货金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalNum', title: '小计数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '小计金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
    if(flushFlg){
    	purchaseTotalCx();
    }
}
/**
 * 初始化表格按  供应商
 * @param queryType
 */
function initPurReportSupplierGrid(queryType) {
	gridHandel.setGridName("purReportTotal");
    $("#purReportTotal").datagrid({
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
        pageSize : 20,
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'supplierCode', title: '供应商编号', width: 100, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'supplierName', title: '供应商名称', width: 100, align: 'left'},
            {field: 'realNumPI', title: '进货数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){	
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPI', title: '进货金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'realNumPR', title: '退货数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPR', title: '退货金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalNum', title: '小计数量', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '小计金额', width:120, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'validUserName', title: '审核人', width: 100, align: 'left'},
            {field: 'validTime', title: '审核时间', width: 100, align: 'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}
            }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
    if(flushFlg){
    	purchaseTotalCx();
    }
}

//合计
function updateFooter(){
    var fields = {realNumPI:0,amountPI:0,realNumPR:0,amountPR:0,totalNum:0,totalAmount:0,};
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}
/**
 * 查询
 */
function purchaseTotalCx(){
	var formData = $("#queryForm").serializeObject();
	
	$("#purReportTotal").datagrid("options").queryParams = formData;
	$("#purReportTotal").datagrid("options").method = "post";
	$("#purReportTotal").datagrid("options").url =  contextPath+"/report/purchase/getPurReportTotal";
	$("#purReportTotal").datagrid("load");
}
/**
 * 导出
 */
function exportTotal(){
	var length = $("#purReportTotal").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/purchase/exportTotal');
	$("#queryForm").submit();	
}
/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}
/**
 * 供应商公共组件
 */
function searchSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
	});
}
/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryName").val(data.categoryName);
	});
}
/**
 * 重置
 */
var resetForm = function(){
	 $("#queryForm").form('clear');
};