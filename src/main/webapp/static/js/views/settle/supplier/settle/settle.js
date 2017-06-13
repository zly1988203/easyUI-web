/**
 * Created by 
 * 供应商对账单-新增 修改
 */


var gridDefault = {
	    costPrice:0,
	}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "supplierChkAccountAdd";
var operateType;
var editRowFlag = false;
var targetBranchId;
var clickFlag = false;//是否点击供应商 方便判断显示提示
var editRowNumbeboxFlag = false;//用于表头和表体numberbox相互影响的

$(function(){
	operateType = $('#operateType').val();
	if(operateType === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
		  $('#createTime').text(new Date().format('yyyy-MM-dd hh:mm'))
		//非总部 机构默认有值
		  if(sessionBranchType != '0'){
			$('#branchId').val(sessionBranchId);
			$('#branchCode').val(sessionBranchCode);
			$('#targetBranchName').val(sessionBranchCodeName)
		  }
	}else if(operateType === 'edit'){
		var formId = $("#formId").val();
		url = contextPath+"/settle/supplierSettle/settleFormDetailList?id="+formId;
		oldData = {
		     remark:$("#remark").val()||'',                   // 备注
		     payType:$('input[type="hidden"][name="payType"]').val()||'',   //支付方式
		}
	}
	
	//监听numberbox 点击事件
	$("input#actualAmount").next("span").children().first().on('click',function(){
		gridHandel.endEditRow();
		editRowNumbeboxFlag = false;
	});
	
	initSupChkAcoAdd();
	
	if(operateType === 'add'){
		//机构选择初始化
		$('#branchComponent').branchSelect({
			//ajax请求参数
			ajaxParam:{
				scope:1
			},
			//选择完成之后
			onAfterRender:function(data){
				
				$('#openAccountBank').val('');
		    	//银行账户
		    	$('#bankAccount').val('');
		    	//办公地址
		    	$('#officeAddress').val('');
		    	//国税登记
		    	$('#nationalTaxRegNum').val('');
		    	
				$('#tel').val('')
				$("#supplierId").val('');
				$("#supplierName").val('');
				
				$("#"+gridName).datagrid('options').url = "";
				checkBranchSpec(data.branchesId);
				gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
		    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
			},
			//数据过滤
			loadFilter:function(data){
				data.isContainChildren = data.allBranch;
				return data;
			}
		});
		
		//供应商选择初始化
		$('#supplierComponent').supplierSelect({
			//选择之前
			onShowBefore:function(){
				clickFlag = true;
				return true;
			},
			//依赖条件 relyOnId 为空
			relyOnId:'branchId',
			//依赖条件 异常提示
			relyError:'请选择机构！',
			//选择完成之后
			onAfterRender:function(data){
		    	$("#phone").val(data.phone);
		    	$("#mobile").val(data.mobile);
		    	$('#tel').val((data.mobile?data.mobile:'')+(data.mobile&&data.phone ? '/':'')+(data.phone?data.phone:''))
		    	//校验是否存在未审核的结算单
				checkSettleAuditStutas(data.id);
			},
			//数据过滤
			loadFilter:function(data){
				data.supplierId = data.id;
				return data;
			}
		});
	}
	
})

