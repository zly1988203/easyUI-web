/**
 * Created by wxl on 2016/08/17.
 * 供应商销售报表
 */
$(function() {
    //开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate().format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	
	//选择报表类型
	initGoodsTotalAnalysiGrid();
	
	$('#branchSelects').branchSelect();
	
	$('#supplierComponent').supplierSelect({
        loadFilter:function(data){
            data.supplierId = data.id;
            return data;
        }
    });
});

var gridHandel = new GridClass();
var gridName = "goodsSellistList";
function initGoodsTotalAnalysiGrid() {
	gridHandel.setGridName(gridName);
   dg =  $("#"+gridName).datagrid({
        //title:'普通表单-用键盘操作',
        method: 'post',
        align: 'center',
        singleSelect: false,  //单选  false多选
        rownumbers: true,    //序号
        pagination: true,    //分页
        showFooter:true,
        pageSize : 50,
        pageList : [20,50,100],//可以设置每页记录条数的列表
        showFooter:true,
        height:'100%',
        columns: [[
           {field: 'supplierCode', title: '供应商编码', width:120, align: 'left',formatter : function(value, row,index) {
               var str = value;
               if(value ==="SUM"){
                   str ='<div class="ub ub-pc">合计</div> '
               }
               return str;
           }},
           {field: 'supplierName', title: '供应商名称', width:120, align: 'left'},
           {field: 'saleWay', title: '经营方式', width:120, align: 'left'},
           {field: 'xsNum', title: '销售数量', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'xsAmount', title: '销售金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },        
           {field: 'actual', title: '当前库存', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'costAmount', title: '库存成本金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'saleAmount', title: '库存销售金额', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'profitAmount', title: '毛利', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'profitRate', title: '毛利率', width:120, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }   
           },
           {field: 'skuCount', title: 'SKU数', width:120, align: 'left',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }   
           }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
   
   //价格权限 2.7
   var param = {
   		costPrice:['costAmount','profitAmount','profitRate']	
   }
   priceGrantUtil.grantPrice(gridName,param);
}


/**
 * 查询
 */
function query(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var formData = $("#queryForm").serializeObject();
	$("#"+gridName).datagrid("options").queryParams = formData;
	$("#"+gridName).datagrid("options").method = "post";
	$("#"+gridName).datagrid("options").url =  contextPath+"/report/supplier/sell/list";
	$("#"+gridName).datagrid("load");
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#'+gridName).datagrid('getData').total;
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
/**
 * 导出
 */
function exportExcel(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$_jxc.alert('日期不能为空');
		return ;
	}
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	$("#queryForm").attr("action",contextPath+'/report/supplier/sell/export/list');
	$("#queryForm").submit();	
}

/**
 * 商品类别
 */
function searchCategory(){
	var categoryType=$('input[name="searchType"]:checked ').val();
	var param = {
		categoryType:categoryType
	}
	new publicCategoryService(function(data){
		console.info(data);
		//$("#categoryCode").val(data.categoryCode);
		$("#categoryCode").val(data.categoryName);
	},param);
}
/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/supplier/sell";
};

var printReport = function(){
    var length = $('#'+gridName).datagrid('getData').total;
    if(length == 0){
        $_jxc.alert("没有数据");
        return;
    }
    var queryParams =  urlEncode($("#queryForm").serializeObject());
    parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/supplier/sell/print?params="+queryParams);
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