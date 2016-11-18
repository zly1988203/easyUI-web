/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    initDatagridEditOutWareHosing();
    $("div").delegate("button","click",function(){
    	$("p").slideToggle();
    });
    
});
var editRowIndex = undefined;      //光标所在当前行
var editField = undefined;      //光标所在当前列
var gridHandel = new GridClass();
function initDatagridEditOutWareHosing(){
	var formId = $("#formId").val();
    $("#gridEditOutWareHosing").datagrid({
        //title:'普通表单-用键盘操作',
        method:'post',
    	url:contextPath+"/form/purchase/detailList?formId="+formId,
        align:'center',
        //toolbar: '#tb',     //工具栏 id为tb
        singleSelect:false,  //单选  false多选
        rownumbers:true,    //序号
        //pagination:true,    //分页
        //fitColumns:true,    //占满
        showFooter:true,
        height:'100%',
        columns:[[
            {field:'ck',checkbox:true},
            {field:'cz',title:'操作',width:100,align:'center',
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
            {field:'stockNo',title:'货号',width:100,align:'center',editor:'textbox'},
            {field:'encode',title:'自编码',width:100,align:'center'},
            {field:'batch',title:'批次',width:100,align:'center',
            	editor:{
                    type:'textbox',
                },
            },
            {field:'barCode',title:'品名',width:100,align:'center'},
            {field:'unit',title:'单位',width:100,align:'center'},
            {field:'spec',title:'规格',width:100,align:'center'},
            {field:'largeNum',title:'箱数',width:100,height:60,align:'center',
                editor:{
                    type:'numberbox',
                    value:0,
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field:'realNum',title:'数量',width:100,align:'center',
                editor:{
                    type:'numberbox',
                    value:'0',
                    options:{
                        min:0,
                        precision:0,
                    }
                },
            },
            {field:'price',title:'单价',width:100,align:'center',
                editor:{
                    type:'numberbox',
                    options:{
                        min:0,
                        precision:4,
                    }
                },
            },
            {field:'amount',title:'金额',width:100,align:'center',
            	formatter: function(value,row,index){
            		return row.amount = '0.0000';
            	}
            },
            {field:'salePrice',title:'销售价',width:100,align:'center'},
            {field:'salePrice1',title:'销售金额',width:100,align:'center'},
            {field:'goodsCreateDate',title:'生产日期',width:100,align:'center',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return;
                    }
                    return value;
                },
                editor:{
                    type:'datebox',
                },
            },
            {field:'goodsExpiryDate',title:'有效期',width:100,align:'center',
                formatter : function(value, row,index) {
                    if(row.isFooter){
                        return;
                    }
                    return value;
                },
                editor:{
                    type:'datebox',
                },
            },
            {field:'tax',title:'税率',width:100,align:'center',
                options:{
                    min:0,
                    precision:4,
                }
            },
            {field:'taxAmount',title:'税额',width:100,align:'center',
            	formatter: function(value,row,index){
            		return '0.0000';
            	}
            },
            {field:'creatPlace',title:'产地',width:100,align:'center'},
            {field:'remark',title:'备注',width:100,align:'center',
            	editor:{
                    type:'textbox',
                },
            },
            {field:'thisStore',title:'当前库存',width:100,align:'center'},
            {field:'targetStore',title:'目标仓库',width:100,align:'center'}
        ]],
        onClickCell:function(rowIndex,field,value){
            $('#gridEditOutWareHosing').datagrid('endEdit', editRowIndex);     //结束之前的编辑
            $('#gridEditOutWareHosing').datagrid('selectRow', rowIndex);
            $('#gridEditOutWareHosing').datagrid('beginEdit', rowIndex);
            editRowIndex = rowIndex;
            editField = field;
            var ed = $('#gridEditOutWareHosing').datagrid('getEditor', {index:rowIndex,field:editField});
            if(ed&&ed.target){
                gridHandel.setFieldFocus(ed.target);
            }else{
                ed = $('#gridEditOutWareHosing').datagrid('getEditor', {index:rowIndex,field:"stockNo"});
                editField = "stockNo";
            }
            onChangeDatagridEdit(rowIndex);
        },
        onLoadSuccess:function(data){
            updateFooter();
        }
    });


    $.extend($.fn.datagrid.methods, {
        keyCtr : function (jq) {
            return jq.each(function () {
                var grid = $(this);
                grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                    switch (e.keyCode) {
                        case 37: //左键
                            var field = getLRFiledName(editRowIndex,editField,'left');
                            var ed = grid.datagrid('getEditor', {index:editRowIndex,field:field});
                            if(ed){
                                gridHandel.setFieldFocus(ed.target);
                                setTimeout(function(){
                                    $(ed.target).textbox('textbox').select();
                                },10)
                                editField= field;
                            }
                            break;
                        case 13: //回车键
                            if(editField=="skuCode"){
                                var ed = grid.datagrid('getEditor', {index:editRowIndex,field:editField});
                                console.log($(ed.target).textbox('getValue'));
                                selectGoods($(ed.target).textbox('getValue'));
                            }
                            break;
                        case 39: //右键
                            var field = getLRFiledName(editRowIndex,editField,'right');
                            var ed = grid.datagrid('getEditor', {index:editRowIndex,field:field});
                            if(ed){
                                gridHandel.setFieldFocus(ed.target);
                                setTimeout(function(){
                                    $(ed.target).textbox('textbox').select();
                                },10);

                                editField= field;
                            }
                            break;
                        case 38: //上键
                            if(editRowIndex>0){
                                var lastIndex = editRowIndex-1;
                                grid.datagrid('endEdit', editRowIndex);//结束之前的编辑
                                //grid.datagrid('selectRow', lastIndex);
                                grid.datagrid('beginEdit', lastIndex);
                                editRowIndex = lastIndex;
                                var ed = grid.datagrid('getEditor', {index:lastIndex,field:editField});
                                if(ed){
                                    gridHandel.setFieldFocus(ed.target);
                                    setTimeout(function(){
                                        $(ed.target).textbox('textbox').select();
                                    },10)
                                }
                            }
                            break;
                        case 40: //下键
                            if(grid.datagrid('getRows').length-editRowIndex>1){
                                var lastIndex = editRowIndex+1;
                                grid.datagrid('endEdit', editRowIndex);//结束之前的编辑
                                //grid.datagrid('selectRow', lastIndex);
                                grid.datagrid('beginEdit', lastIndex);
                                editRowIndex = lastIndex;
                                var ed = grid.datagrid('getEditor', {index:lastIndex,field:editField});
                                if(ed&&ed.target){
                                    gridHandel.setFieldFocus(ed.target);
                                    setTimeout(function(){
                                        $(ed.target).textbox('textbox').select();
                                    },10);
                                }
                                onChangeDatagridEdit(lastIndex);
                            }
                            break;
                    }
                });
            });
        }
    });
    
    $("#gridEditOutWareHosing").datagrid({}).datagrid("keyCtr");
}

