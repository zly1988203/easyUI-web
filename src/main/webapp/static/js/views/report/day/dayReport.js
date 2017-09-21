/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    //初始化默认条件
    initConditionParams();
    initDatagridDay();
});

//初始化默认条件
function initConditionParams(){
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var gridHandel = new GridClass();
var gridName= "dayReport";
//初始化表格
function initDatagridDay(){
	gridHandel.setGridName("dayReport");
	dg = $("#dayReport").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
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
            {field:'rptDate',title:'日期',width:'100px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
                    return str;
                }},
            {field:'branchName',title:'机构',width:'140px',align:'left'},
            {field:'skuCode',title:'货号',width:'80px',align:'left'},
            {field:'skuName',title:'商品名称',width:'150px',align:'left'},
			{field:'barCode',title:'条码',width:100,align:'left'},
			{field:'spec',title:'规格',width:100,align:'left'},
			{field:'unit',title:'单位',width:100,align:'left'},
            {field:'beginStock',title:'期初库存数',width:'130px',align:'right',
            	formatter:function(value,row,index){
				    if(value || value ==0){
				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
				    }
				},
            	editor:{
                    type:'numberbox',
                    options:{
                    	disabled:true,
                        min:0,
                        precision:1
                    }
                }},
            {field:'beginCostAmount',title:'期初成本金额',width:'130px',align:'right',
            	formatter:function(value,row,index){
				    if(value || value ==0){
				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
				    }
				},
            	editor:{
                    type:'numberbox',
                    options:{
                    	disabled:true,
                        min:0,
                        precision:1
                    }
                }},
            {field:'beginSaleAmount',title:'期初销售金额',width:'130px',align:'right',
                    	formatter:function(value,row,index){
                    		 if(value || value ==0){
        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
        				    }
        				},
                    	editor:{
                            type:'numberbox',
                            options:{
                            	disabled:true,
                                min:0,
                                precision:1
                            }
                        }},
            {field:'purchaseNum',title:'采购数量',width:'130px',align:'right',
                        	formatter:function(value,row,index){
                        		 if(value || value ==0){
            				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
            				    }
            				},
                        	editor:{
                                type:'numberbox',
                                options:{
                                	disabled:true,
                                    min:0,
                                    precision:1
                                }
                            }},
            {field:'purchaseAmount',title:'采购金额',width:'130px',align:'right',
                            	formatter:function(value,row,index){
                            		 if(value || value ==0){
                				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                				    }
                				},
                            	editor:{
                                    type:'numberbox',
                                    options:{
                                    	disabled:true,
                                        min:0,
                                        precision:1
                                    }
                                }},
                                {field:'posNum',title:'销售数量',width:'130px',align:'right',
                                	formatter:function(value,row,index){
                                		 if(value || value ==0){
                    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                    				    }
                    				},
                                	editor:{
                                        type:'numberbox',
                                        options:{
                                        	disabled:true,
                                            min:0,
                                            precision:1
                                        }
                                    }},
                    {field:'costAmount',title:'销售成本金额',width:'130px',align:'right',
                                    	formatter:function(value,row,index){
                                    		 if(value || value ==0){
                        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                        				    }
                        				},
                                    	editor:{
                                            type:'numberbox',
                                            options:{
                                            	disabled:true,
                                                min:0,
                                                precision:1
                                            }
                                        }},
            {field:'dcoNum',title:'配送出库数量',width:'130px',align:'right',
                                	formatter:function(value,row,index){
                                		 if(value || value ==0){
                    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                    				    }
                    				},
                                	editor:{
                                        type:'numberbox',
                                        options:{
                                        	disabled:true,
                                            min:0,
                                            precision:1
                                        }
                                    }},
            {field:'dcoAmount',title:'配送出库金额',width:'130px',align:'right',
                                    	formatter:function(value,row,index){
                                    		 if(value || value ==0){
                        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                        				    }
                        				},
                                    	editor:{
                                            type:'numberbox',
                                            options:{
                                            	disabled:true,
                                                min:0,
                                                precision:1
                                            }
                                        }},
            {field:'dciNum',title:'配送入库数量',width:'130px',align:'right',
                                        	formatter:function(value,row,index){
                                        		 if(value || value ==0){
                            				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                            				    }
                            				},
                                        	editor:{
                                                type:'numberbox',
                                                options:{
                                                	disabled:true,
                                                    min:0,
                                                    precision:1
                                                }
                                            }},
            {field:'dciAmount',title:'配送入库金额',width:'130px',align:'right',
                                            	formatter:function(value,row,index){
                                            		 if(value || value ==0){
                                				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                				    }
                                				},
                                            	editor:{
                                                    type:'numberbox',
                                                    options:{
                                                    	disabled:true,
                                                        min:0,
                                                        precision:1
                                                    }
                                                }},
            {field:'otherNum',title:'其他出入库数量',width:'130px',align:'right',
                                                	formatter:function(value,row,index){
                                                		 if(value || value ==0){
                                    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                    				    }
                                    				},
                                                	editor:{
                                                        type:'numberbox',
                                                        options:{
                                                        	disabled:true,
                                                            min:0,
                                                            precision:1
                                                        }
                                                    }},
            {field:'otherAmount',title:'其他出入库金额',width:'130px',align:'right',
                                                    	formatter:function(value,row,index){
                                                    		 if(value || value ==0){
                                        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                        				    }
                                        				},
                                                    	editor:{
                                                            type:'numberbox',
                                                            options:{
                                                            	disabled:true,
                                                                min:0,
                                                                precision:1
                                                            }
                                                        }},
            {field:'costChangeAmount',title:'成本调整金额',width:'150px',align:'right',
                                                        	formatter:function(value,row,index){
                                                        		 if(value || value ==0){
                                            				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                            				    }
                                            				},
                                                        	editor:{
                                                                type:'numberbox',
                                                                options:{
                                                                	disabled:true,
                                                                    min:0,
                                                                    precision:1
                                                                }
                                                            }},
            {field:'endStock',title:'期末库存数',width:'130px',align:'right',
                                                            	formatter:function(value,row,index){
                                                            		 if(value || value ==0){
                                                				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                                				    }
                                                				},
                                                            	editor:{
                                                                    type:'numberbox',
                                                                    options:{
                                                                    	disabled:true,
                                                                        min:0,
                                                                        precision:1
                                                                    }
                                                                }},
            {field:'endCostAmount',title:'期末成本金额',width:'200px',align:'right',
                                                                	formatter:function(value,row,index){
                                                                		 if(value || value ==0){
                                                    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                                    				    }
                                                    				},
                                                                	editor:{
                                                                        type:'numberbox',
                                                                        options:{
                                                                        	disabled:true,
                                                                            min:0,
                                                                            precision:1
                                                                        }
                                                                    }},
            {field:'endSaleAmount',title:'期末销售金额',width:'200px',align:'right',
                                                                    	formatter:function(value,row,index){
                                                                    		 if(value || value ==0){
                                                        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
                                                        				    }
                                                        				},
                                                                    	editor:{
                                                                            type:'numberbox',
                                                                            options:{
                                                                            	disabled:true,
                                                                                min:0,
                                                                                precision:1
                                                                            }
                                                                        }}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });

    /*if(hasCostPrice==false){
    	var fieldArr = ["costAmount","beginCostAmount","dcoAmount",
			"dciAmount","costChangeAmount","otherAmount","endCostAmount","endSaleAmount"
		]
        priceGrantUtil.grantCostPrice(gridName,fieldArr)
    }*/
    
    var param = {
			//期初成本价->beginCostPrice  期末成本价-->endCostPrice   销售成本金额->costAmount  采购收货金额->piAmount 采购退货金额->prAmount	采购直送收货金额->pmAmount
		costPrice:["costAmount","beginCostAmount","costChangeAmount","otherAmount","endCostAmount","purchaseAmount"],
		//配送出库金额	配送入库金额
		distributionPrice:['dcoAmount','dciAmount']			
	}
	
	priceGrantUtil.grantPrice(gridName,param);

}


function queryForm(){
    $("#startCount").val("");
    $("#endCount").val("");
	$("#dayReport").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#dayReport").datagrid("options").method = "post";
	$("#dayReport").datagrid("options").url = contextPath+'/report/day/getDayReportList';
	$("#dayReport").datagrid("load");
	
}

function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#dayReport').datagrid('getData').total;
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
	var length = $("#dayReport").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	$("#queryForm").attr("action",contextPath+"/report/day/exportList");
	$("#queryForm").submit();
}
/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};


