/**
 * Created by zhanghuan on 2016/8/30.
 * 配送-出库单
 */
$(function(){
	//开始和结束时间
	toChangeDatetime(0);
    initDatagridRequireOrders();
    sourceBranchId = $("#sourceBranchId").val();
});
var sourceBranchId;
var gridHandel = new GridClass();
//初始化表格
function initDatagridRequireOrders(){
	var updatePermission = $("#updatePermission").html().trim();
    $("#deliverFormList").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //url:contextPath+'/form/purchase/listData',
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
			{field:'check',checkbox:true},
            {field:'formNo',title:'单据编号',width:'140px',align:'left',formatter:function(value,row,index){
            	if(updatePermission){
            		return "<a style='text-decoration: underline;' href='"+ contextPath +"/form/deliverForm/deliverEdit?deliverFormId="+ row.deliverFormId +"&formType=DO'>" + value + "</a>";
            	}else{
            		return value;
            	}
            }},
            {field:'status',title: '审核状态', width: '100px', align: 'left'},
			{field: 'dealStatusDO', title: '单据状态', width: '100px', align: 'left'},
			{field: 'sourceBranchName', title: '发货机构', width: '200px', align: 'left'},
			{field: 'targetBranchName', title: '收货机构', width: '200px', align: 'left'},
			{field: 'amount', title: '单据金额', width: '80px', align: 'right',
				formatter:function(value,row,index){
                    if(row.isFooter){
                        return "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                    }
                    return "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                }
			},
            {field: 'createUserName', title: '制单人员', width: '130px', align: 'left'},
            {field: 'createTime', title: '制单日期', width: '120px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			},
            {field: 'validUserName', title: '审核人员', width: '130px', align: 'left'},
            {field: 'remark', title: '备注', width: '200px', align: 'left'},
            {field: 'updateUserName', title: '操作人员', width: '130px', align: 'left'},
            {field: 'updateTime', title: '操作日期', width: '120px', align: 'center',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd');
					}
					return "";
				}
			}
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });
    queryForm();
}

//新增出库单
function addDeliverForm(){
	location.href = contextPath + "/form/deliverForm/addDeliverForm?deliverType=DO";
}

//查询要货单
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	$("#deliverFormList").datagrid("options").method = "post";
	$("#deliverFormList").datagrid('options').url = contextPath + '/form/deliverForm/getDeliverForms';
	$("#deliverFormList").datagrid('load', fromObjStr);
}

//删除
function delDeliverForm(){
	var dg = $("#deliverFormList");
	debugger;
	var row = dg.datagrid("getChecked");
	var ids = [];
	for(var i=0; i<row.length; i++){
		ids.push(row[i].deliverFormId);
	}
	if(rowIsNull(row)){
		return null;
	}
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/deliverForm/deleteDeliverForm",
		    	type:"POST",
		    	contentType:"application/json",
		    	data:JSON.stringify(ids),
		    	success:function(result){
		    		if(result['code'] == 0){
		    			successTip("删除成功");
		    		}else{
		    			successTip(result['message']);
		    		}
		    		dg.datagrid('reload');
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

/**
 * 发货机构
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#sourceBranchId").val(data.branchesId);
		$("#sourceBranchName").val(data.branchName);
	},'',sourceBranchId);
}

/**
 * 制单人
 */
function selectOperator(){
	new publicOperatorService(function(data){
		$("#operateUserId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}

//打印
function printDesign(){
     var dg = $("#gridRequireOrders");
     var row = dg.datagrid("getSelected");
     if(rowIsNull(row)){
           return null;
     }
     //弹出打印页面
     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};
