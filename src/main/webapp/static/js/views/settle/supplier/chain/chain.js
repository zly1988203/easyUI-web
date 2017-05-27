/**
 * Created by 
 * 联营账单-新增 修改
 */


var gridDefault = {
	    costPrice:0,
	}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "supChainAdd";
var pageStatus;//页面状态 add 新增页面 edit 编辑页面
var branchId;
var clickFlag = false;//是否点击计算账款 方便判断显示提示


$(function(){
    pageStatus = $('#operateType').val();
	if(pageStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
	}else if(pageStatus === 'edit'){
		var id = $("#formId").val();
		url = contextPath+"/settle/supplierChain/chainFormDetailList?id="+id;
		oldData = {
				supplierRate:$("input[type='hidden'][name='supplierRate']").val(), // 供应商承担比例
		        payMoneyTime:$("#payMoneyTime").val(),                 // 付款日期
		        remark:$("#remark").val(),                  // 备注
		        otherAmount:$("input[type='hidden'][name='otherAmount']").val(), // 其他扣款
		}
	    
	}
	initSupChainAdd();
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
function initSupChainAdd(){
    gridHandel.setGridName(gridName);
    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:"100%",
        width:'100%',
        columns:[[
            {field:'branchName',title:'机构',width: '150px',align:'left'},
            {field:'skuCode',title:'货号',width:'120px',align:'left'},
            {field:'skuName',title:'商品名称',width:'100px',align:'left'},
            {field:'barCode',title:'条码',width:'100px',align:'left'},
            {field:'spec',title:'规格',width:'100px',align:'left'},
            {field:'unit',title:'单位',width:'100px',align:'left'},
            {field:'saleCount',title:'销售数量',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.saleCount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'saleAmount',title:'销售金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.saleAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'supplierRate',title:'联营扣率',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(row.isFooter)return '';
            		if(!value)row.supplierRate = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'divideAmount',title:'分成金额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.divideAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'outputTax',title:'销项税率',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(row.isFooter)return '';
            		if(!value)row.outputTax = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            },
            {field:'taxAmount',title:'税额',width:'100px',align:'right',
            	formatter:function(value,row,index){
            		if(!value)row.taxAmount = 0;
            		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
            	}
            }
        ]],
        onLoadSuccess:function(data){
        	if(clickFlag && data.rows.length <= 0){
        		clickFlag =  false;
        		$_jxc.alert('该供应商在结算期间没有联营账款数据！请重新选择合适的供应商或结算期间！')
        	}
        	if(pageStatus==='edit'){
                if(!oldData["grid"]){
                	oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
                        return $.extend(true,{},obj);//返回对象的深拷贝
                    });

                }
        	}
            gridHandel.setDatagridHeader("center");
            updateFooter();
            changeForm(pageStatus);
            //计算实际应付金额
            if(pageStatus==='add'){
            	$('#actualAmount').val(actualAmount());
            }
        },
    });
    
    if(pageStatus==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}

//更新表单
function changeForm(pageStatus){
	//updateFooter()
	var footRow = gridHandel.getFooterRow();
	console.log(footRow);
	//分成金额
	$('#divideAmount').val(footRow[0].divideAmount||0);
	if(pageStatus == 'add'){
		//销售金额
		$('#sumSaleAmount').val(footRow[0].saleAmount||0);
		//供应商货款
		$('#sumSupplierAmount').val( parseFloat(footRow[0].saleAmount||0)-parseFloat(footRow[0].divideAmount||0) );
		//汇总税额
		$('#sumTaxAmount').val((footRow[0].taxAmount||0));
		//供应商承担税额
		$('#supplierTaxAmount').val((footRow[0].taxAmount||0));
	}
	
}

//计算实际应付金额 ：实际应付款 = 销售金额-分成金额（如果分成金额<保底金额，取保底金额）-供应商承担税额-其他扣款
function actualAmount(){
	var _temAct = 0;
	//销售金额
	var _sumSale = parseFloat($('#sumSaleAmount').val()||0);
	//供应商承担税额
	var _supSumSale = parseFloat($('#supplierTaxAmount').val()||0);
	//其他扣款
	var _supOtherSumSale = parseFloat($('#otherAmount').numberbox('getValue')||0);
	//分成金额
	var _divideAmount = parseFloat($('#divideAmount').val()||0);
	//or保底金额
	var _minSumSale = parseFloat($('#supplierMinAmount').val()||0);
	
	_temAct = _sumSale - (_divideAmount < _minSumSale ? _minSumSale :_divideAmount) - _supSumSale - _supOtherSumSale;
	
	console.log('_temAct',_temAct)
	return parseFloat(_temAct||0).toFixed(4);
}

//修改供应商承担比例
function changeRate(vewV,oldV){
	//汇总税额 
	var sumTax = parseFloat($('#sumTaxAmount').val()||0);
	var _vewV = parseFloat(vewV/100);
	//供应商承担税额
	$('#supplierTaxAmount').val(parseFloat(sumTax*_vewV).toFixed(2));
	$('#actualAmount').val(actualAmount());
}

//修改其他扣款
function changeOtAmount(vewV,oldV){
	$('#actualAmount').val(actualAmount());
}

