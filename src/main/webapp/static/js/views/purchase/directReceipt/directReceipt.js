/**
 * 
 * 全部js代码
 * 编辑和审核公用页面
 * 
 */

var directStatus = 'add';

var gridName = "gridDirectDetail";

var oldData = {};
var isdisabled = false;
var url;

$(function(){
	//当前页面状态 新增 修改 审核
	directStatus = $('#directStatus').val();
	//修改页面的单据id
	var formId = $('#formId').val();
	if(directStatus === 'add'){
		$("#branchName").val(sessionBranchCodeName);
		$("#branchId").val(sessionBranchId);
		$("#createTime").html(new Date().format('yyyy-MM-dd hh:mm'));
		oldData = {
				    branchName:$('#branchName').val(),
                    supplierId:$("#supplierId").val(),
                    saleWay:$("#saleWay").val(),
                    remark:$("#remark").val(),
        }
	}else if(directStatus === '0'){
		oldData = {
		            branchName:$('#branchName').val(),
                    supplierId:$("#supplierId").val(),
                    saleWay:$("#saleWay").val(),
                    remark:$("#remark").val(),
        }

		url = contextPath +"/directReceipt/getDetailList?formId=" + formId;
		$('#already-examine').css('display','none');
		$('#btnCheck').css('display','black');
		var saleWay = $('#saleWay').val();
        if(saleWay == 'A'){
        	$("#saleWayName").val('购销');
        }else if(saleWay == 'B'){
        	$("#saleWayName").val('代销');        	
	    }else if(saleWay == 'C'){
	    	$("#saleWayName").val('联营');        	
		}else if(saleWay == 'D'){
			$("#saleWayName").val('扣率代销');        	
		}
	}else if(directStatus === '1'){
		url = contextPath +"/directReceipt/getDetailList?formId=" + formId;
		isdisabled = true;
		$('#already-examine').css('display','black');
        $('#remark').prop('readOnly','readOnly');
        $('#btnSave').addClass("uinp-no-more");
        $('#btnSave').prop('disabled','disabled ');
        $('#btnCheck').addClass("uinp-no-more");
        $('#btnCheck').prop('disabled','disabled ');
        $('#btnSelect').addClass("uinp-no-more");
        $('#btnSelect').prop('disabled','disabled ');
        $('#btnImpSkuCode').addClass("uinp-no-more");
        $('#btnImpSkuCode').prop('disabled','disabled ');
        $('#btnImpBarCode').addClass("uinp-no-more");
        $('#btnImpBarCode').prop('disabled','disabled ');
		var saleWay = $('#saleWay').val();
        if(saleWay == 'A'){
        	$("#saleWayName").val('购销');
        }else if(saleWay == 'B'){
        	$("#saleWayName").val('代销');        	
	    }else if(saleWay == 'C'){
	    	$("#saleWayName").val('联营');        	
		}else if(saleWay == 'D'){
			$("#saleWayName").val('扣率代销');        	
		}
	}else{
		
	}
	initDirectDataGrid();
})

