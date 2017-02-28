/**
 * Created by zhanghuan on 2016/08/09.
 */
// datagridId datagrid的Id
var datagridId = "stockIndexAdd";

// 是否保存过添加的单据数据的标志位
var isClickSaveData = false;
// datagrid对象
var addStockIndexGridDg;
var loginBranchId;
var maxNum = 999999.99;
var selectIndex = 0;
var clickCellFlag = false;
$(function() {
	loginBranchId = $("#loginBranchId").val();
	// 初始化表格
	initStockIndexGridEdit();
	 if($("#close").val()){
    	$("#addButton").addClass("unhide");
    	$("#toBackByJSButton").attr("onclick","window.parent.closeTab()");
    }
	
});

function changeUppermit(newV,oldV){
	if(parseFloat(newV) > maxNum){
		messager('库存上限输入值最大为  '+maxNum);
		return;
	}
	
	$("#"+datagridId).datagrid("endEdit", selectIndex);
	if((parseFloat(newV) > 0) && checkUpLowLimit()){
		specialRows('upperLimit',newV);
	}
	
}

function changeLowerLimit(newV,oldV){
	if(parseFloat(newV) > maxNum){
		messager('库存下限输入值最大为  '+maxNum);
		return;
	}
	$("#"+datagridId).datagrid("endEdit", selectIndex);
	if((parseFloat(newV) > 0) && checkUpLowLimit()){
		specialRows('lowerLimit',newV);
	}
}

function checkUpLowLimit(){
	var rows = gridHandel.getRowsWhere({skuName:'1'});
	if(rows.length <1){
		return false;
	}
	return true;
}


