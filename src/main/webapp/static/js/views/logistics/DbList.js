/**
 * 物流销售回单导出
 */
var targetBranchId;
var branchName;
$(function() {
	//开始和结束时间
	toChangeDatetime(0);
	targetBranchId = $("#targetBranchId").val();
	if(getUrlQueryString('message')=='0'){
		$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30)+" 00:00");
	}
	initDatagridSaleReturnList();
	//机构选择初始化 发货机构
	$('#sourceBranch').branchSelect({
		onAfterRender:function(data){
			$("#sourceBranchId").val(data.branchId);
		}
	});

	//机构选择初始化 收货机构
	$('#targetBranch').branchSelect({
		param:{
			branchId:targetBranchId
		},
		onAfterRender:function(data){
			branchName = data.branchName;
			$("#targetBranchId").val(data.branchId);
		}
	});
	queryForm();
});

var gridSaleId = "saleReturnList";
var gridHandel = new GridClass();
// 初始化表格
var dg;
function initDatagridSaleReturnList() {
	gridHandel.getGridName(gridSaleId);
	dg = $("#"+gridSaleId).datagrid(
			{
				method : 'post',
				align : 'center',
				//url : contextPath+ '/LogisticsDeliverForm/getDeliverFormsDB',
				// toolbar: '#tb', //工具栏 id为tb
				singleSelect : false, // 单选 false多选
				rownumbers : true, // 序号
				pagination : true, // 分页
				fitColumns : true, // 每列占满
				// fit:true, //占满
				showFooter : true,
				height : '100%',
				width : '100%',
				columns : [ [
					{field:'check',checkbox:true},
					{field:'formNoDB',title:'出库回单单号',width:'140px',align:'left',
						formatter:function(value,row,index){
							if(value){
								var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'物流回单明细\',\''+ contextPath +'/LogisticsDeliverForm/DbForm?deliverFormId='+ row.formNoIdDB +'&deliverType=DB\')">' + value + '</a>';
								return strHtml;
							}else{
								return value;
							}
						}
					},
					{field:'formNoDA',title:'要货单号',width:'140px',align:'left'},
					{field:'formNoDO',title:'出货单号',width:'140px',align:'left',
						formatter:function(value,row,index){
							if(value){
								var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'出库单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.formNoIdDO +'&deliverType=DO\')">' + value + '</a>';
								return strHtml;
							}else{
								return value;
							}
						}
					},
					{field:'formNoDI',title:'回单入库单号',width:'140px',align:'left',
						formatter:function(value,row,index){
							if(value){
								var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'入库单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.formNoIdDI +'&deliverType=DI\')">' + value + '</a>';
								return strHtml;
							}else{
								return value;
							}
						}
					},
					{field: 'downloadNum', title: '导出次数', width: '60px', align: 'center'},
					{field: 'targetBranchName', title: '收货机构', width: '150px', align: 'left'},
					{field: 'sourceBranchName', title: '退货机构', width: '150px', align: 'left'},
					{field: 'status', title: '审核状态', width: '130px', align: 'center'},
					{field: 'dealStatus', title: '单据状态', width: '130px', align: 'center'},
					{field: 'validTime', title: '审核日期', width: '120px', align: 'center',
						formatter: function (value, row, index) {
							if (value) {
								return new Date(value).format('yyyy-MM-dd hh:mm');
							}
							return "";
						}
					},
					{field: 'remark', title: '备注', width: '200px', align: 'left'}
					] ],
					onLoadSuccess : function(data) {
						gridHandel.setDatagridHeader("center");
					}
			});
}

// 查询
function queryForm() {
	$("#startCount").val('');
	$("#endCount").val('');
	var fromObjStr = $('#queryForm').serializeObject();
    fromObjStr.targetBranchName = "";
    fromObjStr.sourceBranchName = "";
	$("#"+gridSaleId).datagrid("options").method = "post";
	$("#"+gridSaleId).datagrid('options').url = contextPath+ '/LogisticsDeliverForm/getDeliverFormsDB';
	$("#"+gridSaleId).datagrid('load', fromObjStr);
}

/**
 * 制单机构、退货机构
 */
function selectSourceBranch(){
	var targetBranchType = parseInt($("#targetBranchType").val());
    new publicAgencyService(function(data){
        if($("#sourceBranchId").val()!=data.branchesId){
            $("#sourceBranchId").val(data.branchesId);
            $("#sourceBranchName").val("["+data.branchCode+"]"+data.branchName);
            $("#sourceBranchType").val(data.type);
        }
    },'DD');
}

/**
 * 重置
 */
var resetForm = function() {
	$("#queryForm").form('clear');
};

/**
 * 导出
 */
function exportForms(){
	var length = $('#saleReturnList').datagrid('getData').rows.length;
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

function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	var formData = $("#queryForm").serializeObject();
	formData.startTime = formData.startTime + " 00:00";
	formData.endTime = formData.endTime + " 00:00";
	$("#queryForm").attr("action",contextPath+'/LogisticsDeliverForm/getDeliverFormsDBExport')
	$("#queryForm").submit();
}