$(function(){
	//开始和结束时间
    $("#saleTime").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    initStorePlanList();
    
    //机构选择初始化
    $('#branchSelect').branchSelect();
});
var gridHandel = new GridClass();

var datagridId = 'storePlanList';
//初始化表格 没有成本价权限
function initStorePlanList(){
    dg = $("#"+datagridId).datagrid({
        method:'post',
        align:'right',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        //fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'100%',
		pageSize:50,
		width:'100%',
        columns:[[
            {field:'branchCode',title:'机构编号',width: 120,align:'right'},
            {field:'branchName',title:'机构名称',width: 120,align:'right'},
            {field:'month',title:'月份',align:'right',width: 80,
            	formatter:function(value,row,index){
            		value = '2017-01';
                    return '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'门店计划详细\',\''+ contextPath +'/settle/supplierSettle/settleEdit?id='+ row.id +'\')">' + value + '</a>';
                }
            },
            {field:'monthAmount',title:'月目标销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'up_monthAmount',title:'线下月目标销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'top_monthAmount',title:'线上月目标销额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'cost_month',title:'月目标成本',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'done_count',title:'总完成额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'done_rate',title:'总完成率',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'up_doneAmount',title:'线下完成额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'up_doneRate',title:'线下完成率',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'top_doneAmount',title:'线上完成额',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field:'top_doneRate',title:'线上完成率',align:'right',width: 100,
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            }
        ]],
        onLoadSuccess:function(data){
            gridHandel.setDatagridHeader("center");
        }       
    });
   // queryForm();
}



//查询入库单
function queryForm(){
	 if($("#branchName").val()==""){
	    $_jxc.alert("请选择店铺名称");
	    return;
	 } 
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
	fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/storeDaySale/report/getStoreDaySaleList';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

//新增门店计划
function addPlan(){
	toAddTab("新增门店计划",contextPath + "/target/storePlan/toAdd");
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