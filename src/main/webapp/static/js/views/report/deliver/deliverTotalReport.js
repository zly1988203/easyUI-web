/**
 * Created by wxl on 2016/08/17.
 */
$(function() {
	//选择报表类型
	changeType();
	$("#formNo").attr("readonly","readonly");
	$("#formNo").addClass("uinp-no-more");
	// 初始化列表
	initCashDailyallGrid('data');
	var s = $("#txtStartDate").val();
	if(!$("#txtStartDate").val()){
		// 开始和结束时间
		$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
		$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
		$('#categoryTypeDiv').hide();
		
	}else{
		$("input[name='queryType'][value=goods]").attr("checked",true); 
		$("input[name='queryType'][value=goods]").click();
	}

	
});
var flushFlg = false;
function changeType(){
	$(".radioItem").change(function(){
		flushFlg = true;
		var a = $(this).val();
		$("#cashDaily").datagrid("options").url = "";
		if (a=="goods") {
			// 初始化列表按收银员汇总
			initCashDailyallGrid('goods');
			$("#categoryButon").attr("onclick","getGoodsType()");
			$("#categoryName").removeClass("uinp-no-more");
			
			
			$('#categoryTypeDiv').hide();
			$("#skuCode").removeAttr("readonly");
			$("#skuCode").removeClass("uinp-no-more");
			$("#categoryButon").removeAttr("readonly");
			$("#categoryType").attr("disabled","disabled");
			$("#formNo").attr("readonly","readonly");
			$("#formNo").addClass("uinp-no-more");

			$("#formNo").val("");
			showCashier();
		} else if (a=="form") {
			// 初始化列表按门店汇总
			$("#categoryName").addClass("uinp-no-more");
			$("#categoryButon").removeAttr("onclick");
				//$("#categoryButon").attr("onclick","getGoodsType()");
			$('#categoryTypeDiv').hide();	
			$("#skuCode").attr("readonly","readonly");
			$("#skuCode").addClass("uinp-no-more");
			$("#skuCode").val("");
			$("#categoryCode").val("");	
			$("#categoryName").val("");

			$("#formNo").removeAttr("readonly");
			$("#formNo").removeClass("uinp-no-more");
			initCashDailymdGrid('form');
			hideCashier();
		} else if (a=="category") {
			$("#categoryButon").attr("onclick","getGoodsType()");
			$("#categoryName").removeClass("uinp-no-more");
			$('#categoryTypeDiv').show();
			$("#skuCode").attr("readonly","readonly");
			$("#skuCode").addClass("uinp-no-more");
			$("#skuCode").val("");
			$("#formNo").attr("readonly","readonly");
			$("#formNo").val("");
			$("#formNo").addClass("uinp-no-more");
			$("#categoryType").attr("disabled","disabled");
			
			// 初始化列表按日期汇总
			initCashDailydateGrid('category');
			hideCashier();
		}else if(a=="branch"){
			$("#categoryName").val("");
			$("#categoryName").addClass("uinp-no-more");
			$("#categoryButon").removeAttr("onclick");
			$('#categoryTypeDiv').hide();
			$("#skuCode").attr("readonly","readonly");
			$("#skuCode").addClass("uinp-no-more");
			$("#skuCode").val("");
			$("#formNo").attr("readonly","readonly");
			$("#formNo").val("");
			$("#formNo").addClass("uinp-no-more");
			initbranchGrid();
		}
		$("#cashDaily").datagrid('loadData', { total: 0, rows: [] });
    	$('#cashDaily').datagrid({showFooter:false});

	});
}

function showCashier(){
	$("#cashierNameOrCode").removeAttr("disabled");
	$("#cashierIdSelect").show();
}

function hideCashier(){
	/*$("#cashierId").val('');*/
	
	
	$("#cashierNameOrCode").val('');
	$("#cashierNameOrCode").attr("disabled","disabled");
	$("#cashierNameOrCode").attr("disabled","disabled");
	$("#cashierIdSelect").hide();
}

var gridHandel = new GridClass();
//按商品汇总
function initCashDailyallGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	$("#cashDaily").datagrid({
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
		           {field: 'skuCode', title: '货号', width:120, align: 'left',
		        	   formatter : function(value, row,index) {
		                    var str = value;
		                    if(row.isFooter){
		                        str ='<div class="ub ub-pc ufw-b">合计</div> '
		                    }
		                    return str;
		                }
		           },
		           {field: 'skuName', title: '商品名称', width:180, align: 'left'},
		           {field: 'barCode', title: '条码', width:120, align: 'left'},
		           {field: 'categoryCode', title: '类别编号', width:120, align: 'left'},
		           {field: 'categoryName', title: '类别', width:120, align: 'left'},
		           {field: 'spec', title: '规格', width:80, align: 'left'},
		           {field: 'unit', title: '单位', width:60, align: 'left'},
		         /*  {field: 'inputTax', title: '税率', width:60, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },*/
		           {field: 'receiveLargeNum', title: '调入箱数', width:100, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'receiveNum', title: '调入数量', width:100, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'receiveAmount', title: '调入金额', width:100, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealLargeNum', title: '调出箱数', width:100, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealNum', title: '调出数量', width:100, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealAmount', title: '调出金额', width:100, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },

		           {field: 'sumNum', title: '数量小计', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }   
		           },
		           {field: 'sumAmount', title: '金额小计', width:120, align: 'right',
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
		        	   /*updateFooter();*/
		           }
	});
	/*if(flushFlg){
		query();
	}*/
}

