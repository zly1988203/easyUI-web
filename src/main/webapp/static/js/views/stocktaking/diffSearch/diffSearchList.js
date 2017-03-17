
//初始化表格
$(function(){
    initPageData();
	initDgTakeStockDiffSearch();
    $(".radioItem").on("change",function(){
    	$("#diffSearchList").datagrid('options').url = "";
        $('#rotationType').val($(this).val());
    	initDgTakeStockDiffSearch();
    	$('#diffSearchList').datagrid({data:[]}); 
    	// 更新页脚行并载入新数据
    	$('#diffSearchList').datagrid('reloadFooter',[]);
    	// 页面控制
    	pageChange();
    	
    })
});

function  initPageData() {
    $("#branchName").val(sessionBranchName);
    $("#branchId").val(sessionBranchId);
    $("#branchCompleCode").val(sessionBranchCompleCode);
    $("#oldBranchName").val(sessionBranchName);
    //开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    $("input[name=rotation]:eq(0)").prop('checked','checked')
    $('#rotationType').val('1');
    initDgTakeStockDiffSearch();
    $('#diffSearchList').datagrid({data:[]});
    // 更新页脚行并载入新数据
    $('#diffSearchList').datagrid('reloadFooter',[]);
    pageChange();
}

//页面元素控制
function pageChange(){
	var rotaType = $('#rotationType').val();
	if(rotaType === '1'){

		$('#skuId').val("");
    	$('#skuName').val("");
    	$('#skuName').prop('disabled','disabled');
    	
		$('#divgood').prop('hidden',true);
		$('#divEqualZero').css('display','none');

        $('#equalZero').removeProp('checked');

    	$('#categoryId').val('');
		$('#categoryName').val('');
		$('#categoryName').prop('disabled','disabled');
    	$('#categoryDiv').prop('hidden',true);
		
	}else{
		$('#skuId').val("");
    	$('#skuName').val("");
		$('#skuName').removeProp('disabled');

		$('#divgood').prop('hidden',false);
		$('#divEqualZero').css('display','block');

		
		$('#categoryId').val('');
		$('#categoryName').val('');
		$('#categoryName').removeProp('disabled');
		$('#categoryDiv').prop('hidden',false);
		
	}
}


var dg;
function initDgTakeStockDiffSearch(){
	dg = $("#diffSearchList").datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
        pageSize:50,
		fitColumns:true,    //每列占满
		showFooter:true,
		height:'100%',
		width:'100%',
		columns:getFiledsList(),
		onLoadSuccess : function(data) {
			gridHandel.setDatagridHeader("center");
		}
	});
}
function getFiledsList(){
	if($('#rotationType').val() === '1'){
		return [ [
		          {field:'check',checkbox:true},
		          {field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
		          {field: 'branchName', title: '机构名称', width: 180, align: 'left'},
		          {field: 'batchNo', title: '盘点批号', width: 150, align: 'left'},
		          {field: 'snapshootStockNum', title: '系统库存', width: 140, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.snapshootStockNum){
                              row.snapshootStockNum = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  },
		          {field: 'stocktakingNum', title: '盘点数量', width: 100, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.stocktakingNum){
                              row.stocktakingNum = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  },
		          {field: 'profitLossNum', title: '盈亏数量', width: 100, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.profitLossNum){
                              row.profitLossNum = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  },
		          {field: 'profitLossCostAmount', title: '盈亏金额（成本价）', width: 140, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.profitLossCostAmount){
                              row.profitLossCostAmount = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  },
		          {field: 'profitLossSaleAmount', title: '盈亏金额（售价）', width: 140, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.profitLossSaleAmount){
                              row.profitLossSaleAmount = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  },
		          {field: 'stocktakingNumHandle', title: '实际处理数量', width: 160, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.stocktakingNumHandle){
                              row.stocktakingNumHandle = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  },
		          {field: 'costAmountHandle', title: '实际处理金额（成本价）', width: 200, align: 'right',
                      formatter : function(value, row, index) {
                          if(row.isFooter){
                              return;
                          }

                          if(!row.costAmountHandle){
                              row.costAmountHandle = parseFloat(value||0).toFixed(2);
                          }

                          return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                      },
				  }
		          ] ]
	}else{
		return [ [
		          {field:'check',checkbox:true},
		          {field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
		          {field: 'branchName', title: '机构名称', width: 180, align: 'left'},
		          {field: 'batchNo', title: '盘点批号', width: 180, align: 'left'},
		          {field: 'validUserName', title: '审核人', width: 180, align: 'left'},
		          {field: 'skuCode', title: '货号', width: 80, align: 'left'},
		          {field: 'skuName', title: '商品名称', width: 180, align: 'left'},

					{field: 'snapshootStockNum', title: '系统库存', width: 100, align: 'right',
						formatter : function(value, row, index) {
							if(row.isFooter){
								return;
							}

							if(!row.snapshootStockNum){
								row.snapshootStockNum = parseFloat(value||0).toFixed(2);
							}

							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
						},
					},
					{field: 'stocktakingNum', title: '盘点数量', width: 100, align: 'right',
						formatter : function(value, row, index) {
							if(row.isFooter){
								return;
							}

							if(!row.stocktakingNum){
								row.stocktakingNum = parseFloat(value||0).toFixed(2);
							}

							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
						},
					},
					{field: 'profitLossNum', title: '盈亏数量', width: 100, align: 'right',
						formatter : function(value, row, index) {
							if(row.isFooter){
								return;
							}

							if(!row.profitLossNum){
								row.profitLossNum = parseFloat(value||0).toFixed(2);
							}

							return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
						},
					},

		          {field: 'handle', title: '是否处理', width: 80, align: 'left'},

				{field: 'profitLossCostAmount', title: '盈亏金额（成本价）', width: 140, align: 'right',
					formatter : function(value, row, index) {
						if(row.isFooter){
							return;
						}

						if(!row.profitLossCostAmount){
							row.profitLossCostAmount = parseFloat(value||0).toFixed(2);
						}

						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					},
				},
				{field: 'profitLossSaleAmount', title: '盈亏金额（售价）', width: 140, align: 'right',
					formatter : function(value, row, index) {
						if(row.isFooter){
							return;
						}

						if(!row.profitLossSaleAmount){
							row.profitLossSaleAmount = parseFloat(value||0).toFixed(2);
						}

						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					},
				},

		          {field: 'differenceReason', title: '差异原因', width: 140, align: 'left'},
		          {field: 'categoryCode', title: '类别编码', width: 120, align: 'left'},
		          {field: 'categoryName', title: '类别名称', width: 140, align: 'left'}
		          ] ]
	}
}

//查询
function queryForm(){
	var oldBranchName = $("#oldBranchName").val();
	var branchName = $("#branchName").val();
	if(oldBranchName && oldBranchName != branchName){
		$("#branchId").val('');
		$("#branchCompleCode").val('');
	}
	
	if(oldbatchNo && oldbatchNo != batchNo){
		$("#batchId").val('');
	}
	
	if(oldskuName && oldskuName != skuName){
		$("#skuId").val('');
	}
	
	var oldCategoryName = $("#oldCategoryName").val();
	var categoryName = $("#categoryName").val();	
	if(oldCategoryName && oldCategoryName != categoryName){
		$("#categoryId").val('');
	}
	
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)

	$("#diffSearchList").datagrid("options").method = "post";
	$("#diffSearchList").datagrid('options').url = contextPath + '/stocktaking/diffSearch/getDiffSearchList';
	$("#diffSearchList").datagrid('load', fromObjStr);
}

//重置
function gFunRefresh(){
	$("#queryForm").form('clear');
    initPageData();
}
/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCompleCode").val(data.branchCompleCode);
		$("#branchName").val(data.branchName);
		$("#oldBranchName").val(data.branchName);
	},'BF','');
}