var gridDefault = {
    realNum:0,
    isGift:0,
}
var editRowData = null;
var gridHandel = new GridClass();
function initDirectDataGrid(){
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
	                selectGoods(arg);
	            }
	        },
	    })
	    	    
	  $("#"+gridName).datagrid({
       method:'post',
   	   url:url,
       align:'center',
       singleSelect:false,  // 单选 false多选
       rownumbers:true,    // 序号
       showFooter:true,
       height:'100%',
       width:'100%',
          columns:[[
			{field:'ck',checkbox:true,hidden:isdisabled},
			{field:'cz',title:'操作',width:'60px',align:'center',hidden:isdisabled,
			    formatter : function(value, row,index) {
			        var str = "";
			        if(row.isFooter){
			            
			        }else{
			            str =  '<a name="add" class="add-line" data-index="'+index+'" onclick="addLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>&nbsp;&nbsp;' +
			                '&nbsp;&nbsp;<a name="del" class="del-line" data-index="'+index+'" onclick="delLineHandel(event)" style="cursor:pointer;display:inline-block;text-decoration:none;"></a>';
			        }
			        return str;
			    }
			},

           {field:'skuId',hidden:'true'},
          
           {field:'skuCode',title:'货号',width: '70px',align:'left',
           	formatter:function(value,row,index){
           		if(row.isFooter){
           			return '<div class="ub ub-pc">合计</div> '
           		}
           		return value;
           	},
           	editor:{
	                type:'textbox',
	                options:{
	                	disabled:isdisabled,
	                }
           	}
           },
           {field:'skuName',title:'商品名称',width:'200px',align:'left'},
           {field:'barCode',title:'条码',width:'200px',align:'left'},
           {field:'unit',title:'单位',width:'60px',align:'left'},
           {field:'spec',title:'规格',width:'90px',align:'left'},
           {field:'purchaseSpec',title:'进货规格',width:'120px',align:'left'},
           {field:'largeNum',title:'箱数',width:'80px',align:'right',
               formatter : function(value, row, index) {
                   if(row.isFooter){
                       return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                   }
                   
                   if(!value){
                       row["largeNum"] = parseFloat(value||0).toFixed(2);
                   }
                   
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                       min:0,
                       precision:4,
                      onChange: onChangeLargeNum,
                       disabled:isdisabled,
                   }
               },
           },
           {field:'realNum',title:'数量',width:'100px',align:'right',
               formatter:function(value,row,index){
                   if(row.isFooter){
                       return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                   }
                   if(!value){
                       row["realNum"] = parseFloat(value||0).toFixed(2);
                   }
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                   	disabled:isdisabled,
                       min:0,
                       precision:4,
                       onChange: onChangeRealNum,
                   }
               }
           },
           {field:'price',title:'单价',width:'100px',align:'right',
               formatter:function(value,row,index){
                   if(row.isFooter){
                       return
                   }
                   if(!value){
                   	    row.price = parseFloat(value||0).toFixed(2);
                   }
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
           },
           {field:'amount',title:'金额',width:'100px',align:'right',
               formatter : function(value, row, index) {
                   if(row.isFooter){
                       return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                   }

                   if(!value){
                   	row.amount = parseFloat(value||0).toFixed(2);
                   }
                   
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                       disabled:true,
                       min:0,
                       precision:4,
                   }
               }
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
                       disabled:isdisabled,
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
           {field:'goodsCreateDate',title:'生产日期',width:'120px',align:'center',
               formatter : function(value, row,index) {
                   if(row.isFooter){
                       return;
                   }
                   return value?new Date(value).format('yyyy-MM-dd'):""
               },
               editor:{
                   type:'datebox',
                   options:{
                       disabled:isdisabled,
                   }
               },
           },
           {field:'tax',title:'税率',width:'80px',align:'right',
               formatter : function(value, row, index) {
                   if(row.isFooter){
                       return;
                   }
                   if(!row.tax){
                       row.tax = parseFloat(value||0).toFixed(2);
                   }

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
                   var taxAmountVal = (row.tax*(row.amount/(1+parseFloat(row.tax)))||0.0000).toFixed(2);
                   row["taxAmount"] = taxAmountVal;
                   return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
               },
               editor:{
                   type:'numberbox',
                   options:{
                       disabled:true,
                       min:0,
                       precision:4,
                   }
               },
           },
           {field:'remark',title:'备注',width:'200px',align:'left',
               editor:{
                   type:'textbox',
                   options:{
                       disabled:isdisabled,
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
       onLoadSuccess:function(data){
           if(data.rows.length>0){
               var config = {
                   date:['goodsCreateDate']
               }
               gFunFormatData(data.rows,config);
           }

    	   if(!oldData["grid"]){
		       	oldData["grid"] = $.map(gridHandel.getRows(), function(obj){
		    		return $.extend(true,{},obj);//返回对象的深拷贝
		    	});
			}
           gridHandel.setDatagridHeader("center");
           updateFooter();
       },
   });

    if(hasPurchasePrice==false){
        priceGrantUtil.grantPurchasePrice(gridName,["price","amount","taxAmount"])
    }

   if(directStatus === 'add'){
   	 gridHandel.setLoadData([$.extend({},gridDefault),$.extend({},gridDefault),
   	                         $.extend({},gridDefault),$.extend({},gridDefault)]);
   }
}

//限制转换次数
var n = 0;
var m = 0;
//监听箱数
function onChangeLargeNum(newV,oldV) {
    if("" == newV){
        m = 2;
        $_jxc.alert("商品箱数输入有误");
        gridHandel.setFieldValue('largeNum',oldV);
        return;
    }

    if(m > 0){
        m = 0;
        return;
    }

    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }

    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchaseSpec');
    if(!purchaseSpecValue){
        $_jxc.alert("没有商品规格,请审查");
        return;
    }

    var priceValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',parseFloat(purchaseSpecValue*priceValue*newV).toFixed(4)); //金额=箱数*单价*规格


    var largeNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'largeNum');
    if(largeNumVal&&oldV){
        n=1;
        var realNum = parseFloat(newV*purchaseSpecValue).toFixed(4);
        gridHandel.setFieldValue('realNum',realNum);
    }

    updateFooter();
}

//监听商品数量
function onChangeRealNum(newV,oldV) {
    if("" == newV){
        n= 2;
        $_jxc.alert("商品数量输入有误");
        gridHandel.setFieldValue('realNum',oldV);
        return;
    }

    if(n > 0){
        n = 0;
        return;
    }

    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    var purchaseSpecValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'purchaseSpec');
    if(!purchaseSpecValue){
        $_jxc.alert("没有商品规格,请审查");
        return;
    }
    
    var priceValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',priceValue*newV);                         //金额=数量*单价

    var largeNumVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'largeNum');

    if(largeNumVal&&oldV){
        m=1;
        var largeNumVal = parseFloat(newV/purchaseSpecValue).toFixed(4);
        gridHandel.setFieldValue('largeNum',largeNumVal);   //箱数=数量/商品规格
    }

    updateFooter();
}

