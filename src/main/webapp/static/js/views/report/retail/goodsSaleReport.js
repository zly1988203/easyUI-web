$(function(){
	//开始和结束时间
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
	gridHandel.setGridName("storeSale");
	dg= $("#storeSale").datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize : 50,
		height:'100%',
		width:'100%',
        columns:[[
            {field:'branchName',title:'店铺名称',width:'220px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
                    return str;
                }
            },
              {field:'skuCode',title: '货号', width: '55px', align: 'left'},
			{field: 'skuName', title: '商品名称', width: '185px', align: 'left'},
			{field: 'barCode', title: '条码', width: '100px', align: 'left'},
            {field: 'costPrice', title: '成本价', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		 if(row.isFooter){
                         return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                     }
                    if(!value){
                    	row["costPrice"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'originalAmount', title: '原价金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		 if(row.isFooter){
                         return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                     }
                    if(!value){
                    	row["originalAmount"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'discountAmount', title: '优惠金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["discountAmount"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'saleAmount', title: '销售金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["saleAmount"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'saleNum', title: '销售数量', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["saleNum"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'returnAmount', title: '退货金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    if(!value){
                    	row["returnAmount"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'returnNum', title: '退货数量', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["returnNum"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'totalNum', title: '数量小计', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["totalNum"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'totalAmount', title: '金额小计', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["totalAmount"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'categoryCode', title: '类别编号', width: '65px', align: 'left'},
            {field: 'categoryName', title: '类别名称', width: '65px', align: 'left'},
            {field: 'spec', title: '规格', width: '55px', align: 'left'},
            {field: 'unit', title: '单位', width: '45px', align: 'left'}
        ]],
        onLoadSuccess:function(data){
        	gridHandel.setDatagridHeader("center");

        }
    });
   // queryForm();
    if(hasCostPrice==false){
        priceGrantUtil.grantCostPrice("storeSale",["costPrice"])
    }
}

//查询入库单
function queryForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	$("#storeSale").datagrid("options").method = "post";
	$("#storeSale").datagrid('options').url = contextPath + '/goodsSale/report/getGoodsSaleList';
	$("#storeSale").datagrid('load', fromObjStr);
}
//小计金额和小计数量 计算
/*function countSet(data){
	  var rows=data.list;
	  if(!rows){
		  return; 
	  }
	  $.each(rows, function (index, el) {
		  if(el){
			  el["totalAmount"] = parseFloat(el["saleAmount"])-parseFloat(el["returnAmount"]);
			  el["totalNum"] = parseFloat(el["saleNum"])-parseFloat(el["returnNum"]);
			  return;
		  }
	   })
	  $("#storeSale").datagrid("loadData",rows);
	 
}*/

/**
 * 机构名称
 */
function searchBranch(){
	new publicAgencyService(function(data){
//		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}
/**
 * 商品类别
 */
function searchCategory(){
	new publicCategoryService(function(data){
//		$("#categoryId").val(data.goodsCategoryId);
		$("#categoryName").val(data.categoryName);

	});
}
/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
};
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#storeSale').datagrid('getData').total;
	if(length == 0){
		successTip("无数据可导");
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
	var length = $("#storeSale").datagrid('getData').total;
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
	$("#queryForm").attr("action",contextPath+"/goodsSale/report/exportList?"+fromObjStr);
	$("#queryForm").submit();
}