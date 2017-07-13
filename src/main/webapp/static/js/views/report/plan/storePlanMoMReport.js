//区分时段销售分析 货类销售分析
var serviceType;
$(function(){
	//开始和结束时间
    $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    serviceType = $('#serviceType').val(); 
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
        data:[
              {
            	  branchCode:'0001',
            	  branchName:'科兴科学园',
            	  oneyue:10
              },
              {
            	  branchCode:'0002',
            	  branchName:'中洲华府',
            	  oneyue:20
              },
              {
            	  branchCode:'0003',
            	  branchName:'海岸城',
            	  oneyue:30
              }
             ],
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
		columns:[[
			{field:'branchCode',title:'机构编码',width: 100,align:'left',rowspan:2},
			{field:'branchName',title:'机构名称',width: 140,align:'left',rowspan:2,
				formatter:function(value,row,index){
					if(row.isFooter){
	        			return '<p class="ub ub-ac ub-pe uc-red">合计:</p>';
	        		}
	        		return value;
            	}	
			},
			{field:'lastSaleNum',title:'上月实际销售',width: 100,align:'center',colspan:3},
			{field:'lastSaleRate',title:'上月销售完成率',width: 90,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
			},
			{field:'curTarget',title:'当月目标',width: 100,align:'center',colspan:3},
			{field:'curSaleNum',title:'当月实际销售',width: 100,align:'center',colspan:3},
			{field:'curCostRate',title:'当月实际成本环比',width: 100,align:'right',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}	
			},
			{field:'curSale',title:'当月销售金额环比',width: 100,align:'center',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
			},
			{field:'curSaleRate',title:'当月销售完成率',width: 100,align:'center',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
			},
			{field:'curProfit',title:'当月利润增长额',width: 100,align:'center',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
			},
			{field:'nextTarget',title:'下月目标',width: 100,align:'center',colspan:3},
			{field:'nextTarRate',title:'下月计划增长率',width: 100,align:'center',rowspan:2,
				formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}	
			}
        ],[ 
            {field:'oneyue',title:'销售金额',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'twoyue',title:'销售成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'twoyue2',title:'毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'threeyue',title:'销售目标',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'fouryue',title:'目标成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'fiveyue',title:'目标毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'sixyue',title:'销售金额',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'sevenyue',title:'销售成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'eightyue',title:'毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'nightyue',title:'销售目标',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'tenyue',title:'目标成本',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'elevenyue',title:'目标毛利',width: 80,align:'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            }
        ]],
        onLoadSuccess:function(data){
        	gridHandel.setDatagridHeader("center");
        	updateFooter();
        }       
    });
   // queryForm();
}


function updateFooter(){
    gridHandel.updateFooter({},{});
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
	// 去除编码
	fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportData(){
	var length = $('#storeDaySale').datagrid('getData').total;
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
/**
 * 导出
 */
function exportExcel(){
	var length = $("#"+datagridId).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/storeDaySale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
};