//监听是否赠品
function onSelectIsGift(data){
    var _skuName = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuName');
    if(!_skuName)return;

    var checkObj = {
        skuCode: gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'skuCode'),
        isGift:data.id,
    };
    var arrs = gridHandel.searchDatagridFiled(gridHandel.getSelectRowIndex(),checkObj);
    if(arrs.length==0){
        var targetPrice = gridHandel.getFieldTarget('price');
        if(data.id=="1"){
            var priceVal = gridHandel.getFieldValue(gridHandel.getSelectRowIndex(),'price');
            $('#'+gridName).datagrid('getRows')[gridHandel.getSelectRowIndex()]["oldPrice"] = priceVal;
            $(targetPrice).numberbox('setValue',0);
            $(targetPrice).numberbox('disable');
        }else{
            $(targetPrice).numberbox('enable');
            var oldPrice =  $('#'+gridName).datagrid('getRows')[gridHandel.getSelectRowIndex()]["oldPrice"];
            if(oldPrice){
                $(targetPrice).numberbox('setValue',oldPrice);
            }
        }
        updateFooter();
    }else{
        var targetIsGift = gridHandel.getFieldTarget('isGift');
        $(targetIsGift).combobox('select', data.id=='1'?'0':'1');
        $_jxc.alert(data.id=='1'?'已存在相同赠品':'已存在相同商品');
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


//新增直送收货单
function addDirect(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var newData = {
        branchName:$('#branchName').val(),
        supplierId:$("#supplierId").val(),
        saleWay:$("#saleWay").val(),
        remark:$("#remark").val(),                  // 备注
        grid: $.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(directStatus === "add"){
        if(!gFunComparisonArray(oldData,newData)){
            $_jxc.alert("数据有修改，请先保存再新增");
            return;
        }
    }

	toAddTab("新增直送收货单",contextPath + "/directReceipt/add");
}

//新增保存
function saveDirectForm(){

    $("#"+datagridId).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    if(rows.length==0){
        $_jxc.alert("表格不能为空");
        return;
    }

    var isCheckResult = true;
    var isChcekPrice = false;
    var isChcekNum = false;
    $.each(rows,function(i,v){
        v["rowNo"] = i+1;
        if(!v["skuName"]){
            $_jxc.alert("第"+(i+1)+"行，货号不正确");
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
            $_jxc.confirm("单价存在为0，重新修改",function(r){
                if (r){
                    return ;
                }else{
                    saveDataHandel(rows, "/directReceipt/save");
                }
            });
        }else{
        	if(isChcekNum){
          		 $_jxc.confirm('存在数量为0的商品,是否继续保存?',function(data){
          			if(data){
          				saveDataHandel(rows, "/directReceipt/save");
          		    }
          		 });
        	}else{
        		saveDataHandel(rows, "/directReceipt/save");
        	}
        }
    }

}

function saveDataHandel(rows, url){
    gFunStartLoading();
    //供应商
    var supplierId = $("#supplierId").val();
    //经营方式
    var saleWay = $("#saleWay").val();
    //收货机构
    var branchId = $("#branchId").val();
    //备注
    var remark = $("#remark").val();
    //商品总数量
    var totalNum = 0;
    //总金额
    var amount=0;

    var footerRows = $("#"+gridName).datagrid("getFooterRows");
    if(footerRows){
        totalNum = parseFloat(footerRows[0]["realNum"]||0.0).toFixed(4);
        amount = parseFloat(footerRows[0]["amount"]||0.0).toFixed(4);
    }
    
     var jsonData = {
        supplierId:$('#supplierId').val(),
        saleWay:$("#saleWay").val(),
        branchId:$("#branchId").val(),
        remark:$("#remark").val(),                  // 备注
    }

    var id = $("#formId").val();
    var reqObj = {
		id:id,
        supplierId:supplierId,
        branchId:branchId,
        saleWay:saleWay,
        remark:remark,
        totalNum:totalNum,
        amount:amount,
        detailList:rows
    };
    var req = JSON.stringify(reqObj);

    $_jxc.ajax({
        url:contextPath + url,
        contentType:'application/json',
        data:req
    },function(result){
//        gFunEndLoading();
        console.log(result);
        if(result['code'] == 0){
            $_jxc.alert("操作成功！",function(){
                location.href = contextPath +"/directReceipt/edit?formId=" + result["formId"];
            });
        }else{
            $_jxc.alert(result['message']);
        }
    });
}

//查看 保存修改
function updateDirectForm() {
    $("#"+datagridId).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRowsWhere({skuName:'1'});
    $(gridHandel.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        $_jxc.alert("表格不能为空");
        return;
    }

    var isCheckResult = true;
    var isChcekPrice = false;
    var isChcekNum = false;
    $.each(rows,function(i,v){
        v["rowNo"] = i+1;
        if(!v["skuName"]){
            $_jxc.alert("第"+(i+1)+"行，货号不正确");
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
            $_jxc.confirm("单价存在为0，重新修改?",function(r){
                if (r){
                    return ;
                }else{
                    saveDataHandel(rows, "/directReceipt/update");
                }
            });
        }else{
        	if(isChcekNum){
         		 $_jxc.confirm('存在数量为0的商品,是否继续保存?',function(data){
         			if(data){
         	            saveDataHandel(rows, "/directReceipt/update");
         		    }
         		 });
	       	}else{
	            saveDataHandel(rows, "/directReceipt/update");
	       	}
        }
    }
    
}

function checkDirectForm(){
    //验证数据是否修改
    $("#"+gridName).datagrid("endEdit", gridHandel.getSelectRowIndex());
    var rows = gridHandel.getRows();
    if(rows.length==0){
        $_jxc.alert("表格不能为空");
        return;
    }
    var newData = {
        branchName:$('#branchName').val(),
        supplierId:$("#supplierId").val(),
        saleWay:$("#saleWay").val(),
        remark:$("#remark").val(),                  // 备注
        grid: $.map(gridHandel.getRows(), function(obj){
            return $.extend(true,{},obj);//返回对象的深拷贝
        })
    }

    if(!gFunComparisonArray(oldData,newData)){
        $_jxc.alert("数据有修改，请先保存再审核");
        return;
    }

    var num=0;
    $.each(rows,function(i,v){
        if(parseFloat(v["realNum"])<=0){
        	num++;
        }
    });
    if(num==rows.length){
   	 	$_jxc.alert("采购商品数量全部为0");
		return;
	}else if(parseFloat(num)>0){
		$_jxc.confirm("是否清除单据中数量为0的商品记录?",function(data){
	 		if(data){
	 		    checkOrder();
	 		}	
		});
	}else{
		 $_jxc.confirm('是否审核通过？',function(data){
			 if(data){
				 checkOrder();
			 }
		    
		 });
	}
}

function checkOrder(){
    gFunStartLoading();
    var id = $("#formId").val();
    $_jxc.ajax({
        url:contextPath+"/directReceipt/check",
    	data:{
    		formId:id,
    		status:1
    	}
    },function(result){
//        gFunEndLoading();
        if(result['code'] == 0){
            $_jxc.alert("操作成功！",function(){
                location.href = contextPath +"/directReceipt/edit?formId=" + id;
            });
        }else{
            new publicErrorDialog({
                width:380,
                height:220,
                "title":"审核失败",
                "error":result['message']
            });
        }
    });
}

//选择供应商
function selectSupplier(){
	var param = {
			saleWayNot:'purchase',
			isDirect:1
	}
    new publicSupplierService(function(data){
        // 切换供应商后清除商品数据
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        if( $("#supplierId").val() != "" && data.id != $("#supplierId").val() && nowRows.length > 0){
            $_jxc.confirm('修改供应商后会清空明细，是否要修改？',function(r){
                if (r){
                    $("#supplierId").val(data.id);
                    $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
                  $("#saleWay").val(data.saleWay);
                    if(data.saleWay == 'A'){
                        $("#saleWayName").val('购销');
                    }else if(data.saleWay == 'B'){
                        $("#saleWayName").val('代销');
                    }else if(data.saleWay == 'C'){
                        $("#saleWayName").val('联营');
                    }else if(data.saleWay == 'D'){
                        $("#saleWayName").val('扣率代销');
		            }
                    gridHandel.setLoadData([$.extend({},gridDefault)]);
                    // 是否自动加载商品
                    if($("#cascadeGoods").val() == 'true'){
                        queryGoodsList();
                    }
                }
            });
        }else if($("#supplierId").val() != "" && data.id != $("#supplierId").val() && nowRows.length == 0){
            $("#supplierId").val(data.id);
            $("#oldsupplierId").val(data.id);
            $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
            $("#saleWay").val(data.saleWay);
	        if(data.saleWay == 'A'){
	        	$("#saleWayName").val('购销');
	        }else if(data.saleWay == 'B'){
	        	$("#saleWayName").val('代销');
		    }else if(data.saleWay == 'C'){
		    	$("#saleWayName").val('联营');
			}else if(data.saleWay == 'D'){
				$("#saleWayName").val('扣率代销');
			}
            gridHandel.setLoadData([$.extend({},gridDefault)]);
	        // 是否自动加载商品
	        if($("#cascadeGoods").val() == 'true'){
	            queryGoodsList();
	        }
        }else {
            $("#supplierId").val(data.id);
            $("#oldsupplierId").val(data.id);
            $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
            $("#saleWay").val(data.saleWay);
            if(data.saleWay == 'A'){
                $("#saleWayName").val('购销');
            }else if(data.saleWay == 'B'){
                $("#saleWayName").val('代销');
            }else if(data.saleWay == 'C'){
                $("#saleWayName").val('联营');
            }else if(data.saleWay == 'D'){
                $("#saleWayName").val('扣率代销');
            }
            // 是否自动加载商品
            if($("#cascadeGoods").val() == 'true'){
                queryGoodsList();
            }
            // gridHandel.setLoadData([$.extend({},gridDefault)]);
        }

    },param);
}

//直接查询商品
function queryGoodsList() {
//    gFunStartLoading();
   var queryParams = {
            formType:'PM',
            key:"",
            isRadio:'',
            'supplierId':$("#supplierId").val(),
            'branchId': $('#branchId').val(),
            sourceBranchId:'',
            targetBranchId:'',
            flag:'0',
            pageSize:1,
            page:1,
            rows:10000
        };
    var url =  contextPath + '/goods/goodsSelect/getGoodsList';
    $_jxc.ajax({
        url:url,
        data:queryParams
    },function(data){
//        gFunEndLoading();
        if(data && data.rows.length > 0){
            var addDefaultData  = gridHandel.addDefault(data.rows,gridDefault);
            var keyNames = {
            	purchasePrice:'price',
                inputTax:'tax'
            };
            var rows = gFunUpdateKey(addDefaultData,keyNames);
            $("#"+gridName).datagrid("loadData",rows);
        }else {
//            gFunEndLoading();
            gridHandel.setLoadData([$.extend({},gridDefault)]);
        }
    })
}

//收货机构
function selectBranch(){
    new publicBranchService(function(data){
        var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
        if( $("#branchId").val() != "0" && data.branchesId != $("#branchId").val() && nowRows.length > 0){
            $_jxc.confirm('修改收货机构后会清空明细，是否要修改？',function(r){
                if (r){
                    $("#branchId").val(data.branchesId);
                    $("#branchName").val("["+data.branchCode+"]"+data.branchName);

                    gridHandel.setLoadData([$.extend({},gridDefault)]);
                    // 是否自动加载商品
                    if($("#cascadeGoods").val() == 'true' && $("#supplierId").val() != ""){
                        queryGoodsList();
                    }
                }
            });
        }else if($("#branchId").val() != "0" && data.branchesId != $("#branchId").val() && nowRows.length == 0){
            $("#branchId").val(data.branchesId);
            $("#branchName").val("["+data.branchCode+"]"+data.branchName);
            gridHandel.setLoadData([$.extend({},gridDefault)]);
            // 是否自动加载商品
            if($("#cascadeGoods").val() == 'true' && $("#supplierId").val() != ""){
                queryGoodsList();
            }
        }else{
            $("#branchId").val(data.branchesId);
            $("#branchName").val("["+data.branchCode+"]"+data.branchName);
            gridHandel.setLoadData([$.extend({},gridDefault)]);
            // 是否自动加载商品
            if($("#cascadeGoods").val() == 'true' && $("#supplierId").val() != ""){
                queryGoodsList();
            }
        }
    },0);
}

//选择商品
function selectGoods(searchKey){
	var branchId = $("#branchId").val();
	var sourceBranchId = branchId;
	var targetBranchId = branchId;
	var supplierId = $("#supplierId").val();

	if(!branchId || !$.trim(branchId)){
		$_jxc.alert("请选择机构");
		return;
	}
	if(!supplierId || !$.trim(supplierId)){
		$_jxc.alert("请选择供应商");
		return;
	}

    //控制弹框
	if(typeof(searchKey)=="undefined"){ 
		searchKey = "";
	}
    
    var param = {
    		type:'PM',
    		key:searchKey,
    		isRadio:'',
    		branchId:branchId,
    		sourceBranchId:'',
    		targetBranchId:'',
    		supplierId:supplierId,
    		flag:'0',
    }
    
    new publicGoodsServiceTem(param,function(data){
    	if(searchKey){
	        $("#"+gridName).datagrid("deleteRow", gridHandel.getSelectRowIndex());
	        $("#"+gridName).datagrid("acceptChanges");
	    }
    	
		 var nowRows = gridHandel.getRowsWhere({skuCode:'1'});
		 var addDefaultData  = gridHandel.addDefault(data,gridDefault);
		 var keyNames = {
		    purchasePrice:'price',
            inputTax:'tax'
         };
         var rows = gFunUpdateKey(addDefaultData,keyNames);
         var argWhere ={skuCode:1};  // 验证重复性
         var isCheck ={isGift:1 };   // 只要是赠品就可以重复
         var newRows = gridHandel.checkDatagrid(nowRows,rows,argWhere,isCheck);
         $("#"+gridName).datagrid("loadData",newRows);

        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("stocktakingNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('stocktakingNum'));
        },100)
    	
    });
}

/**
 * 导入商品
 * @param type 0货号  1条码
 */
function importDirectForm(type){
    var branchId = $("#branchId").val();
    // 判定机构是否存在
    if($("#branchId").val()==""){
        $_jxc.alert("请选择机构");
        return;
    }
    // 判定供应商是否存在
    if($("#supplierId").val()==""){
    	$_jxc.alert("请选择供应商");
    	return;
    }
    
    var param = {
        url:contextPath+"/directReceipt/importList",
        tempUrl:contextPath+"/directReceipt/exportTemp",
        branchId:branchId,
        type:type
    }
    new publicUploadFileService(function(data){
        updateListData(data);
    },param)
}

function updateListData(data){

    $.each(data,function(i,val){
        data[i]["remark"] = "";
        data[i]["realNum"]=data[i]["realNum"]||0;
        data[i]["largeNum"]  = (parseFloat(data[i]["realNum"]||0)/parseFloat(data[i]["purchaseSpec"])).toFixed(4);
        data[i]["amount"]  = parseFloat(data[i]["price"]||0)*parseFloat(data[i]["realNum"]||0);
    });

    var keyNames = {
	    purchasePrice:'price',
        inputTax:'tax'
    };
    var rows = gFunUpdateKey(data,keyNames);

    var argWhere ={skuCode:1};  //验证重复性
    var isCheck ={isGift:1 };   //只要是赠品就可以重复
    var newRows = gridHandel.checkDatagrid([],rows,argWhere,isCheck);
    $("#"+gridName).datagrid("loadData",newRows);

}

/**
 * 导出表单
 */
function exportDirectForm(){
	var length = $("#"+gridName).datagrid('getData').total;
	if(length == 0){
		$_jxc.alert("无数据可导");
		return;
	}
	if(length>10000){
		$_jxc.alert("当次导出数据不可超过1万条，现已超过，请重新调整导出范围！");
		return;
	}
	$("#addqueryForm").attr("action",contextPath+"/directReceipt/exportList?formId="+$("#formId").val());
	$("#addqueryForm").submit(); 
}
