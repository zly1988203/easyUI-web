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

var maxNum = 999999.99;

var clickCellFlag = false;
//初始化表格
function initDatagridStockIndex(){
	gridHandel.setGridName('stockIndexList');
	stockList = $("#stockIndexList").datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		fitColumns:true,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
			{field:'check',checkbox:true},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 180, align: 'left'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'categoryName', title: '类别名称', width: 120, align: 'left'},
			{field: 'skuCode', title: '货号', width: 100, align: 'left',formatter:function(value,row,index){
				return '<a style="text-decoration: underline;" href="#" onclick="openStockDialog(\''+value+'\',\''+index+'\')">'+value+'</a>'
			}},
			{field: 'skuName', title: '商品名称', width: 180, align: 'left'},
			{field: 'barCode', title: '条码', width: 140, align: 'left'},
			{field: 'skuSpec', title: '规格', width: 80, align: 'left'},
			{field: 'skuUnit', title: '单位', width: 80, align: 'center'},
			{field: 'upperLimit', title: '库存上限', width: 100, align: 'left',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'lowerLimit', title: '库存下限', width: 100, align: 'left',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			}
		]],

	});
//    queryForm();
}

function initDetailStock(){
	gridHandelDetail.setGridName('detailStockTarget');
	gridHandelDetail.initKey({
		firstName:'lowerLimit',
		enterName:'lowerLimit',
	});

	//详情grid
	stockDetailList = $("#detailStockTarget").datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		fitColumns:true,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
			{field: 'skuCode', title: '货号', width: 100, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 280, align: 'left'},
			{field: 'barCode', title: '条码', width: 140, align: 'left'},
			{field: 'skuSpec', title: '规格', width: 80, align: 'left'},
			{field: 'skuUnit', title: '单位', width: 80, align: 'center'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'categoryName', title: '类别名称', width: 120, align: 'left'},
			{field: 'lowerLimit', title: '库存下限', width: 100, align: 'left',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
				editor:{
					type:'numberbox',
					value:0,
					options:{
						min:0,
						precision:4,
						onChange: onChangeStockEnd,
					}
				},
			},
			{field: 'upperLimit', title: '库存上限', width: 100, align: 'left',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
				editor:{
					type:'numberbox',
					value:0,
					options:{
						min:0,
						precision:4,
						onChange: onChangeStockBegin,
					}
				},
			}
		]],
		onClickCell:function(rowIndex,field,value){
			clickCellFlag = true;
			gridHandelDetail.setBeginRow(rowIndex);
			gridHandelDetail.setSelectFieldName(field);
			var target = gridHandelDetail.getFieldTarget(field);
			if(target){
				gridHandelDetail.setFieldFocus(target);
			}else{
				gridHandelDetail.setSelectFieldName("lowerLimit");
			}
		},

	});
}


function onChangeStockBegin(newV,oldV){
	if(clickCellFlag){
		clickCellFlag = false;
		return;
	}
	if(parseFloat(newV) > maxNum ){
		$_jxc.alert('库存上限输入值最大为  '+maxNum);
		return;
	}
}

function onChangeStockEnd(newV,oldV){
	if(clickCellFlag){
		clickCellFlag = false;
		return;
	}
	if(parseFloat(newV) > maxNum ){
		$_jxc.alert('库存下限输入值最大为  '+maxNum);
		return;
	}
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
	$("#detailStockTarget").datagrid("endEdit", gridHandelDetail.getSelectRowIndex());
	var detGridData = gridHandelDetail.getRows()[0];
	if(parseFloat(detGridData.upperLimit) > maxNum){
		$_jxc.alert('库存上限输入值最大为  '+maxNum);
		return;
	}
	if(parseFloat(detGridData.lowerLimit) > maxNum){
		$_jxc.alert('库存下限输入值最大为  '+maxNum);
		return;
	}
	if(parseFloat(detGridData.upperLimit) < parseFloat(detGridData.lowerLimit) ){
		$_jxc.alert('库存上限不能小于库存下限');
		return;
	}

	var reqObj = JSON.stringify([detGridData]);
	// 调用后台保存方法，成功提示
	$_jxc.ajax({
        url: contextPath+"/stock/index/saveStockIndex",
        data: {"data":reqObj}
	},function(data){
		if (data.code == 0) {
			$("#stockIndexList").datagrid('updateRow',{
				index: detailIndex,
				row: {lowerLimit: detGridData.lowerLimit,upperLimit:detGridData.upperLimit}
			});
			$_jxc.alert('修改成功');
			closeDetailDialog();
		} else {
			// 失败提示
			$_jxc.alert(data.message);
		}
	});

}

//查询
function queryForm(){
	if($("#branchName").val()=="" && $("#skuCode").val()=="" ){
        $_jxc.alert("请选择机构或输入条码");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr)
	$("#stockIndexList").datagrid("options").method = "post";
	$("#stockIndexList").datagrid('options').url = contextPath + '/stock/index/getStockIndexList';
	$("#stockIndexList").datagrid('load', fromObjStr);
}


//批量修改
function updateMore(){
	toAddTab("商品存量指标修改",contextPath + "/stock/index/add");

}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
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