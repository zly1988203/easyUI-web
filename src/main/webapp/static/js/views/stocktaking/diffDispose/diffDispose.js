var gridName = "operateGrid";
var isdisabled = false;
var url;
var operateStatus = 'add';
var oldData;
$(function(){
    oldData = {
    		differenceReason:$("#differenceReason").val()
    }
	operateStatus = $('#disposeStatus').val();
	var batchId = $('#batchId').val();
	if(operateStatus === 'add'){
	
	}else if(operateStatus === '0'){
		url = contextPath +"/stocktaking/diffDispose/stocktakingDifferenceList?batchId=" + batchId;
		$('#already-examine').css('display','none');
		$('#btnCheck').css('display','block');
	
	}else if(operateStatus === '1'){
		url = contextPath +"/stocktaking/diffDispose/stocktakingDifferenceList?batchId=" + batchId;
		isdisabled = true;
		$('#already-examine').css('display','block');
		$('#btnCheck').css('display','none');
        $('#btnSave').css('display','none');
        $('#btndelete').css('display','none');
	}
	initOperateDataGrid();
 }
)

var gridHandel = new GridClass();
function initOperateDataGrid(){
	 gridHandel.setGridName(gridName);
	    gridHandel.initKey({
	        firstName:'skuCode',
	        enterName:'skuCode',
	        enterCallBack:function(arg){
	            if(arg&&arg=="add"){
	                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
	                setTimeout(function(){
	                    gridHandel.setBeginRow(gridHandel.getSelectRowIndex()+1);
	                    gridHandel.setSelectFieldName("skuCode");
	                    gridHandel.setFieldFocus(gridHandel.getFieldTarget('skuCode'));
	                },100)
	            }else{
	            	branchId = $("#sourceBranchId").val();
	                selectGoods(arg);
	            }
	        },
	    })
	    
	    $("#"+gridName).datagrid({
        method:'get',
    	url:url,
        align:'center',
        singleSelect:false,  // 单选 false多选
        rownumbers:true,    // 序号
        showFooter:true,
        height:'100%',
        width:'100%',
        columns:[[
			{field:'handle',checkbox:true,hidden:isdisabled,
			    formatter : function(value, row,index) {
			        return true;
			    }
			},
            {field:'skuId',hidden:'true'},
            {field:'barCode',hidden:'true'},
            {field:'skuCode',title:'货号',width: '100px',align:'left',
			    formatter : function(value, row,index) {
			        var str = "";
			        if(row.isFooter){
			            str ='<div class="ub ub-pc">合计</div> '
			        }else{
			            str = value;
			        }
			        return str;
			    }
            },
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'snapshootStockNum',title:'系统库存',width:'100px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["snapshootStockNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'stocktakingNum',title:'盘点数量',width:'100px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["stocktakingNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'profitLossNum',title:'盈亏数量',width:'100px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["profitLossNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'differenceReason',title:'差异原因',width:'200px',align:'left',
            	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
            	}},
            {field:'snapshootCostPrice',title:'原库存成本价',width:'200px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["snapshootCostPrice"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'costAmount',title:'原库存金额（成本价）',width:'200px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["costAmount"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'stocktakingCostAmount',title:'盘点金额（成本价）',width:'200px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["stocktakingCostAmount"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'profitLossCostAmount',title:'盈亏金额（成本价）',width:'200px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["profitLossCostAmount"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
            {field:'profitLossSaleAmount',title:'盈亏金额（售价）',width:'200px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["profitLossSaleAmount"] = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
			},
        ]],
        onCheck:function(rowIndex,rowData){
        	rowData.handle = '1';
        },
        onUncheck:function(rowIndex,rowData){
        	rowData.handle = '0';
        },
        onClickCell:function(rowIndex,field,value){
            gridHandel.setBeginRow(rowIndex);
            gridHandel.setSelectFieldName(field);
            var target = gridHandel.getFieldTarget(field);
            if(target){
                gridHandel.setFieldFocus(target);
            }else{
                gridHandel.setSelectFieldName("skuCode");
            }
        },
        onLoadSuccess:function(data){
        	if(!oldData["grid"]){
            	oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
            		return $.extend(true,{},obj);//返回对象的深拷贝
            	});
            }
        	var rowData = data.rows;  
            $.each(rowData,function(idx,val){//遍历JSON  
                  if(val.handle==='1'){  
                    $("#"+gridName).datagrid("selectRow", idx);//如果数据行为已选中则选中改行  
                  }  
            }); 
            
            gridHandel.setDatagridHeader("center");
        
            updateFooter();
        },
    });
    
    if(operateStatus === 'add'){
    	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
    	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
    }
}


