/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	toChangeDate(10);
	initDatagridRequireOrders();
	branchId = $("#branchId").val();
	brancheType = $("#brancheType").val();
});

var gridHandel = new GridClass();
//初始化表格
var dg;
function initDatagridRequireOrders(){
	gridHandel.setGridName("marketWater");
	dg= $("#marketWater").datagrid({
        //title:'普通表单-用键盘操作'
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
        pageList : [20, 50, 100],
		height:'100%',
		width:'100%',
        columns:[[
			//{field:'check',checkbox:true},
            {field: 'branchName',title:'机构名称',width:'150px',align:'left'},
            {field: 'skuCode', title: '货号', width: '80px', align: 'left'},
            {field: 'skuName', title: '商品名称', width: '200px', align: 'left'},
            {field: 'barCode', title: '条码', width: '115px', align: 'left'},
            {field: 'formNO', title: '单据编号', width: '135px', align: 'left',
            	formatter:function(value,row,index){
		   			if(row.formNO){
		   				var hrefStr='parent.addTab("详情","'+contextPath+'/goods/priceAdjust/showDetail?report=close&formNo='+row.formNO+'")';
		   				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
		   			}
	           }   
            },
            {field: 'effectDate',title:'生效日期',width:'115px',align:'left',
	        	   formatter : function(value, rowData, rowIndex) {
	        		   return formatDate(value,'yyyy-MM-dd');
	        	   }   
            },
            {field: 'isEffected', title: '是否生效', width: '55px', align:'center',
            	formatter : function(isEffected){
        			if(isEffected=="0"){
        				return "未生效";
        			}else{
        				return "生效"; 
        			}
        			return null;
        		}
            },
            {field: 'oldPurPrice', title: '原进货价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'newPurPrice', title: '新进货价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'oldSalePrice', title: '原零售价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return  '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'newSalePrice', title: '新零售价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'oldDcPrice', title: '原配送价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'newDcPrice', title: '新配送价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'oldVipPrice', title: '原会员价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return  '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'newVipPrice', title: '新会员价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return  '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'oldWsPrice', title: '原批发价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return   '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'newWsPrice', title: '新批发价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(!value){
                        return '<b>0.00</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
			//{field: 'oldGrossProfitRate', title: '原毛利率', width: '60px', align: 'right'},
			//{field: 'newGrossProfitRate', title: '现毛利率', width: '60px', align: 'right'},
            {field: 'spec', title: '规格', width: '45px', align: 'left'},
            {field: 'unit', title: '单位', width: '45px', align: 'left'},
            {field: 'validTime', title: '审核日期', width: '80px', align: 'left',
            	formatter : function(value, rowData, rowIndex) {
	        		   return formatDate(value,'yyyy-MM-dd');
	        	} 	
            },
            {field: 'validUser', title: '审核人', width: '80px', align: 'left'}


            ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}


//查询
function queryForm(){
	$("#startCount").val('');
	$("#endCount").val('');
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	$("#marketWater").datagrid("options").method = "post";
	$("#marketWater").datagrid('options').url = contextPath + '/report/pricingQuery/reportListPage';
	$("#marketWater").datagrid('load', fromObjStr);
}

/**
 * 查询店铺
 */
var branchId;
var brancheType;
function selectBranches(){
	new publicAgencyService(function(data){
        if($("#branchId").val()!=data.branchesId){
            $("#branchId").val(data.branchesId);
            $("#branchName").val(data.branchName);
        }
	},'',branchId);
}


/**
 * 店铺名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'BF','');
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
function exportData(){
	var length = $('#marketWater').datagrid('getData').rows.length;
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
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$("#queryForm").attr("action",contextPath+"/report/pricingQuery/exportList");
	$("#queryForm").submit();
}


