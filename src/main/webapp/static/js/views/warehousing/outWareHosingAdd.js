/**
 * Created by huangj02 on 2016/8/9.
 */
$(function(){
    $("#createTime").html(new Date().format('yyyy-MM-dd'));
    initDatagridEditOutWareHosing();
});
var editRowIndex = undefined;      //光标所在当前行
var editField = undefined;      //光标所在当前列
var gridHandel = new GridClass();
function initDatagridEditOutWareHosing(){
    $("#gridEditOutWareHosing").datagrid({
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
            console.log("onLoadSuccess");
            var rowL = $("#gridEditOutWareHosing").datagrid("getRows").length;
            if(rowL==0){
                $("#gridEditOutWareHosing").datagrid("insertRow",{
                    index:0,
                    row: $.extend({},gridDefault)
                });
            }
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

    $('#gridEditOutWareHosing').datagrid('loadData',{ code: '01',rows: [$.extend({},gridDefault)]});
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
    //数量
    var edRealNum = $('#gridEditOutWareHosing').datagrid('getEditor', {index:rowIndex,field:"realNum"});
    //金额
    var edAmount = clickRow.amount;
    //税率
    var edTaxAmount= $('#gridEditOutWareHosing').datagrid('getEditor', { index: rowIndex, field: 'taxAmount' });

    var purchaseSpecValue = gridHandel.getFieldData('gridEditOutWareHosing',rowIndex,'spec');
    if(!purchaseSpecValue){
    	 purchaseSpecValue = 1;
         messager("没有商品规格,请审查");
        //return;
    }
    //监听箱数
    $(edLargeNum.target).numberbox({ onChange: function (newV,oldV) {
    	    
            //数量=商品规格*箱数
            $(edRealNum.target).numberbox('setValue',purchaseSpecValue*newV);
            updateFooter();
        }
    });

    //监听数量值改变事件
    $(edRealNum.target).numberbox({ onChange: function (newV,oldV) {
            //金额=数量*单价
            var edPrice = gridHandel.getFieldValue('gridEditOutWareHosing',rowIndex,'price');
            clickRow.amount = edPrice*newV;
            //$(edAmount.target).numberbox('setValue',edPrice*newV);
            $(edLargeNum.target).numberbox('setValue',(newV/purchaseSpecValue).toFixed(4));
            updateFooter();
        }
    });

    //监听金额
    /*$(edAmount.target).numberbox({onChange: function (newV,oldV) {
            //获取税率
            var taxV = gridHandel.getFieldData('gridEditOutWareHosing',rowIndex,'tax');
            $(edTaxAmount.target).numberbox('setValue',(taxV*(newV/(1+taxV))).toFixed(4));
        }
    });*/
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
            amount:gridHandel.getFieldValue('gridEditOutWareHosing',editRowIndex,'amount')||0
        };
        rows.push($.extend({},obj));
    }
    $('#gridEditOutWareHosing').datagrid('reloadFooter',[
        {
            "isFooter":true,
            "largeNum":largeNum.toFixed(4),
            "realNum":realNum.toFixed(4),
            "amount":amount.toFixed(4),
        }
    ]);

    formTotalNum = realNum.toFixed(4);
    formAmount = amount.toFixed(4);
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
        row:$.extend({},gridDefault)
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
    //判定供应商是否存在
    if($("#supplierId").val()==""){
        messager("请先选择供应商");
        return;
    }
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
            pricingType:'',
            inputTax:'tax'
        };

        var newRows = gFunUpdateKey(rows,keyNames);
        console.log(newRows);
        $("#gridEditOutWareHosing").datagrid("loadData",newRows);
    },searchKey,'','','','','');
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

//TODO 计算获取商品总数量和总金额
//商品总数量
var formTotalNum = 0;
//总金额
var formAmount=0;
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

    //验证表格数据
    $("#gridEditOutWareHosing").datagrid("endEdit", editRowIndex);
    var grid = new GridClass();
    //var rows = grid.getRows("gridEditOutWareHosing");
    var rows = grid.getRowsWhere({skuName:'1'});
    $(grid.getGridName()).datagrid("loadData",rows);
    if(rows.length==0){
        messager("表格不能为空");
        return;
    }
    var isCheckResult = true;
    console.log(rows);
    $.each(rows,function(i,v){
        if(!v["stockNo"]){
            messager("第"+(i+1)+"行，货号不能为空");
            isCheckResult = false;
            return false;
        };
        if(!v["batch"]){
            messager("第"+(i+1)+"行，批次不能为空");
            isCheckResult = false;
            return false;
        };
        if(v["largeNum"]<=0){
            messager("第"+(i+1)+"行，箱数必须大于0");
            isCheckResult = false;
            return false;
        }
        if(v["realNum"]<=0){
            messager("第"+(i+1)+"行，数量必须大于0");
            isCheckResult = false;
            return false;
        }
    });
    if(!isCheckResult){
        return;
    }
    var saveData = JSON.stringify(rows);
    
    var detailList = tableArrayFormatter(rows,"detailList");
    

    var reqObj = $.extend({
        supplierId:supplierId,
        salesmanId:salesmanId,
        branchId:branchId,
        remarkMsg:remarkMsg,
        oldTypeValue:oldTypeValue,
        applyOrderId:applyOrderId,
    }, detailList);
    
    console.log(reqObj);
    return ;
    $.ajax({
        url:contextPath+"/form/purchase/saveOrder",
        type:"POST",
        data:reqObj,
        success:function(result){
            console.log(result);
            if(result['code'] == 0){
                $.messager.alert("操作提示", "操作成功！", "info",function(){
                    location.href = contextPath +"/form/purchase/orderEdit?formId=" + result["formId"];
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

//选择供应商
function selectSupplier(){
    new publicSupplierService(function(data){
        $("#supplierId").val(data.id);
        $("#supplierName").val("["+data.supplierCode+"]"+data.supplierName);
        $("#deliverTime").val(new Date(new Date().getTime() + 24*60*60*1000*data.diliveCycle).format('yyyy-MM-dd'));
    });
}
function selectBranch(){
    /**
     * 分店列表  type = 0  |  1
    * 0 表示单选  1 表示多选
    */
    new publicBranchService(function(data){
    	$("#branchId").val(data.branchesId);//id
    	$("#branchName").val(data.branchName);
    },0);
}
function selectOperator(){
    new publicOperatorService(function(data){
        $("#salesmanId").val(data.id);
        $("#operateUserName").val(data.userName);
    });
}
function selectPurchaseFormService(){
    new publicPurchaseFormService("PA",function(data){
		//data.Id
		$("#applyOrderId").val(data.formNo);
		$("#applyOrderIdNum").val(data.formNo);
	});
}

