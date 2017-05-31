/**
 * Created by 
 * 加盟店费用-新增 修改
 */

//默认数据
var gridDefault = {
		amount:0,
		io:1
}
//列表数据查询url
var url = "";
var oldData = {};
var gridName = "franchiseChargeListAdd";
var pageStatus;
var branchId;


$(function(){
    pageStatus = $('#operateType').val();
	if(pageStatus === 'add'){
		  $("#payMoneyTime").val(new Date().format('yyyy-MM-dd')); 
		  $('#createTime').text(new Date().format('yyyy-MM-dd'))
	}else {
		var formId = $("#formId").val();
		url = contextPath+"/settle/franchiseCharge/getDetailList?formId="+formId;
		oldData = {
		    remark:$("#remark").val(),                  // 备注
		    payTime:$('#payMoneyTime').val()
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
        method:'get',
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
            {field:'io',title:'收支方式',width:'80px',align:'center',
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
                        data: [{
                        	"id":'1',
                            "text":"收入",
                        },{
                        	"id":'-1',
                        	"text":"支出",
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
	//-1 支出 1收入
	if((_io == -1 && parseFloat(vewV) > 0) || (_io == 1 && parseFloat(vewV) < 0) ){
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

function validateForm(branchId,payTime){
    if(!$.trim(branchId)){
    	$_jxc.alert('请选择机构!');
    	return false;
    }
    if(!payTime){
    	$_jxc.alert('付款日期不能为空');
    	return false;
    }
    return true;
}

//保存
function saveFraChargeOrder(){
	$("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
	var branchId = $('#branchId').val();
	var payTime = $('#payMoneyTime').val();
	if(!validateForm(branchId,payTime))return;
    var rows = gridHandel.getRowsWhere({label:'1'});
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
    	_rows.push({
    		payType:data.id,
    		io:data.io,
    		rowNo:i,
    		amount:data.amount,
    		remark:data.remark
    	})
    })
    
    var reqObj = {
    	id:$('#formId').val()||'',
    	franchiseBranchId:$('#branchId').val()||'',
    	branchCode:$('#branchCode').val()||'',
    	payTime:payTime||'',
    	formType:'FI',
    	remark:$('#remark').val()||'',
    	sumAmount:footRow[0].amount,
    	detailList:_rows
    }
    var url = $("#operateType").val() == 'add' ? contextPath+"/settle/franchiseCharge/chargeSave" : contextPath+"/settle/franchiseCharge/chargeUpdate";
    
    console.log('test',JSON.stringify(reqObj));
    gFunStartLoading();
    $.ajax({
        url:url,
        type:"POST",
        data:{"data":JSON.stringify(reqObj)},
        success:function(result){
        	gFunEndLoading();
            if(result['code'] == 0){
    			$.messager.alert("操作提示", "操作成功！", "info",function(){
    				location.href = contextPath +"/settle/franchiseCharge/chargeEdit?id="+result['formId'];
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
function auditFraChargeForm(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
    	remark:$("#remark").val(),                  // 备注
 		payTime:$('#payMoneyTime').val(),
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
		    	url : contextPath+"/settle/franchiseCharge/chargeAudit",
		    	type : "POST",
		    	data:{"formId":$('#formId').val()||''},
		    	success:function(result){
                    gFunEndLoading();
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/settle/franchiseCharge/chargeView?id=" + result["formId"];
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
function delFraChargeForm(){
	var ids = [];
	ids.push($("#formId").val());
	$.messager.confirm('提示','是否要删除单据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/settle/franchiseCharge/chargeDelete",
		    	type:"POST",
		    	dataType: "json",
		    	data:{"ids":ids},
		    	success:function(result){
		    		if(result['code'] == 0){
                        toRefreshIframeDataGrid("settle/franchiseCharge/chargeList","franchiseAdvMoneyList");
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
		$("#branchId").val(data.branchesId);
		$("#branchCode").val(data.branchCode);
		$("#targetBranchName").val("["+data.branchCode+"]"+data.branchName);
	},'FO',branchId);
}

//选择费用
function selectCharge(searchKey){
	var branchId = $('#branchId').val();
	var payTime = $('#payMoneyTime').val();
	if(!validateForm(branchId,payTime))return;
	
	var param = {
		key:searchKey,
		type:'101002'
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

//导出
function exportOrder(){
	
}

//返回列表页面
function back(){
	location.href = contextPath+"/settle/franchiseCharge/chargeList";
}

//新增加盟店费用
function addFraChargeForm(){
	toAddTab("新增加盟店费用",contextPath + "/settle/franchiseCharge/chargeAdd");
}
