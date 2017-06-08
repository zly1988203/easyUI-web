/**
 * Created by zhanghuan on 2016/8/30.
 * 新增供应商预付款
 */
$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initsupAdvMonList();
    branchId = $("#branchId").val();
//    if(getUrlQueryString('message')=='0'){
//    	queryForm();
//    }
    //默认执行查询
    queryForm();
});

$(document).on('input','#remark',function(){
	var val=$(this).val();
	var str = val;
	   var str_length = 0;
	   var str_len = 0;
	      str_cut = new String();
	      str_len = str.length;
	      for(var i = 0;i<str_len;i++)
	     {
	        a = str.charAt(i);
	        str_length++;
	        if(escape(a).length > 4)
	        {
	         //中文字符的长度经编码之后大于4
	         str_length++;
	         }
	         str_cut = str_cut.concat(a);
	         if(str_length>200)
	         {
	        	 str_cut.substring(0,i)
	        	 remark.value = str_cut;
	        	 break;
	         }
	    }
	
});



var targetBranchId;
var gridHandel = new GridClass();
var datagirdID = 'supplierChargeList'
//初始化表格
function initsupAdvMonList(){
    $("#"+datagirdID).datagrid({
        method:'post',
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,         //占满
        showFooter:true,
		height:'100%',
		width:'100%',
		pageSize:50,
        columns:[[
			{field: 'check',checkbox:true},
            {field: 'formNo',title:'单据编号',width:'130px',align:'left',formatter:function(value,row,index){
            	var strHtml = '';
            	if(row.auditStatus == 1){
            		strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商费用明细\',\''+ contextPath +'/settle/supplierCharge/chargeView?id='+ row.id +'\')">' + value + '</a>';
            	}else{
            		strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商费用明细\',\''+ contextPath +'/settle/supplierCharge/chargeEdit?id='+ row.id +'\')">' + value + '</a>';
            	}
        		return strHtml;
            }},
            {field: 'auditStatus',title: '审核状态', width: '100px', align: 'center',
            	formatter:function(value,row,index){
            		return value == '1'?'已审核':'未审核';
            	}
            },
			{field: 'branchCode', title: '机构编号', width: '100px', align: 'left'},
			{field: 'branchName', title: '机构名称', width: '140px', align: 'left'},
			{field: 'supplierCode', title: '供应商编号', width: '140px', align: 'left'},
			{field: 'supplierName', title: '供应商名称', width: '140px', align: 'left'},
			{field: 'sumAmount', title: '单据金额', width: '80px', align: 'right',
				formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
			},
            {field: 'createUserName', title: '制单人', width: '80px', align: 'left'},
            {field: 'createTime', title: '制单时间', width: '120px', align: 'left',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd hh:mm');
					}
					return "";
				}
			},
			{field: 'auditUserName', title: '审核人', width: '130px', align: 'left'},
			{field: 'remark', title: '备注', width: '200px', align: 'left'}
			
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });

}

//新增新增供应商预付款
function addSupAdvMonForm(){
	toAddTab("新增供应商费用",contextPath + "/settle/supplierCharge/chargeAdd");
}

//查询新增供应商预付款
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.createUserName = fromObjStr.createUserName.substring(fromObjStr.createUserName.lastIndexOf(']')+1)
    fromObjStr.supplierName = fromObjStr.supplierName.substring(fromObjStr.supplierName.lastIndexOf(']')+1)

	$("#"+datagirdID).datagrid("options").method = "post";
	$("#"+datagirdID).datagrid('options').url = contextPath + '/settle/supplierCharge/getChargeList';
	$("#"+datagirdID).datagrid('load',fromObjStr);
}

