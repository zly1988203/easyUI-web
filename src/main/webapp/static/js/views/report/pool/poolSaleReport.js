/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
	changeType();
    initDatagridGoodsTotal();
 // 开始和结束时间
	if(!$("#txtStartDate").val()){
		// 开始和结束时间
		$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
		$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
	}else{
		flushFlg = true;
		$('input:radio[name=searchType]')[0].checked = true;
		$('input:radio[name=searchType]')[0].click();
	}
    //单据状态切换
   // changeStatus();
});
//重置条件
function resetCondition(){
	 $("#branchName").val("");
	 $("#branchId").val("");
	 $("#supplierId").val("");
	 $("#supplierName").val("");
	 $("#skuCode").val('');
	 $("#skuId").val("");
	 $("#skuName").val("");
}
var flushFlg = false;
function changeType(){
	$(".radioItem").on("click",function(){
		flushFlg = true;
		resetCondition();
    	var a = $(this).val();
    	$("#poolSaleReport").datagrid("options").url = "";
    	if (a=="goodsTotal") {
    		initDatagridGoodsTotal();
		}else if (a=="goodsDetail") {
			initDatagridGoodsDetail();
		} 
    	$("#poolSaleReport").datagrid('loadData', { total: 0, rows: [] });
    });
}

//单据状态切换
/*function changeStatus(){
	$(".radioItem").change(function(){
    	query();
    });
}*/

//初始化默认条件
function initConditionParams(){
    
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));

    
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridGoodsTotal(){
	gridHandel.setGridName("poolSaleReport");
	dg = $("#poolSaleReport").datagrid({
        //title:'普通表单-用键盘操作',
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
            {field:'branchName',title:'机构',width:'140px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
                    return str;
                }},
            {field:'branchCode',title:'机构编码',width:'100px',align:'left'},
            {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
            {field:'skuCode',title:'货号',width:'80px',align:'left'},
            {field:'skuName',title:'商品名称',width:100,align:'left'},
            {field:'spec',title:'规格',width:'130px',align:'left'},
            {field:'saleAmount',title:'销售金额',width:'150px',align:'right',
            	formatter:function(value,row,index){
				    if(value || value ==0){
				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
				    }
				},
            	editor:{
                    type:'numberbox',
                    options:{
                    	disabled:true,
                        min:0,
                        precision:1
                    }
                }},
            {field:'supplierRate',title:'联营扣率',width:'130px',align:'right',
                	formatter:function(value,row,index){
    				    if(value || value ==0){
    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
    				    }
    				},
                	editor:{
                        type:'numberbox',
                        options:{
                        	disabled:true,
                            min:0,
                            precision:1
                        }
                    }},
            {field:'rateAmount',title:'扣率金额',width:'200px',align:'right',
                    	formatter:function(value,row,index){
        				    if(value || value ==0){
        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
        				    }
        				},
                    	editor:{
                            type:'numberbox',
                            options:{
                            	disabled:true,
                                min:0,
                                precision:1
                            }
                        }}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
}
//初始化表格
function initDatagridGoodsDetail(){
	gridHandel.setGridName("poolSaleReport");
	dg = $("#poolSaleReport").datagrid({
		//title:'普通表单-用键盘操作',
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
		          {field:'branchName',title:'机构',width:'140px',align:'left',
		        	  formatter : function(value, row,index) {
		        		  var str = value;
		        		  if(!value){
		        			  return '<div class="ub ub-pc ufw-b">合计</div> '
		        		  }
		        		  return str;
		        	  }},
		        	  {field:'branchCode',title:'机构编码',width:'100px',align:'left'},
		        	  {field:'supplierCode',title:'供应商编号',width:'140px',align:'left'},
		        	  {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
		        	  {field:'orderNo',title:'订单编号',width:'180px',align:'left'},
		        	  {field:'orderTime',title:'订单时间',width:'140px',align:'left'},
		        	  {field:'skuCode',title:'货号',width:'80px',align:'left'},
		        	  {field:'skuName',title:'商品名称',width:100,align:'left'},
		        	  {field:'spec',title:'规格',width:'130px',align:'left'},
		        	  {field:'unit',title:'单位',width:'130px',align:'left'},
		        	  {field:'businessType',title:'业务类型',width:'130px',align:'center'},
		        	  {field:'saleNum',title:'数量',width:'130px',align:'right',
		              	formatter:function(value,row,index){
						    if(value || value ==0){
						    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
						    }
						},
		            	editor:{
		                    type:'numberbox',
		                    options:{
		                    	disabled:true,
		                        min:0,
		                        precision:1
		                    }
		                }},
		        	  {field:'salePrice',title:'销售价',width:'130px',align:'right',
		                	formatter:function(value,row,index){
		    				    if(value || value ==0){
		    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
		    				    }
		    				},
		                	editor:{
		                        type:'numberbox',
		                        options:{
		                        	disabled:true,
		                            min:0,
		                            precision:1
		                        }
		                    }},
		        	  {field:'originalPrice',title:'原价',width:'130px',align:'right',
		                    	formatter:function(value,row,index){
		        				    if(value || value ==0){
		        				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
		        				    }
		        				},
		                    	editor:{
		                            type:'numberbox',
		                            options:{
		                            	disabled:true,
		                                min:0,
		                                precision:1
		                            }
		                        }},
		        	  {field:'saleAmount',title:'销售金额',width:'150px',align:'right',
		                        	formatter:function(value,row,index){
		            				    if(value || value ==0){
		            				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
		            				    }
		            				},
		                        	editor:{
		                                type:'numberbox',
		                                options:{
		                                	disabled:true,
		                                    min:0,
		                                    precision:1
		                                }
		                            }},
		        	  {field:'supplierRate',title:'联营扣率',width:'130px',align:'right',
		                            	formatter:function(value,row,index){
		                				    if(value || value ==0){
		                				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
		                				    }
		                				},
		                            	editor:{
		                                    type:'numberbox',
		                                    options:{
		                                    	disabled:true,
		                                        min:0,
		                                        precision:1
		                                    }
		                                }},
		        	  {field:'rateAmount',title:'扣率金额',width:'200px',align:'right',
		                                	formatter:function(value,row,index){
		                    				    if(value || value ==0){
		                    				    	return '<b>'+parseFloat(value).toFixed(2)+'</b>';
		                    				    }
		                    				},
		                                	editor:{
		                                        type:'numberbox',
		                                        options:{
		                                        	disabled:true,
		                                            min:0,
		                                            precision:1
		                                        }
		                                    }}
		        	  ]],
		        	  onLoadSuccess : function() {
		        		  gridHandel.setDatagridHeader("center");
		        	  }
	});
}
function queryGoodsTotalForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	$("#poolSaleReport").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#poolSaleReport").datagrid("options").method = "post";
	$("#poolSaleReport").datagrid("options").url = contextPath+'/report/poolSale/getGoodsPoolSaleList';
	$("#poolSaleReport").datagrid("load");
}
function queryGoodsDetailForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	$("#poolSaleReport").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#poolSaleReport").datagrid("options").method = "post";
	$("#poolSaleReport").datagrid("options").url = contextPath+'/report/poolSale/getGoodsPoolSaleDetailList';
	$("#poolSaleReport").datagrid("load");
}