//combobox 过滤
function loadFilter(data){
	if(operateType  === 'add'){
		data[0].selected = true;
	}
	return data;
}

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
//备注编辑监听 20
var maxTextLength = 20;
var chTexFlag = false;
function changeText(newV,oldV){
	if(chTexFlag){
		chTexFlag = false;
		return;
	}
	if($.trim(newV).length > maxTextLength){
		$_jxc.alert('备注长度不得超过' + maxTextLength + '个字符');
		chTexFlag = true;
		$(this).textbox('setValue',oldV);
		return;
	}
}
//行数据
function getColumns(){
	var modeType = $('#checkMode').val();
	var defalutsColumns = [
			 {field:'cb',checkbox:true},
			 {field:'targetFormId',title:'targetFormId',hidden:true},
			 {field:'targetFormNo',title:'单号',width: '150px',align:'left',
			 	formatter:function(value,row,index){
			 		var str = "";
			 		if(row.isFooter){
			             str ='<div class="ub ub-pc">合计</div> '
			         }
			 		var targetFormType = row.targetFormType;
            		if(value){
                		if(targetFormType == 'FY'){
                			str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商预付单明细\',\''+ contextPath +'/settle/supplierCharge/advanceView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
                		}else if(targetFormType == 'FF'){
                			str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商费用明细\',\''+ contextPath +'/settle/supplierCharge/chargeView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
                		}else if(targetFormType == 'FL'){
                			str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'供应商联营账单明细\',\''+ contextPath +'/settle/supplierChain/chainView?id='+ row.targetFormId +'\')">' + (value||"") + '</a>';
                		}else if(targetFormType == 'PI'){
                			str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购收货详细\',\''+contextPath+'/form/purchase/receiptEdit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
                		}else if(targetFormType == 'PM'){
                			str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'直送收货单详细\',\''+contextPath+'/directReceipt/edit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
                		}else if(targetFormType == 'PR'){
                			str = '<a style="text-decoration: underline;" href="#" onclick="toAddTab(\'查看采购退货详细\',\''+contextPath+'/form/purchase/returnEdit?formId='+row.targetFormId+'\')">' + (value||"") + '</a>';
                		}
                	}
			 		return str;
			 	}
			 },
			 {field:'formTypeText',title:'单据类型',width:'120px',align:'left'},
			 {field:'branchCode',title:'机构编号',width:'120px',align:'left'},
			 {field:'branchName',title:'机构名称',width:'140px',align:'left'},
			 {field:'supplierCode',title:'供应商编号',width:'120px',align:'left'},
			 {field:'supplierName',title:'供应商名称',width:'140px',align:'left'},
			 {field:'payableAmount',title:'应付金额',width:'100px',align:'right',
			 	formatter:function(value,row,index){
			 		if(!value)row.payableAmount = 0;
			 		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			 	}
			 },
			 {field:'payedAmount',title:'已付金额',width:'100px',align:'right',
			 	formatter:function(value,row,index){
			 		if(!value)row.payedAmount = 0;
			 		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			 	}
			 }]
	if(modeType == '1'){
		//能编辑 优惠金额
		defalutsColumns = defalutsColumns.concat([
			{field:'discountAmount',title:'优惠金额',width:'100px',align:'right',
			 	formatter:function(value,row,index){
			 		if(!value)row.discountAmount = 0;
			 		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			 	}
			 }])
	}else{
		//不能编辑 优惠金额
		defalutsColumns = defalutsColumns.concat([
			{field:'discountAmount',title:'优惠金额',width:'100px',align:'right',
			 	formatter:function(value,row,index){
			 		if(!value)row.discountAmount = 0;
			 		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			 	},
			 	editor:{
			 		type:'numberbox',
			 		options:{
			 			precision:4,
			 			onChange:onChangeDisAmount
			 		}
			 	}
			 }]);
	}
	defalutsColumns = defalutsColumns.concat([	 
			 {field:'unpayAmount',title:'未付金额',width:'100px',align:'right',
			 	formatter:function(value,row,index){
			 		if(!value)row.unpayAmount = 0;
			 		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			 	}
			 },
			 {field:'actualAmount',title:'实付金额',width:'100px',align:'right',
			 	formatter:function(value,row,index){
			 		if(!value)row.actualAmount = 0;
			 		return '<b>'+parseFloat(value||0).toFixed(2)+'</b>'
			 	},
			 	editor:{
			 		type:'numberbox',
			 		options:{
			 			precision:4,
			 			onChange:onChangeAmount
			 		}
			 	}
			 },
			 {field:'remark',title:'备注',width:'180px',
	            	editor:{
	                    type:'textbox',
	                    options:{
	                    	onChange:changeText
	                    }
	                }
			 }
	       ]);
	return [defalutsColumns];
}

