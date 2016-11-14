/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	toChangeDate(10);
	branchId = $("#branchId").val();
	brancheType = $("#brancheType").val();
	//初始化默认条件
	initDatagridRequireOrders();
	//选择报表类型
	changeType();
	//切换radio 禁启用
	checktype();
});

var flushFlg = false;
function changeType(){
	$(".radioItem").change(function(){
		checktype()
		var val = $(this).val();
		console.log(val);
		if (val==0) {
			flushFlg=true;
			initDatagridRequireOrders();
		} else if (val==1) {
			initDatagridByGoods();
		}
		$("#marketWater").datagrid('loadData', { total: 0, rows: [] });
    	$('#marketWater').datagrid({showFooter:false});
	});
}

//切换radio 4个状态的禁用和启用 以及值的清空
function checktype(){
 var len=$('.radioItem').length;
	for(var i=0;i<len;i++){
		var check=$('.radioItem').eq(i).prop('checked');
		var value=$('.radioItem').eq(i).val();
		if(check==true&&value=='0'){
			$('#sourceBranchName').addClass('uinp-no-more');
			$('#sourceBranchName').removeAttr('onclick');
			$('#sourceBranchName').val("");
			$('.uinp-sourceName').removeAttr('onclick');
			$('#formNo').removeClass('uinp-no-more');
			$('#formNo').removeAttr("readonly");
		}
		else if(check==true&&value=='1'){
			$('#sourceBranchName').removeClass('uinp-no-more');
			$('#sourceBranchName').attr('onclick',"searchBranch()");
			$('.uinp-sourceName').removeAttr('onclick');
			$('#formNo').addClass('uinp-no-more');
			$('#formNo').val("");
			$('#formNo').attr("readonly","readonly");
		}	
   }	
}


var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
	gridHandel.setGridName("marketWater");
    $("#marketWater").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize : 50,
		height:'100%',
		width:'100%',
        columns:[[
			//{field:'check',checkbox:true},
			 {field: 'inFormNo', title: '要货单号', width: '86px', align: 'left',
				 formatter:function(value,row,index){
		                if(!value){
		                    return '<div class="ub ub-pc ufw-b">合计</div> '
		                }
						var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.inFormId+'")';
						return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
		            } 
            },
            {field: 'targetBranchName',title:'要货机构',width:'130px',align:'left'},
            {field: 'sourceBranchName',title:'发货机构',width:'130px',align:'left'},
            {field: 'outFormNo', title: '出库单号', width: '86px', align: 'left',
            	formatter:function(value,row,index){
		   			if(row.outFormId){
		   				var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.outFormId+'")';
						return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
		   			}
	           }   
            },
            {field: 'skuCode', title: '货号', width: '80px', align: 'left'},
            {field: 'skuName', title: '商品名称', width: '86px', align: 'left'},
            {field: 'barCode', title: '条码', width: '80px', align: 'left'},
            {field: 'spec', title: '规格', width: '45px', align: 'left'},
            {field: 'unit', title: '单位', width: '45px', align: 'left'},
            {field: 'categoryName', title: '商品类别', width: '55px', align:'center'},
            {field: 'defectNum', title: '缺货数', width: '60px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.defectNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field: 'outRate', title: '缺货率', width: '100px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outRate){
						return '<b>'+(parseFloat(value||0)*100).toFixed(2)+'%</b>';
					}
					return '<b>'+(parseFloat(value||0)*100).toFixed(2)+'%</b>';
				},
            },
            {field: 'inApplyNum', title: '要货数量', width: '60px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.inApplyNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'inAmount', title: '要货金额', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '0.00';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'outDealNum', title: '发货数量', width: '60px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outDealNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'outAmount', title: '发货金额', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.outAmount){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            }
            ]],
            onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}




//初始化表格
function initDatagridByGoods(){
	gridHandel.setGridName("marketWater");
    $("#marketWater").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
       // fit:true,            //占满
        showFooter:true,
        pageSize : 50,
		height:'100%',
		width:'100%',
        columns:[[
			//{field:'check',checkbox:true},
			{field: 'skuCode', title: '货号', width: '120px', align: 'left',
				formatter:function(value,row,index){
					if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return row.skuCode;
				}
				 
			},
            {field: 'skuName', title: '商品名称', width: '120px', align: 'left'},
            {field: 'barCode', title: '条码', width: '80px', align: 'left'},
            {field: 'spec', title: '规格', width: '45px', align: 'left'},
            {field: 'unit', title: '单位', width: '45px', align: 'left'},
            {field: 'categoryName', title: '商品类别', width: '55px', align:'center'},
            {field: 'defectNum', title: '缺货数', width: '60px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.defectNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field: 'outRate', title: '缺货率', width: '100px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outRate){
						return '<b>'+(parseFloat(value||0)*100).toFixed(2)+'%</b>';
					}
					return '<b>'+(parseFloat(value||0)*100).toFixed(2)+'%</b>';
				},
            },
            {field: 'inApplyNum', title: '要货数量', width: '60px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.inApplyNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'inAmount', title: '要货金额', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'outDealNum', title: '发货数量', width: '60px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outDealNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'outAmount', title: '发货金额', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.outAmount){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            }
            ]],
            onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}








//查询
function queryForm(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}	
	$("#marketWater").datagrid("options").url = '';
	var fromObjStr = $('#queryForm').serializeObject();
	$("#marketWater").datagrid("options").queryParams = fromObjStr;
	$('#marketWater').datagrid({showFooter:true});
	$("#marketWater").datagrid("options").method = "post";
	$("#marketWater").datagrid('options').url = contextPath + '/report/outOfStock/reportListPage';
	$("#marketWater").datagrid('load');
	
}
/**
 * 店铺名称
 */
function searchBranch(type){
	var branchesId;
	if (type === 0) {
		branchesId = $("#targetBranchId").val();
	} else {
		branchesId = $("#sourceBranchId").val();
	}
	new publicAgencyService(function(data){
		if(type==0){
			$("#targetBranchId").val(data.branchesId);
			$("#targetBranchName").val(data.branchName);
		}else{
			$("#sourceBranchId").val(data.branchesId);
			$("#sourceBranchName").val(data.branchName);
		}
	});
}



/**
 * 店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		if(type==0){
			$("#targetBranchId").val(data.branchesId);
			$("#targetBranchName").val(data.branchName);
		}else{
			$("#sourceBranchId").val(data.branchesId);
			$("#sourceBranchName").val(data.branchName);
		}
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


/**
 * 操作员列表下拉选
 */
function selectOperator(){
	new publicOperatorService(function(data){
		//data.Id
		$("#createUserId").val(data.id);
		$("#createUserName").val("["+data.userCode+"]"+data.userName);
	});
}

/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};



/**
 * 导出
 */
function exportExcel(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}
	var length = $("#marketWater").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/report/outOfStock/exportList");
	$("#queryForm").submit(); 
}


