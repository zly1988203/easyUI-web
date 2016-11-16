/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
	initDatagridOrders();
});
//初始化表格
function initDatagridOrders(){
	goodsTab=$("#goodsTab").datagrid({
		//title:'普通表单-用键盘操作',
		align:'center',
		method: 'post',
		//url: contextPath+"/goods/report/getList",
		singleSelect:true,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		pageSize:20,
		height:'100%',
		columns:[[  
		          {field:'id',title:'商品id',hidden:true},  
		          {field:'skuCode',title:'货号'},  
		          {field:'skuName',title:'商品名称'}, 
		          {field:"barCode",title:"条码",sortable:true,tooltip:true,width:100},
		          {field:"memoryCode",title:"助记码",sortable:true,tooltip:true,width:80},
		          {field:"oneCategoryName",title:"商品一级类别",sortable:true,tooltip:true,width:80},
		          {field:"category",title:"商品类别",sortable:true,tooltip:true,width:80},
		          {field:"spec",title:"规格",sortable:true,tooltip:true,width:80},
		          {field:"brand",title:"品牌",sortable:true,tooltip:true,width:80},
		          {field:"unit",title:"库存单位",sortable:true,tooltip:true,width:60},
		          {field:"purchaseSpec",title:"进货规格",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }  
		          },
		          {field:"distributionSpec",title:"配送规格",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }  
		          },
		          {field:"vaildity",title:"保质期天数",sortable:true,tooltip:true,width:80,align:'right'},
		          {field:"originPlace",title:"产地",sortable:true,tooltip:true,width:80},
		          {field:"supplier",title:"主供应商",sortable:true,tooltip:true,width:80},
		          {field:"saleWay",title:"经营方式",sortable:true,tooltip:true,width:60,hidden:true},
		          {field:"saleWayName",title:"经营方式",sortable:true,tooltip:true,width:60},
		          {field:"supplierRate",title:"联营扣率/代销扣率",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"purchasePrice",title:"进货价",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"salePrice",title:"零售价",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"distributionPrice",title:"配送价",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"wholesalePrice",title:"批发价",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return parseFloat(value).toFixed(2);
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"vipPrice",title:"会员价",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(row.vipPrice){
		        			  return parseFloat(row.vipPrice).toFixed(2);
		        		  }
		        		  return null;
		        	  }	
		          },
		          {field:"status",title:"商品状态",sortable:true,tooltip:true,width:80,
		        	  formatter : function(status){
		        		  if(status){
		        			  return status.value;
		        		  }
		        		  return null;
		        	  }	
		          },
		          {field:"pricingType",title:"计价方式",sortable:true,tooltip:true,width:80,
		        	  formatter : function(pricingType){
		        		  if(pricingType){
		        			  return pricingType.value;
		        		  }
		        		  return null;
		        	  }

		          },
		          {field:"inputTax",title:"进项税率",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return (100*(parseFloat(value))).toFixed(2)+"%";
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"outputTax",title:"销项税率",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return (100*(parseFloat(value))).toFixed(2)+"%";
		        		  }
		        		  return null;
		        	  }
		          },
		          {field:"profitAmtRate",title:"毛利率",sortable:true,tooltip:true,width:80,align:'right',
		        	  formatter : function(value,row,index){
		        		  if(value){
		        			  return (100*(parseFloat(value))).toFixed(2)+"%";
		        		  }
		        		  return null;
		        	  }	
		          }





		          ]] ,
		          toolBar : "#tg_tb",
		          /*  onBeforeLoad:function(param){
   			var categoryCodeTree = $("#categoryCodeTree").val();
   			if(categoryCodeTree==null || categoryCodeTree==""){
   				return false;
   			}
   			return true;
   		}, */
		          enableHeaderClickMenu: false,
		          enableHeaderContextMenu: false,
		          enableRowContextMenu: false

	});
}

/**
 * 供应商选择
 */
function searchSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
	});
}

/**
 * 类别选择
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);
	});
}

/**
 * 品牌选择
 */
function searchBind(){
	new publicBrandService(function(data){
		$("#brandId").val(data.id);
		$("#brandName").val(data.brandName);
	});
}

/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
	$("#branchId").val(data.branchesId);
	$("#branchName").val(data.branchName);
	});
}

/**
 * 商品货号
 */
function selectSkuCode(){
	new publicGoodsService("",function(data){
		$("#skuCode").val(data[0].skuCode);
	},"",1);

}

/**
 * 商品条码
 */
function selectBarCode(){
	new publicGoodsService("",function(data){
		$("#barCode").val(data[0].barCode);
	},"",1);

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

	var length = $("#goodsTab").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}

	$("#queryForm").attr("action",contextPath+"/goods/report/exportList");
	$("#queryForm").submit(); 

}

//查询
function query(){
	$("#goodsTab").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#goodsTab").datagrid("options").method = "post";
	$("#goodsTab").datagrid("options").url = contextPath+"/goods/report/getList";
	$("#goodsTab").datagrid("load");
}
//重置
function resetFrom(){
	
	$("#queryForm").form('clear');
}
//打印
function printReport(){
	var supplierId=$("#supplierId").val();
	var categoryCode=$("#categoryCode").val();
	var brandId=$("#brandId").val();
	var branchId=$("#branchId").val();
	var skuCode=$("#skuCode").val();
	var barCode=$("#barCode").val();
	var operater=$("#operater").val();
	var operaterNum=$("#operaterNum").val();
	var memoryCode=$("#memoryCode").val();
	parent.addTabPrint("reportPrint"+branchId,"打印",contextPath+"/goods/report/printReport?" +"&supplierId="+supplierId
			+"&categoryCode="+categoryCode+"&brandId="+brandId+"&skuCode="+skuCode+"&branchId="+branchId+"&barCode="+barCode
			+"&operater="+operater+"&operaterNum="+operaterNum+"&memoryCode="+memoryCode);
}