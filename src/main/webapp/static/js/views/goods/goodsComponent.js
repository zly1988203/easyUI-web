/**
 * Created by wxl on 2016/10/25.
 */
$(function(){
    //初始化默认条件
    initDatagridOrders();
    initDatagridResultOrder();
});
var gridDefault = {
		//componentNum:0,
	    isGift:0,
}
var gridHandel = new GridClass();
//初始化查询表格
function initDatagridOrders(){
	gridHandel.setGridName("gridOrdersview");
    $("#gridOrdersview").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        pagination:true,    //分页
        fitColumns:true,    //每列占满
        //fit:true,            //占满
        showFooter:true,
		height:'300px',
		width:'100%',
        columns:[[        
            {field:'skuCode',title:'货号',width:'140px',align:'left'},
            {field:'skuName',title:'商品名称',width:'140px',align:'left'},
            {field:'barCode',title:'条码',width:'120px',align:'left'},
            /*{field:'memoryCode',title:'助记码',width:'120px',align:'left'},*/
            {field:'typeName',title:'商品类型',width:'120px',align:'left'},
            {field:'categoryCode',title:'类型编码',width:'120px',align:'left'},
            {field:'categoryName',title:'类别名称',width:'120px',align:'left'},
            {field:'spec',title:'规格',width:'80px',align:'left'},
            {field:'unit',title:'单位',width:'80px',align:'left'},
            {field:'isBindName',title:'是否已设置成分商品',width:'120px',align:'center'},
        ]],
        onSelect:function(rowIndex,rowData){
        	 $("#gridOrdersresult").datagrid('loadData', { total: 0, rows: [] });
        	selectView(rowData);
        },
		onLoadSuccess : function(data) {
			removeData(data);
			gridHandel.setDatagridHeader("center");
			 if (data.rows.length == 0) {  
			   return;
			 } 
			 else{
				 $('#gridOrdersview').datagrid("selectRow", 0);
			 }
		}
    });
    query();
}

var gridName = "gridOrdersresult";
var editRowData = null;
//初始化编辑表格
function initDatagridResultOrder(){
    gridHandel.setGridName("gridOrdersresult");
    gridHandel.initKey({
        firstName:'skuCode',
        enterName:'skuCode',
        enterCallBack:function(arg){
            if(arg&&arg=="add"){
                gridHandel.addRow(parseInt(gridHandel.getSelectRowIndex())+1,gridDefault);
               
            }else{
                selectGoods(arg);
            }
        },
    })
    $("#gridOrdersresult").datagrid({
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'380px',
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
                },
            },
            {field:'skuCode',title:'成分货号',width: '70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'componentSkuId',title:'商品Id',width:'200px',align:'left',hidden:true},
            {field:'barCode',title:'条码',width:'130px',align:'left'},
          /*  {field:'memoryCode',title:'助记码',width:'130px',align:'left'},*/
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'componentNum',title:'成分数量',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                    	row["componentNum"] = 0.00;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'0',
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangeNum,
                    }
                },
            },
            {field:'purchasePrice',title:'进货价',width:'80px',align:'right',
            	formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field:'amount',title:'进价金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field:'salePrice',title:'零售价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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

            {field:'salePricemoney',title:'售价金额',width:'80px',align:'right',
            	formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            }
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
        onBeforeEdit:function (rowIndex, rowData) {
            editRowData = $.extend(true,{},rowData);
        },
        onAfterEdit:function(rowIndex, rowData, changes){
            if(typeof(rowData.id) === 'undefined'){
                // $("#"+gridName).datagrid('acceptChanges');
            }else{
                if(editRowData.skuCode != changes.skuCode){
                    rowData.skuCode = editRowData.skuCode;
                    gridHandel.setFieldTextValue('skuCode',editRowData.skuCode);
                }
            }
        },
        onLoadSuccess : function(data) {
        	//$('#gridOrdersresult').datagrid("selectRow", 0);
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }
    });

    priceGrantUtil.grantPrice(gridName);
   
}

//queryForm 表单提交
function query(){
	//清空gridOrdersresult里面的数据
	//$("#gridOrdersresult").datagrid('loadData', { total: 0, rows: [] });
	$("#gridOrdersview").datagrid("options").queryParams = $("#queryForm").serializeObject();
	$("#gridOrdersview").datagrid("options").method = "post";
	$("#gridOrdersview").datagrid("options").url = contextPath+'/goods/component/queryList';
	$("#gridOrdersview").datagrid("load");

	
}

function removeData(data){
	  if(data.list.length<=0){
		 $("#gridOrdersresult").datagrid('loadData', { total: 0, rows: [] });
	  }
}

