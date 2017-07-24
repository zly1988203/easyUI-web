/*----------门店目标计划环比-------------------*/
$(function(){
	//开始和结束时间
    $("#rptDate").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    
    $("#branchCodeName").val(sessionBranchCodeName);
    $("#branchCompleCode").val(sessionBranchCompleCode);
    
    initDataCateSaleReport()
    
    $('#branchSelect').branchSelect();
});

var datagridId = 'saleReportList';
var gridHandel = new GridClass();
//初始化表格
function initDataCateSaleReport(){
	gridHandel.setGridName(datagridId);
	
	dg = $("#"+datagridId).datagrid({
        align:'right',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
		columns:[[
			{field:'branchCode',title:'机构编码',width: 100,align:'left',rowspan:2},
			{field:'branchName',title:'机构名称',width: 120,align:'left',rowspan:2,
				formatter:function(value,row,index){
					if(row.isFooter){
	        			return '<p class="ub ub-ac ub-pe uc-red">合计:</p>';
	        		}
	        		return value;
            	}	
			},
			{field:'lastSaleNum',title:'上月实际销售',width: 100,align:'center',colspan:hasCostPrice?3:1},
			{field:'lastMonthComplePercentStr',title:'上月销售完成率',width: 100,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
            	}
			},
			{field:'curTarget',title:'当月目标',width: 100,align:'center',colspan:3},
			{field:'curSaleNum',title:'当月实际销售',width: 100,align:'center',colspan:hasCostPrice?3:1},
			{field:'currMonthCostHbPercentStr',title:'当月实际成本环比',width: 110,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
            	}	
			},
			{field:'currMonthSaleHbPercentStr',title:'当月销售金额环比',width: 110,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
            	}
			},
			{field:'currMonthComplePercentStr',title:'当月销售完成率',width: 110,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
            	}
			},
			{field:'currMonthProfitGrowth',title:'当月利润增长额',width: 100,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
			},
			{field:'nextTarget',title:'下月目标',width: 100,align:'center',colspan:3},
			{field:'nextMonthPlanGrowthRateStr',title:'下月计划增长率',width: 100,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+value+'</b>';
            	}	
			}
        ],[ 
            {field:'lastMonthSaleAmount',title:'销售金额',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'lastMonthCostAmount',title:'销售成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'lastMonthProfitAmount',title:'毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'currMonthSalePlan',title:'销售目标',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'currMonthCostPlan',title:'目标成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'currMonthProfitPlan',title:'目标毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'currMonthSaleAmount',title:'销售金额',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'currMonthCostAmount',title:'销售成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'currMonthProfitAmount',title:'毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'nextMonthSalePlan',title:'销售目标',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'nextMonthCostPlan',title:'目标成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'nextMonthProfitPlan',title:'目标毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            }
        ]],
        onLoadSuccess:function(data){
        	gridHandel.setDatagridHeader("center");
        	//updateFooter();
        }       
    });
   // queryForm();
	if(!hasCostPrice){
		priceGrantUtil.grantCostPrice(datagridId,['lastMonthCostAmount','lastMonthProfitAmount','currMonthCostAmount','currMonthProfitAmount','currMonthCostHbPercentStr','currMonthProfitGrowth'])
	}
	
}


//查询入库单
function queryForm(){
	 if($("#branchName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
    $("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/target/storePlan/report/mom/getList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}


/**
 * 导出
 */
function exportData(){
	var length = $("#"+datagridId).datagrid('getData').total;
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
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$("#queryForm").attr("action",contextPath+"/target/storePlan/report/mom/exportExcelList");
	$("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#rptDate").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};