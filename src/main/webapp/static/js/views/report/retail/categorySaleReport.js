$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",29));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
	gridHandel.setGridName("categorySale");
    $("#categorySale").datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'branchName',title:'机构名称',width:'200px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                }
            },
            {field:'cityName',title: '所在城市', width: '200px', align: 'left'},
			{field:'categoryCode', title: '类别编号', width: '200px', align: 'left'},
            {field:'categoryName', title: '类别名称', width: '80px', align: 'right'},
            {field:'saleAmount', title: '销售金额', width: '130px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
                    }
                    if(!value){
                    	row["saleAmount"] = 0.0000;
                    }
                    return parseFloat(value||0).toFixed(4);
                },
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:2
                     }
                 }
            },
            {field:'saleRate', title: '销售占比', width: '130px', align: 'left'},
      ]],
      onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
    });
    //queryForm();
}

//合计
function updateFooter(){
    var fields = {saleAmount:0,isGift:0};
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}
//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#categorySale").datagrid("options").method = "post";
	$("#categorySale").datagrid('options').url = contextPath + '/categorySale/report/getCategorySaleList';
	$("#categorySale").datagrid('load', fromObjStr);
}

/**
 * 机构名称
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'DO','');
}

/**
 * 导出
 */
function exportExcel(){
	var length = $("#categorySale").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
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
	$("#queryForm").attr("action",contextPath+"/categorySale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",29));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};