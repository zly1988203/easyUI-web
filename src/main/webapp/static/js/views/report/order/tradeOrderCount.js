/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
    toChangeDate(9);
    $("#startTime").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#endTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequireOrders();
    branchId = $("#branchId").val();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
	gridHandel.setGridName("gridOrders");
    $("#gridOrders").datagrid({
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
		height:'100%',
		width:'100%',
        columns:[[
			{field:'check',checkbox:true},
            {field:'branchName',title:'机构名称',width:'140px',align:'left',
				formatter:function(value,row,index){
					if(row.isFooter){
	                    str ='<div class="ub ub-pc ufw-b">合计</div> '
	                    return str;
	                }
					return value;
				}
			},
            {field: 'areaName', title: '所在区域', width: '100px', align: 'left'},
            {field: 'totalAmount', title: '销额/元', width: '200px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalSaleNum', title: '销量', width: '100px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalNum', title: '总订单数', width: '200px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'price',title:'客单价/元',width:'140px',align:'left',
            	formatter:function(value,row,index){
            		if(row.isFooter){
						return ;
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalLineAmount', title: '线上销额/元', width: '100px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalLineSaleNum', title: '线上销量', width: '100px', align: 'left',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'rowNo', title: '排名', width: '100px', align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
}


//查询要货单
function queryForm(){
	if ($("#branchId").val() == null || $("#branchId").val() == '') {
		successTip("请选择查询机构");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	$("#gridOrders").datagrid("options").method = "post";
	$("#gridOrders").datagrid('options').url = contextPath + '/bill/tradeOrderCount/getTradeOrderCounts';
	$("#gridOrders").datagrid('load', fromObjStr);
}

//合计
function updateFooter(){
    var fields = {totalAmount:0,totalSaleNum:0,totalNum:0,totalLineAmount:0,totalLineSaleNum:0};
    sum(fields);
}

function sum(fields) {
	var fromObjStr = $('#queryForm').serializeObject();
	$.ajax({
    	url : contextPath+"/bill/tradeOrderCount/sum",
    	type : "POST",
    	data : fromObjStr,
    	success:function(result){
    		if(result['code'] == 0){
    			fields.totalAmount = result['sumAmount'];
    			fields.totalSaleNum = result['sumSaleNum'];
    			fields.totalNum = result['sumNum'];
    			fields.totalLineAmount = result['sumLineAmount'];
    			fields.totalLineSaleNum = result['sumLineSaleNum'];
    			$("#gridOrders").datagrid('reloadFooter',[$.extend({"isFooter":true,},fields)]);
    		}else{
    			successTip(result['message']);
    		}
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}

/**
 * 查询机构
 */
var branchId;
function selectBranches(){
	new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val(data.branchName);
	},'DV',branchId);
}
/**
 * 重置
 */
var resetForm = function() {
	location.href = contextPath + "/bill/tradeOrderCount/view";
};

/**
 * 导出
 */
function exportData(){
	var length = $('#gridOrders').datagrid('getData').rows.length;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	if(length>10000){
		successTip("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	
	var fromObjStr = $('#queryForm').serializeObject();
	$("#queryForm").form({
		success : function(result){
			//successTip(result);
		}
	});
	$("#queryForm").attr("action",contextPath+'/bill/tradeOrderCount/exportList')
	$("#queryForm").submit();
}


