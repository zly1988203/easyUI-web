/**
 * Created by zhaoly on 2017/5/26.
 */

var costTitle = '开店成本(月均摊)';
$(function () {
    initGridMonthAnalysis();
    $("#txtStartDate").val(dateUtil.getPreMonthDate().format("yyyy-MM"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM"));
    changeStatus();
})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        if($(this).val() === "0"){
            costTitle = '开店成本(月均摊)';
        }else{
            costTitle = '开店成本(均摊不含折旧)';
        }
        initGridMonthAnalysis();
        queryMonthAnalysis();
    });
}

var gridName = "gridMonthAnalysis";
var gridHandel = new GridClass();
var dg = null;
function initGridMonthAnalysis() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        singleSelect:true,
        height:'100%',
        width:'100%',
        fitColumns:true,    //每列占满
        columns:[[
            {field:'branchCode',title:'机构编码',width:"80px",align:'left'},
            {field:'branchName',title:'机构名称',width:"150px",align:'left'},
            {field:'parentName',title:'所属分公司',width:"150px",align:'left'},
            {field:'monthStr',title:'月份',width:"80px",align:'left'},
            {field:'fixedTotalAmount',title:'开店成本',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'costAvgYear',title:'费用均摊年数',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'fixedAvgAmount',title:costTitle,width:"150px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'monthChargeAmount',title:'每月固定开支',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'totalAmount',title:'上月销售额',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'grossProfitRateStr',title:'上月毛利率',width:"80px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'bepMonth',title:'月盈亏平衡点',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'bepDay',title:'日盈亏平衡点',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
        ]],
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
        }
    });
}

/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#branchCodeName").val("["+data.branchCode+"]" + data.branchName);
    },'BF','');
}


function queryMonthAnalysis() {
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/report/bepMonthAnalysis/getList';
    $("#"+gridName).datagrid("load");
}


/**
 * 导出
 */
function exportData(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
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
	$("#queryForm").attr("action",contextPath+"/report/bepMonthAnalysis/exportExcelList");
	$("#queryForm").submit();
}
