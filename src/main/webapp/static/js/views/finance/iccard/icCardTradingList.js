/**
 * Created by zhaoly on 2017/5/22.
 */

$(function () {
    initGridCardTrading();
    changeStatus();
    initConditionParams();

})

//单据状态切换
function changeStatus(){
    $(".radioItem").change(function(){
        var type = $(this).val();
        $('#queryType').val(type);
        $("#"+gridName).datagrid("options").url = "";
        initGridCardTrading();
        $('#'+gridName).datagrid('loadData',[]);
    });
}

//初始化默认条件
function initConditionParams(){
    $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

function getFiledList() {
    if($('#queryType').val() === "1"){
        return [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺名称', width: 180, align: 'left'},
            {field: 'orderNo', title: '业务单号', width: 180, align: 'left'},
            {field: 'icCardNo', title: '卡号', width: 180, align: 'left'},
            {field: 'saleType', title: '业务类型', width: 80, align: 'left',
                formatter:function(value,row,index){
                    if(value == 'C'){
                        return '充值';
                    }else if(value == 'A'){
                        return '消费';
                    }else if(value == 'D'){
                        return '售卡';
                    }else{
                        return '退货';
                    }
                }
            },
            {field: 'amount', title: '金额', width: 100, align: 'right',formatter : function(value, row, index) {
				if(row.isFooter){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'createTime', title: '时间', width: 180, align: 'left',formatter:function(value,row,index){
            	return new Date(value).format("yyyy-MM-dd hh:mm:ss");
            }},
            {field: 'operatorUserName', title: '收银员', width: 80, align: 'left'},
        ]]
    }else{
        return [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left'},
            {field: 'branchName', title: '店铺编号', width: 180, align: 'left'},
            {field: 'sumSelling', title: '售卡合计', width: 120, align: 'right',formatter : function(value, row, index) {
				if(row.isFooter){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumRecharge', title: '充值合计', width: 120, align: 'right',formatter : function(value, row, index) {
				if(row.isFooter){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumConsume', title: '消费合计', width: 120, align: 'right',formatter : function(value, row, index) {
				if(row.isFooter){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumRefund', title: '退货合计', width: 120, align: 'right',formatter : function(value, row, index) {
				if(row.isFooter){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumData', title: '合计', width: 120, align: 'right',formatter : function(value, row, index) {
				if(row.isFooter){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
        ]]
    }
}




var gridName = "gridCardTrading";

var gridHandel = new GridClass();

function initGridCardTrading() {
    gridHandel.setGridName("gridCardTrading");
    $("#"+gridName).datagrid({
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:getFiledList()
    })

}

function query() {
    $("#"+gridName).datagrid("options").queryParams = $("#queryForm").serializeObject();
    $("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").url = contextPath+'/iccard/trading/list';
    $("#"+gridName).datagrid("load");
}

/**
 * 机构名称
 */
function selectListBranches(){
    new publicAgencyService(function(data){
        $("#branchId").val(data.branchesId);
        $("#branchName").val(data.branchName);
        $("#branchCompleCode").val(data.branchCompleCode);
        $("#oldBranchName").val(data.branchName);
    },'BF','');
}

/**
 * 收银员
 */
function selectOperator(){
    new publicOperatorService(function(data){
        $("#salesmanId").val(data.id);
        $("#salesmanName").val(data.userName);
    });
}

function exportData(){
	var length = $('#gridCardTrading').datagrid('getData').total;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	var queryParams =  urlEncode($("#queryForm").serializeObject());
	window.location.href = contextPath + '/iccard/trading/exports?params='+queryParams;
}

var toPrint = function(){
	var length = $('#gridCardTrading').datagrid('getData').total;
	if(length == 0){
		successTip("无数据可打印");
		return;
	}
	var queryParams =  urlEncode($("#queryForm").serializeObject());
	parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/iccard/trading/report/print?params="+queryParams);
}

var urlEncode = function (param, key, encode) {
	  if(param==null) return '';
	  var paramStr = '';
	  var t = typeof (param);
	  if (t == 'string' || t == 'number' || t == 'boolean') {
	    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
	  } else {
	    for (var i in param) {
	      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
	      paramStr += urlEncode(param[i], k, encode);
	    }
	  }
	  return paramStr;
	};