/**
 * Created by wxl on 2016/08/17.
 * 采购明细查询
 */
$(function() {
	// 开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initPurReportDetailGrid();
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
            {field: 'branchCode', title: '机构编号', width: 56, align: 'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                },
            },
            {field: 'branchName', title: '机构名称', width: 220, align: 'left',},
            {field: 'formNo', title: '单据编号', width: 130, align: 'left',
            	formatter:function(value,row,index){
            		var hrefStr = '';
            		if(row.formId){
            			if(row.formType=="PI"){
            				hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/receiptEdit?report=close&formId='+row.formId+'")';
            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            			}else if(row.formType=="PM"){
            				hrefStr='parent.addTab("详情","'+contextPath+'/directReceipt/edit?report=close&formId='+row.formId+'")'
            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            			}else if(row.formType=="PR"){
            				hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/returnEdit?report=close&formId='+row.formId+'")'
            				return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            			}
            		}else{
            			return "";
            		}
                }
            },
			{field: 'skuCode', title: '货号', width:55, align: 'left'},
            {field: 'skuName', title: '商品名称', width:185, align: 'left'},
            {field: 'barCode', title: '条码', width:100, align: 'left'},
			{field: 'price', title: '单价', width:60, align: 'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return "";
					}
					var str="";
					if(value){
						str= '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return str;
				}
			},
			{field: 'realNum', title: '数量', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'amount', title: '金额', width:80, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'tax', title: '税率', width:60, align: 'right',
				formatter : function(value, row, index) {
					if(row.isFooter){
						return "";
					}
					var str="";
					if(value||value==0){
						str= '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return str;
				}
			},
			{field: 'taxAmount', title: '税额', width:60, align: 'right',
				formatter:function(value,row,index){
					if(row.isFooter){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'validTime', title: '审核日期', width:115, align: 'left',
				formatter : function(value, rowData, rowIndex) {
					return formatDate(value,'yyyy-MM-dd hh:mm');
				}},
			{field: 'refFormNo', title: '引用单号', width: 130, align: 'left'},
			{field: 'goodsCreateDate', title: '生产日期', width:115, align: 'left',
				formatter : function(value, rowData, rowIndex) {
					return formatDate(value,'yyyy-MM-dd');
				}},
			{field: 'supplierCode', title: '供应商编号', width: 60, align: 'left'},
			{field: 'supplierName', title: '供应商名称', width: 185, align: 'left'},
            {field: 'categoryCode', title: '类别编号', width:56, align: 'left'},
            {field: 'categoryName', title: '类别名称', width:65, align: 'left'},
            {field: 'brandName', title: '品牌', width:56, align: 'left'},
            {field: 'spec', title: '规格', width:45, align: 'left'},
            {field: 'unit', title: '单位', width:45, align: 'left'},




        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });

    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice(gridName,["price","amount","taxAmount"])
    }
}
//合计
function updateFooter(){
    var fields = {realNum:0,amount:0,taxAmount:0 };
    var argWhere = {name:'formNo',value:''}
    gridHandel.updateFooter(fields,argWhere);
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
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	/*if(!branchName){
		$_jxc.alert('提示', '机构名不能为空');
		return ;
	}*/
	var formData = $("#queryForm").serializeObject();
	$("#purReportDetail").datagrid("options").queryParams = formData;
	$("#purReportDetail").datagrid("options").method = "post";
	$("#purReportDetail").datagrid("options").url =  contextPath+"/report/purchase/getPurReportDetail";
	$("#purReportDetail").datagrid("load");
}


/**
 * 导出
 */
function exportDetails(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
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
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$("#queryForm").attr("action",contextPath+'/report/purchase/exportDetails');
	$("#queryForm").submit();	

}




/**
 * 机构列表下拉选
 */
function searchBranch (){
	new publicAgencyService(function(data){
//		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},"","");
}
/**
 * 供应商公共组件
 */
function searchSupplier(){
	var param = {
			saleWayNot:"purchase"
	}
	new publicSupplierService(function(data){
//		$("#supplierId").val(data.id);
		$("#supplierName").val(data.supplierName);
	},param);
}
/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
//		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryName").val(data.categoryName);

	});
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/purchase/detail";
};