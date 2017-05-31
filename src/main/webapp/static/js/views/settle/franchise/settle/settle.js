/**
 * Created by 
 * 加盟店结算-新增 修改
 */


var gridDefault = {
	    costPrice:0,
	    checked:1
	}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "franchiseAccountAdd";
var pageStatus;
var editRowData = null;
var targetBranchId;


$(function(){
    pageStatus = $('#pageStatus').val();
	if(pageStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
	}else if(pageStatus === 'edit'){
		var formId = $("#formId").val();
		url = contextPath+"/settle/franchiseSettle/getDetailList?formId="+formId;
		oldData = {
		        targetBranchId:$("#franchiseBranchId").val(), // 要活分店id
		        remark:$("#remark").val(),                  // 备注
		        payType:$("#payType").val(),                 // 付款方式
		}
	    
	}
	initSupChkAcoAdd();
})

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
function initSupChkAcoAdd(){
    gridHandel.setGridName(gridName);
    gridHandel.initKey({
        firstName:'costNo',
        enterName:'costNo'
    })

    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:"100%",
        width:'100%',
        columns:[[
            {field:'cb',checkbox:true},
            {field:'targetFormId',hidden:'true'},
            {field:'targetFormNo',title:'单号',width: '150px',align:'left',
            	formatter:function(value,row,index){
            		var str = "";
            		if(row.isFooter){
                        str ='<div class="ub ub-pc">合计</div> '
                    }else if(row.targetFormType == 'DI'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'入库单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.targetFormId +'&deliverType=DI\')">' + (value||"") + '</a>';
                    }else if(row.targetFormType == 'DO'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'出库单明细\',\''+ contextPath +'/form/deliverForm/deliverEdit?deliverFormId='+ row.targetFormId +'&formType=DO\')">' + (value||"") + '</a>';
                    }else if(row.targetFormType == 'PI'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购收货详细\',\''+contextPath+'/form/purchase/receiptEdit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
                    }else if(row.targetFormType == 'PM'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'直送收货单详细\',\''+contextPath+'/directReceipt/edit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
                    }else if(row.targetFormType == 'PR'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购退货详细\',\''+contextPath+'/form/purchase/returnEdit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
                    }else if(row.targetFormType == 'FI'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店预收款明细\',\''+ contextPath +'/settle/franchiseCharge/advanceView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
                    }else if(row.targetFormType == 'FO'){
                    	str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'加盟店费用明细\',\''+ contextPath +'/settle/franchiseCharge/chargeView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
                    }
            		return str;
            	}
            },
            {field:'targetFormType',title:'单据类型',width:'120px',align:'center'},
            {field:'branchCode',title:'加盟店编号',width:'120px',align:'left'},
            {field:'branchName',title:'加盟店名称',width:'140px',align:'left'},
            {field:'payableAmount',title:'应收金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.payableAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'payedAmount',title:'已收金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.payedAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'unpayAmount',title:'未收金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.unpayAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'actualAmount',title:'实收金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.actualAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	},
            	editor:{
            		type:'numberbox',
            		options:{
            			min:0,
            			precision:4,
            			onChange:changeActAmount
            		}
            	}
            },
            {field:'remark',title:'备注',width:'180px',editor:'textbox'}
        ]],
        onCheck:function(rowIndex,rowData){
        	rowData.checked = true;
        },
        onUncheck:function(rowIndex,rowData){
        	rowData.checked = false;
        },
        onCheckAll:function(rows){
        	$.each(rows,function(index,item){
        		item.checked = true;
        	})
        },
        onUncheckAll:function(rows){
        	$.each(rows,function(index,item){
        		item.checked = false;
        	})
        },
        onClickCell:function(rowIndex,field,value){
        	$(this).datagrid('checkRow',rowIndex);
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("yhPrice");
            }
        },
        loadFilter:function(data){
        	data.forEach(function(obj,index){
        		obj.checked = obj.checked == 1 || !obj.checked ? true:false;
        	})
        	return data; 
        },
        onLoadSuccess:function(data){
        	if(pageStatus==='edit'){
                if(!oldData["grid"]){
                	oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
                        return $.extend(true,{},obj);//返回对象的深拷贝
                    });

                }
        	}
            gridHandel.setDatagridHeader("center");
            updateFooter();
        },
    });
    
    if(pageStatus==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}

function changeActAmount(vewV,oldV){
	updateFooter()
}
//合计
function updateFooter(){
    var fields = {payableAmount:0,payedAmount:0,unpayAmount:0,actualAmount:0};
    var argWhere = {}
    gridHandel.updateFooter(fields,argWhere);
}

//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    var index = $(event.target).attr('data-index')||0;
    gridHandel.addRow(index,gridDefault);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    var index = $(event.target).attr('data-index');
    gridHandel.delRow(index);
}



