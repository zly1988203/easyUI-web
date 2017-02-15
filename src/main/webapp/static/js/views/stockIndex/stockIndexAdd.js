/**
 * Created by zhanghuan on 2016/08/09.
 */
// datagridId datagrid的Id
var datagridId = "stockIndexAdd";

// 是否保存过添加的单据数据的标志位
var isClickSaveData = false;
// datagrid对象
var addModifyPriceGridDg;

var loginBranchId;

$(function() {
	loginBranchId = $("#loginBranchId").val();
	// 初始化表格
	initAddModifyPriceGridEdit();
	// 初始化复选框
	//initCheckbox();
	
	 if($("#close").val()){
	    	$("#addButton").addClass("unhide");
	    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
	    }
	
	var formNo = $("#formNo").text();
	if (formNo != null && formNo != '') {
		addModifyPriceGridDg.datagrid('options').queryParams = {
			formNo : formNo
		};
		addModifyPriceGridDg.datagrid('options').url = contextPath
			+ "/goods/priceAdjust/queryDetailsByformNo";
		addModifyPriceGridDg.datagrid('load');
	}

});
var gridDefault = {
//	oldPurPrice:0.00,
//	oldDcPrice:0.00,
//	oldVipPrice:0.00,
//	oldWsPrice:0.00,
//	oldSalePrice:0.00
}
var gridHandel = new GridClass();
// 初始化列表
function initAddModifyPriceGridEdit() {
	gridHandel.setGridName(datagridId);
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
	});
	addModifyPriceGridDg = $("#" + datagridId).datagrid({
				align : 'center',
				//toolbar: '#tb',     //工具栏 id为tb
		        singleSelect:false,  //单选  false多选
		        rownumbers:true,    //序号
		        pagination:true,    //分页
		        fitColumns:true,    //每列占满
		        //fit:true,            //占满
		        showFooter:true,
				height:'600px',
				width:'100%',
				data : [ {
					"rows" : [$.extend({},gridDefault)]
				} ],
				
				columns : [ [
					{
						field : 'ck',
						checkbox : true
					},
					{
						field : 'formId',
						hidden : true
					},
					{
						field : 'skuId',
						hidden : true
					},
					{
						field : 'cz',
						title : '操作',
						width : '60px',
						align : 'left',
						formatter : function(value, row, index) {
							var str = '<a name="add" class="add-line" data-index="'
								+ index
								+ '" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;'
								+ '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'
								+ index
								+ '" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
							return str;
						},
					}, {
						field : 'skuCode',
						title : '货号',
						width : '120px',
						align : 'left',
						editor : {
							type : 'textbox'
						}
					}, {
						field : 'skuName',
						title : '商品名称',
						width : '200px',
						align : 'left'
					}, {
						field : 'barCode',
						title : '条码',
						width : '130px',
						align : 'left'
					}, {
						field : 'spec',
						title : '规格',
						width : '90px',
						align : 'left'
					}, {
						field : 'unit',
						title : '单位',
						width : '60px',
						align : 'left'
					}, 
					{
						field : 'stockBegin',
						title : '库存上限',
						width : '100px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					},
					{
						field : 'stockEnd',
						title : '库存下限',
						width : '100px',
						align : 'right',
						formatter : function(value, row, index) {
							var str=0.0000;
							if(value){
								str= parseFloat(value).toFixed(4);
							}
		    				return str;
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
							}
						}
					}] ],
				onClickCell : function(rowIndex, field, value) {
					gridHandel.setBeginRow(rowIndex);
					gridHandel.setSelectFieldName(field);
					var target = gridHandel.getFieldTarget(field);
					if(target){
						gridHandel.setFieldFocus(target);
					}else{
						gridHandel.setSelectFieldName("skuCode");
					}
				},
				onLoadSuccess : function() {
					gridHandel.setDatagridHeader("center");
				}
			});
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
	selectGoodsDialog(searchKey);
}
/**
 * 商品选择
 */
