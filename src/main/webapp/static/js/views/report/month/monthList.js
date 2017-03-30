/**
 * Created by bwp on 2017/03/29.
 * 库存调整-列表
 */
$(function(){
	
	initDatagridYueJXC();
});

function updateWdatePicker(){
	   WdatePicker({
       	dateFmt:'yyyy-MM-dd',
         onpicked:function(dp){
             $("input:radio[name='dateradio']").attr("checked",false);
         }
    })
}

var datagridId = "yueJXCList"

var gridHandel = new GridClass();
var gridHandelDetail = new GridClass();

var gridYueJXCList;

//初始化表格
function initDatagridYueJXC(){
	gridYueJXCList = $("#"+datagridId).datagrid({
		method:'post',
		align:'center',
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		pagination:true,    //分页
		showFooter:true,
		fitColumns:false,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
			{field:'check',checkbox:true},
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left'},
			{field: 'branchName', title: '机构名称', width: 140, align: 'left'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'categoryName', title: '类别名称', width: 120, align: 'left'},
			{field: 'skuCode', title: '货号', width: 120, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 140, align: 'left'},
			{field: 'barCode', title: '条码', width: 100, align: 'left'},
			{field: 'skuSpec', title: '规格', width: 80, align: 'left'},
			{field: 'skuUnit', title: '单位', width: 80, align: 'center'},
			{field: 'skuUnit1', title: '类别编号', width: 100, align: 'left'},
			{field: 'skuUnit2', title: '类别名称', width: 100, align: 'left'},
			{field: 'skuUnit3', title: '期初数量', width: 100, align: 'right'},
			{field: 'skuUnit4', title: '期初成本金额', width: 100, align: 'center',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit5', title: '期初售价金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit6', title: '采购数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit7', title: '采购金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit8', title: '配送入库数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit9', title: '配送入库金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit10', title: '配送出库数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit11', title: '配送出库金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit13', title: '销售数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit12', title: '销售金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit14', title: '其他数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit15', title: '其他金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit16', title: '成本调整金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit17', title: '期末库存数', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit18', title: '期末成本金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit19', title: '期末销售金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit20', title: '销售毛利', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			}			
		]],

	});
}

//查询
function queryForm(){
	if($("#branchName").val()=="" && $("#skuCode").val()=="" ){
        messager("请选择机构或输入条码");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/stock/index/getStockIndexList';
	$("#"+datagridId).datagrid('load', fromObjStr);
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