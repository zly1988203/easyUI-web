/**
 * Created by bwp on 2017/03/29.
 * 供应商进销存月报表-列表
 */
$(function(){
	
	initDatagridGYYueJXC();
});

function updateWdatePicker(){
	   WdatePicker({
		    dateFmt:'yyyy-MM-dd',
	    	onpicked:function(dp){
	          $("input:radio[name='dateradio']").attr("checked",false);
	      }
	 })
}

var datagridId = "yueGYJXCList"

var gridHandel = new GridClass();
var gridHandelDetail = new GridClass();

var gridGYYueJXCList;

//初始化表格
function initDatagridGYYueJXC(){
	gridGYYueJXCList = $("#"+datagridId).datagrid({
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
			{field: 'branchCode1', title: '机构编码', width: 100, align: 'left'},
			{field: 'branchName1', title: '机构名称', width: 100, align: 'left'},
			{field: 'branchCode', title: '供应商编号', width: 100, align: 'left'},
			{field: 'branchName', title: '供应商名称', width: 100, align: 'left'},
			{field: 'categoryName', title: '经营方式', width: 100, align: 'left'},
			{field: 'skuUnit1', title: '期初库存数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit2', title: '期初库存金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit4', title: '期初进货金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}	
			},
			{field: 'skuUnit5', title: '销售数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}	
			},
			{field: 'skuUnit6', title: '销售金额', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit7', title: '销售成本', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit8', title: '销售毛利', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit9', title: '期末库存数量', width: 100, align: 'right',
				fomatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'skuUnit10', title: '期末库存金额', width: 100, align: 'right',
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
 * 供应商选择
 */
function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};