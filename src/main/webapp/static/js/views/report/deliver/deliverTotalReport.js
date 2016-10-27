/**
 * Created by wxl on 2016/08/17.
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	// 初始化列表
	initCashDailyallGrid('data');
	
	//选择报表类型
	changeType();

});

var flushFlg = false;
function changeType(){
	$(".radioItem").change(function(){
		flushFlg = true;
    	var a = $(this).val();
    	if (a=="goods") {
			// 初始化列表按收银员汇总
			initCashDailyallGrid('goods');
			showCashier();
		} else if (a=="form") {
			// 初始化列表按门店汇总
			initCashDailymdGrid('form');
			hideCashier();
		} else if (a=="categoryCode") {
			// 初始化列表按日期汇总
			initCashDailydateGrid('categoryCode');
			hideCashier();
		}
    	
    });
}

function showCashier(){
	$("#cashierNameOrCode").removeAttr("disabled");
	$("#cashierIdSelect").show();
}

function hideCashier(){
	$("#cashierId").val('');
	$("#cashierNameOrCode").val('');
	$("#cashierNameOrCode").attr("disabled","disabled");
	$("#cashierNameOrCode").attr("disabled","disabled");
	$("#cashierIdSelect").hide();
}

var gridHandel = new GridClass();
// 按商品汇总
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
        //showFooter:true,
        pageSize : 20,
        showFooter:true,
        height:'100%',
        columns: [[
                   {field: 'skuCode', title: '货号', width:120, align: 'right'},
                   {field: 'skuName', title: '商品名称', width:120, align: 'right'},
                   {field: 'barCode', title: '条码', width:120, align: 'right'},
                   {field: 'categoryCode', title: '类别编号', width:120, align: 'right'},
                   {field: 'categoryName', title: '类别名称', width:120, align: 'right'},
                   {field: 'spec', title: '规格', width:120, align: 'right'},
                   {field: 'unit', title: '单位', width:120, align: 'right'},
                   {field: 'realNum', title: '调入箱数', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                       }
                   },
                   {field: 'realNum', title: '调入数量', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                   {field: 'amount', title: '调入金额', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                       }
                   },
                   {field: 'realNum', title: '调出箱数', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                      {field: 'realNum', title: '调出数量', width:120, align: 'right',
                         	formatter:function(value,row,index){
                                 if(row.isFooter){
                                     return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                                 }
                                 return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                             }
                         },
                      {field: 'amount', title: '调出金额', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                   
                   {field: 'unit', title: '合计数量', width:120, align: 'right'},
                   {field: 'unit', title: '合计金额', width:120, align: 'right'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
    if(flushFlg){
    	query();
    }
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
        columns: [[
                   {field: 'formNo', title: '单号', width:120, align: 'right'},
                   {field: 'skuName', title: '发货机构编码', width:120, align: 'right'},
                   {field: 'barCode', title: '发货机构名称', width:120, align: 'right'},
                   {field: 'categoryCode', title: '要货机构编码', width:120, align: 'right'},
                   {field: 'categoryName', title: '要货机构名称', width:120, align: 'right'},
                   {field: 'spec', title: '引用单号', width:120, align: 'right'},
                   {field: 'unit', title: '单据状态', width:120, align: 'right'},
                   {field: 'realNum', title: '数量', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                       }
                   },
                   {field: 'realNum', title: '金额', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                   {field: 'amount', title: '调入金额', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                       }
                   },
                   {field: 'unit', title: '审核日期', width:120, align: 'right'},
                   {field: 'unit', title: '备注', width:120, align: 'right'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
    if(flushFlg){
    	query();
    }
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
        //showFooter:true,
        columns: [[
                   {field: '', title: '类别编号', width:120, align: 'right'},
                   {field: 'skuName', title: '类别名称', width:120, align: 'right'},
                   {field: 'barCode', title: '调入数量', width:120, align: 'right'},
                   {field: 'categoryCode', title: '类别编号', width:120, align: 'right'},
                   {field: 'categoryName', title: '类别名称', width:120, align: 'right'},
                   {field: 'spec', title: '规格', width:120, align: 'right'},
                   {field: 'unit', title: '单位', width:120, align: 'right'},
                   {field: 'realNum', title: '调入箱数', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                       }
                   },
                   {field: 'realNum', title: '调入数量', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                   {field: 'amount', title: '调入金额', width:120, align: 'right',
                   	formatter:function(value,row,index){
                           if(row.isFooter){
                               return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                           }
                           return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                       }
                   },
                   {field: 'realNum', title: '调出箱数', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                      {field: 'realNum', title: '调出数量', width:120, align: 'right',
                         	formatter:function(value,row,index){
                                 if(row.isFooter){
                                     return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                                 }
                                 return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                             }
                         },
                      {field: 'amount', title: '调出金额', width:120, align: 'right',
                      	formatter:function(value,row,index){
                              if(row.isFooter){
                                  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                              }
                              return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                          }
                      },
                   
                   {field: 'unit', title: '合计数量', width:120, align: 'right'},
                   {field: 'unit', title: '合计金额', width:120, align: 'right'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
    if(flushFlg){
    	query();
    }
}


/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchCode").val(data.branchCode);
		$("#branchNameOrCode").val("["+data.branchCode+"]"+data.branchName);
	},"","");
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
	
	$("#queryForm").attr("action",contextPath+"/cashDaily/report/exportList");
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
	$("#cashDaily").datagrid("options").queryParams = formData;
	$("#cashDaily").datagrid("options").method = "post";
	$("#cashDaily").datagrid("options").url =  contextPath+"/cashDaily/report/getList";
	$("#cashDaily").datagrid("load");
	
}
//合计
function updateFooter(){
    var fields = {rmb:0,zer:0,yhk:0,zfb:0,wzf:0,yqb:0,djq:0,pdf:0,pbt:0,dxr:0,total:0};
    var argWhere = {name:'isGift',value:''}
    gridHandel.updateFooter(fields,argWhere);
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
	$("#queryForm")[0].reset();
};
