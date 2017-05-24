/**
 * Created by 
 * 供应商预付款-新增 修改
 */

//默认数据
var gridDefault = {
		amount:0,
		io:-1
}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "supplierAdvMoneyListAdd";
var pageStatus;
var editRowData = null;
var targetBranchId;


$(function(){
    pageStatus = $('#operateType').val();
	if(pageStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
		  $('#createTime').text(new Date().format('yyyy-MM-dd'))
	}else {
		var formId = $("#formId").val();
		url = contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverFormId="+formId+"&deliverType=DA";
		oldData = {
		        targetBranchId:$("#targetBranchId").val(), // 要活分店id
		        remark:$("#remark").val(),                  // 备注
		        formNo:$("#formNo").val(),                 // 单号
		}
	}
	initSupAdvMonAdd();
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
function initSupAdvMonAdd(){
    gridHandel.setGridName(gridName);
    gridHandel.initKey({
        firstName:'value',
        enterName:'value',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
                setTimeout(function(){
                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
                    gridHandel.setSelectFieldName("io");
                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('io'));
                },100)
            }else{
            	selectCharge(arg);
            }
        },
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
			{field:'cz',title:'操作',width:'60px',align:'center',
			    formatter : function(value, row,index) {
			        var str = "";
			        if(row.isFooter){
			            str ='<div class="ub ub-pc">合计</div> '
			        }else{
			            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
			                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
			        }
			        return str;
			    }
			},
            {field:'id',hidden:'true'},
            {field:'value',title:'编号',width: '100px',align:'left',editor:'textbox'},
            {field:'label',title:'名称',width:'200px',align:'left'},
            {field:'io',title:'收支方式',width:'80px',align:'left',
            	formatter:function(value,row){
            		if(row.isFooter){
            			return "";
            		}
                    return value=='-1'?'支出':(value=='1'?'收入':'请选择');
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField: 'id',
                        textField: 'text',
                        editable:false,
//                        required:true,
                        data: [{
                            "id":'-1',
                            "text":"支出",
                        },{
                            "id":'1',
                            "text":"收入",
                        }],
                        onSelect:onSelect
                    }
                }
            },
            {field:'amount',title:'费用金额',width:'100px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!row.amount){
                    	row.amount = parseFloat(value||0).toFixed(4);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
//                        disabled:true,
//                        min:0,
                        precision:4,
                        onChange: onChangeAmount,
                    }
                }
            },
            {field:'remark',title:'备注',width:'250px',align:'left',editor:'textbox'}
        ]],
        onClickCell:function(rowIndex,field,value){
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("value");
            }
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
    
    if(pageStatus=='add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}

var editFlag = 'numberbox';

//选择收支方式
function onSelect(data){
	editFlag = 'select';
	var _io = parseFloat(data.id);
	var _amount = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'amount');
	gridHandel.setFieldsData({io:_io});
	gridHandel.setFieldValue('amount',(parseFloat(_amount)*-1).toFixed(4));
	
}

