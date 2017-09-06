/**
 * Created by wxl on 2016/08/17.
 * 采购明细查询
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initPurReportDetailGrid();
	
	//机构选择初始化
	$('#branchComponent').branchSelect({
		param:{
			branchTypesStr:$_jxc.branchTypeEnum.LOGISTICS + ',' + $_jxc.branchTypeEnum.BRANCH_COMPANY
		}
	});
	
	//供应商选择初始化
	$('#supplierComponent').supplierSelect({
		param:{
			saleWayNot:"purchase"
		},
		//数据过滤
		loadFilter:function(data){
			data.supplierId = data.id;
			return data;
		}
	});
	
});
var gridHandel = new GridClass();
/**
 * 单据类型
 * @param newV
 * @param oldV
 */
function onChangeFormType(newV,oldV){
	$("#formType").combobox("setValue",newV);
}

var gridHandel = new GridClass();
/**
 * 初始化表格
 * @param queryType
 */
var dg;
var gridName= "purReportDetail";
function initPurReportDetailGrid(queryType) {
	gridHandel.setGridName("purReportDetail");
    dg= $("#purReportDetail").datagrid({
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
        showFooter:true,
        height:'100%',
        columns: [[
            {field: 'branchCode', title: '机构编号', width: 85, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if($_jxc.isStringNull(str)){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'branchName', title: '机构名称', width: 220, align: 'left',},
			{field: 'skuCode', title: '货号', width:85, align: 'left'},
            {field: 'skuName', title: '商品名称', width:185, align: 'left'},
            {field: 'barCode', title: '条码', width:130, align: 'left'},
            {field: 'spec', title: '规格', width:45, align: 'left'},
            {field: 'unit', title: '单位', width:45, align: 'left'},
			{field: 'deliverNum', title: '要货数量', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'deliverAmount', title: '要货金额', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'stockNum', title: '库存数量', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'stockAmount', title: '库存金额', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'lackNum', title: '缺货数量', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'suggestNum', title: '补货数量', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
            {field: 'purchaseSpec', title: '进货规格', width:55, align: 'left'},
            {field: 'distributionSpec', title: '配送规格', width:55, align: 'left'},
			{field: 'supplierName', title: '供应商名称', width: 155, align: 'left'},
            {field: 'categoryName', title: '类别名称', width:95, align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });

    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice(gridName,["stockAmount","deliverAmount"])
    }
}
//合计
function updateFooter(){
}
/**
 * 查询
 */
function purchaseDetailCx(){
	//机构日期不能为空
	$("#startCount").val('');
	$("#endCount").val('');
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchId = $("#branchId").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	if(!branchId){
		$_jxc.alert('机构不能为空');
		return ;
	}
	var formData = $("#queryForm").serializeObject();
	
	$("#purReportDetail").datagrid("options").queryParams = formData;
	$("#purReportDetail").datagrid("options").method = "post";
	$("#purReportDetail").datagrid("options").url =  contextPath+"/report/purchase/getDelAndStoReportList";
	$("#purReportDetail").datagrid("load");
}


/**
 * 导出
 */
function exportDetails(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $('#purReportDetail').datagrid('getData').rows.length;
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

	$("#queryForm").attr("action",contextPath+'/report/purchase/exportDelAndStoReport');
	$("#queryForm").submit();	

}

/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryCode").val(data.categoryName);
	});
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/deliverAndStockReport";
};