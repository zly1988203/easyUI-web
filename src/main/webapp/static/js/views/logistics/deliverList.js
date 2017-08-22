/**
 * Created by zhanghuan on 2016/8/30.
 * 物流销售单导出
 */
$(function(){
	setDivTime();
	toChangeDatetime(0);
    initDatagridRequireOrders();
    targetBranchId = $("#targetBranchId").val();
    if(getUrlQueryString('message')=='0'){
    	 $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30)+" 00:00");
    	 initDatagridRequireOrders();
    }
});

$(document).on('input','#remark',function(){
	var val=$(this).val();
	var str = val;
	   var str_length = 0;
	   var str_len = 0;
	      str_cut = new String();
	      str_len = str.length;
	      for(var i = 0;i<str_len;i++)
	     {
	        a = str.charAt(i);
	        str_length++;
	        if(escape(a).length > 4)
	        {
	         //中文字符的长度经编码之后大于4
	         str_length++;
	         }
	         str_cut = str_cut.concat(a);
	         if(str_length>200)
	         {
	        	 str_cut.substring(0,i)
	        	 remark.value = str_cut;
	        	 break;
	         }
	    }
	
});



var targetBranchId;
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
    $("#deliverFormList").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //url:contextPath+'/form/purchase/listData',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,         //占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
			{field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'140px',align:'left',
				formatter:function(value,row,index){
            		var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'物流销售单明细\',\''+ contextPath +'/LogisticsDeliverForm/deliverList?deliverFormId='+ row.deliverFormId +'&deliverType=DA\')">' + value + '</a>';
            		return strHtml;
            	}
			},
            {field:'status',title: '审核状态', width: '100px', align: 'center'},
			{field: 'dealStatus', title: '单据状态', width: '60px', align: 'center'},
			{field: 'targetBranchName', title: '要货机构', width: '200px', align: 'left'},
			{field: 'salesman', title: '业务人员', width: '130px', align: 'left'},
			{field: 'amount', title: '单据金额', width: '80px', align: 'right',
				formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
			},
            {field: 'sourceBranchName', title: '发货机构', width: '200px', align: 'left'},
            {field: 'createUserName', title: '制单人员', width: '130px', align: 'left'},
            {field: 'validityTime', title: '有效期限', width: '120px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			},
			{field: 'validUserName', title: '审核人员', width: '130px', align: 'left'},
			{field: 'remark', title: '备注', width: '200px', align: 'left'},
			{field: 'updateUserName', title: '操作人员', width: '130px', align: 'left'},
            {field: 'updateTime', title: '操作时间', width: '120px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd hh:mm');
					}
					return "";
				}
			},
			{field: 'stopUserName', title: '终止人', width: '130px', align: 'left'},
			{field: 'stopTime', title: '终止时间', width: '120px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd hh:mm');
					}
					return "";
				}
			}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
    queryForm();
    var param = {
        distributionPrice:["price","amount","taxAmount"],
    }
    priceGrantUtil.grantPrice("deliverFormList",param);
}

function clearBranchCode(obj,branchId){
	var branchName = $(obj).val();
	//如果修改名称
	if(!branchName || 
			(branchName && branchName.indexOf("[")<0 && branchName.indexOf("]")<0)){
		$("#" + branchId +"").val('');
	}
}
//查询要货单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    //fromObjStr.targetBranchName = fromObjStr.targetBranchName.substring(fromObjStr.targetBranchName.lastIndexOf(']')+1)
    fromObjStr.operateUserName = fromObjStr.operateUserName.substring(fromObjStr.operateUserName.lastIndexOf(']')+1)

	$("#deliverFormList").datagrid("options").method = "post";
	$("#deliverFormList").datagrid('options').url = contextPath + '/LogisticsDeliverForm/getDeliverForms';
	$("#deliverFormList").datagrid('load', fromObjStr);
}


/**
 * 操作员
 */
function selectOperator(){
	new publicOperatorService(function(data){
//		$("#operateUserId").val(data.id);
		console.log(data.userCode)
		$("#operateUserName").val("["+data.userCode+"]"+data.userName);
	});
}
/**
 * 机构
 */
function selectBranches(){
	new publicAgencyService(function(data){
//		$("#targetBranchId").val(data.branchesId);
		//$("#targetBranchName").val(data.branchName);
		$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
	},'',targetBranchId);
}
/**
 * 要货机构
 */
var branchCode = '';
function selectTargetBranch(){
	new publicAgencyService(function(data){
        $("#targetBranchId").val(data.branchesId);
        //$("#targetBranchName").val(data.branchName);
        $("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
        branchCode = data.branchCode;
        $("#targetBranchType").val(data.type);
        // 为店铺时
        if (data.type != '1' && data.type != '0') {
        	getSourceBranch(data.branchesId);
        }
        if (data.type == '1') {
        	$("#sourceBranchId").val('');
            $("#sourceBranchName").val('');
        }
	},'DY','');
}

function getSourceBranch(branchesId) {
	$_jxc.ajax({
    	url : contextPath+"/LogisticsDeliverForm/getSourceBranch",
    	data : {
    		branchesId : branchesId,
    	}
    },function(result){
		if(result['code'] == 0){
			$("#sourceBranchId").val(result['sourceBranchId']);
            $("#sourceBranchName").val("["+result['sourceBranchCode']+"]"+result['sourceBranchName']);
		}else{
			$_jxc.alert(result['message']);
		}
    });
}

/**
 * 发货机构
 */
function selectSourceBranch(){
	var targetBranchType = $("#targetBranchType").val();
	if(targetBranchType != '0'){
        new publicAgencyService(function(data){
            if($("#sourceBranchId").val()!=data.branchesId){
                $("#sourceBranchId").val(data.branchesId);
                $("#sourceBranchName").val("["+data.branchCode+"]"+data.branchName);
                gridHandel.setLoadData([$.extend({},gridDefault)]);
            }
        },'DZ',$("#targetBranchId").val(),'',1);
	} else {
        new publicAgencyService(function(data){
            if($("#sourceBranchId").val()!=data.branchesId){
                $("#sourceBranchId").val(data.branchesId);
                $("#sourceBranchName").val("["+data.branchCode+"]"+data.branchName);
                gridHandel.setLoadData([$.extend({},gridDefault)]);
            }
        },'DY',$("#targetBranchId").val(),'',1);
    }
}

function exportDataList(){
	var rows = $("#deliverFormList").datagrid("getSelections");
	if (rows.length == 0) {
		$_jxc.alert("未选择导出的行！");
		return;
	}
	if (rows.length > 51) {
		$_jxc.alert("当次导出单据不可超过50条，现已超过，请重新调整导出范围！");
		return;
	}
	//for(var i=0; i<rows.length; i++){
		exportData(rows[0].deliverFormId);
	//}
}

function exportData(deliverFormId){
	window.location.href=contextPath+'/LogisticsDeliverForm/exportList?deliverFormId='+deliverFormId;
}


/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};

var checkboxTime = 'checked';
var popupSearchDateTime = dateUtil.getCurrentDateTime().format("yyyy-MM-dd hh:mm");
// 添加被移除之前的时间值
function setDivTime(){
	if (checkboxTime == 'checked') {
		$("#checkboxTime").attr('checked','checked');
	} else {
		$("#checkboxTime").attr('checked',false);
	}
	$("#popupSearchDateTime").val(popupSearchDateTime);
}
