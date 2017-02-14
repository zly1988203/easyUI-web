/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	toChangeDate(10);
	branchId = $("#branchId").val();
	brancheType = $("#brancheType").val();
	//初始化默认条件
	initDatagridRequireOrders();
	//选择报表类型
	changeType();
	//切换radio 禁启用
	checktype();
	targetBranchId = $("#targetBranchId").val();
	sourceBranchId = $("#sourceBranchId").val();
});

var targetBranchId;
var sourceBranchId;

var flushFlg = false;
var temp = true;
function changeType(){
	$(".radioItem").change(function(){
		checktype()
		var val = $(this).val();
		console.log(val);
		if (val==0) {
			flushFlg=true;
			temp = true;
			$("#sourceBranchId").val('');
			initDatagridRequireOrders();
		} else if (val==1) {
			$("#sourceBranchId").val(sourceBranchId);
			temp = false;
			initDatagridByGoods();
		}
		$("#marketWater").datagrid('loadData', { total: 0, rows: [] });
    	$('#marketWater').datagrid({showFooter:false});
	});
}

//切换radio 4个状态的禁用和启用 以及值的清空
function checktype(){
 var len=$('.radioItem').length;
	for(var i=0;i<len;i++){
		var check=$('.radioItem').eq(i).prop('checked');
		var value=$('.radioItem').eq(i).val();
		cleardata();
		if(check==true&&value=='0'){
			$('#sourceBranchName').attr("readonly","readonly");
			$('#sourceBranchName').addClass('uinp-no-more');
//			$('#sourceBranchName').removeAttr('onclick');
			$('#sourceBranchName').val("");
			$('.uinp-sourceName').removeAttr('onclick');
			$('#formNo').removeClass('uinp-no-more');
			$('#formNo').removeAttr("readonly");
		}
		else if(check==true&&value=='1'){
			$('#sourceBranchName').removeClass('uinp-no-more');
//			$('#sourceBranchName').attr('onclick',"searchBranch(1)");
			$('.uinp-sourceName').attr('onclick',"searchBranch(1)");
			$('#formNo').addClass('uinp-no-more');
			$('#formNo').val("");
			$('#formNo').attr("readonly","readonly");
			$("#sourceBranchName").removeAttr("readonly");
		}	
   }	
}
//清空所有数据值
function cleardata(){
	$('#targetBranchName').val("");
	$('#skuName').val("");
	$('#sourceBranchName').val("");
	$('#formNo').val("");
	$('#categoryCode').val("");
	$('#goodsCategoryId').val("");
	$('#skuCode').val("");
}

