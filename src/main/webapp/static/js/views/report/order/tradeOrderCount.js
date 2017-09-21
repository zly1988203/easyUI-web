/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	//2.7_P01 20682 【需求优化】店铺销售排行界面默认查询当天的数据(2.8.0优化延时一天查询数据，默认查询昨天的数据)
    toChangeDate(1);
	$("#branchCompleCode").val(sessionBranchCompleCode);
    initDatagridRequireOrders();
    branchId = $("#branchId").val();
});
var gridHandel = new GridClass();
var gridName = "gridOrders";
//初始化表格
function initDatagridRequireOrders(){
	gridHandel.setGridName("gridOrders");
	dg=$("#gridOrders").datagrid({
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
			{field:'check',checkbox:true},
            {field:'branchName',title:'机构名称',width:'220px',align:'left',
				formatter:function(value,row,index){
					if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
					return value;
				}
			},
            {field: 'areaName', title: '所在区域', width: '86px', align: 'left'},
            {field: 'totalSaleNum', title: '销量', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalAmount', title: '总销额/元', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field: 'totalNum', title: '总订单数', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
			{field:'costAmount',title:'成本金额',width:'80px',align:'right',
				formatter:function(value,row,index){
					if(!value && value == null){
						return '';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field:'grossProfit',title:'毛利',width:'80px',align:'right',
				formatter:function(value,row,index){
					if(!value && value == null){
						return '';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field:'grossProfitRate',title:'毛利率',width:'80px',align:'center',
				formatter:function(value,row,index){
					if(!value && value == null){
						return '';
					}
					return '<b>'+value+'</b>';
				}
			},
            {field:'price',title:'客单价/元',width:'80px',align:'right',
            	formatter:function(value,row,index){
            		if(!value && value == null){
                        return '';
                    }
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'dayAvgNum',title:'日均客单数',width:'80px',align:'right',
            	formatter:function(value,row,index){
            		if(!value && value == null){
            			return '';
            		}
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'totalOffLineNum',title:'线下客单数',width:'80px',align:'right',
            	formatter:function(value,row,index){
            		if(!value && value == null){
            			return '';
            		}
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'offLinePrice',title:'线下客单价/元',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value && value == null){
                        return '';
                    }
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalLineAmount', title: '线上销额/元', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalLineSaleNum', title: '线上销量', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'totalLineNum',title:'线上客单数',width:'80px',align:'right',
            	formatter:function(value,row,index){
            		if(!value && value == null){
            			return '';
            		}
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field:'linePrice',title:'线上客单价/元',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value && value == null){
                        return '';
                    }
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'rowNo', title: '排名', width: '80px', align: 'right'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice(gridName,["costAmount","grossProfit","grossProfitRate"])
    }
}


//查询要货单
function queryForm(){
    $("#startCount").val('');
    $("#endCount").val('');
	var fromObjStr = $('#queryForm').serializeObject();
    if( fromObjStr.startTime==="" || fromObjStr.endTime ===""){
        $_jxc.alert("请选择查询时间段");
        return;
    }
    // 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid('options').url = contextPath + '/bill/tradeOrderCount/getTradeOrderCounts';
	$("#gridOrders").datagrid('load', fromObjStr);
}

/**
 * 查询机构
 */
var branchId;
function selectBranches(){
	new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
    	$("#branchCompleCode").val(data.branchCompleCode);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'DV',branchId);
}
/**
 * 重置
 */
var resetForm = function() {
	location.href = contextPath + "/bill/tradeOrderCount/view";
};

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#gridOrders').datagrid('getData').rows.length;
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

	$("#queryForm").attr("action",contextPath+'/bill/tradeOrderCount/exportList')
	$("#queryForm").submit();
}


