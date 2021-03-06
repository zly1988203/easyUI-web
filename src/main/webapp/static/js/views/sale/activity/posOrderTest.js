$(function(){
    initDatagridEditOrder();
});

var gridDefault = {
    quantity:0,
}
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
            {field:'quantity',title:'数量',width:'80px',align:'right',
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
                        min:0,
                        precision:4,
                        onChange: onChangequantity,
                    }
                },
            },
            {field:'price',title:'单价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
                },
                options:{
                    min:0,
                    precision:4,
                }
            },
            {field:'amount',title:'金额',width:'80px',align:'right',
            	 formatter : function(value, row, index) {
                     if(row.isFooter){
                         return;
                     }
                     if(!row.amount){
                    	 row.amount = parseFloat(value||0).toFixed(4);
                     }
                     return '<b>'+parseFloat(value||0).toFixed(4)+'</b>';
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
            {field:'salePrice',title:'销售价',width:'80px',align:'right',
                formatter : function(value, row, index) {
                    if(row.isFooter){
                        return;
                    }
                    return '<b>'+parseFloat(value||0).toFixed(2)+'</b>';
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
        onLoadSuccess : function() {
            gridHandel.setDatagridHeader("center");
            
        }
    });
    gridHandel.setLoadData([$.extend({},gridDefault)]);
}

//监听商品数量
function onChangequantity(newV,oldV) {
    if(!gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'skuCode')){
        return;
    }
    var priceValue = gridHandel.getFieldData(gridHandel.getSelectRowIndex(),'price');
    gridHandel.setFieldValue('amount',priceValue*newV);//金额=数量*单价
    
    if(oldV){
    	 $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());
    }
    var rows = gridHandel.getRows();
    var totalAmount = 0;
    for(var i in rows){
    	totalAmount += ( parseFloat(rows[i]['amount']) );
    }
    $("#totalAmount").val(totalAmount.toFixed(4));
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
    if(!branchId){
    	$_jxc.alert("请先选择结算机构");
        return;
    }
    var param = {
        type:'',
        key:searchKey,
        isRadio:0,
        sourceBranchId:"",
        targetBranchId:"",
        branchId:branchId,
        supplierId:'',
        flag:'0',
    }

    new publicGoodsServiceTem(param,function(data){
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
        	salePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:'',
            inputTax:'tax'
        };
        var rows = gFunUpdateKey(addDefaultData,keyNames);
        var argWhere ={skuCode:0};  //验证重复性
        
        var newRows = gridHandel.checkDatagrid(nowRows,rows);

        $("#gridEditOrder").datagrid("loadData",newRows);

        gridHandel.setLoadFocus();
        setTimeout(function(){
            gridHandel.setBeginRow(gridHandel.getSelectRowIndex()||0);
            gridHandel.setSelectFieldName("largeNum");
            gridHandel.setFieldFocus(gridHandel.getFieldTarget('largeNum'));
        },100)
    });
}

