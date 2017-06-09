/**
 * Created by 
 * 加盟店结算-新增 修改
 */


var gridDefault = {
	    costPrice:0
	}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "franchiseAccountAdd";
var pageStatus;
var editRowFlag = false;
var targetBranchId;
var clickFlag = false;//是否点击供应商 方便判断显示提示
var editRowNumbeboxFlag = false;//用于表头和表体numberbox相互影响的


$(function(){
    pageStatus = $('#pageStatus').val();
	if(pageStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
		  $('#createTime').text(new Date().format('yyyy-MM-dd hh:mm'));
		// 机构默认有值
		  if(sessionBranchType == '4' || sessionBranchType == '5'){
			$('#franchiseBranchId').val(sessionBranchId);
			$('#branchCode').val(sessionBranchCode);
			$('#franchiseBranchName').val(sessionBranchCodeName)
		  }
	}else if(pageStatus === 'edit'){
		var formId = $("#formId").val();
		url = contextPath+"/settle/franchiseSettle/getDetailList?formId="+formId;
		oldData = {
		        remark:$("#remark").val(),                  // 备注
		        payType:$('input[type="hidden"][name="payType"]').val()||'',   //支付方式
		}
	    
	}
	
	//监听numberbox 点击事件
	$("input#actualAmount").next("span").children().first().on('click',function(){
		gridHandel.endEditRow();
		editRowNumbeboxFlag = false;
	});
	
	initSupChkAcoAdd();
})

