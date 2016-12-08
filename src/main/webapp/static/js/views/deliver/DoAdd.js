/**
 * Created by zhanghuan on 2016/8/30.
 * 出库-新增
 */
$(function(){
	 $("#createTime").html(new Date().format('yyyy-MM-dd hh:mm'));
    initDatagridAddRequireOrder();
});
var gridDefault = {
	dealNum:0,
    //largeNum:0,
    isGift:0,
}
var gridHandel = new GridClass();
function initDatagridAddRequireOrder(){
    gridHandel.setGridName("gridEditOrder");
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
    $("#gridEditOrder").datagrid({
        //title:'普通表单-用键盘操作',
//        method:'get',
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        height:'100%',
        width:'100%',
        data:[$.extend({},gridDefault),$.extend({},gridDefault),
            $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),
            $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault)],
        columns:[[
            {field:'ck',checkbox:true},
            {field:'cz',title:'操作',width:'50px',align:'center',
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
            {field:'skuName',title:'商品名称',width:'190px',align:'left'},
            {field:'barCode',title:'条码',width:'105px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'distributionSpec',title:'配送规格',width:'65px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return "<b>"+parseFloat(value||0).toFixed(2)+"<b>";
                    }
                    return "<b>"+parseFloat(value||0).toFixed(2)+"<b>";
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangeLargeNum,
                    }
                },
            },
            {field:'applyNum',hidden:true},
            {field:'dealNum',title:'数量',width:'80px',align:'right',
            	  formatter:function(value,row,index){
                      if(row.isFooter){
                          return "<b>"+parseFloat(value||0).toFixed(2)+"<b>";
                      }
                      if(!value||value==""||parseFloat(value)==0){
                    	  if (!row["applyNum"] || row["applyNum"] == '') {
                    		  value = 0.00;
                    	  } else {
                    		  row["dealNum"] = row["applyNum"];
                              value = row["dealNum"];
                    	  }
                      }
                      return "<b>"+parseFloat(value||0).toFixed(2)+"<b>";
                  },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangeRealNum,
                    }
                },
            },
            {field:'price',title:'单价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!row["price"]){
                        row["price"] = 0;
                        value = row["price"];
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        disabled:true,
                        precision:2,
                        onChange: onChangePrice,
                    }
                },
            },
            {field:'amount',title:'金额',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return "<b>"+parseFloat(value).toFixed(2)+"<b>";
                    }
                    return "<b>"+parseFloat(value||0).toFixed(2)+"<b>";
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        disabled:true,
                        precision:2,
                        onChange: onChangeAmount,
                    }
                },

            },
            {field:'isGift',title:'赠送',width:'65px',align:'left',
                formatter:function(value,row){
                    if(row.isFooter){
                        return;
                    }
                    return value=='1'?'是':(value=='0'?'否':'请选择');
                },
                editor:{
                    type:'combobox',
                    options:{
                        valueField: 'id',
                        textField: 'text',
                        editable:false,
                        required:true,
                        data: [{
                            "id":'1',
                            "text":"是",
                        },{
                            "id":'0',
                            "text":"否",
                        }],
                        onSelect:onSelectIsGift
                    }
                }
            },
            {field:'salePrice',title:'零售价',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return "<b>"+parseFloat(value||0).toFixed(2)+"<b>";
                },
            },
            {field:'saleAmount',title:'零售金额',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    var saleAmount = (parseFloat(row.dealNum)*parseFloat(row.salePrice)||0.0000).toFixed(2);
                    row["saleAmount"] = saleAmount;
                    return '<b>'+parseFloat(saleAmount||0).toFixed(2)+'</b>';;
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
            {field:'inputTax',title:'税率',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return  "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                },
            },
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
            	formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    var taxAmountVal = (row.inputTax*(row.amount/(1+parseFloat(row.inputTax)))||0.0000).toFixed(2);
                    row["taxAmount"] = taxAmountVal;
                    return "<b>"+parseFloat(taxAmountVal||0).toFixed(2)+"<b>";
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
            {field:'originPlace',title:'产地',width:'100px',align:'left'},
            {field:'sourceStock',title:'当前库存',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return  "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                },
            	editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:2,
                    }
                }
            },
            {field:'defectNum',title:'缺货数',width:'100px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    return  "<b>"+parseFloat(value||0).toFixed(2)+ "<b>";
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:2,
                    }
                }
            },
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
            gridHandel.setDatagridHeader("center");
            updateFooter();
        }
    });
}
//监听商品箱数
function onChangeLargeNum(newV,oldV){
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'distributionSpec');
    if(!purchaseSpecValue){
        messager("没有配送规格,请审查");
        return;
    }
    if(parseFloat(purchaseSpecValue)==0.0){
        messager("配送规格不能为0");
        return;
    }

    var realNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'dealNum');
    var realNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);//parseFloat(Math.round(purchaseSpecValue*newV*1000)/1000).toFixed(4);
    if(realNumVal&&Math.abs(realNumVal2-realNumVal)>0.0001){
        gridHandel.setFieldValue('dealNum',(purchaseSpecValue*newV).toFixed(4));//数量=商品规格*箱数
    }

    updateFooter();
}
//监听商品数量
function onChangeRealNum(newV,oldV) {
    if(isSelectDeliver){
        var oldDeliverDealNum = gridHandel.getFieldData(gridHandel.getSelectRowIndex()||0,'oldDeliverDealNum');
        if(parseFloat(newV)>parseFloat(oldDeliverDealNum)){
            messager("数量不能大于要货数量("+oldDeliverDealNum+")");
            gridHandel.setFieldValue('dealNum',oldDeliverDealNum);
            return;
        }else{
            var sourceStockVal = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'sourceStock');
            var defectNum = parseFloat(sourceStockVal||0)-parseFloat(newV||0);
            var defectNumVal = defectNum<0?-defectNum:0;
            gridHandel.setFieldValue('defectNum',defectNumVal);
        }
    }
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'distributionSpec');
    if(!purchaseSpecValue){
        messager("没有配送规格,请审查");
        return;
    }
    if(parseFloat(purchaseSpecValue)==0.0){
        messager("配送规格不能为0");
        return;
    }
    //var sourceStockVal = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'sourceStock');
    //if(parseFloat(newV)>parseFloat(sourceStockVal)){
    //	messager("输入的数量不能大于库存数："+sourceStockVal);
    //    gridHandel.setFieldValue('dealNum',0.0000);
    //    gridHandel.setSelectFieldName("dealNum");
    //    gridHandel.setFieldFocus(gridHandel.getFieldTarget('dealNum'));
    //    return;
    //}
    var priceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
    var salePriceValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'salePrice');

    gridHandel.setFieldValue('amount',(priceValue*newV).toFixed(4));             //金额=数量*单价
    gridHandel.setFieldValue('saleAmount',(salePriceValue*newV).toFixed(4));      //零售金额=数量*零售价

    var largeNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'largeNum');
    var largeNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);
    if(largeNumVal&&Math.abs(largeNumVal2-largeNumVal)>0.0001){
        var largeNumVal = parseFloat(newV/purchaseSpecValue).toFixed(4);
        gridHandel.setFieldValue('largeNum',largeNumVal);   //箱数=数量/商品规格
    }
    /*gridHandel.setFieldValue('largeNum',(newV/purchaseSpecValue).toFixed(4));   //箱数=数量/商品规格*/
    updateFooter();
}
//监听商品单价
function onChangePrice(newV,oldV) {
    var dealNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'dealNum');
    gridHandel.setFieldValue('amount',dealNumVal*newV);                          //金额=数量*单价
    updateFooter();
}
//监听商品金额
function onChangeAmount(newV,oldV) {
    //获取税率
    var taxVal = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'inputTax');
    gridHandel.setFieldValue('taxAmount',(taxVal*(newV/(1+parseFloat(taxVal)))).toFixed(2));
}
//监听是否赠品
function onSelectIsGift(data){
    var checkObj = {
        skuCode: gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'skuCode'),
        isGift:data.id,
    };
    var arrs = gridHandel.searchDatagridFiled(gridHandel.getSelectRowIndex(),checkObj);
    if(arrs.length==0){
        var targetPrice = gridHandel.getFieldTarget('price');
        if(data.id=="1"){
            var priceVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
            $('#gridEditOrder').datagrid('getRows')[gridHandel.getSelectRowIndex()]["oldPrice"] = priceVal;
            $(targetPrice).numberbox('setValue',0);
            //$(targetPrice).numberbox('disable');
        }else{
            //$(targetPrice).numberbox('enable');
            var oldPrice =  $('#gridEditOrder').datagrid('getRows')[gridHandel.getSelectRowIndex()]["oldPrice"];
            if(oldPrice){
                $(targetPrice).numberbox('setValue',oldPrice);
            }
        }
        updateFooter();
    }else{
        var targetIsGift = gridHandel.getFieldTarget('isGift');
        $(targetIsGift).combobox('select', data.id=='1'?'0':'1');
        messager(data.id=='1'?'已存在相同赠品':'已存在相同商品');
    }
}
//合计
function updateFooter(){
    var fields = {largeNum:0,dealNum:0,amount:0,isGift:0, };
    var argWhere = {name:'isGift',value:0}
    gridHandel.updateFooter(fields,argWhere);
}
//插入一行
function addLineHandel(event){
    event.stopPropagation(event);
    if($("#referenceId").val()){
        messager("已选要货单号，不允许添加其他商品");
        return;
    }
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
    //判定收货机构是否存在
	var sourceBranchId = $("#sourceBranchId").val();
	var targetBranchId = $("#targetBranchId").val();
    if(targetBranchId == ""){
        messager("请先选择收货机构");
        return;
    }
    if($("#referenceId").val()){
        messager("已选要货单号，不允许添加其他商品");
        return;
    }
    
    new publicGoodsService("DO",function(data){
        if(searchKey){
            $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#gridEditOrder").datagrid("acceptChanges");
        }
        selectStockAndPrice(sourceBranchId,data);
    },searchKey,'',sourceBranchId,targetBranchId,sourceBranchId,'');
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
        pricingType:'',
        inputTax:'tax'
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

//查询价格、库存
function selectStockAndPrice(sourceBranchId,data){
	var targetBranchId = $("#targetBranchId").val();
	var GoodsStockVo = {
			branchId : sourceBranchId,
			stockBranchId : targetBranchId,
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

//保存校验
function saveOrder(){
    var rows = gridHandel.getRows();
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var num=0;
    $.each(rows,function(i,v){
    	
        if(!v["skuCode"]){
            messager("第"+(i+1)+"行，货号不能为空");
            isCheckResult = false;
            return false;
        };
        if(v["largeNum"]<=0){
            messager("第"+(i+1)+"行，箱数必须大于0");
            isCheckResult = false;
            return false;
        }
        if(v["dealNum"]<=0){
            messager("第"+(i+1)+"行，数量必须大于0");
            isCheckResult = false;
            return false;
        }
        if(v["sourceStock"]==0){
        	
        	num++;
        	console.log(num);
        	        	
        }
        v["rowNo"] = i+1;
    });
    if(!isCheckResult){
        return;
    } 
    if(num==rows.length||num==0){
		saveOrderbtn();
	}
	else{
		$.messager.confirm('提示',"表格存在库存为0的记录是否继续？",function(data){
    		if(data){
    			saveOrderbtn();
    		}	
    	});
	}

}
//保存到后台
function saveOrderbtn(){
	  //商品总数量
    var totalNum = 0;
    //总金额
    var amount=0;
	// 要活分店id
	 var targetBranchId = $("#targetBranchId").val();
	//发货分店id
    var sourceBranchId = $("#sourceBranchId").val();
    //生效日期
    var validityTime = $("#validityTime").val();
    // 备注
    var remark = $("#remark").val();
    // 引用单号id
    var referenceId = $("#referenceId").val();
    // 引用单号
    var referenceNo = $("#referenceNo").val();
 
    //验证表格数据
    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());

    var footerRows = $("#gridEditOrder").datagrid("getFooterRows");
    if(footerRows){
        totalNum = parseFloat(footerRows[0]["dealNum"]||0.0).toFixed(4);
        amount = parseFloat(footerRows[0]["amount"]||0.0).toFixed(4);
    }
    var rows = gridHandel.getRows();
    var saveData = JSON.stringify(rows);
    //var deliverFormListVo = tableArrayFormatter(rows,"deliverFormListVo");
    var reqObj = {
    	formType:'DO',
    	io:'1',
    	sourceBranchId:sourceBranchId,
        targetBranchId:targetBranchId,
        validityTime:validityTime,
        totalNum:totalNum,
        amount:amount,
        remark:remark,
        referenceNo:referenceNo,
        referenceId:referenceId,
        oldReferenceNo : '',
        deliverFormListVo : []
    };
    
    $.each(rows,function(i,data){
    	var temp = {
    		skuId : data.skuId,
    		skuCode : data.skuCode,
    		skuName : data.skuName,
    		barCode : data.barCode,
    		spec : data.spec,
    		rowNo : data.rowNo,
    		applyNum : data.applyNum,
    		dealNum : data.dealNum,
    		largeNum : data.largeNum,
    		price : data.price,
    		amount : data.amount,
    		inputTax : data.inputTax,
    		isGift : data.isGift,
    		remark : data.remark,
    		originPlace : data.originPlace,
    		distributionSpec : data.distributionSpec,
    		salePrice : data.salePrice,
    		saleAmount : data.saleAmount,
    		defectNum : data.defectNum
    	}
    	reqObj.deliverFormListVo[i] = temp;
	});
    
    $.ajax({
        url:contextPath+"/form/deliverForm/insertDeliverForm",
        type:"POST",
        contentType:"application/json",
        data:JSON.stringify(reqObj),
        success:function(result){
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功！", "info",function(){
                   location.href = contextPath +"/form/deliverForm/deliverEdit?deliverFormId=" + result["formId"];
                });
            }else{
            	var strResult = "";
            	if (result.dataList) {
                	$.each(result.dataList,function(i,item){
                		strResult += item.goodsName+" ,库存数量： "+item.number+",";
                	})
            	}
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}
//审核
function check(){
	var deliverFormId = $("#formId").val();
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
		    	url : contextPath+"/form/deliverForm/check",
		    	type : "POST",
		    	data : {
		    		deliverFormId : $("#formId").val(),
		    		deliverType : 'DO'
		    	},
		    	success:function(result){
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				contextPath +"/form/deliverForm/deliverEdit?deliverFormId=" + deliverFormId;
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

/**
 * 收货机构
 */
function selectBranches(){
	var sourceBranchType = $("#sourceBranchType").val();
	if(sourceBranchType != '0' && sourceBranchType != '1'){
		return;
	}
	if ($("#referenceNo").val() != '') {
		return;
	}
	new publicAgencyService(function(data){
		$("#targetBranchId").val(data.branchesId);
		$("#targetBranchName").val(data.branchName);
	},'DO','');
}

/**
 * 单据选择
 */
var isSelectDeliver = false;    //true导入的是要货单号
function selectDeliver(){
	var referenceId = "";
	new publicDeliverFormService ("DA",function(data){
        isSelectDeliver = true;
		referenceId = data.id;
		$("#referenceId").val(referenceId);
		$("#referenceNo").val(data.formNo);
		$("#targetBranchId").val(data.targetBranchId);
		$("#targetBranchName").val(data.targetBranchName);
		$("#sourceBranchId").val(data.sourceBranchId);
		$("#sourceBranchName").val(data.sourceBranchName);
		
		loadLists(referenceId);
	});
}
function loadLists(referenceId){

    $.ajax({
        url:contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverType=DO&deliverFormId="+referenceId,
        type:"post",
        success:function(data){
            var rows = data.rows
           
            for(var i in rows){
                rows[i]["dealNum"] =  rows[i]["applyNum"]?rows[i]["applyNum"]:rows[i]["dealNum"];
                rows[i]["amount"]  = parseFloat(rows[i]["price"]||0)*parseFloat(rows[i]["dealNum"]||0);
                rows[i]["oldDeliverDealNum"] =  rows[i]["dealNum"];
                var defectNum = parseFloat(rows[i]["sourceStock"]||0)-parseFloat(rows[i]["dealNum"]||0);
                rows[i]["defectNum"] = defectNum<0?-defectNum:0;
            }
            $("#gridEditOrder").datagrid("loadData",rows);
            updateFooter();
        }
    })
   /* return;
	$("#gridEditOrder").datagrid("options").method = "post";
	$("#gridEditOrder").datagrid('options').url = contextPath+"/form/deliverFormList/getDeliverFormListsById?deliverType=DO&deliverFormId="+referenceId;
	$("#gridEditOrder").datagrid('load');*/
}
/**
 * 调用导入功能 0导入货号 1导入明细
 * @param type
 */
function toImportproduct(type){
    var branchId = $("#targetBranchId").val();
    if(!branchId){
        messager("请先选择收货机构");
        return;
    }
    if(type==0){
        importproduct();
    }else{
        importproductAll();
    }
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
        data[i]["dealNum"]=data[i]["dealNum"]||0;
        
        data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["dealNum"]||0);
        if(parseInt(data[i]["distributionSpec"])){
        	 data[i]["largeNum"]  = (parseFloat(data[i]["dealNum"]||0)/parseFloat(data[i]["distributionSpec"])).toFixed(4);
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

//新的导入功能 货号(0)、条码(1)导入
function toImportproduct(type){
	//判定收货机构是否存在
	var sourceBranchId = $("#sourceBranchId").val();
	var targetBranchId = $("#targetBranchId").val();
    if(targetBranchId == ""){
        messager("请先选择收货机构");
        return;
    }
    if($("#referenceId").val()){
        messager("已选要货单号，不允许添加其他商品");
        return;
    }
    var param = {
        url:contextPath+"/form/deliverForm/reportList",
        tempUrl:contextPath+"/form/deliverForm/exportReport",
        type:type,
        branchId:sourceBranchId,
    }
    new publicUploadFileService(function(data){
    	if (data.length != 0) {
    		selectStockAndPriceImport(sourceBranchId,data);
    	}
    },param)
}

//查询价格、库存
function selectStockAndPriceImport(sourceBranchId,data){
	var targetBranchId = $("#targetBranchId").val();
	var GoodsStockVo = {
			branchId : sourceBranchId,
			stockBranchId : targetBranchId,
			fieldName : 'id',
			goodsSkuVo : [],
		}; 
	$.each(data,function(i,val){
		var temp = {
				id : val.skuId,
				largeNum : val.largeNum,
				isGift : val.isGift
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
    		updateListData(result);
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}

function updateListData(data){
     var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
     var addDefaultData = gridHandel.addDefault(data, {});
     var keyNames = {
		 distributionPrice:'price',
         id:'skuId',
         disabled:'',
         pricingType:'',
         //num : 'dealNum'
     };
     var rows = gFunUpdateKey(addDefaultData,keyNames);
     
     for(var i in rows){
         rows[i].remark = "";
         if(rows[i]["isGift"] =="1"){
        	 rows[i]["oldPrice"] = rows[i]["price"];
        	 rows[i]["price"] = 0;
         }
         rows[i]["amount"]  = parseFloat(rows[i]["price"]||0)*parseFloat(rows[i]["dealNum"]||0);
         if(parseInt(rows[i]["distributionSpec"])){
        	 rows[i]["dealNum"]  = (parseFloat(rows[i]["largeNum"]||0)*parseFloat(rows[i]["distributionSpec"])).toFixed(4);
         }else{
        	 rows[i]["largeNum"]  =  0;
        	 rows[i]["distributionSpec"] = 0;
         }
         
        
     }
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

//返回列表页面
function back(){
	location.href = contextPath+"/form/deliverForm/viewsDO";
}