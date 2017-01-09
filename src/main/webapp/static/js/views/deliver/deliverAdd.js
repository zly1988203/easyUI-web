/**
 * Created by zhanghuan on 2016/8/30.
 * 要货单-新增
 */
var targetBranchTypeTemp = "";
var branchId = '';
$(function(){
    $("#createTime").html(new Date().format('yyyy-MM-dd hh:mm')); 
    initDatagridAddRequireOrder();
    targetBranchTypeTemp = $("#targetBranchType").val();
});

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


var gridDefault = {
    applyNum:0,
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
            	branchId = $("#sourceBranchId").val();
                selectGoods(arg);
            }
        },
    })
    $("#gridEditOrder").datagrid({
        align:'center',
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
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
            {field:'rowNo',hidden:'true'},
            {field:'skuCode',title:'货号',width: '70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'条码',width:'150px',align:'left',
                formatter:function(value,row,index){
                    var str = "";
                    if(row.isFooter){
                        str ='<div class="ub ub-pc" style="color:red;">起订金额：<span id="spanMinAmount"> ' + $("#minAmount").val() +'</span></div> '
                    }else{
                        str = value;
                    }
                    return str;
                }
            },
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            /*{field:'twoCategoryCode',title:'类别编号',width:'90px',align:'left'},
            {field:'twoCategoryName',title:'类别名称',width:'90px',align:'left'},*/
            {field:'distributionSpec',title:'配送规格',width:'90px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["largeNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:0,
                    options:{
                        min:0,
                        precision:4,
                        onChange: onChangeLargeNum,
                    }
                },
            },
            {field:'applyNum',title:'数量',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value){
                        row["largeNum"] = parseFloat(value||0).toFixed(2);
                    }
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    value:'0',
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
                    if(!row.price){
                    	row.price = parseFloat(value||0).toFixed(2);
                    }
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                        onChange: onChangePrice,
                    }
                },
            },
            {field:'amount',title:'金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        disabled:true,
                        min:0,
                        precision:4,
                        onChange: onChangeAmount,
                    }
                },
            },
            {field:'isGift',title:'赠送',width:'65px',align:'left',
                formatter:function(value,row){
                    if(row.isFooter){
                        return;
                    }
                    row.isGift = row.isGift?row.isGift:0;
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
            {field:'inputTax',title:'税率',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    
                    return  '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                options:{
                    min:0,
                    disabled:true,
                    precision:2,
                }
            },
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    var taxAmountVal = (row.inputTax*(row.amount/(1+row.inputTax))||0.0000).toFixed(2);
                    row["taxAmount"] = taxAmountVal;
                    return  '<b>'+parseFloat(taxAmountVal||0).toFixed(2)+'</b>';
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
            {field:'sourceStock',title:'目标库存',width:'80px',align:'right',
                formatter:function(value,row,index){
                    if(row.isFooter){
                        return
                    }
                    if(!row.sourceStock){
                        row.sourceStock = parseFloat(value||0).toFixed(2);
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
//            	editor:{
//                    type:'numberbox',
//                    options:{
//                        disabled:true,
//                        min:0,
//                        precision:2,
//                    }
//                }
            },
            {field:'alreadyNum',title:'已订数量',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
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
    gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
        $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),
        $.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault),$.extend({},gridDefault)]);
}