//保存
function saveFranchiseSet(){
	$("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
	var branchId = $('#branchId').val();
//	if(!validateForm(branchId,payTime))return;
    var rows = gridHandel.getRowsWhere({branchName:'1'});
    if(rows.length==0){
    	$_jxc.alert("表格不能为空");
        return;
    }
    
    var footRow = gridHandel.getFooterRow();
    console.log('footRow',footRow)
    if(footRow.length >0 && footRow[0].amount ==0 ){
    	$_jxc.alert("合计该单据不能为零，请修改。");
    	return;
    }
    var _rows = [];
    $.each(rows,function(i,data){
    	console.log(data)
    	if(data.checked){
    		_rows.push({
    			io:data.io,
    			rowNo:i,
    			targetFormId:data.targetFormId,
    			targetFormNo:data.targetFormNo,
    			targetFormType:data.targetFormType,
    			payableAmount:data.payableAmount,
    			payedAmount:data.payedAmount,
    			unpayAmount:data.unpayAmount,
    			actualAmount:data.actualAmount,
    			remark:data.remark
    		})
    	}
    })
    
    var reqObj = {
    	id:$('#formId').val()||'',
    	franchiseBranchId:$('#franchiseBranchId').val()||'',
    	payType:$('#payType').val()||'',
		payableAmount:$('#payableAmount').val()||'',
		payedAmount:$('#payedAmount').val()||'',
		unpayAmount:$('#unpayAmount').val()||'',
		actualAmount:$('#actualAmount').val()||'',
		remark:$('#remark').val()||'',
    	detailList:_rows
    }
    var url = $("#pageStatus").val() == 'add' ? contextPath+"/settle/franchiseSettle/settleSave" : contextPath+"/settle/franchiseSettle/settleUpdate";
    
    console.log('test',JSON.stringify(reqObj));
//    return;
    $_jxc.ajax({
        url:url,
        data:{"data":JSON.stringify(reqObj)},
    },function(result){
        if(result['code'] == 0){
			$_jxc.alert("操作成功！",function(){
				location.href = contextPath +"/settle/franchiseSettle/settleEdit?id="+result['formId'];
			});
        }else{
            $_jxc.alert(result['message']);
        }
    });
	
}

//审核
function auditFranchiseSet(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
		targetBranchId:$("#franchiseBranchId").val(), // 要活分店id
        remark:$("#remark").val(),                  // 备注
        payType:$("#payType").val(),                 // 付款方式
        grid:$.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(!gFunComparisonArray(oldData,newData)){
    	$_jxc.alert("数据有修改，请先保存再审核");
        return;
    }
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
            gFunStartLoading();
			$.ajax({
		    	url : contextPath+"/settle/franchiseSettle/settleAudit",
		    	type : "POST",
		    	data:{"formId":$('#formId').val()||''},
		    	success:function(result){
                    gFunEndLoading();
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/settle/franchiseSettle/settleView?id=" + result["formId"];
		    			});
		    		}else{
		            	 $_jxc.alert(result['message'],'审核失败');
		    		}
		    	},
		    	error:function(result){
                    gFunEndLoading();
		    		$_jxc.alert("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//删除
function delFrachiseForm(){
	var ids = [];
	ids.push($("#formId").val());
	$_jxc.confirm('是否要删除单据',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/franchiseSettle/settleDelete",
		    	dataType: "json",
		    	data:{"ids":ids}
		    },function(result){
	    		if(result['code'] == 0){
                    toRefreshIframeDataGrid("settle/franchiseSettle/settleList","franchiseAccountAdd");
	    			toClose();
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//初始化列表
function initSettleFormDetail(){
    var branchId = $('#franchiseBranchId').val();
    var paramsObj = {
    	franchiseId:branchId,
    }
    console.log('paramsObj:',paramsObj);
	$("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").queryParams = paramsObj;
	$("#"+gridName).datagrid('options').url = contextPath + '/settle/franchiseSettle/getFormList';
	$("#"+gridName).datagrid('load');
}

//机构
function selectBranches(){
	new publicAgencyService(function(data){
		$("#franchiseBranchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#franchiseBranchName").val("["+data.branchCode+"]"+data.branchName);
		initSettleFormDetail()
	},'FA',targetBranchId);
}

//选择费用
function selectCost(searchKey){
	var param = {
		key:searchKey,
	};
	publicCostService(param,function(data){
		console.log('data',data);
	});

}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/franchiseSettle/settleList";
}

//新增加盟店结算
function addSupAcoSetForm(){
	toAddTab("新增加盟店结算",contextPath + "/settle/franchiseSettle/settleAdd");
}