var gridDefault = {
	lowerLimit:0,
	upperLimit:0,
	isGift:0,
}
var gridHandel = new GridClass();
// 初始化列表
function initStockIndexGridEdit() {
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
	addStockIndexGridDg = $("#" + datagridId).datagrid({
				align : 'center',
		        singleSelect:false,  //单选  false多选
		        rownumbers:true,    //序号
		        pagination:false,    //分页
		        fitColumns:true,    //每列占满
		        showFooter:true,
		        height:'100%',
				width:'100%',
				data : [ {
					"rows" : [$.extend({},gridDefault)]
				} ],
				
				columns : [ [
					{
						field : 'brandId',
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
						field : 'skuSpec',
						title : '规格',
						width : '90px',
						align : 'left'
					}, {
						field : 'skuUnit',
						title : '单位',
						width : '60px',
						align : 'left'
					}, 
					{
						field : 'upperLimit',
						title : '库存上限',
						width : '100px',
						align : 'right',
						formatter : function(value, row, index) {
							if(row.validFlag){
								return '<b style="color:#f00">'+parseFloat(value||0).toFixed(2)+'</b>';
							}else{
								return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
							}
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
								onChange: onChangeStockBegin,
							}
						}
					},
					{
						field : 'lowerLimit',
						title : '库存下限',
						width : '100px',
						align : 'right',
						formatter : function(value, row, index) {
		    				if(row.validFlag){
								return '<b style="color:#f00">'+parseFloat(value||0).toFixed(2)+'</b>';
							}else{
								return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
							}
		    			},
						editor : {
							type : 'numberbox',
							options : {
								min:0,
								precision:4,
								onChange: onChangeStockEnd,
							}
						}
					}] ],
				onClickCell : function(rowIndex, field, value) {
					selectIndex = rowIndex;
					clickCellFlag = true;
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
	gridHandel.setLoadData([$.extend({},gridDefault)]);
}


function onChangeStockBegin(newV,oldV){
	if(clickCellFlag){
	    clickCellFlag = false;
		return;
	}
	
	if(parseFloat(newV) > maxNum ){
		messager('库存上限输入值最大为  '+maxNum);
		return;
	}
	
	var cuRindex = gridHandel.getSelectRowIndex();
	var curLowLimit = gridHandel.getFieldValue(cuRindex,'lowerLimit');
	if(parseFloat(newV) < parseFloat(curLowLimit) ){
		successTip('库存上限不能小于库存下限');
		//$(this).numberbox('setValue',oldV);
		return;
	}
	
	var newData = $("#"+datagridId).datagrid("getRows")[selectIndex];
	newData.validFlag = false;
	
}

function onChangeStockEnd(newV,oldV){
	if(clickCellFlag){
	    clickCellFlag = false;
		return;
	}
	if(parseFloat(newV) > maxNum ){
		messager('库存下限输入值最大为  '+maxNum);
		return;
	}
	
	var curRindex = gridHandel.getSelectRowIndex();
	var curUpVal = gridHandel.getFieldValue(curRindex,'upperLimit');	
	if(parseFloat(newV) > parseFloat(curUpVal)){
		successTip('库存上限不能小于库存下限');
		//$(this).numberbox('setValue',oldV);
		return;
	}
	
	var newData = $("#"+datagridId).datagrid("getRows")[selectIndex];
	newData.validFlag = false;
	
}

//批量设置
function specialRows(id,val){
	// 获取选中行的Index的值 $('#lowerLimit,#upperLimit')
	var rowIndex = -1;
	var newData = $("#"+datagridId).datagrid("getRows");
	var errorIndex = [];
	if(id=="lowerLimit"){
		for(var i = 0;i < newData.length;i++){
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			if(parseFloat(val) > parseFloat(newData[i].upperLimit)){
				//successTip("第  "+(rowIndex+1)+" 行库存上限不能小于库存下限");
				newData[i].validFlag = true;
				errorIndex.push(rowIndex+1); 
				//return;
			}else{
				newData[i].validFlag = false;
				newData[i].lowerLimit= val;
				// 更新行数据
			}
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			// 刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	else if(id=="upperLimit"){
		for(var i = 0;i < newData.length;i++){
			rowIndex = $("#"+datagridId).datagrid('getRowIndex',newData[i]);
			if(parseFloat(val) < parseFloat(newData[i].lowerLimit)){
				//successTip("第  "+(rowIndex+1)+" 行库存上限不能小于库存下限");
				newData[i].validFlag = true;
				errorIndex.push(rowIndex+1); 
				//return;
			}else{
				newData[i].validFlag = false;
				newData[i].upperLimit= val;
				// 更新行数据
			}
			$("#"+datagridId).datagrid('updateRow',{
				index: rowIndex,
				row: newData[i]
			});
			// 刷新行
			$("#"+datagridId).datagrid('refreshRow',rowIndex);
		}
	}
	
	if(errorIndex.length > 0){
		//successTip("第  "+(errorIndex.join(","))+" 行库存上限不能小于库存下限");
		$.messager.confirm("提示","库存上限不能小于库存下限",function(e){
			gridHandel.setBeginRow(errorIndex[0]-1);
			gridHandel.setSelectFieldName('upperLimit');
			var target = gridHandel.getFieldTarget('upperLimit');
			if(target){
				gridHandel.setFieldFocus(target);
			}else{
				gridHandel.setSelectFieldName("skuCode");
			}
		});
		
		if(errorIndex.length == newData.length){
			$("#"+id).numberbox('setValue',0);
		}
	}
}

//保存
function saveStockIndexs(){
    $("#"+datagridId).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    console.log(rows);
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        successTip("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isChcekPrice = false;
    
    $.each(rows,function(i,v){
    	if(parseFloat(v["upperLimit"]) > maxNum){
    		successTip("第  "+(i+1)+" 行库存上限输入最大值为  "+maxNum);
    		isCheckResult = false;
    		return;
    	}
    	if(parseFloat(v["lowerLimit"]) > maxNum){
    		successTip("第  "+(i+1)+" 行库存下限输入最大值为  "+maxNum);
    		isCheckResult = false;
    		return;
    	}
    	
        if(parseFloat(v["lowerLimit"]) > parseFloat(v["upperLimit"])){
        	successTip("第  "+(i+1)+" 行库存上限不能小于库存下限");
        	isCheckResult = false;
        	return;
        }
    });
    
    if(isCheckResult){
        if(isChcekPrice){
            $.messager.confirm('系统提示',"新单价存在为0，是否确定保存",function(r){
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
	var branchId = $("#branchId").val();
    var jsonData = [];
    $.each(rows,function(i,data){
        var temp = {
        	branchId: branchId,
        	skuId:data.skuId,
        	skuCode:data.skuCode,
        	skuName:data.skuName,
        	barCode:data.barCode,
        	skuSpec:data.skuSpec,
        	skuUnit:data.skuUnit,
        	upperLimit:data.upperLimit,
        	lowerLimit:data.lowerLimit
        }
        jsonData.push(temp);
    });
    console.log(JSON.stringify(jsonData));
    $.ajax({
        url:contextPath+"/stock/index/saveStockIndex",
        type:"POST",
        data:{"data":JSON.stringify(jsonData)},
        success:function(result){
            if(result['code'] == 0){
                console.log(result);
                successTip(result['message']);
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
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
        successTip("请先选择机构");
        return;
    }
    branchId=$("#branchId").val();
	gFunGoodsSelect(searchKey,branchId);
}
//商品选择 公共使用
function gFunGoodsSelect(searchKey,branchId){
	new publicGoodsService("",function(data){
	//new publicGoodsService("PA",function(data){
    	if(data.length==0){
            return;
        }
    	if(searchKey){
	        $("#"+datagridId).datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#"+datagridId).datagrid("acceptChanges");
	    }
        var nowRows = gridHandel.getRowsWhere({skuName:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
        	unit:'skuUnit',
        	spec:'skuSpec'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:1};  //验证重复性
        var isCheck ={isGift:1 };   //只要是赠品就可以重复
        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

        $("#"+datagridId).datagrid("loadData",newRows);

        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("upperLimit");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('upperLimit'));
        },100)
        
    },searchKey,0,"","",branchId,"","0");
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
function toImportStockIndex(type){
    var branchId = $("#branchId").val();
    if(!branchId){
        messager("请先选择机构");
        return;
    }
    var param = {
        url:contextPath+"/stock/index/importStockIndexList",
        tempUrl:contextPath+'/stock/index/exportStockIndexTemp',
        type:type,
        branchId:branchId,
    }
    new publicUploadFileService(function(data){
        updateListData(data);
    },param)
}
function updateListData(data){
    var nowRows = gridHandel.getRowsWhere({skuName:'1'});
    var keyNames = {
    		unit:'skuUnit',
        	spec:'skuSpec'
    };
    var rows = gFunUpdateKey(data,keyNames);
//    var argWhere ={skuCode:1};  //验证重复性
//    var isCheck ={isGift:1 };   //只要是赠品就可以重复
//    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
    $("#"+datagridId).datagrid("loadData",rows);
}

/**
 * 机构名称
 */
function selectBranch(){
	new publicAgencyService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val(data.branchName);
	},'BF','');
}

//返回列表页面
function back(){
	toClose();
}
