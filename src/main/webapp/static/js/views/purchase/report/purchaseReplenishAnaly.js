var pageSize = 50;
$(function() {
	
	//初始化默认条件
	initSearchParams();
	
	//初始化Datagrid
    initPurchaseReplenishAnalyDg();

    //初始化时间的限制时间 最多选到明天
    $("#replenishEndDate").val(dateUtil.addStartTime(dateUtil.getCurrDayPreOrNextDay("next",1)).format("yyyy-MM-dd"));
    
});

//初始化默认条件
function initSearchParams(){
	$("#replenishDate").val(dateUtil.getCurrentDateDay());
    $("#branchCodeName").val(sessionBranchCodeName);
    $("#branchType").val(sessionBranchType);
    $("#branchId").val(sessionBranchId);
    $("#branchCompleCode").val(sessionBranchCompleCode);
    $("#branchParentId").val(sessionBranchParentId);
    
    //如果是门店，则只能查看当前店铺数据
	if(sessionBranchType >= 3){
		$("#selectBranchMore").hide();
		$("#branchCodeName").prop('disabled','disabled');
		$("#branchCodeName").unbind("click");
	}
}

var gridHandel = new GridClass();
var dg;
function initPurchaseReplenishAnalyDg(){
	gridHandel.setGridName("dgPurchaseReplenishAnaly");

	dg = $("#gridPurchaseReplenishAnaly").datagrid({
       method:'post',
       align:'center',
       //url:contextPath+'/purchaseReplenishAnaly/getReportList',
       //queryParams:formData,
       singleSelect:true,  //单选  false多选
       rownumbers:true,    //序号
       pagination:true,    //分页
       pageSize:50,
       //fitColumns:true,    //每列占满
       fit:true,            //占满
       showFooter:true,
       columns:[[
           {field:'supplierName',title:'供应商',width:150,align:'left'},
           {field:'branchName',title:'收货机构',width:120,align:'left'},
           {field:'skuCode',title:'货号',width:80,align:'left'},
           {field:'skuName',title:'商品名称',width:180,align:'left'},
           {field:'barCode',title:'条码',width:120,align:'left'},
           {field:'isFastDeliverStr',title:'是否直送',width:80,align:'left'},
           {field:'skuUnit',title:'单位',width:60,align:'left'},
           {field:'skuSpec',title:'规格',width:60,align:'left'},
           {field:'purchaseSpec',title:'进货规格',width:80,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   }    
           },
           {field:'purchasePrice',title:'进价',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field:'diliveCycle',title:'订货周期',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   }    
           },
           {field:'safetyCoefficient',title:'安全系数',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   }    
           },
           {field:'purchaseNum',title:'订货数量',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   }    
           },
           {field:'totalAmount',title:'金额',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field:'lastWeekAvgSales',title:'上周日销量',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   }    
           },
           {field:'previousWeekAvgSales',title:'前周日销量',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   } 
           },
           {field:'actualStock',title:'库存',width:120,align:'right',
        	   formatter:function(value,row,index){
        		   return parseFloat(value||0).toFixed(2);
        	   }    
           }
       ]],
       onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
       }
	});
	
	//如果当前机构是店铺，则直接获取当前数据
	if(sessionBranchType>2){
		queryForm();
	}
}

//查询
function queryForm(){
	
	var branchType = $("#branchType").val();
	if(branchType<3){
		successTip("机构必须选择店铺类型!");
		return;
	}
	
	var replenishDate = $("#replenishDate").val();
	if(!replenishDate){
		successTip("补货时间不能为空!");
		return;
	}
	
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    //fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)

	$("#gridPurchaseReplenishAnaly").datagrid("options").method = "post";
	$("#gridPurchaseReplenishAnaly").datagrid('options').url = contextPath + '/purchaseReplenishAnaly/getReportList';
	$("#gridPurchaseReplenishAnaly").datagrid('load', fromObjStr);
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchType").val(data.type);
		$("#branchCodeName").val("["+data.branchCode+"]"+data.branchName);
		$("#branchParentId").val(data.parentId);
	},'DD','');
}

function selectSupplier(){
	
	var param = null;
	
	var supplierCodeName = $("#supplierCodeName").val(); 
	var supplierId = $("#supplierId").val();
	
	var branchId=$("#branchId").val();
	
	//如果是店铺类型，则取父节点分公司的数据
	if(parseInt($("#branchType").val())>=3){
		branchId = $("#branchParentId").val();
	}
	
	//关键词取编号
	var reg = /\[\d{6}\]/;
	if(reg.test(supplierCodeName)){
		supplierCodeName = "";
	}
	
	if(!supplierId){
		param = {
			supplierCodeOrName : supplierCodeName,
			branchId : branchId
		};
	}else{
		param = {
			branchId : branchId
		};
	}
	
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierCodeName").val("["+data.supplierCode+"]"+data.supplierName);
	}, null, param);
}

//回车或失去焦点后，查询供应商
function supplierAutoComple(){
	//非回车事件和失去焦点，不做处理(失焦时event.keyCode为undefined)
	if(event.keyCode && event.keyCode != 13){
		return;
	}
	var supplierNameOrsupplierCode = $("#supplierCodeName").val();
	var branchId=$("#branchId").val();
	
	//如果是店铺类型，则取父节点分公司的数据
	if($("#branchType").val()>=3){
		branchId = $("#branchParentId").val();
	}
	
	//未输入值时，直接返回，无需查询
	if("" == supplierNameOrsupplierCode){
		$("#supplierId").val("");
		return;
	}
	
	//避免用户直接输入完整格式: [编号]名称
	var reg = /\[\d{6}\]/;
	if(reg.test(supplierNameOrsupplierCode)){
		//取出[]里的编号，默认取已第一个[]里的值
		reg = /\[(\d{6})\]/;
		arr = reg.exec(supplierNameOrsupplierCode);
		supplierNameOrsupplierCode = arr[1];
	}
	//请求数据
	var httpUrl = contextPath + "/common/supplier/getComponentList";
	var args = {"supplierNameOrsupplierCode" : supplierNameOrsupplierCode,"branchId" : branchId};
	$.post(httpUrl, args,function(data){
		if(!data || data.rows.length == 0){
			//未查询到数据，设置ID为空
			$("#supplierId").val("");
			$("#supplierCodeName").val("");
			return;
		}

		//如果精确匹配到一条数据
		if(data.rows.length == 1){
			var rec = data.rows[0];
			var supplierId = rec.id;
			var supplierName = rec.supplierName;
			var supplierCode = rec.supplierCode;
			//完善文本显示
			$("#supplierCodeName").val("["+supplierCode+"]"+supplierName);
			//记录ID值,用于后台查询
			$("#supplierId").val(supplierId);
		}

		//如果有多条数据
		if(data.rows.length > 1){
			selectSupplier();
		}
	});
}

/**
 * 重置
 */
function resetForm(){
	$("#queryForm").form('clear');
	$("#replenishDate").val(dateUtil.getCurrentDateDay());
};

/**
 * 导出
 */
function exportData(){
	var length = $('#gridPurchaseReplenishAnaly').datagrid('getData').rows.length;
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

function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){
			var dataObj=eval("("+result+")");
			successTip(dataObj.message);
		}
	});
	$("#queryForm").attr("action",contextPath+"/purchaseReplenishAnaly/exportReportList");
	$("#queryForm").submit();
}

