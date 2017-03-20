/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    //初始化默认条件
    initConditionParams();
    initDatagridGoodsUnsale();
});

//初始化默认条件
function initConditionParams(){
	$("#txtStartDate").val(dateUtil.getPreMonthDate("prev",1).format("yyyy-MM-dd"));
	$("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
}

var gridHandel = new GridClass();
//初始化表格
function initDatagridGoodsUnsale(){
	gridHandel.setGridName("goodsUnsale");
	dg = $("#goodsUnsale").datagrid({
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
            {field:'branchCode',title:'机构编号',width:'100px',align:'left',
            	formatter : function(value, row,index) {
                    var str = value;
                    if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
	                }
                    return str;
                }},
            {field:'branchName',title:'机构名称',width:'140px',align:'left'},
            {field:'categoryName',title:'商品类别',width:'80px',align:'left'},
            {field:'skuName',title:'商品名称',width:'140px',align:'left'},
            {field:'goodsStock',title:'库存',width:100,align:'right',
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
                        precision:1
                    }
                }},
            {field:'saleNum',title:'期间销量',width:'130px',align:'right',
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
                            precision:1
                        }
                    }},
            {field:'profitAmount',title:'期间销售毛利',width:'130px',align:'right',
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
                                precision:1
                            }
                        }},
            {field:'salePrice',title:'零售价',width:'130px',align:'right',
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
                                    precision:1
                                }
                            }},
            {field:'saleDate',title:'最近销售日期',width:'130px',align:'left'},
            {field:'purchaseDate',title:'最近采购日期',width:'130px',align:'left'},
            {field:'dcoDate',title:'最近配送日期',width:'130px',align:'left'},
            {field:'brandName',title:'品牌',width:'130px',align:'left'},
            {field:'pullTime',title:'引进日期',width:'130px',align:'left'}
        ]],
		onLoadSuccess : function() {
			gridHandel.setDatagridHeader("center");
		}
    });
}


function queryForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	$("#goodsUnsale").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#goodsUnsale").datagrid("options").method = "post";
	$("#goodsUnsale").datagrid("options").url = contextPath+'/report/goodsUnsale/getGoodsUnsaleReportList';
	$("#goodsUnsale").datagrid("load");
	
}

function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//选择商品
function selectGoods(searchKey){
	if(!$("#branchId").val()){
		 messager("请选择机构");
	     return;
	}
	console.log($("#branchId").val());
  new publicGoodsService("",function(data){
      if(searchKey){
          $("#"+gridHandel.getGridName()).datagrid("deleteRow", gridHandel.getSelectRowIndex());
          $("#"+gridHandel.getGridName()).datagrid("acceptChanges");
      }
      var setdata=setTion(data);
      //selectStockAndPrice(branchId,setdata);
      gridHandel.setLoadFocus();
    
  },searchKey,1,"","",$("#branchId").val(),'',"0");
}

//库存调整一开始选择
function setTion(data){
	$("#skuName").val(data[0].skuName);
	$("#skuId").val(data[0].id);
}

//打印
function printReport(){
	
	$("#startCount").val('');
	$("#endCount").val('');
	parent.addTabPrint("goodsUnsaleReportPrint","打印",contextPath+"/report/goodsUnsale/printReport?"+$("#queryForm").serialize());
}
var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#goodsUnsale').datagrid('getData').total;
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
	var length = $("#goodsUnsale").datagrid('getData').total;
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
	$("#queryForm").attr("action",contextPath+"/report/goodsUnsale/exportList?"+fromObjStr);
	$("#queryForm").submit();
}
/**
 * 重置
 */
function resetForm(){
	 $("#queryForm").form('clear');
};