var gridDefault = {
    largeNum:0,
    realNum:0,
    isGift:0,
}
function onChangeDatagridEdit(rowIndex){
	var clickRow = $('#gridEditOutWareHosing').datagrid('getRows')[rowIndex];
    //监听箱数值改变事件
    var edLargeNum = $('#gridEditOutWareHosing').datagrid('getEditor', { index: rowIndex, field: 'largeNum' });
    var edRealNum = $('#gridEditOutWareHosing').datagrid('getEditor', {index:rowIndex,field:"realNum"});
    var purchaseSpecValue = gridHandel.getFieldData('gridEditOutWareHosing',rowIndex,'purchaseSpec');
    if(!purchaseSpecValue){
        messager("没有商品规格,请审查");
        return;
    }
    $(edLargeNum.target).numberbox({ onChange: function (newV,oldV) {
        //数量=商品规格*箱数
        $(edRealNum.target).numberbox('setValue',purchaseSpecValue*newV);
        updateFooter();
    }
    });
    //监听数量值改变事件
    $(edRealNum.target).numberbox({ onChange: function (newV,oldV) {
        var edAmount = $('#gridEditOutWareHosing').datagrid('getEditor', {index:rowIndex,field:"amount"});
        //金额=数量*单价
        var edPrice = gridHandel.getFieldValue('gridEditOutWareHosing',rowIndex,'price');
        clickRow.amount = edPrice*newV;
        //$(edAmount.target).numberbox('setValue',edPrice*newV);
        $(edLargeNum.target).numberbox('setValue',(newV/purchaseSpecValue).toFixed(4));

        updateFooter();
    }
    });
}
//合计
function updateFooter(){
    var largeNum = 0.0;
    var realNum= 0.0;
    var amount= 0.0;;
    var rows = gridHandel.getRows("gridEditOutWareHosing");
    if($('#gridEditOutWareHosing').datagrid('getEditors')&&editRowIndex){
        var obj = {
            largeNum:gridHandel.getFieldValue('gridEditOutWareHosing',editRowIndex,'largeNum')||0,
            realNum:gridHandel.getFieldValue('gridEditOutWareHosing',editRowIndex,'realNum')||0,
            amount:gridHandel.getFieldValue('gridEditOutWareHosing',editRowIndex,'amount')||0,
        };
        rows.push(obj);
    }
    $.each(rows,function(i,row){
        largeNum += parseFloat(row["largeNum"]?row["largeNum"]:0.0);
        realNum +=parseFloat(row["realNum"]?row["realNum"]:0.0);
        amount += parseFloat(row["amount"]?row["amount"]:0.0);
    })
    $('#gridEditOutWareHosing').datagrid('reloadFooter',[
        {
            "isFooter":true,
            "largeNum":largeNum.toFixed(4),
            "realNum":realNum.toFixed(4),
            "amount":amount.toFixed(4),
        }
    ]);
}
function getLRFiledName(index,field,type){
    var row = $("#gridEditOutWareHosing").datagrid('getEditors', index);
    var searchField = field;
    for(var i=0;i<row.length;i++){
        if(row[i].field==field){
            if(type=='left'&&i>0){
                searchField = row[i-1].field;
            }
            if(type=='right'&&i<row.length-1){
                searchField = row[i+1].field;
            }
        }
    }
    return searchField;
}
//插入一行
function addLineHandel(event){
    event.stopPropagation();
    $("#gridEditOutWareHosing").datagrid("endEdit", editRowIndex);
    var index = $(event.target).attr('data-index')||0;
    $("#gridEditOutWareHosing").datagrid("insertRow",{
        index:parseInt(index)+1,
        row:gridDefault
    });
    setTimeout(function(){
        $("#gridEditOutWareHosing").datagrid("loadData",$("#gridEditOutWareHosing").datagrid("getRows"));
    },10);
}
//删除一行
function delLineHandel(event){
    event.stopPropagation();
    if($("#gridEditOutWareHosing").datagrid("getRows").length==1){
        return;
    }
    $("#gridEditOutWareHosing").datagrid("endEdit", editRowIndex);
    var index = $(event.target).attr('data-index');
    console.log("addLine"+$(event.target).attr('data-index'));
    $("#gridEditOutWareHosing").datagrid("deleteRow",index);
    setTimeout(function(){
        $("#gridEditOutWareHosing").datagrid("loadData",$("#gridEditOutWareHosing").datagrid("getRows"));
    },10)
}
//选择商品
function selectGoods(searchKey){
    new publicGoodsService("",function(data){
        if(searchKey){
            $("#gridEditOutWareHosing").datagrid("deleteRow", editRowIndex);
            $("#gridEditOutWareHosing").datagrid("acceptChanges");
        }
        var arrDatagrid = getDatagridRows();
        var addDefaultData  = gFunDataAddDefault(data,gridDefault);
        var rows = checkDatagrid(arrDatagrid,addDefaultData);
        var keyNames = {
            purchasePrice:'price',
            id:'skuId',
            disabled:'',
            pricingType:''
        };

        var newRows = gFunUpdateKey(rows,keyNames);
        console.log(newRows);
        $("#gridEditOutWareHosing").datagrid("loadData",newRows);
    },searchKey,'','','','','');
}