//限制转换次数
var n = 0;
var m = 0;
//监听商品箱数
function onChangeLargeNum(newV,oldV){
	if(m > 0){
		m = 0;
		return;
	}
	
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'distributionSpec');
    if(!purchaseSpecValue){
        messager("没有配送规格,请审查");
        return;
    }

    n++;
    
    var realNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyNum');
    var realNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);//parseFloat(Math.round(purchaseSpecValue*newV*1000)/1000).toFixed(4);
    if(realNumVal&&Math.abs(realNumVal2-realNumVal)>0.0001){
        gridHandel.setFieldValue('applyNum',(purchaseSpecValue*newV).toFixed(4));//数量=商品规格*箱数
    }

    updateFooter();
}
//监听商品数量
function onChangeRealNum(newV,oldV) {
	if(n > 0){
		n = 0;
		return;
	}
	
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'distributionSpec');
    if(!purchaseSpecValue){
        messager("没有配送规格,请审查");
        return;
    }
    
    var tempNum = parseFloat(newV).toFixed(4)/parseFloat(purchaseSpecValue).toFixed(4);
    if(parseInt(tempNum) != tempNum){
        messager("输入的数量必须是商品规格("+purchaseSpecValue+")的整数倍");
        gridHandel.setFieldValue('applyNum',0.0000);
        gridHandel.setSelectFieldName("applyNum");
        gridHandel.setFieldFocus(gridHandel.getFieldTarget('applyNum'));
        return;
    }
    
	m++;
    ////检查库存
    //var sourceStockVal = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'sourceStock');
    //if(parseFloat(newV)>parseFloat(sourceStockVal)){
    //	messager("输入的数量不能大于库存数："+sourceStockVal);
    //    gridHandel.setFieldValue('applyNum',0.0000);
    //    gridHandel.setSelectFieldName("applyNum");
    //    gridHandel.setFieldFocus(gridHandel.getFieldTarget('applyNum'));
    //    return;
    //}
    var priceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',priceValue*newV);                         //金额=数量*单价

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
    var applyNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'applyNum');
    gridHandel.setFieldValue('amount',applyNumVal*newV);                          //金额=数量*单价
    updateFooter();
}
//监听商品金额
function onChangeAmount(newV,oldV) {
    //获取税率
    var taxVal = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'inputTax');
    gridHandel.setFieldValue('taxAmount',(taxVal*(newV/(1+taxVal))).toFixed(2));
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
    var fields = {largeNum:0,applyNum:0,amount:0,isGift:0, };
    var argWhere = {name:'isGift',value:""}
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
	var sourceBranchId = $("#sourceBranchId").val();
	var targetBranchId = $("#targetBranchId").val();
    //判定发货分店是否存在
    if($("#sourceBranchId").val()==""){
        messager("请先选择发货机构");
        return;
    }
    new publicGoodsService("DA",function(data){
    	if(searchKey){
	        $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#gridEditOrder").datagrid("acceptChanges");
	    }
    	selectStockAndPrice(data);
    },searchKey,'',sourceBranchId,targetBranchId,branchId,'');
    branchId = '';
}
// 设置值
function setDataValue(data,type) {
    	for(var i in data){
	        var rec = data[i];
	        rec.remark = "";
        }
         var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
         var addDefaultData = gridHandel.addDefault(data,gridDefault);
         var keyNames = type==1?{
	         id:'skuId',
	         disabled:'',
	         pricingType:'',
	         
         }:{
    		 distributionPrice:'price',
	         id:'skuId',
	         disabled:'',
	         pricingType:''
         };
         var rows = gFunUpdateKey(addDefaultData,keyNames);
         var argWhere ={skuCode:1};  //验证重复性
         var isCheck ={isGift:1 };   //只要是赠品就可以重复
         var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
         $("#gridEditOrder").datagrid("loadData",newRows);
         
         gridHandel.setLoadFocus();
         setTimeout(function(){
             gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
             gridHandel.setSelectFieldName("largeNum");
             gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
         },100)
}

// 查询已订数量
function selectStockAndPrice(data){
	//setDataValue(data);
	var GoodsStockVo = {
            branchId : $("#targetBranchId").val(),
            fieldName : 'id',
			goodsSkuVo : []
		}; 
	$.each(data,function(i,val){
		var temp = {
				id : val.skuId
		};
		GoodsStockVo.goodsSkuVo[i] = temp;
	});
	$.ajax({
    	url : contextPath+"/goods/goodsSelect/queryAlreadyNum",
    	type : "POST",
    	data : {
    		goodsStockVo : JSON.stringify(GoodsStockVo)
    	},
    	success:function(result){
            $.each(data,function(i,val){
                $.each(result.data,function(j,obj){
                    if(val.skuId==obj.skuId){
                        data[i].alreadyNum = obj.alreadyNum;
                    }
                })
            })
    		setDataValue(data);
    	},
    	error:function(result){
    		successTip("请求发送失败或服务器处理失败");
    	}
    });
}

