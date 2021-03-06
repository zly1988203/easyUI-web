/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单状态跟踪
 */
$(function(){
	//开始和结束时间
    //toChangeDatetime(10);
    
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30)+" 00:00");
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd")+" 23:59");
	
    initDatagridRequireOrders();

    //机构选择初始化 发货机构
    $('#sourceBranch').branchSelect({
        onAfterRender:function(data){
            $("#sourceBranchId").val(data.branchId);
        }

    });

    //机构选择初始化 要货机构
    $('#targetBranch').branchSelect({
        onAfterRender:function(data){
            $("#targetBranchId").val(data.branchId);
        }
    });

});
var gridHandel = new GridClass();
var gridName = "deliverFormList";
//初始化表格
function initDatagridRequireOrders(){
	dg=$("#deliverFormList").datagrid({
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
			{field:'formNo',title:'单据编号',width:'130px',align:'left',
				formatter:function(value,row,index){
	                if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
					var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.deliverFormId+'")';
					return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
	            }
			},
            {field:'sourceBranchCode',title: '发货机构编码', width: '80px', align: 'left'},
            {field: 'sourceBranchName', title: '发货机构', width: '80px', align: 'left'},
            {field: 'targetBranchCode', title: '要货机构编码', width: '80px', align: 'left'},
            {field: 'targetBranchName', title: '要货机构', width: '80px', align: 'left'},
            {field: 'amount', title: '单据金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
			{field: 'dealStatus', title: '单据状态', width: '60px', align: 'center'},
			{field: 'validityTime', title: '有效期限', width: '115px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			},
			{field: 'remark', title: '备注', width: '100px', align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });

    if(hasDistributionPrice==false){
        priceGrantUtil.grantDistributionPrice(gridName,["amount"])
    }

}


//查询要货单
function queryForm(){
    $("#startCount").val("");
    $("#endCount").val("");
	$("#deliverType").val('DA');
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.targetBranchName = "";
    fromObjStr.sourceBranchName = "";
	$("#deliverFormList").datagrid("options").method = "post";
	$("#deliverFormList").datagrid('options').url = contextPath + '/form/deliverReport/getDaForms';
	$("#deliverFormList").datagrid('load', fromObjStr);
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#deliverType").val('DA');
};

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#deliverFormList').datagrid('getData').rows.length;
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

	$("#queryForm").attr("action",contextPath+'/form/deliverReport/exportList')
	$("#queryForm").submit();
}