// 合计
function updateFooter(){
    var fields = {snapshootStockNum:0,stocktakingNum:0,profitLossNum:0,
        snapshootCostPrice:0,costAmount:0,
        stocktakingCostAmount:0,profitLossCostAmount:0,profitLossSaleAmount:0,isGift:0, };
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}

//删除
function deleteDiffDispose(){
	var batchId = $("#batchId").val();
	var ids = [batchId];
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/stocktaking/diffDispose/deleteStocktakingBatch",
		    	type:"POST",
		    	data:{
		    		ids : ids
		    	},
		    	success:function(result){
		    		successTip(result['message']);
		    		if(result['code'] == 0){
		    			back();
		    		}
		    	},
		    	error:function(result){
		    		successTip("请求发送失败或服务器处理失败");
		    	}
		    });
		}
	});
}
/**
 * 关闭
 */
function back(){
	toClose();
}

/**
 * 打印
 */
function printDiffDispose(){
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		$.messager.alert('提示',"没有数据");
		return;
	}
	var fromObjStr = $('#searchForm').serializeObject();
	console.log(fromObjStr);
	var param=setParams("searchForm");
	console.log(param);
	parent.addTabPrint("差异详情","打印",contextPath+"/stocktaking/diffDispose/printDiffDispose?" + param);
}

function setParams(formId){  
	var param="";
	var arr = $('#' + formId).serializeArray();
	if(arr != null){
		for(var i=0;i<arr.length;i++){
			var _val = encodeURIComponent(arr[i].value);
			if(_val){
				param = param + arr[i].name + "="+_val+"&";
			}
		}
	}
	if(param){
		param = param.substring(0,param.length-1);
	}
	return param;
}

function saveDiffDispose(){
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    
    var isCheckResult = true;
    var isChcekPrice = false;
    
    if(isCheckResult){
        if(isChcekPrice){
            $.messager.confirm('系统提示',"盘点数存在为0，是否确定保存",function(r){
                if (r){
                    saveDataHandel(rows);
                }
            });
        }else{
            saveDataHandel(rows);
        }
    }
}

function saveDataHandel(rows){
	//批次Id
	var batchId=$("#batchId").val();
    //机构
    var branchId=$("#branchId").val();
    
    var jsonData = {
    		id:batchId,
			branchId:branchId,
			diffDetailList:rows
        };
    console.log('差异处理详情：',JSON.stringify(jsonData));
    $.ajax({
        url:contextPath+"/stocktaking/diffDispose/saveDiffDispose",
        type:"POST",
        data:{"data":JSON.stringify(jsonData)},
        success:function(result){
        	console.log('result',result);
            if(result['code'] == 0){
    			$.messager.alert("操作提示", "操作成功！", "info",function(){
    				location.href = contextPath +"/stocktaking/diffDispose/stocktakingBatchView?id="+result['batchId'];
    			});
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

//审核
function auditDiffDispose(){
	var rows = gridHandel.getRows();
	//批次Id
	var batchId=$("#batchId").val();
    //机构
    var branchId=$("#branchId").val();
    
    var jsonData = {
    		id:batchId,
			branchId:branchId,
			diffDetailList:rows
        };
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
		    	url : contextPath+"/stocktaking/diffDispose/auditDiffDispose",
		    	type : "POST",
		    	data:{"data":JSON.stringify(jsonData)},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/stocktaking/diffDispose/stocktakingBatchView?id="+result['batchId'];
		    			});
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