function queryForm(){
	var checkType = $("input[name='searchType']:checked").val();
	if (checkType=="goodsTotal") {
		queryGoodsTotalForm();
	}else if (checkType=="goodsDetail") {
		queryGoodsDetailForm();
	} 
	
}

function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
	});
}

//选择商品
function selectGoods(searchKey){
	if(!$("#branchId").val()){
		 messager("请选择机构");
	     return;
	}
    var param = {
        type:'',
        key:searchKey,
        isRadio:1,
        sourceBranchId:"",
        targetBranchId:"",
        branchId:$("#branchId").val(),
        supplierId:'',
        flag:'0',
    }
    new publicGoodsServiceTem(param,function(data){
        if(searchKey){
            $("#"+gridHandel.getGridName()).datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#"+gridHandel.getGridName()).datagrid("acceptChanges");
        }
        var setdata=setTion(data);
        //selectStockAndPrice(branchId,setdata);
        gridHandel.setLoadFocus();
      
    });
}

//库存调整一开始选择
function setTion(data){
	$("#skuName").val(data[0].skuName);
	$("#skuId").val(data[0].id);
}

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#poolSaleReport').datagrid('getData').total;
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
	var length = $("#poolSaleReport").datagrid('getData').total;
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
	var checkType = $("input[name='searchType']:checked").val();
	if (checkType=="goodsTotal") {
		$("#queryForm").attr("action",contextPath+"/report/poolSale/exportList?"+fromObjStr);
	}else if (checkType=="goodsDetail") {
		$("#queryForm").attr("action",contextPath+"/report/poolSale/exportDetailList?"+fromObjStr);
	} 
	
	$("#queryForm").submit();
}
/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};