//删除
function delSupAdvMonForm(){
	var dg = $("#"+datagirdID);
	var row = dg.datagrid("getChecked");
	if(row.length <= 0){
		$_jxc.alert('未选择要删除的单据！');
		return;
	}
	var ids = [];
	for(var i=0; i<row.length; i++){
		ids.push(row[i].id);
	}
	$_jxc.confirm('是否要删除选中数据',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/supplierCharge/deleteChargeForm",
                data: {"ids":ids}
		    },function(result){
	    		if(result['code'] == 0){
	    			$_jxc.alert("删除成功");
	    			dg.datagrid('reload');
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

/**
 * 供应商查询
 */
function selectSupplier(nameOrCode){
	var branchId=$("#branchId").val()||'';
    var param = {
    	branchId:branchId
    }
	if(nameOrCode){
		param.supplierNameOrsupplierCode = nameOrCode;
	}
	new publicSuppliersService(param,function(data){
		//返回NO时 输入动作没匹配到数据 
		if(data == 'NO'){
			//未查询到数据 设置清空
			if(!$("#supplierId").val()){
				$_jxc.clearHideInpOnEdit($('#supplierName'));
				$("#supplierName").val("");
			}
		}else{
			$("#supplierId").val(data.id);
			$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
		}
	})
}

/**
 * 供应商自动补全
 */
function supplierAutoComple(obj){
	//非回车事件和失去焦点，不做处理(失焦时event.keyCode为undefined)
	if(event.keyCode && event.keyCode != 13){
		return;
	}
	var nameOrCode = $.trim($("#supplierName").val())||'';
	//未输入值时，直接返回，无需查询
	if('' == nameOrCode){
		$_jxc.clearHideInpOnEdit(obj);
		return;
	}
	selectSupplier(nameOrCode);
}

/**
 * 操作员查询
 */
function selectOperator(nameOrCode){
	var param = {}
	if(nameOrCode){
		param.nameOrCode = nameOrCode;
	}
	new publicOperatorsService(param,function(data){
		//返回NO时 输入动作没匹配到数据 
		if(data == 'NO'){
			//未查询到数据 设置清空
			if(!$("#createUserId").val()){
				$_jxc.clearHideInpOnEdit($('#createUserName'));
				$("#createUserName").val("");
			}
		}else{
			$("#createUserId").val(data.id);
			$("#createUserName").val("["+data.userCode+"]"+data.userName);
		}
	})
}


/**
 * 操作员自动补全
 */
function operatorAutoComple(obj){
	//非回车事件和失去焦点，不做处理(失焦时event.keyCode为undefined)
	if(event.keyCode && event.keyCode != 13){
		return;
	}
	var nameOrCode = $.trim($("#createUserName").val())||'';
	//未输入值时，直接返回，无需查询
	if('' == nameOrCode){
		$_jxc.clearHideInpOnEdit(obj);
		return;
	}
	selectOperator(nameOrCode);
}


/**
 * 机构
 */
function selectBranches(nameOrCode){
	var param = {}
	if(nameOrCode){
		param.nameOrCode = nameOrCode;
	}
	new publicBranchesService(param,function(data){
		//返回NO时 输入动作没匹配到数据 
		if(data == 'NO'){
			//匹配到多数据 弹窗但未选择的情况下 设置清空
			if(!$("#branchId").val()){
				$_jxc.clearHideInpOnEdit($('#branchName'));
				$("#branchName").val("");
			}
		}else{
			$("#branchId").val(data.branchesId);
			$("#branchName").val("["+data.branchCode+"]"+data.branchName);
		}
	})
}

/**
 * 机构自动补全
 */
function brandAutoComple(obj){
	//非回车事件和失去焦点，不做处理(失焦时event.keyCode为undefined)
	if(event.keyCode && event.keyCode != 13){
		return;
	}
	
	var nameOrCode = $.trim($("#branchName").val())||'';
	//未输入值时，直接返回，无需查询
	if('' == nameOrCode){
		$_jxc.clearHideInpOnEdit(obj);
		return;
	}
	selectBranches(nameOrCode);
}

//打印
//function printDesign(){
//     var dg = $("#gridRequireOrders");
//     var row = dg.datagrid("getSelected");
//     if(rowIsNull(row)){
//           return null;
//     }
//     //弹出打印页面
//     parent.addTabPrint('PASheet' + row.id,row.formNo+'单据打印',contextPath + '/printdesign/design?page=PASheet&controller=/form/purchase&template=-1&sheetNo=' + row.id + '&gridFlag=PAGrid','');
//}

/**
 * 重置
 */
var resetForm = function() {
	 $("#queryForm").form('clear');
};