//编辑金额
function onChangeAmount(vewV,oldV){
	var _io = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'io');
	//支出
	if((_io == -1 && parseFloat(vewV) > 0) || (_io == 1 && vewV < 0) ){
		gridHandel.setFieldValue('amount',parseFloat(vewV*-1).toFixed(4));  
		return;
	}
	updateFooter()
}
//合计
function updateFooter(){
    var fields = {amount:0};
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

function validateForm(branchId,payTime,supplierId){
    if(!$.trim(branchId)){
    	$_jxc.alert('请选择机构!');
    	return false;
    }
    if(!payTime){
    	$_jxc.alert('付款日期不能为空');
    	return false;
    }
    if(!supplierId){
    	$_jxc.alert('请选择供应商!');
    	return false;
    }
    return true;
}

//保存
function saveSupAdvMonOrder(){
	$("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
	var branchId = $('#targetBranchId').val();
	var payTime = $('#payMoneyTime').val();
	var supplierId = $('#supplierId').val();
	if(!validateForm(branchId,payTime,supplierId))return;
    var rows = gridHandel.getRowsWhere({label:'1'});
    if(rows.length==0){
    	$_jxc.alert("表格不能为空");
        return;
    }
    
    var footRow = gridHandel.getFooterRow();
    if(footRow.length <= 0 && footRow[0].amount ==0 ){
    	$_jxc.alert("合计该单据不能为零，请修改。");
    	return;
    }
    
    var _rows = [];
    $.each(rows,function(i,data){
    	_rows.push({
    		costTypeId:data.id,
    		io:data.io,
    		rowNo:i,
    		amount:data.amount,
    		remark:data.remark
    	})
    })
    
    var reqObj = {
    	branchId:$('#targetBranchId').val()||'',
    	branchCode:$('#branchCode').val()||'',
    	payTime:payTime||'',
    	formType:'FY',
    	supplierId:supplierId||'',
    	remark:$('#remark').val()||'',
		operateType : $("#operateType").val() == 'add' ? 1 : 2,
    	sumAmount:footRow[0].amount,
    	detailList:_rows
    }
    
    console.log('reqObj',reqObj);
    $.ajax({
        url:contextPath+"/settle/supplierCharge/saveChargeForm",
        type:"POST",
        data:{"data":JSON.stringify(reqObj)},
        success:function(result){
        	gFunEndLoading();
            if(result['code'] == 0){
    			$.messager.alert("操作提示", "操作成功！", "info",function(){
    				location.href = contextPath +"/settle/supplierCharge/advanceEdit?id="+result['formId'];
    			});
            }else{
                gFunEndLoading();
                successTip(result['message']);
            }
        },
        error:function(result){
            gFunEndLoading();
            successTip("请求发送失败或服务器处理失败");
        }
    });
	
}

//审核
function auditChargeForm(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
        targetBranchId:$("#targetBranchId").val(), // 要活分店id
        sourceBranchId:$("#sourceBranchId").val(), //发货分店id
        validityTime:$("#validityTime").val(),      //生效日期
        remark:$("#remark").val(),                  // 备注
        formNo:$("#formNo").val(),                 // 单号
        grid: $.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(!gFunComparisonArray(oldData,newData)){
        messager("数据有修改，请先保存再审核");
        return;
    }
	var branchId = $('#targetBranchId').val();
	var payTime = $('#payMoneyTime').val();
	var supplierId = $('#supplierId').val();
	var chargeId = $('#chargeId').val();
    var reqObj = {
    	id:chargeId,
    	branchId:$('#targetBranchId').val()||''
    }
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
            gFunStartLoading();
			$.ajax({
		    	url : contextPath+"/settle/supplierCharge/auditChargeForm",
		    	type : "POST",
		    	data:{"data":JSON.stringify(jsonData)},
		    	success:function(result){
                    gFunEndLoading();
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/settle/supplierCharge/advanceView?id=" + result["formId"];
		    			});
		    		}else{
		            	new publicErrorDialog({
                            width:380,
                            height:220,
		            		"title":"审核失败",
		            		"error":result['message']
		            	});
		    		}
		    	},
		    	error:function(result){
                    gFunEndLoading();
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//删除
function delSupAdvMonForm(){
	var ids = [];
	ids.push($("#formId").val());
	$.messager.confirm('提示','是否要删除单据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/settle/supplierCharge/deleteChargeForm",
		    	type:"POST",
		    	contentType:"application/json",
		    	data:JSON.stringify(ids),
		    	success:function(result){
		    		if(result['code'] == 0){
                        toRefreshIframeDataGrid("settle/supplierCharge/advanceList","supplierAdvMoneyList");
		    			toClose();
		    		}else{
		    			successTip(result['message']);
		    		}
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}

//机构
function selectBranches(){
	new publicAgencyService(function(data){
		$("#targetBranchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
	},'',targetBranchId);
}

//选择供应商
function selectSupplier(){
    new publicSupplierService(function(data){
    	$("#supplierId").val(data.id);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);	
    });
}

//选择费用
function selectCharge(searchKey){
	var branchId = $('#targetBranchId').val();
	var payTime = $('#payMoneyTime').val();
	var supplierId = $('#supplierId').val();
	if(!validateForm(branchId,payTime,supplierId))return;
	
	var param = {
		key:searchKey,
		type:'101001'
	};
	publicCostService(param,function(data){
		console.log('data',data);
		var nowRows = gridHandel.getRowsWhere({label:'1'});
		var addDefaultData = gridHandel.addDefault(data,gridDefault);
		var keyNames = {};
		var rows = gFunUpdateKey(addDefaultData,keyNames);
		var newRows = gridHandel.checkDatagrid(nowRows,rows,{},{});
		$("#"+gridName).datagrid("loadData",newRows);
		gridHandel.setLoadFocus();
		setTimeout(function(){
	        gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
	        gridHandel.setSelectFieldName("io");
	        gridHandel.setFieldFocus(gridHandel.getFieldTarget('io'));
	    },100)
	});
}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/supplierCharge/advanceList";
}

//新增供应商预付款
function addSupAdvMonForm(){
	toAddTab("新增供应商预付款",contextPath + "/settle/supplierCharge/advanceAdd");
}