function selectGoodsDialog(searchKey) {
	var branchId=null;
	//判定供应商是否存在
    if($("#branchId").val()==""){
        messager("请先选择机构");
        return;
    }
    branchId=$("#branchId").val();
	gFunGoodsSelect(searchKey,branchId);
    /*var bool = $("#branchId").val().indexOf(",");
    if(bool<0){
    	// 没有逗号表示机构id只有一个值 查询本机构中的商品
    	branchId=$("#branchId").val();
    	gFunGoodsSelect(searchKey,branchId);
    }else{
    	//查询登录机构下商品
    	branchId=loginBranchId;
    	gFunGoodsSelect(searchKey,branchId);
    }*/
}
//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){
	 new publicGoodsService('PC', function(data) {
			if(searchKey){
				$("#addModifyPriceGrid").datagrid("deleteRow", gridHandel.getSelectRowIndex());
				$("#addModifyPriceGrid").datagrid("acceptChanges");
			}
			var nowRows = gridHandel.getRowsWhere({'skuName':true});
			//var addDefaultData  = gridHandel.addDefault(data,gridDefault);
			var argWhere ={skuCode:true};  //验证重复性
			var keyNames = {
				//id : "skuId",
				purchasePrice : 'oldPurPrice',
				distributionPrice : 'oldDcPrice',
				vipPrice : 'oldVipPrice',
				wholesalePrice : 'oldWsPrice',
				salePrice : 'oldSalePrice',
				disabled :""
			};
			var keyNames2 = {
				oldPurPrice : 'newPurPrice',
				oldDcPrice : 'newDcPrice',
				oldVipPrice : 'newVipPrice',
				oldWsPrice : 'newWsPrice',
				oldSalePrice : 'newSalePrice'
			}
			var newData = gFunUpdateKey(data,keyNames);
			newData = gFunUpdateKey(newData,keyNames2);
			var newRows = gridHandel.checkDatagrid(nowRows,newData,argWhere);
			console.info(newRows)
			$("#addModifyPriceGrid").datagrid("loadData",newRows);
			  var fieldName = "";
			  var fieldNames = {
					  "purchasePrice":"newPurPrice",
					  "retailPrice":"newSalePrice",
					  "distributionPrice":"newDcPrice",
					  "tradePrice":"newWsPrice",
					  "memberPrice":"newVipPrice",
			  }
		      $('.priceItem:checked').each(function(i){
		    	  debugger;
		       if(0==i){
		    	   fieldName =fieldNames[$(this).attr("id")] ;
		       }
		      });
			  debugger;
		      if(fieldName){
		    	  gridHandel.setLoadFocus();
			        setTimeout(function(){
			            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
			            gridHandel.setSelectFieldName(fieldName);
			            gridHandel.setFieldFocus(gridHandel.getFieldTarget(fieldName));
			        },100)
		      }
	      
		},searchKey,0,"","",branchId,"");	
}


/**
 * 重置
 */
var resetForm = function(){
	 $("#searchForm").form('clear');
};

/**
 * 导入
 */
function toImportproduct(type){
    var branchId = $("#createBranchId").val();
    if(!branchId){
        messager("请先选择机构");
        return;
    }
    var param = {
        url:contextPath+"/goods/priceAdjust/importList",
        tempUrl:contextPath+'/goods/priceAdjust/exportTemp',
        type:type,
        branchId:branchId,
    }
    new publicUploadFileService(function(data){
        updateListData(data);
    },param)
}

function updateListData(data){
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var addDefaultData  = gridHandel.addDefault(data,gridDefault);
    var keyNames = {
    		purchasePrice : 'oldPurPrice',
    		salePrice:'oldSalePrice',
    		wholesalePrice:'oldWsPrice',
    		vipPrice:'oldVipPrice',
    		distributionPrice:'oldDcPrice'
    };
    var rows = gFunUpdateKey(addDefaultData,keyNames);
    if(data.length>0){
    	var obj = data[0];
    	var arrKey = [
    	              {"newPurPrice":"purchasePrice"},
    	              {"newSalePrice":"retailPrice"},
    	              {"newDcPrice":"distributionPrice"},
    	              {"newWsPrice":"tradePrice"},
    	              {"newVipPrice":"memberPrice"}
    	             ]
    	$.each(obj,function(key,val){
			var d = obj;
			var c = key;
    		$.each(arrKey,function(i,item){
    			if(item[key]&&obj[key]){
    				$("#"+item[key]).attr("checked","checked");
    				 datagridUtil.isCheckBoxChecked(item[key]);
    			}
    		})
    	})
    }
    
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

    $("#addModifyPriceGrid").datagrid("loadData",newRows);
}

/**
 * 机构名称
 */
function selectBranch(){
	new publicAgencyService(function(data){
		$("#createBranchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//返回列表页面
function back(){
	toClose();
}
