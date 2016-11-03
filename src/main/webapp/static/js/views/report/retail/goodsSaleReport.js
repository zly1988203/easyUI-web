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
            {field:'branchName',title:'店铺名称',width:'140px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b">合计</div> '
                    }
                    return str;
                }
            },
              {field:'skuCode',title: '货号', width: '80px', align: 'left'},
			{field: 'skuName', title: '商品名称', width: '250px', align: 'left'},
			{field: 'barCode', title: '条码', width: '120px', align: 'left'},
			{field: 'categoryName', title: '类别名称', width: '120px', align: 'left'},
            {field: 'spec', title: '规格', width: '80px', align: 'left'},
            {field: 'unit', title: '单位', width: '80px', align: 'left'},
            {field: 'originalAmount', title: '原价金额', width: '100px', align: 'right',
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
            {field: 'discountAmount', title: '优惠金额', width: '100px', align: 'right',
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
            {field: 'saleAmount', title: '销售金额', width: '100px', align: 'right',
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
            {field: 'saleNum', title: '销售数量', width: '100px', align: 'right',
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
            {field: 'returnAmount', title: '退货金额', width: '100px', align: 'right',
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
            {field: 'returnNum', title: '退货数量', width: '100px', align: 'right',
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
            {field: 'totalAmount', title: '小计金额', width: '100px', align: 'right',
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
            {field: 'totalNum', title: '小计数量', width: '100px', align: 'right',
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
            }
        ]],
        onLoadSuccess:function(data){
        	gridHandel.setDatagridHeader("center");
        	updateFooter();
        	countSet(data);	
			
        	
        }
    });
   // queryForm();
}
//合计
function updateFooter(){
    var fields = {originalAmount:0,discountAmount:0,saleAmount:0,saleNum:0,returnAmount:0,returnNum:0,totalAmount:0,totalNum:0,isGift:0};
    sum(fields);
}
function sum(fields) {
	var fromObjStr = $('#queryForm').serializeObject();
	$.ajax({
    	url : contextPath+"/goodsSale/report/sum",
    	type : "POST",
    	data : fromObjStr,
    	success:function(result){
    		if(result['code'] == 0){
    			fields.originalAmount = result['originalAmountSum'];
    			fields.discountAmount = result['discountAmountSum'];
    			fields.returnAmount = result['returnAmountSum'];
    			fields.returnNum = result['returnNumSum'];
    			fields.saleAmount = result['saleAmountSum'];
    			fields.saleNum = result['saleNumSum'];
    			fields.totalAmount = result['totalAmountSum'];
    			fields.totalNum = result['totalNumSum'];
    			$("#storeSale").datagrid('reloadFooter',[$.extend({"isFooter":true,},fields)]);
    		}else{
    			successTip(result['message']);
    		}
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}
//查询入库单
function queryForm(){
    //判定店铺名称是否存在
    if($("#branchName").val()==""){
        messager("请选择店铺名称");
        return;
    } 
	var fromObjStr = $('#queryForm').serializeObject();
	$("#storeSale").datagrid("options").method = "post";
	$("#storeSale").datagrid('options').url = contextPath + '/goodsSale/report/getGoodsSaleList';
	$("#storeSale").datagrid('load', fromObjStr);
}
//小计金额和小计数量 计算
function countSet(data){
	  var rows=data.list;
	  
	  if(!rows){
		  return; 
	  }
	  
	  $.each(rows, function (index, el) {
		  if(el){
			  el["totalAmount"] = parseFloat(el["saleAmount"])-parseFloat(el["returnAmount"]);
			  el["totalNum"] = parseFloat(el["saleNum"])-parseFloat(el["returnNum"]);
		  }
	   })
	  $("#storeSale").datagrid("loadData",rows);
  return data;
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
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
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