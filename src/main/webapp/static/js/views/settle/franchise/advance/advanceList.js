/**
 * Created by zhanghuan on 2016/8/30.
 * 新增加盟店预收款
 */
$(function(){
	//开始和结束时间
    $("#txtStartDate").val(dateUtil.getCurrDayPreOrNextDay("prev",30));
    $("#txtEndDate").val(dateUtil.getCurrentDate().format("yyyy-MM-dd"));
    initsupAdvMonList();
    //if(getUrlQueryString('message')=='0'){
    	queryForm();
    //}
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



var gridHandel = new GridClass();
var datagirdID = 'franchiseAdvMoneyList'
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
            		strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店预收款明细\',\''+ contextPath +'/settle/franchiseCharge/advanceView?id='+ row.id +'\')">' + value + '</a>';
            	}else{
            		strHtml = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店预收款明细\',\''+ contextPath +'/settle/franchiseCharge/advanceEdit?id='+ row.id +'\')">' + value + '</a>';
            	}
        		return strHtml;
            }},
            {field: 'auditStatus',title: '审核状态', width: '80px', align: 'center',
            	formatter:function(value,row,index){
            		return value == '1'?'已审核':'未审核';
            	}
            },
			{field: 'branchCode', title: '加盟店编号', width: '100px', align: 'left'},
			{field: 'branchName', title: '加盟店名称', width: '140px', align: 'left'},
			{field: 'sumAmount', title: '单据金额', width: '100px', align: 'right',
				formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                }
			},
            {field: 'createUserName', title: '制单人', width: '120px', align: 'left'},
            {field: 'createTime', title: '制单时间', width: '120px', align: 'left',
				formatter: function (value, row, index) {
					if (value) {
						return new Date(value).format('yyyy-MM-dd hh:mm');
					}
					return "";
				}
			},
			{field: 'auditUserName', title: '审核人', width: '120px', align: 'left'},
			{field: 'remark', title: '备注', width: '200px', align: 'left'}
			
        ]],
		onLoadSuccess:function(data){
			gridHandel.setDatagridHeader("center");
		}
    });

}

//新增新增加盟店预收款
function addSupAdvMonForm(){
	toAddTab("新增加盟店预收款",contextPath + "/settle/franchiseCharge/advanceAdd");
}

//查询新增加盟店预收款
function queryForm(){
	var fromObjStr = $('#queryForm').serializeObject();
	// 去除编码
    fromObjStr.branchName = fromObjStr.branchName.substring(fromObjStr.branchName.lastIndexOf(']')+1)
    fromObjStr.createUserName = fromObjStr.createUserName.substring(fromObjStr.createUserName.lastIndexOf(']')+1)

	$("#"+datagirdID).datagrid("options").method = "post";
	$("#"+datagirdID).datagrid('options').url = contextPath + '/settle/franchiseCharge/getAdvanceList';
	$("#"+datagirdID).datagrid('load',fromObjStr);
}

//删除
function delSupAdvMonForm(){
	var dg = $("#"+datagirdID);
	var row = dg.datagrid("getChecked");
	if(row.length <= 0){
		$.messager.alert('提示','未选择要删除的单据！');
		return;
	}
	var ids = [];
	for(var i=0; i<row.length; i++){
		ids.push(row[i].id);
	}
	$.messager.confirm('提示','是否要删除选中数据?',function(data){
		if(data){
        	$.ajax({
                type: "POST",
                url: contextPath+"/settle/franchiseCharge/advanceDelete",
                data: {"ids":ids},
                dataType: "json",
                success: function(data){
                	gFunEndLoading();
                	successTip(data['message']);
                	if(data.code == 0){
                		queryForm();
                	}
                }
            });
//			$.ajax({
//		    	url:contextPath+"/settle/franchiseCharge/deleteChargeForm",
//		    	type:"POST",
//		    	dataType: "json",
//		    	data:{"ids":ids},
//		    	success:function(result){
//		    		if(result['code'] == 0){
//		    			successTip("删除成功");
//		    			dg.datagrid('reload');
//		    		}else{
//		    			successTip(result['message']);
//		    		}
//		    	},
//		    	error:function(result){
//		    		successTip("请求发送失败或服务器处理失败");
//		    	}
//		    });
		}
	});
}

/**
 * 操作员
 */
function selectOperator(){
	new publicOperatorService(function(data){
		$("#createUserId").val(data.id);
		$("#createUserName").val("["+data.userCode+"]"+data.userName);
	});
}
/**
 * 机构
 */
function selectBranches(){
	new publicAgencyService(function(data){
		$("#franchiseBranchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},'FAS');
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