//合计
function updateFooter(){
    var fields = {saleCount:0,saleAmount:0,divideAmount:0,taxAmount:0};
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

function validateForm(branchId,beginDate,endDate,supplierId){
    if(!$.trim(branchId)){
    	$_jxc.alert('请选择机构!');
    	return false;
    }
    if(!beginDate){
    	$_jxc.alert('计算开始时间不能为空');
    	return false;
    }
    if(!endDate){
    	$_jxc.alert('计算结算时间不能为空');
    	return false;
    }
    if(!supplierId){
    	$_jxc.alert('请选择供应商!');
    	return false;
    }
    return true;
}


//计算账款
function initChainFormDetail(){
	clickFlag =  true;
    var branchId = $('#branchId').val();
	var beginDate = $('#beginDate').val();
	var endDate = $('#endDate').val();
	var supplierId = $('#supplierId').val();
	var operateType = $('#operateType').val();
	if(!validateForm(branchId,beginDate,endDate,supplierId))return;
    var paramsObj = {
    	branchId:branchId,
    	beginDate:beginDate,
    	endDate:endDate,
		operateType : operateType == 'add' ? 1 : 2,
    	supplierId:supplierId,
    }
    
	$("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").queryParams = paramsObj;
	$("#"+gridName).datagrid('options').url = contextPath + '/settle/supplierChain/chainFormDetailList';
	$("#"+gridName).datagrid('load');
}

//保存
function saveChainForm(){
	var branchId = $('#branchId').val();
	var beginDate = $('#beginDate').val();
	var endDate = $('#endDate').val();
	var supplierId = $('#supplierId').val();
	var operateType = $('#operateType').val();
	if(!validateForm(branchId,beginDate,endDate,supplierId))return;
	
    var reqObj = $('#chainForm').serializeObject();
    reqObj.operateType = operateType == "add" ? 1 : 0;
    var _rows = gridHandel.getRows();
    if(_rows.length <= 0){
    	$_jxc.alert("表格不能为空");
    	return;
    }
    
    //新增传detailList字段 编辑不需要
    if(operateType == "add")reqObj.detailList = gridHandel.getRows();
    
    
    console.log('reqObj',reqObj);
    
    $_jxc.ajax({
    	url:contextPath + '/settle/supplierChain/saveChainForm',
    	data:{"data":JSON.stringify(reqObj)}
    },function(result){
    	if(result['code'] == 0){
			$_jxc.alert("操作成功！",function(){
				location.href = contextPath +"/settle/supplierChain/chainEdit?id="+result['formId'];
			});
        }else{
            $_jxc.alert(result['message']);
        }
    })
    
}


//删除
function delChainForm(){
	var ids = [];
	ids.push($("#formId").val());
	$_jxc.confirm('是否要删除单据?',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/supplierChain/deleteChainForm",
		    	data:{"ids":ids}
		    },function(result){
	    		if(result['code'] == 0){
                    toRefreshIframeDataGrid("settle/supplierChain/chainList","supChainList");
	    			toClose();
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//审核
function auditChargeForm(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
		supplierRate:$("input[type='hidden'][name='supplierRate']").val(), // 供应商承担比例
        payMoneyTime:$("#payMoneyTime").val(),                 // 付款日期
        remark:$("#remark").val(),                  // 备注
        otherAmount:$("input[type='hidden'][name='otherAmount']").val(), // 其他扣款
        grid:$.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(!gFunComparisonArray(oldData,newData)){
    	$_jxc.alert("数据有修改，请先保存再审核");
        return;
    }
    var reqObj = {
    	id:$('#formId').val()||'',
    	branchId:$('#branchId').val()||''
    }
	$_jxc.confirm('是否审核通过？',function(data){
		if(data){
			$_jxc.ajax({
		    	url : contextPath+"/settle/supplierChain/auditChainForm",
		    	data:{"data":JSON.stringify(reqObj)}
		    },function(result){
	    		if(result['code'] == 0){
	    			$_jxc.alert("操作成功！",function(){
	    				location.href = contextPath +"/settle/supplierChain/chainView?id=" + result["formId"];
	    			});
	    		}else{
	            	 $_jxc.alert(result['message'],'审核失败');
	    		}
		    } );
		}
	});
}
//删除
function delSupJonAccount(){
	var ids = [];
	ids.push($("#formId").val());
	$_jxc.confirm('是否要删除单据',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/supplierChain/deleteChainForm",
		    	data:{'ids':ids}
		    },function(result){
	    		if(result['code'] == 0){
                    toRefreshIframeDataGrid("settle/supplierChain/chainList","supChainList");
	    			toClose(); 
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//机构
function selectBranches(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
	},'',branchId);
}

//选择供应商
function selectSupplier(){
    new publicSupplierService(function(data){
    	console.log('supplier',data);
    	$('#supplierContcat').val(data.supplierName||'');//联系人
    	$('#linkTel').val((data.mobile?data.mobile:'')+(data.phone?'/'+data.phone:''));//联系人
    	$("#supplierId").val(data.id);
    	$("#supplierPhone").val(data.phone);
    	$("#supplierMobile").val(data.mobile);
    	$("#supplierMinAmount").val(data.minAmount);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);	
        
    });
}



//返回列表页面
function back(){
	location.href = contextPath+"/settle/supplierChain/chainList";
}

//新增联营账单
function addChainForm(){
	toAddTab("新增联营账单",contextPath + "/settle/supplierChain/chainAdd");
}