var gridHandel = new GridClass();
// 明细表
var dg;
function initDatagridRequireOrders(){
	gridHandel.setGridName("marketWater");
	dg= $("#marketWater").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
        pageSize : 50,
        pageList : [20, 50, 100],
		height:'100%',
		width:'100%',
        columns:[[
			//{field:'check',checkbox:true},
			 {field: 'inFormNo', title: '要货单号', width: '150px', align: 'left',
				 formatter:function(value,row,index){
		                if(!value || value == '合计'){
		                    return '<div class="ub ub-pc ufw-b">合计</div> '
		                }
						var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.inFormId+'")';
						return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
		            } 
            },
            {field: 'targetBranchName',title:'要货机构',width:'85px',align:'left'},
            {field: 'sourceBranchName',title:'发货机构',width:'85px',align:'left'},
            {field: 'outFormNo', title: '出库单号', width: '150px', align: 'left',
            	formatter:function(value,row,index){
		   			if(row.outFormId){
		   				var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.outFormId+'")';
						return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
		   			}
	           }   
            },
			{field: 'DIFormNo', title: '入库单号', width: '150px', align: 'left',
				formatter:function(value,row,index){
					if(row.DIFormId){
						var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.DIFormId+'")';
						return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
					}
				}
			},
            {field: 'skuCode', title: '货号', width: '65px', align: 'left'},
            {field: 'skuName', title: '商品名称', width: '150px', align: 'left'},
            {field: 'barCode', title: '条码', width: '150px', align: 'left'},
            {field: 'defectNum', title: '缺货数', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.defectNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field: 'outRate', title: '缺货率', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outRate||row.outRate==0){
						return '<b>'+(parseFloat(value||0)*100).toFixed(2)+'%</b>';
					}
					return '';
				}
			
            },
            {field: 'inApplyNum', title: '要货数量', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.inApplyNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'inAmount', title: '要货金额', width: '85px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.inAmount){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'outDealNum', title: '发货数量', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outDealNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'outAmount', title: '发货金额', width: '85px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.outAmount){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
			{field: 'inReceiveNum', title: '收货数量', width: '85px', align: 'right',
				formatter : function(value, row, index) {
					if(row.inReceiveNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field: 'DIAmount', title: '收货金额', width: '85px', align: 'right',
				formatter:function(value,row,index){
					if(row.DIAmount){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'spec', title: '规格', width: '65px', align:'center'},
			{field: 'unit', title: '单位', width: '65px', align:'center'},
			{field: 'categoryName', title: '商品类别', width: '85px', align:'center'}
            ]],
            onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}

// 汇总表
function initDatagridByGoods(){
	gridHandel.setGridName("marketWater");
    $("#marketWater").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        url:'',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
       // fit:true,            //占满
        showFooter:true,
        pageSize : 50,
        pageList : [20, 50, 100],
		height:'100%',
		width:'100%',
        columns:[[
			//{field:'check',checkbox:true},
			{field: 'skuCode', title: '货号', width: '65px', align: 'left',
				formatter:function(value,row,index){
					if(!value || value == '合计'){
	                    return '<div class="ub ub-pc ufw-b">合计</div> '
					}
					return row.skuCode;
				}
				 
			},
            {field: 'skuName', title: '商品名称', width: '150px', align: 'left'},
            {field: 'barCode', title: '条码', width: '150px', align: 'left'},
            {field: 'spec', title: '规格', width: '65px', align:'center'},
            {field: 'unit', title: '单位', width: '65px', align:'center'},
            {field: 'categoryName', title: '商品类别', width: '85px', align:'center'},
            {field: 'defectNum', title: '缺货数', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.defectNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
            {field: 'outRate', title: '缺货率', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.outRate||row.outRate==0){
						return '<b>'+(parseFloat(value||0)*100).toFixed(2)+'%</b>';
					}
					return '';
				}
			
            },
            {field: 'inApplyNum', title: '要货数量', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.inApplyNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'inAmount', title: '要货金额', width: '85px', align: 'right',
            	formatter : function(value, row, index) {
					if(row.inAmount){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
            },
            {field: 'outDealNum', title: '发货数量', width: '85px', align: 'right',
				formatter : function(value, row, index) {
					if(row.outDealNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field: 'outAmount', title: '发货金额', width: '85px', align: 'right',
				formatter:function(value,row,index){
					if(row.outAmount){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			},
			{field: 'inReceiveNum', title: '收货数量', width: '85px', align: 'right',
				formatter : function(value, row, index) {
					if(row.inReceiveNum){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				},
			},
			{field: 'DIAmount', title: '收货金额', width: '85px', align: 'right',
				formatter:function(value,row,index){
					if(row.DIAmount){
						return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
					}
					return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
				}
			}
            ]],
            onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
}

//查询
function queryForm(){
	$("#startCount").val('');
	$("#endCount").val('');
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}	
	if (temp) {
		$("#sourceBranchId").val('');
	}
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.targetBranchName = fromObjStr.targetBranchName.substring(fromObjStr.targetBranchName.lastIndexOf(']')+1)
    fromObjStr.sourceBranchName = fromObjStr.sourceBranchName.substring(fromObjStr.sourceBranchName.lastIndexOf(']')+1)
    fromObjStr.categoryName = fromObjStr.categoryName.substring(fromObjStr.categoryName.lastIndexOf(']')+1)
	$("#marketWater").datagrid("options").queryParams = fromObjStr;
	$('#marketWater').datagrid({showFooter:true});
	$("#marketWater").datagrid("options").method = "post";
	$("#marketWater").datagrid('options').url = contextPath + '/report/outOfStock/reportListPage';
	$("#marketWater").datagrid('load');
	
}
/**
 * 店铺名称
 */
function searchBranch(type){
	new publicAgencyService(function(data){
		if(type==0){
//			$("#targetBranchId").val(data.branchesId);
			//$("#targetBranchName").val(data.branchName);
			$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
		}else{
//			$("#sourceBranchId").val(data.branchesId);
			//$("#sourceBranchName").val(data.branchName);
			$("#sourceBranchName").val("["+data.branchCode+"]"+data.branchName);
		}
	},"","");
}

//商品分类
function getGoodsType(){
	new publicCategoryService(function(data){
//		$("#goodsCategoryId").val(data.goodsCategoryId);
//		$("#categoryCode").val(data.categoryCode);
		//$("#categoryName").val(data.categoryName);
		$("#categoryName").val("["+data.categoryCode+"]"+data.categoryName);

	});
}

/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};

/**
 * 导出
 */
function exportData(){
	var length = $('#marketWater').datagrid('getData').rows.length;
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
// 调用导出方法
function exportExcel(){
	$("#exportWin").hide();
	$("#exportWin").window("close");
	var fromObjStr = $('#queryForm').serializeObject();
    fromObjStr.targetBranchName = fromObjStr.targetBranchName.substring(fromObjStr.targetBranchName.lastIndexOf(']')+1);
    fromObjStr.sourceBranchName = fromObjStr.sourceBranchName.substring(fromObjStr.sourceBranchName.lastIndexOf(']')+1);
    fromObjStr.categoryName = fromObjStr.categoryName.substring(fromObjStr.categoryName.lastIndexOf(']')+1);
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$('#targetBranchName').val(fromObjStr.targetBranchName);
	$('#sourceBranchName').val(fromObjStr.sourceBranchName);
	$('#categoryName').val(fromObjStr.categoryName);

	$("#queryForm").attr("action",contextPath+"/report/outOfStock/exportList");
	$("#queryForm").submit(); 

}