//保存
function saveOrder(){
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
    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());

    var footerRows = $("#gridEditOrder").datagrid("getFooterRows");
    if(footerRows){
        totalNum = parseFloat(footerRows[0]["applyNum"]||0.0).toFixed(4);
        amount = parseFloat(footerRows[0]["amount"]||0.0).toFixed(4);
    }

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
        if(v["largeNum"]<=0){
            messager("第"+(i+1)+"行，箱数必须大于0");
            isCheckResult = false;
            return false;
        }
        if(v["applyNum"]<=0){
            messager("第"+(i+1)+"行，数量必须大于0");
            isCheckResult = false;
            return false;
        }
        v["rowNo"] = i+1;
    });
    if(!isCheckResult){
        return;
    }
    var saveData = JSON.stringify(rows);
    var reqObj = {
    	formType:'DA',
    	sourceBranchId:sourceBranchId,
        targetBranchId:targetBranchId,
        validityTime:validityTime,
        totalNum:totalNum,
        amount:amount,
        remark:remark,
        branchCode:branchCode,
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
    		largeNum : data.largeNum,
    		price : data.price,
    		amount : data.amount,
    		inputTax : data.inputTax,
    		isGift : data.isGift,
    		remark : data.remark,
    		originPlace : data.originPlace,
    		distributionSpec : data.distributionSpec
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
                successTip(result['message'] +","+strResult);
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
		    		deliverType : 'DA'
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
 * 要货机构
 */
var branchCode = '';
function selectTargetBranch(){
	var targetBranchType = $("#targetBranchType").val();
	if(targetBranchTypeTemp != '0' && targetBranchTypeTemp != '1'){
		return;
	}
	new publicAgencyService(function(data){
        $("#targetBranchId").val(data.branchesId);
        $("#targetBranchName").val(data.branchName);
        branchCode = data.branchCode;
        $("#targetBranchType").val(data.type);
        // 为店铺时
        if (data.type != '1' && data.type != '0') {
        	getSourceBranch(data.branchesId);
        }
        if (data.type == '1') {
        	$("#salesman").val(data.salesman);
        	$("#spanMinAmount").html(data.minAmount);
        	$("#minAmount").val(data.minAmount);
        	$("#sourceBranchId").val('');
            $("#sourceBranchName").val('');
        }
	},'DA','');
}

function getSourceBranch(branchesId) {
	$.ajax({
    	url : contextPath+"/form/deliverForm/getSourceBranch",
    	type : "POST",
    	data : {
    		branchesId : branchesId,
    	},
    	success:function(result){
    		if(result['code'] == 0){
    			$("#sourceBranchId").val(result['sourceBranchId']);
                $("#sourceBranchName").val(result['sourceBranchName']);
                $("#validityTime").val(new Date(result['validityTime']).format('yyyy-MM-dd'));
                $("#salesman").val(result['salesman']);
                $("#spanMinAmount").html(result['minAmount']);
                $("#minAmount").val(result['minAmount']);
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
 * 发货机构
 */
function selectSourceBranch(){
	var targetBranchType = $("#targetBranchType").val();
	if(targetBranchType != '0' && targetBranchType != '1'){
        new publicAgencyService(function(data){
            if($("#sourceBranchId").val()!=data.branchesId){
                $("#sourceBranchId").val(data.branchesId);
                $("#sourceBranchName").val(data.branchName);
                gridHandel.setLoadData([$.extend({},gridDefault)]);
            }
        },'DZ',$("#sourceBranchId").val());
	} else {
        new publicAgencyService(function(data){
            if($("#sourceBranchId").val()!=data.branchesId){
                $("#sourceBranchId").val(data.branchesId);
                $("#sourceBranchName").val(data.branchName);
                gridHandel.setLoadData([$.extend({},gridDefault)]);
            }
        },'DA',$("#targetBranchId").val());
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
        data[i]["applyNum"]=data[i]["applyNum"]||0;
   
        data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["applyNum"]||0);
        if(parseInt(data[i]["distributionSpec"])){
        	 data[i]["largeNum"]  = (parseFloat(data[i]["applyNum"]||0)/parseFloat(data[i]["distributionSpec"])).toFixed(4);
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

// 新的导入功能 货号(0)、条码(1)导入
function toImportproduct(type){
	// 要货机构id
	var targetBranchId = $("#targetBranchId").val();
	// 发货机构id
    var sourceBranchId = $("#sourceBranchId").val();
    if(sourceBranchId === '' || sourceBranchId === null){
        messager("请先选择发货机构");
        return;
    }
    var param = {
        url:contextPath+"/form/deliverForm/importList",
        tempUrl:contextPath+"/form/deliverForm/exportTemp",
        type:type,
        targetBranchId:targetBranchId,
        sourceBranchId:sourceBranchId
    }
    new publicUploadFileService(function(data){
    	if (data.length != 0) {
    		selectStockAndPriceImport(data);
    	}
    },param)
}

//查询价格、库存
function selectStockAndPriceImport(data){
	//updateListData(data);
    var GoodsStockVo = {
        branchId : $("#targetBranchId").val(),
        fieldName : 'id',
        goodsSkuVo : []
    };
    $.each(data,function(i,val){
        var temp = {
            id : val.skuId
        };
        GoodsStockVo.goodsSkuVo[i] = temp;
    });
    $.ajax({
        url : contextPath+"/goods/goodsSelect/queryAlreadyNum",
        type : "POST",
        data : {
            goodsStockVo : JSON.stringify(GoodsStockVo)
        },
        success:function(result){
            $.each(data,function(i,val){
                $.each(result.data,function(j,obj){
                    if(val.skuId==obj.skuId){
                        data[i].alreadyNum = obj.alreadyNum;
                    }
                })
            })
            updateListData(data);
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

function updateListData(data){
     var keyNames = {
		 distributionPrice:'price',
         id:'skuId',
         disabled:'',
         pricingType:'',
         num : 'applyNum'
     };
     var rows = gFunUpdateKey(data,keyNames);
     for(var i in rows){
         rows[i].remark = "";
         rows[i]["amount"]  = parseFloat(rows[i]["price"]||0)*parseFloat(rows[i]["applyNum"]||0);

         if(parseInt(rows[i]["distributionSpec"])){
        	 rows[i]["applyNum"]  = (parseFloat(rows[i]["largeNum"]||0)*parseFloat(rows[i]["distributionSpec"])).toFixed(4);
         }else{
        	 rows[i]["largeNum"]  =  0;
        	 rows[i]["distributionSpec"] = 0;
         }
     }
     var argWhere ={skuCode:1};  //验证重复性
     var isCheck ={isGift:1 };   //只要是赠品就可以重复
     var newRows = gridHandel.checkDatagrid(data,rows,argWhere,isCheck);
     console.log(newRows);
     $("#gridEditOrder").datagrid("loadData",newRows);
 
}
//返回列表页面
function back(){
	location.href = contextPath+"/form/deliverForm/viewsDA";
}


