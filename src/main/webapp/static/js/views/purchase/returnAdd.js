/**
 * Created by huangj02 on 2016/8/9.
 */
var isEdit = true;
$(function(){
	//初始化默认条件
    initConditionParams();
    
    //是否允许改价
    var allowUpdatePrice = $('#allowUpdatePrice').val();
    if('undefined' != typeof(allowUpdatePrice)){
    	isEdit = false;
    }
    
    initDatagridEditOrder();

    // 是否自动加载商品
    if($("#cascadeGoods").val() == 'true'){
        queryGoodsList();
    }
});

//初始化默认条件
function initConditionParams(){
	$("#createTime").html(new Date().format('yyyy-MM-dd hh:mm')); 
	
	 //初始化机构ID，机构名称
    $("#branchId").val(sessionBranchId);
	$("#branchName").val(sessionBranchCodeName);
	
	//设置默认供应商信息
	$("#supplierId").val(sessionSupplierId);
    $("#supplierName").val(sessionSupplierCodeName);
    
    //设置付款期限默认值
    $("#paymentTime").val(dateUtil.getCurrentDateDay());
}

var gridDefault = {
    largeNum:0,
    realNum:0,
    isGift:0,
}
var gridName = "gridEditOrder";
var gridHandel = new GridClass();
function initDatagridEditOrder(){
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
        align:'center',
        singleSelect:true,  //单选  false多选
        rownumbers:true,    //序号
        showFooter:true,
        height:'100%',
        width:'100%',
        pageSize:10000,
        view:scrollview,
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
            {field:'skuCode',title:'货号',width: '70px',align:'left',editor:'textbox'},
            {field:'skuName',title:'商品名称',width:'200px',align:'left'},
            {field:'barCode',title:'国际条码',width:'130px',align:'left'},
            {field:'unit',title:'单位',width:'60px',align:'left'},
            {field:'spec',title:'规格',width:'90px',align:'left'},
            {field:'purchaseSpec',title:'进货规格',width:'90px',align:'left'},
            {field:'largeNum',title:'箱数',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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

            {field:'realNum',title:'数量',width:'80px',align:'right',
            	formatter:function(value,row){
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    if(!value||value==""||value== "0.00"){
                    	row["realNum"] = row["receiveNum"]||0;
                  	   value = row["realNum"];
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
            {field:'maxlargeNum',title:'原箱数',width:'80px',align:'right',hidden:false,
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
            },
            {field:'maxRealNum',title:'原数据',width:'80px',align:'right',hidden:false,
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
             },
            
            
            {field:'price',title:'单价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                        disabled:isEdit,
                        onChange: onChangePrice,
                    }
                },
            },
            {field:'amount',title:'金额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                        disabled:isEdit,
                        onChange: onChangeAmount,
                    }
                },

            },
            {field:'isGift',title:'是否赠品',width:'80px',align:'left',
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
                }},

            {field:'salePrice',title:'销售价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                //editor:{
                //    type:'numberbox',
                //    options:{
                //        min:0,
                //        precision:4,
                //    }
                //},
            },

            {field:'tax',title:'税率',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    row.tax = value?value:0;
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                options:{
                    min:0,
                    precision:4,
                }
            },
            {field:'taxAmount',title:'税额',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
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
            {field:'goodsCreateDate',title:'生产日期',width:'120px',align:'center',
                editor:{
                    type:'datebox',
                },
            },
            {field:'goodsExpiryDate',title:'有效期',width:'120px',align:'center',
                editor:{
                    type:'datebox',
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
        onLoadSuccess : function(data) {
            if((data.rows).length <= 0)return;
            gFunEndLoading();
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

var i = 0;
var j = 0;
//监听商品箱数
function onChangeLargeNum(newV,oldV){
	if(m === 1 || i===1){
		m = 0;
		i = 0;
		return;
	}
	
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchaseSpec');
    if(!purchaseSpecValue){
        messager("没有商品规格,请审查");
        return;
    }
    
    var maxlargeNum = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'maxlargeNum');
    if(maxlargeNum&&(parseFloat(newV)>parseFloat(maxlargeNum))){
    	i = 1;
        messager("输入商品箱数不能大于原箱数"+maxlargeNum);
        gridHandel.setFieldValue('largeNum',oldV);
        return;
    }

    n = 1;

    //金额 = 规格 * 单价 * 箱数
    var priceValue = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',parseFloat(purchaseSpecValue*priceValue*newV).toFixed(4));
    
    var realNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'realNum');
    var realNumVal2 = parseFloat(purchaseSpecValue*newV).toFixed(4);//parseFloat(Math.round(purchaseSpecValue*newV*1000)/1000).toFixed(4);
    if(realNumVal&&Math.abs(realNumVal2-realNumVal)>0.0001){
        gridHandel.setFieldValue('realNum',(purchaseSpecValue*newV).toFixed(4));//数量=商品规格*箱数
    }

    updateFooter();
}
//监听商品数量
function onChangeRealNum(newV,oldV) {
	if(n === 1 || j === 1){
		n = 0;
		j = 0;
		return;
	}
	
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchaseSpec');
    if(!purchaseSpecValue){
        messager("没有商品规格,请审查");
        return;
    }
    var maxRealNum = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'maxRealNum');
    if(maxRealNum&&(parseFloat(newV)>parseFloat(maxRealNum))){
    	j = 1;
        messager("输入商品数量不能大于收货数量"+maxRealNum);
        gridHandel.setFieldValue('realNum',oldV);
        return;
    }
    
    m = 1;
    
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
    var realNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'realNum');
    gridHandel.setFieldValue('amount',realNumVal*newV);                          //金额=数量*单价
    updateFooter();
}
//监听商品金额
function onChangeAmount(newV,oldV) {
    //获取税率
    var taxVal = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'tax');
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
            $(targetPrice).numberbox('disable');
        }else{
            $(targetPrice).numberbox('enable');
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
    var fields = {largeNum:0,realNum:0,amount:0,taxAmount:0,isGift:0, };
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
    //判定供应商是否存在
    var supplierId = $("#supplierId").val();
    if(supplierId==""){
        messager("请先选择供应商");
        return;
    }
    
    var branchId = $("#branchId").val();
    if(!branchId){
    	messager("请先选择收货机构");
    }

    var queryParams = {
        type:'PR',
        key:searchKey,
        isRadio:0,
        'supplierId':$("#supplierId").val(),
        'branchId': $('#branchId').val(),
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
    };

    new publicGoodsServiceTem(queryParams,function(data){
        if(data.length==0){
            return;
        }
        if(searchKey){
            $("#gridEditOrder").datagrid("deleteRow", gridHandel.getSelectRowIndex());
            $("#gridEditOrder").datagrid("acceptChanges");
        }

        for(var i in data){
        	var rec = data[i];
        	rec.remark = "";
        }
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        var keyNames = {
            purchasePrice:'price',
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
    });
}
//保存
function saveItemHandel(){
    var isValid = $("#formAdd").form('validate');
    if(!isValid){
        return;
    }

    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isChcekPrice = false;
    var isChcekNum = false;
    $.each(rows,function(i,v){
        v["rowNo"] = i+1;
        if(!v["skuName"]){
            messager("第"+(i+1)+"行，货号不正确");
            isCheckResult = false;
            return false;
        };
        if(parseFloat(v["price"])<=0&&v["isGift"]==0){
            isChcekPrice = true;
        }
         //数量判断
        if(parseFloat(v["realNum"])<=0){
        	isChcekNum = true;
        }
    });
    if(isCheckResult){
        if(isChcekPrice){
            $.messager.confirm('系统提示',"单价存在为0，重新修改",function(r){
                if (r){
                    return ;
                }else{
                	 saveDataHandel(rows);
                }
            });
        }else{
        	if(isChcekNum){
       		 $.messager.confirm('提示','存在数量为0的商品,是否继续保存?',function(data){
       			if(data){
       				saveDataHandel(rows);
       		    }
       		 });
         	}else{
         		saveDataHandel(rows);
         	}
        }
    }
    

}
function saveDataHandel(rows){
    gFunStartLoading();
    //供应商
    var supplierId = $("#supplierId").val();
    //收货机构
    var branchId = $("#branchId").val();
    //付款期限
    var paymentTime = $("#paymentTime").val();
    //采购员
    var salesmanId = $("#salesmanId").val();
    //引用单号
    var refFormNo = $("#refFormNo").val();
    //备注
    var remark = $("#remark").val();

    //TODO 计算获取商品总数量和总金额
    //商品总数量
    var totalNum = 0;
    //总金额
    var amount=0;

    //验证表格数据


    var footerRows = $("#gridEditOrder").datagrid("getFooterRows");
    if(footerRows){
        totalNum = parseFloat(footerRows[0]["realNum"]||0.0).toFixed(4);
        amount = parseFloat(footerRows[0]["amount"]||0.0).toFixed(4);
    }

    var reqObj = {
        supplierId:supplierId,
        branchId:branchId,
        paymentTime:paymentTime,
        salesmanId:salesmanId,
        refFormNo:refFormNo,
        remark:remark,
        totalNum:totalNum,
        amount:amount,
        oldRefFormNo:"",
        detailList:rows
    };
    
    var req = JSON.stringify(reqObj);

    $.ajax({
        url:contextPath+"/form/purchase/saveReturn",
        type:"POST",
        contentType:'application/json',
        data:req,
        success:function(result){
            gFunEndLoading();
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功！", "info",function(){
                    location.href = contextPath +"/form/purchase/returnEdit?formId=" + result["formId"];
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

//直接查询商品
function queryGoodsList() {

    var queryParams = {
        formType:'PR',
        key:"",
        isRadio:'',
        'supplierId':$("#supplierId").val(),
        'branchId': $('#branchId').val(),
        sourceBranchId:'',
        targetBranchId:'',
        flag:'0',
        page:1,
        rows:10000
    };
    var url =  contextPath + '/goods/goodsSelect/getGoodsList';
    $.ajax({
        url:url,
        type:'POST',
        data:queryParams,
        success:function(data){
            gFunStartLoading();
            if(data && data.rows){
                var addDefaultData  = gridHandel.addDefault(data.rows,gridDefault);
                var keyNames = {
                    purchasePrice:'price',
                    id:'skuId',
                    disabled:'',
                    pricingType:'',
                    inputTax:'tax'
                };
                var rows = gFunUpdateKey(addDefaultData,keyNames);
                $("#"+gridName).datagrid("loadData",rows);
            }
        },
        error:function(){
            gFunEndLoading();
            messager("数据查询失败");
        }
    })
}


function selectSupplier(){
	new publicSupplierService(function(data){
        if( $("#supplierId").val() != "" && data.id != $("#supplierId").val()){
            $.messager.confirm('提示','修改供应商后会清空明细，是否要修改？',function(r){
                if(r){
                    $("#supplierId").val(data.id);
                    $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
                    // 是否自动加载商品
                    if($("#cascadeGoods").val() == 'true'){
                        queryGoodsList();
                    }
                }
            })
        }

	});
}
function selectOperator(){
	new publicOperatorService(function(data){
		$("#salesmanId").val(data.id);
		$("#operateUserName").val(data.userName);
	});
}
function selectBranch(){
	new publicBranchService(function(data){
		$("#branchId").val(data.branchesId);
		$("#branchName").val("["+data.branchCode+"]"+data.branchName);
	},0);
}

function toImportproduct(type){
    var branchId = $("#branchId").val();
    if(!branchId){
        messager("请先选择收货机构");
        return;
    }
    var param = {
        url:contextPath+"/form/purchase/importList",
        tempUrl:contextPath+"/form/purchase/exportTemp",
        type:type,
        branchId:branchId,
    }
    new publicUploadFileService(function(data){
        updateListData(data);
        
    },param)
}

function updateListData(data){
	   // var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
	    //var addDefaultData  = gridHandel.addDefault(data,gridDefault);
        $.each(data,function(i,val){
        	data[i]["remark"] = "";
            data[i]["realNum"]=data[i]["realNum"]||0;
            data[i]["largeNum"]  = (parseFloat(data[i]["realNum"]||0)/parseFloat(data[i]["purchaseSpec"])).toFixed(4);
            data[i]["amount"]  = parseFloat(data[i]["purchasePrice"]||0)*parseFloat(data[i]["realNum"]||0);
        });
	    var keyNames = {
	        purchasePrice:'price',
	        id:'skuId',
	        disabled:'',
	        pricingType:'',
	        inputTax:'tax'
	    };
	    var rows = gFunUpdateKey(data,keyNames);
	    var argWhere ={skuCode:1};  //验证重复性
	    var isCheck ={isGift:1 };   //只要是赠品就可以重复
	    var newRows = gridHandel.checkDatagrid(rows,argWhere,isCheck);

	    $("#gridEditOrder").datagrid("loadData",rows);
	}

//模板导出
function exportTemp(){
	var type = $("#temple").attr("value");
	//导入货号
	if(type==0){
		location.href=contextPath+'/form/purchase/exportTemp?type='+type;
	//导入条码
	}else if(type==1){
		location.href=contextPath+'/form/purchase/exportTemp?type='+type;
	}
}

function selectForm(){
	//引用单据类型
	var refFormNoType = $(':radio[name=refFormNoType]:checked').val();
	if(refFormNoType == 'PI'){
		new publicPurchaseFormService("PI",function(data){
			$("#refFormNo").val(data.form.formNo);
			//根据选择的采购单，带出采购单的信息
	        var keyNames = {
	            realNum:'maxRealNum',
	        };
	        
	        var newRows = gFunUpdateKey(data.list,keyNames);
	        
		    var keylargeNum = {
		    		largeNum:'maxlargeNum',
	    	    };
		    
	        var newRows = gFunUpdateKey(newRows,keylargeNum);
	        
            $("#gridEditOrder").datagrid("loadData",newRows);
            //供应商
            $("#supplierId").val(data.form.supplierId);
            $("#supplierName").val(data.form.supplierName);
            //收货机构
            $("#branchId").val(data.form.branchId);
            $("#branchName").val(data.form.branchName);
            //采购员
            $("#salesmanId").val(data.form.salesmanId);
            $("#operateUserName").val(data.form.salesmanName);
		});
	}else if(refFormNoType == 'DI'){
	    var param = {
	        type:'DI',
            targetBranchId:$('#branchId').val()
        }
		new publicDeliverFormService(param,function(data){
			var referenceId = "";
			referenceId = data.id;
			$("#refFormId").val(referenceId);
			$("#refFormNo").val(data.formNo);
			$("#branchId").val(data.targetBranchId);
			$("#branchName").val(data.targetBranchName);
			loadLists(referenceId);
		});
	}
}

function loadLists(referenceId){
	$("#gridEditOrder").datagrid("options").method = "post";
	$("#gridEditOrder").datagrid('options').url = contextPath+"/form/deliverFormList/getDeliverFormLists?deliverFormId="+referenceId + "&deliverType=DI";
	$("#gridEditOrder").datagrid('load');
}

//返回列表页面
function back(){
	location.href = contextPath+"/form/purchase/returnList";
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
        data[i]["realNum"]=data[i]["realNum"]||0;
        data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["realNum"]||0);
        data[i]["largeNum"]  = (parseFloat(data[i]["realNum"]||0)/data[i]["purchaseSpec"]).toFixed(4);
        
        
    });
    var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
    var argWhere ={skuCode:1};  //验证重复性
    var newRows = gridHandel.checkDatagrid(nowRows,data,argWhere,{});

    $("#"+gridHandel.getGridName()).datagrid("loadData",newRows);
    messager("导入成功");
}

//模板导出
function exportTemp(){
	var type = $("#temple").attr("value");
	//导入货号
	if(type==0){
		location.href=contextPath+'/form/purchase/exportTemp?type='+type;
	//导入条码
	}else if(type==1){
		location.href=contextPath+'/form/purchase/exportTemp?type='+type;
	}
}