//监听成分数量
function onChangeNum(newV,oldV) {
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    var purchaseValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'purchasePrice');
    var salePriceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'salePrice');
    gridHandel.setFieldValue('amount',(purchaseValue*newV).toFixed(4));           //进价金额=成分数量*进货价
    gridHandel.setFieldValue('salePricemoney',(salePriceValue*newV).toFixed(4));  //售价金额=成分数量*零售价
    updateFooter();
}


//合计
function updateFooter(){
    var fields = {componentNum:0,purchasePrice:0,amount:0,salePrice:0,salePricemoney:0,isGift:0, };
    var argWhere = {name:'isGift',value:""}//
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
	var viewrows=$("#gridOrdersview").datagrid("getRows");
	console.log(viewrows);
	  if(viewrows==0){
		messager("请选择捆绑商品");
		 return;
	   }
	   var param = {goodsTypeList:'0,1,2',key:searchKey}
        new publicGoodsServiceTem(param,function(data){
		  if(data.length==0){
	            return;
	        }
	        if(searchKey){
	            $("#gridOrdersresult").datagrid("deleteRow", gridHandel.getSelectRowIndex());
	            $("#gridOrdersresult").datagrid("acceptChanges");
	        }
	        for(var i in data){
	        	var rec = data[i];
	        	rec.remark = "";
	        }
	        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
	        var keyNames = {
	            id:'skuId',
	            disabled:'',
	            pricingType:'',
	            inputTax:'tax',
	            componentSkuId:'skuId'
	        };
	        var rows = gFunUpdateKey(addDefaultData,keyNames);
	        var argWhere ={skuCode:1};  //验证重复性
	        var isCheck ={isGift:1 };   //只要是赠品就可以重复
	        var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);

	        $("#gridOrdersresult").datagrid("loadData",newRows);

	       // gridHandel.setLoadFocus();
	        setTimeout(function(){
	            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
	           // gridHandel.setSelectFieldName("componentNum");
	           // gridHandel.setFieldFocus(gridHandel.getFieldTarget('componentNum'));
	        },100);
	  });
}


//根据选中skuid查询价格、库存
function selectView(data){
     var searchskuId=data.id
	$.ajax({
    	url : contextPath+"/goods/component/queryComponent",
    	type : "POST",
    	data : {"skuId":searchskuId},
    	success:function(result){
    	    if(result.length>0){
    	     setDataValue(result);
    		}
    	    else{
    	     //result.length <0 清空数据	
    	     $("#gridOrdersresult").datagrid('loadData', { total: 0, rows: [] });
    	    }
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
        id:'skuId',
        disabled:'',
        io:'',
        inputTax:'tax',
    };
    var rows = gFunUpdateKey(addDefaultData,keyNames);
    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
    $("#gridOrdersresult").datagrid("loadData",newRows);
   
}

function checkdatas(){
	
	
}
//设置val 值选中位true  不选中为false
function checkval(){
	 var checked=$('#isBind').prop('checked');
	 if(checked==true){
		 $('#isBind').val('1');
	 }else{
		 $('#isBind').val('0');
	 }
}
//保存
function saveResultOrder(){
    $("#gridOrdersresult").datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    $(gridHandel.getGridName()).datagrid("loadData",rows);
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
        if(v["componentNum"]<=0){
        	
            messager("第"+(i+1)+"行，成分数量必须大于0");
            isCheckResult = false;
            return false;
        };
       
    });
    if(!isCheckResult){
        return;
    }
    else{
    	saveDataHandel(rows);
       }
}

//保存里面拼接的字段
function saveDataHandel(rows){
	//获取选中产品id
	var viewRows = $("#gridOrdersview").datagrid('getSelected');
	var checkskuCode=viewRows.skuId;
  /*    //关键字
    var keywordText =$("#keywordText").val();
    //商品类型:
    var goodstype=$("#goodstype").combobox('getValue');
    //仅显示未绑定成份的商品        
    var checkvalue=$("#checkvalue").val();*/
    
 /*   var footerRows = $("#gridOrdersresult").datagrid("getFooterRows");
    
    if(footerRows){
        totalNum = parseFloat(footerRows[0]["componentNum"]||0.0).toFixed(4);
        amount = parseFloat(footerRows[0]["amount"]||0.0).toFixed(4);
    }*/
    var reqObj = {
    	skuId:checkskuCode,
    	detailList:rows
    }; 
    var goodsJson = JSON.stringify(reqObj);
    console.log(goodsJson);
    $.ajax({
        url:contextPath+"/goods/component/saveComponent",
        type:"POST",
        data:{"goodsJson":goodsJson},
        success:function(result){
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功！", "info",function(){
                    //location.href = contextPath +"/form/purchase/orderEdit?formId=" + result["formId"];
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


/**
 * 重置
 */
function reset(){
  $("#goodsInfos").val("");
  $('#isBind').prop('checked',false);
};


