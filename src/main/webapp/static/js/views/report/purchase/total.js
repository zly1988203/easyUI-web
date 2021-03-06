/**
 * Created by wxl on 2016/08/17.
 */
$(function() {
	//选择报表类型
	changeType();
	formNoOff();
	initPurReportTotalGrid();
	// 开始和结束时间
	if(!$("#txtStartDate").val()){
		// 开始和结束时间
		$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
		$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	    $("#categoryTypeDiv").hide();
		$("#categoryType").combobox("disable");
		
	}else{
		flushFlg = true;
		$('input:radio[name=searchType]')[0].checked = true;
		$('input:radio[name=searchType]')[0].click();
	}
    $('#branchTemp').branchSelect();

    //类别选择初始化
    $('#categorySelectTemp').categorySelect({
        onAfterRender:function(data){
            $("#categoryCode").val(data.categoryCode);
        }
    });

    //供应商选择初始化
    $('#supplierComponent').supplierSelect({
        //数据过滤
        loadFilter:function(data){
            data.supplierId = data.id;
            return data;
        }
    });


});

var flushFlg = false;
var dg;
function changeType(){
	$(".radioItem").on("click",function(){
		flushFlg = true;
    	var a = $(this).val();
    	dg=$("#purReportTotal").datagrid("options").url = "";
    	if (a=="goodsTotal") {
			//  按商品汇总
    		categoryOn();
    		skuCodeOrBarCodeOn();
    		supplierOn();
    		formTypeOn();
    		formNoOff();
    		categoryTypeOff();
    		initPurReportTotalGrid();
		}else if (a=="supplierTotal") {
			//初始化列表按收供应商汇总
			supplierOn();
			formTypeOn();
			categoryOff();
			formNoOff();
			skuCodeOrBarCodeOff();
			categoryTypeOff();
			initPurReportSupplierGrid();
		} else if (a=="formNoTotal") {
			// 初始化列表按单据汇总
			supplierOn();
			formTypeOn();
			categoryOff();
			formNoON();
			skuCodeOrBarCodeOff();
			categoryTypeOff();
			initPurFormNoGrid();
		} else if (a=="categoryTotal") {
			// 初始化列表按类别汇总
			categoryOn();
			formTypeOn();
			categoryTypeOn();
			formNoOff();
			supplierOff();
			skuCodeOrBarCodeOff();
			initCategoryGrid();
		}
    	$("#purReportTotal").datagrid('loadData', { total: 0, rows: [] });
    	$('#purReportTotal').datagrid({showFooter:false});
    });
}
//供应商开启
function supplierOn(){
    $("#supplierName").removeClass("uinp-no-more");
	$("#supplierSelect").attr("onclick","searchSupplier()");
	$("#supplierName").removeClass("uinp-no-more");
	$("#supplierName").removeAttr("readonly");
}

//供应商禁用
function supplierOff(){
    $("#supplierName").addClass("uinp-no-more");
	$("#supplierSelect").removeAttr("onclick");
	$("#supplierId").val("");
	$("#supplierName").val("");
	$("#supplierName").attr("readonly","readonly");
    $("#supplierName").addClass("uinp-no-more");
}

//单号查询开启
function formNoON(){
    $("#formNo").removeClass("uinp-no-more");
	$("#formNo").removeClass("uinp-no-more");
	$("#formNo").removeAttr("readonly");
}

//单号查询禁用
function formNoOff(){
    $("#formNo").addClass("uinp-no-more");
	$("#formNo").val("");
	$("#formNo").attr("readonly","readonly");
    $("#formNo").addClass("uinp-no-more");
}