//支付方式 默认勾选第一个
function loadFilter(data){
	if(pageStatus === 'add'){
		data[0].selected = true
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

var gridHandel = new GridClass();
function initSupChkAcoAdd(){
    gridHandel.setGridName(gridName);
    gridHandel.initKey({
        firstName:'actualAmount'
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
            {field:'formTypeString',title:'单据类型',width:'120px',align:'center'},
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
            			precision:4,
            			onChange:changeActAmount
            		}
            	}
            },
            {field:'remark',title:'备注',width:'180px',align:'left',
            	editor:{
                    type:'textbox',
                    options:{
                    	onChange:changeText
                    }
                }	
            }
        ]],
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
        	updateFooter();
        },
        onUncheckAll:function(rows){
        	editRowFlag = true;
        	$.each(rows,function(index,item){
        		item.checked = false;
        	});
        	updateFooter();
        },
        onClickCell:function(rowIndex,field,value){
        	console.log('value',value);
        	editRowFlag = true;
        	editRowNumbeboxFlag = true;
        	$(this).datagrid('checkRow',rowIndex);
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
//            	var _unpayAmount = $(this).datagrid('getRows')[rowIndex].unpayAmount || 0;
//            	if(_unpayAmount >= 0){
//            		$(target).numberbox('options').min = 0;
//            	}else{
//            		$(target).numberbox('options').max = 0;
//            	}
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("actualAmount");
            }
        },
        loadFilter:function(data){
        	if(!editRowFlag){
    			data.forEach(function(obj,index){
    				obj.checked = pageStatus == 'add' ? false :true;
    			});
        	}
        	return data; 
        },
        onLoadSuccess:function(data){
        	if(clickFlag && data.rows.length <= 0){
        		clickFlag =  false;
        		$_jxc.alert('您和此加盟店没有账款信息，或您们的往来账款已平衡！');
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
            
        },
    });
    
    if(pageStatus==='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}


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


var checkFlag = false;
//实收金额 监听事件
function changeActAmount(vewV,oldV){
	if(checkFlag){
		checkFlag = false;
		return;
	}
	var _unpayAmount = parseFloat(gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'unpayAmount')||0);
	if(_unpayAmount > 0 && (vewV < 0 ) && oldV){
		$_jxc.alert('实收金额不能小于零');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	if(_unpayAmount > 0 && (vewV > _unpayAmount ) && oldV){
		$_jxc.alert('实收金额不能大于未收金额');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	if(_unpayAmount < 0 && (vewV > 0) && oldV){
		$_jxc.alert('实收金额不能大于零');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	if(_unpayAmount < 0 && (vewV < _unpayAmount) && oldV){
		$_jxc.alert('实收金额不能小于未收金额');
		checkFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	updateFooter();
}

var checkActMountFlag = false;
//实收金额汇总
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
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	var _unpayAmountText = parseFloat($('#unpayAmount').val()||0);
	
	if(_unpayAmountText >= 0 && (newV < 0)){
		$_jxc.alert('实收金额汇总不能小于零');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	if(_unpayAmountText >= 0 && (newV > _unpayAmountText)){
		$_jxc.alert('实收金额汇总不能大于未收金额汇总');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	if(_unpayAmountText < 0 && (newV > 0)){
		$_jxc.alert('实收金额汇总不能大于零');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	if(_unpayAmountText < 0 && (newV < _unpayAmountText)){
		$_jxc.alert('实收金额汇总不能小于未收金额汇总');
		checkActMountFlag = true;
		$(this).numberbox('setValue',oldV);
		return;
	}
	
	changeGrid(newV,rows);
}

var changeGridFlag = false; //批量设置实收金额表示
//批量设置实收金额
function changeGrid(actMount,rows){
	console.log('rows',JSON.stringify(rows))
	changeGridFlag = true;
	//实收金额 总汇
	var _temActMount = actMount;
	var zfFlag = parseFloat($('#unpayAmount').val()||0) > 0 ? true:false;
	rows.forEach(function(obj,index){
		if(obj.checked){
			//unpayAmount && ((zfFlag && _temActMount > 0 ) || (!zfFlag && _temActMount < 0))
			var _temUnpayAmount = parseFloat(obj.unpayAmount||0);
			if(zfFlag){ //未实收金额 大于0 
				if(_temActMount >0){
					obj.actualAmount = _temActMount - _temUnpayAmount <= 0 ? _temActMount : _temUnpayAmount ;
				}else{
					obj.actualAmount = 0;
				}
			}else{ //未收金额 小于0
				if(_temActMount < 0){
					obj.actualAmount = _temActMount - _temUnpayAmount >= 0 ? _temActMount : _temUnpayAmount ;
				}else{
					obj.actualAmount = 0;
				}
			}
			_temActMount = _temActMount - _temUnpayAmount;
			
		}
	})
	console.log('rowsL',JSON.stringify(rows))
	
	$("#"+gridName).datagrid("loadData",rows);
}

//合计
function updateFooter(){
    var fields = {payableAmount:0,payedAmount:0,unpayAmount:0,actualAmount:0};
    var argWhere = {name:'checked',value:true}
    gridHandel.updateFooter(fields,argWhere);
    updateFrom();
}

//更新头部表单
function updateFrom(){
	var _footerRow = gridHandel.getFooterRow();
	//应收金额汇总
	$('#payableAmount').val(parseFloat(_footerRow[0].payableAmount||0).toFixed(2));
	//已收金额汇总
	$('#payedAmount').val(parseFloat(_footerRow[0].payedAmount||0).toFixed(2));
	var _unpayAmount1 = parseFloat(_footerRow[0].unpayAmount||0);
	//未收金额汇总
	$('#unpayAmount').val(_unpayAmount1.toFixed(2));
	
	//实收金额汇总
	$('#actualAmount').numberbox('setValue',parseFloat(_footerRow[0].actualAmount||0));
}

function _getRowsWhere(argWhere){
	var rows = gridHandel.getRows();
    var newRows = [];
    $.each(rows,function(i,row){
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
function saveFranchiseSet(){
	$("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
	var branchId = $('#branchId').val();
	
	
    var rows = gridHandel.getRowsWhere({branchName:'1' });
    if(rows.length==0){
    	$_jxc.alert("表格不能为空");
        return;
    }
    
    //未收金额汇总
    var _unpayAmount = parseFloat($('#unpayAmount').val()||0);
    //实收金额汇总
    var _actulAmount =  parseFloat($('#actualAmount').numberbox('getValue'));
    
    if(_unpayAmount >= 0 && (_actulAmount < 0)){
    	$_jxc.alert('实收金额汇总不能小于零');
    	return;
    }
    if(_unpayAmount >= 0 && (_actulAmount > _unpayAmount)){
    	$_jxc.alert('实收金额汇总不能大于未收金额汇');
    	return;
    }
    
    if(_unpayAmount < 0 && (_actulAmount > 0)){
    	$_jxc.alert('实收金额汇总不能大于零');
    	return;
    }
    if(_unpayAmount < 0 && (_actulAmount < _unpayAmount)){
    	$_jxc.alert('实收金额汇总不能小于未收金额汇总');
    	return;
    }
    
    var validFlag = true;
    var _rows = [];
    var rowNo = 1;
    rows.forEach(function(data,i){
    	if(data.checked && validFlag){
    		//第N行实收金额不能为0，请检查！确认
    		if(parseFloat(data.actualAmount) == 0){
    			validFlag = false;
    			$_jxc.alert("第"+(i+1)+"行实收金额不能为零，请检查！");
    			return;
    		}
    		_rows.push({
    			io:data.io,
    			rowNo:rowNo,
    			targetFormId:data.targetFormId,
    			targetFormNo:data.targetFormNo,
    			targetFormType:data.targetFormType,
    			payableAmount:data.payableAmount,
    			payedAmount:data.payedAmount,
    			unpayAmount:data.unpayAmount,
    			actualAmount:data.actualAmount,
    			remark:data.remark
    		});
    		rowNo++;
    	}
    	if(!validFlag)return;
    })
    
    if(!validFlag)return;
    
    if(_rows.length < 1){
    	$_jxc.alert("没有需要结算的信息，请检查！确认");
    	return ;
    }
    
    var reqObj = {
    	id:$('#formId').val()||'',
    	franchiseBranchId:$('#franchiseBranchId').val()||'',
    	payType:$('#payType').combobox('getValue')||'',
		payableAmount:$('#payableAmount').val()||'',
		payedAmount:$('#payedAmount').val()||'',
		unpayAmount:$('#unpayAmount').val()||'',
		actualAmount:$('#actualAmount').val()||'',
		remark:$('#remark').val()||'',
    	detailList:_rows
    }
    var url = $("#pageStatus").val() == 'add' ? contextPath+"/settle/franchiseSettle/settleSave" : contextPath+"/settle/franchiseSettle/settleUpdate";
    
    console.log('test',JSON.stringify(reqObj));
 //   return;
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
        remark:$("#remark").val(),                  // 备注
        payType:$('input[type="hidden"][name="payType"]').val()||'',   //支付方式
        grid:$.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(!gFunComparisonArray(oldData,newData)){
    	$_jxc.alert("数据有修改，请先保存再审核");
        return;
    }
	$_jxc.confirm('是否审核通过？',function(data){
		if(data){
//            gFunStartLoading();
			$_jxc.ajax({
		    	url : contextPath+"/settle/franchiseSettle/settleAudit",
		    	data:{"formId":$('#formId').val()||''}
		    },function(result){
//                gFunEndLoading();
	    		if(result['code'] == 0){
	    			$_jxc.alert("操作成功！",function(){
	    				location.href = contextPath +"/settle/franchiseSettle/settleView?id=" + result["formId"];
	    			});
	    		}else{
	            	 $_jxc.alert(result['message'],'审核失败');
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
	clickFlag = true;
	var param = {
		branchTypesStr:$_jxc.branchTypeEnum.FRANCHISE_STORE_B + ',' + $_jxc.branchTypeEnum.FRANCHISE_STORE_C
	}
	new publicBranchesService(param,function(data){
		checkSettleAuditStutas(data.branchesId,data.branchCode,data.branchName);
	})
}

//校验是否存在未审核的结算单
function checkSettleAuditStutas(branchId,branchCode,branchName){	
	$_jxc.ajax({
		url:contextPath+"/settle/franchiseSettle/checkAuditCount",
		dataType: "json",
		data:{franchiseBranchId:branchId}
	},function(result){
		if(result['code'] == 0){
			$("#franchiseBranchId").val(branchId);
			$("#branchCode").val(branchCode);
			$("#franchiseBranchName").val("["+branchCode+"]"+branchName);
			initSettleFormDetail();
		}else{
			$_jxc.alert('当前选择机构存在未审核的结算单，不能新增结算单!');
		}
	});
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

//导出
function exportOrder(){
	var formId = $("#formId").val();
	window.location.href = contextPath + '/settle/franchiseSettle/exportSheet?page=FranchiseSettle&sheetNo='+formId;
}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/franchiseSettle/settleList";
}

//新增加盟店结算
function addFranchiseSetForm(){
	$_jxc.ajax({
    	url:contextPath+"/settle/franchiseSettle/checkAuditCount",
    	data:{}
    },function(result){
		if(result['code'] == 0){
			toAddTab("新增加盟店结算",contextPath + "/settle/franchiseSettle/settleAdd");
		}else{
			$_jxc.alert(result['message']);
		}
    });
}
