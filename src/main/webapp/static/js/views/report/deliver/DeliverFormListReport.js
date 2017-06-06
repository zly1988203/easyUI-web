/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	toChangeDatetime(10);
	initDatagridRequireOrders();
	branchId = $("#branchId").val();
});

var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
	gridHandel.setGridName("deliverFormList");
	dg=$("#deliverFormList").datagrid({
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
		height:'100%',
		width:'100%',
        columns:[[
			{field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'130px',align:'left',
				formatter:function(value,row,index){
					if(!value){
	                    return '<div class="ub ub-pc ufw-b">合计</div>';
	                }
					var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.deliverFormDetailId+'")';
					return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
				}
			},
            {field: 'sourceBranchCode', title: '发货机构编码', width: '80px', align: 'left'},
            {field: 'sourceBranchName', title: '发货机构', width: '86px', align: 'left'},
            {field: 'targetBranchCode', title: '要货机构编码', width: '80px', align: 'left'},
            {field: 'targetBranchName', title: '要货机构', width: '86px', align: 'left'},
			{field: 'salesman', title: '业务人员', width: '130px', align: 'left'},
            {field:'referenceNo',title:'引用单号',width:'135px',align:'left',
            	formatter:function(value,row,index){
            		if (value == null || value == '') {
            			return '';
            		}
            		var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.referenceId+'")';
					return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            	}
            },
            {field: 'skuCode', title: '货号', width: '55px', align: 'left'},
            {field: 'skuName', title: '商品名称', width: '185px', align: 'left'},
            {field: 'barCode', title: '条码', width: '100px', align: 'left'},
            {field: 'price', title: '单价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if (value == null) {
            			return '';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'inputTax', title: '税率', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if (value == null) {
            			return '';
            		}
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'largeNum', title: '箱数', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
           },
            {field: 'num', title: '数量', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               }
            },
            {field: 'amount', title: '金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            	}
            },
            {field: 'categoryCode', title: '类别编号', width: '56px', align: 'left'},
            {field: 'categoryName', title: '类别名称', width: '65px', align: 'left'},
            {field: 'spec', title: '规格', width: '45px', align: 'left'},
            {field: 'unit', title: '单位', width: '45px', align: 'left'},
            {field: 'userName', title: '制单人', width: '80px', align: 'left'},
			{field: 'remark', title: '备注', width: '100px', align: 'left'}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
    if(hasDistributionPrice==false){
        priceGrantUtil.grantDistributionPrice(gridName,["price","amount"])
    }
}


//查询要货单
function queryForm(){
	$("#startCount").attr("value",null);
	$("#endCount").attr("value",null);
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}
	var fromObjStr = $('#queryForm').serializeObject();
    // 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.categoryName = fromObjStr.categoryName.substring(fromObjStr.categoryName.lastIndexOf(']')+1)
	$("#deliverFormList").datagrid("options").method = "post";
	$("#deliverFormList").datagrid('options').url = contextPath + '/form/deliverReport/getDeliverFormList';
	$("#deliverFormList").datagrid('load', fromObjStr);
}

/**
 * 查询机构
 */
var branchId;
function selectBranches(){
	new publicAgencyService(function(data){
//        $("#branchId").val(data.branchesId);
        //$("#branchName").val(data.branchName);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'',branchId);
}
/**
 * 重置
 */
var resetForm = function() {
	location.href=contextPath+"/form/deliverReport/viewDeliverList";
};

//商品分类
function getGoodsType(){
	new publicCategoryService(function(data){
//		$("#goodsCategoryId").val(data.goodsCategoryId);
//		$("#categoryCode").val(data.categoryCode);
		//$("#categoryName").val(data.categoryName);
        $("#categoryName").val("["+data.categoryCode+"]"+data.categoryName);
	});
}

var dg;
/**
 * 导出
 */
function exportData(){
	var length = $('#deliverFormList').datagrid('getData').rows.length;
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
    // 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.categoryName = fromObjStr.categoryName.substring(fromObjStr.categoryName.lastIndexOf(']')+1)
	$("#queryForm").form({
		success : function(result){
			
		}
	});
	$('#branchName').val(fromObjStr.branchName);
	$('#categoryName').val(fromObjStr.categoryName);
	
	$("#queryForm").attr("action",contextPath+'/form/deliverReport/exportDeliverFormList')
	$("#queryForm").submit();
}

