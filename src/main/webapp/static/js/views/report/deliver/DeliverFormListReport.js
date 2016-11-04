/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单
 */
$(function(){
	//开始和结束时间
	toChangeDatetime(10);
	initDatagridRequireOrders();
	branchId = $("#branchId").val();
	brancheType = $("#brancheType").val();
});

var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
	gridHandel.setGridName("deliverFormList");
    $("#deliverFormList").datagrid({
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
					if(row.isFooter){
	                    str ='<div class="ub ub-pc ufw-b">合计</div> '
	                    return str;
	                }
					var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.deliverFormDetailId+'")';
					return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
					//return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/deliverForm/deliverEdit?deliverFormId="+ row.deliverFormDetailId +"&formSources=1'>" + value + "</a>";
				}
			},
            {field: 'sourceBranchCode', title: '发货机构编码', width: '56px', align: 'left'},
            {field: 'sourceBranchName', title: '发货机构', width: '86px', align: 'left'},
            {field: 'targetBranchCode', title: '要货机构编码', width: '56px', align: 'left'},
            {field: 'targetBranchName', title: '要货机构', width: '86px', align: 'left'},
            {field:'referenceNo',title:'引用单号',width:'130px',align:'left',
            	formatter:function(value,row,index){
            		if (value == null || value == '') {
            			return '';
            		}
            		var hrefStr='parent.addTab("详情","'+contextPath+'/form/deliverForm/deliverEdit?report=close&deliverFormId='+row.referenceId+'")';
					return '<a style="text-decoration: underline;" href="#" onclick='+hrefStr+'>' + value + '</a>';
            		//return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/deliverForm/deliverEdit?deliverFormId="+ row.referenceId +"&formSources=1'>" + value + "</a>";
            	}
            },
            {field: 'skuCode', title: '货号', width: '55px', align: 'left'},
            {field: 'skuName', title: '商品名称', width: '185px', align: 'left'},
            {field: 'barCode', title: '条码', width: '100px', align: 'left'},
            {field: 'price', title: '单价', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'inputTax', title: '税率', width: '60px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
                        return '';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
            },
            {field: 'largeNum', title: '箱数', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(row.formType == 'DO'){
                    	return '<b style="color: red;">'+parseFloat(value||0).toFixed(2)+'</b>'
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
           },
            {field: 'num', title: '数量', width: '80px', align: 'right',
            	formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(row.formType == 'DO'){
                    	return '<b style="color: red;">'+parseFloat(value||0).toFixed(2)+'</b>'
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               }
            },
            {field: 'amount', title: '金额', width: '80px', align: 'right',
            	formatter:function(value,row,index){
            		if(row.isFooter){
            			return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
            		}
            		if(row.formType == 'DO'){
            			return '<b style="color: red;">'+parseFloat(value||0).toFixed(2)+'</b>'
                    }
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
			updateFooter();
		}
    });
}


//查询要货单
function queryForm(){
	var startDate = $("#txtStartDate").val();
	var endDate = $("#txtEndDate").val();
	var branchName = $("#branchName").val();
	if(!(startDate && endDate)){
		$.messager.alert('提示', '日期不能为空');
		return ;
	}
	var fromObjStr = $('#queryForm').serializeObject();
	$("#deliverFormList").datagrid("options").method = "post";
	$("#deliverFormList").datagrid('options').url = contextPath + '/form/deliverReport/getDeliverFormList';
	$("#deliverFormList").datagrid('load', fromObjStr);
}


//合计
function updateFooter(){
    var fields = {largeNum:0,num:0,amount:0, };
    var argWhere = {name:'isGift',value:0}
    sum(fields);
}

function sum(fields) {
	var fromObjStr = $('#queryForm').serializeObject();
	$.ajax({
    	url : contextPath+"/form/deliverReport/sum",
    	type : "POST",
    	data : fromObjStr,
    	success:function(result){
    		if(result['code'] == 0){
    			fields.largeNum = result['sumLargeNum'];
    			fields.num = result['sumNum'];
    			fields.amount = result['sumAmount'];
    			$("#deliverFormList").datagrid('reloadFooter',[$.extend({"isFooter":true,},fields)]);
    		}else{
    			successTip(result['message']);
    		}
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}


/**
 * 收货机构
 */
/*function selectTargetBranches(){
	if(branchType != '0' && branchType != '1'){
		return;
	}
	new publicAgencyService(function(data){
        $("#targetBranchId").val(data.branchesId);
        $("#targetBranchName").val(data.branchName);
	},'DA','');
}

*/
/**
 * 发货机构
 *//*
function selectSourceBranches(){
	new publicAgencyService(function(data){
        if($("#sourceBranchId").val()!=data.branchesId){
            $("#sourceBranchId").val(data.branchesId);
            $("#sourceBranchName").val(data.branchName);
            gridHandel.setLoadData([$.extend({},gridDefault)]);
        }
	},'DA',$("#targetBranchId").val());
}*/
/**
 * 查询机构
 */
var branchId;
var brancheType;
function selectBranches(){
	/*if(brancheType != '0' && brancheType != '1'){
		return;
	}*/
	new publicAgencyService(function(data){
        if($("#branchId").val()!=data.branchesId){
            $("#branchId").val(data.branchesId);
            $("#branchName").val(data.branchName);
            //gridHandel.setLoadData([$.extend({},gridDefault)]);
        }
	},'',branchId);
}
/**
 * 重置
 */
var resetForm = function() {
	location.href=contextPath+"/form/deliverReport/viewDeliverList";
};

/**
 * 导出
 */
function exportData(){
	var length = $('#deliverFormList').datagrid('getData').rows.length;
	if(length == 0){
		successTip("无数据可导");
		return;
	}
	if(length>10000){
		successTip("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	
	var fromObjStr = $('#queryForm').serializeObject();
	$("#queryForm").form({
		success : function(result){
			//successTip(result);
		}
	});
	$("#queryForm").attr("action",contextPath+'/form/deliverReport/exportDeliverFormList')
	$("#queryForm").submit();
}

//商品分类
function getGoodsType(){
	new publicCategoryService(function(data){
		$("#goodsCategoryId").val(data.goodsCategoryId);
		$("#categoryCode").val(data.categoryCode);
		$("#categoryName").val(data.categoryName);
	});
}

