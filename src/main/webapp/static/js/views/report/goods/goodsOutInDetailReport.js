$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initDatagridRequire();
});
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequire(){
	gridHandel.setGridName("goodsOutInDetail");
    $("#goodsOutInDetail").datagrid({
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
			{field:'branchCode',title:'店铺编号',width:'80px',align:'left',
				formatter : function(value, row,index) {
                    var str = value;
                    if(row.isFooter){
                        str ='<div class="ub ub-pc ufw-b" style="text-align:left;height:auto;">合计</div> '
                    }
                    return str;
                }	
			},
            {field:'branchName',title:'店铺名称',width:'140px',align:'left'},
            {field:'formNo',title: '单号', width: '150px', align: 'left',
            	formatter:function(value,row,index){
            		console.log(row);
            		if(row.formType=="库存调整"){
            			;
                		return "<a style='text-decoration: underline;' href='"+ contextPath +"/stock/adjust/edit?id="+ row.formId +"'>" + value + "</a>"
                	}else if(row.formType=="采购收货"){
                		return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/purchase/receiptEdit?formId="+ row.formId +"'>" + value + "</a>"	
                	}
                	else if(row.formType=="采购退货"){
                		return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/purchase/returnEdit?formId="+ row.formId +"'>" + value + "</a>"	
                    		
                	}
                	else if(row.formType=="配送入库"){
                		return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/deliverForm/deliverEdit?deliverFormId="+ row.formId +"'>" + value + "</a>"	
                    	
                	}
					else if(row.formType=="配送出库"){
					        
						return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/deliverForm/deliverEdit?deliverFormId="+ row.formId +"'>" + value + "</a>"	
                    	
					}
					else if(row.formType=="销售"){
						return value 	
					}
               }
            },
            {field:'skuCode',title: '货号', width: '100px', align: 'left'},
            {field:'barCode',title: '条码', width: '150px', align: 'left'},
			{field: 'skuName', title: '商品名称', width: '200px', align: 'left'},
			{field: 'spec', title: '规格', width: '80px', align: 'left'},
			{field: 'unit', title: '单位', width: '80px', align: 'left'},
			{field: 'pricingType', title: '计价方式', width: '80px', align: 'left'},
			{field: 'categoryCode', title: '类别编码', width: '80px', align: 'right'},
			{field: 'categoryName', title: '类别名称', width: '80px', align: 'left'},
			{field: 'createTime', title: '日期时间', width: '150px', align: 'left'},
            {field: 'outNum', title: '出库数量', width: '100px', align: 'right',
				formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'inNum', title: '入库数量', width: '100px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'formType', title: '出入库类型', width: '80px', align: 'left'},
            {field: 'costPrice', title: '进价', width: '100px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'costAmount', title: '进价金额', width: '100px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'salePrice', title: '售价', width: '100px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'saleAmount', title: '售价金额', width: '100px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field: 'supplierName', title: '供应商名称', width: '130px', align: 'left'}
        ]],
        onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
			updateFooter();
		}
        
    });
   // queryForm();
}

//合计
function updateFooter(){
    var fields = {outNum:0,inNum:0,costPrice:0,salePrice:0,saleAmount:0,isGift:0};
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}
//查询入库单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#goodsOutInDetail").datagrid("options").method = "post";
	$("#goodsOutInDetail").datagrid('options').url = contextPath + '/goods/goodsDetail/getGoodsOutInDetailList';
	$("#goodsOutInDetail").datagrid('load', fromObjStr);
}

/**
 * 导出
 */
function exportExcel(){
	var length = $("#goodsOutInDetail").datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
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
	$("#queryForm").attr("action",contextPath+"/goods/goodsDetail/exportList?"+fromObjStr);
	$("#queryForm").submit();
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

//选择供应商
function selectSupplier(){
  new publicSupplierService(function(data){
      $("#supplierId").val(data.id);
      $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
      $("#deliverTime").val(new Date(new Date().getTime() + 24*60*60*1000*data.diliveCycle).format('yyyy-MM-dd'));
  });
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
	 $("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	 $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	 $('#formType').combobox('setText','全部');
	 $('#formType').combobox('setValue','');
	 $('#pricingType').combobox('setText','全部');
	 $('#pricingType').combobox('setValue','');
};