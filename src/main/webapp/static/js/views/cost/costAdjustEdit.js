/**
 * Created by wxl on 2016/10/12.
 * 成本调整单-编辑
 */
$(function(){
	initDatagridEditRequireOrder();
	$("div").delegate("button","click",function(){
		$("p").slideToggle();
	});
	oldData = {
			branchId:$("#branchId").val(), // 机构id
			remark:$("#remark").val(),      // 备注
			adjustNo:$("#adjustNo").val(),   // 单号
			id:$("#adjusId").val(),          // id          
	}
});
var gridDefault = {
		//receiveNum:0,
		largeNum:0,
		isGift:0,
}
var oldData = {};
var gridHandel = new GridClass();
function initDatagridEditRequireOrder(){
	gridHandel.setGridName("gridEditRequireOrder");
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
				selectGoods(arg);
			}
		},
	})
	var dataId= $("#adjusId").val();
	$("#gridEditRequireOrder").datagrid({
		//title:'普通表单-用键盘操作',
		method:'post',
		url:contextPath+"/cost/costAdjust/queryCostFormDetailList?id="+dataId,
		align:'center',
		//toolbar: '#tb',     //工具栏 id为tb
		singleSelect:false,  //单选  false多选
		rownumbers:true,    //序号
		//pagination:true,    //分页
		//fitColumns:true,    //占满
		showFooter:true,
		height:'100%',
		width:'100%',
		columns:[[
		          {field:'ck',checkbox:true},
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
		        	  },
		          },
		          {field:'skuCode',title:'货号',width:'70px',align:'left',editor:'textbox'},
		          {field:'skuName',title:'商品名称',width:'200px',align:'left'},
		          {field:'barCode',title:'国际条码',width:'150px',align:'left'},
		          {field:'unit',title:'单位',width:'60px',align:'left'},
		          {field:'spec',title:'规格',width:'90px',align:'left'},
		          {field:'oldCostPrice',title:'旧价',width:'80px',align:'right',
		        	  formatter:function(value,row,index){
		        		  if(row.isFooter){
		        			  return
		        		  }
		        		  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	  },
		        	  editor:{
		        		  type:'numberbox',
		        		  options:{
		        			  disabled:true,
		        			  min:0,
		        			  precision:2,

		        		  }
		        	  },
		          },
		          {field:'costPrice',title:'新价',width:'80px',align:'right',
		        	  formatter:function(value,row,index){
		        		  if(row.isFooter){
		        			  return
		        		  }
		        		  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	  },
		        	  editor:{
		        		  type:'numberbox',
		        		  options:{
		        			  //disabled:true,
		        			  min:0,
		        			  precision:4,
		        			  onChange: onChangeCostPrice,

		        		  }
		        	  },
		          },
		          {field:'actual',title:'当前库存',width:'80px',align:'right',
		        	  formatter:function(value,row){
		        		  if(row.isFooter){
		        			  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		  }
		        		  if(!value||value==""||parseFloat(value)==0.0){
		        			  row["actual"] = row["dealNum"];
		        			  value = row["actual"];
		        		  }
		        		  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	  },
		        	  editor:{
		        		  type:'numberbox',
		        		  value:'0',
		        		  options:{
		        			  disabled:true,
		        			  min:0,
		        			  precision:4,

		        		  }
		        	  },
		          },
		          {field:'diffMoney',title:'调价差额',width:'80px',align:'right',
		        	  formatter:function(value,row,index){
		        		  if(row.isFooter){
		        			  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        		  }
		        		  return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
		        	  },
		        	  editor:{
		        		  type:'numberbox',
		        		  options:{
		        			  disabled:true,
		        			  min:0,
		        			  precision:2,
		        		  }
		        	  },

		          },
		          {field: 'adjustReason', title: '调整原因', width: '200px', align: 'left',editor:'textbox'},
		          {field:'remark',title:'备注',width:'200px',align:'left',editor:'textbox'}
		          ]],
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
		        	  gridHandel.setDatagridHeader("center");
		        	  updateFooter();
		          }
	});

}

//监听新价
function onChangeCostPrice(newV,oldV) {
	//获取差额
	var actual = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'actual')||0;
	var oldCostPrice = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'oldCostPrice')||0;
	var CostPrice = newV;
	gridHandel.setFieldValue('diffMoney',(parseFloat(actual)*(parseFloat(newV)-parseFloat(oldCostPrice)).toFixed(2)));
	updateFooter();
}

