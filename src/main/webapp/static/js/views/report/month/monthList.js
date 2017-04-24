/**
 * Created by bwp on 2017/03/29.
 * 库存调整-列表
 */
$(function(){
	
	initDatagridYueJXC();
	branchId = $("#branchId").val();
});

function updateWdatePicker(){
	   WdatePicker({
       	dateFmt:'yyyy-MM',
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
			{field: 'branchCode', title: '机构编号', width: 100, align: 'left',formatter : function(value, row,index) {
		        var str = value;
		        if(value ==="SUM"){
		            str ='<div class="ub ub-pc">合计</div> '
		        }
		        return str;
		    }},
			{field: 'branchName', title: '机构名称', width: 140, align: 'left'},
			{field: 'skuCode', title: '货号', width: 120, align: 'left'},
			{field: 'skuName', title: '商品名称', width: 140, align: 'left'},
			{field: 'barCode', title: '条码', width: 100, align: 'left'},
			{field: 'spec', title: '规格', width: 80, align: 'left'},
			{field: 'unit', title: '单位', width: 80, align: 'center'},
			{field: 'categoryCode', title: '类别编号', width: 100, align: 'left'},
			{field: 'categoryName', title: '类别名称', width: 120, align: 'left'},
			{field: 'beginStock', title: '期初数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'beginCostAmount', title: '期初成本金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'beginSaleAmount', title: '期初售价金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'purchaseNum', title: '采购数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'purchaseAmount', title: '采购金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'dciNum', title: '配送入库数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'dciAmount', title: '配送入库金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'dcoNum', title: '配送出库数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'dcoAmount', title: '配送出库金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'posNum', title: '销售数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'posAmount', title: '销售金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'costAmount', title: '销售成本金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'otherNum', title: '其他数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'otherAmount', title: '其他金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'costChangeAmount', title: '成本调整金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'endStock', title: '期末库存数', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'salePrice', title: '期末零售价', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'costPrice', title: '期末成本价', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'endCostAmount', title: '期末成本金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'endSaleAmount', title: '期末销售金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'profitMargin', title: '销售毛利率', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'profitAmount', title: '销售毛利', width: 100, align: 'right',
				formatter:function(value,row,index){
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
	$("#"+datagridId).datagrid('options').url = contextPath + '/report/month/details/list';
	$("#"+datagridId).datagrid('load', fromObjStr);
}


/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF',sessionBranchId);
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

var dg;
/**
 * 导出
 */
function exportData(){
	dg = gridYueJXCList;
	var length = gridYueJXCList.datagrid('getData').total;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(gridYueJXCList.datagrid('getData').total);
	$("#exportWin").window("open");
}

/**
 * 导出
 */
function exportExcel(){
	var length = gridYueJXCList.datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	console.log(fromObjStr);
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/report/month/export/list");
	
	$("#queryForm").submit();
}

var printReport = function(){
	var length = gridYueJXCList.datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var queryParams =  urlEncode($("#queryForm").serializeObject());
	parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/month/print?params="+queryParams);
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