/**
 * Created by zhaoly on 2017/5/26.
 */

var  costTitle = '开店成本(含折旧)';
$(function () {
    initGridDayAnalysis();
    $("#startTime").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#endTime").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    changeStatus();
})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        if($(this).val() === "0"){
            costTitle = '开店成本(含折旧)';
        }else{
            costTitle = '开店成本(不含折旧)';
        }
        $("#"+gridName).datagrid('loadData', { total: 0, rows: [] }); 
        $("#"+gridName).datagrid("options").url = "";
        initGridDayAnalysis();
        //queryDayAnalysis();
    });
}

var gridName = "gridDayAnalysis";
var gridHandel = new GridClass();
var dg = null;
function initGridDayAnalysis() {
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
			{field:'dateStr',title:'日期',width:"100px",align:'left'},
			{field:'branchCode',title:'机构编码',width:"80px",align:'left'},
			{field:'branchName',title:'机构名称',width:"150px",align:'left'},
			{field:'parentName',title:'所属分公司',width:"150px",align:'left'},
			{field:'areaSize',title:'店铺面积(m<sup>2</sup>)',width:"100px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return parseFloat(value||0).toFixed(2);
                },
            },
			{field:'costAvgYear',title:'费用均摊年数',width:"100px",align:'right',
                formatter : function(value, row, index) {
                	if(!value){
                		return "";
                	}
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
			{field:'dayFixedAvgAmount',title:costTitle,width:"150px",align:'right',
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
			{field:'dayTotalAmount',title:'销售额',width:"120px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
			{field:'dayOrderNum',title:'客单数',width:"120px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
			{field:'dayAvgPrice',title:'客单价',width:"120px",align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            }
        ]]
    })

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


function queryDayAnalysis() {
	//搜索需要将左侧查询条件清除
	$("#startCount").val('');
	$("#endCount").val('');
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    var startTime =  $("#startTime").val();
    var endTime = $("#endTime").val();
    if(DateDiff(startTime,endTime) > 60){
        $_jxc.alert("日盈亏平衡点报表查询天数不能超过60");
        return;
    }

    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/report/bepDayAnalysis/getList';
    $("#"+gridName).datagrid("load");
}

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
}

/**
 * 导出
 */
function exportData(){
	var length = $("#"+gridName).datagrid('getData').rows.length;
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
	$("#queryForm").attr("action",contextPath+"/report/bepDayAnalysis/exportExcelList");
	$("#queryForm").submit();
}
