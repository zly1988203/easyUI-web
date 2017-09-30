/**
 * Created by wxl on 2016/08/17.
 */
$(function() {
	//选择报表类型
	changeType();
	initPurReportTotalGrid();
	// 开始和结束时间
	if(!$("#txtStartDate").val()){
		// 开始和结束时间
		$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
		$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	}else{
		flushFlg = true;
		$('input:radio[name=searchType]')[0].checked = true;
		$('input:radio[name=searchType]')[0].click();
	}
    $('#branchTemp').branchSelect();

    //供应商选择初始化
    $('#supplierComponent').supplierSelect({
        //数据过滤
        loadFilter:function(data){
            data.supplierId = data.id;
            return data;
        }
    });
});

var flushFlg = false;
function changeType(){
	$(".radioItem").on("click",function(){
		flushFlg = true;
    	var a = $(this).val();
    	dg=$("#purReportTotal").datagrid("options").url = "";
    	if (a=="goodsTotal") {
    		initPurReportTotalGrid();
		}else if (a=="supplierTotal") {
			initPurReportSupplierGrid();
		}
    	$("#purReportTotal").datagrid('loadData', { total: 0, rows: [] });
    	$('#purReportTotal').datagrid({showFooter:false});
    });
}
var gridHandel = new GridClass();
/**
 * 初始化表格按  商品
 * @param queryType
 */

var dg;
function initPurReportTotalGrid() {
	gridHandel.setGridName("purReportTotal");
	dg= $("#purReportTotal").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        //url: "",
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        pageSize : 50,
        height:'100%',
        columns: [[
	       {field: 'branchCode', title: '机构编号', width: 100, align: 'left',
	    	   formatter : function(value, row,index) {
	    		   var str = value;
	    		   if(row.isFooter){
	    			   str ='<div class="ub ub-pc ufw-b">合计</div> '
	    		   }
	    		   return str;
	    	   },
	       },
	       {field: 'branchName', title: '机构名称', width: 185, align: 'left'},
			{field: 'supplierCode', title: '供应商编号', width: 100, align: 'left'},
			{field: 'supplierName', title: '供应商名称', width: 185, align: 'left'},
            {field:'paFormNo',title:'采购订单编号',width:'140px',align:'left',
				formatter:function(value,row,index){
            	var strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购详细\',\''+contextPath+'/form/purchase/orderEdit?formId='+row.id+'\')">' + value + '</a>';
    		   if($_jxc.isStringNull(value)){
    			   strHtml =''
    		   }
    		   return strHtml;
            }},
            {field: 'amount', title: '采购金额', width:100, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'createUserName', title: '制单人', width:100, align: 'left'},
            {field: 'createTime', title: '制单日期', width:150, align: 'left'},
            {field: 'validUserName', title: '审核人', width:100, align: 'left'},
            {field: 'validTime', title: '审核日期', width:150, align: 'left'},
            {field: 'stopTime', title: '终止日期', width:150, align: 'left'},
            {field: 'remark', title: '备注', width:200, align: 'left'}

        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}
/**
 * 初始化表格按  供应商
 * @param queryType
 */
function initPurReportSupplierGrid() {
	gridHandel.setGridName("purReportTotal");
	dg= $("#purReportTotal").datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        //url: "",
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        pageSize : 50,
        height:'100%',
        columns: [[
	       {field: 'branchCode', title: '机构编号', width: 100, align: 'left',
	    	   formatter : function(value, row,index) {
	    		   var str = value;
	    		   if(row.isFooter){
	    			   str ='<div class="ub ub-pc ufw-b">合计</div> '
	    		   }
	    		   return str;
	    	   },
	       },
	       {field: 'branchName', title: '机构名称', width: 185, align: 'left'},
			{field: 'supplierCode', title: '供应商编号', width: 100, align: 'left'},
			{field: 'supplierName', title: '供应商名称', width: 185, align: 'left'},
            {field: 'sysStopNum', title: '过期订单数', width:200, align: 'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'totalStopNum', title: '采购订单总数', width:200, align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            		}
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field: 'stopRate', title: '过期订单数占比', width:200, align: 'right',
            	formatter:function(value,row,index){
            		if($_jxc.isStringNull(value)){
            			return '';
            		}
            		return '<b>'+parseFloat(value||0).toFixed(2)+'%</b>';
            	}
            },
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}

/**
 * 查询
 */
function purchaseTotalCx(){
	$("#startCount").val('');
	$("#endCount").val('');
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var formData = $("#queryForm").serializeObject();
	$("#purReportTotal").datagrid("options").url = "";
	$('#purReportTotal').datagrid({showFooter:true});
	$("#purReportTotal").datagrid("options").queryParams = formData;
	$("#purReportTotal").datagrid("options").method = "post";
	$("#purReportTotal").datagrid("options").url =  contextPath+"/report/purchase/getExpireFormList";
	$("#purReportTotal").datagrid("load");
}
/**
 * 导出
 */
function exportTotal(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $('#purReportTotal').datagrid('getData').rows.length;
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

	$("#queryForm").attr("action",contextPath+'/report/purchase/exportExpireFormList');
	$("#queryForm").submit();		

}

/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/expireFormList";
};