//类别开启
function categoryOn(){
    $("#categoryName").removeClass("uinp-no-more");
	$("#categorySelect").attr("onclick","searchCategory()");
	$("#categoryName").removeClass("uinp-no-more");
	$("#categoryName").removeAttr("readonly");
}
//类别禁用
function categoryOff(){
    $("#categoryName").addClass("uinp-no-more");
	$("#categorySelect").removeAttr("onclick");
	$("#categoryName").val("");
	$("#categoryCode").val("");
	$("#categoryId").val("");
	$("#categoryName").attr("readonly","readonly");
    $("#categoryName").addClass("uinp-no-more");
}
//单据类型开启
function formTypeOn(){
	$("#formType").combobox("enable");
}
//单据类型禁用
function formTypeOff(){
	$("#formType").combobox("disable");
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
    $("#skuCodeOrBarCode").val('');
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
    $("#categoryCode").val("");
    $("#categoryId").val("");
}
var gridHandel = new GridClass();
/**
 * 初始化表格按  商品
 * @param queryType
 */

var dg;
function initPurReportTotalGrid() {
	gridHandel.setGridName("purReportTotal");
	dg= $("#purReportTotal").datagrid({
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
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'skuCode', title: '货号', width:55, align: 'left'},
            {field: 'skuName', title: '商品名称', width:185, align: 'left'},
            {field: 'barCode', title: '条码', width:100, align: 'left'},
            {field: 'realNumPI', title: '进货数量', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPI', title: '进货金额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'realNumPR', title: '退货数量', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPR', title: '退货金额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalNum', title: '小计数量', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '小计金额', width:80, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'taxAmount', title: '税额', width:60, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'supplierCode', title: '供应商编号', width: 60, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'supplierName', title: '供应商名称', width: 185, align: 'left'},

            {field: 'categoryCode', title: '类别编号', width:56, align: 'left'},
            {field: 'categoryName', title: '类别名称', width:65, align: 'left'},
            {field: 'brandName', title: '品牌', width:56, align: 'left'},
            {field: 'spec', title: '规格', width:45, align: 'left'},
            {field: 'unit', title: '单位', width:45, align: 'left'},

        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
   /* if(flushFlg){
    	purchaseTotalCx();
    }*/
    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("purReportTotal",["amountPI","amountPR","totalAmount","taxAmount"])
    }
}
/**
 * 初始化表格按  供应商
 * @param queryType
 */
function initPurReportSupplierGrid() {
	gridHandel.setGridName("purReportTotal");
	dg= $("#purReportTotal").datagrid({
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
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'supplierCode', title: '供应商编号', width: 60, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'supplierName', title: '供应商名称', width: 185, align: 'left'},
            {field: 'realNumPI', title: '进货数量', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){	
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPI', title: '进货金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'realNumPR', title: '退货数量', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPR', title: '退货金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalNum', title: '小计数量', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '小计金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'validUserName', title: '审核人', width: 80, align: 'left'},
            {field: 'validTime', title: '审核时间', width: 115, align: 'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}
            }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
  /*  if(flushFlg){
    	purchaseTotalCx();
    }*/
    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("purReportTotal",["amountPI","amountPR","totalAmount","taxAmount"])
    }
}
/**
 * 初始化表格按  单据汇总
 * @param queryType
 */
function initPurFormNoGrid() {
	gridHandel.setGridName("purReportTotal");
   dg = $("#purReportTotal").datagrid({
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
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'branchCode', title: '机构编号', width: 56, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'branchName', title: '机构名称', width:220, align: 'left'},
            {field: 'formNo', title: '单据编号', width: 130, align: 'left',
            	formatter:function(value,row,index){
            		var hrefStr = '';
            		if(row.formId){
            			if(row.formNo.substr(0,2)=="PI"){
            				hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/receiptEdit?report=close&formId='+row.formId+'")';
            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            			}else if(row.formNo.substr(0,2)=="PR"){
            				hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/returnEdit?report=close&formId='+row.formId+'")'
            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            			}else if(row.formNo.substr(0,2)=="PM"){
            				hrefStr='parent.addTab("详细","'+contextPath+'/directReceipt/edit?formId='+row.formId+'")';
                        	return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            			}
            		}else{
            			return "";
            		}
                }
            },
            {field: 'refFormNo', title: '引用单号', width: 135, align: 'left',
            	formatter:function(value,row,index){
            		var hrefStr = '';
            		if(row.refFormId){
            			hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/orderEdit?report=close&formId='+row.refFormId+'")';
            			return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            		}else{
            			return "";
            		}
                }
            },
            {field: 'amount', title: '单据金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){	
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'taxAmount', title: '税额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'salesManName', title: '采购员', width: 80, align: 'left'},
            {field: 'createUserName', title: '制单人', width: 80, align: 'left'},
            {field: 'createTime', title: '制单日期', width: 115, align: 'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}
            },
            {field: 'validUserName', title: '审核人', width: 80, align: 'left'},
            {field: 'validTime', title: '审核日期', width: 115, align: 'left',
            	formatter : function(value, rowData, rowIndex) {
            		return formatDate(value,'yyyy-MM-dd hh:mm');
            	}
            },
            {field: 'supplierCode', title: '供应商编号', width: 60, align: 'left'},
            {field: 'supplierName', title: '供应商名称', width: 185, align: 'left'},
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
   /* if(flushFlg){
    	purchaseTotalCx();
    }*/
    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("purReportTotal",["amount","totalAmount","taxAmount"])
    }
}
/**
 * 初始化表格按  类别汇总
 * @param queryType
 */
function initCategoryGrid() {
	gridHandel.setGridName("purReportTotal");
	dg=$("#purReportTotal").datagrid({
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
            {field: 'categoryName', title: '类别名称', width: 65, align: 'left'},
            {field: 'realNumPI', title: '进货数量', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){	
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPI', title: '进货金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'realNumPR', title: '退货数量', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'amountPR', title: '退货金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalNum', title: '小计数量', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '小计金额', width:80, align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'taxAmount', title: '税额', width:60, align: 'right',
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
			//updateFooter();
		}
    });
   /* if(flushFlg){
    	purchaseTotalCx();
    }*/
    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice("purReportTotal",["amountPI","amountPR","totalAmount","taxAmount"])
    }
}


/**
 * 合计
 */
function updateFooter(){
    var fields = {realNumPI:0,amountPI:0,realNumPR:0,amountPR:0,totalNum:0,totalAmount:0,amount:0,taxAmount:0};
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}
/**
 * 查询
 */
function purchaseTotalCx(){
	$("#startCount").val('');
	$("#endCount").val('');
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	/*if(!branchName){
		$_jxc.alert( '机构名不能为空');
		return ;
	}*/
	var formData = $("#queryForm").serializeObject();
	$("#purReportTotal").datagrid("options").url = "";
	$('#purReportTotal').datagrid({showFooter:true});
	$("#purReportTotal").datagrid("options").queryParams = formData;
	$("#purReportTotal").datagrid("options").method = "post";
	$("#purReportTotal").datagrid("options").url =  contextPath+"/report/purchase/getPurReportTotal";
	$("#purReportTotal").datagrid("load");
}
/**
 * 导出
 */
function exportTotal(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $('#purReportTotal').datagrid('getData').rows.length;
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
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");

	$("#queryForm").attr("action",contextPath+'/report/purchase/exportTotal');
	$("#queryForm").submit();		

}



/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
//		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}
/**
 * 供应商公共组件
 */
function searchSupplier(){
	new publicSupplierService(function(data){
//		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
	});
}
/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
//		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryName").val(data.categoryName);
		$("#categoryCode").val(data.categoryCode);
	});
}
/**
 * 重置
 */
var resetForm = function(){
	/*$("#queryForm").form('clear');
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	$("#branchId").val(sessionBranchId);
	$("#branchName").val(sessionBranchName);
	onChangeFormType("");
	$("#categoryType").combobox("setValue","smallCategory");
	$('input:radio[name=searchType]')[0].checked = true;*/
	location.href=contextPath+"/report/purchase/total";
	
};