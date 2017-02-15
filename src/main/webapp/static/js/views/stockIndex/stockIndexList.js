/**
 * Created by wxl on 2016/10/12.
 * 库存调整-列表
 */
$(function(){
	$('#detailDailog').dialog('close');
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	initDatagridStockIndex();
	initDetailStock();
});

var gridHandel = new GridClass();
var gridHandelDetail = new GridClass();

var stockList;
var stockDetailList;

//初始化表格
function initDatagridStockIndex(){
	gridHandel.setGridName('stockIndexList');
	stockList = $("#stockIndexList").datagrid({
		//title:'普通表单-用键盘操作',
		method:'post',
		align:'center',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		fitColumns:true,    //每列占满
		//fit:true,            //占满
		height:'100%',
		width:'100%',
		columns:[[
			{field:'check',checkbox:true},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 180, align: 'left'},
			/*skuCode*/
			{field: 'formNo', title: '货号', width: 100, align: 'left',formatter:function(value,row,index){
				return '<a style="text-decoration: underline;" href="#" onclick="openStockDialog(\''+value+'\',\''+index+'\')">'+value+'</a>'
			}},
			{field: 'skuName', title: '商品名称', width: 180, align: 'left'},
			{field: 'barCode', title: '条码', width: 140, align: 'left'},
			{field: 'spec', title: '规格', width: 80, align: 'left'},
			{field: 'unit', title: '单位', width: 80, align: 'center'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'category', title: '类别名称', width: 120, align: 'left'},
			{field: 'stockBegin', title: '库存上限', width: 100, align: 'left'},
			{field: 'stockEnd', title: '库存下限', width: 100, align: 'left'}
		]],

	});
    queryForm();
}

function initDetailStock(){
	gridHandelDetail.setGridName('detailStockTarget');
	gridHandelDetail.initKey({
		firstName:'stockBegin',
		enterName:'stockBegin',
	});

	//详情grid
	stockDetailList = $("#detailStockTarget").datagrid({
		//title:'普通表单-用键盘操作',
		method:'post',
		align:'center',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		fitColumns:true,    //每列占满
		//fit:true,            //占满
		height:'100%',
		width:'100%',
		columns:[[
			{field: 'formNo', title: '货号', width: 100, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 180, align: 'left'},
			{field: 'barCode', title: '条码', width: 140, align: 'left'},
			{field: 'spec', title: '规格', width: 80, align: 'left'},
			{field: 'unit', title: '单位', width: 80, align: 'center'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'category', title: '类别名称', width: 120, align: 'left'},
			{field: 'stockBegin', title: '库存上限', width: 100, align: 'left',
				editor:{
					type:'numberbox',
					value:0,
					options:{
						min:0,
						precision:4,
						onChange: onChangeStockBegin,
					}
				},
			},
			{field: 'stockEnd', title: '库存下限', width: 100, align: 'left',
				editor:{
					type:'numberbox',
					value:0,
					options:{
						min:0,
						precision:4,
						onChange: onChangeStockEnd,
					}
				},
			}
		]],
		onClickCell:function(rowIndex,field,value){
			gridHandelDetail.setBeginRow(rowIndex);
			gridHandelDetail.setSelectFieldName(field);
			var target = gridHandelDetail.getFieldTarget(field);
			if(target){
				gridHandelDetail.setFieldFocus(target);
			}else{
				gridHandelDetail.setSelectFieldName("stockBegin");
			}
		},

	});
}

function onChangeStockBegin(newV,oldV){
	console.log('newV',newV);
	console.log('oldV',oldV);
}

function onChangeStockEnd(newV,oldV){
	console.log('newV',newV);
	console.log('oldV',oldV);
}


var detailIndex;
//详情
function openStockDialog(value,index){
	detailIndex = index;
	var gridData = stockList.datagrid('getData');
	var tempGridData = $.extend({},gridData);
	var currentData = gridHandel.getRows()[index];
	$("#detailBranchName").val(currentData.branchName);
	$("#detailBranchId").val(currentData.branchCode);
	tempGridData.rows = [currentData];
	tempGridData.list = [currentData];
	gridHandelDetail.setLoadData(tempGridData);
	$('#detailDailog').dialog('open');

}

//关闭详情
function closeDetailDialog(){
	$('#detailDailog').dialog('close');
}

//保存详情
function saveDetailStock(){
	var detGridData = gridHandelDetail.getRows()[0];
	console.log('detGridData',detGridData);
	var detBranchID = $('#detailBranchId').val();
	var detBranchName = $('#detailBranchName').val();
	console.log('detBranchID',detBranchID);
	console.log('detBranchName',detBranchName);

	var parentCurData = gridHandel.getRows()[detailIndex];
	parentCurData = $.extend(parentCurData,detGridData);

	console.log(parentCurData);
	$("#stockIndexList").datagrid('updateRow',{
		index: detailIndex,
		row: {branchName: '新名称'}
	});

}

//详情选择机构
function selectDetailBranches(){
	new publicAgencyService(function(data){
		$("#detailBranchId").val(data.branchesId);
		$("#detailBranchName").val(data.branchName);
	},'BF','');
}


//新增入库单
function addStockForm(){
	toAddTab("新增库存调整单",contextPath + "/stock/adjust/add");
}

//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#stockIndexList").datagrid("options").method = "post";
	$("#stockIndexList").datagrid('options').url = contextPath + '/stock/adjust/getStockFormList';
	$("#stockIndexList").datagrid('load', fromObjStr);
}


//批量修改
function updateMore(){
	var getCheck = $("#stockIndexList").datagrid('getChecked');
	if(!getCheck || getCheck.length < 1){
		messager("请选择至少一行数据");
		return;
	}

	toAddTab("存量指标修改",contextPath + "/stock/index/add");

}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
//		$("#createBranchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

/**
 * 类别选择
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryCode").val(data.categoryCode);
		$("#categoryNameCode").val("["+data.categoryCode+"]"+data.categoryName);
	});
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};