function searchTakeStock(){
	var branchId = $('#branchId').val();
	var branchCompleCode = $("#branchCompleCode").val();
	var param = {
			status:1,
			branchCompleCode:branchCompleCode
	}
	new publicStocktakingDialog(param,function(data){
		console.log(data);
//		$("#branchId").val(data.branchId);
//		$("#branchName").val(data.branchName);
		$("#batchId").val(data.id);
		$("#batchNo").val(data.batchNo);
		$("#scope").val(data.scope==1 ? "类别盘点" : "全场盘点");
//		$("#categoryShows").val(data.categoryShowsStr);
	})
}

//选择商品
function selectGoods(){
	var branchId = $("#branchId").val();
	var sourceBranchId = branchId;
	var targetBranchId = branchId;
    if(branchId == ""){
        messager("请先选择机构");
        return;
    }
    
    var param = {
    		type:'',
    		key:"",
    		isRadio:'1',
    		branchId:branchId,
    		sourceBranchId:'',
    		targetBranchId:'',
    		supplierId:'',
    		flag:'0'
    }
    
    new publicGoodsServiceTem(param,function(data){
    	$('#skuId').val(data[0].skuId);
    	$('#skuName').val(data[0].skuName);
    });
}

/**
 * 类别选择
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryId").val(data.categoryId);
		$("#categoryName").val(data.categoryName);
		$("#oldCategoryName").val(data.categoryName);
	});
}
/**
 * 导出
 */
function exportDiffSearchData(){
	var length = $('#diffSearchList').datagrid('getData').total;
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
	var length = $("#diffSearchList").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/stocktaking/diffSearch/exportDiffSearchList?"+fromObjStr);
	$("#queryForm").submit();
}

/**
 * 打印
 */
function printDiffSearchList(){
	var length = $("#diffSearchList").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	var param=setParams("queryForm");
	console.log(param);
	parent.addTabPrint("异常查询","打印",contextPath+"/stocktaking/diffSearch/printDiffSearchList?" + param);
}

function setParams(formId){  
	var param="";
	var arr = $('#' + formId).serializeArray();
	if(arr != null){
		for(var i=0;i<arr.length;i++){
			var _val = encodeURIComponent(arr[i].value);
			if(_val){
				param = param + arr[i].name + "="+_val+"&";
			}
		}
	}
	if(param){
		param = param.substring(0,param.length-1);
	}
	return param;
}