//按单汇总
function initCashDailymdGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	$("#cashDaily").datagrid({
		//title:'普通表单-用键盘操作',
		method: 'post',
		align: 'center',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect: false,  //单选  false多选
		rownumbers: true,    //序号
		pagination: true,    //分页
		//fitColumns:true,    //占满
		showFooter:true,
		pageSize : 50,
		columns: [[
		           {field: 'formNo', title: '单据编号', width:140, align: 'left',
		        	   formatter:function(value,row,index){
		            			if(row.formId){
		            				var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.formId+'")';
		            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
		            			}else{
		            				return '<div class="ub  ufw-b">合计</div>'; 
		            			}
		                }   
		           },
		           {field: 'sourceBranchCode', title: '发货机构编码', width:120, align: 'left'},
		           {field: 'sourceBranchName', title: '发货机构', width:120, align: 'left'},
		           {field: 'targetBranchCode', title: '要货机构编码', width:120, align: 'left'},
		           {field: 'targetBranchName', title: '要货机构', width:120, align: 'left'},
		           {field: 'referenceNo', title: '引用单号', width:140, align: 'left',
		        	   formatter:function(value,row,index){
		        		   if(row.formId){
	            				var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.referenceId+'")';
	            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
	            			}else{
	            				return '<div class="ub  ufw-b">合计</div>'; 
	            			}
		                }    
		           },
		           {field: 'statusName', title: '单据状态', width:120, align: 'center' },
		           {field: 'status', title: '状态', width:120, align: 'right',hidden:true},
		           
		           {field: 'num', title: '数量', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'amount', title: '金额', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'validTime', title: '审核日期', width:120, align: 'left',
		        	   formatter : function(value, rowData, rowIndex) {
		        		   return formatDate(value,'yyyy-MM-dd');
		        	   }   
		           },
		           {field: 'remark', title: '备注', width:120, align: 'left'}
		           ]],
		           onLoadSuccess:function(data){
		        	   gridHandel.setDatagridHeader("center");
		        	   /*updateFooter();*/
		           }
	});
	/*if(flushFlg){
		query();
	}*/
}
//类别汇总
function initCashDailydateGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	$("#cashDaily").datagrid({
		//title:'普通表单-用键盘操作',
		method: 'post',
		align: 'center',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect: false,  //单选  false多选
		rownumbers: true,    //序号
		pagination: true,    //分页
		//fitColumns:true,    //占满
		showFooter:true,
		pageSize : 50,
		columns: [[
		           {field: 'categoryCode', title: '类别编号', width:120, align: 'left'},
		           {field: 'categoryName', title: '类别', width:120, align: 'left'},
		           {field: 'receiveNum', title: '调入数量', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'receiveAmount', title: '调入金额', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealNum', title: '调出数量', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealAmount', title: '调出金额', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },

		           {field: 'sumNum', title: '数量小计', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'sumAmount', title: '金额小计', width:120, align: 'right',
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
		        	   /*updateFooter();*/
		           }
	});
	/*if(flushFlg){
		query();
	}*/
}


//往来汇总
function initbranchGrid(queryType) {
	gridHandel.setGridName("cashDaily");
	$("#cashDaily").datagrid({
		//title:'普通表单-用键盘操作',
		method: 'post',
		align: 'center',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect: false,  //单选  false多选
		rownumbers: true,    //序号
		pagination: true,    //分页
		//fitColumns:true,    //占满
		showFooter:true,
		pageSize : 50,
		columns: [[
		           {field: 'branchCode', title: '往来机构编码', width:140, align: 'left'},
		           {field: 'branchName', title: '往来机构名称', width:180, align: 'left'},
		           {field: 'receiveNum', title: '调入数量', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'receiveAmount', title: '调入金额', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealNum', title: '调出数量', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'dealAmount', title: '调出金额', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },

		           {field: 'sumNum', title: '数量小计', width:120, align: 'right',
		        	   formatter:function(value,row,index){
		        		   if(row.isFooter){
		        			   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		   }
		        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	   }
		           },
		           {field: 'sumAmount', title: '金额小计', width:120, align: 'right',
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
		        	   /*updateFooter();*/
		           }
	});
	/*if(flushFlg){
		query();
	}*/
}




/**
 * 收银员下拉选
 */
function searchCashierId(){
	new publicOperatorService(function(data){
		$("#cashierId").val(data.id);
		$("#cashierNameOrCode").val("["+data.userCode+"]"+data.userName);
	});

}

function clearBranchCode(){
	var branchNameOrCode = $("#branchNameOrCode").val();

	//如果修改名称
	if(!branchNameOrCode || 
			(branchNameOrCode && branchNameOrCode.indexOf("[")<0 && branchNameOrCode.indexOf("]")<0)){
		$("#branchCode").val('');
	}
}

function clearCashierId() {
	var cashierNameOrCode = $("#cashierNameOrCode").val();

	// 如果修改名称
	if (!cashierNameOrCode || 
			(cashierNameOrCode && cashierNameOrCode.indexOf("[") < 0 && cashierNameOrCode.indexOf("]") < 0)) {
		$("#cashierId").val('');
	}
}


/**
 * 导出
 */
function exportExcel(){
	$("#queryForm").form({
		success : function(data){
			if(data.code > 0){
				$.messager.alert('提示',data.message);
			}
		}
	});

	var isValid = $("#queryForm").form('validate');
	if(!isValid){
		return;
	}

	var length = $("#cashDaily").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}

	$("#queryForm").attr("action",contextPath+"/report/deliverTotalReport/exportDeliverExcel");
	$("#queryForm").submit(); 

}

//查询
function query(){
	var formData = $("#queryForm").serializeObject();
	var branchNameOrCode = $("#branchNameOrCode").val();
	if(branchNameOrCode && branchNameOrCode.indexOf("[")>=0 && branchNameOrCode.indexOf("]")>=0){
		formData.branchNameOrCode = null;
	}

	var cashierNameOrCode = $("#cashierNameOrCode").val();
	if(cashierNameOrCode && cashierNameOrCode.indexOf("[")>=0 && cashierNameOrCode.indexOf("]")>=0){
		formData.cashierNameOrCode = null;
	}
	$('#cashDaily').datagrid({showFooter:true});
	$("#cashDaily").datagrid("options").queryParams = formData;
	$("#cashDaily").datagrid("options").method = "post";
	$("#cashDaily").datagrid("options").url =  contextPath+"/report/deliverTotalReport/reportListPage";
	$("#cashDaily").datagrid("load");

}
//合计
function updateFooter(){
	var fields = {isFooter:1,receiveLargeNum:0,receiveNum:0,receiveAmount:0,dealLargeNum:0,dealNum:0,dealAmount:0,sumNum:0,sumAmount:0,num:0,amount:0};
	var argWhere = {name:'isGift',value:''}
	gridHandel.updateFooter(fields,argWhere);
}

//选择商品
function selectGoods(searchKey){
	/*  var branchId = $("#branchId").val();*/
	/*new publicGoodsService("",function(data){
		if(data.length==0){
			return;
		}
		if(searchKey){
			$("#cashDaily").datagrid("deleteRow", gridHandel.getSelectRowIndex());
			$("#cashDaily").datagrid("acceptChanges");
		}
		var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
		var addDefaultData  = gridHandel.addDefault(data,gridDefault);
		var keyNames = {
				purchasePrice:'price',
				id:'skuId',
				disabled:'',
				pricingType:'',
				inputTax:'tax'
		};
		var rows = gFunUpdateKey(addDefaultData,keyNames);
		var argWhere ={skuCode:1};  //验证重复性
		var isCheck ={isGift:1 };   //只要是赠品就可以重复
		var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
		console.log(newRows);

		$('#skuCode').val(newRows[0].skuCode);

		$("#cashDaily").datagrid("loadData",newRows);
		gridHandel.setLoadFocus();
		setTimeout(function(){
			gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
			gridHandel.setSelectFieldName("largeNum");
			gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
		},100)
	},searchKey,0,"","","");*/
	publicNewGoodsService({'goodsTypeList':'0,1','branchId':'123123'},function(data){

	})
	
	
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//商品分类
function getGoodsType(){
	new publicCategoryService(function(data){
		$("#goodsCategoryId").val(data.goodsCategoryId);
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);
	});
}
//打印
function printReport(){
	/*  var dg = $("#cashDaily");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }*/
	var queryType = $("input[name='queryType']").val();
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchId= $("#branchId").val();
	var cashierId=$("#cashierId").val();
	parent.addTabPrint("reportPrint"+branchId,"打印",contextPath+"/cashDaily/report/printReport?" +
			"queryType="+queryType+"&startDate="+startDate+"&endDate="+endDate+
			"&branchId="+branchId+"&cashierId="+cashierId);
	//window.open(contextPath+"/cashDaily/report/printReport");
}
/**
 * 重置
 */
var resetForm = function(){
	$("#queryForm").form('clear');
	$("#formType").combobox("setText","全部");
	$("#categoryType").combobox("setText","小类");
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	$('input:radio[name=queryType]')[0].checked = true;
	$("input[name='categoryType'][value=smallCategory]").click();
};
