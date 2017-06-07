/**
 * Created by bwp on 2017/03/29.
 * 供应商进销存月报表-列表
 */
$(function(){
	
	initDatagridGYYueJXC();
	branchId = $("#branchId").val();
	//$(".radioItem").on("click",queryForm());
});

function updateWdatePicker(){
	   WdatePicker({
		    dateFmt:'yyyy-MM',
		    maxDate:'%y-%M',
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
		pageSize:50,
		showFooter:true,
		fitColumns:false,    //每列占满
		height:'100%',
		width:'100%',
		columns:[[
			{field: 'branchCode', title: '机构编码', width: 100, align: 'left',formatter : function(value, row,index) {
		        var str = value;
		        if(value ==="SUM"){
		            str ='<div class="ub ub-pc">合计</div> '
		        }
		        return str;
		    }},
			{field: 'branchName', title: '机构名称', width: 100, align: 'left'},
			{field: 'supplierCode', title: '供应商编号', width: 100, align: 'left'},
			{field: 'supplierName', title: '供应商名称', width: 100, align: 'left'},
			{field: 'saleWay', title: '经营方式', width: 100, align: 'left'},
			{field: 'beginStock', title: '期初库存数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'beginSaleAmount', title: '期初库存金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'beginCostAmount', title: '期初成本金额', width: 100, align: 'right',
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
			{field: 'costAmount', title: '销售成本', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'profitAmount', title: '销售毛利', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'endStock', title: '期末库存数量', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'endCostAmount', title: '期末库存金额', width: 100, align: 'right',
				formatter:function(value,row,index){
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			}		
		]],

	});
    if(hasCostPrice==false){
        var fieldArr = ["costAmount","beginCostAmount","dcoAmount",
            "dciAmount","costChangeAmount","otherAmount","endCostAmount",
            "endSaleAmount","profitAmount"
        ]
        priceGrantUtil.grantCostPrice(datagridId,fieldArr)
    }

}

//查询
function queryForm(){
	if($("#branchName").val()=="" && $("#skuCode").val()=="" ){
        $_jxc.alert("请选择机构或输入条码");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#"+datagridId).datagrid("options").method = "post";
	$("#"+datagridId).datagrid('options').url = contextPath + '/report/supplier/month/details/list';
	$("#"+datagridId).datagrid('load', fromObjStr);
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'',sessionBranchId);
}


/**
 * 供应商选择
 */
function selectSupplier(){
	if($("#branchName").val()==""){
        $_jxc.alert("请先选择机构");
        return;
    } 
	var branchId = $("#createBranchId").val();
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	},{"branchId":branchId==""&&branchId?sessionBranchId:branchId,"isDirect":''});
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
	dg = gridGYYueJXCList;
	var length = gridGYYueJXCList.datagrid('getData').total;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	$('#exportWin').window({
		top:($(window).height()-300) * 0.5,   
	    left:($(window).width()-500) * 0.5
	});
	$("#exportWin").show();
	$("#totalRows").html(gridGYYueJXCList.datagrid('getData').total);
	$("#exportWin").window("open");
}

/**
 * 导出
 */
function exportExcel(){
	var length = gridGYYueJXCList.datagrid('getData').total;
	if(length == 0){
		successTip('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#queryForm").attr("action",contextPath+"/report/supplier/month/export/list");
	
	$("#queryForm").submit();
}

var printReport = function(){
	var length = gridGYYueJXCList.datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var queryParams =  urlEncode($("#queryForm").serializeObject());
	parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/supplier/month/print?params="+queryParams);
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