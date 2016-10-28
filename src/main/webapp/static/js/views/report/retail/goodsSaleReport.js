$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
    $("#storeSale").datagrid({
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
            {field:'branchName',title:'店铺名称',width:'140px',align:'left'},
            {field:'skuCode',title: '货号', width: '100px', align: 'left'},
			{field: 'skuName', title: '商品名称', width: '200px', align: 'left'},
			{field: 'barCode', title: '条码', width: '200px', align: 'left'},
			{field: 'categoryName', title: '类别名称', width: '80px', align: 'right'},
            {field: 'spec', title: '规格', width: '200px', align: 'left'},
            {field: 'unit', title: '单位', width: '130px', align: 'left'},
            {field: 'originalAmount', title: '原价金额', width: '150px', align: 'center',
                editor:{
                    type:'numberbox',
                    options:{
                    	disabled:true,
                        min:0,
                        precision:4
                    }
                }
            },
            {field: 'discountAmount', title: '优惠金额', width: '130px', align: 'left',
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            },
            {field: 'saleAmount', title: '销售金额', width: '130px', align: 'left',
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            },
            {field: 'saleNum', title: '销售数量', width: '130px', align: 'left',
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            },
            {field: 'returnAmount', title: '退货金额', width: '130px', align: 'left',
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            },
            {field: 'returnNum', title: '退货数量', width: '130px', align: 'left',
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            },
            {field: 'totalAmount', title: '小计金额', width: '130px', align: 'left',
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            },
            {field: 'totalNum', title: '小计数量', width: '130px', align: 'left',
            	
            	 editor:{
                     type:'numberbox',
                     options:{
                     	disabled:true,
                         min:0,
                         precision:4
                     }
                 }
            }
        ]],
        onLoadSuccess:function(data){
        	countSet(data);	
        }
    });
   // queryForm();
}
//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#storeSale").datagrid("options").method = "post";
	$("#storeSale").datagrid('options').url = contextPath + '/goodsSale/report/getGoodsSaleList';
	$("#storeSale").datagrid('load', fromObjStr);
}
/**
 * 计算
 */
function countSet(data){
	var rows=data.list;
  $.each(rows, function (index, el) {
	  el["totalAmount"] = parseFloat(el["saleAmount"])-parseFloat(el["returnAmount"]);
	  el["totalNum"] = parseFloat(el["saleNum"])-parseFloat(el["returnNum"]);
  })
  $("#storeSale").datagrid("loadData", rows);
}

/**
 * 机构名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryName").val(data.categoryName);

	});
}
/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};

/**
 * 导出
 */
function exportExcel(){
	var length = $("#storeSale").datagrid('getData').total;
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
	$("#queryForm").attr("action",contextPath+"/goodsSale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}