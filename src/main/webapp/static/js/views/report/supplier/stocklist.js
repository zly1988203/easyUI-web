/**
 * Created by wxl on 2016/08/17.
 * 供应商进货报表
 */
$(function() {
    //开始和结束时间
	$("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	
	//选择报表类型
	initGoodsTotalAnalysiGrid();
	
	//机构选择 组件
	$('#branchSelects').branchSelect();
	
	//供应商选择组件
	$('#supplierComponent').supplierSelect({
		loadFilter:function(data){
			data.supplierId = data.id;
			return data;
		}
	});
	
	//商品类别选择组件
	$('#categoryNameDiv').categorySelect();
});

var gridHandel = new GridClass();

var gridName = "goodsStockList";
/**
 * 初始化表格按  商品
 * @param queryType
 */
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
           {field: 'smallCateCore', title: '小类编号', width:120, align: 'left'},
           {field: 'cateName', title: '商品类别', width:120, align: 'left'},
           {field: 'centerCateName', title: '商品中类', width:120, align: 'left'},
           {field: 'bigCateName', title: '商品大类', width:120, align: 'left'},
           {field: 'skuCode', title: '货号', width:120, align: 'left'},
           {field: 'skuName', title: '商品名称', width:150, align: 'left'},
           {field: 'barCode', title: '商品条码', width:120, align: 'left'},
           {field: 'unit', title: '单位', width:65, align: 'left'},
           {field: 'spec', title: '规格', width:65, align: 'left'},
           {field: 'stockNum', title: '期间进货数量', width:100, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
        	   }
           },
           {field: 'stockCost', title: '期间成本价', width:100, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
        	   }
           },
           {field: 'stockAmount', title: '期间进货金额', width:100, align: 'right',
        	   formatter:function(value,row,index){
        		   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
        	   }
           }
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			//updateFooter();
		}
    });
   
    //价格权限
    var param = {
    		//期间成本价 stockCost  期间进货金额 stockAmount
    		costPrice:['stockCost','stockAmount']	
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
	$("#"+gridName).datagrid("options").url =  contextPath+"/report/supplier/stock/list";
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
	$("#queryForm").attr("action",contextPath+'/report/supplier/stock/export/list');
	$("#queryForm").submit();	
}

/**
 * 重置
 */
var resetForm = function(){
	location.href=contextPath+"/report/supplier/stock";
};

var printReport = function(){
    var length = $('#'+gridName).datagrid('getData').total;
    if(length == 0){
        $_jxc.alert("没有数据");
        return;
    }
    var queryParams =  urlEncode($("#queryForm").serializeObject());
    parent.addTabPrint("reportPrint"+new Date().getTime(),"打印",contextPath+"/report/supplier/stock/print?params="+queryParams);
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