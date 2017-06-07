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
        if(type === "2"){
            $("#salesmanName").prop("disabled","disabled");
            $("#divsaleman").css("display","none")
            $("#orderNo").prop("disabled","disabled");
            $("#orderNo").val("");
            $("#saleType").combobox({ disabled: true });
            $("#value").combobox({ disabled: true });
            $("#salesmanId").val("");
            $("#salesmanName").val("");


        }else{
            $("#salesmanName").removeProp("disabled","disabled");
            $("#divsaleman").css("display","block")
            $("#orderNo").removeProp("disabled","disabled");
            $("#saleType").combobox({ disabled: false });
            $("#value").combobox({ disabled: false });
        }
        $('#queryType').val(type);
        $("#"+gridName).datagrid("options").url = "";
        $('#'+gridName).datagrid('loadData',[]);
        initGridCardTrading();
//        $('#'+gridName).datagrid('loadData',[]);
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
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left',formatter : function(value, row,index) {
		        var str = value;
		        if(value =="SUM"){
		            str ='<div class="ub ub-pc">合计</div> ';
		        }
		        return str;
		    }},
            {field: 'branchName', title: '店铺名称', width: 180, align: 'left'},
            {field: 'orderNo', title: '业务单号', width: 180, align: 'left'},
            {field: 'icCardNo', title: '卡号', width: 180, align: 'left'},
            {field: 'saleType', title: '业务类型', width: 80, align: 'left',
                formatter:function(value,row,index){
                	if(row.branchCode=="SUM"){
                		return;
                	}
                    if(value == 'D'){
                        return '充值';
                    }else if(value == 'A'){
                        return '消费';
                    }else if(value == 'E'){
                        return '售卡';
                    }else{
                        return '退货';
                    }
                }
            },
            {field: 'amount', title: '金额', width: 100, align: 'right',formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'createTime', title: '时间', width: 180, align: 'left',formatter:function(value,row,index){
            	if(row.branchCode=="SUM"){
            		return;
            	}
            	return new Date(value).format("yyyy-MM-dd hh:mm:ss");
            }},
            {field: 'operatorUserName', title: '收银员', width: 80, align: 'left'},
        ]]
    }else{
        return [[
            {field: 'branchCode', title: '店铺编号', width: 100, align: 'left',formatter : function(value, row,index) {
		        var str = value;
		        if(value =="SUM"){
		            str ='<div class="ub ub-pc">合计</div> ';
		        }
		        return str;
		    }},
            {field: 'branchName', title: '店铺编号', width: 180, align: 'left'},
            {field: 'sumSelling', title: '售卡合计', width: 120, align: 'right',formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumRecharge', title: '充值合计', width: 120, align: 'right',formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumConsume', title: '消费合计', width: 120, align: 'right',formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumRefund', title: '退货合计', width: 120, align: 'right',formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
            {field: 'sumData', title: '合计', width: 120, align: 'right',formatter : function(value, row, index) {
				return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
			}},
        ]]
    }
}




var gridName = "gridCardTrading";

var gridHandel = new GridClass();
var dg;
function initGridCardTrading() {
    gridHandel.setGridName(gridName);
    dg = $("#"+gridName).datagrid({
    	method:'post',
        align:'center',
        rownumbers:true,    //序号
        pagination:true,    //分页
        pageSize:50,
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:getFiledList(),
		onLoadSuccess : function(data) {

		}
    })

}

function query() {
	$("#startCount").val("");
	$("#endCount").val("");
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


/**
 * 导出
 */
function exportData(){
	$("#startCount").val('');
	$("#endCount").val('');

	var length = $("#"+gridName).datagrid('getData').total;
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

/**
 * 导出
 */
function exportExcel(){
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		successTip('提示',"没有数据");
		return;
	}
	var fromObjStr = urlEncode($('#queryForm').serializeObject());
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath + '/iccard/trading/exports?params='+fromObjStr);
	
	$("#queryForm").submit();
}

var toPrint = function(){
	var length = $("#"+gridName).datagrid('getData').total;
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