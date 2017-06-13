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
	dg = $("#goodsOutInDetail").datagrid({
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize:50,
		height:'100%',
		width:'100%',
        columns:[[
			{field:'branchCode',title:'店铺编号',width:'56',align:'left',
				formatter : function(value, row,index) {
                    var str = value;
                    if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
                    return str;
                }	
			},
            {field:'branchName',title:'店铺名称',width:'150',align:'left'},
            {field:'formNo',title: '单号', width: '160', align: 'left',
            	formatter:function(value,row,index){
            		var hrefStr='';
            		if(row.formType=="库存调整"){
            			hrefStr='parent.addTab("详情","'+contextPath+'/stock/adjust/checkSuccess?report=close&id='+row.formId+'")';
            			return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
                	}else if(row.formType=="采购收货"){
                		hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/receiptEdit?report=close&formId='+row.formId+'")';
                		return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
                	}else if(row.formType=="采购退货"){
                		hrefStr='parent.addTab("详情","'+contextPath+'/form/purchase/returnEdit?report=close&formId='+row.formId+'")'
                		return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
                	}else if(row.formType=="配送入库"){
                		hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.formId+'")';
                		return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
                	}else if(row.formType=="配送出库"){
						hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.formId+'")';  
						return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
					}else if(row.formType=="组合拆分"){
						return value
					}else if(row.formType=="销售"){
						return value
					}else if(row.formType=="礼品兑换"){
						return value
					}else if(row.formType=="领用"){
						return value
					}else if(row.formType=="报损"){
						return value
					}else if(row.formType=="盘点"){
						return value
					}else if(row.formType=="直送收货"){
						return value
					}else{
						return value
					}
               }
            },
            {field:'skuCode',title: '货号', width: '55', align: 'left'},
			{field: 'skuName', title: '商品名称', width: '185', align: 'left'},
            {field:'barCode',title: '条码', width: '100', align: 'left'},
			{field: 'formType', title: '出入库类型', width: '80', align: 'left'},
			{field: 'outNum', title: '出库数量', width: '80', align: 'right',
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
			{field: 'inNum', title: '入库数量', width: '80', align: 'right',
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
			{field: 'price', title: '单价', width: '60', align: 'right',
				formatter:function(value,row,index){
				    if(value){
				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
				    }
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
			{field: 'priceAmount', title: '单据金额', width: '80', align: 'right',
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
			{field: 'salePrice', title: '售价', width: '60', align: 'right',
				formatter:function(value,row,index){
				    if(value){
				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
				    }
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
			{field: 'saleAmount', title: '售价金额', width: '80', align: 'right',
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
			{field: 'costPrice', title: '成本价', width: '60', align: 'right',
				formatter:function(value,row,index){
				    if(value){
				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
				    }
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
			{field: 'costAmount', title: '成本金额', width: '80', align: 'right',
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
			{field: 'spec', title: '规格', width: '45', align: 'left'},
			{field: 'unit', title: '单位', width: '45', align: 'left'},
			{field: 'pricingType', title: '计价方式', width: '56', align: 'left'},
			{field: 'createTime', title: '日期时间', width: '135', align: 'left'},
			{field: 'categoryCode', title: '类别编码', width: '56', align: 'left'},
			{field: 'categoryName', title: '类别名称', width: '65', align: 'left'},
            {field: 'supplierName', title: '供应商名称', width: '185', align: 'left'},
            {field: 'ticketNo', title: '小票号', width: 160, align: 'left'}
        ]],
        onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
        
    });
    var param = {
        wholesalePrice:["wholesalePrice"],
        purchasePrice:["purchasePrice","price","priceAmount"],
        distributionPrice:["distributionPrice"],
        costPrice:["costPrice","costAmount"],
        vipPrice:["vipPrice"],
        salePrice:["salePrice","saleAmount"],
    }
	priceGrantUtil.grantPrice("goodsOutInDetail",param);

   // queryForm();
}
//查询入库单
function queryForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var fromObjStr = $('#queryForm').serializeObject();
	$("#goodsOutInDetail").datagrid("options").method = "post";
	$("#goodsOutInDetail").datagrid('options').url = contextPath + '/goods/goodsDetail/getGoodsOutInDetailList';
	$("#goodsOutInDetail").datagrid('load', fromObjStr);
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#goodsOutInDetail').datagrid('getData').total;
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
	var length = $("#goodsOutInDetail").datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("没有数据");
		return;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	
	$("#queryForm").form({
		success : function(data){
			if(data==null){
				$_jxc.alert("导出数据成功！");
			}else{
				$_jxc.alert(JSON.parse(data).message);
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
//		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//选择供应商
function selectSupplier(){
  new publicSupplierService(function(data){
//      $("#supplierId").val(data.id);
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