var gridHandel = new GridClass();
function initSupChkAcoAdd(){
    gridHandel.setGridName(gridName);
    gridHandel.initKey({
        firstName:'actualAmount',
    })

    $("#"+gridName).datagrid({
        method:'post',
    	url:url,
        align:'center',
        singleSelect:false,  //单选  false多选
        checkOnSelect:false,
        rownumbers:true,    //序号
        showFooter:true,
        height:"100%",
        width:'100%',
        columns:getColumns(),
        onCheck:function(rowIndex,rowData){
            editRowFlag = true;
        	rowData.checked = true;
        	updateFooter();
        },
        onUncheck:function(rowIndex,rowData){
            editRowFlag = true;
        	rowData.checked = false;
        	updateFooter();
        },
        onCheckAll:function(rows){
            editRowFlag = true;
        	$.each(rows,function(index,item){
        		item.checked = true;
        	});
//        	editRowNumbeboxFlag = false;
        	updateFooter();
        },
        onUncheckAll:function(rows){
        	editRowFlag = true;
        	$.each(rows,function(index,item){
        		item.checked = false;
        	})
//        	editRowNumbeboxFlag = true;
        	updateFooter();
        },
        onClickCell:function(rowIndex,field,value){
        	editRowFlag = true;
        	editRowNumbeboxFlag = true;
        	$(this).datagrid('checkRow',rowIndex);
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("discountAmount");
            }
        },
        loadFilter:function(data){
        	data.forEach(function(obj,index){
        	    if(!editRowFlag){
        	    	obj.checked = true;
        	    }
        	});
        	return data;
        },
        onLoadSuccess:function(data){
        	if(clickFlag && data.rows.length <= 0){
        		clickFlag =  false;
        		$_jxc.alert('您和此供应商没有账款信息，或您们的往来账款已平衡！');
        		return;
        	}
        	
        	if(operateType==='edit'){
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
    
    if(operateType==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}


//监听优惠金额变化
function onChangeDisAmount(vewV,oldV){
	//payableAmount 应付金额
	//payedAmount   已付金额
	var _payableAmount = parseFloat(gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'payableAmount')||0);
	var _payedAmount = parseFloat(gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'payedAmount')||0);
	gridHandel.setFieldsData({unpayAmount:_payableAmount - _payedAmount - vewV});
}

//监听实付金额变化
var checkFlag = false;
function onChangeAmount(vewV,oldV){
	if(checkFlag){
		checkFlag = false;
		return;
	}
	var _unpayAmount = parseFloat(gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'unpayAmount')||0);
	
	if(_unpayAmount > 0 && (vewV < 0 ) && oldV){
		$_jxc.alert('实付金额不能小于零');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	if(_unpayAmount > 0 && (vewV > _unpayAmount ) && oldV){
		$_jxc.alert('实付金额不能大于未付金额');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	if(_unpayAmount < 0 && (vewV > 0) && oldV){
		$_jxc.alert('实付金额不能大于零');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	if(_unpayAmount < 0 && (vewV < _unpayAmount) && oldV){
		$_jxc.alert('实付金额不能小于未付金额');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	updateFooter();
}

var checkActMountFlag = false;
//实付金额汇总
function changeActMountFrom(newV,oldV){
	if(editRowNumbeboxFlag)return;
	editRowFlag = true;
	if(checkActMountFlag){
		checkActMountFlag = false;
		return;
	}
	var rows = gridHandel.getRowsWhere({branchName:'1' });
    if(rows.length==0){
    	$_jxc.alert("表格不能为空");
    	checkActMountFlag = true;
    	$(this).numberbox('setValue',oldV);
        return;
    }
	var newData = gridHandel.getRowsWhere({checked:true });//$("#"+gridName).datagrid("getChecked");
	if(newData.length < 1){
		$_jxc.alert("没有需要结算的信息，请检查！");
		checkActMountFlag = true;
		$(this).numberbox('setValue',0);
		return;
	}
	
	var _unpayAmountText = parseFloat($('#unpayAmount').val()||0);
	
	if(_unpayAmountText >= 0 && (newV < 0)){
		$_jxc.alert('实付金额汇总不能小于零');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	if(_unpayAmountText >= 0 && (newV > _unpayAmountText)){
		$_jxc.alert('实付金额汇总不能大于未付金额汇总');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	if(_unpayAmountText < 0 && (newV > 0)){
		$_jxc.alert('实付金额汇总不能大于零');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	if(_unpayAmountText < 0 && (newV < _unpayAmountText)){
		$_jxc.alert('实付金额汇总不能小于未付金额汇总');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	changeGrid(newV,rows);
}

var changeGridFlag = false; //批量设置实付金额表示
//批量设置实付金额
function changeGrid(actMount,rows){
	
	changeGridFlag = true;
	//实付金额 总汇
	var _temActMount = actMount;
	var zfFlag = parseFloat($('#unpayAmount').val()||0) > 0 ? true:false;
	rows.forEach(function(obj,index){
		if(obj.checked){
			//unpayAmount && ((zfFlag && _temActMount > 0 ) || (!zfFlag && _temActMount < 0))
			var _temUnpayAmount = parseFloat(obj.unpayAmount||0);
			if(zfFlag){ //未实付金额 大于0 
				if(_temActMount - _temUnpayAmount >0){
					obj.actualAmount = _temActMount - _temUnpayAmount <= 0 ? _temActMount : _temUnpayAmount ;
				}else{
					obj.actualAmount = 0;
				}
			}else{ //未付金额 小于0
				if(_temActMount < 0){
					obj.actualAmount = _temActMount - _temUnpayAmount >= 0 ? _temActMount : _temUnpayAmount ;
				}else{
					obj.actualAmount = 0;
				}
			}
			_temActMount = _temActMount - _temUnpayAmount;
			
		}
	})
	
	
	$("#"+gridName).datagrid("loadData",rows);
}
//合计
function updateFooter(){
    var fields = {payableAmount:0,payedAmount:0,discountAmount:0,unpayAmount:0,actualAmount:0};
    var argWhere = {name:'checked',value:true}
    gridHandel.updateFooter(fields,argWhere);
    updateFrom();
}

//更新头部表单
function updateFrom(){
	var _footerRow = gridHandel.getFooterRow();
	//应付金额汇总
	$('#payableAmount').val(parseFloat(_footerRow[0].payableAmount||0).toFixed(2));
	//优惠金额汇总
	$('#discountAmount').val(parseFloat(_footerRow[0].discountAmount||0).toFixed(2));
	//已付金额汇总
	$('#payedAmount').val(parseFloat(_footerRow[0].payedAmount||0).toFixed(2));
	var _unpayAmount1 = parseFloat(_footerRow[0].unpayAmount||0);
	//未付金额汇总
	$('#unpayAmount').val(_unpayAmount1.toFixed(2));

	//实付金额汇总
	$('#actualAmount').numberbox('setValue',parseFloat(_footerRow[0].actualAmount||0));
}

function _getRowsWhere(argWhere,rows){
	var _temRows = [];
	if(!rows ){
		_temRows = gridHandel.getRows();
	}else{
		_temRows = rows;
	}
    var newRows = [];
    $.each(_temRows,function(i,row){
        $.each(argWhere,function(key,val){
            if(row[key]){
                newRows.push(row);
            }
        })
    });
    return newRows;
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
function saveSupAcoSet(){
	var branchId = $('#branchId').val();
	var supplierId = $('#supplierId').val();
	var operateType = $('#operateType').val();
	if(!validateForm(branchId,supplierId))return;
	
    var _rows = gridHandel.getRowsWhere({targetFormNo:'1'});
    if(_rows.length <= 0){
    	$_jxc.alert("表格不能为空");
    	return;
    }
    
    //未付金额汇总
    var _unpayAmount = parseFloat($('#unpayAmount').val()||0);
    //实付金额汇总
    var _actulAmount =  parseFloat($('#actualAmount').numberbox('getValue'));
    
    if(_unpayAmount >= 0 && (_actulAmount < 0)){
    	$_jxc.alert('实付金额汇总不能小于零');
    	return;
    }
    if(_unpayAmount >= 0 && (_actulAmount > _unpayAmount)){
    	$_jxc.alert('实付金额汇总不能大于未付金额汇');
    	return;
    }
    
    if(_unpayAmount < 0 && (_actulAmount > 0)){
    	$_jxc.alert('实付金额汇总不能大于零');
    	return;
    }
    if(_unpayAmount < 0 && (_actulAmount < _unpayAmount)){
    	$_jxc.alert('实付金额汇总不能小于未付金额汇总');
    	return;
    }
    
    
    var reqObj = $('#settleForm').serializeObject();
    reqObj.operateType = operateType == "add" ? 1 : 0;
    
    var validFlag = true;
    var _subRows = [];
    var _rowNo = 0;//行号
    $.each(_rows,function(i,data){
    	if(data.checked && validFlag){
    		//第N行实付金额不能为0，请检查！确认
    		if(parseFloat(data.actualAmount) == 0){
    			validFlag = false;
    			$_jxc.alert("第"+(i+1)+"行实付金额不能为零，请检查！");
    			return;
    		}
    		data.rowNo = (_rowNo+1);
    		data.checked = data.checked ? 1:0;
    		_subRows.push(data);
    		_rowNo++;
    	}
    	if(!validFlag)return;
    })
    
    if(!validFlag)return;
    
    if(_subRows.length < 1){
    	$_jxc.alert("没有需要结算的信息，请检查！");
    	return ;
    }
    
    reqObj.detailList = _subRows;
    
    
//    return;
    $_jxc.ajax({
    	url:contextPath + '/settle/supplierSettle/saveSettleForm',
    	data:{"data":JSON.stringify(reqObj)}
    },function(result){
    	
    	if(result['code'] == 0){
			$_jxc.alert("操作成功！",function(){
				location.href = contextPath +"/settle/supplierSettle/settleEdit?id="+result['formId'];
			});
        }else{
            $_jxc.alert(result['message']);
        }
    })
}
function validateForm(branchId,supplierId){
    if(!$.trim(branchId)){
    	$_jxc.alert('请选择机构!');
    	return false;
    }
    if(!supplierId){
    	$_jxc.alert('请选择供应商!');
    	return false;
    }
    return true;
}
//审核
function auditSupStlForm(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
        remark:$("#remark").val()||'',                   // 备注
	    payType:$('input[type="hidden"][name="payType"]').val()||'',   //支付方式
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
		    	url : contextPath+"/settle/supplierSettle/auditSettleForm",
		    	data:{"data":JSON.stringify(reqObj)}
		    },function(result){
	    		if(result['code'] == 0){
	    			$_jxc.alert("操作成功！",function(){
	    				location.href = contextPath +"/settle/supplierSettle/settleView?id=" + result["formId"];
	    			});
	    		}else{
	            	 $_jxc.alert(result['message'],'审核失败');
	    		}
		    } );
		}
	})
}

//删除
function delSupSettleAccount(){
	var ids = [];
	ids.push($("#formId").val());
	$_jxc.confirm('是否要删除单据',function(data){
		if(data){
			$_jxc.ajax({
		    	url:contextPath+"/settle/supplierSettle/deleteSettleForm",
		    	dataType: "json",
		    	data:{"ids":ids}
		    },function(result){
	    		if(result['code'] == 0){
                    toRefreshIframeDataGrid("settle/supplierSettle/settleList","supAcoSettList");
	    			toClose();
	    		}else{
	    			$_jxc.alert(result['message']);
	    		}
		    });
		}
	});
}

//校验机构配置
function checkBranchSpec(branchId){
	$_jxc.ajax({
    	url:contextPath+"/settle/supplierCheck/querySettleCheckMode",
    	data: {branchId:branchId}
    },function(result){
    	// 1开启 不编辑优惠金额   0不开启能编辑
    	$('#checkMode').val(result.checkMode);
    	initSupChkAcoAdd();
    });
}

//校验是否存在未审核的结算单
function checkSettleAuditStutas(supplierId){
	var branchId = $('#branchId').val();
	var isContainChildren = $('#isContainChildren').val();
	var branchCompleCode = $('#branchCompleCode').val();
	
	$_jxc.ajax({
    	url:contextPath+"/settle/supplierSettle/querySettleStatusNum",
    	data: {branchId:branchId,branchCompleCode:branchCompleCode,isContainChildren:isContainChildren,supplierId:supplierId}
    },function(result){
		
		if(result.unChNum > 0){
			$_jxc.alert('当前选择机构存在未审核的结算单，不能新增结算单!');
			$('#openAccountBank').val('');
	    	//银行账户
	    	$('#bankAccount').val('');
	    	//办公地址
	    	$('#officeAddress').val('');
	    	//国税登记
	    	$('#nationalTaxRegNum').val('');
	    	
			$('#tel').val('')
			$("#supplierId").val('');
			$("#supplierName").val('');
			return false;
		}else{
	        // 设置供应商扩展信息
	        setSupplierExtValue(supplierId);
	        // 初始化列表
	        initSettleFormDetail();
		}
    });
}

//设置供应商扩展信息
function setSupplierExtValue(supplierId){
	$.ajax({
		url : contextPath + "/common/supplier/getSupplierExtById",
		type : "POST",
		data : {
			supplierId : supplierId
		},
		success : function(data) {
			console.log(data);
	    	//开户银行
	    	$('#openAccountBank').val((data.supplierExt.openAccountBank?data.supplierExt.openAccountBank:''));
	    	//银行账户
	    	$('#bankAccount').val((data.supplierExt.bankAccount?data.supplierExt.bankAccount:''));
	    	
	    	//办公地址
	    	$('#officeAddress').val((data.supplierExt.officeAddress?data.supplierExt.officeAddress:''));
	    	//国税登记
	    	$('#nationalTaxRegNum').val((data.supplierExt.nationalTaxRegNum?data.supplierExt.nationalTaxRegNum:''));
		},
		error : function(result) {
			$_jxc.alert("请求发送失败或服务器处理失败");
		}
	});
}

//初始化列表
function initSettleFormDetail(){
    var branchId = $('#branchId').val();
	var supplierId = $('#supplierId').val();
	var operateType = $('#operateType').val();
	var isContainChildren = $('#isContainChildren').val();
	if(!validateForm(branchId,supplierId))return;
    var paramsObj = {
    	branchId:branchId,
    	isContainChildren:isContainChildren,
		operateType : operateType == 'add' ? 1 : 2,
    	supplierId:supplierId,
    }
    
	$("#"+gridName).datagrid("options").method = "post";
    $("#"+gridName).datagrid("options").queryParams = paramsObj;
	$("#"+gridName).datagrid('options').url = contextPath + '/settle/supplierSettle/settleFormDetailList';
	$("#"+gridName).datagrid('load');
}


//返回列表页面
function back(){
	location.href = contextPath+"/settle/supplierSettle/getSettleList";
}

//新增供应商对账单
function addSupAcoSetForm(){
	toAddTab("新增供应商结算",contextPath + "/settle/supplierSettle/settleAdd");
}

//导出
function exportOrder(){
	var formId = $("#formId").val();
	window.location.href = contextPath + '/settle/supplierSettle/exportSheet?page=SupplierSettle&sheetNo='+formId;
}