//保存
function saveItemHandel(){
    $("#gridEditOrder").datagrid("endEdit", gridHandel.getSelectRowIndex());

    var rows = gridHandel.getRows();
    if(rows.length==0){
        $_jxc.alert("表格不能为空");
        return;
    }
    var isCheckResult = true;
    var isChcekPrice = false;
    var isChcekNum = false;
    $.each(rows,function(i,v){
        v["num"] = i+1;
        if(!v["skuName"]){
            $_jxc.alert("第"+(i+1)+"行，货号不正确");
            isCheckResult = false;
            return false;
        };
        //数量判断
        if(parseFloat(v["quantity"])<=0){
        	isChcekNum = true;
        }
    });
    if(isCheckResult){
        if(isChcekPrice){
            $_jxc.confirm("单价存在为0，重新修改",function(r){
                if (r){
                    return ;
                }else{
                	 saveDataHandel(rows);
                }
            });
        }else{
        	if(isChcekNum){
                $_jxc.confirm('存在数量为0的商品,是否继续保存?',function(data){
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
	 //采购员
    var salesmanId = $("#salesmanId").val();
    
	if(!salesmanId){
		$_jxc.alert("收银员不能为空");
		return ;
	}
	
    //商品总数量
    var totalNum = 0;
    //总金额
    var amount=0;
    //收货机构
    var branchId = $("#branchId").val();
   
    
    for(var i in rows){
    	amount += parseFloat(rows[i].amount);
    }

    var reqObj = {
        branchId:branchId,
        token:"0",
        machinecode:"01",
        userId:salesmanId,
        data:{
        	amount:amount,
        	list:rows
        }
    };
    
    var req = JSON.stringify(reqObj);

    $.ajax({
        url:contextPath+"/order/order/prepay",
        type:"POST",
        contentType:'application/json',
        data:req,
        success:function(result){
        	
        	if(result.code == 0){
        		$("#textDialog").dialog('open');
        		
            	payInfo = result.data;
            	
            	$("#orderId").html(payInfo.orderId);
            	$("#prepayId").html(payInfo.prepayId);
            	
            	$("#orderTotalAmount").html(payInfo.totalAmount);
            	$("#saleAmount").html(payInfo.saleAmount);
            	$("#discountAmount").html(payInfo.discountAmount);
            	$("#subZeroAmount").html(payInfo.subZeroAmount);
            	$("#paymentAmount").html(payInfo.paymentAmount);
            	
            	$("#receiveAmount").val(payInfo.paymentAmount);
            	
            	var list = payInfo.tradeOrderItems;
            	
            	var line = "";
            	line += "<tr>";
            	line += "<th>skuId</th>";
            	line += "<th>货号</th>";
            	line += "<th>原单价</th>";
            	line += "<th>单价</th>";
            	line += "<th>数量</th>";
            	line += "<th>小计</th>";
            	line += "<th>活动类型</th>";
            	line += "</tr>";
            	
            	
            	for(var i in list){
            		var item = list[i];
            		var str = "<tr>";
            		str += ("<td>" + item.skuId + "</td>");
            		str += ("<td>" + item.skuCode + "</td/>");
            		str += ("<td>" + item.originalPrice + "</td/>");
            		str += ("<td>" + item.salePrice + "</td>");
            		str += ("<td>" + item.saleNum + "</td>");
            		str += ("<td>" + item.saleAmount + "</td>");
            		
            		if(item.activityType == 1){
            			str += ("<td>特价</td>");
            		}else if(item.activityType == 2){
            			str += ("<td>折扣</td>");
            		}else if(item.activityType == 3){
            			str += ("<td>偶数特价</td>");
            		}else if(item.activityType == 4){
            			str += ("<td>换购</td>");
            		}else if(item.activityType == 5){
            			str += ("<td>满减</td>");
            		}else if(item.activityType == 6){
            			str += ("<td>组合商品</td>");
            		}else{
            			str += ("<td>普通商品</td>");
            		}
            		
            		str += "</tr>";
            		
            		line += str;
            	}
            	
            	$("#goodsList").html(line);
        	}else{
        		$_jxc.alert(result.message);
        	}
           
        },
        error:function(result){
        	
        }
    });

}
var payInfo = {};

function pay(){
	
	var payWay = $("input[name='payWay']:checked").val();
	var receiveAmount = $("#receiveAmount").val();
	var paymentCode = $("#paymentCode").val();
	
	var branchId = $("#branchId").val();
	var branchCode = $("#branchCode").val();
	   
	var salesmanId = $("#salesmanId").val();
	
	var reqObj = {
        branchId:branchId,
        branchCode:branchCode,
        token:"0",
        machinecode:"0A1B2C",
        userId:salesmanId,
        posNo:"01",
        data:{
        	prepayId : payInfo.prepayId,
        	payWay : payWay,
        	receiveAmount : receiveAmount,
        	paymentCode : paymentCode
        }
    };
	
	var req = JSON.stringify(reqObj);
	
	$.ajax({
		url:contextPath+"/order/order/pay",
		type:"POST",
		contentType:'application/json',
		data:req,
		success:function(result){
			
		},
		error:function(result){
			
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
    	console.log(data);
        $("#branchId").val(data.branchesId);
        $("#branchCode").val(data.branchCode);
        $("#branchName").val("["+data.branchCode+"]"+data.branchName);
    },0);
}