//合计
function updateFooter(){
	var fields = {actual:0,diffMoney:0,isGift:0, };
	var argWhere = {name:'isGift',value:0}
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
//选择商品
function selectGoods(searchKey){
	var branchId = $("#branchId").val();
	//判定发货分店是否存在
	if(branchId==""){
		messager("请先选择机构名称");
		return;
	}
    new publicGoodsService("",function(data){
        if(searchKey){
            $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#gridEditOrder").datagrid("acceptChanges");
        }
        selectStockAndPrice(branchId,data);
  
    },searchKey,0,'','',branchId);
}
//查询价格、库存
function selectStockAndPrice(branchId,data){
	var GoodsStockVo = {
			branchId : branchId,
			fieldName : 'id',
			goodsSkuVo : [],
		}; 
	$.each(data,function(i,val){
		var temp = {
				id : val.skuId
		};
		GoodsStockVo.goodsSkuVo[i] = temp;
		
	});
	$.ajax({
    	url : contextPath+"/goods/goodsSelect/selectStockAndPriceToDo",
    	type : "POST",
    	data : {
    		goodsStockVo : JSON.stringify(GoodsStockVo)
    	},
    	success:function(result){
    		setDataValue(result);
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}
//二次查询设置值
function setDataValue(data) {
	for(var i in data){
    	var rec = data[i];
    	rec.remark = "";
    }
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var addDefaultData  = gridHandel.addDefault(data,gridDefault);
    var keyNames = {
		distributionPrice:'price',
        id:'skuId',
        disabled:'',
        io:'',
        inputTax:'tax',
        costPrice:'oldCostPrice'
    };
    var rows = gFunUpdateKey(addDefaultData,keyNames);
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
    $("#gridEditOrder").datagrid("loadData",newRows);
    setTimeout(function(){
        gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
        gridHandel.setSelectFieldName("largeNum");
        gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
    },100)
}

//保存
function editsaveOrder(){

	//调价差价
	var totalMoney=0;

	var dataId= $("#adjusId").val();
	// 机构id
	var branchId = $("#branchId").val();
	//reason 原因 
	var adjustReason=$("#adjustReason").val();
	// 备注
	var remark = $("#remark").val();
	//单号
	var adjustNo= $("#adjustNo").val();
	//单号
	var createTime=formatDate($("#createTime").val());
	//单号
	var createUserId= $("#createUserId").val();
	
	var status= $("#status").val();
	//验证表格数据
	$("#"+gridHandel.getGridName()).datagrid("endEdit", gridHandel.getSelectRowIndex());

	var footerRows = $("#"+gridHandel.getGridName()).datagrid("getFooterRows");
	if(footerRows){
		totalMoney = parseFloat(footerRows[0]["diffMoney"]||0.0).toFixed(4);
	}

	var rows = gridHandel.getRows();
	if(rows.length==0){
		messager("表格不能为空");
		return;
	}
	var isCheckResult = true;
	$.each(rows,function(i,v){
		if(!v["skuCode"]){
			messager("第"+(i+1)+"行，货号不能为空");
			isCheckResult = false;
			return false;
		};
		if(!v["skuName"]){
			messager("第"+(i+1)+"行，名称不能为空");
			isCheckResult = false;
			return false;
		};
		if(v["costPrice"]<=0){
			messager("第"+(i+1)+"行，新价必须大于0");
			isCheckResult = false;
			return false;
		}
	});
	if(!isCheckResult){
		return;
	}

	var saveData = JSON.stringify(rows);
	var jsonData = {
			stockCostFormDetailList:[],
			stockCostForm:{
				adjustNo:adjustNo,
				branchId:branchId,
				adjustReason:adjustReason,
				remark:remark,
				id:dataId, 
				createTime:createTime,
				createUserId:createUserId,
				status:status
			}
	};
	$.each(rows,function(i,data){
		var temp = {
				actual: data.actual,
				costPrice:data.costPrice,
				diffMoney:data.diffMoney,
				remark : data.remark,
				skuCode : data.skuCode,
				skuId:data.skuId,
				adjustReason:data.adjustReason
		}
		jsonData.stockCostFormDetailList[i] = temp;
	});
	console.log(jsonData);
	$.ajax({
		url:contextPath+"/cost/costAdjust/updateCostForm",
		type:"POST",
		data:{"jsonData":JSON.stringify(jsonData)},
		success:function(result){
			if(result['code'] == 0){
				oldData = {
						branchId:$("#branchId").val(), // 机构id
						remark:$("#remark").val(),                  // 备注
				}
				oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
					return $.extend(true,{},obj);//返回对象的深拷贝
				});
				$.messager.alert("操作提示", "操作成功！", "info");
				 toBack();
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
function costcheck(){
	var dataId= $("#adjusId").val();
	//验证数据是否修改
	$("#"+gridHandel.getGridName()).datagrid("endEdit", gridHandel.getSelectRowIndex());
	var newData = {
			branchId:$("#branchId").val(), // 机构id
			remark:$("#remark").val(),      // 备注
			adjustNo:$("#adjustNo").val(),   // 单号
			id:$("#adjusId").val(),          // 单号
			grid:gridHandel.getRows(),
	}

	if(!gFunComparisonArray(oldData,newData)){
		messager("数据已修改，请先保存再审核");
		return;
	}
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
				url : contextPath+"/cost/costAdjust/check",
				type : "POST",
				data:{"id":dataId},
				success:function(result){
					console.log(result);
					if(result['code'] == 0){
						$.messager.alert("操作提示", "操作成功！", "info",function(){
							toBack();
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

//删除
function delCostForm(){
	var dataId= $("#adjusId").val();
	$.messager.confirm('提示','是否要删除此条数据',function(data){
		if(data){
			$.ajax({
				url:contextPath+"/cost/costAdjust/deleteCostForm",
				type:"POST",
				data:{"id":dataId},
				success:function(result){
					console.log(result);
					if(result['code'] == 0){
						successTip("删除成功");
						toBack();
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

//合计
function toFooter(){
	$('#gridEditRequireOrder').datagrid('reloadFooter',[{"isFooter":true,"receivablesAccount":$('#receivablesAccount').val()||0,"collectAccount":$('#collectAccount').val()||0}]);
}

/**
 * 机构名称
 */
function searchBranch (){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	});
}

function loadLists(referenceId){
	$("#gridEditRequireOrder").datagrid("options").method = "post";
	$("#gridEditRequireOrder").datagrid('options').url = contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverFormId="+referenceId;
	$("#gridEditRequireOrder").datagrid('load');
}

function toBack(){
	location.href = contextPath+"/cost/costAdjust/view";
}
/**
 * 导入
 */
function importHandel(){
	postelsxDeliver('gridEditOrder','/goods/goodsSelect',$("#sourceBranchId").val(),$("#targetBranchId").val(),"DA");
}

/**
 * 获取导入的数据
 * @param data
 */
function getImportData(data){
	$.each(data,function(i,val){
		data[i]["oldPurPrice"] = data[i]["purchasePrice"];
		data[i]["oldSalePrice"]=data[i]["salePrice"];
		data[i]["oldWsPrice"]=data[i]["wholesalePrice"];
		data[i]["oldVipPrice"]=data[i]["vipPrice"];
		data[i]["oldDcPrice"]=data[i]["distributionPrice"];
		data[i]["price"] = data[i]["oldPurPrice"];
		data[i]["receiveNum"]=data[i]["receiveNum"]||0;

		data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["receiveNum"]||0);
		if(parseInt(data[i]["distributionSpec"])){
			data[i]["largeNum"]  = (parseFloat(data[i]["receiveNum"]||0)/parseFloat(data[i]["distributionSpec"])).toFixed(4);
		}else{
			data[i]["largeNum"]  =  0;
			data[i]["distributionSpec"] = 0;
		}

	});
	var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	var argWhere ={skuCode:1};  //验证重复性
	var newRows = gridHandel.checkDatagrid(nowRows,data,argWhere,{});

	$("#"+gridHandel.getGridName()).datagrid("loadData",newRows);
	messager("导入成功");
}
//导出
function exportExcel(){
	var length = $("#gridEditRequireOrder").datagrid('getData').total;
	if(length == 0){
		$.messager.alert("提示","无数据可导");
		return;
	}
	if(length>10000){
		$.messager.alert('提示',"当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#searchForm").form({
		success : function(data){
			if(data==null){
				$.messager.alert('提示',"导出数据成功！");
			}else{
				$.messager.alert('提示',JSON.parse(data).message);
			}
		}
	});
	$("#searchForm").attr("action",contextPath+"/cost/costAdjust/exportGoods");
	$("#searchForm").submit();
	
}