//表格添加默认值
function addGridDefault(rows){
    var newRows = [];
    $.each(rows,function(i,v){
        newRows.push($.extend(v,gridDefault));
    });
    return newRows;
}
//验证表格数据 删除不合格数据
function getDatagridRows(){
    $("#gridEditOutWareHosing").datagrid("unselectAll");
    $("#gridEditOutWareHosing").datagrid("endEdit", editRowIndex);
    var grid = new GridClass();
    var rows = grid.getRows("gridEditOutWareHosing");
    $.each(rows,function(i,val){
        if(!val.skuCode){
            rows.splice(i,1);
        }
    });
    return rows;
}
//合并数据-过滤相同的
function checkDatagrid(arrs,data){
    var newData = [];
    $.each(data,function(i,val){
        var isRepeat = false;
        $.each(arrs,function(j,val1){
            if(val.skuCode==val1.skuCode){
                isRepeat = true;
            }
        });
        if(!isRepeat){
            newData.push(val);
        }
    });
    return arrs.concat(newData);
}

//保存
function saveItemHandel(){
	//收货分店
    var supplierId = $("#supplierId").val();
    //发货人
    var salesmanId = $("#salesmanId").val();
    //调出仓库
    var branchId = $("#branchId").val();
    //备注
    var remarkMsg = $("#remarkMsg").val();
    //原单类型
    var oldTypeValue = $("input[name='oldType']:checked").val();
    //申请单号
    var applyOrderId = $("#applyOrderId").val();
	
    
	//TODO 计算获取商品总数量和总金额
	//商品总数量
	var totalNum = 0;
	//总金额
	var amount=0;
	
	var rows = $("#gridEditOutWareHosing").datagrid('getRows');
    var saveData = JSON.stringify(rows);
    
    
    var detailList = tableArrayFormatter(rows,"detailList");
    console.log(detailList);
    
    var reqObj = $.extend({
    	id:id,
		supplierId:supplierId,
		branchId:branchId,
		deliverTime:deliverTime,
		salesmanId:salesmanId,
		totalNum:totalNum,
		amount:amount,
	}, detailList);
    
    return;
    
    $.ajax({
    	url:contextPath+"/form/purchase/updateOrder",
    	type:"POST",
    	data:reqObj,
    	success:function(result){
            console.log(result);
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功！", "info");
            }else{
                successTip(result['message']);
            }
        },
        error:function(result){
            successTip("请求发送失败或服务器处理失败");
        }
    });
}

function check(){
	var id = $("#formId").val();
	$.messager.confirm('提示','是否审核通过？',function(data){
		if(data){
			$.ajax({
		    	url:contextPath+"/form/purchase/check",
		    	type:"POST",
		    	data:{
		    		formId:id,
		    		status:1
		    	},
		    	success:function(result){
		    		console.log(result);
		    		if(result['code'] == 0){
		    			$.messager.alert("操作提示", "操作成功！", "info",function(){
		    				location.href = contextPath +"/form/purchase/orderEdit?formId=" + id;
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

//合计
function toFooter(){
	$('#gridEditOutWareHosing').datagrid('reloadFooter',[{"isFooter":true,"receivablesAccount":$('#receivablesAccount').val()||0,"collectAccount":$('#collectAccount').val()||0}]);
}

function selectSupplier(){
	new publicSupplierService(function(data){
		$("#supplierId").val(data.id);
		$("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
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
	});
}
function selectPurchaseFormService(){
    new publicPurchaseFormService("PA",function(data){
		//data.Id
		$("#applyOrderId").val(data.formNo);
		$("#applyOrderIdNum").val(data.formNo);
	});
}
